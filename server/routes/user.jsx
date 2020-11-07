const express = require('express');
const cors = require('cors');
const router = express.Router();
const usersController = require('../controllers/userController.jsx');
const app = express();
app.use(cors());
app.use(express.json());

router.post('/signup', usersController.createNewUser);
router.post('/signin', usersController.signinWithToken);
module.exports = router;
