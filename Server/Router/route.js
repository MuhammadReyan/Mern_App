import { Router } from "express";


//  Import All Controller //

import * as controller from '../Controller/appController.js'




const router = Router();

/** POST Methods */
// Register a new user
router.post('/users', controller.register);

// Send registration email
// router.post('/registerMail');

// Authenticate user
router.post('/authenticate', controller.verifyUser, (req, res) => res.end());

// Login user
router.post('/login', controller.verifyUser, controller.login);

/** GET Methods */

router.route('/user/:username').get(controller.getUser); // Get User With Username
router.route('/generateOTP').get(controller.generateOTP) // generate random OTP
router.route('/verifyOTP').get(controller.verifyOTP);//verify generate  OTP
router.route('/createResetSession').get(controller.createResetSession) //reset all the variable

/** PUT Methods */

router.route('/updateUser').put(controller.updateUser);//update the user profile
router.route('/resetPassword').put(controller.resetPassword);// reset password



export default router;