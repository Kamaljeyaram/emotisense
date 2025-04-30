import { useState } from 'react';
import { TextField, Button, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear previous errors
    
    // Simulate API call
    try {
      // Add validation
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      setTimeout(() => {
        setLoading(false);
        navigate('/departments');
      }, 1000);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}
      <div className="space-y-5">
        <TextField
          fullWidth
          label="Full Name"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          required
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person fontSize="small" className="text-gray-500" />
              </InputAdornment>
            ),
          }}
          className="rounded-lg"
        />
        
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
        
        <TextField
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          value={formData.confirmPassword}
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
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={formData.password !== formData.confirmPassword && formData.confirmPassword !== ''}
          helperText={
            formData.password !== formData.confirmPassword && formData.confirmPassword !== '' 
              ? 'Passwords do not match' 
              : ''
          }
        />
        
        <div className="flex items-center justify-between mt-2">
          <div className="text-xs text-gray-500">
            By creating an account, you agree to our
            <button type="button" className="text-primary-600 ml-1 hover:underline">
              Terms & Conditions
            </button>
          </div>
        </div>
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading}
          className="py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 normal-case text-base rounded-lg mt-2"
        >
          {loading ? 'Creating Account...' : 'Create Account'}
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

export default Register;