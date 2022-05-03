const express = require('express');

const { Router } = express;

const app = express();

const ProductsApi = require('./api/products');

const productsApi = new ProductsApi();

const productsRouter = new Router();

app.set('view engine', 'pug');

app.set('views', './views');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api', productsRouter);

productsRouter.get('/', (req, res) => {
    res.render('main', { products: productsApi.getAll() })
});

productsRouter.get('/products', (req, res) => {
    // if (!productsApi.getAll()) {
    //     return res.status(404).json({ error: 'Aún no hay productos cargados' });
    // }
    res.status(200).render('productsList', { products: productsApi.getAll() });
});

productsRouter.get('/products/:id', (req, res) => {
    const id = req.params.id;
    if(productsApi.getById(id)) {
        return res.status(200).json(productsApi.getById(id));
    }
    res.status(404).json({ error: 'Producto no encontrado' });
});

productsRouter.post('/products', (req, res) => {
    const toAdd = req.body;
    const product = productsApi.add(toAdd);
    if(product) {
        res.status(201).redirect('/api').json(product);
    }
    res.status(400).json({ error: 'Producto no agregado' });
});

productsRouter.put('/products/:id', (req, res) => {
    const id = req.params.id;
    const toChange = req.body;
    res.status(200).json(productsApi.update(toChange, id));
});

productsRouter.delete('/products/:id', (req, res) => {
    const id = req.params.id;
    res.status(200).json(productsApi.delete(id));
});

const PORT = 8081;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', error => console.log(`Error en el servidor ${error}`));