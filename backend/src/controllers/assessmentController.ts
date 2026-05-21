
import { Request, Response } from 'express';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import os from 'os';
// import multer from 'multer'; // TODO: Install multer: npm install multer @types/multer

// Use the system's temporary directory.
const TEMP_DIR = os.tmpdir();

// TODO: Configure multer for file uploads
// const upload = multer({ dest: TEMP_DIR });

/**
 * Assess flood severity and calculate insurance for a given plot.
 * This function currently expects raw CSV data in the request body
 * until file uploads are fully implemented.
 * @param req - Express request object
 * @param res - Express response object
 */
export const assessPlot = async (req: Request, res: Response) => {
  // TODO: Use multer to handle file uploads
  // const { fieldArea, cropType } = req.body;
  // const tempFilePath = req.file?.path;

  // if (!tempFilePath || !fieldArea || !cropType) {
  //   return res.status(400).json({ message: 'Missing required fields: csvData, fieldArea, and cropType.' });
  // }
  const { csvData, fieldArea, cropType } = req.body;

  if (!csvData || !fieldArea || !cropType) {
    return res.status(400).json({ message: 'Missing required fields: csvData, fieldArea, and cropType.' });
  }

  const tempFilePath = path.join(TEMP_DIR, `upload_${Date.now()}.csv`);

  try {
    // 1. Write the CSV data to a temporary file.
    fs.writeFileSync(tempFilePath, csvData);

    // 2. Execute the Python script.
    const pythonScriptPath = path.join(__dirname, '..', 'ml', 'assess_damage.py');
    const pythonProcess = spawn('python', [
      pythonScriptPath,
      tempFilePath,
      fieldArea,
      cropType,
    ]);

    let scriptOutput = '';
    let scriptError = '';

    pythonProcess.stdout.on('data', (data) => {
      scriptOutput += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      scriptError += data.toString();
    });

    pythonProcess.on('close', (code) => {
      // 4. Clean up the temporary file.
      fs.unlinkSync(tempFilePath);

      if (code !== 0) {
        console.error(`Python script exited with code ${code}: ${scriptError}`);
        return res.status(500).json({ message: 'Error during assessment', error: scriptError });
      }

      try {
        const result = JSON.parse(scriptOutput);
        if (result.error) {
          console.error(`Python script returned an error: ${result.error}`);
          return res.status(500).json({ message: 'Error during assessment', error: result.error });
        }
        res.status(200).json(result);
      } catch (parseError) {
        console.error('Error parsing Python script output:', parseError);
        res.status(500).json({ message: 'Error parsing assessment result', rawOutput: scriptOutput });
      }
    });
  } catch (error) {
    // Clean up the file in case of an error during setup
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
    console.error('Error assessing plot:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};