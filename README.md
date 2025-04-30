# Autism Care App
Our research focuses on advancing home-based autism
care through an intelligent mobile solution designed to
support autistic children and their parents in Sinhala. The
app incorporates activity -based learning methods to make
skill development engaging and effective for Level 1 autism
children. It uses adaptive learning technologies to provide
interactive features that enhance child engagement and
deliver personalized learning experiences. Parents can track
their child's progress and receive tailored recommendations
to support their development. This solution offers an
accessible and culturally relevant approach to autism care
at home.
Our research focuses on advancing home-based autism
care through an intelligent mobile solution designed to
support autistic children and their parents in Sinhala. The
app incorporates activity -based learning methods to make
skill development engaging and effective for Level 1 autism
children. It uses adaptive learning technologies to provide
interactive features that enhance child engagement and
deliver personalized learning experiences. Parents can track
their child's progress and receive tailored recommendations
to support their development. This solution offers an
accessible and culturally relevant approach to autism care
at home..

| Name with Initials     | Registration Number | Contact Phone Number | Email                  |
|------------------------|---------------------|-----------------------|------------------------|
|Chethani A.V.S         |  IT21834592         |  0741433687          |  it21834592@my.sliit.lk |
|Wijesinghe R.M             |   IT21820250     |   0759571894        | it21820250@my.sliit.lk |
|Indeewara M.M.A       |  IT21241000       |      0702767871      |it21241000@my.sliit.lk |
|   Chandrabanu M.M.U      |   IT21814006    |     0702810997      | it21814006@my.sliit.lk|
## Features
# IT21834592-Chethani A.V.S - Behavior and Recognition Skill Development
- Autism Behavior Prediction: Predict the autism behavior level based on factors like age, gender, mood, engagement level, and more using machine learning.
- Emotion & Mood Analysis: Analyze and assess the emotional states of individuals during behavioral tasks.
- User Authentication: Supports caregiver, therapist, and researcher roles for secure access to the platform.
- Data Management: MongoDB is used for storing user data and behavioral analysis results.
- Object Detection: Detect objects in images using the YOLOv8 model.

## Architecture
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
1. Fork the repository.
2. Create your feature branch (git checkout -b feature/your-feature).
3. Commit your changes (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature/your-feature).
5. Open a pull request.







______________________________________________________________________________________________________________________________
# Wijesinghe R.M – IT21820250 - Communication Skills Development for Autistic Children

---

### A Personalized Sinhala-Language Mobile App with Multi-Model AI to Support Communication in Children with Autism

This research component introduces a Sinhala-language mobile application designed to help children with autism (ages 6–10) improve their communication skills. The system combines interactive activities with three specialized machine learning models to assess dopamine levels, speech accuracy, and visual understanding (especially color/object recognition). The goal is to support vocabulary learning in an emotionally intelligent, adaptive, and engaging way — keeping children both learning and happy.

---

## 🔍 Research Focus

### 📌 Research Question

**How can a mobile app help Sinhala-speaking children with autism (aged 6–10) learn new words effectively and keep them happy?**

###  Objectives

- Build a fun, child-friendly mobile app tailored for Sinhala language and culture  
- Integrate three core ML models for:  
  1. 🎙️ **Dopamine Prediction** – Understand emotional state from speech  
  2. ✅ **Speech Accuracy Detection** – Evaluate pronunciation and repetition  
  3. 🎨 **Color/Object Recognition** – Validate understanding of basic vocabulary visually  
- Adapt activity flow based on dopamine levels to maintain motivation  
- Enable therapist/parent insight with progress reports and emotional tracking  

---

##  Technology Stack

| Component                  | Tools/Frameworks                                                |
|---------------------------|-----------------------------------------------------------------|
| ML Models                 | `TensorFlow`, `scikit-learn`, `librosa`, `OpenCV`               |
| Dopamine Prediction       | MFCC-based voice classifier                                     |
| Speech Accuracy Detection | `speech_recognition`, Sinhala audio dataset, DTW/phoneme match |
| Color Recognition         | CNN model trained on basic color + object images               |
| App Frontend              | `Flutter` (with Sinhala UI and text-to-speech)                 |
| Backend & Reports         | `Flask`, `MongoDB`, `pdfkit`                                   |

---

##  Core System Features

### 🎮 Activities

- **Speak with Me**  
  - Sinhala phrases are spoken by the app  
  - Child repeats → Accuracy checked → Dopamine analyzed  
  - App reacts (e.g., praises, adapts difficulty, adjusts music)

- **See & Match**  
  - Image of colored object (e.g., red apple) shown  
  - Child taps matching object → Color recognition model validates

- **Feel & Guess**  
  - Cartoon faces (happy, sad, angry) → Emotion selected by child  
  - Result logged for therapist review

---

##  Dopamine-Adaptive Behavior

| Dopamine Level | App Response                         |
|----------------|--------------------------------------|
| Normal         | Continue next activity               |
| Low            | 👉 Boost Zone (energetic animations + music)  
| High           | 👉 Harmony Zone (calming visuals + music)

---

##  Parent/Therapist Dashboard

- View speech, visual, and emotion accuracy  
- See dopamine trends across sessions  
- Export daily/weekly performance as PDF

---


#  IT21241000 Indeewara M.M.A   – Cognitive Skill Development for Children (Ages 6–10)

** Research Component:** Cognitive Skill Development in Children Aged 6–10 with Level 1 Autism  
** Institution:** Sri Lanka Institute of Information Technology (SLIIT)

---

##  Project Summary

This research introduces a **Sinhala-language mobile application** designed to support **cognitive skill development** in Sri Lankan children aged **6–10 years** with **Level 1 Autism Spectrum Disorder (ASD)**. The application addresses critical gaps in localized resources, offering **personalized**, **gamified**, and **scientifically validated learning** tailored to the cultural and linguistic context of Sri Lanka.

Using **machine learning**, **image processing**, and **adaptive learning systems**, the app provides a structured environment for developing skills such as **pattern recognition**, **shape identification**, **number writing**, **memory**, and **problem-solving**. It also includes **relaxation sessions** to support emotional regulation and sensory balance, promoting a positive learning experience at home.

---

##  Research Focus

###  Research Problem
Children with autism in Sri Lanka lack access to affordable, culturally relevant tools that target their specific cognitive development needs. Most existing apps are not in Sinhala and do not provide adaptive or emotion-sensitive learning.

###  Research Goal
To build an interactive **Sinhala-language mobile app** that fosters **cognitive skills** in autistic children using **localized content**, **real-time feedback**, and **data-driven personalization**.

---

##  Key Objectives

- Design developmentally appropriate activities in Sinhala  
- Implement a survey-based system to auto-generate personalized activity sets  
- Enhance cognitive domains:
  - ✅ Shape and number recognition  
  - ✅ Counting and quantity understanding  
  - ✅ Fine motor coordination  
  - ✅ Memory and logic  
- Integrate adaptive learning to adjust activity complexity  
- Track real-time progress and generate detailed reports for caregivers  
- Apply image processing and ML for validating drawings and number writing  
- Reduce sensory overload with built-in calming sessions  
- Provide parents with step-by-step guidance and engagement tools  

---

##  App Features

###  Interactive Learning Activities

#### Manipulative Skill Development
- Tap to Pop Balloons  
- Swipe to Clean  
- Drag and Drop Matching  
- Dot-to-Dot Drawing  
- Trace the Path  
- Interactive Coloring  

#### Basic Math & Logic Skills
- Shape Identification & Drawing  
- Big vs Small / Tall vs Short  
- Position Recognition (left/right/middle)  
- Quantity Understanding (many/few)  
- Number Recognition & Counting (1–10)  
- Guided Number Writing Practice  

---

##  Adaptive Learning Flow

| Performance Level | App Response                          |
|-------------------|----------------------------------------|
| High Accuracy     | Unlock new level and provide praise    |
| Medium Accuracy   | Repeat activity or show guided help    |
| Low Accuracy      | Suggest simpler alternative activities |

---

##  Progress Monitoring & Personalization

- Real-time tracking: task completion %, error rates, and time  
- ML-based prediction of cognitive development trends  
- Weekly PDF progress reports for parents and educators  

---

##  Stress Management Features

- Relaxation sessions after tasks  
- Calming visuals, music, and animations  
- Helps prevent sensory overload in children with ASD  

---

##  Technologies Used

| Area                   | Tools & Frameworks                       |
|------------------------|------------------------------------------|
| App Development        | Flutter (Dart), Android Studio           |
| ML & Image Processing  | Python, TensorFlow, OpenCV, Keras        |
| Speech & Drawing Validation | CNN Models, Edge Detection         |
| Data Handling          | Firebase, SQLite                         |
| UI/UX Design           | Figma (for prototyping), Sinhala Fonts   |
| Reporting              | Auto PDF generation, Parent dashboard    |

---

##  System Flow

1. Home Page: Displays 20 level-based activity buttons  
2. Parent Survey: Collects cognitive info for personalized content  
3. Child Activity: Interactive task starts with animations and voice  
4. Real-time Tracking: Accuracy, time, and errors are logged  
5. Adaptation: Activity difficulty is auto-adjusted based on performance  
6. Progress Reports: Parent receives summary and insights  
7. Relaxation Zone: Triggered after task or during overload signs  

---

##  Parent & Therapist Dashboard

- View real-time skill performance  
- Track week-to-week progress  
- See feedback on shapes, numbers, and activity success  
- Receive tips, video guides, and personalized advice  

---

##  Cultural Relevance

- Entire UI and voice prompts in Sinhala  
- Activity design reflects local objects, colors, and learning methods  
- Accessible on Android devices, especially for underserved communities  

---

##  Expected Impact

This project aims to improve the quality of life and learning outcomes for children with autism in Sri Lanka. It empowers families with an easy-to-use, science-backed app that delivers affordable, localized, and adaptive education—filling a vital gap in autism care.

---

##  How to Use *(Coming Soon)*

1.  Download APK  
2.  Complete Parent Survey  
3.  Tap an activity from Home Page  
4.  Let the child complete interactive tasks  
5.  Track progress & access personalized reports  

#  IT21814006 Chandrabanu M.M.U   – 
