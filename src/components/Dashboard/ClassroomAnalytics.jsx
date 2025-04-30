import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Typography, Chip, Divider } from '@mui/material';
import Webcam from 'react-webcam';
import { 
  ArrowUpward, ArrowDownward, BarChart, People, Timer, Psychology,
  VideocamOff, Videocam, Settings, InsertEmoticon
} from '@mui/icons-material';
import Navbar from '../common/Navbar';
import EmotionPieChart from '../Charts/EmotionPieChart';
import Loading from '../common/Loading';

const ClassroomAnalytics = () => {
  const { sectionId } = useParams();
  const [emotionData, _setEmotionData] = useState([25, 15, 10, 40, 10]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emotions, _setEmotions] = useState({
    happy: { count: 25, change: 5 },
    sad: { count: 15, change: -3 },
    angry: { count: 10, change: -2 },
    neutral: { count: 40, change: 8 },
    surprised: { count: 10, change: -8 },
  });
  const [cameraEnabled, setCameraEnabled] = useState(false);
  
  // Inside the ClassroomAnalytics component
  const webcamRef = useRef(null);
  const [cameraLoading, setCameraLoading] = useState(false);
  // Add a new state for camera errors
  const [cameraError, setCameraError] = useState(null);

  // Maps emotion names to colors and emojis
  const emotionMeta = {
    happy: { color: 'bg-green-100 text-green-600', emoji: '😊', gradient: 'from-green-500 to-green-600' },
    sad: { color: 'bg-blue-100 text-blue-600', emoji: '😢', gradient: 'from-blue-500 to-blue-600' },
    angry: { color: 'bg-red-100 text-red-600', emoji: '😠', gradient: 'from-red-500 to-red-600' },
    neutral: { color: 'bg-gray-100 text-gray-600', emoji: '😐', gradient: 'from-gray-500 to-gray-600' },
    surprised: { color: 'bg-yellow-100 text-yellow-600', emoji: '😮', gradient: 'from-yellow-500 to-yellow-600' },
  };

  // Find dominant emotion
  const dominantEmotion = Object.keys(emotions).reduce(
    (max, emotion) => emotions[max].count > emotions[emotion].count ? max : emotion, 
    'neutral'
  );

  useEffect(() => {
    // Safety check for invalid sectionId
    if (!sectionId) {
      console.error('Missing section ID');
      setError('Invalid classroom section');
      return;
    }

    console.log('ClassroomAnalytics mounted with sectionId:', sectionId);
    
    // Simulate loading data
    try {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    } catch (err) {
      console.error('Error in ClassroomAnalytics:', err);
      setError('Failed to load classroom data');
      setLoading(false);
    }
  }, [sectionId]);

  // Parse section ID to get department and section
  let dept = 'unknown';
  let section = 'A';
  
  try {
    if (sectionId && sectionId.includes('-')) {
      [dept, section] = sectionId.split('-');
    }
  } catch (err) {
    console.error('Error parsing sectionId:', err);
  }
  
  const deptFullName = dept === 'cse' ? 'Computer Science' : 
                     dept === 'ece' ? 'Electronics' :
                     dept === 'mech' ? 'Mechanical' :
                     dept === 'civil' ? 'Civil' : dept.toUpperCase();

  // Get department color based on ID
  const getDepartmentGradient = () => {
    switch(dept) {
      case 'cse': return 'from-blue-600 to-blue-700';
      case 'ece': return 'from-purple-600 to-purple-700';
      case 'mech': return 'from-orange-600 to-orange-700';
      case 'civil': return 'from-green-600 to-green-700';
      case 'psychology': return 'from-pink-600 to-pink-700';
      default: return 'from-primary-600 to-primary-700';
    }
  };

  const handleToggleCamera = () => {
    if (!cameraEnabled) {
      setCameraLoading(true);
      // When enabling camera, set a short timeout to simulate loading
      setTimeout(() => {
        setCameraEnabled(true);
        setCameraLoading(false);
      }, 1000);
    } else {
      setCameraEnabled(false);
    }
  };

  // Add this inside the camera UI section to handle errors
  const handleCameraError = (error) => {
    console.error('Camera error:', error);
    setCameraError('Could not access camera. Please check permissions.');
    setCameraEnabled(false);
    setCameraLoading(false);
  };

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
        <Card className="max-w-md p-8 rounded-2xl shadow-elevation-3 text-center">
          <Psychology className="text-red-500 text-5xl mb-4" />
          <Typography variant="h5" className="font-bold text-gray-800 mb-2">
            {error}
          </Typography>
          <Typography variant="body2" className="text-gray-600 mb-6">
            We couldn't load the classroom data. Please try again or contact support.
          </Typography>
          <button 
            onClick={() => window.history.back()}
            className="px-6 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-lg font-medium transition-all shadow-sm hover:shadow-md"
          >
            Go Back
          </button>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <Loading size="lg" text="Analyzing classroom emotions..." />
      </div>
    );
  }

  const departmentGradient = getDepartmentGradient();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar 
        title="EmoSense" 
        subtitle={`${deptFullName} - Section ${section}`}
      />
      
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Modern page header with gradient */}
        <div className={`mb-6 bg-gradient-to-r ${departmentGradient} rounded-2xl shadow-elevation-3 overflow-hidden relative`}>
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
                  Classroom Analytics
                </Typography>
                <Typography variant="body1" className="text-primary-100 max-w-xl">
                  Real-time emotion monitoring and analysis for {deptFullName}, Section {section}
                </Typography>
              </div>
              
              <div className="mt-4 sm:mt-0 flex flex-wrap gap-3">
                <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-white">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Live Analysis</span>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-white flex items-center gap-2">
                  <Timer fontSize="small" />
                  <span className="text-sm font-medium">45:22</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-8">
          <Card className="rounded-xl shadow-elevation-2 backdrop-blur-sm bg-white/95 border border-gray-100/50 overflow-hidden">
            <div className="p-5">
              <div className="flex justify-between">
                <div>
                  <Typography variant="body2" className="text-gray-500 font-medium mb-1">
                    Students Present
                  </Typography>
                  <Typography variant="h4" className="font-bold text-gray-800">
                    28/42
                  </Typography>
                </div>
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-3 rounded-xl text-white shadow-md">
                  <People className="text-xl" />
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-500 rounded-full" style={{ width: '67%' }}></div>
                </div>
                <div className="flex justify-between mt-2">
                  <Typography variant="caption" className="text-gray-500">
                    67% attendance
                  </Typography>
                  <Typography variant="caption" className="text-green-600 font-medium flex items-center">
                    <ArrowUpward style={{ fontSize: 10 }} className="mr-0.5" /> 
                    4 more than usual
                  </Typography>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="rounded-xl shadow-elevation-2 backdrop-blur-sm bg-white/95 border border-gray-100/50 overflow-hidden">
            <div className="p-5">
              <div className="flex justify-between">
                <div>
                  <Typography variant="body2" className="text-gray-500 font-medium mb-1">
                    Engagement Score
                  </Typography>
                  <Typography variant="h4" className="font-bold text-gray-800">
                    76%
                  </Typography>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl text-white shadow-md">
                  <BarChart className="text-xl" />
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full" style={{ width: '76%' }}></div>
                </div>
                <div className="flex justify-between mt-2">
                  <Typography variant="caption" className="text-gray-500">
                    Target: 70%
                  </Typography>
                  <Typography variant="caption" className="text-green-600 font-medium flex items-center">
                    <ArrowUpward style={{ fontSize: 10 }} className="mr-0.5" /> 
                    12% higher this week
                  </Typography>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="rounded-xl shadow-elevation-2 backdrop-blur-sm bg-white/95 border border-gray-100/50 overflow-hidden">
            <div className="p-5">
              <div className="flex justify-between">
                <div>
                  <Typography variant="body2" className="text-gray-500 font-medium mb-1">
                    Focus Duration
                  </Typography>
                  <Typography variant="h4" className="font-bold text-gray-800">
                    38:15
                  </Typography>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl text-white shadow-md">
                  <Timer className="text-xl" />
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <div className="flex justify-between mt-2">
                  <Typography variant="caption" className="text-gray-500">
                    Started at 09:15 AM
                  </Typography>
                  <Typography variant="caption" className="text-blue-600 font-medium flex items-center">
                    85% of class time
                  </Typography>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="rounded-xl shadow-elevation-2 backdrop-blur-sm bg-white/95 border border-gray-100/50 overflow-hidden">
            <div className="p-5">
              <div className="flex justify-between">
                <div>
                  <Typography variant="body2" className="text-gray-500 font-medium mb-1">
                    Dominant Emotion
                  </Typography>
                  <Typography variant="h4" className="font-bold text-gray-800 capitalize flex items-center gap-2">
                    {dominantEmotion}
                    <span className="text-2xl">{emotionMeta[dominantEmotion].emoji}</span>
                  </Typography>
                </div>
                <div className={`bg-gradient-to-r ${emotionMeta[dominantEmotion].gradient} p-3 rounded-xl text-white shadow-md`}>
                  <InsertEmoticon className="text-xl" />
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${emotionMeta[dominantEmotion].gradient} rounded-full`} 
                    style={{ width: `${emotions[dominantEmotion].count}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2">
                  <Typography variant="caption" className="text-gray-500">
                    {emotions[dominantEmotion].count}% of students
                  </Typography>
                  <Typography variant="caption" className={`${emotions[dominantEmotion].change > 0 ? 'text-green-600' : 'text-red-600'} font-medium flex items-center`}>
                    {emotions[dominantEmotion].change > 0 ? (
                      <ArrowUpward style={{ fontSize: 10 }} className="mr-0.5" />
                    ) : (
                      <ArrowDownward style={{ fontSize: 10 }} className="mr-0.5" />
                    )}
                    {Math.abs(emotions[dominantEmotion].change)}% change
                  </Typography>
                </div>
              </div>
            </div>
          </Card>
        </div>
      
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
          {/* Main camera feed */}
          <div className="lg:col-span-2">
            <Card className="rounded-2xl shadow-elevation-3 overflow-hidden h-full flex flex-col">
              <div className="p-4 bg-gradient-to-r from-gray-900 to-gray-800 flex justify-between items-center border-b border-gray-800">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-gray-800 rounded-lg">
                    <Videocam className="text-white" />
                  </div>
                  <Typography variant="subtitle1" className="text-white font-medium">
                    Classroom Live View
                  </Typography>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleToggleCamera} 
                    className="p-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-white"
                  >
                    <Settings fontSize="small" />
                  </button>
                  <div className="flex items-center gap-1.5 bg-gray-800 px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-400">Live</span>
                  </div>
                </div>
              </div>
              
              <div className="aspect-video md:aspect-[16/9] flex items-center justify-center w-full bg-gray-900 relative">
                {cameraEnabled ? (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center relative">
                    {/* Real webcam feed */}
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      className="w-full h-full object-cover"
                      videoConstraints={{
                        width: 1280,
                        height: 720,
                        facingMode: "user"
                      }}
                      onUserMediaError={handleCameraError}
                      onUserMedia={() => setCameraError(null)}
                    />
                    
                    {/* Emotion indicators */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <div className="flex flex-wrap gap-2 justify-center">
                        {Object.keys(emotions).map((emotion) => (
                          <div 
                            key={emotion} 
                            className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white backdrop-blur-sm flex items-center gap-1.5"
                          >
                            <span className="text-sm">{emotionMeta[emotion].emoji}</span>
                            <span className="capitalize">{emotion}</span>
                            <span className="bg-white/20 px-1.5 rounded-full">{emotions[emotion].count}%</span>
                            {emotions[emotion].change > 0 ? (
                              <ArrowUpward style={{ fontSize: 12 }} className="text-green-400" />
                            ) : (
                              <ArrowDownward style={{ fontSize: 12 }} className="text-red-400" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-400 p-8 flex flex-col items-center">
                    {cameraLoading ? (
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 border-t-4 border-primary-500 border-solid rounded-full animate-spin mb-4"></div>
                        <Typography variant="body1" className="text-gray-400">
                          Initializing camera...
                        </Typography>
                      </div>
                    ) : (
                      <>
                        <VideocamOff className="text-gray-500 text-5xl mb-4" />
                        <Typography variant="h6" className="text-gray-400 mb-2">
                          Camera feed unavailable
                        </Typography>
                        {cameraError ? (
                          <Typography variant="body2" className="text-red-400 mb-4 max-w-md text-center">
                            {cameraError}
                          </Typography>
                        ) : (
                          <Typography variant="body2" className="text-gray-500 mb-4 max-w-md">
                            Enable the camera to start monitoring classroom emotions in real-time
                          </Typography>
                        )}
                        <button 
                          onClick={handleToggleCamera}
                          className="px-6 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg text-sm font-medium shadow-lg shadow-primary-900/20 hover:shadow-primary-900/30 transition-all"
                        >
                          Enable Camera
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
              
              <div className="p-4 bg-gradient-to-r from-gray-900 to-gray-800 border-t border-gray-800">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 bg-indigo-900/40 px-3 py-1 rounded-lg text-indigo-300 text-xs">
                      <span>ID:</span>
                      <span className="font-mono font-medium">{sectionId}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-gray-800 px-3 py-1 rounded-lg text-gray-400 text-xs">
                      <span>Students:</span>
                      <span className="font-medium">28/42</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">
                    Last updated: {new Date().toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Analytics panel */}
          <div>
            <Card className="rounded-2xl shadow-elevation-3 overflow-hidden h-full flex flex-col backdrop-blur-sm bg-white/95 border border-gray-100/50">
              <div className="p-4 bg-gradient-to-r from-secondary-600 to-secondary-500 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
                    <path fill="#ffffff" d="M14 16H9v-2h5V9h2v5h5v2h-5v5h-2v-5zm-5.5
                    39.5v-2h13v2h-13zm16-17v-2h13v2h-13zm-16 0v-2h13v2h-13zm32 
                    17v-2h13v2h-13zm-16-17v-2h13v2h-13z"></path>
                  </svg>
                </div>
                
                <div className="relative z-10">
                  <Typography variant="h6" className="text-white font-bold">
                    Emotion Analysis
                  </Typography>
                  <Typography variant="body2" className="text-secondary-200">
                    Real-time emotion distribution
                  </Typography>
                </div>
              </div>
              
              <div className="p-5 flex-grow flex flex-col">
                <div className="h-full flex flex-col">
                  <div className="h-56 sm:h-64 mb-2 sm:mb-4">
                    <EmotionPieChart data={emotionData} />
                  </div>
                  
                  <Divider className="my-4" />
                  
                  <div className="mt-2 flex-grow">
                    <Typography variant="subtitle2" className="text-gray-700 font-medium mb-3">
                      Emotion Breakdown
                    </Typography>
                    <div className="space-y-3">
                      {Object.keys(emotions).map((emotion) => (
                        <div key={emotion} className="p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`w-8 h-8 rounded-lg ${emotionMeta[emotion].color} flex items-center justify-center`}>
                                {emotionMeta[emotion].emoji}
                              </div>
                              <div>
                                <Typography variant="body2" className="font-medium capitalize">
                                  {emotion}
                                </Typography>
                                <Typography variant="caption" className="text-gray-500">
                                  {emotions[emotion].count}% of students
                                </Typography>
                              </div>
                            </div>
                            <Chip 
                              size="small"
                              label={`${emotions[emotion].change > 0 ? '+' : ''}${emotions[emotion].change}%`}
                              className={emotions[emotion].change > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                            />
                          </div>
                          <div className="mt-2 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full bg-gradient-to-r ${emotionMeta[emotion].gradient}`}
                              style={{ width: `${emotions[emotion].count}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        
        {/* Student emotional insights - Modern design cards */}
        <div className="mt-6 sm:mt-8">
          <div className="mb-4 flex items-center justify-between">
            <Typography variant="h6" className="font-bold text-gray-800">
              Individual Emotion Insights
            </Typography>
            <button className="text-primary-600 text-sm font-medium hover:text-primary-700 flex items-center gap-1">
              View detailed report
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
            {Object.keys(emotions).map((emotion) => (
              <Card 
                key={emotion} 
                className="rounded-xl shadow-elevation-2 backdrop-blur-sm bg-white/95 border border-gray-100/50 overflow-hidden hover:shadow-elevation-3 transition-all hover:-translate-y-0.5"
              >
                <div className={`h-1.5 bg-gradient-to-r ${emotionMeta[emotion].gradient}`}></div>
                <div className="p-5">
                  <div className="flex items-center mb-3">
                    <div className={`w-8 h-8 rounded-lg ${emotionMeta[emotion].color} flex items-center justify-center mr-3`}>
                      {emotionMeta[emotion].emoji}
                    </div>
                    <Typography variant="subtitle2" className="font-medium capitalize">
                      {emotion}
                    </Typography>
                  </div>
                  
                  <Typography variant="h5" className="font-bold mb-1">
                    {emotions[emotion].count}%
                  </Typography>
                  
                  <div className={`flex items-center text-xs font-medium ${emotions[emotion].change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {emotions[emotion].change > 0 ? (
                      <ArrowUpward style={{ fontSize: 12 }} className="mr-0.5" />
                    ) : (
                      <ArrowDownward style={{ fontSize: 12 }} className="mr-0.5" />
                    )}
                    <span>{Math.abs(emotions[emotion].change)}% from last class</span>
                  </div>
                  
                  <Divider className="my-3" />
                  
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Detected in</span>
                    <span className="font-medium">{Math.floor(emotions[emotion].count * 0.42)} students</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassroomAnalytics;