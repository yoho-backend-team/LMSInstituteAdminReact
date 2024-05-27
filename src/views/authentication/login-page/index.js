import { Link } from 'react-router-dom';
import { Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AuthFooter from 'components/cards/AuthFooter';
import Logo from 'components/logo';
import { useState } from 'react';
import AuthCardWrapper from 'features/authentication/components/AuthCardWrapper';
import AuthWrapper1 from 'features/authentication/components/AuthWrapper1';
import AuthLogin from 'features/authentication/components/AuthLogin';
import { VerifyOtp } from 'features/authentication/authActions';
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
import AuthIllustrationV1Wrapper from 'features/authentication/components/AuthIllustrationV1Wrapper';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {checkAuthState,getOtpDetails} from 'utils/check-auth-state';

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
  const [values,setValues] = useState(Array(6).fill(''))
  const handleotppage = () => setOtp(!otp);
  const dispatch = useDispatch()

  // ** State
  const [isBackspace, setIsBackspace] = useState(false);

  // ** Hooks

  useEffect(()=>{
    const checkLoginState = () => {
      if(checkAuthState()){
        setOtp(true)
      }
    }
    checkLoginState()
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  // ** Vars
  const errorsArray = Object.keys(errors);

  const handleChange = (event, onChange) => {
    if (!isBackspace) {
      onChange(event);
    
      setValues((prevValues) => {
        const newValues = [...prevValues];
        newValues[index] = event.target.value;
        return newValues;
      });
      
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
                      <AuthLogin otp={otp} setOtp={setOtp} handleotppage={handleotppage} />
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
                        <div>
                        <Logo />
                        </div>
                        <Typography variant="h3" sx={{ ml: 2.5, fontWeight: 700 }}>
                          OTP
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="h4" sx={{ mb: 1.5 }}>
                          Two-Step Verification 💬
                        </Typography>
                        <Typography sx={{ mb: 1.5, color: 'text.secondary' }}>
                          We sent a verification code to your email. Enter the code from the emil in the field below.
                        </Typography>
                        <Typography variant="h6">{getOtpDetails().email}</Typography>
                      </Box>
                      <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>Type your 6 digit security code</Typography>
                      <form onSubmit={handleSubmit(async() => {
                        const otp = values.join(" ").toString().replace(/\s+/g, '')
                        const otpToken =JSON.parse(localStorage.getItem("otp"))
                        await dispatch(VerifyOtp(otp,otpToken.email,otpToken.token))
                        console.log(defaultValues,"defaultValues",values.join(" ").toString().replace(/\s+/g, ''))})}>
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
