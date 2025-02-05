const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'diego2010',
    database:'perfumes'
})

app.post('/create', (req,res)=>{
    const nombre = req.body.nombre;
    const marca = req.body.marca;
    const cantidadMl = req.body.cantidadMl;
    const genero = req.body.genero;

    db.query('INSERT INTO perfu (nombre, marca, cantidadMl, genero) VALUES (?, ?, ?, ?)', [nombre, marca, cantidadMl, genero],
        (err, result)=>{
            if(err){
                console.log(err);
            }else{
                res.send('perfume registrado')
            }
        }
    );
});

app.listen(3001, ()=>{
    console.log('Escuchando por el puerto 3001')
})

