import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    const { token } = req.cookies;

    if(!token) {
        return res.json({ success: false, message: "Unauthorized access" });
    }

    try {
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
        if(tokenDecoded.id){
            req.body = req.body || {};
            req.body.userId = tokenDecoded.id;
        } else{
            return res.json({ success: false, message: "Invalid token" });
        }
        next();
    } catch (error) {
        console.error(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export default authUser;