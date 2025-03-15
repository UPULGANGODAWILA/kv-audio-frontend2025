import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import ImageSlider from "../../components/imageSlider";

export default function ProductOverview() {
    const params = useParams();
    console.log(params);
    const key = params.key;
    const [loadingStatus, setLoadingStatus] = useState("loading");
    const [product, setProduct] = useState({});

    useEffect (() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${key}`).then((res) => {
            setProduct(res.data);
            setLoadingStatus("loaded");
            console.log(res.data);

        }).catch((err) => {
            console.error(err);
			setLoadingStatus("error");
        })
    }, [])
    return (
        <div className="w-full h-full flex justify-center ">
         
         {
            loadingStatus == "loading" && (
            <div className="w-full h-full  flex justify-center items-center">
                <div className="w-[70px] h-[70px] border-4 rounded-full border-t-green-500 animate-spin">

                </div>
            </div>
         )}
        {
            loadingStatus == "loaded" && ( 
             <div className="w-full h-full flex justify-center items-center">
                 <div className="w-[49%] h-full">
                    <ImageSlider images={product.image} />  
                 </div>
                <div className="w-[49%] h-full flex flex-col items-center">
                <h1 className="hidden md:block text-3xl font-bold text-accent">{product.name}</h1>
						<h2 className="text-xl font-semibold text-gray-800">
							{product.category} category
						</h2>
						<p className="text-gray-700 mt-4 text-center">{product.description}</p>
						<p className="text-lg  text-green-500">Rs. {product.price.toFixed(2)}</p>
						<div className="mt-4 text-sm text-gray-600">
							<span className="font-medium">Dimensions:</span>{" "}
							{product.dimensions}
						</div>
                </div>

               


            </div>

       )}
       {loadingStatus == "error" && (
				<div className="w-full h-full flex justify-center items-center">
					<h1 className="text-3xl font-bold text-accent">Error Occured</h1>
				</div>
			)}

        </div>
    );
}