const jose = require("jose");
const CJS = require("crypto-js");
const ENC = require("crypto-js/enc-utf8");

module.exports.setup = function setup(app, pool){
    console.log("POST/api/login");
    app.post("/api/login",async (req, res)=>{
        if(req.body.username === undefined || req.body.password === undefined) return res.status(400);
        const username = req.body.username;
        let password = req.body.password;
        try {
            await pool.query("SELECT * FROM users WHERE username=$1", [username], async (err, result)=>{
                if(result && "rows" in result && result.rows.length === 1){
                    const dbUserPass = CJS.AES.decrypt(result.rows[0].password, process.env.JWT_SECRET).toString(ENC);
                    if(dbUserPass !== password) return res.json({error: `Invalid username or password.`});
                    const alg = "HS256";
                    const token = await new jose.SignJWT({
                        username,
                        authorized: true
                    })
                        .setProtectedHeader({alg})
                        .setIssuedAt(new Date().getTime())
                        .setIssuer("urn:skillpicker.ictowls.xyz:issuer")
                        .setAudience("urn:skillpicker.ictowls.xyz:audience")
                        .setExpirationTime("7d")
                        .sign(new TextEncoder().encode(process.env.JWT_SECRET));
                    console.log("200");
                    res.json({auth: token});
                } else {
                    console.log("400");
                    res.json({error: `Invalid username or password.`});
                }
            });
        } catch(e){
            res.json({error: "Database Error.", details: e});
        }
    });
}