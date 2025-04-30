import { useState } from 'react';
import { TextField, Button, InputAdornment, IconButton, FormControlLabel, Checkbox } from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'rememberMe' ? checked : value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/departments');
    }, 1000);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-5">
        <TextField
          fullWidth
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email fontSize="small" className="text-gray-500" />
              </InputAdornment>
            ),
          }}
          className="rounded-lg"
        />
        
        <TextField
          fullWidth
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleChange}
          required
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock fontSize="small" className="text-gray-500" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        
        <div className="flex items-center justify-between">
          <FormControlLabel
            control={
              <Checkbox 
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                color="primary"
                size="small"
              />
            }
            label={<span className="text-sm text-gray-600">Remember me</span>}
          />
          
          <button
            type="button"
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Forgot password?
          </button>
        </div>
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading}
          className="py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 normal-case text-base rounded-lg"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
        
        <div className="relative flex items-center justify-center mt-6">
          <div className="border-t w-full border-gray-300"></div>
          <div className="bg-white px-4 text-sm text-gray-500 absolute">or continue with</div>
        </div>
        
        <div className="grid grid-cols-3 gap-3 mt-4">
          {['Google', 'Microsoft', 'Apple'].map((provider) => (
            <button
              key={provider}
              type="button"
              className="py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm text-gray-700">{provider}</span>
            </button>
          ))}
        </div>
      </div>
    </form>
  );
};

export default Login;