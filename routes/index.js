const express = require('express');
const {ensureAuthenticated} = require('../config/auth');
const router = express.Router();

router.get('/',(req,res) => {
    res.render('index')
})

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    console.log(req.isAuthenticated())
    res.render('dashboard', {layout:'member',title:"member", email: req.user.email})
})
module.exports = router;