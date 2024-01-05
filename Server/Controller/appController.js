import { GenerateToken, } from "../Helper/Helpers.js";
import Usermodel from "../Model/Usermodel.js"
import bcrypt from 'bcrypt'




/** MiddleWare For Verify User */

export async function verifyUser(req, res, next) {

    try {
        const { username } = req.method == "GET" ? req.query : req.body;
        console.log(req.query)
        //  Check the user exist
        const exist = await Usermodel.findOne({ username });
        if (!exist) return res.status(404).send({ error: 'User Not Found!!!' })
        next()

    } catch (error) {
        return res.status(404).send({ error: "Authentication Error"});
    }

}











/** POST: http://localhost:8080/api/register */

export async function register(req, res) {
    try {
        const { username, email, password, profile } = req.body;

        // Check if the username already exists
        const existingUsername = await Usermodel.findOne({ username });
        if (existingUsername) {
            throw { error: 'Username Already Exists' };
        }

        // Check if the email already exists
        const existingEmail = await Usermodel.findOne({ email });
        if (existingEmail) {
            throw { error: 'Email Already Exists' };
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new Usermodel({
            username,
            password: hashedPassword,
            profile: profile || '',
            email,
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        console.log("User registration successful:", savedUser);
        res.status(200).send({ msg: "User Register Successful" });

    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).send({ error });
    }
}




/** POST: http://localhost:8080/api/login */

export async function login(req, res) {
    const { username, password } = req.body;

    try {
        // Check if the username exists in the database
        const user = await Usermodel.findOne({ username });

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).send({ error: 'Invalid password' });
        }

        // Generate Token
        user.password = undefined
        const token = GenerateToken({ data: user, expiresIn: '24h' });
        res.cookie('token', token, { httpOnly: true });

        // Authentication successful
        res.status(200).json({
            status: true,
            message: 'Login Successful',
            token,
            data: user,
        });


    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}


/** GET: http://localhost:8080/api/user/john */

export async function getUser(req, res) {

}

/** PUT: http://localhost:8080/api/updateuser  */

export async function updateUser(req, res) {

}


/** GET: http://localhost:8080/api/generateOTP */

export async function generateOTP(req, res) {

}

/** GET: http://localhost:8080/api/verifyOTP */

export async function verifyOTP(reg, res) {

}


// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */

export async function createResetSession(req, res) {

}

// update the password when we have valid session
/** PUT: http://localhost:8080/api/resetPassword */

export async function resetPassword(req, res) {

}