import { Table, Tooltip } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { IOrder } from '../@Types/productType';
import { getAllOrders, updateOrderStatus } from '../services/analytics-service';
import dialogs from '../ui/dialogs';
import { useSearch } from '../hooks/useSearch';


const statusOptions = [
    "pending", "approved", "processing", "shipped", "delivered", "cancelled", "returned", "completed"
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

    return (
        <div className="overflow-x-auto bg-white dark:border-gray-700 dark:bg-gray-800">
            <h2 className='text-5xl font-extralight text-center mb-6'>Orders</h2>
            <div className="flex flex-col mb-4">
                <div className="flex justify-end mb-4">
                    <Tooltip content="Add Order" placement="top" className="text-sm bg-gray-800 text-white rounded px-2 py-1">
                        <Link to="/admin/create-order" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-3 text-center inline-flex items-center me-8 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <FiPlus size={20} />
                            <span className="sr-only">Add Order</span>
                        </Link>
                    </Tooltip>
                </div>
                <input
                    type="text"
                    placeholder="Search by Order Number"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border rounded px-2 py-1 mb-4"
                />
            </div>
            {error && <div className="text-red-500 text-center mb-4">{error.message}</div>}
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>Order Number</Table.HeadCell>
                    <Table.HeadCell>User ID</Table.HeadCell>
                    <Table.HeadCell>Total Amount</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell>
                    <Table.HeadCell>Created At</Table.HeadCell>
                    <Table.HeadCell>Products</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Delete</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {filteredOrders.map((order) => (
                        <Table.Row key={order.orderId} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell>{order.orderNumber}</Table.Cell>
                            <Table.Cell>{order.userId}</Table.Cell>
                            <Table.Cell>${order.totalAmount.toFixed(2)}</Table.Cell>
                            <Table.Cell>
                                <select
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                                    className="border rounded px-2 py-1"
                                >
                                    {statusOptions.map(status => (
                                        <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                                    ))}
                                </select>
                            </Table.Cell>
                            <Table.Cell>{new Date(order.createdAt).toLocaleDateString()}</Table.Cell>
                            <Table.Cell>
                                {order.products.map((product, index) => (
                                    <div key={index}>
                                        <p>Title: {product.title}</p>
                                        <p>Size: {product.size}</p>
                                        <p>Quantity: {product.quantity}</p>
                                        <p>Price: ${product.price}</p>
                                        {index < order.products.length - 1 && <hr className="my-2" />}
                                    </div>
                                ))}
                            </Table.Cell>
                            <Table.Cell>
                                {/* Actions for editing */}
                            </Table.Cell>
                            <Table.Cell>
                                {/* Actions for deleting */}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
}

export default AdminOrders;
