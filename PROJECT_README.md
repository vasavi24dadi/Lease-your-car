# LeaseYourCar - Complete Car Rental Platform

🚗 A modern, full-stack car rental platform where car owners can list their vehicles and customers can easily book, chat, and rate their experience.

## 🎯 Features

### For Car Owners:
- ✅ Register as an owner
- ✅ Upload car details (name, location, price per day)
- ✅ Upload car images
- ✅ View all booking requests
- ✅ Approve or reject bookings
- ✅ Chat with customers
- ✅ Track completed bookings
- ✅ View ratings and reviews from customers
- ✅ Manage earnings

### For Customers:
- ✅ Browse all available cars
- ✅ Filter by location and price
- ✅ View car details and images
- ✅ Check availability with date/time selection
- ✅ Book cars easily
- ✅ Chat with car owners
- ✅ Rate cars after usage
- ✅ View other customer reviews

### Platform Features:
- ✅ Real-time messaging between owners and customers
- ✅ 5-star rating system with reviews
- ✅ User authentication with JWT
- ✅ Beautiful responsive UI with Tailwind CSS
- ✅ Mobile-friendly design
- ✅ Image upload with Multer

## 🏗️ Tech Stack

### Frontend:
- React.js
- React Router
- Axios
- Tailwind CSS
- Modern JavaScript (ES6+)

### Backend:
- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- Multer (File uploads)
- CORS

## 📦 Installation & Setup

### Prerequisites:
- Node.js (v14+)
- PostgreSQL (v12+)
- Git

### Backend Setup:

```bash
cd backend
npm install

# Create .env file
# PORT=5000
# DB_USER=postgres
# DB_PASSWORD=your_password
# DB_HOST=localhost

# Run database schema
psql -U postgres -d lease_your_car -f database_schema.sql

# Start server
node server.js
```

### Frontend Setup:

```bash
cd frontend
npm install

# Start development server
npm start
```

## 🗄️ Database Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE lease_your_car;
```

2. Run the schema file to create tables:
```bash
psql -U postgres -d lease_your_car -f backend/database_schema.sql
```

3. Tables created:
   - users
   - cars
   - bookings
   - messages (chat)
   - ratings (reviews)

## 🔐 Authentication

- JWT-based authentication
- Passwords are hashed with bcrypt
- Role-based access (owner/customer)
- Token stored in localStorage

## 📱 API Endpoints

### Users:
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user

### Cars:
- `GET /api/cars` - Get all cars
- `POST /api/cars/add` - Add new car (owner only)

### Bookings:
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get user bookings
- `GET /api/bookings/owner` - Get owner's bookings
- `PUT /api/bookings/:bookingId/status` - Update booking status

### Chat:
- `POST /api/chat/send` - Send message
- `GET /api/chat/:booking_id` - Get messages
- `GET /api/chat/user/conversations` - Get user conversations

### Ratings:
- `POST /api/ratings/add` - Add rating
- `GET /api/ratings/car/:car_id` - Get car ratings
- `GET /api/ratings/:booking_id` - Get booking rating

## 🎨 UI/UX Features

- Beautiful gradient designs
- Responsive grid layouts
- Smooth transitions
- Loading states
- Error handling
- Mobile-first approach
- Status badges
- Icon usage

## 📝 Demo Credentials

**Owner Account:**
- Email: owner@test.com
- Password: password123

**Customer Account:**
- Email: customer@test.com
- Password: password123

## 🚀 Deployment

### Frontend:
- Deploy to Vercel, Netlify, or similar
- Build: `npm run build`

### Backend:
- Deploy to Heroku, Railway, or similar
- Update CORS origins in production
- Use environment variables for secrets

## 🔄 Workflow

### Customer flow:
1. Register/Login
2. Browse cars with filters
3. Select car and dates
4. Confirm booking
5. Chat with owner
6. Complete booking
7. Rate the car

### Owner flow:
1. Register/Login as owner
2. Add cars with images and details
3. View booking requests
4. Approve/Reject bookings
5. Chat with customers
6. Mark bookings as completed
7. View ratings and reviews

## 📊 Project Statistics

- **Frontend Pages**: 6 main pages
- **Backend Routes**: 4 main route modules
- **Controllers**: 5 controllers
- **Database Tables**: 5 tables
- **API Endpoints**: 15+ endpoints
- **React Components**: 3 custom components

## 🐛 Testing

### Manual Testing:
1. Test user registration and login
2. Add cars as owner
3. Browse and filter cars
4. Create bookings
5. Test chat messaging
6. Add ratings and reviews
7. Update booking status

### API Testing:
Use Postman to test all endpoints with JWT tokens

## 📈 Future Enhancements

- [ ] WebSocket for real-time chat
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Email verification
- [ ] Phone verification
- [ ] Insurance coverage
- [ ] Damage claims system
- [ ] Referral program
- [ ] Advanced search filters
- [ ] Booking analytics

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests.

## 📄 License

This project is open source and available for educational purposes.

## 📞 Support

For support, please create an issue in the repository.

## 👨‍💻 Developer

Created with ❤️ for car rental platform lovers

---

**Happy car renting! 🚗**
