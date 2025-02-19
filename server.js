
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { connectDatabase, getConnection } = require('./database');
const userRoutes = require('./routes/routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/ping', (req, res) => {
    res.send('Pong!');
});

connectDatabase();

app.get('/', (req, res) => {
    console.log('Connected');
    res.json({ message: getConnection() });
});

// Use user routes
app.use('/api', userRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});