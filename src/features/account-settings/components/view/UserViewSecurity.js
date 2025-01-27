import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
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
    showConfirmNewPassword: false,
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

    if (
      values.newPassword === values.confirmNewPassword &&
      values.newPassword !== '' &&
      values.confirmNewPassword !== ''
    ) {
      try {
        show();
        const data = {
          current_password: values.current_password,
          confirm_password: values.confirmNewPassword,
          new_password: values.newPassword,
        };
        const result = await userChangePassword(data);
        toast.success(result.message);
        setValues({
          current_password: '',
          newPassword: '',
          confirmNewPassword: '',
          showNewPassword: false,
          showCurrent_password: false,
          showConfirmNewPassword: false,
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
    <Grid container spacing={3} justifyContent="center"sx={{height:'80vh'}} >
      <Grid item xs={12} md={8} lg={12}>
        <Card elevation={3}>
          <CardHeader title="Change Password" subheader="Update your account security settings" />
          <Divider />
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Current Password"
                    placeholder="Enter current password"
                    value={values.current_password}
                    onChange={handleInputChange('current_password')}
                    type={values.showCurrent_password ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={togglePasswordVisibility('showCurrent_password')}
                            aria-label="toggle current password visibility"
                          >
                            <Icon
                              fontSize="1.25rem"
                              icon={values.showCurrent_password ? 'tabler:eye' : 'tabler:eye-off'}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="New Password"
                    placeholder="Enter new password"
                    value={values.newPassword}
                    onChange={handleInputChange('newPassword')}
                    type={values.showNewPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={togglePasswordVisibility('showNewPassword')}
                            aria-label="toggle new password visibility"
                          >
                            <Icon
                              fontSize="1.25rem"
                              icon={values.showNewPassword ? 'tabler:eye' : 'tabler:eye-off'}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    placeholder="Confirm new password"
                    value={values.confirmNewPassword}
                    onChange={handleInputChange('confirmNewPassword')}
                    type={values.showConfirmNewPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={togglePasswordVisibility('showConfirmNewPassword')}
                            aria-label="toggle confirm password visibility"
                          >
                            <Icon
                              fontSize="1.25rem"
                              icon={values.showConfirmNewPassword ? 'tabler:eye' : 'tabler:eye-off'}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {!passwordsMatch && (
                    <Typography variant="caption" color="error" display="block" mt={1}>
                      Passwords do not match
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth size="large">
                    Change Password
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UserViewSecurity;
