import express from 'express';
import User from '../models/userModel.js';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils.js';

const userRouter = express.Router();

userRouter.post(
    '/signin',
    expressAsyncHandler(async (req, res) => {
       const user = await User.findOne({ email: req.body.email });
       if(user) {
        if(bcrypt.compareSync(req.body.password, user.password) ) {
            res.send({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                dateOfBirth: user.dateOfBirth,
                phoneNumber: user.phoneNumber,
                isAdmin: user.isAdmin,
                token: generateToken(user),
            });
            return;
        } else res.status(401).send({message: "Invalid username or password"});
       } else res.status(401).send({message: "Invalid username or password"});
    })
)
userRouter.post(
    '/signup',
    expressAsyncHandler(async (req, res) => {
        const user = req.body;
        const newUser = await User.create({
            ...user,
            password: bcrypt.hashSync(user.password),
            isAdmin: false,
        })
            .then(() => {
                res.status(200).send({  
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    dateOfBirth: user.dateOfBirth,
                    phoneNumber: user.phoneNumber,
                    isAdmin: user.isAdmin,
                    token: generateToken(user),
                    message: 'User created successfully'
                });
            })
            .catch(err => {
                res.status(406).send({ message: 'Fail to create user' });
            });
    })
)

export default userRouter;