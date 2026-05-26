import {IRouter, Router} from 'express';
import { crearProducto } from './handlers/producto';

const router: IRouter = Router();

// Routing
router.get('/', (req, res) => {
    res.json('Desde GET')
});

router.post('/', crearProducto);

router.put('/', (req, res) => {
    res.json('Desde PUT')
});

router.delete('/', (req, res) => {
    res.json('Desde DELETE')
});

export default router;