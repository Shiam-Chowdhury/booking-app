import express from 'express';
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/:id', getUser);
router.get('/', getUsers);
router.put('/:id', updateUser);

router.put('/updateByUser/:id', verifyUser, (req, res) => {
    res.send({ message: 'you can update  your account' });
});

router.put('/updateByAdmin/:id', verifyAdmin, (req, res) => {
    res.send({ message: 'you can update all account' });
});

router.delete('/:id', deleteUser);

export default router;
