import { Link } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AuthFooter from 'components/cards/AuthFooter';
import { useState } from 'react';
import AuthWrapper1 from '../../../features/authentication/components/AuthWrapper1';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormHelperText from '@mui/material/FormHelperText';
import { styled } from '@mui/material/styles';
import Cleave from 'cleave.js/react';
import { Controller, useForm } from 'react-hook-form';
import CleaveWrapper from 'styles/libs/react-cleave';
import { hexToRGBA } from 'utils/hex-to-rgba';
import 'cleave.js/dist/addons/cleave-phone.us';
import AuthIllustrationV1Wrapper from '../../../features/authentication/components/AuthIllustrationV1Wrapper';
import Icon from 'components/icon';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import CustomTextField from 'components/mui/text-field';
// ================================|| AUTH3 - LOGIN ||================================ //
const Card = styled(MuiCard)(({ theme }) => ({
    [theme.breakpoints.up('sm')]: { width: '25rem' }
}));

const LinkStyled = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    color: `${theme.palette.primary.main} !important`,
    alignItems: 'center',
    display: 'flex'
}));

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
const Login = () => {
    const theme = useTheme();
    const [otp, setOtp] = useState(false);
    const [showPasswordInput, setShowPasswordInput] = useState(false);

    // ** State
    const [isBackspace, setIsBackspace] = useState(false);

    // ** Hooks

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

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({ defaultValues });

    const handleSendOtp = () => {
        setOtp((state) => !state);
    };

    // ** Vars
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
        <AuthWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        {!otp && !showPasswordInput && (
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
                                                    <Typography sx={{ mb: 1.5, fontWeight: 500, fontSize: '1.625rem', lineHeight: 1.385 }}>
                                                        Forgot Password? 🔒
                                                    </Typography>
                                                    <Typography sx={{ color: 'text.secondary' }}>
                                                        Enter your email and we&prime;ll send you instructions to reset your password
                                                    </Typography>
                                                </Box>
                                                <form noValidate autoComplete="off" onSubmit={handleSendOtp}>
                                                    <TextField fullWidth autoFocus label="Email or Username" sx={{ display: 'flex', mb: 4 }} />
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
                        )}
                        {otp && (
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
                                                    OTP
                                                </Typography>
                                            </Box>
                                            <Box sx={{ mb: 6 }}>
                                                <Typography variant="h4" sx={{ mb: 1.5 }}>
                                                    Two-Step Verification 💬
                                                </Typography>
                                                <Typography sx={{ mb: 1.5, color: 'text.secondary' }}>
                                                    We sent a verification code to your mobile. Enter the code from the mobile in the field below.
                                                </Typography>
                                                <Typography variant="h6">******9763</Typography>
                                            </Box>
                                            <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>Type your 6 digit security code</Typography>
                                            <form
                                                onSubmit={handleSubmit(() => {
                                                    setOtp(false);
                                                    setShowPasswordInput(true);
                                                })}
                                            >
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
                        )}
                        {showPasswordInput && (
                            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                                <AuthIllustrationV1Wrapper>
                                    <Card>
                                        <CardContent sx={{ p: (theme) => `${theme.spacing(10.5, 8, 8)} !important` }}>
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
                                                <CustomTextField
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
                                                <CustomTextField
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
                                                    <Typography component={LinkStyled} to="/pages/auth/login-v1">
                                                        <Icon fontSize="1.25rem" icon="tabler:chevron-left" />
                                                        <span>Back to login</span>
                                                    </Typography>
                                                </Typography>
                                            </form>
                                        </CardContent>
                                    </Card>
                                </AuthIllustrationV1Wrapper>
                            </Grid>
                        )}
                    </Grid>
                </Grid>

                <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    <AuthFooter />
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};

export default Login;
