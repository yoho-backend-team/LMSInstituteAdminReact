import { Box, Button, Card, CardContent, FormHelperText, Grid, Typography } from '@mui/material';
import AuthIllustrationV1Wrapper from 'features/authentication/components/AuthIllustrationV1Wrapper';
import React from 'react';
import CleaveWrapper from 'styles/libs/react-cleave';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { hexToRGBA } from 'utils/hex-to-rgba';
import Cleave from 'cleave.js/react';
import 'cleave.js/dist/addons/cleave-phone.us';
import { useState } from 'react';
import { verifyOtp } from '../services/forgetPasswordService';
import toast from 'react-hot-toast';

import NewLogo from '../../../../assets/images/logo/logo.png'

const CleaveInput = styled(Cleave)(({ theme }) => ({
    maxWidth: 48,
    textAlign: 'center',
    height: '48px !important',
    fontSize: '150% !important',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    '&:not(:last-child)': {
        marginRight: theme.spacing(2)
    },
    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        margin: 0,
        WebkitAppearance: 'none'
    }
}));

const defaultValues = {
    val1: '',
    val2: '',
    val3: '',
    val4: '',
    val5: '',
    val6: ''
};
const OTPInput = ({ userId,handleOtpVerify }) => {
    const theme = useTheme();
    const LinkStyled = styled(Link)(({ theme }) => ({
        textDecoration: 'none',
        color: `${theme.palette.primary.main} !important`,
        alignItems: 'center',
        display: 'flex'
    }));
    // ** State
    const [isBackspace, setIsBackspace] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({ defaultValues });
    const errorsArray = Object.keys(errors);

    const handleChange = (event, onChange) => {
        if (!isBackspace) {
            onChange(event);

            // @ts-ignore
            const form = event.target.form;
            const index = [...form].indexOf(event.target);
            if (form[index].value && form[index].value.length) {
                form.elements[index + 1].focus();
            }
            event.preventDefault();
        }
    };

    const handleVerifyOtp = async (data) => {
        const otp = Object.values(data).join('');
        const inputData = {
            user_id: userId,
            otp: otp
        };
        const result = await verifyOtp(inputData);
        if (result.success) {
            toast.success(result.message);
            handleOtpVerify()
        }
        console.warn(inputData);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Backspace') {
            setIsBackspace(true);

            // @ts-ignore
            const form = event.target.form;
            const index = [...form].indexOf(event.target);
            if (index >= 1) {
                if (!(form[index].value && form[index].value.length)) {
                    form.elements[index - 1].focus();
                }
            }
        } else {
            setIsBackspace(false);
        }
    };

    const renderInputs = () => {
        return Object.keys(defaultValues).map((val, index) => (
            <Controller
                key={val}
                name={val}
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                    <Box
                        type="tel"
                        maxLength={1}
                        value={value}
                        autoFocus={index === 0}
                        component={CleaveInput}
                        onKeyDown={handleKeyDown}
                        onChange={(event) => handleChange(event, onChange)}
                        options={{ blocks: [1], numeral: true, numeralPositiveOnly: true }}
                        sx={{ [theme.breakpoints.down('sm')]: { px: `${theme.spacing(2)} !important` } }}
                    />
                )}
            />
        ));
    };
    return (
        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
            <AuthIllustrationV1Wrapper>
                <Card>
                    <CardContent sx={{ p: (theme) => `${theme.spacing(5, 5, 5)} !important` }}>
                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Link to="/login">
                <img src={NewLogo} alt='KIAQ' width={184} height={64} />
                </Link>
              </Box>
                        <Box sx={{ m: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="h3" sx={{ ml: -3, fontWeight: 700 }}>
                              VERIFY  OTP
                            </Typography>
                        </Box>
                        <Box sx={{ mb: 6 }}>
                            <Typography variant="h4" sx={{ml:8, mb: 1.5 }}>
                                Two-Step Verification 💬
                            </Typography>
                            <Typography sx={{ mb: 1.5, color: 'text.secondary' }}>
                                We sent a verification code to your mobile. Enter the code from the mobile in the field below.
                            </Typography>
                            <Typography variant="h6">******9763</Typography>
                        </Box>
                        <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>Type your 6 digit security code</Typography>
                        <form onSubmit={handleSubmit(handleVerifyOtp)}>
                            <CleaveWrapper
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    ...(errorsArray.length && {
                                        '& .invalid:focus': {
                                            borderColor: (theme) => `${theme.palette.error.main} !important`,
                                            boxShadow: (theme) => `0 1px 3px 0 ${hexToRGBA(theme.palette.error.main, 0.4)}`
                                        }
                                    })
                                }}
                            >
                                {renderInputs()}
                            </CleaveWrapper>
                            {errorsArray.length ? (
                                <FormHelperText sx={{ color: 'error.main', fontSize: (theme) => theme.typography.body2.fontSize }}>
                                    Please enter a valid OTP
                                </FormHelperText>
                            ) : null}
                            <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
                                Verify My Account
                            </Button>
                        </form>
                        <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography sx={{ color: 'text.secondary' }}>Didnt get the code?</Typography>
                            <Typography component={LinkStyled} to="/" onClick={(e) => e.preventDefault()} sx={{ ml: 1 }}>
                                Resend
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </AuthIllustrationV1Wrapper>
        </Grid>
    );
};

export default OTPInput;
