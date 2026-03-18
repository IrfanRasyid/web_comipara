-- create table vtuber_profile
CREATE TABLE IF NOT EXISTS vtuber_profile (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    persona VARCHAR(100) NOT NULL,
    debut_date DATE,
    description TEXT,
    avatar_url VARCHAR(500),
    social_links JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- create index
CREATE INDEX IF NOT EXISTS idx_vtuber_profile_name ON vtuber_profile(name);

-- create table merchandise
CREATE TABLE IF NOT EXISTS merchandise (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vtuber_id UUID REFERENCES vtuber_profile(id),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock INTEGER DEFAULT 0,
    category VARCHAR(50),
    images_url JSONB,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- create index
CREATE INDEX IF NOT EXISTS idx_merchandise_vtuber_id ON merchandise(vtuber_id);
CREATE INDEX IF NOT EXISTS idx_merchandise_category ON merchandise(category);

-- create table streaming_schedule
CREATE TABLE IF NOT EXISTS streaming_schedule (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vtuber_id UUID REFERENCES vtuber_profile(id),
    schedule_time TIMESTAMP WITH TIME ZONE NOT NULL,
    platform VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    is_live BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- create index
CREATE INDEX IF NOT EXISTS idx_streaming_schedule_vtuber_id ON streaming_schedule(vtuber_id);
CREATE INDEX IF NOT EXISTS idx_streaming_schedule_time ON streaming_schedule(schedule_time);

-- create table video_content
CREATE TABLE IF NOT EXISTS video_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vtuber_id UUID REFERENCES vtuber_profile(id),
    title VARCHAR(200) NOT NULL,
    video_url VARCHAR(500),
    thumbnail_url VARCHAR(500),
    views INTEGER DEFAULT 0,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- create index
CREATE INDEX IF NOT EXISTS idx_video_content_vtuber_id ON video_content(vtuber_id);

-- Enable RLS
ALTER TABLE vtuber_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE merchandise ENABLE ROW LEVEL SECURITY;
ALTER TABLE streaming_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_content ENABLE ROW LEVEL SECURITY;

-- Create policies for reading (everyone can read)
CREATE POLICY "Allow public read access on vtuber_profile" ON vtuber_profile FOR SELECT USING (true);
CREATE POLICY "Allow public read access on merchandise" ON merchandise FOR SELECT USING (true);
CREATE POLICY "Allow public read access on streaming_schedule" ON streaming_schedule FOR SELECT USING (true);
CREATE POLICY "Allow public read access on video_content" ON video_content FOR SELECT USING (true);

-- Create policies for writing (only authenticated users can write)
CREATE POLICY "Allow authenticated full access on vtuber_profile" ON vtuber_profile FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access on merchandise" ON merchandise FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access on streaming_schedule" ON streaming_schedule FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access on video_content" ON video_content FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Grant permissions
GRANT SELECT ON vtuber_profile TO anon;
GRANT SELECT ON merchandise TO anon;
GRANT SELECT ON streaming_schedule TO anon;
GRANT SELECT ON video_content TO anon;

GRANT ALL PRIVILEGES ON vtuber_profile TO authenticated;
GRANT ALL PRIVILEGES ON merchandise TO authenticated;
GRANT ALL PRIVILEGES ON streaming_schedule TO authenticated;
GRANT ALL PRIVILEGES ON video_content TO authenticated;

-- Insert dummy data
INSERT INTO vtuber_profile (name, persona, debut_date, description, avatar_url, social_links)
VALUES (
    'Ryuta Amagiri',
    'Virtual YouTuber',
    '2021-03-12',
    'Ur snow mountain onidragon is here! Hi I am Ryuta Amagiri!',
    'https://xbvkdktpypafhvgeyyss.supabase.co/storage/v1/object/public/assets/vtuber/ryuta/ryuta_icon.png',
    '{"youtube": "https://www.youtube.com/@ryutaamagiri", "twitter": "https://x.com/ryutaamagiri", "instagram": "https://www.instagram.com/ryutaamagirii/"}'
) ON CONFLICT DO NOTHING;

-- Get the inserted ID to use for relations (assuming it's the only one for now)
DO $$
DECLARE
    v_id UUID;
BEGIN
    SELECT id INTO v_id FROM vtuber_profile LIMIT 1;
    
    IF v_id IS NOT NULL THEN
        -- Insert Merchandise
        INSERT INTO merchandise (vtuber_id, name, description, price, stock, category, images_url)
        VALUES 
            (v_id, 'Acrylic Standee Kizuna AI 2026', 'Standee akrilik eksklusif desain terbaru', 150000.00, 100, 'Acrylic', '["https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=400"]'),
            (v_id, 'T-Shirt Comipara Edition', 'T-shirt edisi spesial Comipara dengan bahan katun premium', 250000.00, 50, 'Apparel', '["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400"]')
        ON CONFLICT DO NOTHING;

        -- Insert Streaming Schedule
        INSERT INTO streaming_schedule (vtuber_id, schedule_time, platform, title, is_live)
        VALUES 
            (v_id, NOW() + INTERVAL '1 day', 'YouTube', 'Mabar Valorant bareng Viewers!', false),
            (v_id, NOW() + INTERVAL '3 days', 'Twitch', 'Karaoke Night Spesial Weekend', false)
        ON CONFLICT DO NOTHING;
        
        -- Insert Video Content
        INSERT INTO video_content (vtuber_id, title, video_url, thumbnail_url, views, published_at)
        VALUES 
            (v_id, 'Cover Song - Idol (YOASOBI)', 'https://youtube.com', 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&q=80&w=400', 1500000, NOW() - INTERVAL '10 days'),
            (v_id, 'Highlight Stream: Momen Lucu Horor Game', 'https://youtube.com', 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=400', 500000, NOW() - INTERVAL '2 days')
        ON CONFLICT DO NOTHING;
    END IF;
END $$;
