import {createUser, updateUserFilter} from '../Controllers/userController.js';
import express from 'express';

const router = express.Router();

router.post('/', createUser);
router.put('/:telegramId/filter', updateUserFilter);

export default router;