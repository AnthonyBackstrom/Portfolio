export function parseCookies(cookieString){
    const cookies = new Map();
    if(cookieString.length === 0) return cookies;
    for(const cookie of cookieString.split(" ").join("").split(";")){
        let c = cookie.split("=");
        c[1] = decodeURIComponent(c[1]);
        if(c[1].startsWith("j:")) c[1] = c[1].slice(2);
        cookies.set(c[0],c[1]);
    }
    return cookies;
}

export function removeCookies(document){
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}