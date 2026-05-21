import express from 'express';
import { assessPlot } from '../controllers/assessmentController';
import { generateGeeCsv } from '../controllers/geeController';
// import multer from 'multer'; // TODO: Install multer: npm install multer @types/multer

// const upload = multer({ dest: 'uploads/' }); // TODO: Configure multer

const router = express.Router();

/**
 * @route   POST /api/assess
 * @desc    Assess flood severity and calculate insurance
 * @access  Public
 */
// TODO: Add multer middleware to handle file uploads: router.post('/assess', upload.single('csvFile'), assessPlot);
router.post('/assess', assessPlot);

/**
 * @route   POST /api/generate-csv
 * @desc    Generate CSV from uploaded data
 * @access  Public
 */
router.post('/generate-csv', generateGeeCsv);

export default router;