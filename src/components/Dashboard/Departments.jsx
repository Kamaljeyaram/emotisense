import { useState, useEffect } from 'react';
import { School, Computer, Settings, Build, Memory, DataObject, ElectricalServices, BatteryChargingFull, TipsAndUpdates } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Typography, Card, CardContent, Chip } from '@mui/material';
import Navbar from '../common/Navbar';
import Loading from '../common/Loading';

const Departments = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const departments = [
    { 
      id: 'cse', 
      name: 'Computer Science', 
      icon: Computer,
      color: 'bg-blue-50 text-blue-600',
      gradient: 'from-blue-500 to-blue-600',
      students: 254,
      insights: 'High engagement in AI classes'
    },
    { 
      id: 'aids', 
      name: 'AI & Data Science', 
      icon: Memory,
      color: 'bg-indigo-50 text-indigo-600',
      gradient: 'from-indigo-500 to-indigo-600',
      students: 178,
      insights: 'Strong performance in practical sessions'
    },
    { 
      id: 'it', 
      name: 'Information Technology', 
      icon: DataObject,
      color: 'bg-cyan-50 text-cyan-600',
      gradient: 'from-cyan-500 to-cyan-600',
      students: 202,
      insights: 'Growing interest in cloud computing'
    },
    { 
      id: 'iot', 
      name: 'Internet of Things', 
      icon: Settings,
      color: 'bg-teal-50 text-teal-600',
      gradient: 'from-teal-500 to-teal-600',
      students: 165,
      insights: 'Excellent lab engagement metrics'
    },
    { 
      id: 'ece', 
      name: 'Electronics', 
      icon: ElectricalServices,
      color: 'bg-purple-50 text-purple-600',
      gradient: 'from-purple-500 to-purple-600',
      students: 189,
      insights: 'Improved focus in lab sessions'
    },
    { 
      id: 'eie', 
      name: 'Instrumentation', 
      icon: Settings,
      color: 'bg-rose-50 text-rose-600',
      gradient: 'from-rose-500 to-rose-600',
      students: 152,
      insights: 'Higher engagement in practical courses'
    },
    { 
      id: 'eee', 
      name: 'Electrical', 
      icon: BatteryChargingFull,
      color: 'bg-amber-50 text-amber-600',
      gradient: 'from-amber-500 to-amber-600',
      students: 183,
      insights: 'Need more interactive learning tools'
    },
    { 
      id: 'mech', 
      name: 'Mechanical', 
      icon: Build,
      color: 'bg-orange-50 text-orange-600',
      gradient: 'from-orange-500 to-orange-600',
      students: 212,
      insights: 'Needs attention in theory classes'
    },
    { 
      id: 'civil', 
      name: 'Civil', 
      icon: School,
      color: 'bg-green-50 text-green-600',
      gradient: 'from-green-500 to-green-600',
      students: 178,
      insights: 'Consistent engagement patterns'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loading size="lg" text="Loading departments..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar 
        title="EmoSense" 
        subtitle="Department Analytics" 
      />
      
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Welcome Banner */}
        <div className="mb-8 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-2xl shadow-elevation-3 overflow-hidden relative">
          <div className="absolute inset-0 opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
              <path fill="#ffffff" d="M14 16H9v-2h5V9h2v5h5v2h-5v5h-2v-5zm-5.5
              39.5v-2h13v2h-13zm16-17v-2h13v2h-13zm-16 0v-2h13v2h-13zm32 
              17v-2h13v2h-13zm-16-17v-2h13v2h-13z"></path>
            </svg>
          </div>
          
          <div className="p-6 sm:p-8 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Typography 
                  variant="h4" 
                  component="h1" 
                  className="font-bold text-white mb-2"
                >
                  Academic Departments
                </Typography>
                <Typography variant="body1" className="text-primary-100 max-w-xl">
                  Select a department to view classroom emotion analytics and engagement metrics across different sections.
                </Typography>
              </div>
              
              <div className="mt-4 sm:mt-0 flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-white">
                <span className="text-sm font-medium">Total Students</span>
                <span className="text-lg font-bold">{departments.reduce((acc, dept) => acc + dept.students, 0)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 sm:gap-6">
          {departments.map((dept) => {
            const Icon = dept.icon;
            return (
              <Card 
                key={dept.id}
                onClick={() => navigate(`/departments/${dept.id}/sections`)}
                className="rounded-2xl shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer backdrop-blur-sm bg-white/90 border border-gray-100/50"
              >
                <div className={`bg-gradient-to-r ${dept.gradient} p-6 relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-24 h-24 -mt-8 -mr-8 rounded-full bg-white/10"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 -mb-8 -ml-8 rounded-full bg-white/10"></div>
                  
                  <Icon className="text-white text-4xl mb-2 drop-shadow-md" />
                  <Typography variant="h6" className="text-white font-bold relative z-10">
                    {dept.name}
                  </Typography>
                  <div className="mt-2 flex items-center text-white/80">
                    <span className="text-sm">Department</span>
                    <span className="w-1 h-1 mx-2 bg-white/60 rounded-full"></span>
                    <span className="text-sm font-medium">{dept.id.toUpperCase()}</span>
                  </div>
                </div>
                
                <CardContent className="p-5">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <Typography variant="body2" className="text-gray-500 mb-1">
                        Total Students
                      </Typography>
                      <Typography variant="h6" className="font-bold text-gray-800">
                        {dept.students}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="body2" className="text-gray-500 mb-1">
                        Sections
                      </Typography>
                      <Typography variant="h6" className="font-bold text-gray-800">
                        4
                      </Typography>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <TipsAndUpdates fontSize="small" className="text-amber-500" />
                    <Typography variant="body2" className="text-gray-600">
                      {dept.insights}
                    </Typography>
                  </div>
                  
                  <button className="w-full py-2.5 px-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow-md">
                    View Sections
                  </button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Departments;