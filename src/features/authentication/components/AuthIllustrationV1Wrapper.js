// ** MUI Components
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

// ** Styled Components
const AuthIllustrationV1Wrapper = styled(Box)(({ theme }) => ({
  
  width: '100%',
  maxWidth: 400,
  position: 'relative',
  zIndex: 1,
  
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
    transform: 'translateY(-4px)',
  }
}));

export default AuthIllustrationV1Wrapper;
