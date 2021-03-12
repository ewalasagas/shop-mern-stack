const express = require("express");
const router = express.Router();

//********imported controller method
// const {sayHi} = require("../controllers/user");
const {signup, signin, signout, requireSignin} = require('../controllers/user');
const {userSignupValidator} = require('../validator');

// router.get('/', (req, res) => {
//     res.send("Hello from NODE haaay");
// });

//******** Same as above but using imported method
// router.get('/', sayHi);

router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);
router.get('/hello', requireSignin, (req, res) => {
    res.send("hello there");
});

module.exports = router;