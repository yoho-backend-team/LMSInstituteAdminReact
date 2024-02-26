// ** React Imports
import { forwardRef, useState } from 'react';
// ** MUI Imports
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Icon from 'components/icon';
import DatePicker from 'react-datepicker';
import { Controller } from 'react-hook-form';
// ** Custom Components
import CustomAvatar from 'components/mui/avatar';
import CustomChip from 'components/mui/chip';
import CustomTextField from 'components/mui/text-field';
import { default as UserSubscriptionDialog, default as UserSuspendDialog } from './StudentSubscriptionDialog';
// ** Utils Import
import { yupResolver } from '@hookform/resolvers/yup';
import { getInitials } from 'utils/get-initials';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { updateStudent } from 'features/student-management/students/services/studentService';

const data = {
  id: 1,
  role: 'admin',
  status: 'active',
  username: 'gslixby0',
  avatarColor: 'primary',
  country: 'El Salvador',
  company: 'Yotz PVT LTD',
  billing: 'Manual - Cash',
  contact: '(479) 232-9151',
  currentPlan: 'enterprise',
  fullName: 'Daisy Patterson',
  email: 'gslixby0@abc.net.au',
  avatar: '/images/avatars/14.png'
};

const roleColors = {
  admin: 'error',
  editor: 'info',
  author: 'warning',
  maintainer: 'success',
  subscriber: 'primary'
};

const statusColors = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
};

// ** Styled <sup> component
const Sup = styled('sup')(({ theme }) => ({
  top: 0,
  left: -10,
  position: 'absolute',
  color: theme.palette.primary.main
}));

// ** Styled <sub> component
const Sub = styled('sub')(({ theme }) => ({
  alignSelf: 'flex-end',
  color: theme.palette.text.disabled,
  fontSize: theme.typography.body1.fontSize
}));

const validationSchema = yup.object().shape({
  First_name: yup.string().required('First Name is required'),
  Last_name: yup.string().required('Last Name is required'),
  date_of_birth: yup.date().required('Date of Birth is required'),
  gender: yup.string().required('Gender is required'),
  state: yup.string().required('State is required'),
  city: yup.string().required('City is required'),
  pin_code: yup.number().required('Pin Code is required'),
  address_line_one: yup.string().required('Address Line One is required'),
  address_line_two: yup.string().required('Address Line Two is required'),
  phone: yup.number().required('Phone Number is required'),
  alt_phone: yup.number().required('Alt Phone Number is required'),
  official_email: yup.string().email('Invalid email').required('Official Email is required'),
  description: yup.string().required('Description is required')
});

const UserViewLeft = () => {
  // ** States
  const [openEdit, setOpenEdit] = useState(false);
  const [openPlans, setOpenPlans] = useState(false);
  const [suspendDialogOpen, setSuspendDialogOpen] = useState(false);
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);

  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);

  // Handle Upgrade Plan dialog
  const handlePlansClickOpen = () => setOpenPlans(true);
  const handlePlansClose = () => setOpenPlans(false);

  const onSubmit =async(data) => {
    const inputData = {
      First_name: data.First_name,
      Last_name: data.Last_name,
      date_of_birth: data.date_of_birth,
      gender: data.gender,
      state: data.state,
      city: data.city,
      pin_code: data.pin_code,
      address_line_one: data.address_line_one,
      address_line_two: data.address_line_two,
      phone: data.phone,
      alt_phone: data.alt_phone,
      official_email: data.official_email,
      description: data.description,
    };
    const result = await updateStudent(inputData);

    if (result.success) {
      toast.success(result.message);
    } else {
      let errorMessage = '';
      Object.values(result.message).forEach((errors) => {
        errors.forEach((error) => {
          errorMessage += `${error}\n`; // Concatenate errors with newline
        });
      });
      toast.error(errorMessage.trim());
      // toast.error(result.message);
    }
  };

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const CustomInput = forwardRef(({ ...props }, ref) => {
    return <TextField fullWidth inputRef={ref} {...props} />;
  });

  if (data) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ pt: 13.5, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              {data.avatar ? (
                <CustomAvatar src={data.avatar} variant="rounded" alt={data.fullName} sx={{ width: 100, height: 100, mb: 4 }} />
              ) : (
                <CustomAvatar
                  skin="light"
                  variant="rounded"
                  color={data.avatarColor}
                  sx={{ width: 100, height: 100, mb: 4, fontSize: '3rem' }}
                >
                  {getInitials(data.fullName)}
                </CustomAvatar>
              )}
              <Typography variant="h4" sx={{ mb: 3 }}>
                {data.fullName}
              </Typography>
              <CustomChip
                rounded
                skin="light"
                size="small"
                label={data.role}
                color={roleColors[data.role]}
                sx={{ textTransform: 'capitalize' }}
              />
            </CardContent>

            <CardContent sx={{ pt: (theme) => `${theme.spacing(2)} !important` }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ mr: 8, display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar skin="light" variant="rounded" sx={{ mr: 2.5, width: 38, height: 38 }}>
                    <Icon fontSize="1.75rem" icon="tabler:checkbox" />
                  </CustomAvatar>
                  <div>
                    <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>1.23k</Typography>
                    <Typography variant="body2">Task Done</Typography>
                  </div>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar skin="light" variant="rounded" sx={{ mr: 2.5, width: 38, height: 38 }}>
                    <Icon fontSize="1.75rem" icon="tabler:briefcase" />
                  </CustomAvatar>
                  <div>
                    <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>568</Typography>
                    <Typography variant="body2">Project Done</Typography>
                  </div>
                </Box>
              </Box>
            </CardContent>

            <Divider sx={{ my: '0 !important', mx: 6 }} />

            <CardContent sx={{ pb: 4 }}>
              <Typography variant="body2" sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                Details
              </Typography>
              <Box sx={{ pt: 4 }}>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Username:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>@{data.username}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Email:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{data.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Status:</Typography>
                  <CustomChip
                    rounded
                    skin="light"
                    size="small"
                    label={data.status}
                    color={statusColors[data.status]}
                    sx={{
                      textTransform: 'capitalize'
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Role:</Typography>
                  <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{data.role}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Tax ID:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>Tax-8894</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Contact:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>+1 {data.contact}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Language:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>English</Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Country:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{data.country}</Typography>
                </Box>
              </Box>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="contained" sx={{ mr: 2 }} onClick={handleEditClickOpen}>
                Edit
              </Button>
              <Button color="error" variant="tonal" onClick={() => setSuspendDialogOpen(true)}>
                Suspend
              </Button>
            </CardActions>

            <Dialog
              open={openEdit}
              onClose={handleEditClose}
              aria-labelledby="user-view-edit"
              aria-describedby="user-view-edit-description"
              sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 800 } }}
            >
              <DialogTitle
                id="user-view-edit"
                sx={{
                  textAlign: 'center',
                  fontSize: '1.5rem !important',
                  px: (theme) => [`${theme.spacing(2)} !important`, `${theme.spacing(15)} !important`]
                  // pt: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(12.5)} !important`]
                }}
              >
                Edit User Information
              </DialogTitle>
              <DialogContent
                sx={{
                  pb: (theme) => `${theme.spacing(5)} !important`,
                  px: (theme) => [`${theme.spacing(2)} !important`, `${theme.spacing(8)} !important`]
                }}
              >
                <DialogContentText variant="body2" id="user-view-edit-description" sx={{ textAlign: 'center', mb: 7 }}>
                  Updating user details will receive a privacy audit.
                </DialogContentText>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="First_name"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            fullWidth
                            value={value}
                            label="First Name"
                            onChange={onChange}
                            placeholder="Leonard"
                            error={Boolean(errors['First_name'])}
                            aria-describedby="stepper-linear-personal-institute_name"
                            {...(errors['First_name'] && { helperText: 'This field is required' })}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="Last_name"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            fullWidth
                            value={value}
                            label="Last Name"
                            onChange={onChange}
                            placeholder="Leonard"
                            error={Boolean(errors['Last_name'])}
                            aria-describedby="stepper-linear-personal-institute_name"
                            {...(errors['Last_name'] && { helperText: 'This field is required' })}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="date_of_birth"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <DatePicker
                            id="issue-date"
                            dateFormat={'dd/MM/yyyy'}
                            value={value}
                            selected={value}
                            customInput={
                              <CustomInput
                                label="Date Of Birth"
                                error={Boolean(errors['date_of_birth'])}
                                aria-describedby="stepper-linear-personal-date_of_birth"
                                {...(errors['date_of_birth'] && { helperText: 'This field is required' })}
                              />
                            }
                            onChange={onChange}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="gender"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            select
                            fullWidth
                            value={value}
                            onChange={onChange}
                            label="Gender"
                            placeholder="Select Gender"
                            error={Boolean(errors['gender'])}
                            aria-describedby="stepper-linear-personal-gender"
                            {...(errors['gender'] && { helperText: 'This field is required' })}
                          >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                          </CustomTextField>
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="state"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            fullWidth
                            value={value}
                            label="State"
                            onChange={onChange}
                            error={Boolean(errors.state)}
                            aria-describedby="stepper-linear-personal-state-helper"
                            {...(errors.state && { helperText: 'This field is required' })}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="city"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            fullWidth
                            value={value}
                            label="City"
                            onChange={onChange}
                            error={Boolean(errors.city)}
                            aria-describedby="stepper-linear-personal-city-helper"
                            {...(errors.city && { helperText: 'This field is required' })}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="pin_code"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            fullWidth
                            value={value}
                            label="Pin Code"
                            type="number"
                            onChange={onChange}
                            placeholder="Carter"
                            error={Boolean(errors['pin_code'])}
                            aria-describedby="stepper-linear-personal-pin_code"
                            {...(errors['pin_code'] && { helperText: 'This field is required' })}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="address_line_one"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            fullWidth
                            value={value}
                            label="Address Line One"
                            onChange={onChange}
                            placeholder="Carter"
                            error={Boolean(errors['address_line_one'])}
                            aria-describedby="stepper-linear-personal-address_line_one"
                            {...(errors['address_line_one'] && { helperText: 'This field is required' })}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="address_line_two"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            fullWidth
                            value={value}
                            label="Address Line Two"
                            onChange={onChange}
                            placeholder="Carter"
                            error={Boolean(errors['address_line_two'])}
                            aria-describedby="stepper-linear-personal-address_line_two"
                            {...(errors['address_line_two'] && { helperText: 'This field is required' })}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="phone"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            fullWidth
                            type="number"
                            value={value}
                            label="Phone Number"
                            onChange={onChange}
                            placeholder="Carter"
                            error={Boolean(errors['phone'])}
                            aria-describedby="stepper-linear-personal-phone"
                            {...(errors['phone'] && { helperText: 'This field is required' })}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="alt_phone"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            fullWidth
                            value={value}
                            type="number"
                            label="Alt Phone Number"
                            onChange={onChange}
                            placeholder="Carter"
                            error={Boolean(errors['alt_phone'])}
                            aria-describedby="stepper-linear-personal-alt_phone"
                            {...(errors['alt_phone'] && { helperText: 'This field is required' })}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="official_email"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            fullWidth
                            value={value}
                            label="Official Email"
                            onChange={onChange}
                            placeholder="Carter"
                            error={Boolean(errors['official_email'])}
                            aria-describedby="stepper-linear-personal-official_email"
                            {...(errors['official_email'] && { helperText: 'This field is required' })}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Controller
                        name="description"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            fullWidth
                            value={value}
                            multiline
                            rows={3}
                            label="Description"
                            onChange={onChange}
                            placeholder="Carter"
                            error={Boolean(errors['description'])}
                            aria-describedby="stepper-linear-personal-description"
                            {...(errors['description'] && { helperText: 'This field is required' })}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Button variant="tonal" color="secondary">
                        cancel
                      </Button>
                      <Button type="submit" variant="contained">
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </DialogContent>
            </Dialog>
            <UserSuspendDialog open={suspendDialogOpen} setOpen={setSuspendDialogOpen} />
            <UserSubscriptionDialog open={subscriptionDialogOpen} setOpen={setSubscriptionDialogOpen} />
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ pb: 1, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <CustomChip rounded skin="light" size="small" color="primary" label="Popular" />
              <Box sx={{ display: 'flex', position: 'relative' }}>
                <Sup>$</Sup>
                <Typography variant="h4" sx={{ mt: -1, mb: -1.2, color: 'primary.main', fontSize: '2.375rem !important' }}>
                  99
                </Typography>
                <Sub>/ month</Sub>
              </Box>
            </CardContent>

            <CardContent>
              <Box sx={{ mt: 2.5, mb: 4 }}>
                <Box sx={{ display: 'flex', mb: 2, alignItems: 'center', '& svg': { mr: 2, color: 'text.secondary' } }}>
                  <Icon icon="tabler:point" fontSize="1.125rem" />
                  <Typography sx={{ color: 'text.secondary' }}>10 Users</Typography>
                </Box>
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', '& svg': { mr: 2, color: 'text.secondary' } }}>
                  <Icon icon="tabler:point" fontSize="1.125rem" />
                  <Typography sx={{ color: 'text.secondary' }}>Up to 10GB storage</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 2, color: 'text.secondary' } }}>
                  <Icon icon="tabler:point" fontSize="1.125rem" />
                  <Typography sx={{ color: 'text.secondary' }}>Basic Support</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', mb: 1.5, justifyContent: 'space-between' }}>
                <Typography sx={{ fontWeight: 500 }}>Days</Typography>
                <Typography sx={{ fontWeight: 500 }}>75% Completed</Typography>
              </Box>
              <LinearProgress value={75} variant="determinate" sx={{ height: 10 }} />
              <Typography sx={{ mt: 1.5, mb: 6, color: 'text.secondary' }}>4 days remaining</Typography>
              <Button fullWidth variant="contained" onClick={handlePlansClickOpen}>
                Upgrade Plan
              </Button>
            </CardContent>

            <Dialog
              open={openPlans}
              onClose={handlePlansClose}
              aria-labelledby="user-view-plans"
              aria-describedby="user-view-plans-description"
              sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
            >
              <DialogTitle
                id="user-view-plans"
                sx={{
                  textAlign: 'center',
                  fontSize: '1.625rem !important',
                  px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                  pt: (theme) => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                }}
              >
                Upgrade Plan
              </DialogTitle>

              <DialogContent sx={{ px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`] }}>
                <DialogContentText sx={{ textAlign: 'center' }} id="user-view-plans-description">
                  Choose the best plan for the user.
                </DialogContentText>
              </DialogContent>

              <DialogContent
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: ['wrap', 'nowrap'],
                  pt: (theme) => `${theme.spacing(2)} !important`,
                  pb: (theme) => `${theme.spacing(8)} !important`,
                  px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
                }}
              >
                <CustomTextField select fullWidth label="Choose Plan" defaultValue="Standard" sx={{ mr: [0, 3], mb: [3, 0] }}>
                  <MenuItem value="Basic">Basic - $0/month</MenuItem>
                  <MenuItem value="Standard">Standard - $99/month</MenuItem>
                  <MenuItem value="Enterprise">Enterprise - $499/month</MenuItem>
                  <MenuItem value="Company">Company - $999/month</MenuItem>
                </CustomTextField>
                <Button variant="contained" sx={{ minWidth: ['100%', 0], mt: 4 }}>
                  Upgrade
                </Button>
              </DialogContent>

              <Divider sx={{ m: '0 !important' }} />

              <DialogContent
                sx={{
                  pt: (theme) => [`${theme.spacing(8)} !important`, `${theme.spacing(8)} !important`],
                  px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                  pb: (theme) => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                }}
              >
                <Typography variant="h6" sx={{ mb: 2, color: (theme) => theme.palette.text.secondary }}>
                  User current plan is standard plan
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: ['wrap', 'nowrap'],
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ mr: 3, display: 'flex', ml: 2.4, position: 'relative' }}>
                    <Sup>$</Sup>
                    <Typography variant="h1" sx={{ mb: -1.2, color: 'primary.main', fontSize: '3rem !important' }}>
                      99
                    </Typography>
                    <Sub>/ month</Sub>
                  </Box>
                  <Button color="error" variant="tonal" sx={{ mt: 2 }} onClick={() => setSubscriptionDialogOpen(true)}>
                    Cancel Subscription
                  </Button>
                </Box>
              </DialogContent>
            </Dialog>
          </Card>
        </Grid>
      </Grid>
    );
  } else {
    return null;
  }
};

export default UserViewLeft;
