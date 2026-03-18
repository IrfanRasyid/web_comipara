-- Migration: Add detailed fields to vtuber_profile
-- This script adds lore, character sheet, and youtube video URL columns to the vtuber_profile table

-- 1. Add columns to vtuber_profile
ALTER TABLE vtuber_profile 
ADD COLUMN IF NOT EXISTS lore TEXT,
ADD COLUMN IF NOT EXISTS character_sheet_url VARCHAR(500),
ADD COLUMN IF NOT EXISTS youtube_video_url VARCHAR(500);

-- 2. Update existing data for Ryuta Amagiri (example)
UPDATE vtuber_profile 
SET 
    lore = 'Born from the volcanic peaks of the Amagiri mountains, Ryuta is a fire-breathing oni dragon who decided that being a virtual idol was much more fun than guarding treasure. With scales as bright as a summer sky and horns that crackle with ancient energy, he brings warmth and chaos to his fans.',
    character_sheet_url = 'https://images.unsplash.com/photo-1541560052-5e137f229371?auto=format&fit=crop&q=80&w=1200&h=1600',
    youtube_video_url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    social_links = social_links || '{"tiktok": "https://tiktok.com/@ryuta"}'::jsonb
WHERE name = 'Ryuta Amagiri';

-- 3. Update other members with sample data
UPDATE vtuber_profile 
SET 
    lore = 'A mysterious fox from the snowy mountains. Her voice is as clear as a winter morning and her games are legendary.',
    youtube_video_url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
WHERE name = 'Shirakami Fubuki';

UPDATE vtuber_profile 
SET 
    lore = 'The chaotic rabbit who rules over her kingdom with an iron fist (and a lot of carrots). Peko!',
    youtube_video_url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
WHERE name = 'Usada Pekora';
