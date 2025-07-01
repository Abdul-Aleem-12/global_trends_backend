import express from 'express';
import { filterData, getAllData } from '../controllers/dataControllers.js';
import { getSummaryByContinent } from '../controllers/summaryController.js';
import {getAllFields} from '../controllers/getAll.js';

const router = express.Router();

router.get('/', getAllData);
router.get('/filter', filterData); 
router.get('/summary', getSummaryByContinent);
router.get('/fields', getAllFields);

export default router;
