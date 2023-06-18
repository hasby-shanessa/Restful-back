const express = require('express');

const userController = require('../../controllers/user.controller');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/register', validate(authValidation.register), userController.register);
router.post('/login', validate(authValidation.login), userController.login);
router.get('/all', auth('manageUsers'), userController.getAllUsers);

module.exports = router;

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: Users Actions
 */


/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: User Registration
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *             example:
 *               email: 'johndeo@gmail.com'
 *               name: 'John Doe'
 *               password: password
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *       "400":
 *         description: Bad Request
 */


/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *             example:
 *               email: 'johndeo@gmail.com'
 *               password: password
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *       "401":
 *         description: Invalid username or password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 401
 *               message: Invalid username or password
 */


/**
 * @swagger
 * path:
 * /users/all:
 *   get:
 *     summary: get all users 
 *     description: get all users 
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *          description: Users retrieved successfully
 *       "400":
 *         description: Bad request
 */