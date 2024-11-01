import { Table } from 'flowbite-react';
import { MouseEvent, useEffect, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { IOrder } from '../@Types/productType';
import { useSearch } from '../hooks/useSearch';
import { getAllOrders, updateOrderStatus } from '../services/analytics-service';
import dialogs from '../ui/dialogs';

const statusOptions = [
    "pending", "approved", "processing", "shipped", "delivered", "returned", "completed", "cancelled"
];

const AdminOrders = () => {
    const { searchTerm, setSearchTerm } = useSearch();
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<IOrder[]>([]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        getAllOrders()
            .then(res => {
                if (res.data && Array.isArray(res.data.orders)) {
                    setOrders(res.data.orders);
                    setFilteredOrders(res.data.orders);
                } else {
                    setError(new Error("Unexpected response format"));
                }
            })
            .catch(err => setError(err));
    }, []);

    useEffect(() => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        setFilteredOrders(
            orders.filter(order =>
                order.orderNumber.toLowerCase().includes(lowercasedSearchTerm)
            )
        );
    }, [searchTerm, orders]);

    const handleStatusChange = (orderId: string, status: string) => {
        updateOrderStatus(orderId, status)
            .then(() => {
                setOrders(orders.map(order =>
                    order.orderId === orderId ? { ...order, status } : order
                ));
                dialogs.success("Success", "Order status updated successfully.");
            })
            .catch(err => setError(err));
    };

    const handleCancelOrder = async (event: MouseEvent<HTMLButtonElement>, orderId: string) => {
        event.preventDefault();
        const result = await dialogs.confirm("Cancel Order", "Are you sure you want to cancel the order?");
        if (result.isConfirmed) {
            try {
                await updateOrderStatus(orderId, "cancelled");
                setOrders(orders.map(order =>
                    order.orderId === orderId ? { ...order, status: "cancelled" } : order
                ));
                dialogs.success("Order Cancelled", "Your order has been cancelled successfully.");
            } catch (error) {
                console.error('Error cancelling order:', error);
                dialogs.error("Error", "Failed to cancel the order.");
            }
        }
    };

    return (
        <div className="overflow-x-auto bg-white dark:border-gray-700 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className='text-4xl text-gray-800 mb-8 text-center mt-2'>Orders</h2>
            {error && <div className="text-red-500 text-center mb-4">{error.message}</div>}

            <Table hoverable className='"overflow-x-auto'>
                <Table.Head>
                    <Table.HeadCell>Order Number</Table.HeadCell>
                    <Table.HeadCell>User Name</Table.HeadCell> {/* עדכון לעמודת שם המשתמש */}
                    <Table.HeadCell>Total Amount</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell>
                    <Table.HeadCell>Created At</Table.HeadCell>
                    <Table.HeadCell>Products</Table.HeadCell>
                    <Table.HeadCell>Action</Table.HeadCell> {/* הוספתי את עמודת הפעולה */}
                </Table.Head>
                <Table.Body className="divide-y">
                    {filteredOrders.map((order) => (
                        <Table.Row key={order.orderId} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell>{order.orderNumber}</Table.Cell>
                            <Table.Cell>{order.userName}</Table.Cell> {/* עדכון לשם המשתמש */}
                            <Table.Cell>${order.totalAmount.toFixed(2)}</Table.Cell>
                            <Table.Cell>
                                <select
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                                    className="border rounded px-2 py-1"
                                    disabled={order.status === "cancelled"} // הפיכת השדה ללא זמין אם הסטטוס מבוטל
                                >
                                    {statusOptions.map(status => (
                                        <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                                    ))}
                                </select>
                            </Table.Cell>
                            <Table.Cell>{new Date(order.createdAt).toLocaleDateString()}</Table.Cell>
                            <Table.Cell className="whitespace-nowrap w-1/3"> {/* הוספתי מחלקת w-1/3 להרחבת העמודה */}
                                <div className="flex flex-wrap space-x-2">
                                    {order.products.map((product, index) => (
                                        <div key={index} className="bg-gray-100 dark:bg-gray-700 p-2 rounded mb-2">
                                            <p className="text-sm">Title: {product.title}</p>
                                            <p className="text-sm">Size: {product.size}</p>
                                            <p className="text-sm">Quantity: {product.quantity}</p>
                                            <p className="text-sm">Price: ${product.price}</p>
                                        </div>
                                    ))}
                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                {order.status === "cancelled" ? (
                                    <span className="text-gray-500">Cancelled</span>
                                ) : (
                                    <button
                                        onClick={(event) => handleCancelOrder(event, order.orderId)}
                                        className="text-red-600 hover:text-red-800"
                                        title="Cancel Order"
                                    >
                                        <FiTrash2 size={20} />
                                    </button>
                                )}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
}

export default AdminOrders;
