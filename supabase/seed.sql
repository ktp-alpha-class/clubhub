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

-- Insert data into clubs table
INSERT INTO clubs (name, description, privacy_level)
VALUES
('Coding Club', 'A club for students interested in coding.', 'Public'),
('Book Club', 'Discussing literature and sharing book recommendations.', 'Private'),
('Music Club', 'For those passionate about music.', 'Public'),
('Test Club', 'Exploring scientific concepts and conducting experiments.', 'Public');

-- Insert data into roles table
INSERT INTO roles (role_name)
VALUES
('Member'),
('President'),
('Vice President'),
('Secretary'),
('Treasurer');

-- Insert data into club_memberships table
INSERT INTO club_memberships (user_id, club_id, role_id)
VALUES
(1, 1, 2), -- User1 is President of Coding Club
(2, 1, 3), -- User2 is Vice President of Coding Club
(3, 1, 1), -- User3 is Member of Coding Club
(4, 2, 5), -- User4 is Treasurer of Book Club
(5, 2, 1), -- User5 is Member of Book Club
(6, 3, 1); -- User6 is Member of Music Club

-- Insert data into club_admins table
INSERT INTO club_admins (user_id, club_id)
SELECT u.user_id, c.club_id
FROM users u, clubs c
WHERE 
    (u.first_name = 'User1' AND c.name = 'Coding Club') OR
    (u.first_name = 'User2' AND c.name = 'Coding Club') OR
    (u.first_name = 'User4' AND c.name = 'Book Club');

-- Insert data into tags table
INSERT INTO tags (name)
VALUES
('Technology'),
('Arts'),
('Sports'),
('Science'),
('Literature');

-- Insert data into tag_assignments table
INSERT INTO tag_assignments (tag_id, club_id)
VALUES
(1, 1), -- Technology tag assigned to Coding Club
(5, 2), -- Literature tag assigned to Book Club
(2, 3); -- Arts tag assigned to Music Club

-- Insert data into events table
INSERT INTO events (name, description, event_time, category, privacy_level, club_id)
VALUES
('Hackathon 2024', 'An event for coders to build projects in 24 hours.', '2024-05-20 09:00:00+00', 'Technology', 'Public', 1),
('Book Fair', 'Annual book fair with guest authors.', '2024-06-15 10:00:00+00', 'Literature', 'Public', 2),
('Music Fest', 'A festival showcasing local bands.', '2024-07-10 18:00:00+00', 'Arts', 'Public', 3),
('Science Fair', 'Competition for students to present science projects.', '2024-08-05 13:00:00+00', 'Science', 'Private', 4),
('Sports Day', 'Inter-club sports competition.', '2024-09-01 08:00:00+00', 'Sports', 'Public', 4),
('Art Exhibition', 'Display of student artwork.', '2024-10-10 11:00:00+00', 'Arts', 'Public', 4),
('Tech Talk', 'Guest speaker on latest technology trends.', '2024-11-15 15:00:00+00', 'Technology', 'Public', 4),
('Literary Quiz', 'Trivia quiz on famous authors and books.', '2024-12-20 14:00:00+00', 'Literature', 'Public', 4),
('Music Workshop', 'Hands-on workshop for music enthusiasts.', '2025-01-25 10:00:00+00', 'Arts', 'Public', 4),
('Science Symposium', 'Presentations on scientific research.', '2025-02-20 09:00:00+00', 'Science', 'Public', 2),
('Science Symposium', 'Presentations on scientific research.', '2025-02-20 09:00:00+00', 'Science', 'Public', 4),
('Sports Carnival', 'Annual sports event with various games.', '2025-03-15 08:00:00+00', 'Sports', 'Public', 4);

-- The event_ownerships table is no longer needed as we're directly assigning club_id in the events table
-- If you need to keep track of multiple clubs organizing a single event, you might need to revisit this approach

-- Insert data into club_links table
INSERT INTO club_links (link_name, link_url, club_id)
VALUES
('Website', 'http://codingclub.example.com', 1),
('GitHub', 'http://github.com/codingclub', 1),
('Facebook', 'http://facebook.com/bookclub', 2),
('Instagram', 'http://instagram.com/musicclub', 3);
