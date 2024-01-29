import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import AuthFooter from 'components/cards/AuthFooter';
import Logo from 'components/logo';
import { useState } from 'react';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthWrapper1 from '../AuthWrapper1';
import AuthLogin from '../auth-forms/AuthLogin';

// ** React Imports

// ** Next Import

// ** MUI Components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormHelperText from '@mui/material/FormHelperText';
import { styled } from '@mui/material/styles';

// ** Third Party Imports
import Cleave from 'cleave.js/react';
import { Controller, useForm } from 'react-hook-form';

// ** Layout Import

// ** Demo Imports

// ** Custom Styled Component
import CleaveWrapper from 'styles/libs/react-cleave';

// ** Util Import
import { hexToRGBA } from 'utils/hex-to-rgba';

// ** Styles
import 'cleave.js/dist/addons/cleave-phone.us';
import AuthIllustrationV1Wrapper from '../AuthIllustrationV1Wrapper';
// assets

// ================================|| AUTH3 - LOGIN ||================================ //
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '25rem' }
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: `${theme.palette.primary.main} !important`
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
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [otp, setOtp] = useState(false);
  const handleOtpPage = () => setOtp(!otp);

  // ** State
  const [isBackspace, setIsBackspace] = useState(false);

  // ** Hooks

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });

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
            {!otp && (
              <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                <AuthCardWrapper>
                  <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item sx={{ mb: 3 }}>
                      <Link to="#">
                        <Logo />
                      </Link>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                        <Grid item>
                          <Stack alignItems="center" justifyContent="center" spacing={1}>
                            <Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                              Hi, Welcome Back
                            </Typography>
                            <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
                              Enter your credentials to continue
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <AuthLogin otp={otp} setOtp={setOtp} handleOtpPage={handleOtpPage} />
                    </Grid>
                  </Grid>
                </AuthCardWrapper>
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
                      <form onSubmit={handleSubmit(() => true)}>
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
