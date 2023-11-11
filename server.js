const express = require('express')
const mysql = require('mysql')
const myconn = require('express-myconnection')

const routes = require('./rutas')

const app = express();
app.set('port', process.env.PORT || 9000)
const dbOptions = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'restaurantes'
}

app.use(myconn(mysql, dbOptions, 'single'))
app.use(express.json())

app.get('/', (req, res)=>{
    res.send('Bienvenido a la API')
})
app.use('/api', routes)

app.listen(app.get('port'), ()=>{
    console.log('server running on port', app.get('port'))
})