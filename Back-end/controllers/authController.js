const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// تسجيل المستخدم الجديد
exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body; 

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username, 
      email,
      password: hashedPassword,
      role: role || 'user' 
    });

    await newUser.save();
    res.status(201).json({ message: "Account has been created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// تسجيل الدخول
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // التحقق من المستخدم وكلمة المرور
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // إنشاء الـ token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username, 
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
