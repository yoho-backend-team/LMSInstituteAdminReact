import { Box, Button, CardContent, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import AuthIllustrationV1Wrapper from 'features/authentication/components/AuthIllustrationV1Wrapper';
import React, { useState } from 'react';
import Icon from 'components/icon';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';

import NewLogo from '../../../../assets/images/logo/logo.png';
import client from 'api/client';
import toast from 'react-hot-toast';

const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '25rem' }
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: `${theme.palette.primary.main} !important`,
  alignItems: 'center',
  display: 'flex'
}));

const SetPasswordInput = ({ userId, onPasswordResetSuccess }) => {
  const theme = useTheme();
  // ** States
  const [values, setValues] = useState({
    newPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showConfirmNewPassword: false
  });
  const [error, setError] = useState('');

  // ** Function to handle password reset submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(" Submitting new password...");

    if (!values.newPassword || !values.confirmNewPassword) {
        console.error(' Error: Both fields are required.');
        setError('Both fields are required.');
        return;
    }

    if (values.newPassword !== values.confirmNewPassword) {
        console.error(' Error: Passwords do not match.');
        setError('Passwords do not match.');
        return;
    }

    const data = {
        email: userId.email, 
        newPassword: values.newPassword,
        confirmPassword: values.confirmNewPassword,
    };

    try {
        const response = await client.admin.reset_password(data);
        console.log("API Response:", response);

        if (response.status === 200 || response.status === "success") {
            console.log("Password updated successfully!");

            if (onPasswordResetSuccess) {
                console.log("Calling onPasswordResetSuccess...");
                onPasswordResetSuccess();
            } else {
                console.error("onPasswordResetSuccess is UNDEFINED!");
            }
        } else {
            console.error("Password reset failed. API response:", response);
            setError('Failed to reset password. Please try again.');
        }
    } catch (error) {
        console.error("API error:", error);
        setError(error.response?.data?.message || 'An error occurred. Please try again.');
    }
};


  // Handle New Password
  const handleNewPasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword });
  };

  // Handle Confirm New Password
  const handleConfirmNewPasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword });
  };
  return (
    <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
      <AuthIllustrationV1Wrapper>
        <Card>
          <CardContent sx={{ p: (theme) => `${theme.spacing(5, 5, 5)} !important` }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Link to="/login">
                <img src={NewLogo} alt="KIAQ" width={184} height={64} />
              </Link>
            </Box>
            <Box sx={{ m: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h3" sx={{ ml: -3, fontWeight: 700 }}>
                LMS
              </Typography>
            </Box>
            <Box sx={{ mb: 6, ml: 8 }}>
              <Typography variant="h4" sx={{ mb: 1.5, ml: 1.5 }}>
                Reset Password 🔒
              </Typography>
              <Typography sx={{ display: 'flex' }}>
                for{' '}
                <Typography component="span" sx={{ ml: 1, fontWeight: 500 }}>
                  john.doe@email.com
                </Typography>
              </Typography>
            </Box>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                autoFocus
                label="New Password"
                placeholder="············"
                value={values.newPassword}
                sx={{ display: 'flex', mb: 4 }}
                id="auth-reset-password-new-password"
                onChange={handleNewPasswordChange('newPassword')}
                type={values.showNewPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={handleClickShowNewPassword}
                        onMouseDown={(e) => e.preventDefault()}
                        aria-label="toggle password visibility"
                      >
                        <Icon fontSize="1.25rem" icon={values.showNewPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                fullWidth
                label="Confirm Password"
                placeholder="············"
                sx={{ display: 'flex', mb: 4 }}
                value={values.confirmNewPassword}
                id="auth-reset-password-confirm-password"
                type={values.showConfirmNewPassword ? 'text' : 'password'}
                onChange={handleConfirmNewPasswordChange('confirmNewPassword')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onMouseDown={(e) => e.preventDefault()}
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmNewPassword}
                      >
                        <Icon fontSize="1.25rem" icon={values.showConfirmNewPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <Button fullWidth type="submit" variant="contained" sx={{ mb: 4 }}>
                Set New Password
              </Button>
              <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', '& svg': { mr: 1 } }}>
                <Typography component={LinkStyled} to="/login">
                  <Icon fontSize="1.25rem" icon="tabler:chevron-left" />
                  <span>Back to login</span>
                </Typography>
              </Typography>
            </form>
          </CardContent>
        </Card>
      </AuthIllustrationV1Wrapper>
    </Grid>
  );
};

export default SetPasswordInput;
