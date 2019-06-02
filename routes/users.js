const express = require('express');
const db = require('../config/db');
const router = express.Router();
const passport = require('passport')
router.get('/register', (req, res) => {
    res.render('register', { title: 'register' })
})

router.post('/register', (req, res) => {
    let errors = []
    const { email, password, password2,name } = req.body
    if (!email || !password || !password2 || !name) {
        errors.push({ msg: 'password and email is required' })
    }
    if (password !== password2) {
        errors.push({ msg: 'password isnt identique' })
    }
    db.query(`SELECT email from login WHERE email= ?`, [email])
        .then( async rows => {
            if (rows.length) {
                errors.push({ msg: 'email already existe' })
            }
            if (!errors.length) {
                await db.query(`INSERT INTO login VALUES(null,?,?,NOW(),"1",?,null)`, [email,password,name])
                req.flash('success_msg', 'you are registered you can log in')
                res.redirect('/users/login')
            } else {
                res.render('register', { errors })
            }
        })
})

router.get('/login', (req,res) => {
    res.render('login', {title: 'login'})
})

router.post('/login', (req,res,next) => {
    req.flash('success_msg','you are now connected')
    passport.authenticate('local',{
        failureRedirect:'/users/login',
        successRedirect: '/dashboard',
        failureFlash: true,
    })(req,res,next)
})

router.get('/logout',(req,res) => {
    req.logout()
    res.redirect('/users/login')
})

module.exports = router;