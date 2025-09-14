const {verifyAuth} = require("../verifyAuth");
module.exports.setup = function setup(app, pool){
    console.log("POST/api/answers");
    app.post("/api/answers", async (req, res) => {
        console.log(req.body);
        return res.status(418); //NOT IMPLEMENTED YET.
        //TODO: Check if hash
        //TODO: Check if selections
        try {
            //TODO: Overwrite answers where hash
        } catch (err) {
            console.error(err);
            res.json({error: err});
        }
    });

    console.log("GET/api/answers");
    app.get("/api/answers", async (req, res) => {
        if(!req.cookies.auth) return res.status(401);
        const authorized = await verifyAuth(req.cookies.auth);
        if(!authorized) return res.status(401);
        return res.status(418); //NOT IMPLEMENTED YET.
        // /api/answers?id=#xyz123
        // /api/answers?all
        //TODO: Check url param, id=hash/all.
        try {
            //IF hash:
            //TODO: Find by hash
            //TODO: Convert to human readable format, pdf? Page you can print as pdf?
            //IF ALL:
            //TODO: Take all
            //TODO: Convert to a csv file.
        } catch (err) {
            console.error(err);
            res.json({error: err});
        }
    });
}
