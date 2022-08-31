import React from "react";
import { useSelector } from "react-redux";

function ImageGalery() {
    const data = useSelector((state) => state.app.dataRuas);
    const image_list = data.map((image) => {
        return {
            thumbnail: image.picture,
            thumbnailHeight: 400,
            thumbnailWidth: 500,
        };
    });
    return (
        <div className="flex items-center">
            <div className="flex items-center justify-center border border-slate-300 rounded-full mr-2 h-[30px] w-[30px]">{"<"}</div>
            <div className="flex gap-10 overflow-clip flex-1">
                {image_list.map((image, id) => (
                    <img key={id} src={image.thumbnail} alt="" width={200} height={175} className={`border rounded`} />
                ))}
            </div>
            <div className="flex items-center justify-center border border-slate-300 rounded-full ml-2 h-[30px] w-[30px]">{">"}</div>
        </div>
    );
}

export default ImageGalery;
