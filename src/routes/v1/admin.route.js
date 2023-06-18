const express = require('express');

const adminController = require('../../controllers/user.controller');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const {
  userValidation
} = require('../../validations');


const router = express.Router();


router.post('/register', adminController.register);
router.post('/login', adminController.login);


module.exports = router;

// /**
//  * @swagger
//  * tags:
//  *  name: Admin
//  *  description: Admin Actions
//  */


// /**
//  * @swagger
//  * /admin/register:
//  *   post:
//  *     summary: Wasac Admin Registration
//  *     tags: [Admin]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - username
//  *               - names
//  *               - address
//  *               - phone
//  *               - password
//  *             properties:
//  *               username:
//  *                 type: string
//  *                 format: username
//  *               names:
//  *                 type: string
//  *                 format: username
//  *               address:
//  *                 type: object
//  *                 properties:
//  *                    district:
//  *                      type: string
//  *                    sector:
//  *                     type: string
//  *                    cell:
//  *                      type: string
//  *                    village:
//  *                      type: string
//  *               phone:
//  *                 type: string
//  *                 format: username
//  *               password:
//  *                 type: string
//  *                 format: password
//  *             example:
//  *               username: 'johndeo'
//  *               names: 'John Doe'
//  *               address: {district: Kicukiro, sector: Gatenga, cell: Kinyinya, village: Kinyinya}
//  *               phone: {
//  *                 code: '+250',
//  *                 number: 788888888
//  *                }
//  *               password: password
//  *     responses:
//  *       "200":
//  *         description: OK
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 user:
//  *                   $ref: '#/components/schemas/User'
//  *                 tokens:
//  *                   $ref: '#/components/schemas/AuthTokens'
//  *       "400":
//  *         description: Bad Request
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   $ref: '#/components/responses/DuplicatePhone'
//  *       "401":
//  *         description: Invalid username or password
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Error'
//  *             example:
//  *               code: 401
//  *               message: Invalid username or password
//  */


// /**
//  * @swagger
//  * /admin/login:
//  *   post:
//  *     summary: Wasac Admin Login
//  *     tags: [Admin]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - usernameOrPhone
//  *               - password
//  *             properties:
//  *               usernameOrPhone:
//  *                 type: string
//  *                 format: username
//  *               password:
//  *                 type: string
//  *                 format: password
//  *             example:
//  *               usernameOrPhone: 'johndeo'
//  *               password: password
//  *     responses:
//  *       "200":
//  *         description: OK
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 tokens:
//  *                   $ref: '#/components/schemas/AuthTokens'
//  *       "401":
//  *         description: Invalid username or password
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Error'
//  *             example:
//  *               code: 401
//  *               message: Invalid username or password
//  */


// /**
//  * @swagger
//  * /admin/createUser:
//  *   post:
//  *     summary: New User Registration
//  *     tags: [Admin]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - names
//  *               - address
//  *               - phone
//  *               - nationalId
//  *             properties:
//  *               names:
//  *                 type: string
//  *                 format: username
//  *               address:
//  *                 type: object
//  *                 properties:
//  *                    district:
//  *                      type: string
//  *                    sector:
//  *                     type: string
//  *                    cell:
//  *                      type: string
//  *                    village:
//  *                      type: string
//  *               phone:
//  *                 type: string
//  *                 format: username
//  *               nationalId:
//  *                 type: string
//  *             example:
//  *               names: 'John Doe'
//  *               address: {district: Kicukiro, sector: Gatenga, cell: Kinyinya, village: Kinyinya}
//  *               phone: {
//  *                 code: '+250',
//  *                 number: 788888888
//  *               }
//  *               nationalId: '1199999999999999'
//  *     responses:
//  *       "200":
//  *         description: OK
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 user:
//  *                   $ref: '#/components/schemas/User'
//  *       "400":
//  *         description: Bad Request
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   $ref: '#/components/responses/DuplicatePhone'
//  */



// /**
//  * @swagger
//  * /admin/createDevice:
//  *   post:
//  *     summary: Wasac Admin Registration
//  *     tags: [Admin]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - userNationalId
//  *               - poc
//  *             properties:
//  *               userNationalId:
//  *                 type: string
//  *               poc:
//  *                 type: number
//  *              
//  *     responses:
//  *       "200":
//  *         description: OK
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 Device:
//  *                   $ref: '#/components/schemas/Device'
//  *                 
//  *       "401":
//  *         description: Invalid user national Id
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Error'
//  *             example:
//  *               code: 401
//  *               message: Invalid user national Id
//  */


