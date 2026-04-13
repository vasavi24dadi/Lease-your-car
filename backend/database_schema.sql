-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);

-- Cars table
CREATE TABLE IF NOT EXISTS cars (
  id SERIAL PRIMARY KEY,
  owner_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  car_name VARCHAR(100) NOT NULL,
  location VARCHAR(100) NOT NULL,
  price_per_km DECIMAL(10,2) NOT NULL,
  car_image VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_cars_owner_id ON cars(owner_id);
CREATE INDEX idx_cars_location ON cars(location);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  car_id INT NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_date DATE NOT NULL,
  end_time TIME NOT NULL,
  distance DECIMAL(10,2) NOT NULL,
  price_per_km DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_bookings_car_id ON bookings(car_id);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_status ON bookings(status);

-- Messages table for chat functionality
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  booking_id INT NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  sender_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  receiver_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message_text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_messages_booking_id ON messages(booking_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_receiver_id ON messages(receiver_id);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);

-- Notifications table for real-time alerts
CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  owner_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  booking_id INT NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notifications_owner_id ON notifications(owner_id);
CREATE INDEX idx_notifications_booking_id ON notifications(booking_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);

-- Ratings/Reviews table for rating functionality
CREATE TABLE IF NOT EXISTS ratings (
  id SERIAL PRIMARY KEY,
  booking_id INT NOT NULL UNIQUE REFERENCES bookings(id) ON DELETE CASCADE,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(booking_id, user_id)
);

CREATE INDEX idx_ratings_booking_id ON ratings(booking_id);
CREATE INDEX idx_ratings_user_id ON ratings(user_id);
CREATE INDEX idx_ratings_rating ON ratings(rating DESC);
CREATE INDEX idx_ratings_created_at ON ratings(created_at DESC);

-- View for car average rating
CREATE OR REPLACE VIEW car_ratings_summary AS
SELECT 
  c.id as car_id,
  c.car_name,
  ROUND(AVG(r.rating)::numeric, 2) as average_rating,
  COUNT(r.id) as total_ratings
FROM cars c
LEFT JOIN bookings b ON c.id = b.car_id
LEFT JOIN ratings r ON b.id = r.booking_id
GROUP BY c.id, c.car_name;
