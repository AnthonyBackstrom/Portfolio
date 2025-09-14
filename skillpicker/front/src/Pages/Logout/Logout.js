import "./Logout.css";

export default function Logout() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    setTimeout(()=>{
        window.location.replace("/");
    }, 1000*3);

    return (
        <div>
            <p>Logged out, redirecting to the Front Page...</p>
        </div>
    );
}
