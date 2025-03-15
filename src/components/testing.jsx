import { useState } from "react";
import mediaUpload from "../pages/utils/mediaUpload.jsx";

export default function Testing() {
    const [file, setFile] = useState(null);
    function uploadFile() {
     mediaUpload(file).then((url)=>{
        console.log(url)
     } )
    }
    return (
        <div className="w-full  flex flex-col justify-center items-center  h-screen">
            <input type="file" multiple onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={uploadFile} className="w-[200px] h-[50px] bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">
                Upload
            </button>
        </div>
    );
}