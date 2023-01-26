var express = require('express');
var router = express.Router();
var user = require('../modules/user')
const { isAuthenticatedUser } = require("../middlewares/auth");
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.post('/register', user.registerUser);
router.post('/login', user.validateUser);
router.put('/edit', isAuthenticatedUser, user.editUser);
router.get('/getAllUsers', isAuthenticatedUser, user.getAllUsers);
router.delete('/deleteUser/:id', isAuthenticatedUser, user.deleteUsers);
module.exports = router;
