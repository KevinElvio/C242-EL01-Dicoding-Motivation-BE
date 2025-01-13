# C242-EL01 Dicoding Motivation Backend  

This is the backend service for the **C242-EL01 Motivation Project**, developed as part of the Capstone Project for Dicoding's **Cloud Computing Cohort 2024**. The purpose of this project is to enhance user motivation on the Dicoding platform by providing personalized learning experiences through gamification, adaptive learning paths, and scheduled reminders.  

## Features  
- **User Authentication**: Secure login and registration using **JSON Web Token (JWT)**.  
- **Gamification Integration**: Backend support for badges, points, and leaderboards to encourage user engagement.  
- **Adaptive Learning Paths**: Tailored learning paths based on user progress and preferences.  
- **Scheduled Notifications**: Automatic reminders for learning activities using cloud-based scheduling.  

## Technology Stack  
- **Express.js**: For building RESTful APIs.  
- **Google Compute Engine**: For deploying the AI model and backend services.  
- **PostgreSQL**: As the primary database for storing user and project data.  
- **JSON Web Token (JWT)**: For secure authentication.  
- **Cloud Storage**: For managing media and other static assets.  

## Setup and Installation  
1. Clone the repository:  
   ```bash
   git clone https://github.com/KevinElvio/C242-EL01-Dicoding-Motivation-BE.git
2. Install dependencies:  
   ```bash
   npm install
3. Set up the environment variables in a .env file. Example:
   ```bash
   DB_HOST=your_database_host  
   DB_USER=your_database_user  
   DB_PASS=your_database_password  
   JWT_SECRET=your_jwt_secret
3. Start the server:
   ```bash
   npm start

# Contribution
Feel free to fork this repository and contribute by submitting pull requests. For major changes, please open an issue first to discuss your ideas.

# License
This project is licensed under the MIT License.

