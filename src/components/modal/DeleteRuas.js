import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ruasDelete, ruasGet } from "../../reducers/app_slice";

const standard_button_style = `border px-6 py-2 rounded text-sm rounded-md shadow text-white`;

function DeleteRuas() {
    const activated_modal_name = useSelector((state) => state.app.activated_modal.name);
    const activated_modal_data = useSelector((state) => state.app.activated_modal.data);
    const dispatch = useDispatch();

    const button_ya_onClick = () => {
        const id = activated_modal_data.id;
        dispatch(ruasDelete({ id: id }));
    };

    useEffect(() => {
        dispatch(ruasGet());
    });

    return (
        <div className={`bg-white w-[500px] rounded rounded-t-md p-0 ring-2 ring-white ${activated_modal_name === "DeleteRuas" ? "flex flex-col" : "hidden"}`}>
            <div className="bg-blue-600 p-2 text-white flex items-center justify-center rounded-t-md font-bold text-lg">Konfirmasi Hapus Ruas</div>
            <div className="flex flex-col gap-4 text-md p-5">Apakah anda yakin ingin menghapus ruas ini ?</div>
            <div className="flex items-end justify-end p-5 gap-2">
                <button className={`${standard_button_style} bg-red-500 hover:brightness-125 active:bg-red-600`} onClick={button_ya_onClick}>
                    Ya
                </button>
                <button className={`${standard_button_style} bg-blue-600 hover:brightness-125 active:bg-blue-700`}>Tidak</button>
            </div>
        </div>
    );
}

export default DeleteRuas;
