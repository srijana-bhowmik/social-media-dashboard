# Social Media Dashboard

## Overview

A centralized Social Media Dashboard that allows users to connect Facebook, Instagram, and Twitter/X accounts and monitor engagement metrics from a single platform.

The system eliminates the need to manually switch between different social media platforms by aggregating analytics into one dashboard

---

## Problem Statement

Organizations and individuals often manage multiple social media accounts across different platforms. Monitoring engagement metrics separately on each platform is inefficient and time-consuming.

This project provides a unified dashboard to collect, visualize, and analyze social media metrics from multiple platforms.

---

## Key Features

- User Registration and Login
- Email Verification using OTP
- JWT Authentication
- Facebook OAuth and Analytics using Meta Graph API
- Instagram Business Account Analytics using Meta Graph API
- Twitter/X OAuth 2.0 and Analytics using Twitter API v2
- Followers Analytics
- Likes Analytics
- Comments Analytics
- Shares Analytics (Facebook)
- Interactive Charts and Visualizations
- Automated Daily Metric Synchronization
- Secure Cloud Deployment

---

## System Architecture


```text
Frontend (React + Vite)
↓
Backend (Node.js + Express)
↓
MySQL Database
↓
Meta Graph API / Instagram API / Twitter API

---

## Tech Stack

Frontend:
```bash
- React.js
- Vite
- Tailwind CSS
- Chart.js
```
Backend:
```bash
- Node.js
- Express.js
- JWT
- bcryptjs
- Node Cron
``` 

Database:
```bash
- MySQL
``` 
External Services/Social Media Integrations:
```bash
- Meta Graph API
- Instagram Graph API
- Twitter/X API
- Brevo Email API 
```

Development Tools
```bash
- Docker
- Docker Compose
- Git and GitHub
``` 
---

## Prerequisites

- Node.js and npm
- Docker Desktop
- Git
- Social media developer credentials for integrations you want to test

### How to run the application

## 1. Clone the Repository
```bash
git clone https://github.com/srijana-bhowmik/social-media-dashboard
cd social-media-dashboard
```  
## 2. Configure Environment Variables

Create the environment files required by the project.

Create frontend/.env.local:
```bash
VITE_API_URL=http://localhost:3000/api
```  
Create backend/.env :
```bash
# Server Configuration
PORT=3000

# MySQL Database Configuration
DB_HOST=mysql-container
DB_USER=appuser
DB_PORT=3306
DB_PASSWORD=your_mysql_password
DB_NAME=social_dashboard

# JWT Authentication
JWT_SECRET=your_secure_jwt_secret

# Meta / Facebook / Instagram API
META_APP_ID=your_meta_app_id
META_APP_SECRET=your_meta_app_secret

# Email Configuration
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_app_password

# Brevo Email Service
BREVO_USER=your_brevo_smtp_username
BREVO_PASS=your_brevo_smtp_password
BREVO_API_KEY=your_brevo_api_key

# Twitter/X OAuth 2.0
TWITTER_CLIENT_ID=your_twitter_client_id
TWITTER_CLIENT_SECRET=your_twitter_client_secret
TWITTER_CALLBACK_URL=http://localhost:3000/api/auth/twitter/callback
``` 

Make sure the database credentials match the MySQL configuration in docker-compose.yml.

### 3. Use three terminals:

## Start the application

Open Docker Desktop, then run this command from the project root:
```bash
docker compose up --build -d
```
Docker Compose starts the frontend, backend, and MySQL database.

## Open the application
```bash
Frontend: http://localhost:5173
Backend: http://localhost:3000
``` 
## Check logs if needed
```bash
docker compose ps
docker compose logs -f backend
``` 

<!-- ## Deployment -->

<!-- Frontend:
https://social-media-dashboard-six-tan.vercel.app

Backend:
https://social-media-dashboard-cvh5.onrender.com -->

---

## Challenges Faced

- OAuth callback handling across multiple platforms
- Cloud deployment and environment variable management
- MySQL database connectivity on Railway
- Email verification service integration
- Synchronizing analytics data using scheduled cron jobs

---

## Future Improvements

- Advanced analytics dashboard
- Export reports as PDF
- Additional social media integrations
- Real-time metric updates

---

## Author

Srijana Bhowmik
B.Tech CSE, IIT Bhilai