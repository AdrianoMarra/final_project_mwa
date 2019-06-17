var jwtLibAPI = require('jsonwebtoken');
const base64url = require('base64url');
var fs = require('fs');




class JWTSupport {

     generateUserToken(user) {
        
        
       try {  
            const today = new Date();
            const expirationDate = new Date(today);
            expirationDate.setDate(today.getDate() + 90);
            user.exp= parseInt(expirationDate.getTime() / 1000, 10);
            const jwtToken=jwtLibAPI.sign(JSON.stringify(user), process.env.PRIVATE_KEY);
            const payload=base64url.encode(JSON.stringify(user));
            const headers=base64url.encode("{typ:'JWT'}");
            return headers+"|||"+payload+"|||"+jwtToken;
        } catch(e) {
             console.log('Error:', e.stack);
        }
      }
        
    
    verifyToken(token) {
        
        verificationResult=jwtLibAPI.verify(token, process.env.JWT_PUBLIC_KEY,{algorithm: 'RS256'});  
    }

}

module.exports = new JWTSupport();  