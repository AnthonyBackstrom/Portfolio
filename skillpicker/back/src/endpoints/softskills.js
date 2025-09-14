module.exports.setup = function setup(app, pool) {
    console.log("GET/api/softskills");
    app.get('/api/softskills', async (req, res) => {
        try {
            const {rows} = await pool.query('SELECT * FROM soft_skills');
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(rows, null, 2));
        } catch (err) {
            console.error(err);
            res.status(500).send('Error retrieving data from database');
        }
    });
}
