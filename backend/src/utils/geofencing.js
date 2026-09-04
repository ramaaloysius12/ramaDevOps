const geolib = require('geolib');

/**
 * Menghitung jarak antara koordinat pengguna dan kantor dalam satuan meter
 * @param {number} userLat 
 * @param {number} userLng 
 * @param {number} officeLat 
 * @param {number} officeLng 
 * @returns {number} Jarak dalam meter
 */
const calculateDistance = (userLat, userLng, officeLat, officeLng) => {
  return geolib.getDistance(
    { latitude: userLat, longitude: userLng },
    { latitude: officeLat, longitude: officeLng }
  );
};

module.exports = { calculateDistance };
