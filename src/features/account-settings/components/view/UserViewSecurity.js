import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Icon from 'components/icon';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { userChangePassword } from 'features/user-management/users-page/services/userServices';
import { useSpinner } from 'context/spinnerContext';
const UserViewSecurity = ({ id }) => {
  const [values, setValues] = useState({
    current_password: '',
    showCurrent_password: false,
    newPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showConfirmNewPassword: false
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const { show, hide } = useSpinner();

  const handleInputChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const togglePasswordVisibility = (prop) => () => {
    setValues({ ...values, [prop]: !values[prop] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (values.newPassword === values.confirmNewPassword && values.newPassword !== '' && values.confirmNewPassword !== '') {
      try {
        show();
        const data = {
          current_password: values.current_password,
          confirm_password: values.confirmNewPassword,
          new_password: values.newPassword
        };
        const result = await userChangePassword(data);
        toast.success(result.message);
        setValues({
          current_password: '',
          newPassword: '',
          confirmNewPassword: '',
          showNewPassword: false,
          showCurrent_password: false,
          showConfirmNewPassword: false
        });
        setPasswordsMatch(true);
      } catch (error) {
        toast.error(error.message);
      } finally {
        hide();
      }
    } else {
      setPasswordsMatch(false);
    }
  };

  return (
      <Box sx={{ display: 'flex' , gap:4, p:4,backgroundColor:'white', boxShadow:2, borderRadius:2 }}>
        <Grid xs={7}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography sx={{ fontFamily: 'Poppins',whiteSpace: 'nowrap' }} variant="h1">
              Change Password
            </Typography>
            <Typography sx={{ fontFamily: 'Poppins' }} variant="h3">
              Passwords must contain:
            </Typography>
            <Typography sx={{ fontFamily: 'Poppins' }}>✔️ At least 6 characters</Typography>
            <Typography sx={{ fontFamily: 'Poppins' }}> ✔️ At least 1 uppercase letter (A-Z)</Typography>
            <Typography sx={{ fontFamily: 'Poppins' }}>✔️ At least 1 lowercase letter (a-z)</Typography>
            <Typography sx={{ fontFamily: 'Poppins' }}> ✔️ At least 1 number (0-9)</Typography>
          </Box>
        </Grid>
        <Grid xs={8} >
          <form onSubmit={handleSubmit} >
            <Box sx={{ display:"flex",flexDirection:'column', gap:3}}>

            <TextField
              fullWidth
              label="Current Password"
              placeholder="Enter current password"
              sx={{fontFamily: 'Poppins'}}
              value={values.current_password}
              onChange={handleInputChange('current_password')}
              type={values.showCurrent_password ? 'text' : 'password'}
              InputLabelProps={{
                style: { fontFamily: 'Poppins' } 
              }}
              InputProps={{
                style: { fontFamily: 'Poppins' },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={togglePasswordVisibility('showCurrent_password')}
                      aria-label="toggle current password visibility"
                    >
                      <Icon fontSize="1.25rem" icon={values.showCurrent_password ? 'tabler:eye' : 'tabler:eye-off'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              
            />
            <TextField
              fullWidth
              label="New Password"
              placeholder="Enter new password"
              sx={{fontFamily: 'Poppins'}}
              value={values.newPassword}
              onChange={handleInputChange('newPassword')}
              type={values.showNewPassword ? 'text' : 'password'}
              InputLabelProps={{
                style: { fontFamily: 'Poppins' } 
              }}
              InputProps={{
                style: { fontFamily: 'Poppins' },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={togglePasswordVisibility('showNewPassword')}
                      aria-label="toggle new password visibility"
                    >
                      <Icon fontSize="1.25rem" icon={values.showNewPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <TextField
              fullWidth
              label="Confirm New Password"
              sx={{fontFamily: 'Poppins'}}
              placeholder="Confirm new password"
              value={values.confirmNewPassword}
              onChange={handleInputChange('confirmNewPassword')}
              type={values.showConfirmNewPassword ? 'text' : 'password'}
              InputLabelProps={{
                style: { fontFamily: 'Poppins' } 
              }}
              InputProps={{
                style: { fontFamily: 'Poppins' },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={togglePasswordVisibility('showConfirmNewPassword')}
                      aria-label="toggle confirm password visibility"
                    >
                      <Icon fontSize="1.25rem" icon={values.showConfirmNewPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            {!passwordsMatch && (
              <Typography variant="caption" color="error" display="block" mt={1} sx={{ fontFamily: 'Poppins' }}>
                Passwords do not match
              </Typography>
            )}

            <Button type="submit" variant="contained" color="primary" sx={{ fontFamily: 'Poppins' }} >
              Change Password
            </Button>
            </Box>
          </form>
        </Grid>
      </Box>
  );
};

export default UserViewSecurity;
