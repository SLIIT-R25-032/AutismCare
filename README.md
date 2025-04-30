- **Name:** Wijesinghe R.M  
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






