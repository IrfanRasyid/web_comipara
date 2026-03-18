-- Insert 6 more members for the group
INSERT INTO vtuber_profile (name, persona, debut_date, description, avatar_url, social_links)
VALUES 
(
    'Shirakami Fubuki',
    'Virtual Fox',
    '2018-06-01',
    'Konnichiwa! Fubuki here. I am a virtual fox who loves games and singing.',
    'https://images.unsplash.com/photo-1578632767115-351597fd24fa?auto=format&fit=crop&q=80&w=400&h=400',
    '{"youtube": "https://youtube.com", "twitter": "https://twitter.com", "instagram": "https://instagram.com"}'
),
(
    'Usada Pekora',
    'Virtual Rabbit',
    '2019-07-17',
    'Peko peko peko! Let''s cause some chaos together.',
    'https://images.unsplash.com/photo-1580477659556-94e82b7db5c9?auto=format&fit=crop&q=80&w=400&h=400',
    '{"youtube": "https://youtube.com", "twitter": "https://twitter.com", "instagram": "https://instagram.com"}'
),
(
    'Houshou Marine',
    'Virtual Pirate',
    '2019-08-11',
    'Ahoy! Captain Marine is here to steal your hearts.',
    'https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?auto=format&fit=crop&q=80&w=400&h=400',
    '{"youtube": "https://youtube.com", "twitter": "https://twitter.com", "instagram": "https://instagram.com"}'
),
(
    'Gawr Gura',
    'Virtual Shark',
    '2020-09-13',
    'A! I am a shark from Atlantis.',
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=400&h=400',
    '{"youtube": "https://youtube.com", "twitter": "https://twitter.com", "instagram": "https://instagram.com"}'
),
(
    'Mori Calliope',
    'Virtual Reaper',
    '2020-09-12',
    'Listen up! The grim reaper is in the house.',
    'https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&q=80&w=400&h=400',
    '{"youtube": "https://youtube.com", "twitter": "https://twitter.com", "instagram": "https://instagram.com"}'
),
(
    'Watson Amelia',
    'Virtual Detective',
    '2020-09-13',
    'Elementary! Let''s solve some mysteries.',
    'https://images.unsplash.com/photo-1618331835717-801e976710b2?auto=format&fit=crop&q=80&w=400&h=400',
    '{"youtube": "https://youtube.com", "twitter": "https://twitter.com", "instagram": "https://instagram.com"}'
) ON CONFLICT DO NOTHING;
