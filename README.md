# Coffee Time - A Digital Coffee Shop

A full-stack, responsive web application for a digital coffee shop, allowing users to browse products, manage their cart, and maintain their profiles. 

## 🚀 Tech Stack
* **Frontend:** React.js, Vite
* **Backend:** Java Spring Boot 3
* **Database:** MongoDB Atlas
* **Authentication:** JWT (JSON Web Tokens) with Spring Security

## 📁 Project Structure
```text
coffee-shop/
├── .gitignore
├── README.md
├── frontend/
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── vite.config.js
└── backend/
    ├── .env.example
    ├── .gitignore
    ├── pom.xml
    └── src/
        └── main/
            ├── java/com/coffeetime/backend/
            │   ├── controllers/
            │   ├── exception/
            │   ├── models/
            │   ├── payload/
            │   ├── repository/
            │   ├── security/
            │   └── services/
            └── resources/
                └── application.properties
```

> **Note:** `backend/target/` (Maven build output), `frontend/dist/` (Vite build output), and `frontend/node_modules/` are auto-generated and explicitly ignored from version control via `.gitignore`.

## 💻 Local Setup Instructions

### Prerequisites
* Node.js (v18+)
* Java 17+
* Maven

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd coffee-shop
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Configure Environment Variables. Set the following environment variables in your terminal, IDE, or `.env` file (see `.env.example`):
   * `PORT`: `5000`
   * `MONGO_URI`: `mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?appName=LoginSignup`
   * `JWT_SECRET`: `your_super_secret_key_that_is_at_least_256_bits_long`
3. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```
   *The backend will start using the specified port.*

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set the Environment Variable. Create a `.env` file from the example:
   ```env
   VITE_API_URL=http://localhost:5000
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```

## 🌐 Deployment Steps

### Deploying the Backend on Render
1. Create a new **Web Service** on [Render](https://render.com).
2. Connect your GitHub repository.
3. Configure the Root Directory to `backend`.
4. Set the following commands:
   * **Build Command:** `./mvnw clean package -DskipTests`
   * **Start Command:** `java -jar target/*.jar`
5. In the **Environment Variables** section on Render, add:
   * `MONGO_URI` (Your MongoDB Atlas connection string)
   * `JWT_SECRET` (A secure random string)
   *(Note: Render will inject the `PORT` automatically).*

### Deploying the Frontend on Vercel
1. Log in to [Vercel](https://vercel.com) and click **Add New Project**.
2. Import your GitHub repository.
3. Configure the Root Directory to `frontend`.
4. In the **Environment Variables** section, add:
   * `VITE_API_URL`: `https://<your-render-backend-url>.onrender.com`
5. Click **Deploy**.

## 🔑 Environment Variables List
| Variable | Component | Description |
|---|---|---|
| `MONGO_URI` | Backend | Connection string for MongoDB Atlas |
| `JWT_SECRET` | Backend | Secret key used for signing JWT tokens |
| `PORT` | Backend | Port for the server (Handled by Render in production) |
| `VITE_API_URL` | Frontend | URL pointing to the Backend API |

## 📡 API Endpoints Summary

**Public Endpoints:**
* `GET /api/health` - Check backend health status
* `POST /api/auth/register` - Register a new user
* `POST /api/auth/login` - Authenticate user and receive JWT token

**Protected Endpoints (Requires `Authorization: Bearer <token>`):**
* `GET /api/users/profile` - Fetch the authenticated user's profile
* `PUT /api/users/profile` - Update user profile details
* `GET /api/users/` - Retrieve all users (Protected)

## 🧪 Live Demo Instructions
To test the live deployment:
1. Navigate to your Vercel frontend URL.
2. Click **Register** to create a new account.
3. **Login** with your newly created credentials.
4. Navigate to the **Profile** tab to verify that your data loads from the deployed Spring Boot backend correctly!
