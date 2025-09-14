const jose = require("jose");
const CJS = require("crypto-js");

module.exports.setup = function setup(app, pool){
    console.log("POST/api/adduser");
    app.post("/api/adduser", async (req, res)=>{
        return res.status(418);  //NOT IMPLEMENTED YET.
        if(!req.cookies.auth) return res.status(400);
        if(req.body.username === undefined || req.body.password === undefined) return res.status(400);
        await jose.jwtVerify(req.cookies.auth, new TextEncoder().encode(process.env.JWT_SECRET), {
            issuer: 'urn:skillpicker.ictowls.xyz:issuer',
            audience: 'urn:skillpicker.ictowls.xyz:audience',
        }).then(async (result)=>{
            const {payload, protectedHeader} = result;
            if(payload["authorized"] === true){
                const username = req.body.username;
                let password = req.body.password;
                password = CJS.AES.encrypt(password, process.env.JWT_SECRET).toString();
                await pool.query("SELECT * FROM users WHERE username=$1", [username, password], async (err, result)=>{
                    if(result && "rows" in result && result.rows.length === 1){
                        //Account exists.
                        await pool.query("UPDATE users SET password=$2 WHERE username=$1", [username, password], async (err, result2)=>{
                            if(result2 && "rows" in result2 && result2.rows.length === 1){
                                res.json(200);
                            } else {
                                res.json(400);
                            }
                        }).catch(e => res.json(e));
                    } else {
                        //New account.
                        await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, password], async (err, result2)=>{
                            if(result2 && "rows" in result2 && result2.rows.length === 1){
                                res.json(200);
                            } else {
                                res.json(400);
                            }
                        }).catch(e => res.json(e));
                    }
                }).catch(e => res.json(e));
            } else {
                return res.status(400);
            }
        }).catch(e => {
            return res.status(400);
        });
    });
}
