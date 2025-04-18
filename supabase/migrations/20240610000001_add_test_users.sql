-- Create function to add test users
CREATE OR REPLACE FUNCTION create_test_user(p_email TEXT, p_password TEXT, p_name TEXT, p_type TEXT)
RETURNS UUID AS $$
DECLARE
  user_id UUID;
BEGIN
  -- Check if user already exists
  SELECT id INTO user_id FROM auth.users WHERE email = p_email;
  
  -- Only create if user doesn't exist
  IF user_id IS NULL THEN
    -- Insert into auth.users
    INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
    VALUES (
      gen_random_uuid(),
      p_email,
      crypt(p_password, gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}',
      jsonb_build_object('name', p_name, 'user_type', p_type),
      now(),
      now()
    )
    RETURNING id INTO user_id;
    
    -- Insert into public.users
    INSERT INTO public.users (id, email, name, type, created_at, updated_at)
    VALUES (
      user_id,
      p_email,
      p_name,
      p_type,
      now(),
      now()
    );
  ELSE
    -- User already exists, return existing ID
    RETURN user_id;
  END IF;
  
  RETURN user_id;
END;
$$ LANGUAGE plpgsql;

-- Create test users
DO $$
BEGIN
  -- Admin user
  PERFORM create_test_user('admin@localguia.com', 'Admin@123', 'Admin LocalGuia', 'admin');
  
  -- Test user
  PERFORM create_test_user('test@localguia.com', 'Test@123', 'Test User', 'tourist');
  
  -- Tourist user
  PERFORM create_test_user('turista@teste.com', 'Teste@123', 'Turista Teste', 'tourist');
  
  -- Guide user
  PERFORM create_test_user('guia@teste.com', 'Teste@123', 'Guia Teste', 'guide');
END;
$$;

-- Drop function after use
DROP FUNCTION create_test_user(TEXT, TEXT, TEXT, TEXT);
