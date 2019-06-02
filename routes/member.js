const express = require('express')
const router = express.Router()
const {ensureAuthenticated} = require('../config/auth')
const db = require('../config/db')
router.get('/catalog', ensureAuthenticated, async (req,res) => {
    const getAllGames = await db.query("SELECT * FROM games");
    res.render('catalog',{layout:'member',title:'catalog',games: getAllGames})
})

module.exports = router