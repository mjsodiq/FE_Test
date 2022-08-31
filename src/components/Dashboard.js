import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./container/home/Home";
import MasterRuas from "./container/MasterRuas/MasterRuas";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "./modal/Modal";

function Navbar(props) {
    const navigate = useNavigate();
    const button_logout_onClick = () => {
        navigate("../");
    };
    return (
        <div className="flex items-center gap-2 max-h-52 bg-black w-full justify-between p-2">
            <div className="font-bold select-none font-sans text-orange-500">DASHBOARD</div>
            <div className="flex gap-3 items-center">
                <div className="text-white text-sm">{`Welcome :  ${props.current_user}`}</div>
                <button className="bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white px-5 py-1 rounded text-sm" onClick={button_logout_onClick}>
                    Logout
                </button>
            </div>
        </div>
    );
}

function Container() {
    return (
        <div className=" px-40 h-full flex flex-1 gap-0">
            <div className="flex flex-col -mr-1 pt-5">
                <Link to={"/dashboard/home"} className="border border-green-600  px-10 border-b-0">
                    Home
                </Link>
                <Link to={"/dashboard/master-ruas"} className="border border-green-600  px-10">
                    Master Ruas
                </Link>
            </div>
            <div className="border border-emerald-500 flex flex-1 z-[1] bg-slate-200">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/master-ruas" element={<MasterRuas />} />
                </Routes>
            </div>
        </div>
    );
}

function Footer() {
    return (
        <div className="bg-black select-none text-slate-300 text-sm text-center w-full p-2">
            <div>Muhammad Ja'far Sodiq</div>
            <div>Kota Batu, 2022</div>
        </div>
    );
}

function Dashboard(props) {
    const modal_isActive = useSelector((state) => state.app.modal_isActive);
    return (
        <div className="relative flex flex-col flex-1 w-full justify-between">
            <Navbar current_user={props.current_user} />
            <div className={`absolute top-0 left-0 bg-[rgba(0,0,0,0.8)] w-full h-full z-50 py-20 flex justify-center ${modal_isActive ? "flex" : "hidden"}`}>
                <Modal />
            </div>
            <div className="p-2 flex-auto">
                <Container />
            </div>
            <Footer />
        </div>
    );
}

export default Dashboard;
