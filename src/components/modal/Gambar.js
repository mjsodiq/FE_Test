import React from "react";
import { useSelector } from "react-redux";

function Gambar() {
    const activated_modal_name = useSelector((state) => state.app.activated_modal.name);
    const activated_modal_data = useSelector((state) => state.app.activated_modal.data);

    try {
        if (activated_modal_data.picture) {
        }
        const gambar_url = activated_modal_data.picture || "";

        return (
            <div className={`${activated_modal_name === "LihatGambar" ? "flex flex-col" : "hidden"}`}>
                <img src={gambar_url} alt="" />
            </div>
        );
    } catch (error) {}
}

export default Gambar;
