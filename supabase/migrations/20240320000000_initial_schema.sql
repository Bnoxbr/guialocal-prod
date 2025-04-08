-- Create enums
CREATE TYPE user_type AS ENUM ('tourist', 'guide');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');

-- Create tables
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  photo_url TEXT,
  type user_type NOT NULL
);

CREATE TABLE guides (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  photo_url TEXT,
  location TEXT NOT NULL,
  languages TEXT[] NOT NULL,
  specialties TEXT[] NOT NULL,
  cadastur_number TEXT NOT NULL,
  rating NUMERIC DEFAULT 5.0,
  social_links JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  guide_id UUID REFERENCES guides(id) ON DELETE CASCADE NOT NULL,
  tourist_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  tour_date DATE NOT NULL,
  location TEXT NOT NULL,
  status booking_status DEFAULT 'pending' NOT NULL,
  price NUMERIC NOT NULL,
  participants INTEGER NOT NULL
);

CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  guide_id UUID REFERENCES guides(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  rating NUMERIC NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  tour_date DATE NOT NULL
);

CREATE TABLE chats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  guide_id UUID REFERENCES guides(id) ON DELETE CASCADE NOT NULL,
  tourist_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  chat_id UUID REFERENCES chats(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  text TEXT NOT NULL
);

CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE tourism_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE
);

-- Create indexes
CREATE INDEX idx_guides_user_id ON guides(user_id);
CREATE INDEX idx_bookings_guide_id ON bookings(guide_id);
CREATE INDEX idx_bookings_tourist_id ON bookings(tourist_id);
CREATE INDEX idx_reviews_guide_id ON reviews(guide_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_messages_chat_id ON messages(chat_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_chats_guide_id ON chats(guide_id);
CREATE INDEX idx_chats_tourist_id ON chats(tourist_id);
