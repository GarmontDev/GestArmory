# 🔫 GestArmory

**GestArmory** is a web application designed for an armory store to manage ammunition sells. With features to generate reports, and maintain a secure database. Built with **Angular** for the front-end, **Express.js** for the back-end, and **MongoDB** for the database, this app ensures reliability, scalability, and performance.

---

## 🌟 Features

- **Ammunition Stock Management**: Add, update, and remove ammunition items.
- **Real-Time Inventory Updates**: Instantly reflect stock changes in the database.
- **Report Generation**: Create reports on inventory levels, sales, and restocking.
- **User Authentication**: Secure login system with role-based access for store admins.

---

## 🛠️ Tech Stack

This project is built with the **MEAN stack**:

- **Front-End**:  
  - **Angular**: A powerful framework for building dynamic, component-based UIs.
  - **TailwindCSS**: Utility-first CSS framework for creating modern, responsive designs.
  
- **Back-End**:  
  - **Express.js**: A minimalist Node.js framework for building RESTful APIs.
  - **MongoDB**: A NoSQL database for storing inventory and user data.

---

## 🚀 Installation and Setup

To run this project locally, follow these steps:

### 1️⃣ Prerequisites

Ensure you have the following installed:
- **Node.js**: [Download Node.js](https://nodejs.org/)
- **MongoDB**: [Download MongoDB](https://www.mongodb.com/try/download/community)
- **Angular CLI**: Install globally if you haven’t already:
  
  ```bash
  npm install -g @angular/cli

### 2️⃣ Backend Setup (Express.js + MongoDB)

1. Navigate to the backend folder:
    ```bash
    cd backend

2. Install dependencies:
    ```bash
    npm install

3. Set up the .env file with your MongoDB connection string:
    ```bash
    MONGO_URI=your-mongo-connection-string
    JWT_SECRET=your-secret-key

4. Start the server:
    ```bash
    npm start

The server will be running at http://localhost:5000.

### 3️⃣ Frontend Setup (Angular)

1. Navigate to the *frontend* folder:
   ```bash
   cd frontend

2. Install dependencies:
   ```bash
   npm install

3. Start the Angular development server:
   ```bash
   ng serve

4. Open the app in your browser:
   ```bash
   http://localhost:4200

---

### 🧑‍💻 Why I Built This

I developed this app for a friend's armory store where they were running on a traditional system based on books to report back to the police department.
This app saved them a lot of time and effort creating automatically the reports they needed.

---

### ✨ Key Takeaways

Through this project, I learned and demonstrated:

  - Full-Stack Development: Seamlessly integrating Angular, Express.js, and MongoDB.
  - State Management: Efficient handling of dynamic data between front-end and back-end.
  - Responsive Design: Delivering a consistent user experience across devices.
  - Role-Based Access: Using Oauth for secure authentication and authorization.
  - Report Automation: Generating real-time, actionable inventory reports.

  ---

### 🗣 Feedback

I’d love to hear your thoughts on this project! Feel free to:

  - ⭐ Star this repository if you find it helpful.
  - 🐛 Open an issue to report bugs or share suggestions.

---

  Thank you for exploring the GestArmory repository!
