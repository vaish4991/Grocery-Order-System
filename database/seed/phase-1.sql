INSERT INTO users (id, name, email, phone, password, role, status)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'Admin User', 'admin@grocery.local', '9999999999', 'demo-password', 'ADMIN', 'active'),
  ('00000000-0000-0000-0000-000000000002', 'Demo Customer', 'customer@grocery.local', '8888888888', 'demo-password', 'CUSTOMER', 'active');

INSERT INTO categories (id, name, slug, description, image)
VALUES
  ('10000000-0000-0000-0000-000000000001', 'Fruits', 'fruits', 'Fresh seasonal fruit.', 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1200&q=80'),
  ('10000000-0000-0000-0000-000000000002', 'Vegetables', 'vegetables', 'Farm-fresh vegetables.', 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80'),
  ('10000000-0000-0000-0000-000000000003', 'Dairy', 'dairy', 'Milk, yogurt, and cheese.', 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80');

INSERT INTO products (id, category_id, name, slug, description, price, discount_price, stock, sku, brand, status)
VALUES
  ('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Kashmiri Apples', 'kashmiri-apples', 'Crisp, sweet apples sourced from premium orchards.', 180, 149, 120, 'APL-001', 'FreshFarm', 'active'),
  ('20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000002', 'Organic Tomatoes', 'organic-tomatoes', 'Juicy tomatoes for everyday cooking.', 60, 49, 250, 'TMT-014', 'GreenBasket', 'active'),
  ('20000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000003', 'Whole Milk', 'whole-milk', 'Daily dairy staple in a sealed pack.', 72, 68, 80, 'MLK-008', 'DairyPure', 'active');

INSERT INTO coupons (id, code, discount_type, discount_value, start_date, end_date)
VALUES
  ('40000000-0000-0000-0000-000000000001', 'WELCOME10', 'percent', 10, NOW(), NOW() + INTERVAL '30 days');
