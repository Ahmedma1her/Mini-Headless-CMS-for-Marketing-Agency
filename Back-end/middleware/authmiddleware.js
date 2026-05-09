const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // التأكد من وجود الهيدر ويبدأ بـ Bearer
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // استخراج التوكن
            token = req.headers.authorization.split(' ')[1];

            // التحقق من التوكن باستخدام المفتاح السري
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            
            req.user = await User.findById(decoded.id).select('-password');
            
            if (!req.user) {
                return res.status(401).json({ message: 'user not found' });
            }

            next(); // الانتقال للـ Controller
        } catch (error) {
            console.error("JWT Verification Error:", error.message);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token provided' });
    }
};

// الـ Authorization Middleware (للأدوار مثل Admin)
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: `Role ${req.user?.role} is not authorized` });
        }
        next();
    };
};

module.exports = { protect, authorize };