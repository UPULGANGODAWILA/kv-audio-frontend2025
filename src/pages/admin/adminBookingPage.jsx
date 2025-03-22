import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeOrder, setActiveOrder] = useState(null);
    const [modalOpened, setModalOpened] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/orders/`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setOrders(res.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };
        if (loading) {
            fetchOrders();
        }
    }, [loading]);

    function handleOrderStatusChange(orderId, status) {
        const token = localStorage.getItem("token");
        axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/api/orders/status/${orderId}`,
            { status },
            { headers: { Authorization: `Bearer ${token}` } }
        ).then(() => {
            setModalOpened(false);
            setLoading(true);
        }).catch((err) => {
            console.error(err);
            setLoading(true);
        });
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Orders</h1>
            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : (
                <div className="overflow-x-auto shadow-lg rounded-lg bg-white p-4">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-200">
                            <tr>
                                {['Order ID', 'Email', 'Days', 'Start Date', 'End Date', 'Total', 'Status', 'Order Date'].map((head) => (
                                    <th key={head} className="px-4 py-2 font-semibold text-gray-700">{head}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id} className="border-t hover:bg-gray-100 cursor-pointer" onClick={() => { setActiveOrder(order); setModalOpened(true); }}>
                                    <td className="px-4 py-2">{order.orderId}</td>
                                    <td className="px-4 py-2">{order.email}</td>
                                    <td className="px-4 py-2">{order.days}</td>
                                    <td className="px-4 py-2">{new Date(order.startingDate).toLocaleDateString()}</td>
                                    <td className="px-4 py-2">{new Date(order.endingDate).toLocaleDateString()}</td>
                                    <td className="px-4 py-2">${order.totalAmount.toFixed(2)}</td>
                                    <td className="px-4 py-2 font-semibold text-blue-600">{order.status}</td>
                                    <td className="px-4 py-2">{new Date(order.orderDate).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {modalOpened && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative">
                        <IoMdCloseCircleOutline className="absolute top-3 right-3 text-2xl text-gray-600 cursor-pointer hover:text-red-500" onClick={() => setModalOpened(false)} />
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Order Details</h2>
                        <div className="text-gray-600">
                            <p><span className="font-semibold">Order ID:</span> {activeOrder.orderId}</p>
                            <p><span className="font-semibold">Email:</span> {activeOrder.email}</p>
                            <p><span className="font-semibold">Total Amount:</span> ${activeOrder.totalAmount.toFixed(2)}</p>
                            <p><span className="font-semibold">Status:</span> <span className="text-blue-600">{activeOrder.status}</span></p>
                        </div>
                        <div className="mt-5 flex justify-center gap-4">
                            <button onClick={() => handleOrderStatusChange(activeOrder.orderId, "approved")} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Approve</button>
                            <button onClick={() => handleOrderStatusChange(activeOrder.orderId, "Rejected")} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Reject</button>
                        </div>
                        <table className="w-full mt-4 border-t pt-4">
                            <thead>
                                <tr className="text-gray-700 font-semibold">
                                    <th>Image</th>
                                    <th>Product</th>
                                    <th>Qty</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activeOrder.orderedItems.map((item) => (
                                    <tr key={item.product.key} className="text-gray-600 border-t">
                                        <td><img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-cover rounded-md" /></td>
                                        <td>{item.product.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>${item.product.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
