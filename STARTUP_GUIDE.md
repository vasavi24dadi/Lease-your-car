# 🚀 LeaseYourCar - Quick Start Guide

## Starting the Application

### Step 1: Start PostgreSQL Database
Make sure PostgreSQL is running on your system.

### Step 2: Setup Backend

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Start the server
node server.js
```

You should see:
```
[dotenv] injecting env...
Server started on http://localhost:5000
PostgreSQL connected successfully
```

### Step 3: Setup Frontend

```bash
# In a NEW terminal, navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The frontend will open at `http://localhost:3000`

## 🧪 Testing the Application

### 1. **Create an Owner Account**
- Go to `/register`
- Select "Owner" role
- Fill in details
- Register
- You'll be redirected to Add Car page

### 2. **Add a Car**
- Upload car image
- Fill in car details
- Set daily price
- Submit
- Car appears on market

### 3. **Create a Customer Account** (Use different email)
- Go to `/register`
- Select "Customer" role
- Register
- Browse available cars

### 4. **Book a Car**
- Click "Book Now" on any car
- Select dates and times
- Confirm booking

### 5. **Approve Booking (as Owner)**
- Go to Owner Dashboard
- See pending bookings
- Click to expand
- Approve the booking

### 6. **Chat**
- Message owner (as customer)
- Message customer (as owner)
- Messages auto-refresh every 3 seconds

### 7. **Rate the Car**
- After booking completion
- Click rating component
- Select stars
- Write review
- Submit

## 📊 API Testing with Postman

### Setup:
1. Create a new Postman collection
2. Set base URL to `http://localhost:5000/api`

### Common Requests:

**Register:**
```
POST /users/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "customer"
}
```

**Login:**
```
POST /users/login
{
  "email": "john@example.com",
  "password": "password123"
}
```
Save the token from response and use in headers:
```
Authorization: Bearer <your_token>
```

**Add Car (Owner only):**
```
POST /cars/add
Headers: Authorization: Bearer <token>
FormData:
  - car_name: "Toyota Innova"
  - location: "Mumbai"
  - price_per_day: 2000
  - car_image: <file>
```

**Get All Cars:**
```
GET /cars
```

**Create Booking:**
```
POST /bookings
Headers: Authorization: Bearer <token>
{
  "car_id": 1,
  "start_date": "2026-04-10",
  "end_date": "2026-04-12",
  "start_time": "10:00",
  "end_time": "18:00"
}
```

**Get Owner Bookings:**
```
GET /bookings/owner
Headers: Authorization: Bearer <token>
```

**Update Booking Status:**
```
PUT /bookings/1/status
Headers: Authorization: Bearer <token>
{
  "status": "approved"
}
```

**Send Message:**
```
POST /chat/send
Headers: Authorization: Bearer <token>
{
  "booking_id": 1,
  "receiver_id": 2,
  "message": "When can you deliver the car?"
}
```

**Get Messages:**
```
GET /chat/1
Headers: Authorization: Bearer <token>
```

**Add Rating:**
```
POST /ratings/add
Headers: Authorization: Bearer <token>
{
  "booking_id": 1,
  "rating": 5,
  "review": "Great car, owner very helpful!"
}
```

**Get Car Ratings:**
```
GET /ratings/car/1
```

## 🔧 Environment Setup

### Backend .env file:
Create `backend/.env`:
```
PORT=5000
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lease_your_car
```

### Database Setup:
```bash
# Create database
sudo -u postgres psql
CREATE DATABASE lease_your_car;
\q

# Run schema
psql -U postgres -d lease_your_car -f backend/database_schema.sql
```

## 🚨 Troubleshooting

### Frontend won't connect to backend:
- Check if backend is running on port 5000
- Check browser console for CORS errors
- Ensure axios.js has correct base URL

### Database connection error:
- Check PostgreSQL is running
- Verify .env credentials
- Check database exists

### Image upload fails:
- Check `uploads/` directory exists in backend
- Check multer configuration
- Check file size (max 5MB)

### Booking fails:
- Check dates are valid
- Check car_id exists
- Check user is logged in
- Check token is valid

## 📱 Browser Testing

### Recommended Browsers:
- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

### Responsive Testing:
- Desktop (1920x1080)
- Tablet (768x1024)
- Mobile (375x667)

## 🎯 Feature Checklist

- [ ] User registration (owner)
- [ ] User registration (customer)
- [ ] User login
- [ ] Add car (owner)
- [ ] Browse cars (customer)
- [ ] Filter by location
- [ ] Filter by price
- [ ] Book car
- [ ] View bookings
- [ ] Approve booking (owner)
- [ ] Reject booking (owner)
- [ ] Send message
- [ ] Receive message
- [ ] Add rating
- [ ] View ratings
- [ ] Responsive design
- [ ] Mobile friendly

## 📞 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Port 5000 in use | Change PORT in .env and update frontend |
| Database not found | Run database_schema.sql |
| Image upload 404 | Check uploads/ dir permissions |
| JWT errors | Clear localStorage, login again |
| CORS errors | Check backend CORS config |
| Blank page | Check console for JS errors |

## 🎓 Learning Resources

- React docs: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- Express.js: https://expressjs.com
- PostgreSQL: https://www.postgresql.org/docs
- JWT: https://jwt.io

---

✅ **Enjoy testing LeaseYourCar!**
