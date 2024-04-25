
const zipcodes = require("zipcodes");

export function zipCodeLocator(str) {
  const zipCode = parseInt(str); // logged in users zipcode

  var rad = zipcodes.radius(zipCode, 10);
  console.log(rad);
}

