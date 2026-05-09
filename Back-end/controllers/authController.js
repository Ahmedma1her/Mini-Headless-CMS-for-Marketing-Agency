const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {loginSchema,registerSchema}= require('../middleware/validation')

// تسجيل المستخدم الجديد
exports.register = async (req, res) => {
  try {
    if (req.body.role && req.body.role !== 'user') {
      return res.status(403).json({ msg:"you are not allowed to choose this role" })
    }
    const {error,value}=registerSchema.validate(req.body,{
      stripUnknown:true,
      abortEarly:false
    })  
    if (error) return res.status(400).json({ msg:error.details[0].message })
    const { username, email, password } = value; 
    const userExist=await User.findOne({email})
    if (userExist) return res.status(400).json({msg:"invalid email"})

    

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username, 
      email,
      password: hashedPassword,
      role: 'user' 
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
    const {error,value}=loginSchema.validate(req.body,{
      stripUnknown:true,
      abortEarly:false
    })
if (error) return res.status(400).json({ msg:"invalid credentials" })
    const { email, password } = value;

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
