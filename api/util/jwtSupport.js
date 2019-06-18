var jwtLibAPI = require('jsonwebtoken');
const base64url = require('base64url');
var fs = require('fs');

class JWTSupport {

     generateUserToken(user) {
       try {  
            const jwtToken = jwtLibAPI.sign(user, process.env.SECREATE_WORD,
            {
                expiresIn: '24h' //expires in 24 hours
            });
            return jwtToken;
        } catch(e) {
             console.log('Error:', e.stack);
        }
      }
        
    
    verifyToken(token) {
        return jwtLibAPI.verify(token, process.env.SECREATE_WORD, (err, decoded) => {
          if (err) {
              return {
                  ok: false,
                  message: 'The token is not valid!'
              };
          } else {
              return {
                ok: true,
                message: decoded
            };
          }
      });  
    }

}

module.exports = new JWTSupport();  