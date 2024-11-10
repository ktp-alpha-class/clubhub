INSERT INTO examples (some_text) VALUES ('Hello, world!');
INSERT INTO examples (some_text) VALUES ('Goodbye, world.');

INSERT INTO
    auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        recovery_sent_at,
        last_sign_in_at,
        raw_app_meta_data,
        raw_user_meta_data,
        created_at,
        updated_at,
        confirmation_token,
        email_change,
        email_change_token_new,
        recovery_token
    ) (
        select
            '00000000-0000-0000-0000-000000000000',
            uuid_generate_v4 (),
            'authenticated',
            'authenticated',
            'user' || (ROW_NUMBER() OVER ()) || '@example.com',
            crypt ('password123', gen_salt ('bf')),
            current_timestamp,
            current_timestamp,
            current_timestamp,
            '{"provider":"email","providers":["email"]}',
            '{}',
            current_timestamp,
            current_timestamp,
            '',
            '',
            '',
            ''
        FROM
            generate_series(1, 10)
    );

INSERT INTO
    auth.identities (
        id,
        user_id,
        provider_id,
        identity_data,
        provider,
        last_sign_in_at,
        created_at,
        updated_at
    ) (
        select
            uuid_generate_v4 (),
            id,
            id,
            format('{"sub":"%s","email":"%s"}', id :: text, email) :: jsonb,
            'email',
            current_timestamp,
            current_timestamp,
            current_timestamp
        from
            auth.users
    );

INSERT INTO users (
    first_name,
    last_name,
    email,
    bio,
    major,
    year,
    profile_picture_url,
    supabase_id
) (
    SELECT 
        'User' || ROW_NUMBER() OVER () as first_name,
        'Test' || ROW_NUMBER() OVER () as last_name,
        email,
        'Sample bio for test user ' || ROW_NUMBER() OVER (),
        CASE (ROW_NUMBER() OVER ()) % 4 
            WHEN 0 THEN 'Computer Science'
            WHEN 1 THEN 'Engineering' 
            WHEN 2 THEN 'Business'
            WHEN 3 THEN 'Biology'
        END,
        CASE (ROW_NUMBER() OVER ()) % 4
            WHEN 0 THEN 'Freshman'
            WHEN 1 THEN 'Sophomore'
            WHEN 2 THEN 'Junior' 
            WHEN 3 THEN 'Senior'
        END,
        'https://example.com/profile' || ROW_NUMBER() OVER () || '.jpg',
        id
    FROM auth.users
);

-- Create a sample club
INSERT INTO clubs (name, description, privacy_level) VALUES (
    'Sample Tech Club',
    'A club focused on technology, programming and innovation. Open to all students interested in tech.',
    'public'
);

-- Create a sample event
INSERT INTO events (name, description, date, category, privacy_level, club_id) 
SELECT 
    'Tech Talk Workshop',
    'Join us for an engaging workshop on emerging technologies and programming best practices.',
    '2024-03-15',
    'Workshop', 
    'public',
    club_id
FROM clubs
WHERE name = 'Sample Tech Club';

-- Make one user admin of sample tech club
INSERT INTO club_admins (user_id, club_id)
SELECT 
    u.user_id,
    (SELECT club_id FROM clubs WHERE name = 'Sample Tech Club')
FROM users u
WHERE u.first_name = 'User1';
