import React from "react";
import ImageGalery from "./ImageGalery";
import Tabel from "./Tabel";

function Home() {
    return (
        <div className="p-14 pt-5 flex flex-col gap-5 flex-1">
            <div>Home</div>
            <div className=" h-56 flex justify-between gap-16">
                <div className="border border-green-600 flex-1 flex items-center justify-center p-2">Grafik</div>
                <div className="border border-green-600 flex-1 flex items-center justify-center p-2">Bar Chart</div>
                <div className="border border-green-600 flex-1 flex items-center justify-center p-2">Line Chart</div>
            </div>
            <div className=" h-40 flex flex-col gap-2 max-w-7xl self-center">
                <div className="">Image Galery</div>
                <ImageGalery />
            </div>
            <div className="flex-auto min-h-[250px] mt-10">
                <Tabel />
            </div>
        </div>
    );
}

export default Home;
