import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
    const username_ref = useRef();
    const password_ref = useRef();
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState("");

    const navigate = useNavigate();
    const button_register_onClick = () => {
        navigate("register");
    };

    const button_login_onClick = () => {
        const username = username_ref.current.value;
        // const password = password_ref.current.value;

        // LOGIN SUCCESSS
        setStatus("Sukses Login");
        setTimeout(() => {
            props.loginSuccess(username);
            navigate("dashboard");
        }, 500);
    };
    return (
        <div className=" w-[400px] border bg-blue-400 rounded-xl flex flex-col">
            <div className="rounded-t-xl bg-black p-2 text-blue-100 font-bold text-center text-sm">HALAMAN LOGIN</div>
            <div className="flex flex-col p-5">
                <label htmlFor="username">Username</label>
                <input ref={username_ref} type="text" id="username" className="p-1 outline-none rounded" />
                <label htmlFor="password" className="mt-5">
                    Password
                </label>
                <input ref={password_ref} type={`${showPassword ? "text" : "password"}`} id="password" className="p-1 outline-none rounded" />
                <div className="flex gap-1 items-center justify-end p-2 hover:cursor-pointer self-end">
                    <input
                        type="checkbox"
                        id="showPassword"
                        onChange={(e) => {
                            setShowPassword(!showPassword);
                        }}
                        className="hover:cursor-pointer "
                    />
                    <label htmlFor="showPassword" className="text-sm select-none hover:cursor-pointer ">
                        Show Password
                    </label>
                </div>
                <div className="text-center p-2 text-xs min-h-[50px]">{status}</div>
                <div className="flex items-center justify-center gap-5">
                    <button className="rounded bg-blue-600 hover:bg-blue-500 active:bg-blue-700 self-center py-1 px-5 text-slate-100" onClick={button_register_onClick}>
                        Register
                    </button>
                    <button className="rounded bg-blue-600 hover:bg-blue-500 active:bg-blue-700 self-center py-1 px-5 text-slate-100" onClick={button_login_onClick}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
