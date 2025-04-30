import { useState } from 'react';
import { Card, Typography } from '@mui/material';
import { EmojiEmotions } from '@mui/icons-material';
import Login from './Login';
import Register from './Register';

const Auth = () => {
  const [tab, setTab] = useState(0);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md px-4">
        {/* Modern logo with improved alignment */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-tr from-primary-600 to-secondary-500 p-3 rounded-xl shadow-lg shadow-primary-500/20">
              <EmojiEmotions className="text-white text-3xl" />
            </div>
            <div className="flex flex-col items-start">
              <Typography 
                variant="h4" 
                component="h1" 
                className="font-bold bg-gradient-to-r from-gray-800 to-gray-600 text-transparent bg-clip-text"
              >
                emotiSense
              </Typography>
              <span className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                Classroom Analytics
              </span>
            </div>
          </div>
        </div>
        
        <Card className="backdrop-blur-sm bg-white/95 rounded-2xl overflow-hidden border border-gray-100 shadow-xl shadow-gray-200/50">
          {/* Modern card header with subtle pattern */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-500 py-6 px-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
                <path fill="#ffffff" d="M14 16H9v-2h5V9h2v5h5v2h-5v5h-2v-5zm-5.5
                39.5v-2h13v2h-13zm16-17v-2h13v2h-13zm-16 0v-2h13v2h-13zm32 
                17v-2h13v2h-13zm-16-17v-2h13v2h-13z"></path>
              </svg>
            </div>
            <Typography variant="h6" component="h2" className="text-white font-medium relative z-10">
              {tab === 0 ? 'Welcome Back' : 'Join emotiSense'}
            </Typography>
            <Typography variant="body2" className="text-primary-100 mt-1 relative z-10">
              {tab === 0 ? 'Sign in to continue to your dashboard' : 'Create an account to get started'}
            </Typography>
          </div>
          
          {/* Modern tab design */}
          <div className="p-6">
            <div className="flex mb-6 rounded-xl p-1 border border-gray-200">
              {['Sign In', 'Create Account'].map((label, index) => (
                <button
                  key={label}
                  onClick={() => setTab(index)}
                  className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-lg transition-all duration-200
                    ${tab === index 
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md' 
                      : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="mt-4">
              {tab === 0 ? <Login /> : <Register />}
            </div>
          </div>
        </Card>
        
        {/* Footer with modern styling */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center justify-center gap-2 text-xs text-gray-500">
            <span>© {new Date().getFullYear()}</span>
            <span className="w-1 h-1 rounded-full bg-gray-400"></span>
            <span>emotiSense AI</span>
            <span className="w-1 h-1 rounded-full bg-gray-400"></span>
            <span>All rights reserved</span>
          </div>
          
          {/* Social proof */}
          <div className="mt-3 flex justify-center items-center gap-1 text-gray-400 text-xs">
            <span>Trusted by</span>
            <span className="font-medium text-gray-600">150+</span>
            <span>educational institutions</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;