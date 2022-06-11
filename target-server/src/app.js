const express = require('express')
const session = require('express-session')
const { v4: uuid } = require('uuid')
const cors = require('cors')

const app = express()
const PORT = 5000

/////////////////////////////////////////////////////////////////////////

// SETUP

// app.use(cors({
    // origin: 'http://localhost:3000',
    // credentials:true
// }))
app.use(session({
    secret: 'test',
    resave: false,
    saveUninitialized: false
}))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.set('view engine', 'ejs')

/////////////////////////////////////////////////////////////////////////

// CSRF TOKENS

const tokens = new Map()

const csrfToken = (sessionId) => {
    const token = uuid()
    tokens.get(sessionId).add(token)
    setTimeout(() => tokens.get(sessionId).delete(token), 30000)

    return token
}

// CSRF Middleware
const csrf = (req, res, next) => {
    const token = req.body.csrfToken

    if (!token || !tokens.get(req.sessionID).has(token)) {
        return res.status(422).send('Falta el token CSRF o ha caducado')
    }
    next()
}

/////////////////////////////////////////////////////////////////////////

// DB

const fs = require('fs')
const users = JSON.parse(fs.readFileSync('db.json'))

/////////////////////////////////////////////////////////////////////////

// MIDDLEWARE

const mid = require('../middleware/middleware')

/////////////////////////////////////////////////////////////////////////

// ROUTES

// Home
app.get('/', mid.auth, (req, res) => {
    res.render('home')
})

// Login
app.get('/login', mid.login, (req, res) => {
    res.render('login')
})

app.post('/login', (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send('No completó todos los campos')
    }

    const user = users.find(user => user.email === req.body.email)

    if (!user || user.password !== req.body.password) {
        return res.status(400).send('Credenciales no válidas')
    }

    req.session.userId = user.id

    tokens.set(req.sessionID, new Set())

    res.redirect('/')
})

// Logout
app.get('/logout', mid.auth, (req, res) => {
    req.session.destroy()
    
    res.redirect('/')
})

// Edit
app.get('/edit', mid.auth, (req, res) => {
    res.render('edit', {
        csrfToken: csrfToken(req.sessionID)
    })
})

app.post('/edit', mid.auth, csrf, (req, res) => {
    const user = users.find(user => user.id === req.session.userId)

    const prevEmail = user.email
    user.email = req.body.email

    console.log(`El usuario id: ${user.id}, email: ${prevEmail} ha cambiado su email a ${user.email}`)

    res.send(`Email cambiado a ${user.email}`)
})

/////////////////////////////////////////////////////////////////////////

// SERVER
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})
