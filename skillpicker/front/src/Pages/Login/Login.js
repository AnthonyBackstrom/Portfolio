import React, { useState, useEffect, useRef } from "react";
import "./Login.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {parseCookies} from "../../Utils/Cookieparser";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginResponse, setLoginResponse] = useState("");
    const responseRef = useRef(null);

    function validateForm(){
        return username.length > 0 && password.length > 0;
    }

    function handleSubmit(e){
        e.preventDefault();
        fetch("/api/login", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        }).then(res => res.json()).then(data => {
            if("error" in data) return setLoginResponse(data.error);
            if(!"auth" in data) return setLoginResponse("Invalid reply from the server.");
            document.cookie = `auth=${data.auth}; expires=${new Date(new Date().getTime()+1000*60*60*24*7).toUTCString()}`;
            setLoginResponse("Logged in, redirecting...");
            setTimeout(()=>{
                window.location.replace("/admin");
            },1000*2);
        }).catch(e => console.log("err",e));
    }

    const cookies = parseCookies(document.cookie);
    if(cookies.has("auth")) window.location.replace("/admin");

    useEffect(() => {
        if(loginResponse !== ""){
            responseRef.current.innerText = loginResponse;
            responseRef.current.style.display = "block";
        } else {
            responseRef.current.innerText = "";
            responseRef.current.style.display = "none";
        }
    }, [loginResponse]);

    return (
        <div className="Login">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="username">
                    <Form.Label>
                        Username
                    </Form.Label>
                    <Form.Control
                        autoFocus
                        type="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button block="true" size="lg" type="submit" disabled={!validateForm()}>
                    Login
                </Button>
                <p id="loginResponse" style={{display: "none"}} ref={responseRef}></p>
            </Form>
        </div>
    );
}
