const express = require('express');
const router = express.Router();
const app = express();
const registerUser = require('../controllers/register');
app.use(express.json());

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register an user.
 *     tags: [register_user]
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
 *               - confirmpassword
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@doe.com
 *               password:
 *                  type: string
 *                  example: "abc12345"
 *               confirmpassword:
 *                  type: string
 *                  example: "abc12345"
 *     responses:
 *       201:
 *         description: Return -> User created successfully!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               item:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: integer
 *                     example: 201
 *                   message:
 *                     type: string
 *                     example: 'User created successfully!'
 *       500:
 *         description: Return -> Internal server error!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               item:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: integer
 *                     example: 500
 *                   message:
 *                     type: string
 *                     example: 'Internal server error!'
 *
 */
router.post('/auth/register', registerUser);

module.exports = router;