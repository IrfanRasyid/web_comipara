-- Add 'channel' column to video_content to store channel name
ALTER TABLE IF EXISTS video_content
ADD COLUMN IF NOT EXISTS channel VARCHAR(200);

-- Optional: create index if you plan to query by channel frequently
CREATE INDEX IF NOT EXISTS idx_video_content_channel ON video_content(channel);
