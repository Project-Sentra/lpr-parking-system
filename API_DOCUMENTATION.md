# Sentra LPR Parking System - API Documentation

## Table of Contents
1. [Overview](#overview)
2. [Base URL](#base-url)
3. [Authentication](#authentication)
4. [Response Format](#response-format)
5. [Error Codes](#error-codes)
6. [Authentication Endpoints](#authentication-endpoints)
7. [Parking Management Endpoints](#parking-management-endpoints)
8. [Vehicle Entry/Exit Endpoints](#vehicle-entryexit-endpoints)
9. [Camera Management Endpoints](#camera-management-endpoints)
10. [Detection Logs Endpoints](#detection-logs-endpoints)
11. [System Management Endpoints](#system-management-endpoints)
12. [Data Models](#data-models)

---

## Overview

The Sentra LPR (License Plate Recognition) Parking System API provides a comprehensive REST API for managing parking operations, including vehicle entry/exit, parking spot allocation, camera configuration, and real-time license plate detection logging.

**Version:** 1.0  
**Language:** Python/Flask  
**Database:** Supabase (PostgreSQL)  
**Authentication:** JWT Bearer Token

---

## Base URL

```
http://localhost:5000/api
```

For production deployments:
```
https://your-domain.com/api
```

---

## Authentication

Most endpoints require authentication using JWT Bearer tokens obtained from the login endpoint.

### Authentication Header Format
```http
Authorization: Bearer <access_token>
```

### Protected Endpoints
All endpoints marked with 🔒 require authentication.

---

## Response Format

### Success Response
```json
{
  "message": "Success message",
  "data": { ... }
}
```

### Error Response
```json
{
  "message": "Error description"
}
```

---

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Authentication failed |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Resource already exists |
| 500 | Internal Server Error |
| 503 | Service Unavailable |

---

## Authentication Endpoints

### 1. User Sign Up

**Endpoint:** `POST /api/signup`

**Description:** Register a new admin user.

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "securePassword123"
}
```

**Validation:**
- Email is required
- Password must be at least 6 characters

**Success Response (201):**
```json
{
  "message": "User created successfully! Please check your email to verify.",
  "user_id": "uuid-string"
}
```

**Error Responses:**
- `400` - Missing email/password or password too short
- `400` - User already exists
- `500` - Server error

---

### 2. User Login

**Endpoint:** `POST /api/login`

**Description:** Authenticate user and receive access tokens.

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "securePassword123"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful!",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "refresh_token_string",
  "user": {
    "id": "uuid-string",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

**Error Responses:**
- `400` - Missing email/password
- `401` - Invalid credentials

---

## Parking Management Endpoints

### 3. Get All Parking Spots 🔒

**Endpoint:** `GET /api/spots`

**Description:** Retrieve all parking spots and their occupancy status.

**Headers:**
```http
Authorization: Bearer <access_token>
```

**Success Response (200):**
```json
{
  "spots": [
    {
      "id": 1,
      "name": "A-01",
      "is_occupied": false
    },
    {
      "id": 2,
      "name": "A-02",
      "is_occupied": true
    }
  ]
}
```

**Error Responses:**
- `401` - Authentication required
- `500` - Error fetching spots

---

### 4. Initialize Parking Spots

**Endpoint:** `POST /api/init-spots`

**Description:** One-time setup to create 32 parking spots (A-01 to A-32).

**Success Response (201):**
```json
{
  "message": "32 Parking spots created successfully!"
}
```

**Error Responses:**
- `400` - Spots already initialized

---

### 5. Get Parking Logs 🔒

**Endpoint:** `GET /api/logs`

**Description:** Retrieve recent parking session history (last 50 entries).

**Headers:**
```http
Authorization: Bearer <access_token>
```

**Success Response (200):**
```json
{
  "logs": [
    {
      "id": 1,
      "plate_number": "ABC-1234",
      "spot": "A-01",
      "entry_time": "2026-01-21T10:30:00",
      "exit_time": "2026-01-21T12:45:00",
      "duration_minutes": 135,
      "amount_lkr": 300
    }
  ]
}
```

---

## Vehicle Entry/Exit Endpoints

### 6. Vehicle Entry

**Endpoint:** `POST /api/vehicle/entry`

**Description:** Register a vehicle entry and assign a parking spot.

**Request Body:**
```json
{
  "plate_number": "ABC-1234"
}
```

**Business Logic:**
1. Checks if vehicle is already parked (active session exists)
2. Finds the first available free spot
3. Marks spot as occupied
4. Creates parking session with entry timestamp

**Success Response (200):**
```json
{
  "message": "Vehicle ABC-1234 parked at A-01",
  "spot": "A-01",
  "status": "assigned"
}
```

**Error Responses:**
- `400` - Missing plate_number
- `404` - Parking is full
- `409` - Vehicle already parked

---

### 7. Vehicle Exit

**Endpoint:** `POST /api/vehicle/exit`

**Description:** Process vehicle exit, calculate charges, and free the parking spot.

**Request Body:**
```json
{
  "plate_number": "ABC-1234"
}
```

**Pricing Logic:**
- Rate: LKR 150 per hour
- Minimum charge: 1 hour
- Billing: Rounded up to nearest hour

**Success Response (200):**
```json
{
  "message": "Spot A-01 is now free!",
  "duration_minutes": 135,
  "amount_charged": 300
}
```

**Error Responses:**
- `400` - Missing plate_number
- `404` - No active session found

---

## Camera Management Endpoints

### 8. Get LPR Service Status 🔒

**Endpoint:** `GET /api/lpr/status`

**Description:** Check connection status with SentraAI LPR service.

**Headers:**
```http
Authorization: Bearer <access_token>
```

**Success Response (200):**
```json
{
  "connected": true,
  "service": "SentraAI",
  "version": "1.0.0",
  "cameras_active": 2,
  "camera_mode": "live"
}
```

**Error Responses:**
- `503` - Service unavailable or disconnected

---

### 9. Get All Cameras 🔒

**Endpoint:** `GET /api/cameras`

**Description:** Retrieve all configured cameras.

**Headers:**
```http
Authorization: Bearer <access_token>
```

**Success Response (200):**
```json
{
  "cameras": [
    {
      "id": 1,
      "camera_id": "entry_cam_01",
      "name": "Entry Gate 01",
      "type": "entry",
      "source_url": "rtsp://camera-ip:554/stream",
      "is_active": true
    }
  ]
}
```

---

### 10. Add Camera 🔒

**Endpoint:** `POST /api/cameras`

**Description:** Add a new camera configuration.

**Headers:**
```http
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "camera_id": "entry_cam_02",
  "name": "Entry Gate 02",
  "type": "entry",
  "source_url": "rtsp://192.168.1.100:554/stream"
}
```

**Validation:**
- `camera_id`, `name`, and `type` are required
- `type` must be either "entry" or "exit"

**Success Response (201):**
```json
{
  "message": "Camera Entry Gate 02 added successfully",
  "id": 3
}
```

**Error Responses:**
- `400` - Missing required fields or invalid type
- `409` - Camera ID already exists

---

### 11. Delete Camera 🔒

**Endpoint:** `DELETE /api/cameras/<camera_id>`

**Description:** Remove a camera configuration.

**Headers:**
```http
Authorization: Bearer <access_token>
```

**Success Response (200):**
```json
{
  "message": "Camera entry_cam_02 deleted"
}
```

**Error Responses:**
- `404` - Camera not found

---

### 12. Initialize Default Cameras 🔒

**Endpoint:** `POST /api/cameras/init`

**Description:** Create default entry and exit cameras.

**Headers:**
```http
Authorization: Bearer <access_token>
```

**Success Response (201):**
```json
{
  "message": "2 cameras initialized successfully"
}
```

**Error Responses:**
- `400` - Cameras already initialized

---

## Detection Logs Endpoints

### 13. Get Detection Logs 🔒

**Endpoint:** `GET /api/detection-logs`

**Description:** Retrieve recent plate detection logs from LPR service.

**Headers:**
```http
Authorization: Bearer <access_token>
```

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| limit | integer | 50 | Number of logs to retrieve |

**Example:**
```
GET /api/detection-logs?limit=100
```

**Success Response (200):**
```json
{
  "logs": [
    {
      "id": 1,
      "camera_id": "entry_cam_01",
      "plate_number": "ABC-1234",
      "confidence": 0.95,
      "detected_at": "2026-01-21T10:30:00",
      "action_taken": "entry",
      "vehicle_class": "car"
    }
  ]
}
```

---

### 14. Add Detection Log

**Endpoint:** `POST /api/detection-logs`

**Description:** Log a new plate detection (typically called by LPR service).

**Note:** This endpoint is public (no authentication required) to allow the LPR service to send detections.

**Request Body:**
```json
{
  "camera_id": "entry_cam_01",
  "plate_number": "ABC-1234",
  "confidence": 0.95,
  "action_taken": "pending",
  "vehicle_class": "car"
}
```

**Success Response (201):**
```json
{
  "message": "Detection logged",
  "id": 123
}
```

**Error Responses:**
- `400` - Missing camera_id or plate_number

---

### 15. Update Detection Action 🔒

**Endpoint:** `PATCH /api/detection-logs/<log_id>/action`

**Description:** Update the action taken for a detection log (manual approval/rejection).

**Headers:**
```http
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "action": "entry"
}
```

**Valid Actions:**
- `entry` - Approved for vehicle entry
- `exit` - Approved for vehicle exit
- `ignored` - Detection ignored/rejected

**Success Response (200):**
```json
{
  "message": "Action updated to entry"
}
```

**Error Responses:**
- `400` - Invalid action value
- `404` - Detection log not found

---

## System Management Endpoints

### 16. Reset System

**Endpoint:** `POST /api/reset-system`

**Description:** Clear all parking sessions and free all spots (for demo/testing purposes).

**Warning:** This operation is destructive and cannot be undone.

**Success Response (200):**
```json
{
  "message": "System reset! All spots are now free."
}
```

**Error Responses:**
- `500` - Reset failed

---

## Data Models

### Parking Spot
```json
{
  "id": "integer",
  "spot_name": "string (e.g., 'A-01')",
  "is_occupied": "boolean"
}
```

### Parking Session
```json
{
  "id": "integer",
  "plate_number": "string",
  "spot_name": "string",
  "entry_time": "ISO 8601 datetime",
  "exit_time": "ISO 8601 datetime or null",
  "duration_minutes": "integer or null",
  "amount_lkr": "integer or null"
}
```

### Camera
```json
{
  "id": "integer",
  "camera_id": "string (unique)",
  "name": "string",
  "camera_type": "enum: 'entry' | 'exit'",
  "source_url": "string (RTSP/HTTP URL or empty)",
  "is_active": "boolean"
}
```

### Detection Log
```json
{
  "id": "integer",
  "camera_id": "string",
  "plate_number": "string",
  "confidence": "float (0.0 - 1.0)",
  "detected_at": "ISO 8601 datetime",
  "action_taken": "enum: 'pending' | 'entry' | 'exit' | 'ignored'",
  "vehicle_class": "string (optional, e.g., 'car', 'truck', 'motorcycle')"
}
```

### User
```json
{
  "id": "uuid string",
  "email": "string",
  "role": "string (default: 'admin')",
  "auth_user_id": "uuid string (Supabase Auth ID)"
}
```

---

## Integration Notes

### LPR Service Integration

The admin backend integrates with SentraAI LPR service running on `http://127.0.0.1:5001`.

**Service Health Check:**
```http
GET http://127.0.0.1:5001/api/health
```

**Expected Response:**
```json
{
  "service": "SentraAI",
  "version": "1.0.0",
  "cameras_active": 2,
  "camera_mode": "live"
}
```

### WebSocket Events (Future Enhancement)

Real-time updates for:
- Vehicle entry/exit events
- Spot occupancy changes
- Detection confirmations

---

## Rate Limiting

Currently, there are no rate limits implemented. For production deployment, consider implementing:
- 100 requests per minute per IP for public endpoints
- 1000 requests per minute for authenticated endpoints

---

## CORS Configuration

CORS is enabled for all origins in development mode. For production:
- Restrict to specific frontend domains
- Configure allowed methods: GET, POST, PATCH, DELETE
- Configure allowed headers: Authorization, Content-Type

---

## Security Best Practices

1. **Always use HTTPS in production**
2. **Rotate access tokens regularly** (implement refresh token flow)
3. **Validate all input data** server-side
4. **Implement request logging** for audit trails
5. **Use environment variables** for sensitive configuration
6. **Enable RLS (Row Level Security)** in Supabase

---

## Environment Variables

Required environment variables:

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-public-key
```

Optional:
```bash
LPR_SERVICE_URL=http://127.0.0.1:5001
FLASK_ENV=development
```

---

## Testing Examples

### Using cURL

**Login:**
```bash
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}'
```

**Get Spots (with auth):**
```bash
curl -X GET http://localhost:5000/api/spots \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Vehicle Entry:**
```bash
curl -X POST http://localhost:5000/api/vehicle/entry \
  -H "Content-Type: application/json" \
  -d '{"plate_number":"ABC-1234"}'
```

### Using Postman

1. Create a new collection named "Sentra LPR API"
2. Set base URL variable: `{{base_url}}` = `http://localhost:5000/api`
3. Create authentication request and save token to environment
4. Use `{{access_token}}` in Authorization header for protected routes

---

## Changelog

### Version 1.0.0 (January 2026)
- Initial API release
- Authentication with Supabase Auth
- Parking spot management
- Vehicle entry/exit processing
- Camera configuration
- Detection logging
- System reset functionality

---

## Support & Contact

For API support and questions:
- **Repository:** [github.com/Project-Sentra/lpr-parking-system](https://github.com/Project-Sentra/lpr-parking-system)
- **Issues:** [GitHub Issues](https://github.com/Project-Sentra/lpr-parking-system/issues)
- **Documentation:** See README.md for setup instructions

---

**Document Version:** 1.0  
**Last Updated:** January 21, 2026  
**Maintained By:** Project Sentra Team
