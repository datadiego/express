const express = require('express')
const cors = require('cors')
const random = require('./random.js')
const fs = require('fs')
const PORT = 3000;

const app = express();

function logger(req, res, next) {
    const message = `${req.method} request for ${req.url} from ${req.ip} at ${new Date()}\n`
    console.log(message)
    //get log.json
    const log = JSON.parse(fs.readFileSync('log.json'))
    //add message to log.json
    log.log.push(message)
    //save log.json
    fs.writeFileSync('log.json', JSON.stringify(log))
    next()
}

var corsOptions = {
    origin: 'http://127.0.0.1:5500',
}   

app.use(cors(corsOptions)) 
app.use(express.static('public'))
app.use(logger)

app.get('/', (req, res) => {
    res.send('Hello World!')
    });

app.get('/random', (req, res) => {
    res.send({normalized: random(), to100: random(100)})
    });

app.get('/random/minmax/:min/:max', (req, res) => {
    const min = parseInt(req.params.min)
    const max = parseInt(req.params.max)
    res.send({random: random(min, max)})
    });
    
app.get('/random/valor/:valor', (req, res) => {
    const valor = parseInt(req.params.valor)
    res.send({random: random(0, valor)})
    });

app.get('/random/lista/:lista', (req, res) => {
    const lista = req.params.lista.split(',')
    res.send({random: random(lista)})
    });

app.get('/log', (req, res) => {
    const log = JSON.parse(fs.readFileSync('log.json'))
    res.send(log)
    });

app.get("/bio", (req, res) => {
    const bio = JSON.parse(fs.readFileSync('bio.json'))
    res.send(bio)
    
})
app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/public/about.html')
    });


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
    });