# 🧳 Tripzy – Explore Unique Stays & Seamless Travel Experiences

**Tripzy** is a feature-rich full-stack web application built using the **MERN** stack (MongoDB, Express.js, Node.js – without React). The project allows users to discover, list, and review unique stays worldwide while emphasizing usability, security, and seamless user interaction.

This platform reflects my skills in designing, developing, and deploying scalable web applications using modern web technologies and best practices in full-stack development.

🔗 **Live**: [https://tripzy-zbkc.onrender.com/](https://tripzy-zbkc.onrender.com/)

---

## 📌 Table of Contents
- [Key Features](##key-features)  
- [Technologies Used](##technologies-used)  
- [Technical Implementation](##technical-implementation)  
- [Dependencies](##dependencies)  
- [Setup Instructions](##setup-instructions)  
- [Environment Variables](##environment-variables)  
- [Explore the Code](##explore-the-code)  
- [Contact](##contact)

---

## ✅ Key Features

### 🔐 User Authentication
- Secure session-based login and signup.
- Access to specific features is restricted to authenticated users.

### 🏡 Dynamic Listing Management
- Full CRUD support for property listings.
- Listings include property descriptions, amenities, pricing, and image uploads.

### ✨ Review System
- Authenticated users can leave reviews and ratings.
- Only users who have interacted with a listing can review it.

### 🗺️ Interactive Maps
- Listings are displayed with geographic markers using Mapbox.
- Users can explore accommodations via an interactive map interface.

### 🔒 Permissions and Security
- Only listing owners can update or delete their listings.
- Only review authors can delete their reviews.

---

## 🛠️ Technologies Used

| Layer        | Technologies                            |
|--------------|------------------------------------------|
| Frontend     | HTML, CSS, JavaScript, Bootstrap, EJS   |
| Backend      | Node.js, Express.js                     |
| Database     | MongoDB                                 |
| Authentication | Passport.js                          |
| File Uploads | Cloudinary, Multer                      |
| Maps         | Mapbox API                              |
| Deployment   | Render                                   |

---

## ⚙️ Technical Implementation

### 🌐 RESTful API
- Follows REST architecture for cleaner and scalable route design.
- Intuitive endpoints for user, listing, and review management.

### ✍️ CRUD Operations
- Listings and reviews support full Create, Read, Update, Delete functionality.

### 🔁 Middleware
- Authentication checks, validation, and error handling.

### 🔐 Session Management
- Sessions handled securely using `express-session` and `passport`.

### ✅ Form Validation
- All user input is validated using `Joi` for security and correctness.

### 📸 File Uploads
- Users can upload images using `Multer`, which are stored and served via Cloudinary.

### 🗺️ Map Integration
- Mapbox displays listings on an interactive map with location markers.

### 🧱 MVC Architecture
- Clean separation using Model-View-Controller design principles.

---

## 📦 Dependencies

- `@mapbox/mapbox-sdk`
- `bootstrap`
- `cloudinary`
- `connect-flash`
- `cookie-parser`
- `dotenv`
- `ejs`, `ejs-mate`
- `express`, `express-session`
- `joi`
- `method-override`
- `mongoose`
- `multer`, `multer-storage-cloudinary`
- `passport`, `passport-local`, `passport-local-mongoose`

---

## 🧪 Setup Instructions

### 1. Clone the Repository

```bash
  git clone https://github.com/nakulKumar10010/Tripzy.git
  cd Tripzy
```

### 2. Install Dependencies

```bash
npm install
```
## 🌍 Environment Variables
- Create a .env file in the root directory and add the following variables:
```.env
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
MAP_TOKEN=your_mapbox_access_token
DB_URL=your_mongodb_connection_string (optional if using local)
SECRET=session_secret_key

```
## ▶️ Start the Application
- Ensure you have MongoDB running locally (or use Atlas). Then:

```bash
cd init
node index.js
cd ..
nodemon app.js
```
- The server will run on http://localhost:8080.

## 🔍 Explore the Code
💻 GitHub Repository: [https://github.com/nakulKumar10010/Tripzy](https://github.com/nakulKumar10010/Tripzy)

## 📬 Contact
🔗 LinkedIn: [Nakul](www.linkedin.com/in/nakul2004)

- Thank you for exploring Tripzy!
- Feel free to reach out for feedback, collaboration, or questions.

### Code. Create. Deploy. - Nakul 
