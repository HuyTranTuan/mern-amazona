import express from 'express';
import User from '../models/userModel.js';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { generateToken, isAuth } from '../utils.js';

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
                res.status(201).send({  
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

userRouter.put(
    '/profile',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        console.log(req.body);
        console.log(req.user);
        const user = await User.findById(req.user._id);
        if(user){
            user.firstName = req.body.firstName || user.firstName;
            user.lastName = req.body.lastName || user.lastName;
            user.email = req.body.email || user.email;
            if(req.body.password){
                user.password = bcrypt.hashSync(req.body.password, 8);
            }
            user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
            user.dateOfBirth = req.body.dateOfBirth || user.dateOfBirth;

            const updateUser = await user.save();
            res.status(201).send({
                _id: updateUser._id,
                firstName: updateUser.firstName,
                lastName: updateUser.lastName,
                email: updateUser.email,
                dateOfBirth: updateUser.dateOfBirth,
                phoneNumber: updateUser.phoneNumber,
                isAdmin: updateUser.isAdmin,
                token: generateToken(updateUser),
                message: 'User created successfully'
            })
        } else {
            res.status(404).send({message: 'User not found'});
        }
    })
);

export default userRouter;