const properties = require('./json/properties.json');
const users = require('./json/users.json');

const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});


/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {

  const queryString = `
  SELECT *
  FROM users
  WHERE email = $1
  `;
  const parameters = [email.toLowerCase()];

  return pool
    .query(queryString, parameters)
    .then((result) => result.rows[0])
    .catch((err) => err.message);
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {

  const queryString = `
  SELECT *
  FROM users
  WHERE id = $1
  `;
  const parameters = [id];

  return pool
    .query(queryString, parameters)
    .then((result) => result.rows[0])
    .catch((err) => err.message);
  
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {

  const queryString = `
  INSERT INTO users (name, email, password)
  VALUES ( $1, $2, $3 )
  RETURNING *;
  `;
  const parameters = [user.name, user.email, user.password];

  return pool
    .query(queryString, parameters)
    .then((result) => result.rows)
    .catch((err) => err.message);

};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const queryString = `
    SELECT *
    FROM reservations
    JOIN properties ON reservations.property_id = properties.id
    WHERE reservations.guest_id = $1
    LIMIT $2;
  `;
  const parameters = [guest_id, limit];

  return pool
    .query(queryString, parameters)
    .then((result) => result.rows)
    .catch((err) => err.message);
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = (options, limit = 10) => {
  
  const parameters = [];

  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_reviews.property_id
  `;

  if (options.city) {
    parameters.push(`%${options.city}%`);
    queryString += `${ parameters.length > 0 ? 'AND' : 'WHERE' } properties.city LIKE $${parameters.length} `;
  }

  if (options.owner_id) {
    parameters.push(`${options.owner_id}`);
    queryString += `${ parameters.length > 0 ? 'AND' : 'WHERE' } properties.owner_id = $${parameters.length} `;
  }

  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    parameters.push(`${options.minimum_price_per_night}`);
    parameters.push(`${options.maximum_price_per_night}`);
    queryString += `${ parameters.length > 0 ? 'AND' : 'WHERE' } properties.price_per_night >= $${parameters.length - 1} AND price_per_night <= $${parameters.length} `;
  }

  if (options.minimum_rating) {
    parameters.push(`${options.minimum_rating}`);
    queryString += `${ parameters.length > 0 ? 'AND' : 'WHERE' } property_reviews.rating >= $${parameters.length} `;
  }
  
  parameters.push(limit);

  queryString += `
    GROUP BY properties.id
    ORDER BY properties.cost_per_night
    LIMIT $${parameters.length};
  `;

  return pool
    .query(queryString, parameters)
    .then((result) => result.rows)
    .catch((err) => err.message);
};

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {

  const queryString = `
  INSERT INTO properties (
    owner_id,
    title,
    description,
    thumbnail_photo_url,
    cover_photo_url,
    cost_per_night,
    street,
    city,
    province,
    post_code,
    country,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms
  )
  VALUES (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    $7,
    $8,
    $9,
    $10,
    $11,
    $12,
    $13,
    $14
  )
  RETURNING *;
  `;
  const parameters = [
    property.owner_id,
    property.title,
    property.description,
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_night,
    property.street,
    property.city,
    property.province,
    property.post_code,
    property.country,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms
  ];

  return pool
    .query(queryString, parameters)
    .then((result) => result.rows)
    .catch((err) => err.message);
};
exports.addProperty = addProperty;
