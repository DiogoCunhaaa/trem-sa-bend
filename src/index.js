import express from 'express';

const app = express();
const port = 3333;

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(port, () => {
    console.log(`Backend running in localhost:${port}`);
})

export default app;