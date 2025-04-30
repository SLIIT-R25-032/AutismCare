# Autism Care App
## Features
IT21834592-Chethani A.V.S - Behavior and Recognition Skill Development
- Autism Behavior Prediction: Predict the autism behavior level based on factors like age, gender, mood, engagement level, and more using machine learning.
- Emotion & Mood Analysis: Analyze and assess the emotional states of individuals during behavioral tasks.
- User Authentication: Supports caregiver, therapist, and researcher roles for secure access to the platform.
- Data Management: MongoDB is used for storing user data and behavioral analysis results.
- Object Detection: Detect objects in images using the YOLOv8 model.

## Architecture
IT21834592-Chethani A.V.S - Behavior and Recognition Skill Development
The project consists of two main services:

1. **Node.js/Express Backend**
   - Handles user management, prediction requests, and API endpoints.
   - Communicates with the Autism Behavior Prediction Model to get predictions based on user inputs.
   - Uses MongoDB for user data storage and AWS S3 for storing user-uploaded files.
   - User authentication is handled using JWT for secure access.

2. **FastAPI Analysis Service**
   - Autism Behavior Prediction Model: Handles predictions related to autism behavior based on features like age, gender, mood, etc
   - YOLOv8 Object Detection Model: Detects objects in images uploaded by users.
   - Utilizes Python libraries such as FastAPI, YOLOv8.

## Installation
IT21834592-Chethani A.V.S - Behavior and Recognition Skill Development

### Prerequisites

Ensure that the following are installed on your machine:
- Node.js (version 14 or higher)
- npm or yarn (for package management)
- MongoDB instance (or MongoDB Atlas for cloud database)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sudarika/RP-AUTISM-BEHAVIOUR

2. **Run the models:**
    ```bash
    - cd models
    - pip install fastapi uvicorn pydantic joblib pandas ultralytics pillow scikit-learn
    - uvicorn main:app --host 0.0.0.0 --port 8000

3. **Environment Variables: Create a .env file in backend and add the following:**
   ```bash
   - PORT=5000
   - MONGO_URI=<your_mongodb_connection_string>
   - JWT_SECRET=<your_jwt_secret>
   - FLASH_BACKEND=<your_ml_api_endpoint>

4. **Install dependencies for backend:**
    ```bash
    - cd backend
    - npm install

5. **Run the server:**
    ```bash
    - npm start
    ## API Endpoints

### User Authentication

IT21834592-Chethani A.V.S - Behavior and Recognition Skill Development

- POST /auth/register: Register a new user.
- POST /auth/login: Login for an existing user.
- GET /auth/user: Get user details.
- PUT /auth/update: Update user profile.
- DELETE /auth/delete: Delete user profile.

###  Learning Sessions

- POST /sessions: Create a new learning session.
- PUT /sessions/instructions/:id: Add instructions to a learning session.
- PUT /sessions/finish/:id: Mark a learning session as finished.
- GET /sessions/:id: Get details of a specific learning session.
- POST /sessions/detect-objects: Upload a photo and detect objects.

### Object Detection (via YOLOv8)
- POST /detect-objects: Upload an image and get detected objects using the YOLOv8 model.v
  
## Contributing
IT21834592-Chethani A.V.S - Behavior and Recognition Skill Development
1. Fork the repository.
2. Create your feature branch (git checkout -b feature/your-feature).
3. Commit your changes (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature/your-feature).
5. Open a pull request.


**Name:** Wijesinghe R.M  

- **Student ID:** IT21820250  
- **Component:** Communication Skills Development for Autistic Children

- Communication Skills Development focuses on helping autistic children improve their ability to express and understand language through interactive activities. This component uses games involving speech repetition, image recognition, and emotion matching. Machine learning is used to assess the child’s speech accuracy and emotional state, allowing the app to adapt in real time and provide personalized support for effective communication growth.

---

## 🚀 Component Flow 

### 1⃣ Start Screen
- App Logo  
- Tagline: **"Helping Autism Speak, See & Feel"**
- Button: `Get Started`

---

## 👥 Login / Registration

### 🔐 Parent/Therapist
- Register using email and password  
- Add child profile (Name, Age, Avatar)

### 👶 Child
- Login with 4-digit PIN or avatar selection

---

## 🏠 Child Home Page

Welcome message:  
`"Good afternoon, Emma!"`

### 🎮 Game Options:
- 🗣️ **Speak with Me**
- 👁️ **See & Match**
- 😊 **Feel & Guess**
- 🎯 **Today’s Goal**
- 🕹️ **Free Play**

---

## 🧩 Game Activities

### 🗣️ Speak with Me
- App says: `"I am happy today"`
- Child repeats the phrase  
- 🔊 Voice is recorded  
- ✅ ML checks for correctness  
- 🧬 ML detects dopamine level from voice

---

### 👁️ See & Match
- Shows an image (e.g., 🍎 apple)  
- App says: `"Find the apple"`  
- Child taps the correct image  
- ✅ ML validates the response

---

### 😊 Feel & Guess
- Shows a cartoon face (e.g., 😢 sad)  
- Child selects correct emotion  
- ✅ ML logs result for emotion accuracy

---

## 🧬 Dopamine Detection

After voice input:
- ML checks dopamine level

| Dopamine Level | Action                          |
|----------------|----------------------------------|
| Normal         | ✅ Continue to next activity     |
| Low            | 👉 Redirect to **Boost Zone**    |
| High           | 👉 Redirect to **Harmony Zone**  |

---

## ⚡ Boost Zone
- 🎉 Fun emojis and music notes  
- 🔊 Plays energetic, stimulating music  
- ⏳ Progress bar for activity time  

---

## 🧘 Harmony Zone
- 🌸 Soft colors, calm emoji  
- 🎵 Plays relaxing music  
- ⏳ Progress bar  

---

## 🎯 Today’s Goal Screen

Example goals:
- Say **3** phrases  
- Match **2** pictures  
- Identify **1** emotion  

Includes:
- ✅ Progress bar  
- Buttons: `Start` / `Back to Home`

---

## 🧑‍💼 Parent / Therapist Dashboard

After login, view:
- 📊 Child progress (speech, visual, emotional)
- 🎯 Daily goals  
- 🧬 Dopamine response logs  
- 📄 Export report as PDF  

---

## ⚙️ Settings
- ✏️ Edit profile  
- 🔒 Change PIN  
- ➕➖ Add or remove children  
- 🚪 Logout  

---

## 📌 Technologies (Planned/Recommended)
- **Flutter** for cross-platform mobile UI  
- **TensorFlow Lite** / **PyTorch Mobile** for on-device ML  
- **Speech Recognition + Emotion Detection**  
- **Firebase** or **Flask + MongoDB** for backend  

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------






