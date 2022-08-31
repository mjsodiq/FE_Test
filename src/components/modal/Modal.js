import React from "react";
import { useDispatch } from "react-redux";
import { modal_changeState } from "../../reducers/app_slice";
import DeleteRuas from "./DeleteRuas";
import DetailRuas from "./DetailRuas";
import EditRuas from "./EditRuas";
import Gambar from "./Gambar";
import TambahRuas from "./TambahRuas";

function Modal() {
    const dispatch = useDispatch();

    const close_button_onClick = () => {
        dispatch(modal_changeState());
    };
    return (
        <div className="relative flex items-center justify-start flex-col">
            <div className="ring-white ring-2 bg-red-500 hover:bg-red-400 active:bg-red-600 w-6 h-6 text-white rounded-full flex items-center justify-center p-1 absolute -top-1 -right-1 select-none cursor-pointer" onClick={close_button_onClick}>
                ✘
            </div>
            <TambahRuas />
            <DetailRuas />
            <DeleteRuas />
            <EditRuas />
            <Gambar />
        </div>
    );
}

export default Modal;
