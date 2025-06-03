# Xenon CRM

## Overview
Xenon CRM is a scalable customer relationship management system designed to streamline sales, marketing, and customer support workflows. It leverages Redis Streams for pub-sub event handling and integrates AI-powered features using the Cohere API.

---

## Features
- User and Admin authentication with role-based access
- Real-time notifications via Redis Streams
- AI-driven insights using Cohere API
- Dashboard for managing leads, deals, and contacts
- Task and activity tracking
- Responsive UI with React frontend and Node.js backend

---

## Architecture
![Architecture Diagram](./docs/architecture.png)

---

## Technologies Used
- Node.js + Express (Backend)
- React.js (Frontend)
- Redis Streams (Pub/Sub messaging)
- MongoDB (Database)
- Cohere API (AI features)
- Docker & Docker Compose (Containerization)
- CircleCI (CI/CD pipeline)

---

## Getting Started

### Prerequisites
- Node.js v22+
- Redis
- MongoDB

### Installation

```bash
git clone https://github.com/yesiamkriti/mini-crm.git
cd mini-crm
```

## Environment Variables
Create a .env file:

```bash
PORT=4000
MONGO_URI=mongodb://localhost:27017/xenoncrm
REDIS_HOST=localhost
COHERE_API_KEY=your_cohere_api_key
```

Running Locally
```bash

npm install
npm run dev  # For backend
cd frontend && npm install && npm start
```


---

## 2. Architecture Diagram

- **Frontend (React)** — communicates with Backend via REST API
- **Backend (Node.js/Express)** — exposes API, handles business logic
- **MongoDB** — stores persistent data (users, CRM data)
- **Redis Streams** — handles pub-sub for event notifications (real-time updates)
- **Cohere API** — external AI service for insights and NLP tasks

## Contributing
Feel free to open issues or submit pull requests.

## License
MIT License

