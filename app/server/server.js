import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import read from './read.js';
import add from './add.js';
import update from './update.js';
import remove from './remove.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/api/products', read);
app.post('/api/products', add);
app.delete('/api/products/:id', remove);
app.put('/api/products/:id', update);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})