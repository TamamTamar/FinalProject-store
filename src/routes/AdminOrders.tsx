import { useEffect, useState } from 'react';
import { Table, Tooltip } from 'flowbite-react';
import { Link } from 'react-router-dom';
import dialogs from '../ui/dialogs';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { IOrder } from '../@Types/productType';
import { deleteOrderById, getAllOrders } from '../services/analytics-service';

const AdminOrders = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        getAllOrders()
            .then(res => {
                console.log('Response data:', res.data); // Debugging line
                if (res.data && Array.isArray(res.data.orders)) {
                    setOrders(res.data.orders);
                } else {
                    setError(new Error("Unexpected response format"));
                }
            })
            .catch(err => setError(err));
    }, []);

    const onDelete = (id: string) => {
        dialogs.confirm("Are you sure?", "Do you want to delete this order?")
            .then((result) => {
                if (result.isConfirmed) {
                    deleteOrderById(id)
                        .then(() => {
                            setOrders(orders.filter(order => order.orderId !== id));
                            dialogs.success("Deleted!", "The order has been deleted.");
                        })
                        .catch(err => setError(err));
                }
            })
            .catch(err => setError(err));
    };

    return (
        <div className="overflow-x-auto bg-white dark:border-gray-700 dark:bg-gray-800">
            <h2 className='text-5xl font-extralight text-center mb-6'>Orders</h2>
            <div className="flex justify-end mb-4">
                <Tooltip content="Add Order" placement="top" className="text-sm bg-gray-800 text-white rounded px-2 py-1">
                    <Link to="/admin/create-order" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-3 text-center inline-flex items-center me-8 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <FiPlus size={20} />
                        <span className="sr-only">Add Order</span>
                    </Link>
                </Tooltip>
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
                    {orders.map((order) => (
                        <Table.Row key={order.orderId} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell>{order.orderNumber}</Table.Cell>
                            <Table.Cell>{order.userId}</Table.Cell>
                            <Table.Cell>${order.totalAmount.toFixed(2)}</Table.Cell>
                            <Table.Cell>{order.status}</Table.Cell>
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
                                <Link to={`/admin/orders/${order.orderId}`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                    Edit
                                </Link>
                            </Table.Cell>
                            <Table.Cell>
                                <button onClick={() => onDelete(order.orderId)} className="text-red-600 hover:text-red-800">
                                    <FiTrash2 size={20} />
                                </button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
}

export default AdminOrders;
