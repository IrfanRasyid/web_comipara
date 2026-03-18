-- Add order_url column for merchandise ordering link
ALTER TABLE IF EXISTS merchandise
ADD COLUMN IF NOT EXISTS order_url VARCHAR(500);

-- Optional index if querying by order_url (usually not needed)
-- CREATE INDEX IF NOT EXISTS idx_merchandise_order_url ON merchandise(order_url);
