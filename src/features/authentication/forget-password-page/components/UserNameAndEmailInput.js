import { Box, Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import AuthIllustrationV1Wrapper from 'features/authentication/components/AuthIllustrationV1Wrapper';
import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/icon';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material';
import { sendOtp } from '../services/forgetPasswordService';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';

const UserNameAndEmailInput = ({ handleSendOtp, setUserId }) => {
    const theme = useTheme();
    const LinkStyled = styled(Link)(({ theme }) => ({
        textDecoration: 'none',
        color: `${theme.palette.primary.main} !important`,
        alignItems: 'center',
        display: 'flex'
    }));
    const defaultValues = {
        username: ''
    };

    const schema = yup.object().shape({
        username: yup.string().required('Username or Email is required')
    });
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    });

    const handleOtpSend = async (data) => {
        const inputData = {
            username: data.username
        };
        const result = await sendOtp(inputData);
        if (result.success) {
            toast.success(result.message);
            setUserId(result?.data?.id);
            handleSendOtp();
        }
    };
    return (
        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
            <AuthIllustrationV1Wrapper>
                <Card>
                    <CardContent sx={{ p: (theme) => `${theme.spacing(5, 5, 5)} !important` }}>
                        <Box sx={{ width: '100%', maxWidth: 400 }}>
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
                            <Box sx={{ my: 6 }}>
                                <Typography sx={{ mb: 1.5, fontWeight: 500, fontSize: '1.625rem', lineHeight: 1.385 }}>Forgot Password? 🔒</Typography>
                                <Typography sx={{ color: 'text.secondary' }}>
                                    Enter your email and we&prime;ll send you instructions to reset your password
                                </Typography>
                            </Box>
                            <form noValidate autoComplete="off" onSubmit={handleSubmit(handleOtpSend)}>
                                <Controller
                                    name="username"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange } }) => (
                                        <TextField
                                            fullWidth
                                            value={value}
                                            sx={{ mb: 4 }}
                                            label="Username or Email"
                                            onChange={onChange}
                                            placeholder="John Doe"
                                            error={Boolean(errors.username)}
                                            {...(errors.username && { helperText: errors.username.message })}
                                        />
                                    )}
                                />
                                <Button fullWidth type="submit" variant="contained" sx={{ mb: 4 }}>
                                    Send OTP
                                </Button>
                                <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', '& svg': { mr: 1 } }}>
                                    <LinkStyled to="/login">
                                        <Icon fontSize="1.25rem" icon="tabler:chevron-left" />
                                        <div>Back to login</div>
                                    </LinkStyled>
                                </Typography>
                            </form>
                        </Box>
                    </CardContent>
                </Card>
            </AuthIllustrationV1Wrapper>
        </Grid>
    );
};

export default UserNameAndEmailInput;
