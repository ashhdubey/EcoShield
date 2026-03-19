# 🛡️ EcoShield v3.5

**Protect Yourself, Protect Earth**

EcoShield is a full-stack web application designed to provide real-time, location-based environmental data to help users protect themselves from harmful UV radiation and poor air quality.

Originally a hackathon project, EcoShield has been rebuilt with a **Spring Boot backend** and a **React frontend**. The application not only offers personalized protection advice but also educates users about the importance of ozone layer protection and environmental consciousness.

---

## ✨ Key Features

* 🔐 **Secure Authentication**: Robust user registration and login system using Spring Security and JWT tokens.
* 🌐 **Live Geo-located Data**: Real-time UV Index, Air Quality Index (AQI), and Temperature detection using the OpenWeatherMap API.
* 💯 **Custom EcoShield Grade**: A proprietary algorithm that generates an A–E grade for at-a-glance environmental risk assessment.
* 💡 **Hyper-Personalized Suggestions**: Actionable precautions tailored to the current environmental grade and the user's saved skin type.
* 👤 **User Profile Management**: Users can save and update personal details like skin type, age, and gender to receive more accurate advice.
* 📊 **7-Day Historical Chart**: An interactive chart on the "MyShield" dashboard visualizes trends for UV Index and AQI over the past week.
* 🌍 **Dynamic Homepage Preview**: Visitors get an instant preview of the live UV Index for their current location.
* 🎨 **Dual Theme UI**: A modern, responsive interface with both light and dark modes, built with Tailwind CSS and shadcn/ui.
* 📚 **Educational Content**: Dedicated pages that explain the history of ozone depletion and suggest actionable steps for environmental protection.

---

## 📸 Screenshots

* **Dark Theme Dashboard** – MyShield page in dark mode
* **Light Theme Homepage** – Homepage in light mode
* **Team Page** – About Us page

---

## 🛠️ Tech Stack

| Category     | Technology                                                                |
| ------------ | ------------------------------------------------------------------------- |
| **Frontend** | React, Vite, TypeScript, Tailwind CSS, shadcn/ui, Recharts, Framer Motion |
| **Backend**  | Spring Boot, Java, Spring Security (JWT), Spring Data JPA                 |
| **Database** | PostgreSQL                                                                |
| **APIs**     | OpenWeatherMap API for live environmental data                            |

---

## 🚀 Getting Started: Running Locally

### Prerequisites

* Java 17 or higher
* Node.js and npm
* PostgreSQL
* Free API key from OpenWeatherMap

---

### 1. Clone the repository

```bash
git clone https://github.com/ashhdubey/EcoShield-Project.git
cd EcoShield-Project
```

---

### 2. Backend Setup (Server)

1. Open the **server** directory in IntelliJ IDEA (or another Java IDE).
2. Create a PostgreSQL database named `ecoshield_db`.
3. Navigate to `server/src/main/resources/` and create `application.properties`.
4. Add the following configuration (replace placeholders with your details):

```properties
# --- DATABASE CONNECTION ---
spring.datasource.url=jdbc:postgresql://localhost:5432/ecoshield_db
spring.datasource.username=postgres
spring.datasource.password=YOUR_POSTGRES_PASSWORD

# --- JPA/HIBERNATE SETTINGS ---
spring.jpa.hibernate.ddl-auto=update
spring.jpa.defer-datasource-initialization=true

# --- SQL SCRIPT INITIALIZATION ---
spring.sql.init.mode=always

# --- SERVER PORT ---
server.port=8080

# --- SECURITY ---
jwt.secret=aVeryLongAndSecureSecretKeyForEcoShieldApplicationDevelopment

# --- EXTERNAL API KEYS ---
openweather.api.key=YOUR_OPENWEATHERMAP_API_KEY
```

5. Run the Spring Boot application from your IDE.

   * Backend will be available at: `http://localhost:8080`

---

### 3. Frontend Setup (Client)

1. Open a new terminal and navigate to the **Client** directory:

   ```bash
   cd Client
   ```
2. Install packages:

   ```bash
   npm install
   ```
3. Run the development server:

   ```bash
   npm run dev
   ```
4. Open in browser: [http://localhost:5173](http://localhost:5173)

---

## 🤝 Meet The Team

* **Ashish Kumar Dubey** – Technical Lead & Backend Engineer
* **Ashutosh Pandey** – Data Engineer & Research Analyst
* **Gemini** – Debugger & QA Specialist

---
