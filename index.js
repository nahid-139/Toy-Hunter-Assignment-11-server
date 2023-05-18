const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
// 
app.use(cors());
app.use(express.json());
const toy = require('./Toy.json');

app.get('/', (req, res) => {
    res.send('Toy Hunter is running')
});
app.get('/toy', (req, res) => {
    res.send(toy);
});


app.listen(port, () => {
    console.log(`Toy hunter server is Running${port}`);
  });
