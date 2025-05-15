# ManageMate App

[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://react.dev/)
[![Django](https://img.shields.io/badge/Django-4.2-brightgreen)](https://www.djangoproject.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)](https://www.mysql.com/)

A comprehensive web application for managing inventory, sales, customers, and repair operations in electronics/device repair businesses.

![ManageMate App Preview](https://via.placeholder.com/800x400.png?text=ManageMate+Screenshots+Here)

## Features

### 🛒 Inventory Management
- Real-time stock level tracking
- Supplier database with contact information
- Automated low-stock alerts

### 💰 Sales & Transactions
- Daily sales recording system
- Digital invoice generation
- Payment status tracking

### 👥 Customer Management (CRM)
- Customer profiles with repair history
- Service follow-up reminders
- Customer communication logs

### 🔧 Repair Tracking
- Multi-status workflow (Pending/In-Progress/Completed)
- Technician assignment system
- Repair job history with timestamps

### 🛡️ Role-Based Access
- Admin: Full system control
- Employee: Limited operational access
- Customer: Self-service portal

### 📊 Analytics Dashboard
- Sales trend visualizations
- Inventory movement reports
- Business performance metrics

## Technology Stack
- **Frontend**: React 18 + Redux Toolkit + React Router
- **Backend**: Django REST Framework + Simple JWT
- **Database**: MySQL 8.0
- **Charts**: Recharts
- **UI Toolkit**: Material-UI

## Installation

### Prerequisites
- Python 3.10+
- Node.js 18+
- MySQL 8.0+
- Git

### Setup Instructions

1. **Clone Repository**
   ```bash
   git clone https://github.com/yourusername/managemate-app.git
   cd managemate-app
Database Setup

bash
mysql -u root -p
CREATE DATABASE managemate;
USE managemate;
# Run SQL schema from database/schema.sql
Backend Setup

bash
cd backend
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env with your credentials
Run Migrations

bash
python manage.py migrate
Frontend Setup

bash
cd ../frontend
npm install

# Configure API endpoints
cp .env.example .env.local
Configuration
Backend Environment (.env)
ini
SECRET_KEY=your_django_secret
DB_NAME=managemate
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=3306
Frontend Environment (.env.local)
ini
REACT_APP_API_BASE_URL=http://localhost:8000/api
REACT_APP_WS_BASE_URL=ws://localhost:8000/ws
Usage
Start Backend Server

bash
cd backend
python manage.py runserver
Start Frontend

bash
cd frontend
npm start
Access Application

Admin Interface: http://localhost:3000/admin

Employee Dashboard: http://localhost:3000/dashboard

Customer Portal: http://localhost:3000/portal

Testing Credentials
Role	Username	Password
Admin	admin@managemate.com	Admin@123
Employee	tech1@managemate.com	Tech@123
Customer	customer@example.com	Pass1234
API Documentation
Access Swagger docs after starting the server:
http://localhost:8000/swagger/

Contributing
Fork the repository

Create your feature branch (git checkout -b feature/your-feature)

Commit changes (git commit -m 'Add some feature')

Push to branch (git push origin feature/your-feature)

Open a Pull Request

License
Distributed under the MIT License. See LICENSE for more information.

Acknowledgments
Dashboard design inspired by Material-UI templates

Inventory management patterns from Odoo Community

JWT authentication implementation based on Django REST Framework documentation
