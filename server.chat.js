const path = require('path');
const twilio = require('twilio');
const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const debug = require('debug')('chat:server:conference')

/**
 * Express Conference Server
 * @param express() app 
 */
module.exports = function chatServer(app) {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  app.get('/token', function(request, response) {
    var identity = request.query.identity;

    debug('token request')
  
    // Create an access token which we will sign and return to the client,
    // containing the grant we just created.
    var token = new AccessToken(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_API_KEY,
      process.env.TWILIO_API_SECRET
    );
  
    // Assign the generated identity to the token.
    token.identity = identity;
  
    // Grant the access token Twilio Video capabilities.
    var grant = new VideoGrant();
    token.addGrant(grant);

    debug('token response', {
      identity, token
    })
  
    // Serialize the token to a JWT string and include it in a JSON response.
    response.send({
      identity: identity,
      token: token.toJwt()
    });
  });
}

