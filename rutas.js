const express = require('express')
const routes = express.Router()

routes.get('/lugar/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).json({ error: 'Error de conexión a la base de datos' });
        }

        conn.query('SELECT * FROM lugar', (err, rows) => {
            if (err) {
                return res.status(500).json({ error: 'Error al ejecutar la consulta' });
            }

            res.json(rows);
        });
    });
});

routes.get('/lugar/:lugar', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).json({ error: 'Error de conexión a la base de datos' });
        }

        const nombreLugar = req.params.lugar;

        conn.query('SELECT * FROM lugar WHERE lugar = ?', [nombreLugar], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: 'Error al ejecutar la consulta' });
            }

            if (rows.length === 0) {
                return res.status(404).json({ error: 'Lugar no encontrado' });
            }

            res.json(rows);
        });
    });
});

routes.post('/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).json({ error: 'Error de conexión a la base de datos' });
        }

        conn.query('INSERT INTO lugar SET ?',[req.body], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: 'Error al ejecutar la consulta' });
            }

            res.send('Datos insertados')
        });
    });
});

routes.delete('/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).json({ error: 'Error de conexión a la base de datos' });
        }

        conn.query('DELETE FROM lugar WHERE id = ?',[req.params.id], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: 'Error al ejecutar la consulta' });
            }

            res.send('Datos eliminados')
        });
    });
});

routes.put('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE lugar set ? WHERE id = ?', [req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Datos actualizados')
        })
    })
})

module.exports = routes