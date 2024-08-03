const express = require('express');
const router = express.Router();
const app = express();
const checkToken = require('../middlewares/checkToken');
const login = require('../controllers/login')
const dashboard = require('../controllers/dashboard');
const registerUser = require('../controllers/register');
app.use(express.json());

// PUBLIC ROUTE
router.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});

// POTECTED ROUTES
router.get('/user/:id', checkToken, dashboard);
router.post('/auth/login', login);
router.post('/auth/register', registerUser);

module.exports = router;