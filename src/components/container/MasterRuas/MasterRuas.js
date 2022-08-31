import React from "react";
import { useDispatch } from "react-redux";
import { activated_modal_changed, modal_changeState } from "../../../reducers/app_slice";
import Tabel from "./Table";

function MasterRuas() {
    const dispatch = useDispatch();
    const tambah_ruas_onClick = () => {
        dispatch(modal_changeState());
        dispatch(activated_modal_changed({ currentActiveModal: "TambahRuas" }));
    };
    return (
        <div className="p-14 pt-5 flex flex-1 flex-col gap-5">
            <div>Daftar Ruas</div>
            <div className="flex gap-2 flex-col flex-1">
                <div className=" border bg-green-600 hover:bg-green-500 active:bg-green-700 ring-1 ring-white rounded py-1 px-5 max-w-[150px] text-sm text-white flex items-center justify-center select-none cursor-pointer" onClick={tambah_ruas_onClick}>
                    Tambah Data
                </div>
                <div className=" min-h-[320px] flex-1 ">
                    <Tabel />
                </div>
            </div>
        </div>
    );
}

export default MasterRuas;
