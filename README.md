# 🌍 global_trends_backend

A Node.js + Express backend connected to MongoDB Atlas for powering the **Global Trends Dashboard**. This backend serves insightful global event data through RESTful APIs, supporting filters by year, topic, region, country, SWOT, and more.

---

## 🚀 Features

- ✅ Connects to MongoDB Atlas using Mongoose
- ✅ Provides RESTful APIs to access global trends/events
- ✅ Supports filtering and sorting of event data
- ✅ Built with scalability and deployment in mind
- ✅ Secure environment variable handling (`.env` based)

---

## 🏗️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB Atlas**
- **Mongoose**
- **dotenv**
- **CORS**

---

## 📁 Folder Structure
global_trends_backend/
│
├── routes/
│ └── events.js # API routes for event data
├── models/
│ └── Event.js # Mongoose schema for events
├── .env # (Not committed) Stores MONGO_URI
├── server.js # Main Express app entry
├── package.json
└── README.md

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/global_trends_backend.git
cd global_trends_backend

2. Install Dependencies
bash
Copy
Edit
npm install
3. Set Up Environment Variables
Create a .env file in the root directory:

env
Copy
Edit
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
⚠️ Make sure to encode special characters in your password.

4. Run the Server
bash
Copy
Edit
npm start
The server will run on http://localhost:5000
