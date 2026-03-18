-- Align merchandise schema for web usage (list + detail + ordering)

ALTER TABLE IF EXISTS merchandise
  ADD COLUMN IF NOT EXISTS order_url VARCHAR(500);

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'merchandise' AND column_name = 'vtuber_id') THEN
    IF (SELECT COUNT(*) FROM merchandise WHERE vtuber_id IS NULL) = 0 THEN
      ALTER TABLE merchandise ALTER COLUMN vtuber_id SET NOT NULL;
    END IF;
  END IF;
END $$;

ALTER TABLE IF EXISTS merchandise
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ADD COLUMN IF NOT EXISTS currency VARCHAR(8) NOT NULL DEFAULT 'IDR';

ALTER TABLE IF EXISTS merchandise
  DROP CONSTRAINT IF EXISTS merchandise_price_non_negative,
  ADD CONSTRAINT merchandise_price_non_negative CHECK (price >= 0);

ALTER TABLE IF EXISTS merchandise
  DROP CONSTRAINT IF EXISTS merchandise_stock_non_negative,
  ADD CONSTRAINT merchandise_stock_non_negative CHECK (stock >= 0);

ALTER TABLE IF EXISTS merchandise
  DROP CONSTRAINT IF EXISTS merchandise_order_url_valid,
  ADD CONSTRAINT merchandise_order_url_valid CHECK (
    order_url IS NULL
    OR order_url ~* '^https?://'
  );

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_merchandise_set_updated_at ON merchandise;
CREATE TRIGGER trg_merchandise_set_updated_at
BEFORE UPDATE ON merchandise
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE INDEX IF NOT EXISTS idx_merchandise_is_available ON merchandise(is_available);
CREATE INDEX IF NOT EXISTS idx_merchandise_created_at ON merchandise(created_at);
