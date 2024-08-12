const express = require('express');
const router = express.Router();
const app = express();
app.use(express.json());

/**
 * @swagger
 * /api/v1/:
 *   get:
 *     summary: Return hello world message.
 *     tags: [hello_world]
 *     responses:
 *       200:
 *         description: Return -> Hello world message.
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
 *                     example: 'Hello World!'
 */
router.get('/', (req, res) => {
    res.status(200).json({ 
        status: 200,
        message: 'Hello World!'
    });
});

module.exports = router;