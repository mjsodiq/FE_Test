import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function Register() {
    const server_host = useSelector((state) => state.app.server_host);
    const username_ref = useRef();
    const password_ref = useRef();
    const confirmPassword_ref = useRef();

    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState("");
    const navigate = useNavigate();

    // BUTTON REGISTER ONCLICK FUNCTION
    const button_register_onClick = async () => {
        const username = username_ref.current.value;
        const password = password_ref.current.value;
        const confirmPassword = confirmPassword_ref.current.value;

        // SUBMIT FORM
        try {
            await axios
                .post(`${server_host}/register`, {
                    username,
                    password,
                    confirmPassword,
                })
                .then((res) => {
                    setStatus(res.data.msg);
                    setTimeout(() => {
                        navigate("../");
                    }, 500);
                });
        } catch (error) {
            console.log("error", error);
            setStatus(error.response.data.msg);
        }
    };
    return (
        <div className=" w-[400px] border bg-blue-400 rounded-xl flex flex-col">
            {/* HEADER */}
            <div className="rounded-t-xl bg-black p-2 text-blue-100 font-bold text-center text-sm">HALAMAN REGISTRASI</div>

            {/* FORM */}
            <div className="flex flex-col p-5">
                {/* FORM USERNAME */}
                <label>Username</label>
                <input ref={username_ref} type="text" className="p-1 outline-none rounded" />

                {/* FORM PASSWORD */}
                <label className="mt-5">Password</label>
                <input ref={password_ref} type={`${showPassword ? "text" : "password"}`} className="p-1 outline-none rounded" />

                {/* FORM KONFIRMASI PASSWORD */}
                <label className="mt-5">Konfirmasi Password</label>
                <input ref={confirmPassword_ref} type={`${showPassword ? "text" : "password"}`} className="p-1 outline-none rounded" />

                {/* CECKBOX SHOW PASSWORD */}
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

                {/* STATUS GAGAL / SUKSES */}
                <div className="text-center p-2 text-xs min-h-[50px]">{status}</div>

                {/* TOMBOL REGISTER */}
                <button className="rounded bg-blue-600 hover:bg-blue-500 active:bg-blue-700 self-center py-1 px-5 text-slate-100" onClick={button_register_onClick}>
                    Register
                </button>
            </div>
        </div>
    );
}

export default Register;
