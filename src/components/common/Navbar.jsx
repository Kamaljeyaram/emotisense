import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { AccountCircle, Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ title, subtitle, hideTitle = false }) => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="primary" elevation={0} className="bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md w-full">
      <Toolbar className="w-full max-w-full px-4 sm:px-6 lg:px-8 mx-auto flex justify-between">
        {/* Left side - can be empty or contain a back button in the future */}
        <Box className="w-20">
          {/* This empty box helps with centering */}
        </Box>
        
        {/* Center - Title and subtitle */}
        {!hideTitle && (
          <div className="flex-grow text-center">
            <Typography variant="h5" component="h1" className="font-bold">
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body2" component="p" className="text-primary-100 mt-0.5">
                {subtitle}
              </Typography>
            )}
          </div>
        )}
        {hideTitle && <div className="flex-grow"></div>}
        
        {/* Right side - User controls */}
        <Box className="w-20 flex justify-end">
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <IconButton color="inherit" onClick={() => navigate('/')}>
            <Logout />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;