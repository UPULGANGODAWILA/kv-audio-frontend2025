import { useState } from "react";
import { loadCart } from "../utils/cart"
import BookingItem from "../../components/bookingItem";
import Items from "./items";


export default function BookingPage() {
    const [cart,setCart ]= useState(loadCart());
      console.log(cart);
    function reloadCart() {
        
        setCart(loadCart());
    }
    return (
        
        <div className="w-full h-full flex  flex-col items-center">
            <h1>Crate Booking</h1>
            <div className="w-full flex flex-col items-center">
            {
                cart.orderedItems.map((item)=>{
                    return<BookingItem itemKey={item.key} qty={item.quantity} refresh={reloadCart} /> 
                    
                })
            }
            </div>
        </div>
    )
}
