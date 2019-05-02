//Keys.js: Determine which set of credentials to return.
if (process.env.NODE_ENV === "production") {
  //We're in prod -- returns prob keys
  module.exports = require("./prodKeys");
} else {
  // We're in dev -- returns dev keys
  module.exports = require("./devKeys");
}
