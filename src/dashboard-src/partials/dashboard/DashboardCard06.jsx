import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';
function DashboardCard06() {
  const [flashcardData, setFlashcardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlashcardAnalytics = async () => {
      try {
        setLoading(true);
        const response = await api.get('/admin/analytics/prev-month-test-completetion-analytics');


        const data = await response.data;
        setFlashcardData(data); // All records
        setError(null);
      } catch (err) {
        console.error('Error fetching flashcard analytics:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcardAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col col-span-full bg-white  shadow-xs rounded-xl p-5">
        <div className="text-center text-gray-500 ">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col col-span-full bg-white  shadow-xs rounded-xl p-5">
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col col-span-full bg-white  shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 ">
        <h2 className="font-semibold text-gray-800 ">
          All Flashcard Performance
        </h2>
        <div className="text-sm text-gray-500  mt-1">
          {flashcardData.length} flashcard sets
        </div>
      </header>
      <div className="p-3">
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="text-xs font-semibold uppercase text-gray-500  bg-gray-50  border-t border-b border-gray-200 ">
              <tr>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap text-left">
                  <div className="font-semibold">Rank</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap text-left">
                  <div className="font-semibold">Flashcard Name</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap text-left">
                  <div className="font-semibold">Set ID</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap text-right">
                  <div className="font-semibold">Total Attempts</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap text-right">
                  <div className="font-semibold">Completion Rate</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-200 ">
              {flashcardData.map((flashcard, index) => (
                <tr key={flashcard.set_id} className="hover:bg-gray-50 ">
                  <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                        index === 0 ? 'bg-blue-500 text-white' :
                        index === 1 ? 'bg-blue-400 text-white' :
                        index === 2 ? 'bg-blue-300 text-white' :
                        'bg-gray-200  text-gray-600 '
                      }`}>
                        {index + 1}
                      </div>
                    </div>
                  </td>
                  <td className="px-2 first:pl-5 last:pr-5 py-3">
                    <div className="font-medium text-gray-800 ">
                      {flashcard.set_name}
                    </div>
                  </td>
                  <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="text-gray-600 ">
                      {flashcard.set_id}
                    </div>
                  </td>
                  <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap text-right">
                    <div className="inline-flex items-center gap-2">
                      <div className="font-medium text-gray-800 ">
                        {flashcard.count}
                      </div>
                      <div className="h-2 bg-gray-200  rounded-full overflow-hidden" style={{ width: '60px' }}>
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${Math.min(100, (flashcard.count / Math.max(...flashcardData.map(f => f.count))) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap text-right">
                    <div className="inline-flex items-center gap-2">
                      <div className="font-medium text-gray-800 ">
                        {parseFloat(flashcard.completion_rate).toFixed(1)}%
                      </div>
                      <div className="h-2 bg-gray-200  rounded-full overflow-hidden" style={{ width: '60px' }}>
                        <div 
                          className="h-full bg-sky-500 rounded-full"
                          style={{ width: `${flashcard.completion_rate}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard06;
