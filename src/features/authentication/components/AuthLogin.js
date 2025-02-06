import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
  // useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'components/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { login } from 'features/authentication/authActions';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSpinner } from 'context/spinnerContext';

// import Google from 'assets/images/icons/social-google.svg';

// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const [checked, setChecked] = useState(true);
  const dispatch = useDispatch();
  const {handleotppage} = others
  const {show,hide} = useSpinner()

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  console.log(theme.typography.customInput,"customINput")
  return (
    <Formik
      initialValues={{
        email: 'chandran.yoho@gmail.com',
        password: 'Wecandoit@2024', 
        submit: null
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string('Must be a valid username').max(255).required('Username is required'),
        password: Yup.string().max(255).required('Password is required')
      })}
      onSubmit= { async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          if (scriptedRef.current) {
          show()
          const response = await dispatch(await login(values.email, values.password));
          console.log(response.otpVerify,"otp")
          if(response?.otpVerify){
            hide()
            handleotppage()
          }
          setStatus({ success: true });
          setSubmitting(false);
          }
        } catch (err) {
          hide()
          console.error(err);
          toast.error(err?.message)
          if (scriptedRef.current) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit} {...others}>
          <FormControl variant="outlined" fullWidth error={Boolean(touched.email && errors.email)} 
          sx={{ my: 1 }}
          >
            <InputLabel htmlFor="outlined-adornment-email-login">Username</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email-login"
              value={values.email}
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              label="Username"
              inputProps={{}}
            />
            {touched.email && errors.email && (
              <FormHelperText error id="standard-weight-helper-text-email-login">
                {errors.email}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl variant="outlined" fullWidth error={Boolean(touched.password && errors.password)} 
          sx={{ my: 1 }}
          >
            <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password-login"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size="large"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              inputProps={{}}
            />
            {touched.password && errors.password && (
              <FormHelperText error id="standard-weight-helper-text-password-login">
                {errors.password}
              </FormHelperText>
            )}
          </FormControl>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
            {/* <FormControlLabel
              control={<Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />}
              label="Remember me"
            /> */}

            <Typography
              component={Link}
              onClick={others?.handleOtpPage}
              to="/forget-password"
              variant="subtitle1"
              color="secondary"
              sx={{ textDecoration: 'none', cursor: 'pointer' }}
            >
              Forgot Password?
            </Typography>
          </Stack>
          {errors.submit && (
            <Box sx={{ mt: 3 }}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}

          <Box sx={{ mt: 2 }}>
            <AnimateButton>
              <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                Sign in
              </Button>
            </AnimateButton>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default FirebaseLogin;