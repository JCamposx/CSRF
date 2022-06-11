module.exports = {
    auth : (req, res, next) => {
        if (!req.session.userId) {
            return res.redirect('/login')
        }
        next()
    },
    login : (req, res, next) => {
        if (req.session.userId) {
            return res.redirect('/')
        }
        next()
    }
}
