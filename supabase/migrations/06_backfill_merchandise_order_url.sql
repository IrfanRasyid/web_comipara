-- Backfill order_url for existing seeded merchandise rows (optional)

UPDATE merchandise
SET order_url = COALESCE(order_url, 'https://example.com/order'),
    currency = COALESCE(currency, 'IDR')
WHERE order_url IS NULL
  AND name IN ('Acrylic Standee Kizuna AI 2026', 'T-Shirt Comipara Edition');
