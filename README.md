# GreenKeyper 🚗

GreenKeyper is a **digital vehicle inspection and reporting system (DVIR)** designed to streamline and modernize traditional paper-based vehicle inspection workflows. The platform enables drivers to submit inspection checklists digitally, store records securely, and allow admins to review inspection data efficiently.

This repository focuses on the **backend implementation**, providing RESTful APIs to support web and mobile clients.

---

## Features

* User authentication and role-based access (drivers/admins)
* Digital vehicle inspection checklists (DVIR)
* Secure storage of inspection records
* Admin dashboard support for reviewing inspections
* RESTful API architecture
* MySQL database integration
* Validation and business logic for compliance

---

## Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MySQL
* **API Testing:** Postman
* **Version Control:** Git & GitHub

---

## Project Structure

```
GreenKeyper/
│── routes/          # API route handlers
│── controllers/     # Business logic
│── models/          # Database models
│── config/          # Database & environment configuration
│── middleware/      # Authentication & validation middleware
│── server.js        # Entry point of the application
│── package.json
```

---

## Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/areesharehmat/greenkeyper.git
   cd greenkeyper
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory and add:

   ```env
   DB_HOST=localhost
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=greenkeyper
   PORT=3000
   ```

4. **Start the server**

   ```bash
   npm start
   ```

The server will run on `http://localhost:3000`

---

##  API Usage

* APIs follow REST conventions
* Requests and responses are in JSON format
* Use **Postman** to test endpoints

Example:

```
POST /api/inspections
GET  /api/inspections/:id
```

---

## Use Case

GreenKeyper is designed for:

* Fleet management companies
* Logistics and transport services
* Organizations seeking compliance with vehicle safety inspections

It reduces paperwork, improves data accuracy, and ensures inspection history is always accessible.

---

## Future Improvements

* JWT-based authentication
* Image upload support for vehicle damage reporting
* Analytics dashboard for admins
* Mobile app integration

---
