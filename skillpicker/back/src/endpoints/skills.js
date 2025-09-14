module.exports.setup = function setup(app, pool){
    console.log("GET/api/skills");
    app.get("/api/skills", async (req, res) => {
        try { //"SELECT (code, skill, category, subcategory, overall_description, guidance_notes, level1_description, level2_description, level3_description, level4_description, level6_description) FROM skills"
            const { rows } = await pool.query("SELECT * FROM skills");
            res.setHeader("Content-Type", "application/json");
            res.status(200).send(JSON.stringify(rows, null, 2));
        } catch (err) {
            console.error(err);
            res.status(500).json({error: "Error retrieving data.", details: JSON.stringify(err)});
        }
    });
}
