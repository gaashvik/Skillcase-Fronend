import React, { useState, useEffect } from 'react';
import DoughnutChart from '../../charts/DoughnutChart';
import { getCssVariable } from '../../utils/Utils';
import api from '../../../api/axios';
function DashboardCard05() {
  const [flashcardData, setFlashcardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchFlashcardAnalytics = async () => {
      try {
        setLoading(true);
        const response = await api.get('/admin/analytics/prev-month-test-completetion-analytics');


        const data = await response.data;
        setFlashcardData(data.slice(0, 3));
        processChartData(data.slice(0, 3));
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

  const processChartData = (flashcards) => {
    const labels = flashcards.map(f => f.set_name);
    const data = flashcards.map(f => f.count);
    
    const formattedChartData = {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: [
            getCssVariable('--color-blue-500'),
            getCssVariable('--color-sky-500'),
            getCssVariable('--color-emerald-500'),
          ],
          hoverBackgroundColor: [
            getCssVariable('--color-blue-600'),
            getCssVariable('--color-sky-600'),
            getCssVariable('--color-emerald-600'),
          ],
          borderWidth: 0,
        },
      ],
    };

    setChartData(formattedChartData);
  };

  if (loading) {
    return (
      <div className="flex flex-col col-span-full sm:col-span-6 bg-white  shadow-xs rounded-xl p-5">
        <div className="text-center text-gray-500 ">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col col-span-full sm:col-span-6 bg-white  shadow-xs rounded-xl p-5">
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white  shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 ">
        <h2 className="font-semibold text-gray-800 ">
          Top 3 Popular Flashcards
        </h2>
      </header>
      
      {chartData && (
        <>
{chartData && chartData.labels && chartData.labels.length > 0 && (
  <div className="grow flex justify-center items-center p-4">
    <DoughnutChart 
      key="flashcard-doughnut-chart"
      data={chartData} 
      width={260} 
      height={260} 
    />
  </div>
)}


          <div className="px-5 pb-5">
            <ul className="flex flex-wrap justify-center gap-4">
              {flashcardData.map((flashcard, index) => (
                <li key={flashcard.set_id} className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${
                    index === 0 ? 'bg-blue-500' :
                    index === 1 ? 'bg-sky-500' :
                    'bg-emerald-500'
                  }`}></div>
                  <div>
                <div className="text-sm font-medium text-gray-800 ">
                      {flashcard.set_name}
                    </div>
                    <div className="text-xs text-gray-500 ">
                      {flashcard.count} attempts • {parseFloat(flashcard.completion_rate).toFixed(1)}% completion
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default DashboardCard05;
