# 🎉 EventManage

A full-stack event management application where users can **create accounts, host events, and attend events** seamlessly.

## Tech Stack
- **Frontend:** React, TypeScript, TailwindCSS, React Query, React Hook Form, Context API  
- **Backend:** Node.js, Express, MongoDB  
- **Storage & Hosting:** Cloudinary (Image Uploads), Render (Backend), Vercel (Frontend)

## ✨ Features
- **User Authentication:** Register & login securely with JWT-based auth  
- **Event Management:** Create, view, and manage events  
- **Attendee Registration:** Users can register for events  
- **Image Uploads:** Events support image uploads via Cloudinary  
- **Filtering & Sorting:** View **upcoming & past events** with filters  

## 📦 Setup Instructions
1. **Clone the Repository:**
   ```sh
   git clone https://github.com/your-repo/eventmanage.git
   cd eventmanage
   ```

2. **Install Dependencies (Client & Server)**
   ```sh
   cd client && npm install  # Install frontend dependencies
   cd ../server && npm install  # Install backend dependencies
   ```

3. **Configure Environment Variables (`.env`)**
   - Add **MongoDB URI**, **Cloudinary Keys**, and **JWT Secret**  
   - Set **Frontend URL in Backend** (CORS configuration)

4. **Run the Application**
   ```sh
   # Start Backend
   cd server
   npm run dev

   # Start Frontend
   cd client
   npm run dev
   ```

5. **Deploy**  
   - **Frontend:** Deploy on **Vercel**  
   - **Backend:** Deploy on **Render**

## 🎯 Live Demo
🔗 **Frontend:** https://event-management-roan-theta.vercel.app/
🔗 **Backend:** https://event-management-1n3t.onrender.com

Try it out with the user - 
email - awesomeUser@gmail.com
password - 123456

Or make an account of your own!!
