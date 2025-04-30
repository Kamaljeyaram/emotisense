import React, { useEffect, useRef, useMemo } from 'react';
import Chart from 'chart.js/auto';

const EmotionPieChart = ({ data = [25, 15, 10, 40, 10] }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  
  const emotions = useMemo(() => ['Happy', 'Sad', 'Angry', 'Neutral', 'Surprised'], []);
  const colors = useMemo(() => [
    'rgb(76, 175, 80)',   // Happy - Green
    'rgb(33, 150, 243)',   // Sad - Blue
    'rgb(244, 67, 54)',    // Angry - Red
    'rgb(158, 158, 158)',  // Neutral - Grey
    'rgb(255, 193, 7)'     // Surprised - Yellow
  ], []);

  useEffect(() => {
    // Cleanup previous chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Skip if canvas doesn't exist
    if (!chartRef.current) {
      console.warn('Chart canvas not found');
      return;
    }

    try {
      const ctx = chartRef.current.getContext('2d');
      
      chartInstance.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: emotions,
          datasets: [
            {
              data,
              backgroundColor: colors,
              borderColor: '#ffffff',
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 20,
                usePointStyle: true,
                pointStyle: 'circle',
                font: {
                  size: 12
                }
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              padding: 10,
              titleFont: {
                size: 14
              },
              bodyFont: {
                size: 13
              },
              displayColors: true,
              callbacks: {
                label: function(context) {
                  return `${context.label}: ${context.raw}%`;
                }
              }
            }
          },
          animation: {
            animateScale: true,
            animateRotate: true,
            duration: 800
          }
        },
      });
    } catch (err) {
      console.error('Error creating pie chart:', err);
    }
    
    // Cleanup on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, colors, emotions]);

  return (
    <div className="h-full w-full">
      <canvas ref={chartRef} />
    </div>
  );
};

export default EmotionPieChart;