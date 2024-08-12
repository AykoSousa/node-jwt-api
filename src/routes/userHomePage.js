const express = require('express');
const router = express.Router();
const app = express();
const checkToken = require('../middlewares/checkToken');
const homePage = require('../controllers/homePage');
app.use(express.json());

router.get('/user/:id', checkToken, homePage);

module.exports = router;