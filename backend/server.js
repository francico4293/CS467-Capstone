require('dotenv').config();
require('express-async-errors')
const express = require('express')
const path = require('path')
const middleware = require('./middleware')
const usersRouter = require('./controllers/users')
const contactsRouter = require('./controllers/contacts')
const jobsRouter = require('./controllers/jobs')
const skillsRouter = require('./controllers/skills')

const PORT = process.env.PORT || 3000;
const app = express()

app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

app.use(middleware.decodeIDToken)
app.use('/api/users', usersRouter)
app.use('/api/contacts', contactsRouter)
app.use('/api/jobs', jobsRouter)
app.use('api/skills', skillsRouter)


// send static files if no route matches
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// error handler
app.use((err, req, res, next) => {
    console.log(err)
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Something went wrong'
    res.status(statusCode).json({ error: err.message })
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});