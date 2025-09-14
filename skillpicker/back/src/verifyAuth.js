const jose = require("jose");

module.exports.verifyAuth = async (auth) => {
    return new Promise(async res => {
        await jose.jwtVerify(auth, new TextEncoder().encode(process.env.JWT_SECRET), {
            issuer: 'urn:skillpicker.ictowls.xyz:issuer',
            audience: 'urn:skillpicker.ictowls.xyz:audience',
        }).then(async (result)=>{
            const {payload, protectedHeader} = result;
            res(payload["authorized"] === true);
        }).catch(e => {
            res(false);
        });
    })
}