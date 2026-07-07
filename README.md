# Social Media Dashboard

## Overview

A centralized Social Media Dashboard that allows users to connect Facebook, Instagram, and Twitter/X accounts and monitor engagement metrics from a single platform.

The system eliminates the need to manually switch between different social media platforms by aggregating analytics into one dashboard.

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
- React.js
- Vite
- Tailwind CSS
- Chart.js

Backend:
- Node.js
- Express.js
- JWT
- bcryptjs
- Node Cron

Database:
- MySQL

External Services/Social Media Integrations:
- Meta Graph API
- Instagram Graph API
- Twitter/X API
- Brevo Email API

Deployment:
- Vercel
- Render
- Railway

---

## Deployment

Frontend:
https://social-media-dashboard-six-tan.vercel.app

Backend:
https://social-media-dashboard-cvh5.onrender.com

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