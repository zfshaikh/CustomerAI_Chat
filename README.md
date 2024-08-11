## LingoMate AI: https://lingomate-ai.vercel.app/

**Purpose:**
LingoMate AI is a web application designed to assist users with language learning, supporting multiple languages. The platform aims to provide interactive and personalized language practice through AI-driven chat features, enhancing the learning experience for users.

**Development:**
- Created a responsive web interface using Next.js and Material UI, ensuring a user-friendly experience across devices.
- Implemented Firebase Authentication for secure user sign-ups, logins, and session management.
- Integrated a chat system where users can interact with an AI language tutor, receiving instant feedback and language practice in real-time.
- Implemented routing and conditional rendering to manage different views, including chat, team info, and chat history.

**Tech Stack:**
- **Frontend:** Next.js, Material UI
- **Backend:** Node.js, Firebase (Authentication, Realtime Database), OpenAI API
- **Other Tools:** Markdown for formatting chat messages, MUI Tabs for navigation between different sections (chat, team info, chat history)

## Installation Guide

### 1. **Clone the Repository**

Clone the repository from GitHub:

```bash
git clone https://github.com/zfshaikh/CustomerAI_Chat.git
cd CustomerAI_Chat.git
```

### 2. **Install Dependencies**

Make sure you have Node.js and npm installed. If not, download and install them from [Node.js](https://nodejs.org/).

Run the following command to install the project dependencies:

```bash
npm install
```

### 3. **Set Up Environment Variables**

Create a `.env.local` file in the root directory of your project to store environment variables. Add the following lines to configure your Firebase and OpenAI settings:

```plaintext
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-firebase-app-id

# OpenAI Configuration
OPENAI_API_KEY=your-openai-api-key
```

Replace the placeholders with your actual API keys and configuration values.

### 4. **Configure Firebase**

If you haven't already set up Firebase for your project:

1. **Go to the [Firebase Console](https://console.firebase.google.com/)**.
2. **Create a new project** or use an existing one.
3. **Add your web app** to the Firebase project and obtain the Firebase configuration details.
4. **Set up Firebase Authentication** and enable the sign-in methods you plan to use.

### 5. **Configure OpenAI**

1. **Sign up or log in** to [OpenAI](https://www.openai.com/).
2. **Generate an API key** from the API section of your OpenAI dashboard.
3. **Add the API key** to the `.env.local` file as described in Step 3.

### 6. **Run the Development Server**

Start the development server to preview your application:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000` to see the application in action.

**Demo:**
<img width="1512" alt="Screenshot 2024-08-11 at 8 25 40 AM" src="https://github.com/user-attachments/assets/e9cb7e59-c858-4ff5-a3fd-74037d6f61d9">
<img width="1512" alt="Screenshot 2024-08-11 at 8 25 49 AM" src="https://github.com/user-attachments/assets/09fdc682-e858-4bb8-b452-1e969c8f3051">
<img width="1512" alt="Screenshot 2024-08-11 at 8 26 01 AM" src="https://github.com/user-attachments/assets/75b0974b-5e06-487c-8d91-6cfa2ebf4c35">
<img width="1512" alt="Screenshot 2024-08-11 at 8 28 40 AM" src="https://github.com/user-attachments/assets/5431441c-7c54-4dad-8a5b-4ff7638a4a67">
<img width="1512" alt="Screenshot 2024-08-11 at 8 28 52 AM" src="https://github.com/user-attachments/assets/eda854c3-efc1-45e4-a16b-81144ec48eae">

