const {expressjwt: expressJwt}  = require('express-jwt');

function jwtBlock() {
    const secret = process.env.secret;
    return expressJwt({

        secret,

        algorithms:['HS256'],

        isRevoked:adminUsers
    }).unless({
        path:[
        {url:/\/public\/uploads(.*)/, methods:['GET', 'OPTIONS']},
        {url:/\/fox\/api\/items(.*)/, methods:['GET', 'OPTIONS']},
        {url:/\/fox\/api\/categories(.*)/, methods:['GET', 'OPTIONS']},
        '/fox.api/users/login',
        '/fox.api/users/register'
        ]
    })
}
async function adminUsers(req, payload, done) {
    if(!payload.isAdmin){
        done(null,true)

    }
    done();
}

module.exports = jwtBlock;