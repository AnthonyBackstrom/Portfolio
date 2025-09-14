const {verifyAuth} = require("../verifyAuth");

module.exports.setup = function setup(app, pool){
    console.log("POST/api/hash");
    app.post("/api/hash", async (req, res)=>{
        if(req.body.hash === undefined) return res.json({error: "Invalid request."});
        const hash = req.body.hash;
        try {
            await pool.query("SELECT * FROM answers WHERE hash=$1", [hash], async (err, result)=>{
                if(result && "rows" in result && result.rows.length === 1){
                    res.json({ok: Date.now()*Math.random()});
                } else {
                    res.json({error: "Invalid hash."});
                }
            })
        } catch(e){
            res.json({error: e})
        }
    });

    console.log("POST/api/hashList")
    app.post("/api/hashList", async (req, res)=>{
        if(!req.cookies.auth) return res.status(401);
        const authorized = await verifyAuth(req.cookies.auth);
        if(!authorized) return res.status(401);
        try {
            await pool.query("SELECT hash FROM answers", [], async (err, result)=>{
                res.json({"ok": result.rows.map(x => x["hash"])});
            });
        } catch(e){
            res.json({error: e})
        }
    });

    console.log("PUT/api/hashList");
    app.put("/api/hashList", async (req, res)=>{
        if(!req.cookies.auth) return res.status(401);
        const authorized = await verifyAuth(req.cookies.auth);
        if(!authorized) return res.status(401);
        if(req.hash === undefined) return res.status(400);
        try {
            await pool.query("INSERT INTO answers (hash) VALUES ($1)", [req.hash], async (err, result)=>{
                if(result && "rows" in result && result.rows.length === 1){
                    res.json({ok: Date.now()*Math.random()});
                } else {
                    console.log("ERR");
                    console.log(result);
                    res.json({error: "Unknown error while adding hash, check backend console."});
                }
            });
        } catch(e){
            res.json({error: e})
        }
    });

    console.log("DELETE/api/hashList");
    app.delete("/api/hashList", async (req, res)=>{
        if(!req.cookies.auth) return res.status(401);
        const authorized = await verifyAuth(req.cookies.auth);
        if(!authorized) return res.status(401);
        if(req.hash === undefined) return res.status(400);
        try {
            await pool.query("DELETE FROM answers WHERE hash=$1", [req.hash], async (err, result)=>{
                if(result){
                    res.json({ok: Date.now()*Math.random()});
                } else {
                    console.log("ERR");
                    console.log(result);
                    res.json({error: "Unknown error while adding hash, check backend console."});
                }
            });
        } catch(e){
            res.json({error: e})
        }
    });
}
