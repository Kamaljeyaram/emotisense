import { useState, useEffect } from 'react';
import { 
  Groups, TrendingUp, CalendarMonth, Timer, Analytics, School, 
  InsertEmoticon, SentimentSatisfied, SentimentDissatisfied, SentimentNeutral,
  Coffee, Restaurant, AccessTime
} from '@mui/icons-material';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Typography, Card, CardContent, Chip, Tooltip } from '@mui/material';
import Navbar from '../common/Navbar';
import Loading from '../common/Loading';

const Sections = () => {
  const navigate = useNavigate();
  const { deptId } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Class schedule configuration
  const schedule = [
    { type: 'period', number: 1, start: '09:00', end: '09:45', current: false },
    { type: 'period', number: 2, start: '09:45', end: '10:30', current: false },
    { type: 'break', name: 'Morning Break', start: '10:30', end: '10:45', icon: <Coffee fontSize="small" /> },
    { type: 'period', number: 3, start: '10:45', end: '11:30', current: false },
    { type: 'period', number: 4, start: '11:30', end: '12:15', current: true },
    { type: 'break', name: 'Lunch', start: '12:15', end: '13:15', icon: <Restaurant fontSize="small" /> },
    { type: 'period', number: 5, start: '13:15', end: '14:00', current: false },
    { type: 'period', number: 6, start: '14:00', end: '14:45', current: false },
    { type: 'break', name: 'Afternoon Break', start: '14:45', end: '15:00', icon: <Coffee fontSize="small" /> },
    { type: 'period', number: 7, start: '15:00', end: '15:45', current: false },
    { type: 'period', number: 8, start: '15:45', end: '16:00', current: false },
  ];
  
  // Function to check if a period is current based on actual time
  const updateCurrentPeriod = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes; // Convert to minutes since midnight

    return schedule.map(slot => {
      const [startHour, startMin] = slot.start.split(':').map(Number);
      const [endHour, endMin] = slot.end.split(':').map(Number);
      
      const slotStartTime = startHour * 60 + startMin;
      const slotEndTime = endHour * 60 + endMin;
      
      return {
        ...slot,
        current: currentTime >= slotStartTime && currentTime < slotEndTime,
        past: currentTime > slotEndTime,
        upcoming: currentTime < slotStartTime
      };
    });
  };

  const [dailySchedule, setDailySchedule] = useState(updateCurrentPeriod);

  useEffect(() => {
    // Update the current period every minute
    const intervalId = setInterval(() => {
      setDailySchedule(updateCurrentPeriod());
    }, 60000);
    
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Log navigation information for debugging
    console.log('Sections component mounted', { deptId, path: location.pathname });
    
    // Safety check for invalid deptId
    if (!deptId) {
      console.error('Missing department ID');
      setError('Invalid department. Redirecting to departments page...');
      // Redirect after a short delay
      const redirectTimer = setTimeout(() => {
        navigate('/departments');
      }, 2000);
      return () => clearTimeout(redirectTimer);
    }

    // Simulate loading with error handling
    try {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    } catch (err) {
      console.error('Error loading sections:', err);
      setError('Failed to load sections. Please try again.');
      setLoading(false);
    }
  }, [deptId, navigate, location.pathname]);

  const getDepartmentName = () => {
    if (!deptId) return 'Unknown Department';
    
    switch(deptId) {
      case 'cse': return 'Computer Science';
      case 'ece': return 'Electronics';
      case 'mech': return 'Mechanical';
      case 'civil': return 'Civil';
      case 'psychology': return 'Psychology';
      default: return deptId.toUpperCase();
    }
  };

  // Get department color based on ID
  const getDepartmentColor = () => {
    switch(deptId) {
      case 'cse': return 'from-blue-500 to-blue-600';
      case 'ece': return 'from-purple-500 to-purple-600';
      case 'mech': return 'from-orange-500 to-orange-600';
      case 'civil': return 'from-green-500 to-green-600';
      case 'psychology': return 'from-pink-500 to-pink-600';
      default: return 'from-primary-600 to-primary-700';
    }
  };

  // Get emotion icon based on emotion name
  const getEmotionIcon = (emotion) => {
    switch(emotion.toLowerCase()) {
      case 'happy': return <InsertEmoticon className="text-green-500" />;
      case 'neutral': return <SentimentNeutral className="text-gray-500" />;
      case 'focused': return <Analytics className="text-blue-500" />;
      case 'bored': return <SentimentDissatisfied className="text-amber-500" />;
      default: return <SentimentSatisfied className="text-indigo-500" />;
    }
  };

  const getEmotionColor = (emotion) => {
    switch(emotion.toLowerCase()) {
      case 'happy': return 'bg-green-100 text-green-800';
      case 'neutral': return 'bg-gray-100 text-gray-800';
      case 'focused': return 'bg-blue-100 text-blue-800';
      case 'bored': return 'bg-amber-100 text-amber-800';
      default: return 'bg-indigo-100 text-indigo-800';
    }
  };

  const sections = [
    { 
      id: 'A', 
      students: 35,
      time: '09:30 AM',
      lastAnalyzed: '2 hours ago',
      dominantEmotion: 'Neutral',
      attendance: '92%',
      engagement: '78%'
    },
    { 
      id: 'B',
      students: 42, 
      time: '11:00 AM',
      lastAnalyzed: '3 hours ago',
      dominantEmotion: 'Happy',
      attendance: '88%',
      engagement: '85%'
    },
    { 
      id: 'C',
      students: 38,
      time: '01:30 PM',
      lastAnalyzed: '1 hour ago',
      dominantEmotion: 'Focused',
      attendance: '94%',
      engagement: '82%'
    },
    { 
      id: 'D',
      students: 29,
      time: '03:00 PM',
      lastAnalyzed: '30 minutes ago',
      dominantEmotion: 'Bored',
      attendance: '86%',
      engagement: '64%'
    }
  ];

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-red-500 mb-4">{error}</div>
        <button 
          onClick={() => navigate('/departments')}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg"
        >
          Go to Departments
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loading size="lg" text={`Loading ${getDepartmentName()} sections...`} />
      </div>
    );
  }

  const handleSectionClick = (section) => {
    try {
      if (!deptId) {
        console.error('Missing department ID when clicking section');
        return;
      }
      navigate(`/classroom/${deptId}-${section.id}`);
    } catch (err) {
      console.error('Navigation error:', err);
      alert('Failed to open classroom. Please try again.');
    }
  };

  const departmentColorGradient = getDepartmentColor();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar 
        title="emotiSense" 
        subtitle={`${getDepartmentName()} Department`} 
      />
      
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Department Header */}
        <div className={`mb-8 bg-gradient-to-r ${departmentColorGradient} rounded-2xl shadow-elevation-3 overflow-hidden relative`}>
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
                  {getDepartmentName()} Sections
                </Typography>
                <Typography variant="body1" className="text-primary-100 max-w-xl">
                  Select a classroom section to view detailed emotion analytics and real-time monitoring.
                </Typography>
              </div>
              
              <div className="mt-4 sm:mt-0">
                <div className="inline-flex flex-wrap gap-3">
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-white">
                    <div className="text-xs font-medium">Total Students</div>
                    <div className="text-lg font-bold">{sections.reduce((acc, section) => acc + section.students, 0)}</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-white">
                    <div className="text-xs font-medium">Sections</div>
                    <div className="text-lg font-bold">{sections.length}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Daily Schedule Timeline */}
        <Card className="rounded-xl shadow-elevation-1 backdrop-blur-sm bg-white/95 border border-gray-100/50 overflow-hidden mb-8">
          <div className="p-4 bg-gradient-to-r from-gray-800 to-gray-700 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AccessTime fontSize="small" />
                <Typography variant="subtitle1" className="font-medium">
                  Today's Schedule
                </Typography>
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <School fontSize="small" />
                <span>Class Hours: 9:00 AM - 4:00 PM</span>
              </div>
            </div>
          </div>
          
          <div className="p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
              <Typography variant="body1" className="font-medium text-gray-700">
                Daily Class Schedule
              </Typography>
              <div className="flex items-center gap-4 mt-2 sm:mt-0">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-xs text-gray-500">Period</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="text-xs text-gray-500">Break</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs text-gray-500">Current</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              {/* Timeline connector */}
              <div className="absolute top-4 left-[19px] bottom-4 w-0.5 bg-gray-200"></div>
              
              {/* Timeline items */}
              <div className="space-y-2">
                {dailySchedule.map((slot, index) => {
                  // Determine background color based on slot type and state
                  let bgColor = "bg-gray-200"; // default
                  
                  if (slot.type === 'period') {
                    bgColor = slot.current ? "bg-green-500" : "bg-blue-500";
                  } else if (slot.type === 'break') {
                    bgColor = slot.current ? "bg-green-500" : "bg-amber-500";
                  }
                  
                  // Additional classes for past/current/upcoming
                  let timelineItemClass = "border-gray-200";
                  if (slot.current) {
                    timelineItemClass = "border-green-500 bg-green-50";
                  } else if (slot.past) {
                    timelineItemClass = "opacity-60";
                  }
                  
                  return (
                    <div 
                      key={index}
                      className={`flex items-start gap-4 py-2 px-3 rounded-lg border ${timelineItemClass}`}
                    >
                      {/* Timeline node */}
                      <div className={`w-6 h-6 rounded-full ${bgColor} flex items-center justify-center mt-1 relative z-10`}>
                        {slot.type === 'period' ? (
                          <span className="text-xs text-white font-medium">{slot.number}</span>
                        ) : (
                          <span className="text-white">{slot.icon}</span>
                        )}
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <Typography variant="body2" className="font-medium text-gray-800">
                            {slot.type === 'period' ? `Period ${slot.number}` : slot.name}
                          </Typography>
                          <div className="flex items-center gap-2">
                            <Typography variant="caption" className="text-gray-500 font-medium">
                              {slot.start} - {slot.end}
                            </Typography>
                            {slot.current && (
                              <Chip 
                                size="small" 
                                label="Current" 
                                color="success" 
                                className="text-xs h-5"
                              />
                            )}
                          </div>
                        </div>
                        
                        {slot.type === 'period' && (
                          <Typography variant="caption" className="text-gray-500">
                            {slot.current ? 'Class in session' : slot.past ? 'Completed' : 'Upcoming'}
                          </Typography>
                        )}
                        
                        {slot.type === 'break' && (
                          <Typography variant="caption" className="text-gray-500">
                            {slot.name === 'Lunch' ? '1 hour break' : '15 minute break'}
                          </Typography>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Card>
        
        {/* Stats Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <Card className="rounded-xl shadow-elevation-1 backdrop-blur-sm bg-white/95 border border-gray-100/50 overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className={`${departmentColorGradient.split(' ')[0].replace('from-', 'bg-')} p-3 rounded-lg`}>
                  <Groups className="text-white" />
                </div>
                <div>
                  <Typography variant="body2" className="text-gray-500 font-medium">
                    Average Attendance
                  </Typography>
                  <div className="flex items-end gap-1">
                    <Typography variant="h5" className="font-bold text-gray-800">
                      90%
                    </Typography>
                    <Typography variant="body2" className="text-green-600 mb-0.5">
                      +2.4%
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="mt-4 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="rounded-xl shadow-elevation-1 backdrop-blur-sm bg-white/95 border border-gray-100/50 overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="bg-green-500 p-3 rounded-lg">
                  <TrendingUp className="text-white" />
                </div>
                <div>
                  <Typography variant="body2" className="text-gray-500 font-medium">
                    Average Engagement
                  </Typography>
                  <div className="flex items-end gap-1">
                    <Typography variant="h5" className="font-bold text-gray-800">
                      77%
                    </Typography>
                    <Typography variant="body2" className="text-green-600 mb-0.5">
                      +5.8%
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="mt-4 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full" style={{ width: '77%' }}></div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="rounded-xl shadow-elevation-1 backdrop-blur-sm bg-white/95 border border-gray-100/50 overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="bg-amber-500 p-3 rounded-lg">
                  <CalendarMonth className="text-white" />
                </div>
                <div>
                  <Typography variant="body2" className="text-gray-500 font-medium">
                    Today's Schedule
                  </Typography>
                  <div className="flex items-end gap-1">
                    <Typography variant="h5" className="font-bold text-gray-800">
                      8 Periods
                    </Typography>
                    <Typography variant="body2" className="text-gray-600 mb-0.5">
                      3 Breaks
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-8 gap-1">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((period) => {
                  // Find if this period is current
                  const periodSlot = dailySchedule.find(s => s.type === 'period' && s.number === period);
                  const isCurrent = periodSlot?.current;
                  
                  return (
                    <Tooltip key={period} title={`Period ${period}`} arrow>
                      <div 
                        className={`text-center text-xs py-1 rounded ${
                          isCurrent 
                            ? 'bg-green-500 text-white font-medium' 
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {period}
                      </div>
                    </Tooltip>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {sections.map((section) => (
            <Card 
              key={section.id}
              onClick={() => handleSectionClick(section)}
              className="rounded-xl shadow-elevation-1 hover:shadow-elevation-3 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm bg-white/95 border border-gray-100/50"
            >
              <div className={`bg-gradient-to-r ${departmentColorGradient} p-5 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-16 h-16 -mt-6 -mr-6 rounded-full bg-white/10"></div>
                
                <div className="flex justify-between items-center">
                  <div className="bg-white/20 backdrop-blur-sm h-16 w-16 flex items-center justify-center rounded-xl text-white font-bold text-2xl drop-shadow-sm">
                    {section.id}
                  </div>
                  
                  <div className="text-right">
                    <Typography variant="body2" className="text-white/80">
                      Class Time
                    </Typography>
                    <Typography variant="body1" className="text-white font-bold">
                      {section.time}
                    </Typography>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-5">
                <Typography variant="h6" className="font-bold text-gray-800 mb-3">
                  Section {section.id}
                </Typography>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Students</div>
                    <div className="text-lg font-semibold">{section.students}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Attendance</div>
                    <div className="text-lg font-semibold">{section.attendance}</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-3 border-t border-gray-100">
                  <div className="flex items-center">
                    <Typography variant="body2" className="text-gray-500 mr-2">
                      Dominant Emotion:
                    </Typography>
                    <Chip
                      icon={getEmotionIcon(section.dominantEmotion)}
                      label={section.dominantEmotion}
                      size="small"
                      className={`${getEmotionColor(section.dominantEmotion)} text-xs`}
                    />
                  </div>
                  <Typography variant="caption" className="text-gray-400">
                    {section.lastAnalyzed}
                  </Typography>
                </div>
                
                <button className="w-full mt-3 py-2.5 px-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2">
                  <Analytics fontSize="small" />
                  View Analytics
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sections;