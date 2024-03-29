import jwt from 'jsonwebtoken';



exports.verifyToken = (req, res, next) =>{
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token){
        return res.status(403).send("A token is required for authentication");
    } 
    try{
        const decodedToken = jwt.verify(token, config.TOKEN_KEY);
        req.user = decodedToken;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
}