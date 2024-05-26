const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const { connectToMongoDB } = require('../controllers/dbConnection');
const User = require('../dbmodels/userSchema');

const app = express();
const port = 6002;

const profileImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/profileimages/user');
    },
    filename: function (req, file, cb) {
        const originalname = file.originalname;
        const username = req.body.username;
        const extname = path.extname(originalname);
        cb(null, `${username}${extname}`);
    }
});

const uploadProfileImage = multer({ storage: profileImageStorage });
app.use(cors());
app.use(express.json()); 
try {
    connectToMongoDB();
}   catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
}   


app.post('/user/register', async (req, res) => {
    try {
        const {
            email,
            phoneNumber,
            username,
            password,
            dob,
            address,
            name,
        } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const profileImagePath = `uploads/profileimages/user/${username}`;
        const newuser = new User({
            email,
            phoneNumber,
            username,
            password: hashedPassword, 
            dob,
            name,
            address,
            profileImage: profileImagePath, 
        });
        await newuser.save();
        res.status(200).json({ message: 'successfull'});
    } catch (error) {
        console.error('Error registering doctor:', error);
        res.status(500).json({ error: 'An error occurred while registering the doctor' });
    }
});


app.post("/user/register/profileimage", uploadProfileImage.single("profileimage"), (req, res) => {
    return res.status(200).send("Profile image uploaded successfully");
});

app.listen(port, () => {
    console.log(`User service is running on port ${port}`);
});
