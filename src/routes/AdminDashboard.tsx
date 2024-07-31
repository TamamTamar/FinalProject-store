import { Tabs } from "flowbite-react";
import { FiBox, FiUsers, FiClipboard, FiTrendingUp } from "react-icons/fi";
import AdminProducts from "./AdminProducts";
import Users from "./Users";
import AdminOrders from "./AdminOrders";
import SalesChart from "./SalesByDate";
import './AdminDashboard.scss';
import AdminMessages from "./AdminMessage";
import { useEffect } from "react";

const AdminDashboard = () => {
    useEffect(() => {
        document.title = 'Admin Dashboard'
    }, [])
    return (
        <Tabs aria-label="Tabs with icons" className="tabs">
            <Tabs.Item active title="Manage Products" icon={FiBox} className="tabs-item">
                <AdminProducts />
            </Tabs.Item>
            <Tabs.Item title="Manage Users" icon={FiUsers} className="tabs-item">
                <Users />
            </Tabs.Item>
            <Tabs.Item title="Manage Orders" icon={FiClipboard} className="tabs-item">
                <AdminOrders />
            </Tabs.Item>
            <Tabs.Item title="Analytics" icon={FiTrendingUp} className="tabs-item">
                <SalesChart />
            </Tabs.Item>
            <Tabs.Item title="Leads" icon={FiTrendingUp} className="tabs-item">
                <AdminMessages />
            </Tabs.Item>
        </Tabs>
    );
};

export default AdminDashboard;

