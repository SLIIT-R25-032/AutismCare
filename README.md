# Autism Behavior Analysis Platform

The Autism Behavior Analysis Platform is designed to assist caregivers, therapists, and researchers in analyzing and assessing behavioral patterns of children with autism. The system provides features for predicting autism behavior levels, analyzing emotional states, and supporting personalized behavioral interventions. It utilizes FastAPI for processing predictions, Node.js/Express for user management, MongoDB for data storage, and a machine learning model for autism behavior prediction.

## Features

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
- POST /detect-objects: Upload an image and get detected objects using the YOLOv8 model.

## Contributing

1. Fork the repository.
2. Create your feature branch (git checkout -b feature/your-feature).
3. Commit your changes (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature/your-feature).
5. Open a pull request.
