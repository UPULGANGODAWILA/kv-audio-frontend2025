import { useState, useEffect } from "react";
import { loadCart, formatDate } from "../utils/cart";
import BookingItem from "../../components/bookingItem";
import toast from "react-hot-toast";
import axios from "axios";

export default function BookingPage() {
  const [cart, setCart] = useState(loadCart());
  const [startingDate, setStartingDate] = useState(formatDate(new Date()));
  const [endingDate, setEndingDate] = useState(
    formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000))
  );
  const [total, setTotal] = useState(0);
  const shipping = 0;

  const daysBetween = Math.max(
    (new Date(endingDate) - new Date(startingDate)) / (1000 * 60 * 60 * 24),
    1
  );

  function reloadCart() {
    setCart(loadCart());
    calculateTotal();
  }

  function calculateTotal() {
    const cartInfo = loadCart();
    cartInfo.startingDate = startingDate;
    cartInfo.endingDate = endingDate;
    cartInfo.days = daysBetween;

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/orders/quote`, cartInfo)
      .then((res) => {
        console.log(res.data);
        setTotal(res.data.total);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    calculateTotal();
  }, [startingDate, endingDate]);

  function handleBookingCreation() {
    const cart = loadCart();
    cart.startingDate = startingDate;
    cart.endingDate = endingDate;
    cart.days = daysBetween;

    const token = localStorage.getItem("token");

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, cart, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        localStorage.removeItem("cart");
        toast.success("Booking Created");
        setCart(loadCart());
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to create booking");
      });
  }

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-2xl font-bold text-accent mt-4">Create Booking</h1>

      <div className="flex flex-col lg:flex-row w-full max-w-6xl gap-8 mt-6 px-4">
        {/* Left Side - Booking Details and Items */}
        <div className="w-full lg:w-2/3">
          {/* Date Pickers */}
          <div className="flex flex-col md:flex-row gap-3">
            <label className="flex flex-col w-full">
              <span className="text-accent font-semibold">Starting Date:</span>
              <input
                type="date"
                value={startingDate}
                onChange={(e) => setStartingDate(e.target.value)}
                className="border border-secondary rounded-md p-2"
              />
            </label>
            <label className="flex flex-col w-full">
              <span className="text-accent font-semibold">Ending Date:</span>
              <input
                type="date"
                value={endingDate}
                onChange={(e) => setEndingDate(e.target.value)}
                className="border border-secondary rounded-md p-2"
              />
            </label>
          </div>
          <p className="text-accent font-medium mt-2">
            Total Days: {daysBetween}
          </p>

          {/* Items List */}
          <div className="mt-6">
            {cart.orderedItems.length === 0 ? (
              <p className="text-gray-500 text-lg">No items in cart</p>
            ) : (
              cart.orderedItems.map((item) => (
                <BookingItem
                  key={item.key}
                  itemKey={item.key}
                  qty={item.qty}
                  refresh={reloadCart}
                />
              ))
            )}
          </div>
        </div>

        {/* Right Side - Order Summary */}
        <div className="w-full lg:w-1/3 bg-gray-100 border rounded-md p-4 shadow-md h-fit">
          <h2 className="text-lg font-semibold border-b pb-2 mb-4">
            Booking Summary
          </h2>
          <div className="flex justify-between mb-2">
            <span>Products ({cart.orderedItems.length})</span>
            <span>Rs. {total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Delivery</span>
            <span>Rs. {shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold mt-2 border-t pt-2">
            <span>Total amount</span>
            <span>Rs. {(total + shipping).toFixed(2)}</span>
          </div>
          <button
            className={`mt-4 w-full py-2 rounded-md text-white ${
              cart.orderedItems.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-accent hover:bg-accent-dark"
            }`}
            onClick={handleBookingCreation}
            disabled={cart.orderedItems.length === 0}
          >
            Conform the Booking
          </button>
        </div>
      </div>
    </div>
  );
}
