# 🚗 Car Rental Service API

## Overview
The Car Rental Service API is a robust backend solution built with **Express.js** and **MongoDB**, providing comprehensive features for user authentication (including local and Google OAuth), car management, and rental processing with **Paystack** integration. It leverages **Cloudinary** for secure profile picture management and **Nodemailer** for email notifications.

## Features
-   **User Authentication**: Secure local authentication, email verification, password reset (OTP).
-   **Google OAuth 2.0**: Seamless sign-up and login via Google, with account linking and password setting for Google-only users.
-   **Role-Based Access Control**: Admin functionalities for managing car inventory.
-   **Car Management**: CRUD operations for rental vehicles.
-   **Rental System**: Create and manage car rental requests.
-   **Payment Integration**: Secure payment processing with Paystack for rental transactions.
-   **Profile Management**: User profile retrieval, updates, and profile picture uploads via Cloudinary.
-   **Email Notifications**: Automated emails for welcome, login alerts, email verification, and password resets.
-   **Cloud Storage**: Cloudinary integration for efficient image storage and optimization.

## Getting Started
To get a copy of the project up and running on your local machine for development and testing purposes, follow these steps.

### Installation
⚙️ **1. Clone the Repository:**
```bash
git clone git@github.com:David-EA/carRental.git
cd carRental
```

📦 **2. Install Dependencies:**
```bash
npm install
```

### Environment Variables
Before running the application, you need to set up your environment variables. Create a `.env` file in the root directory of the project and populate it with the following:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/car-rental-auth

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRATION=7d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/users/google/callback

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Paystack Configuration
PAYSTACK_SECRET_KEY=sk_test_YOUR_PAYSTACK_SECRET_KEY

# Frontend Configuration (for redirects, if applicable)
FRONTEND_URL=http://localhost:3001

# Application Configuration
PORT=3000
NODE_ENV=development
```
**Note on Google OAuth Redirect URI**: For production deployments, ensure `GOOGLE_REDIRECT_URI` and `PAYSTACK_CALLBACK_URL` (in `src/utils/paystack.js`) are updated to your actual domain's callback URL (e.g., `https://yourdomain.com/api/users/google/callback`).

### Running the Application
🚀 **1. Start the Development Server:**
```bash
npm run dev
```
The server will start on `http://localhost:3000`.

✨ **2. Start the Production Server:**
```bash
npm start
```
The server will start on `http://localhost:3000`.

## API Documentation

### Base URL
`http://localhost:3000/api`

All endpoints require a `Content-Type: application/json` header for request bodies unless specified otherwise (e.g., `multipart/form-data` for file uploads).

### Authentication
Endpoints requiring authentication need a JWT in the `Authorization` header:
`Authorization: Bearer <YOUR_JWT_TOKEN>`


## Technologies Used
| Technology         | Description                                     | Link                                            |
| :----------------- | :---------------------------------------------- | :---------------------------------------------- |
| Node.js            | JavaScript runtime environment                  | [nodejs.org](https://nodejs.org/)               |
| Express.js         | Fast, unopinionated, minimalist web framework   | [expressjs.com](https://expressjs.com/)         |
| MongoDB            | NoSQL database for flexible data storage        | [mongodb.com](https://www.mongodb.com/)         |
| Mongoose           | MongoDB object modeling for Node.js             | [mongoosejs.com](https://mongoosejs.com/)       |
| JSON Web Tokens (JWT) | Securely transmit information between parties | [jwt.io](https://jwt.io/)                       |
| Bcrypt.js          | Password hashing library                        | [npmjs.com/package/bcryptjs](https://www.npmjs.com/package/bcryptjs) |
| Cloudinary         | Cloud-based image and video management          | [cloudinary.com](https://cloudinary.com/)       |
| Multer             | Node.js middleware for handling `multipart/form-data` | [npmjs.com/package/multer](https://www.npmjs.com/package/multer) |
| Nodemailer         | Send emails from Node.js applications           | [nodemailer.com](https://nodemailer.com/)       |
| Google APIs (OAuth2) | Google OAuth 2.0 for authentication           | [developers.google.com/identity/oauth2](https://developers.google.com/identity/oauth2/) |
| Paystack           | Online payment gateway for Africa               | [paystack.com](https://paystack.com/)           |
| Dotenv             | Load environment variables from `.env` file     | [npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv) |
| Morgan             | HTTP request logger middleware for Node.js      | [npmjs.com/package/morgan](https://www.npmjs.com/package/morgan) |

## License
This project is licensed under the MIT License.


---

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3399CC?style=for-the-badge&logo=cloudinary&logoColor=white)
![Nodemailer](https://img.shields.io/badge/Nodemailer-000000?style=for-the-badge&logo=nodemailer&logoColor=white)
![Paystack](https://img.shields.io/badge/Paystack-00C3F7?style=for-the-badge&logo=paystack&logoColor=black)
![Google OAuth](https://img.shields.io/badge/Google%20OAuth-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)