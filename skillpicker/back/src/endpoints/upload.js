const {verifyAuth} = require("../verifyAuth");
const xlsx = require("xlsx");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

module.exports.setup = function setup(app, pool){
    console.log("POST/api/upload")
    app.post("/api/upload", upload.single("file"), async (req, res)=>{
        if(!req.cookies.auth) return res.status(401);
        const authorized = await verifyAuth(req.cookies.auth);
        if(!authorized) return res.status(401);
        if(!req.file.path) return res.status(400);
        return res.status(418); //NOT IMPLEMENTED YET.
        try {
            const workbook = xlsx.readFile(req.file.path);
            const sheetNames = workbook.SheetNames;
            const worksheet = workbook.Sheets[sheetNames[0]];
            const data = xlsx.utils.sheet_to_json(worksheet);
            const formattedData = data.slice(1).map(row => ({
                "Id": row[0],
                "Level 1": row[1],
                "Level 2": row[2],
                "Level 3": row[3],
                "Level 4": row[4],
                "Level 5": row[5],
                "Level 6": row[6],
                "Level 7": row[7],
                "Code": row[8],
                "Skill": row[9],
                "Category": row[10],
                "Subcategory": row[11],
                "Overall description": row[12],
                "Guidance notes": row[13],
                "Level 1 description": row[14],
                "Level 2 description": row[15],
                "Level 3 description": row[16],
                "Level 4 description": row[17],
                "Level 5 description": row[18],
                "Level 6 description": row[19],
                "Level 7 description": row[20]
            }));
            const jsonData = JSON.stringify(formattedData);
            await pool.query("TRUNCATE TABLE skills", (err, results)=>{
                if(err){
                    throw err;
                }
            });
            await pool.query("INSERT INTO skills (data) VALUES ($1)", [jsonData], async (err, result)=>{
                res.json({"ok": Date.now()*Math.random()});
            });
        } catch(e){
            res.json({error: e})
        }
    });
}
