const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const { connectToMongoDB } = require('../controllers/dbConnection');
const Doctor = require('../dbmodels/doctorSchema');

const app = express();
const port = 6001;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/degree');
    },
    filename: function (req, file, cb) {
        const originalname = file.originalname;
        const username = req.body.username; 
        const extname = path.extname(originalname);
        cb(null, `${username}${extname}`);
    }
});

const profileImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/profileimages/doctor');
    },
    filename: function (req, file, cb) {
        const originalname = file.originalname;
        const username = req.body.username;
        const extname = path.extname(originalname);
        cb(null, `${username}${extname}`);
    }
});

const uploadDegree = multer({ storage: storage });
const uploadProfileImage = multer({ storage: profileImageStorage });

app.use(cors());

app.use(express.json()); 

try {
    connectToMongoDB();
}   catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
}   


app.post('/doctor/register', async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            bio,
            phoneNumber,
            urls,
            username,
            password,
            age,
            dob,
            category,
            experience,
            aadhaar,
            clinic_location,
            home_location,
            current_location,
            detected_location,
            location_terms,
            license,
            medicaldegree,
            registration
        } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const degreePdfPath = `uploads/degree/${username}`;
        const profileImagePath = `uploads/profileimages/doctor/${username}`;
        const { lat, lng } = detected_location;

        const newDoctor = new Doctor({
            firstName,
            lastName,
            email,
            bio,
            phoneNumber,
            urls,
            username,
            password: hashedPassword, 
            age,
            dob,
            category,
            experience,
            aadhaar,
            clinic_location,
            home_location,
            current_location,
            detected_location: { type: "Point", coordinates: [lng, lat] }, 
            location_terms,
            license,
            medicaldegree,
            degreepdf: degreePdfPath, 
            profileImage: profileImagePath, 
            registration,
            location: {
                type: "Point",
                coordinates: [lng, lat]
            },
        });
        await newDoctor.save();
        res.status(200).json({ message: 'successfull'});
    } catch (error) {
        console.error('Error registering doctor:', error);
        res.status(500).json({ error: 'An error occurred while registering the doctor' });
    }
});
app.post("/doctor/register/degree", uploadDegree.single("degree"), (req, res) => {
    return res.status(200).send("Degree uploaded successfully");
});

app.post("/doctor/register/profileimage", uploadProfileImage.single("profileimage"), (req, res) => {
    return res.status(200).send("Profile image uploaded successfully");
});

app.listen(port, () => {
    console.log(`Doctor service is running on port ${port}`);
});
