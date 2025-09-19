import express from 'express';
import db from './db.js';

const app = express();
app.use(express.json());

const port = 3333;

app.get('/usuarios', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM usuarios");
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro no servidor");
    }
});

app.listen(port, () => {
    console.log(`Backend running in localhost:${port}`);
})

export default app;