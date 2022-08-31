import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modal_changeState, ruasCreate } from "../../reducers/app_slice";

const standard_input_style = ` outline-none border border-slate-50 p-2 py-3 flex-1 text-sm shadow focus:shadow-slate-400 focus:border-slate-200`;
const standard_select_style = `p-2 py-3 text-sm outline-none rounded`;
const standard_button_style = `border px-6 py-2 rounded text-sm rounded-md shadow text-white`;

function TambahRuas() {
    const dispatch = useDispatch();
    const modal_isActive = useSelector((state) => state.app.modal_isActive);
    const activated_modal_name = useSelector((state) => state.app.activated_modal.name);
    const dataRuas = useSelector((state) => state.app.dataRuas);
    const unit_list = [...new Set(dataRuas.map((data) => data.unit))];

    const [unitKerja, setUnitKerja] = useState(unit_list[0]);
    const [ruas, setRuas] = useState("");
    const [inputGambarFile, setInputGambarFile] = useState("");
    const tanggalRef = useRef();
    const statusRef = useRef();

    const gambar_input_ref = useRef();
    const unit_kerja_ref = useRef();
    const file_gambar_open_onClick = (event) => {
        gambar_input_ref.current.click();
    };

    const batalkan_onClick = () => {
        dispatch(modal_changeState());
    };

    const simpan_onClick = () => {
        const data = {
            ruas,
            unit: unitKerja,
            picture: inputGambarFile,
            date_create: tanggalRef.current.value,
            status: statusRef.current.value,
        };
        dispatch(ruasCreate(data));
    };

    useEffect(() => {
        if (!modal_isActive) {
            setUnitKerja(unit_list[0]);
            setRuas("");
            setInputGambarFile("");
            tanggalRef.current.value = "";
            statusRef.current.value = "";
        }
    }, [modal_isActive]);

    return (
        <div className={`bg-white w-[500px] rounded rounded-t-md p-0 ring-2 ring-white ${activated_modal_name === "TambahRuas" ? "flex flex-col" : "hidden"}`}>
            <div className="bg-blue-600 p-3 text-white flex items-center justify-center rounded-t-md font-bold text-lg">TAMBAH RUAS</div>
            <div className="flex flex-col gap-4 text-sm p-7">
                {/* UNIT KERJA */}
                <label htmlFor="unit_kerja" className="flex flex-col gap-1">
                    Unit Kerja
                    <select
                        ref={unit_kerja_ref}
                        value={unitKerja}
                        name="unit_kerja"
                        id="unit_kerja"
                        className={`${standard_select_style}`}
                        onChange={(e) => {
                            setUnitKerja(e.target.value);
                        }}>
                        {unit_list.map((unit, id) => (
                            <option value={`${unit}`} key={id} id={id}>
                                {unit}
                            </option>
                        ))}
                    </select>
                </label>

                {/* RUAS */}
                <label htmlFor="ru/*  */as" className="flex flex-col gap-1">
                    Ruas
                    <input
                        type="text"
                        id="ruas"
                        className={`${standard_input_style}`}
                        placeholder="Masukkan Nama Ruas"
                        value={ruas}
                        onChange={(e) => {
                            setRuas(e.target.value);
                        }}
                    />
                </label>

                {/* GAMBAR */}
                <label htmlFor="gambar" className="flex flex-col gap-1">
                    Gambar
                    <div className="flex flex-1 gap-1">
                        <input
                            type="text"
                            id="gambar"
                            className={`${standard_input_style}`}
                            placeholder="Pilih Gambar"
                            value={inputGambarFile}
                            onChange={(e) => {
                                setInputGambarFile(e.target.value);
                            }}
                        />
                        <input
                            ref={gambar_input_ref}
                            type="file"
                            id="file"
                            style={{ display: "none" }}
                            onChange={(e) => {
                                setInputGambarFile(e.target.value);
                            }}
                        />
                        <button className=" ring-1 ring-slate-300 rounded px-5 py-1 text-sm bg-slate-300 hover:bg-slate-200 active:bg-slate-400 text-black" onClick={file_gambar_open_onClick}>
                            File Gambar
                        </button>
                    </div>
                </label>

                {/* TANGGAL */}
                <label htmlFor="tanggal" className="flex flex-col gap-1">
                    Tanggal
                    <input ref={tanggalRef} type="date" id="tanggal" className={`${standard_input_style}`} placeholder="Pilih Tanggal" />
                </label>

                {/* STATUS */}
                <label htmlFor="status" className="flex flex-col gap-1">
                    Status
                    <select ref={statusRef} className={`${standard_select_style}`}>
                        <option value="aktif">Aktif</option>
                        <option value="nonaktif">Nonaktif</option>
                    </select>
                </label>
            </div>
            <div className="flex items-end justify-end p-7 gap-2">
                <button className={`${standard_button_style} bg-red-500 hover:brightness-125 active:bg-red-600`} onClick={batalkan_onClick}>
                    Batal
                </button>
                <button className={`${standard_button_style} bg-blue-600 hover:brightness-125 active:bg-blue-700`} onClick={simpan_onClick}>
                    Simpan
                </button>
            </div>
        </div>
    );
}

export default TambahRuas;
