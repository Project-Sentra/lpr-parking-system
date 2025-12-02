<div align="center">
  <img src="admin_frontend/src/assets/logo_notext.png" alt="Sentra" width="72" height="72" />
  
  <h1>Sentra – LPR Parking System</h1>
  <p>A modern, admin‑friendly parking management platform powered by License Plate Recognition.</p>
</div>

## Overview

This repository contains the complete source code for the Sentra LPR Parking System. It consists of a React-based admin dashboard and a Flask backend that manages parking sessions, facilities, and live updates.

The system allows admins to:
- Monitor parking occupancy in real-time.
- View live revenue and vehicle statistics.
- Track vehicle entry and exit logs.
- Manage parking facilities.

## Tech Stack

- **Frontend:** React 19, Vite 7, Tailwind CSS v4
- **Backend:** Python 3, Flask, SQLAlchemy
- **Database:** PostgreSQL

## Prerequisites

Before running the project, ensure you have the following installed on your laptop:

1.  **Node.js** (v18 or higher)
    - Download: [nodejs.org](https://nodejs.org/)
    - Verify: `node -v` and `npm -v`
2.  **Python** (v3.10 or higher)
    - Download: [python.org](https://www.python.org/)
    - Verify: `python --version` or `python3 --version`
3.  **PostgreSQL** (v14 or higher)
    - Download: [postgresql.org](https://www.postgresql.org/download/)
    - Verify: Ensure the PostgreSQL service is running and you can access it (e.g., via pgAdmin or terminal).

## Installation & Setup Guide

Follow these steps in order to get the site running perfectly.

### 1. Database Setup

1.  Install PostgreSQL if you haven't already.
2.  Create a new database named `sentra_db`.
    - **Terminal:**
      ```bash
      createdb sentra_db
      ```
    - **pgAdmin:** Right-click Databases > Create > Database > Name it `sentra_db`.

> **Important:** If your PostgreSQL user has a password (default for Windows installers), you **must** update the database connection string in the backend code.
> 1. Open `admin_backend/app.py`.
> 2. Find the line: `app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/sentra_db'`
> 3. Change it to: `postgresql://postgres:YOUR_PASSWORD@localhost/sentra_db` (Replace `YOUR_PASSWORD` with your actual password).

### 2. Backend Setup (Python/Flask)

1.  Open your terminal (Command Prompt, PowerShell, or Terminal).
2.  Navigate to the backend directory:
    ```bash
    cd admin_backend
    ```

3.  Create a virtual environment (Recommended):
    - **Windows:**
      ```bash
      python -m venv venv
      venv\Scripts\activate
      ```
    - **macOS/Linux:**
      ```bash
      python3 -m venv venv
      source venv/bin/activate
      ```

4.  Install Python dependencies:
    ```bash
    pip install -r requirements.txt
    ```

5.  Initialize the database:
    This script clears the database and creates the initial parking spots.
    ```bash
    python reset_db.py
    ```
    *(If `python` doesn't work, try `python3`)*

6.  Start the Flask server:
    ```bash
    python app.py
    ```
    You should see: `Running on http://127.0.0.1:5000`

### 3. Frontend Setup (React)

1.  Open a **new** terminal window (keep the backend running in the first one).
2.  Navigate to the frontend directory:
    ```bash
    cd admin_frontend
    ```

3.  Install Node dependencies:
    ```bash
    npm install
    ```

4.  Start the development server:
    ```bash
    npm run dev
    ```
    You should see: `Local: http://localhost:5173`

## Usage

1.  Open your browser and go to `http://localhost:5173`.
2.  You will see the Admin Dashboard with live status.
3.  **Simulating Vehicle Entry/Exit:**
    Since physical LPR cameras are not connected, use **Postman** or **cURL** to simulate events.

    **Entry Request:**
    - **URL:** `POST http://127.0.0.1:5000/api/vehicle/entry`
    - **Body (JSON):**
      ```json
      { "plate_number": "WP CA-1234" }
      ```

    **Exit Request:**
    - **URL:** `POST http://127.0.0.1:5000/api/vehicle/exit`
    - **Body (JSON):**
      ```json
      { "plate_number": "WP CA-1234" }
      ```

    The dashboard and "In & Out" logs will update automatically in real-time.

## Troubleshooting

-   **Database Connection Error:**
    -   Ensure PostgreSQL is running.
    -   Check if `sentra_db` exists.
    -   Verify your username/password in `admin_backend/app.py`.
-   **Port Already in Use:**
    -   If port 5000 is busy, find the process using it and kill it, or change the port in `app.py`.
-   **Module Not Found:**
    -   Ensure you activated the virtual environment (`venv`) before running `pip install`.

## Project Structure

```
lpr-parking-system/
├─ admin_frontend/     # React Frontend
│  ├─ src/
│  │  ├─ components/   # Reusable UI components
│  │  ├─ pages/        # Application pages (Dashboard, InOut, etc.)
│  └─ ...
├─ admin_backend/      # Flask Backend
│  ├─ app.py           # Main application entry & models
│  ├─ routes.py        # API endpoints
│  ├─ reset_db.py      # Database initialization script
│  └─ requirements.txt # Python dependencies
└─ README.md           # Project documentation
```

## License
This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

