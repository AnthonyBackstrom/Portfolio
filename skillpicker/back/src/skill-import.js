const express = require('express')
const xlsx = require('xlsx');
const { Pool } = require('pg');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express()
// Connect to the database
const pool = new Pool({
  user: 'your_username',
  host: 'your_hostname',
  database: 'your_database_name',
  password: 'your_password',
  port: your_port_number,
});

// Define the route to accept file uploads
app.post('/upload', upload.single('file'), (req, res, next) => {
	// Read the uploaded file
	const workbook = xlsx.readFile(req.file.path);

	// Extract the sheet names from the workbook
	const sheetNames = workbook.SheetNames;

	// Parse the first sheet
	const worksheet = workbook.Sheets[sheetNames[0]];
	
	const data = xlsx.utils.sheet_to_json(sheet);

	function parseSFIA8Data(sheetData) {
		const sfia8Data = sheetData.slice(1);
	
		const formattedData = sfia8Data.map(dataRow => {
		const formattedRow = {};
	
		formattedRow.Id = dataRow[0];
		formattedRow["Level 1"] = dataRow[1];
		formattedRow["Level 2"] = dataRow[2];
		formattedRow["Level 3"] = dataRow[3];
		formattedRow["Level 4"] = dataRow[4];
		formattedRow["Level 5"] = dataRow[5];
		formattedRow["Level 6"] = dataRow[6];
		formattedRow["Level 7"] = dataRow[7];
		formattedRow.Code = dataRow[8];
		formattedRow.Skill = dataRow[9];
		formattedRow.Category = dataRow[10];
		formattedRow.Subcategory = dataRow[11];
		formattedRow["Overall description"] = dataRow[12];
		formattedRow["Guidance notes"] = dataRow[13];
		formattedRow["Level 1 description"] = dataRow[14];
		formattedRow["Level 2 description"] = dataRow[15];
		formattedRow["Level 3 description"] = dataRow[16];
		formattedRow["Level 4 description"] = dataRow[17];
		formattedRow["Level 5 description"] = dataRow[18];
		formattedRow["Level 6 description"] = dataRow[19];
		formattedRow["Level 7 description"] = dataRow[20];
		
		return formattedRow;
		});
	
		return formattedData;
	}

  const parsedData = parseSFIA8Data(data)

  // Convert the parsed data to JSON format
  const jsonData = JSON.stringify(parsedData);

	// Truncate the existing table
	pool.query('TRUNCATE TABLE sfia8', (error, results) => {
		if (error) {
		throw error;
		}

    // Insert the parsed and converted data into the database table
    pool.query('INSERT INTO sfia8 (data) VALUES ($1)', [jsonData], (error, results) => {
      if (error) {
        throw error;
      }

      // Close the database connection
      pool.end();

      // Send a success response
      res.json({ success: true });
    });
  });
});
