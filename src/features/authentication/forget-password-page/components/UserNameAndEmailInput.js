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
 

import NewLogo from '../../../../assets/images/logo/logo.png'

 

const UserNameAndEmailInput = ({ handleSendOtp, setUserId,setOtp }) => {             //*{setOtp}
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
    console.log("Sending OTP...");  
    const inputData = {
      email: data.username
    };
   
              //  setOtp(true);                                                      //* 
   

    const result = await sendOtp(inputData);
    console.log(result);
    if (result.success) {
      toast.success(result.message);
      setUserId(result?.data?.id);
      handleSendOtp();
    }
  };
 <Typography>Hello</Typography>


  return (
    <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
      <AuthIllustrationV1Wrapper>
        <Card>
          <CardContent sx={{ p: (theme) => `${theme.spacing(5, 5, 5)} !important` }}>
            <Box sx={{ width: '100%', maxWidth: 400 }}>

            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Link to="/login">
                <img src={NewLogo} alt='KIAQ' width={184} height={64} />
                </Link>
              </Box>
          
              <Box sx={{ my: 6 }}>
                <Typography sx={{ mb: 1.5, fontWeight: 500, fontSize: '1.625rem', lineHeight: 1.385 }}> &nbsp;&nbsp;&nbsp;&nbsp; Forgot Password?<span style={{ position: 'relative', top: '-3px' }}>🔒</span></Typography>
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
