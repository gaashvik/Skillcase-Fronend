import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EditMenu from '../../components/DropdownEditMenu';
import api from '../../../api/axios';
function DashboardCard03() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        setLoading(true);
        const response = await api.get('/admin/analytics/user-count');


        const data = await response.data;
        setTotalUsers(data.count);
        setError(null);
      } catch (err) {
        console.error('Error fetching total users:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white  shadow-xs rounded-xl p-5">
        <div className="text-center text-gray-500 ">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white  shadow-xs rounded-xl p-5">
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white  shadow-xs rounded-xl">
      <div className="px-5 pt-5 pb-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800  mb-2">
            Total Users
          </h2>
          {/* Menu button */}
          <EditMenu align="right" className="relative inline-flex">
            <li>
              <Link className="font-medium text-sm text-gray-600  hover:text-gray-800  flex py-1 px-3" to="#0">
                Refresh
              </Link>
            </li>
            <li>
              <Link className="font-medium text-sm text-gray-600  hover:text-gray-800  flex py-1 px-3" to="#0">
                View All Users
              </Link>
            </li>
            <li>
              <Link className="font-medium text-sm text-red-500 hover:text-red-600 flex py-1 px-3" to="#0">
                Remove
              </Link>
            </li>
          </EditMenu>
        </header>
        <div className="text-xs font-semibold text-gray-400  uppercase mb-1">
          All Time
        </div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800  mr-2">
            {totalUsers.toLocaleString()}
          </div>
        </div>
        
        {/* Icon/Visual Element */}
        <div className="mt-4 flex items-center justify-center py-6">
          <div className="w-20 h-20 rounded-full bg-blue-100  flex items-center justify-center">
            <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard03;
