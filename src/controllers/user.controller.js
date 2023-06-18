const httpStatus = require('http-status');

const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const { tokenService } = require('../services');


const register = catchAsync(async (req, res) => {

    const { name, email, password } = req.body;

    //check if email is taken
    const emailTaken = await User.isEmailTaken(email);

    if (emailTaken) {
        return res.status(httpStatus.OK).json({
            success: false,
            message: 'Email already taken.'
        });
    }

    const user = await User.create({ name, email, password });

    if (!user) {
        return res.status(httpStatus.OK).json({
            success: false,
            message: 'Unable to register.'
        });
    }

    const tokens = await tokenService.generateAuthTokens(user);

    return res.status(httpStatus.OK).json({
        success: true,
        user,
        tokens,
        message: 'Account created successful.'
    });

});



const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(httpStatus.BAD_REQUEST).json({
            success: false,
            message: 'Account not found.'
        });
    }

    const passwordMatch = await user.isPasswordMatch(password, user.password);

    if (!passwordMatch) {
        return res.status(httpStatus.OK).json({
            success: false,
            message: 'Invalid password.'
        });
    }

    const tokens = await tokenService.generateAuthTokens(user);

    return res.status(httpStatus.OK).json({
        success: true,
        message: 'Logged in successully.',
        tokens,
        user
    });
});


const getAllUsers = catchAsync(async (req, res) => {
    const users = await User.find();

    return res.status(httpStatus.OK).json({
        success: true,
        users
    });
})

module.exports = {
    register,
    login,
    getAllUsers
};