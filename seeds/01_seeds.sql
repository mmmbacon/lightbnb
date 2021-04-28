
--USERS--
INSERT INTO users (id, name, email, password)
VALUES (
  1, 'Dave Johnson', 'Dave.Johnson@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u' 
),
(
  2, 'Bill Macleod', 'Bill.Macleod@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u' 
),
(
  3, 'Wanda Peterson', 'Wanda.Peterson@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u' 
),
(
  4, 'Jorge Bechtel', 'Jorge.Bechtel@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u' 
);


--PROPERTIES--
INSERT INTO properties (
  id,
  owner_id,
  title, 
  description, 
  thumb_photo_url, 
  cover_photo_url, 
  cost_per_night, 
  parking_spaces, 
  number_of_bathrooms, 
  number_of_bedrooms, 
  country, 
  street, 
  city, 
  province, 
  post_code
)
VALUES (
  1,
  1,
  'Mount Pleasant Mansion', 
  'Description here', 
  './img/thumbs/01.png', 
  './img/covers/01.png',
  357,
  4,
  4,
  5,
  'Canada',
  '55 Mount Pleasant Avenue SW',
  'Calgary',
  'Alberta',
  'T3N0K1'
),
(
  2,
  1,
  'Pearl Gates Apartments', 
  'Description here', 
  './img/thumbs/02.png', 
  './img/covers/02.png',
  210,
  1,
  1,
  1,
  'Canada',
  '12 McDonald Street NW',
  'Calgary',
  'Alberta',
  'T7A4T6'
),
(
  3,
  2,
  'Cliffside Bungalows', 
  'Description here', 
  './img/thumbs/03.png', 
  './img/covers/03.png',
  1200,
  2,
  2,
  2,
  'Canada',
  '100 Highside Lane NW',
  'Vancouver',
  'British Columbia',
  'V9L6B7'
);

--RESERVATIONS--
INSERT INTO reservations ( id, start_date, end_date, guest_id, property_id)
VALUES
  (1, '2020-07-21', '2020-08-13', 4, 1),
  (2, '2020-02-01', '2020-03-01', 3, 1),
  (3, '2020-08-24', '2020-09-10', 2, 2);


--PROPERTY REVIEWS--
INSERT INTO property_reviews (
  id,
  guest_id,
  property_id,
  reservation_id,
  rating,
  message
)
VALUES 
  (1, 4, 1, 1, 4, 'It was alright. Bed was damp.'),
  (2, 3, 1, 2, 1, 'Why did I pay this much money?'),
  (3, 2, 2, 3, 5, 'Eggs were under cooked but hey, Cant beat the groupon deal!');