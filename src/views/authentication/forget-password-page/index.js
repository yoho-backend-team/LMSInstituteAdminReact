import { Grid } from '@mui/material';
import AuthFooter from 'components/cards/AuthFooter';
import { useState } from 'react';
import AuthWrapper1 from '../../../features/authentication/components/AuthWrapper1';

import UserNameAndEmailInput from 'features/authentication/forget-password-page/components/UserNameAndEmailInput';
import OTPInput from 'features/authentication/forget-password-page/components/OTPInput';
import SetPasswordInput from 'features/authentication/forget-password-page/components/SetPasswordInput';
// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
    const [otp, setOtp] = useState(false);
    const [userId, setUserId] = useState('');
    const [showPasswordInput, setShowPasswordInput] = useState(false);

    // ** Hooks

    const handleSendOtp = () => {
        setOtp((state) => !state);
    };
    const handleOtpVerify = () => {
        setOtp((state) => !state);
        setShowPasswordInput((state) => !state);
    };

    // ** Vars

    return (
        <AuthWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        {!otp && !showPasswordInput && <UserNameAndEmailInput handleSendOtp={handleSendOtp} setUserId={setUserId} />}
                        {otp && (
                            <OTPInput setShowPasswordInput={setShowPasswordInput} setOtp={setOtp} userId={userId} handleOtpVerify={handleOtpVerify} />
                        )}
                        {showPasswordInput && <SetPasswordInput />}
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
