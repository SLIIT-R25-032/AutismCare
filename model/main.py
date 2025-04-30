from fastapi import FastAPI, HTTPException, File, UploadFile
from pydantic import BaseModel, Field
import joblib
import pandas as pd
from ultralytics import YOLO
from PIL import Image
import io
import uvicorn

# ---------------------------
# Create FastAPI Instance
# ---------------------------
app = FastAPI()

# ---------------------------
# Load the Saved Autism Behavior Model
# ---------------------------
# Ensure the file 'autism_behavior_model.pkl' is in the same directory as this script.
autism_model = joblib.load("autism_behavior_model.pkl")

# ---------------------------
# Define Mappings for Categorical Features
# ---------------------------
# These mappings must match the encoding used during training.
# For example, if LabelEncoder was used on the 'Gender' column, it likely sorted alphabetically.
# In this example, assume:
#   Gender: "Female" -> 0, "Male" -> 1
#   Current Mood: "Anxious" -> 0, "Frustrated" -> 1, "Happy" -> 2, "Neutral" -> 3, "Sad" -> 4
gender_mapping = {"Female": 0, "Male": 1}
current_mood_mapping = {
    "Anxious": 0,
    "Frustrated": 1,
    "Happy": 2,
    "Neutral": 3,
    "Sad": 4
}

# Inverse mapping for the target "Level"
# Assuming the Level LabelEncoder sorted the classes lexicographically, for example:
#   0: "High", 1: "Low", 2: "Moderate", 3: "Very High", 4: "Very Low"
# Adjust these as needed based on your training.
level_inverse_mapping = {
    0: "High",
    1: "Low",
    2: "Moderate",
    3: "Very High",
    4: "Very Low"
}

# ---------------------------
# Define the Request Body using Pydantic for Prediction with Validation
# ---------------------------
class PredictionRequest(BaseModel):
    Age: int 
    Gender: str             
    Current_Mood: str       
    Parent_Satisfaction: int 
    Engagement_Level: int  
    Completed_Tasks: int           
    Time_Spent: float             
    Correct_in_First_Attempt: int

# ---------------------------
# Prediction Endpoint for Autism Behavior Model
# ---------------------------
@app.post("/predict")
def predict(request: PredictionRequest):
    try:
        input_data = request.dict()

        # Validate categorical inputs
        if input_data["Gender"] not in gender_mapping:
            raise HTTPException(
                status_code=400,
                detail={"error": "Invalid Gender value", "valid_values": list(gender_mapping.keys())}
            )
        if input_data["Current_Mood"] not in current_mood_mapping:
            raise HTTPException(
                status_code=400,
                detail={"error": "Invalid Current_Mood value", "valid_values": list(current_mood_mapping.keys())}
            )
        
        # Additional validations for numerical inputs
        if not (1 <= input_data["Parent_Satisfaction"] <= 5):
            raise HTTPException(
                status_code=400,
                detail={"error": "Invalid Parent_Satisfaction value", "valid_range": "1 to 5"}
            )
        
        if not (1 <= input_data["Engagement_Level"] <= 5):
            raise HTTPException(
                status_code=400,
                detail={"error": "Invalid Engagement_Level value", "valid_range": "1 to 5"}
            )
        
        if not (1 <= input_data["Completed_Tasks"] <= 10):
            raise HTTPException(
                status_code=400,
                detail={"error": "Invalid Completed_Tasks value", "valid_range": "1 to 10"}
            )
        
        if not (6 <= input_data["Age"] <= 10):
            raise HTTPException(
                status_code=400,
                detail={"error": "Invalid Age value", "valid_range": "6 to 10"}
            )
        
        if input_data["Time_Spent"] <= 0:
            raise HTTPException(
                status_code=400,
                detail={"error": "Invalid Time_Spent value", "valid_value": "greater than 0"}
            )

        # Create a DataFrame from input data with proper mappings
        df = pd.DataFrame([{
            "Age": input_data["Age"],
            "Gender": gender_mapping[input_data["Gender"]],
            "Current Mood": current_mood_mapping[input_data["Current_Mood"]],
            "Parent Satisfaction": input_data["Parent_Satisfaction"],
            "Engagement Level": input_data["Engagement_Level"],
            "Completed Tasks": input_data["Completed_Tasks"],
            "Time Spent": input_data["Time_Spent"],
            "Correct in First Attempt": input_data["Correct_in_First_Attempt"]
        }])

        # Predict numeric code using the loaded model
        pred_numeric = autism_model.predict(df)[0]

        # Map numeric prediction back to string label
        pred_label = level_inverse_mapping.get(pred_numeric, "Unknown")

        # Define suggestions for each prediction level
        suggestions_dict = {
            "Very Low": [
                "Increase the engagement level by introducing interactive and stimulating activities.",
                "Offer shorter, more focused tasks to prevent frustration and increase the chances of success.",
                "Improve mood by providing more positive reinforcement and recognizing small achievements.",
                "Enhance parental involvement to boost satisfaction and ensure more consistent support for the child."
            ],
            "Low": [
                "Provide visual aids and rewards to enhance motivation and engagement in tasks.",
                "Adjust the complexity of tasks based on the child's performance to maintain interest and reduce frustration.",
                "Offer emotional support by recognizing the child's feelings and providing calming strategies.",
                "Increase communication with parents to better understand the child's needs and improve task completion."
            ],
            "Moderate": [
                "Introduce challenges that are slightly above the child's current skill level to promote growth and confidence.",
                "Incorporate teamwork or peer interactions to boost engagement and problem-solving skills.",
                "Ensure that the child receives timely feedback on performance to encourage further improvement.",
                "Encourage self-regulation techniques to help manage frustration and maintain focus."
            ],
            "High": [
                "Provide more complex tasks that challenge the child's current abilities to foster growth and mastery.",
                "Encourage independent problem-solving and decision-making to build confidence and autonomy.",
                "Use positive reinforcement to sustain motivation and recognize progress toward mastery.",
                "Offer opportunities for the child to mentor others, which could enhance leadership and organizational skills."
            ],
            "Very High": [
                "Introduce advanced tasks and projects that allow the child to demonstrate their full capabilities.",
                "Provide leadership opportunities, such as managing a group task or guiding peers in activities.",
                "Offer opportunities for skill development in a specialized area (e.g., music, art, or technology) to foster expertise.",
                "Promote self-reflection and goal-setting to help the child focus on future achievements and career paths."
            ]
        }

        suggestions = suggestions_dict.get(pred_label, [])
        return {"prediction": pred_label, "suggestions": suggestions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ---------------------------
# Load the YOLOv8 Model for Object Detection
# ---------------------------
yolo_model = YOLO("yolov8n.pt")

# ---------------------------
# Object Detection Endpoint using YOLOv8
# ---------------------------
@app.post("/detect_objects/")
async def detect_objects(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes))

        # Run YOLOv8 object detection
        results = yolo_model(image)

        detections = []
        for result in results:
            for box in result.boxes:
                obj = {
                    "class": result.names[int(box.cls)],
                    "confidence": float(box.conf),
                    "bbox": box.xyxy.tolist()
                }
                detections.append(obj)

        return {"detected_objects": detections}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ---------------------------
# Run the Application
# ---------------------------
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
