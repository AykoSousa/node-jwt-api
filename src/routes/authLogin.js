const express = require('express');
const router = express.Router();
const login = require('../controllers/login');
const app = express();
app.use(express.json());

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user.
 *     tags: [login]
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
 *                 example: john@doe.com
 *               password:
 *                  type: string
 *                  example: "abc12345"
 *     responses:
 *       200:
 *         description: Return -> Authentication successfully!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               item:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: integer
 *                     example: 200
 *                   message:
 *                     type: string
 *                     example: 'Authentication successfully!'
 *                   token:
 *                      type: string
 *                      example: "cjcbaevbqbQFGSCNEE9pgfccabvBPVBEBv"
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
router.post('/auth/login', login);

module.exports = router;