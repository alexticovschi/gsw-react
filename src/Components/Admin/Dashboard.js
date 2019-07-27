import React from 'react';
import AdminLayout from '../../HOC/AdminLayout';

import './admin-dashboard.css';

const Dashboard = () => {
    return (
        <AdminLayout>
            <div className="user_dashboard">
                <div>
                    Dashboard
                </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;