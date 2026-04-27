-- ============================================
-- Hotel Booking Platform Seed Data
-- ============================================

-- Demo users
INSERT INTO users (
  id,
  full_name,
  email,
  phone,
  password_hash,
  role,
  status,
  email_verified,
  phone_verified,
  last_login
)
VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    'Admin User',
    'admin@staylux.com',
    '+1 555 100 1000',
    crypt('admin123', gen_salt('bf')),
    'admin',
    'active',
    TRUE,
    TRUE,
    CURRENT_TIMESTAMP
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'Rahul Shah',
    'rahul@staylux.com',
    '+91 9876543210',
    crypt('password123', gen_salt('bf')),
    'customer',
    'active',
    TRUE,
    TRUE,
    CURRENT_TIMESTAMP
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'Priya Patel',
    'priya@staylux.com',
    '+91 9988776655',
    crypt('password123', gen_salt('bf')),
    'customer',
    'active',
    TRUE,
    TRUE,
    CURRENT_TIMESTAMP
  )
ON CONFLICT (id) DO NOTHING;

-- Demo hotels
INSERT INTO hotels (
  id,
  name,
  slug,
  description,
  city,
  country,
  address,
  zip_code,
  category,
  rating,
  reviews_count,
  phone,
  email,
  website_url,
  featured,
  active,
  latitude,
  longitude,
  image_url
)
VALUES
  (
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    'Ocean Pearl Resort',
    'ocean-pearl-resort',
    'Luxury beachfront resort with premium suites, private beach access and sunset dining.',
    'Goa',
    'India',
    'Baga Beach Road, North Goa',
    '403516',
    'Resort',
    4.90,
    1284,
    '+91 832 555 0101',
    'reservations@oceanpearl.com',
    'https://staylux.example/ocean-pearl',
    TRUE,
    TRUE,
    15.55270000,
    73.75170000,
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400'
  ),
  (
    'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
    'Skyline Grand Hotel',
    'skyline-grand-hotel',
    'Modern skyline hotel in the heart of Dubai with rooftop pool and executive lounges.',
    'Dubai',
    'UAE',
    'Downtown Boulevard, Dubai',
    '00000',
    'City Hotel',
    4.80,
    954,
    '+971 4 555 0202',
    'stay@skylinegrand.com',
    'https://staylux.example/skyline-grand',
    TRUE,
    TRUE,
    25.20480000,
    55.27080000,
    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1400'
  ),
  (
    'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
    'Mountain Crown Retreat',
    'mountain-crown-retreat',
    'Scenic mountain retreat surrounded by nature with warm interiors and premium comfort.',
    'Manali',
    'India',
    'Old Manali Road, Himachal Pradesh',
    '175131',
    'Retreat',
    4.60,
    510,
    '+91 1902 555 303',
    'hello@mountaincrown.com',
    'https://staylux.example/mountain-crown',
    FALSE,
    TRUE,
    32.23960000,
    77.18870000,
    'https://images.unsplash.com/photo-1455587734955-081b22074882?w=1400'
  )
ON CONFLICT (id) DO NOTHING;

-- Additional hotels for requested Indian cities (15 total, 3 each city)
INSERT INTO hotels (
  id,
  name,
  slug,
  description,
  city,
  country,
  address,
  zip_code,
  category,
  rating,
  reviews_count,
  phone,
  email,
  website_url,
  featured,
  active,
  latitude,
  longitude,
  image_url
)
VALUES
  ('d1111111-1111-4111-8111-111111111111', 'Marine Crown Mumbai', 'marine-crown-mumbai', 'Premium sea-facing business and leisure stay in South Mumbai.', 'Mumbai', 'India', 'Marine Drive, South Mumbai', '400020', 'City Hotel', 4.70, 620, '+91 22 5551 1001', 'stay@marinecrown.in', 'https://staylux.example/marine-crown-mumbai', TRUE, TRUE, 18.94420000, 72.82310000, 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1400'),
  ('d1111111-1111-4111-8111-111111111112', 'Bandra Bay Suites', 'bandra-bay-suites', 'Stylish suites close to Bandra nightlife and shopping districts.', 'Mumbai', 'India', 'Linking Road, Bandra West', '400050', 'Boutique Hotel', 4.50, 410, '+91 22 5551 1002', 'hello@bandrabaysuites.in', 'https://staylux.example/bandra-bay-suites', FALSE, TRUE, 19.06070000, 72.83660000, 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1400'),
  ('d1111111-1111-4111-8111-111111111113', 'Skyline Grand Mumbai', 'skyline-grand-mumbai', 'Luxury city retreat with skyline rooftop dining and modern rooms.', 'Mumbai', 'India', 'Powai Central Avenue', '400076', 'Luxury Hotel', 4.80, 780, '+91 22 5551 1003', 'reservations@skylinegrandmumbai.in', 'https://staylux.example/skyline-grand-mumbai', TRUE, TRUE, 19.11760000, 72.90600000, 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1400'),
  ('d2222222-2222-4222-8222-222222222221', 'Goa Palm Retreat', 'goa-palm-retreat', 'Beachside resort with vibrant sunsets and curated dining experiences.', 'Goa', 'India', 'Calangute Beach Road, North Goa', '403516', 'Resort', 4.60, 530, '+91 832 555 2201', 'bookings@goapalmretreat.in', 'https://staylux.example/goa-palm-retreat', TRUE, TRUE, 15.54390000, 73.75530000, 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1400'),
  ('d2222222-2222-4222-8222-222222222222', 'Candolim Coastline Hotel', 'candolim-coastline-hotel', 'Relaxed coastal stay near top Goa beaches and attractions.', 'Goa', 'India', 'Candolim Main Road', '403515', 'City Hotel', 4.40, 360, '+91 832 555 2202', 'stay@candolimcoastline.in', 'https://staylux.example/candolim-coastline-hotel', FALSE, TRUE, 15.51890000, 73.76220000, 'https://images.unsplash.com/photo-1501117716987-c8e1ecb210f9?w=1400'),
  ('d2222222-2222-4222-8222-222222222223', 'Sunset Harbor Goa', 'sunset-harbor-goa', 'Harbor-view property with rooftop pool and contemporary interiors.', 'Goa', 'India', 'Panaji Riverside Promenade', '403001', 'Luxury Hotel', 4.70, 590, '+91 832 555 2203', 'hello@sunsetharborgoa.in', 'https://staylux.example/sunset-harbor-goa', TRUE, TRUE, 15.49890000, 73.82780000, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400'),
  ('d3333333-3333-4333-8333-333333333331', 'Marina Heights Chennai', 'marina-heights-chennai', 'Elegant hotel near Marina Beach with modern business amenities.', 'Chennai', 'India', 'Marina Beach Road', '600005', 'City Hotel', 4.50, 470, '+91 44 5553 3301', 'stay@marinaheightschennai.in', 'https://staylux.example/marina-heights-chennai', TRUE, TRUE, 13.05000000, 80.28240000, 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=1400'),
  ('d3333333-3333-4333-8333-333333333332', 'Adyar Riverfront Stay', 'adyar-riverfront-stay', 'Comfort-focused stay with quick access to IT corridors and malls.', 'Chennai', 'India', 'Adyar Main Road', '600020', 'Boutique Hotel', 4.30, 320, '+91 44 5553 3302', 'reservations@adyarriverfront.in', 'https://staylux.example/adyar-riverfront-stay', FALSE, TRUE, 13.00120000, 80.25650000, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1400'),
  ('d3333333-3333-4333-8333-333333333333', 'Chennai Grand Residency', 'chennai-grand-residency', 'Premium city residency for family and corporate travelers.', 'Chennai', 'India', 'T Nagar Central Avenue', '600017', 'Luxury Hotel', 4.60, 550, '+91 44 5553 3303', 'hello@chennaigrandresidency.in', 'https://staylux.example/chennai-grand-residency', TRUE, TRUE, 13.04180000, 80.23410000, 'https://images.unsplash.com/photo-1444201983204-c43cbd584d93?w=1400'),
  ('d4444444-4444-4444-8444-444444444441', 'Lakeview Udaipur Palace', 'lakeview-udaipur-palace', 'Heritage-inspired luxury stay overlooking Udaipur lakefront.', 'Udaipur', 'India', 'Pichola Lake Road', '313001', 'Heritage', 4.90, 860, '+91 294 555 4401', 'stay@lakeviewudaipurpalace.in', 'https://staylux.example/lakeview-udaipur-palace', TRUE, TRUE, 24.57600000, 73.68000000, 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1400'),
  ('d4444444-4444-4444-8444-444444444442', 'Aravalli Retreat Udaipur', 'aravalli-retreat-udaipur', 'Quiet retreat with mountain views and curated local experiences.', 'Udaipur', 'India', 'Aravalli Hills Drive', '313002', 'Retreat', 4.50, 410, '+91 294 555 4402', 'hello@aravalliretreatudaipur.in', 'https://staylux.example/aravalli-retreat-udaipur', FALSE, TRUE, 24.59150000, 73.71260000, 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1400'),
  ('d4444444-4444-4444-8444-444444444443', 'City Royal Udaipur', 'city-royal-udaipur', 'Central Udaipur hotel with modern rooms and easy city access.', 'Udaipur', 'India', 'Surajpole Market Road', '313001', 'City Hotel', 4.40, 290, '+91 294 555 4403', 'bookings@cityroyaludaipur.in', 'https://staylux.example/city-royal-udaipur', FALSE, TRUE, 24.58460000, 73.71250000, 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=1400'),
  ('d5555555-5555-4555-8555-555555555551', 'Amber Fort Heritage Jaipur', 'amber-fort-heritage-jaipur', 'Royal heritage hotel inspired by Jaipur architecture and art.', 'Jaipur', 'India', 'Amer Fort Road', '302028', 'Heritage', 4.80, 740, '+91 141 555 5501', 'stay@amberfortheritage.in', 'https://staylux.example/amber-fort-heritage-jaipur', TRUE, TRUE, 26.98550000, 75.85130000, 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1400'),
  ('d5555555-5555-4555-8555-555555555552', 'Pink City Boutique Jaipur', 'pink-city-boutique-jaipur', 'Boutique property in Jaipur old city with artisan-inspired interiors.', 'Jaipur', 'India', 'MI Road, Jaipur', '302001', 'Boutique Hotel', 4.40, 330, '+91 141 555 5502', 'hello@pinkcityboutique.in', 'https://staylux.example/pink-city-boutique-jaipur', FALSE, TRUE, 26.91240000, 75.78730000, 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1400'),
  ('d5555555-5555-4555-8555-555555555553', 'Jaipur Royal Residency', 'jaipur-royal-residency', 'Modern luxury stay with curated dining and city tours.', 'Jaipur', 'India', 'C Scheme Boulevard', '302001', 'Luxury Hotel', 4.60, 510, '+91 141 555 5503', 'reservations@jaipurroyalresidency.in', 'https://staylux.example/jaipur-royal-residency', TRUE, TRUE, 26.90280000, 75.80490000, 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1400')
ON CONFLICT (id) DO NOTHING;

-- Hotel amenities
INSERT INTO hotel_amenities (id, hotel_id, amenity)
VALUES
  ('10000000-0000-4000-8000-000000000001', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'Free WiFi'),
  ('10000000-0000-4000-8000-000000000002', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'Swimming Pool'),
  ('10000000-0000-4000-8000-000000000003', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'Parking'),
  ('10000000-0000-4000-8000-000000000004', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'Restaurant'),
  ('10000000-0000-4000-8000-000000000005', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'Air Conditioning'),
  ('10000000-0000-4000-8000-000000000006', 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'Free WiFi'),
  ('10000000-0000-4000-8000-000000000007', 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'Swimming Pool'),
  ('10000000-0000-4000-8000-000000000008', 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'Parking'),
  ('10000000-0000-4000-8000-000000000009', 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'Fitness Center'),
  ('10000000-0000-4000-8000-000000000010', 'cccccccc-cccc-4ccc-8ccc-cccccccccccc', 'Free WiFi'),
  ('10000000-0000-4000-8000-000000000011', 'cccccccc-cccc-4ccc-8ccc-cccccccccccc', 'Parking'),
  ('10000000-0000-4000-8000-000000000012', 'cccccccc-cccc-4ccc-8ccc-cccccccccccc', 'Breakfast'),
  ('10000000-0000-4000-8000-000000000013', 'cccccccc-cccc-4ccc-8ccc-cccccccccccc', 'Mountain View')
ON CONFLICT (id) DO NOTHING;

-- Hotel galleries
INSERT INTO hotel_galleries (id, hotel_id, image_url, caption, is_primary, display_order)
VALUES
  ('20000000-0000-4000-8000-000000000001', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400', 'Ocean view exterior', TRUE, 1),
  ('20000000-0000-4000-8000-000000000002', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1400', 'Premium suite interior', FALSE, 2),
  ('20000000-0000-4000-8000-000000000003', 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1400', 'Skyline facade', TRUE, 1),
  ('20000000-0000-4000-8000-000000000004', 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1400', 'Executive lounge', FALSE, 2),
  ('20000000-0000-4000-8000-000000000005', 'cccccccc-cccc-4ccc-8ccc-cccccccccccc', 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=1400', 'Retreat exterior', TRUE, 1),
  ('20000000-0000-4000-8000-000000000006', 'cccccccc-cccc-4ccc-8ccc-cccccccccccc', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1400', 'Wood cabin suite', FALSE, 2)
ON CONFLICT (id) DO NOTHING;

-- Rooms
INSERT INTO rooms (
  id,
  hotel_id,
  name,
  description,
  type,
  price_per_night,
  max_guests,
  beds,
  bathrooms,
  square_feet,
  image_url,
  available_count,
  total_count,
  active
)
VALUES
  (
    'aaaa0001-aaaa-4aaa-8aaa-aaaaaaaa0001',
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    'Deluxe Ocean View Room',
    'Bright room with a balcony facing the sea.',
    'Deluxe',
    180.00,
    2,
    '1 King Bed',
    1,
    420,
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1400',
    9,
    10,
    TRUE
  ),
  (
    'aaaa0002-aaaa-4aaa-8aaa-aaaaaaaa0002',
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    'Executive Suite',
    'Spacious suite with separate lounge and premium amenities.',
    'Suite',
    260.00,
    3,
    '1 King Bed + Sofa',
    1,
    650,
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1400',
    4,
    5,
    TRUE
  ),
  (
    'bbbb0001-bbbb-4bbb-8bbb-bbbbbbbb0001',
    'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
    'Skyline Deluxe',
    'City-facing room with floor-to-ceiling windows.',
    'Deluxe',
    240.00,
    2,
    '1 King Bed',
    1,
    460,
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1400',
    7,
    8,
    TRUE
  ),
  (
    'bbbb0002-bbbb-4bbb-8bbb-bbbbbbbb0002',
    'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
    'Executive Business Suite',
    'Business-ready suite with workspace and lounge access.',
    'Luxury Suite',
    320.00,
    3,
    '1 King Bed + Sofa',
    2,
    720,
    'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1400',
    3,
    4,
    TRUE
  ),
  (
    'cccc0001-cccc-4ccc-8ccc-cccccccc0001',
    'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
    'Alpine Chalet Room',
    'Warm chalet-style room with mountain-facing windows.',
    'Deluxe',
    165.00,
    2,
    '1 Queen Bed',
    1,
    390,
    'https://images.unsplash.com/photo-1455587734955-081b22074882?w=1400',
    5,
    6,
    TRUE
  ),
  (
    'cccc0002-cccc-4ccc-8ccc-cccccccc0002',
    'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
    'Family Mountain Suite',
    'Large suite ideal for family stays with fireplace seating.',
    'Suite',
    225.00,
    4,
    '2 Queen Beds',
    2,
    760,
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1400',
    2,
    3,
    TRUE
  )
ON CONFLICT (id) DO NOTHING;

-- Rooms for additional city hotels
INSERT INTO rooms (
  id,
  hotel_id,
  name,
  description,
  type,
  price_per_night,
  max_guests,
  beds,
  bathrooms,
  square_feet,
  image_url,
  available_count,
  total_count,
  active
)
VALUES
  ('e1111111-1111-4111-8111-111111111111', 'd1111111-1111-4111-8111-111111111111', 'Marine Deluxe Room', 'Sea-view deluxe room in South Mumbai.', 'Deluxe', 205.00, 2, '1 King Bed', 1, 420, 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1400', 7, 8, TRUE),
  ('e1111111-1111-4111-8111-111111111112', 'd1111111-1111-4111-8111-111111111112', 'Bandra Suite', 'Contemporary suite with city views.', 'Suite', 185.00, 2, '1 Queen Bed', 1, 390, 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1400', 5, 6, TRUE),
  ('e1111111-1111-4111-8111-111111111113', 'd1111111-1111-4111-8111-111111111113', 'Skyline Executive', 'Executive room with workspace and skyline view.', 'Luxury Suite', 245.00, 3, '1 King Bed + Sofa', 1, 560, 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1400', 4, 5, TRUE),
  ('e2222222-2222-4222-8222-222222222221', 'd2222222-2222-4222-8222-222222222221', 'Palm Resort Deluxe', 'Comfortable beachside deluxe room.', 'Deluxe', 175.00, 2, '1 Queen Bed', 1, 400, 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1400', 6, 7, TRUE),
  ('e2222222-2222-4222-8222-222222222222', 'd2222222-2222-4222-8222-222222222222', 'Coastline Double Room', 'Modern room close to Candolim beach.', 'Double', 160.00, 2, '1 King Bed', 1, 360, 'https://images.unsplash.com/photo-1501117716987-c8e1ecb210f9?w=1400', 6, 7, TRUE),
  ('e2222222-2222-4222-8222-222222222223', 'd2222222-2222-4222-8222-222222222223', 'Sunset Harbor Suite', 'Premium harbor-view suite.', 'Suite', 220.00, 3, '1 King Bed + Sofa', 1, 520, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400', 3, 4, TRUE),
  ('e3333333-3333-4333-8333-333333333331', 'd3333333-3333-4333-8333-333333333331', 'Marina Deluxe', 'City-facing deluxe room near Marina.', 'Deluxe', 150.00, 2, '1 Queen Bed', 1, 350, 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=1400', 7, 8, TRUE),
  ('e3333333-3333-4333-8333-333333333332', 'd3333333-3333-4333-8333-333333333332', 'Adyar Comfort Room', 'Comfort room for short and long stays.', 'Double', 135.00, 2, '1 Queen Bed', 1, 320, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1400', 8, 9, TRUE),
  ('e3333333-3333-4333-8333-333333333333', 'd3333333-3333-4333-8333-333333333333', 'Grand Residency Suite', 'Spacious premium suite in city center.', 'Luxury Suite', 210.00, 3, '1 King Bed', 1, 500, 'https://images.unsplash.com/photo-1444201983204-c43cbd584d93?w=1400', 4, 5, TRUE),
  ('e4444444-4444-4444-8444-444444444441', 'd4444444-4444-4444-8444-444444444441', 'Lakeview Royal Room', 'Lake-facing heritage room.', 'Deluxe', 240.00, 2, '1 King Bed', 1, 470, 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1400', 5, 6, TRUE),
  ('e4444444-4444-4444-8444-444444444442', 'd4444444-4444-4444-8444-444444444442', 'Aravalli Retreat Suite', 'Tranquil mountain-view suite.', 'Suite', 195.00, 3, '1 King Bed + Sofa', 1, 490, 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1400', 4, 5, TRUE),
  ('e4444444-4444-4444-8444-444444444443', 'd4444444-4444-4444-8444-444444444443', 'City Royal Deluxe', 'Modern deluxe room in central Udaipur.', 'Deluxe', 165.00, 2, '1 Queen Bed', 1, 340, 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=1400', 6, 7, TRUE),
  ('e5555555-5555-4555-8555-555555555551', 'd5555555-5555-4555-8555-555555555551', 'Amber Heritage Suite', 'Royal suite with heritage decor.', 'Luxury Suite', 230.00, 3, '1 King Bed', 1, 520, 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1400', 4, 5, TRUE),
  ('e5555555-5555-4555-8555-555555555552', 'd5555555-5555-4555-8555-555555555552', 'Pink City Boutique Room', 'Curated boutique room in Jaipur core.', 'Double', 155.00, 2, '1 Queen Bed', 1, 330, 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1400', 7, 8, TRUE),
  ('e5555555-5555-4555-8555-555555555553', 'd5555555-5555-4555-8555-555555555553', 'Royal Residency Deluxe', 'Premium deluxe room with city access.', 'Deluxe', 185.00, 2, '1 King Bed', 1, 380, 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1400', 5, 6, TRUE)
ON CONFLICT (id) DO NOTHING;

-- Room amenities
INSERT INTO room_amenities (id, room_id, amenity)
VALUES
  ('30000000-0000-4000-8000-000000000001', 'aaaa0001-aaaa-4aaa-8aaa-aaaaaaaa0001', 'Free WiFi'),
  ('30000000-0000-4000-8000-000000000002', 'aaaa0001-aaaa-4aaa-8aaa-aaaaaaaa0001', 'Balcony'),
  ('30000000-0000-4000-8000-000000000003', 'aaaa0001-aaaa-4aaa-8aaa-aaaaaaaa0001', 'Ocean View'),
  ('30000000-0000-4000-8000-000000000004', 'aaaa0002-aaaa-4aaa-8aaa-aaaaaaaa0002', 'Free WiFi'),
  ('30000000-0000-4000-8000-000000000005', 'aaaa0002-aaaa-4aaa-8aaa-aaaaaaaa0002', 'Lounge Area'),
  ('30000000-0000-4000-8000-000000000006', 'bbbb0001-bbbb-4bbb-8bbb-bbbbbbbb0001', 'City View'),
  ('30000000-0000-4000-8000-000000000007', 'bbbb0001-bbbb-4bbb-8bbb-bbbbbbbb0001', 'Free WiFi'),
  ('30000000-0000-4000-8000-000000000008', 'bbbb0002-bbbb-4bbb-8bbb-bbbbbbbb0002', 'Workspace'),
  ('30000000-0000-4000-8000-000000000009', 'bbbb0002-bbbb-4bbb-8bbb-bbbbbbbb0002', 'Club Access'),
  ('30000000-0000-4000-8000-000000000010', 'cccc0001-cccc-4ccc-8ccc-cccccccc0001', 'Mountain View'),
  ('30000000-0000-4000-8000-000000000011', 'cccc0001-cccc-4ccc-8ccc-cccccccc0001', 'Breakfast'),
  ('30000000-0000-4000-8000-000000000012', 'cccc0002-cccc-4ccc-8ccc-cccccccc0002', 'Fireplace'),
  ('30000000-0000-4000-8000-000000000013', 'cccc0002-cccc-4ccc-8ccc-cccccccc0002', 'Family Lounge')
ON CONFLICT (id) DO NOTHING;

-- Bookings
INSERT INTO bookings (
  id,
  booking_number,
  user_id,
  hotel_id,
  room_id,
  check_in_date,
  check_out_date,
  number_of_nights,
  number_of_guests,
  status,
  subtotal,
  taxes,
  discount,
  total_amount,
  payment_method,
  payment_status,
  special_requests
)
VALUES
  (
    'dddddddd-dddd-4ddd-8ddd-dddddddddd01',
    'BK20260423001',
    '22222222-2222-2222-2222-222222222222',
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    'aaaa0001-aaaa-4aaa-8aaa-aaaaaaaa0001',
    DATE '2026-05-10',
    DATE '2026-05-13',
    3,
    2,
    'confirmed',
    540.00,
    43.20,
    54.00,
    529.20,
    'card',
    'completed',
    'Late evening check-in requested.'
  ),
  (
    'dddddddd-dddd-4ddd-8ddd-dddddddddd02',
    'BK20260423002',
    '33333333-3333-3333-3333-333333333333',
    'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
    'bbbb0001-bbbb-4bbb-8bbb-bbbbbbbb0001',
    DATE '2026-06-05',
    DATE '2026-06-08',
    3,
    2,
    'pending',
    720.00,
    57.60,
    0.00,
    777.60,
    'card',
    'pending',
    'Need airport transfer details.'
  )
ON CONFLICT (id) DO NOTHING;

-- Booking guests
INSERT INTO booking_guests (
  id,
  booking_id,
  first_name,
  last_name,
  email,
  phone,
  is_primary_guest
)
VALUES
  (
    '40000000-0000-4000-8000-000000000001',
    'dddddddd-dddd-4ddd-8ddd-dddddddddd01',
    'Rahul',
    'Shah',
    'rahul@staylux.com',
    '+91 9876543210',
    TRUE
  ),
  (
    '40000000-0000-4000-8000-000000000002',
    'dddddddd-dddd-4ddd-8ddd-dddddddddd02',
    'Priya',
    'Patel',
    'priya@staylux.com',
    '+91 9988776655',
    TRUE
  )
ON CONFLICT (id) DO NOTHING;

-- Payments
INSERT INTO payments (
  id,
  booking_id,
  amount,
  payment_method,
  transaction_id,
  status,
  refund_amount,
  refund_reason
)
VALUES
  (
    'eeeeeeee-eeee-4eee-8eee-eeeeeeee0001',
    'dddddddd-dddd-4ddd-8ddd-dddddddddd01',
    529.20,
    'card',
    'TXN-20260423-0001',
    'completed',
    0.00,
    NULL
  ),
  (
    'eeeeeeee-eeee-4eee-8eee-eeeeeeee0002',
    'dddddddd-dddd-4ddd-8ddd-dddddddddd02',
    777.60,
    'card',
    'TXN-20260423-0002',
    'pending',
    0.00,
    NULL
  )
ON CONFLICT (id) DO NOTHING;

-- Coupons
INSERT INTO coupons (
  id,
  code,
  description,
  discount_type,
  discount_value,
  max_uses,
  current_uses,
  valid_from,
  valid_to,
  min_booking_amount,
  active
)
VALUES
  (
    'ffffffff-ffff-4fff-8fff-ffffffff0001',
    'LUX10',
    'Get 10 percent off on premium bookings.',
    'percentage',
    10.00,
    100,
    1,
    DATE '2026-01-01',
    DATE '2027-12-31',
    100.00,
    TRUE
  )
ON CONFLICT (id) DO NOTHING;
