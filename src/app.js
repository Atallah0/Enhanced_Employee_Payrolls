const express = require('express')
const cors = require('cors')

const app = express()

let corOptions = {
    origin: 'https://localhost:8081'
}

//Routes
const managers = require('./routes/managerRoutes')

// Middleware
app.use(cors(corOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.json({ message: 'Hello from API' })
})

//Routers
app.use('/api/managers', managers)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
})