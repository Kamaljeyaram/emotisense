import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Auth from './components/Auth';
import Departments from './components/Dashboard/Departments';
import Sections from './components/Dashboard/Sections';
import ClassroomAnalytics from './components/Dashboard/ClassroomAnalytics';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a73e8',
      light: '#4f9ef6',
      dark: '#0d47a1',
    },
    secondary: {
      main: '#7c4dff',
      light: '#9b7dff',
      dark: '#5c28f5',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      'system-ui',
      '-apple-system',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
        },
      },
    },
    // Override Material-UI Container to be full width
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: '100% !important',
          padding: '0 16px',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="w-full min-h-screen bg-gray-50">
        <Router>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/departments/:deptId/sections" element={<Sections />} />
            <Route path="/classroom/:sectionId" element={<ClassroomAnalytics />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
