module.exports = {
    ensureAuthenticated: function(req,res,next){
        if(req.isAuthenticated()){
            return next()
        }
        req.flash('error_msg', 'You need to log in')
        res.redirect('/users/login')
    },
    isAdmin: (req,res,next) => {
        if(req.user.status == "admin"){
            return next()
        }
        res.redirect('/dashboard')
    }
}