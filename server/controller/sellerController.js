import jwt from 'jsonwebtoken'

//Login seller: /api/seller/login
export const sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
            if (password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL) {
                const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });

                res.cookie('sellerToken', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict',
                    maxAge: 7 * 24 * 60 * 60 * 1000 // Cookie expiration time (7 days)
                });

                return res.json({ success: true, message: "Seller logged in successfully" });
            } else {
                return res.json({ success: false, message: "Invalid email or password" });
            }
    } catch (error) {
        console.error(error.message);
        return res.json({ success: false, message: error.message });
    }
}

//Seller isAuth: /api/seller/is-auth
export const isSellerAuth = async (req, res) => {
    try {
        return res.json({ success: true});
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
}  

// Logout seller: /api/seller/logout
export const sellerLogout = async (req, res) => {
    try {
        res.clearCookie('sellerToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict',
        });
        return res.json({ success: true, message: "Seller logged out successfully" });
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
}