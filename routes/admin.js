const express = require('express')
const { ensureAuthenticated, isAdmin } = require('../config/auth')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const db = require('../config/db')
const upload = multer({
    dest: "/tmp/img"
})

router.get('/addgames', ensureAuthenticated, isAdmin, (req, res) => {
    res.render('admin/addgame', { title: "ajouter des jeux" })
});

router.post('/addgames', upload.single('jacket'), ensureAuthenticated, isAdmin, (req, res) => {
    const tempPath = req.file.path
    const extname = path.extname(req.file.originalname)
    const { name, type } = req.body
    const namefile = req.body.name + (Math.round(Math.random() * (6872 * 5871) - 1)).toString() + extname
    const url = 'img/' + namefile
    console.log(name + extname)
    const targetPath = path.join(req.pathRoot, "/public/img/" + namefile);
    db.query("INSERT INTO games VALUES(null,?,?,?,null)", [name, url, type])
        .then(rows => {
            fs.rename(tempPath, targetPath, err => {
                if (err) return handleError(err, res);
                req.flash('success_msg', 'file uploded successfully !')
                res.redirect('/admin/addgames')
            });
        })

})


module.exports = router