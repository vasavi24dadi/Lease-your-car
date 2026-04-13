# 🚗 Lease Your Car - Distance-Based Rental Platform

A modern full-stack web application for car rentals with **distance-based pricing** and **real-time notifications**.

## ✨ Features

✅ **User Authentication** - Register/Login with phone validation  
✅ **Distance-Based Pricing** - Pay per kilometer, not per day  
✅ **Time Tracking** - Book with specific start/end times  
✅ **Real-Time Notifications** - Instant alerts via Socket.io  
✅ **Booking Management** - Approve/reject bookings instantly  
✅ **Car Listing** - Browse available cars with filters  
✅ **Responsive Design** - Works on desktop and mobile  

---

## 🛠️ Tech Stack

### **Frontend**
- React 19
- Tailwind CSS
- Axios
- Socket.io Client

### **Backend**
- Node.js + Express.js
- PostgreSQL
- Socket.io
- JWT Authentication
- Multer (Image Upload)

### **Database**
- PostgreSQL
- Real-time notifications storage

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v18+)
- PostgreSQL
- Git

### **Installation**

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/Lease-your-Car.git
cd Lease-your-Car
```

2. **Backend Setup:**
```bash
cd backend
npm install
cp .env.example .env
# Update .env with your PostgreSQL credentials
npm start
```

3. **Frontend Setup:**
```bash
cd frontend
npm install
cp .env.example .env
# Update .env with backend URL
npm start
```

4. **Access the app:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

---

## 📱 How to Use

### **For Car Owners:**
1. Register as an "Owner"
2. Add cars with distance-based pricing (e.g., ₹15/km)
3. Receive real-time booking notifications
4. Approve or reject bookings
5. See all customer bookings with distance details

### **For Customers:**
1. Register as a "Customer"
2. Browse available cars
3. Book a car with:
   - Start/End dates
   - Start/End times
   - Distance (in kilometers)
4. See instant price calculation
5. Receive notifications when booking is approved/rejected

---

## 💰 Pricing Example

| Car | Price/km | Distance | Total Price |
|-----|----------|----------|------------|
| Tesla | ₹30/km | 50 km | ₹1,500 |
| BMW | ₹25/km | 75 km | ₹1,875 |
| Hyundai | ₹15/km | 100 km | ₹1,500 |

---

## 🔔 Real-Time Features

- **WebSocket Connection** - Instant notifications for:
  - New booking alerts to owners
  - Booking approval/rejection to customers
  - Persistent notification storage

---

## 📊 Database Schema

### Users Table
- id, name, email, phone, password, role, created_at, updated_at

### Cars Table
- id, owner_id, car_name, location, price_per_km, car_image, created_at, updated_at

### Bookings Table
- id, user_id, car_id, start_date, start_time, end_date, end_time, distance, price_per_km, total_price, status, created_at, updated_at

### Notifications Table
- id, owner_id, booking_id, message, is_read, created_at, updated_at

---

## 🔐 Environment Variables

### Backend (.env)
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lease_your_car
DB_USER=postgres
DB_PASSWORD=your_password
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
```

---

## 🚀 Deployment

Deploy on [Render.com](https://render.com) for free!

### Backend Deployment:
1. Create Web Service on Render
2. Connect GitHub repo
3. Set Build Command: `npm install`
4. Set Start Command: `npm start`
5. Add PostgreSQL database addon

### Frontend Deployment:
1. Create Static Site on Render
2. Build Command: `cd frontend && npm run build`
3. Publish Directory: `frontend/build`

---

## 📝 API Endpoints

### User Routes
- `POST /auth/register` - Register user
- `POST /auth/login` - Login user

### Car Routes
- `GET /cars` - List all cars
- `POST /cars` - Add new car (owner)
- `GET /cars/:id` - Get car details

### Booking Routes
- `POST /bookings` - Book a car
- `GET /bookings` - Get user's bookings
- `GET /bookings/owner` - Get owner's car bookings
- `PUT /bookings/:booking_id/approve` - Approve booking
- `PUT /bookings/:booking_id/reject` - Reject booking
- `GET /bookings/notifications/list` - Get notifications

---

## ❤️ Contributing

Feel free to fork and submit pull requests!

---

## 📄 License

MIT License - Feel free to use this project

---

## 📧 Support

For issues, questions, or suggestions, please open an issue on GitHub.

**Happy Coding! 🚀**
