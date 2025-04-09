-- Create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  photo_url TEXT,
  type TEXT NOT NULL CHECK (type IN ('tourist', 'guide', 'admin'))
);

-- Create guides table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.guides (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  photo_url TEXT,
  location TEXT NOT NULL,
  languages TEXT[] NOT NULL,
  specialties TEXT[] NOT NULL,
  cadastur_number TEXT NOT NULL,
  rating NUMERIC(3,2) DEFAULT 5.0,
  social_links JSONB DEFAULT '{}'::jsonb
);

-- Create locations table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  region TEXT,
  state TEXT,
  description TEXT,
  image_url TEXT
);

-- Create categories table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT
);

-- Create experiences table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  guide_id UUID NOT NULL REFERENCES public.guides(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location_id UUID REFERENCES public.locations(id),
  category_id UUID REFERENCES public.categories(id),
  price NUMERIC(10,2) NOT NULL,
  duration INTEGER NOT NULL, -- in minutes
  max_participants INTEGER,
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE
);

-- Create bookings table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  guide_id UUID NOT NULL REFERENCES public.guides(id) ON DELETE CASCADE,
  experience_id UUID REFERENCES public.experiences(id),
  date DATE NOT NULL,
  time TIME,
  participants INTEGER NOT NULL DEFAULT 1,
  total_price NUMERIC(10,2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled'))
);

-- Create reviews table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  guide_id UUID NOT NULL REFERENCES public.guides(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES public.bookings(id),
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  tour_date DATE NOT NULL
);

-- Create favorites table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  guide_id UUID NOT NULL REFERENCES public.guides(id) ON DELETE CASCADE,
  UNIQUE(user_id, guide_id)
);

-- Enable row level security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users table policies
DROP POLICY IF EXISTS "Users are viewable by everyone" ON public.users;
CREATE POLICY "Users are viewable by everyone" ON public.users FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update their own data" ON public.users;
CREATE POLICY "Users can update their own data" ON public.users FOR UPDATE USING (auth.uid() = id);

-- Guides table policies
DROP POLICY IF EXISTS "Guides are viewable by everyone" ON public.guides;
CREATE POLICY "Guides are viewable by everyone" ON public.guides FOR SELECT USING (true);

DROP POLICY IF EXISTS "Guides can update their own data" ON public.guides;
CREATE POLICY "Guides can update their own data" ON public.guides FOR UPDATE USING (auth.uid() = user_id);

-- Locations table policies
DROP POLICY IF EXISTS "Locations are viewable by everyone" ON public.locations;
CREATE POLICY "Locations are viewable by everyone" ON public.locations FOR SELECT USING (true);

-- Categories table policies
DROP POLICY IF EXISTS "Categories are viewable by everyone" ON public.categories;
CREATE POLICY "Categories are viewable by everyone" ON public.categories FOR SELECT USING (true);

-- Experiences table policies
DROP POLICY IF EXISTS "Experiences are viewable by everyone" ON public.experiences;
CREATE POLICY "Experiences are viewable by everyone" ON public.experiences FOR SELECT USING (true);

DROP POLICY IF EXISTS "Guides can update their own experiences" ON public.experiences;
CREATE POLICY "Guides can update their own experiences" ON public.experiences FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.guides WHERE id = guide_id AND user_id = auth.uid())
);

-- Bookings table policies
DROP POLICY IF EXISTS "Users can view their own bookings" ON public.bookings;
CREATE POLICY "Users can view their own bookings" ON public.bookings FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Guides can view bookings for their experiences" ON public.bookings;
CREATE POLICY "Guides can view bookings for their experiences" ON public.bookings FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.guides WHERE id = guide_id AND user_id = auth.uid())
);

DROP POLICY IF EXISTS "Users can create bookings" ON public.bookings;
CREATE POLICY "Users can create bookings" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own bookings" ON public.bookings;
CREATE POLICY "Users can update their own bookings" ON public.bookings FOR UPDATE USING (auth.uid() = user_id);

-- Reviews table policies
DROP POLICY IF EXISTS "Reviews are viewable by everyone" ON public.reviews;
CREATE POLICY "Reviews are viewable by everyone" ON public.reviews FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can create reviews for their bookings" ON public.reviews;
CREATE POLICY "Users can create reviews for their bookings" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own reviews" ON public.reviews;
CREATE POLICY "Users can update their own reviews" ON public.reviews FOR UPDATE USING (auth.uid() = user_id);

-- Favorites table policies
DROP POLICY IF EXISTS "Users can view their own favorites" ON public.favorites;
CREATE POLICY "Users can view their own favorites" ON public.favorites FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create favorites" ON public.favorites;
CREATE POLICY "Users can create favorites" ON public.favorites FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own favorites" ON public.favorites;
CREATE POLICY "Users can delete their own favorites" ON public.favorites FOR DELETE USING (auth.uid() = user_id);

-- Enable realtime subscriptions
alter publication supabase_realtime add table public.users;
alter publication supabase_realtime add table public.guides;
alter publication supabase_realtime add table public.locations;
alter publication supabase_realtime add table public.categories;
alter publication supabase_realtime add table public.experiences;
alter publication supabase_realtime add table public.bookings;
alter publication supabase_realtime add table public.reviews;
alter publication supabase_realtime add table public.favorites;

-- Insert sample data if tables are empty
INSERT INTO public.locations (name, region, state, description, image_url)
SELECT 'Serra da Mantiqueira', 'Sudeste', 'SP/MG', 'Região montanhosa com clima ameno e belas paisagens', 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=800&q=80'
WHERE NOT EXISTS (SELECT 1 FROM public.locations LIMIT 1);

INSERT INTO public.locations (name, region, state, description, image_url)
SELECT 'Litoral Norte Paulista', 'Sudeste', 'SP', 'Praias paradisíacas e Mata Atlântica preservada', 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80'
WHERE NOT EXISTS (SELECT 1 FROM public.locations WHERE name = 'Litoral Norte Paulista');

INSERT INTO public.locations (name, region, state, description, image_url)
SELECT 'Paraty', 'Sudeste', 'RJ', 'Centro histórico colonial e belezas naturais', 'https://images.unsplash.com/photo-1598446719622-0813a4c3d8be?w=800&q=80'
WHERE NOT EXISTS (SELECT 1 FROM public.locations WHERE name = 'Paraty');

INSERT INTO public.categories (name, description, icon)
SELECT 'Ecoturismo', 'Trilhas, cachoeiras e observação de fauna', 'MapPin'
WHERE NOT EXISTS (SELECT 1 FROM public.categories LIMIT 1);

INSERT INTO public.categories (name, description, icon)
SELECT 'Gastronomia', 'Restaurantes, vinícolas e comida típica', 'Utensils'
WHERE NOT EXISTS (SELECT 1 FROM public.categories WHERE name = 'Gastronomia');

INSERT INTO public.categories (name, description, icon)
SELECT 'Aventura', 'Escalada, rapel, parapente e rafting', 'Mountain'
WHERE NOT EXISTS (SELECT 1 FROM public.categories WHERE name = 'Aventura');

INSERT INTO public.categories (name, description, icon)
SELECT 'Cultural', 'Museus, centros históricos e artesanato', 'Landmark'
WHERE NOT EXISTS (SELECT 1 FROM public.categories WHERE name = 'Cultural');
