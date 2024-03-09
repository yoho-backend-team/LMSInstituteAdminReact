import { Box, Button, CardContent, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import AuthIllustrationV1Wrapper from 'features/authentication/components/AuthIllustrationV1Wrapper';
import React, { useState } from 'react';
import Icon from 'components/icon';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';


const Card = styled(MuiCard)(({ theme }) => ({
    [theme.breakpoints.up('sm')]: { width: '25rem' }
}));

const LinkStyled = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    color: `${theme.palette.primary.main} !important`,
    alignItems: 'center',
    display: 'flex'
}));

const SetPasswordInput = () => {
    const theme = useTheme();
    // ** States
    const [values, setValues] = useState({
        newPassword: '',
        showNewPassword: false,
        confirmNewPassword: '',
        showConfirmNewPassword: false
    });

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
                        <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width={34} viewBox="0 0 32 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    fill={theme.palette.primary.main}
                                    d="M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z"
                                />
                                <path
                                    fill="#161616"
                                    opacity={0.06}
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z"
                                />
                                <path
                                    fill="#161616"
                                    opacity={0.06}
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    fill={theme.palette.primary.main}
                                    d="M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z"
                                />
                            </svg>
                            <Typography variant="h3" sx={{ ml: 2.5, fontWeight: 700 }}>
                                LMS
                            </Typography>
                        </Box>
                        <Box sx={{ mb: 6 }}>
                            <Typography variant="h4" sx={{ mb: 1.5 }}>
                                Reset Password 🔒
                            </Typography>
                            <Typography sx={{ display: 'flex' }}>
                                for{' '}
                                <Typography component="span" sx={{ ml: 1, fontWeight: 500 }}>
                                    john.doe@email.com
                                </Typography>
                            </Typography>
                        </Box>
                        <form noValidate autoComplete="off" onSubmit={(e) => e.preventDefault()}>
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
