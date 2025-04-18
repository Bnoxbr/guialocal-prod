-- Create admin user function
CREATE OR REPLACE FUNCTION create_admin_user()
RETURNS void AS $$
DECLARE
  user_id UUID;
BEGIN
  -- Check if user already exists
  SELECT id INTO user_id FROM auth.users WHERE email = 'breno@ceo.com';
  
  -- Only create if user doesn't exist
  IF user_id IS NULL THEN
    -- Insert into auth.users
    INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
    VALUES (
      gen_random_uuid(),
      'breno@ceo.com',
      crypt('admin1234', gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}',
      '{"name":"Breno CEO","user_type":"admin"}',
      now(),
      now()
    )
    RETURNING id INTO user_id;
    
    -- Insert into public.users
    INSERT INTO public.users (id, email, name, type, created_at, updated_at)
    VALUES (
      user_id,
      'breno@ceo.com',
      'Breno CEO',
      'admin',
      now(),
      now()
    );
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Execute function
SELECT create_admin_user();

-- Drop function after use
DROP FUNCTION create_admin_user();
