import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, TextField, Tooltip, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Icon from 'components/icon';
import { getActiveBranches } from 'features/branch-management/services/branchServices';
import { getAllCourses } from 'features/course-management/courses-page/services/courseServices';
import { getAllActiveTeachingStaffs } from 'features/staff-management/teaching-staffs/services/teachingStaffServices';
import PropTypes from 'prop-types';
import { forwardRef, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import * as yup from 'yup';
import { addTeachingStaffSalary } from '../teaching-staffs/services/teachingStaffSalariesServices';
import { useInstitute } from 'utils/get-institute-details';
import { getAllActiveNonTeachingStaffs } from 'features/staff-management/non-teaching-staffs/services/nonTeachingStaffServices';
import zIndex from '@mui/material/styles/zIndex';

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}));

const schema = yup.object().shape({
  branch: yup.string().required('Branch is required'),
  staff_type: yup.string().required('Batch is required'),
  staff: yup.object().required('Students is required'),
  payment_date: yup.string().required('Payment Date is required'),
  transaction_id: yup.number().required('Transaction Id is required').typeError('Transaction Id must be a number'),
  salary_amount: yup.number().typeError('Paid Amount must be a number').required('Paid Amount is required')
});

const defaultValues = {
  branch: '',
  staff_type: '',
  staff: '',
  payment_date: ''
};

const FeesAddDrawer = (props) => {
  // ** Props
  const { open, toggle, setRefetch } = props;
  // ** State
  const [inputValue, setInputValue] = useState('');
  const image =
    'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg';
  const [imgSrc, setImgSrc] = useState(image);
  const [selectedImage, setSelectedImage] = useState('');
  const [activeCourse, setActiveCourse] = useState([]);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const [activeBranches, setActiveBranches] = useState([]);
  const [activeStaffs, setActiveStaffs] = useState([]);
  useEffect(() => {
    getActiveBranchesByUser();
  }, []);

  useEffect(() => {
    getActiveStaffsByBranch(selectedBranchId);
  }, [selectedBranchId]);

  const getActiveBranchesByUser = async () => {
    const result = await getActiveBranches();
    setActiveBranches(result.data);
  };

  const getActiveStaffsByBranch = async (selectedBranchId, type) => {
    let result;
    if (type === 'Teaching') {
      result = await getAllActiveTeachingStaffs({ branch_id: selectedBranchId });
    } else {
      result = await getAllActiveNonTeachingStaffs({ branch_id: selectedBranchId });
    }

    setActiveStaffs(result.data);
    console.log(result.data);
  };

  const getActiveCoursesByBranch = async (data) => {
    const result = await getAllCourses(data);

    if (result?.data) {
      setActiveCourse(result?.data);
    }
  };

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  function convertDateFormat(input) {
    var originalDate = new Date(input);
    var year = originalDate.getFullYear();
    var month = ('0' + (originalDate.getMonth() + 1)).slice(-2);
    var day = ('0' + originalDate.getDate()).slice(-2);
    var formattedDateString = year + '-' + month + '-' + day;
    return formattedDateString;
  }

  const handleClose = () => {
    setValue('contact', Number(''));
    setValue('imgSrc', '');
    setImgSrc('');
    reset();
    toggle();
  };

  const onSubmit = async (data) => {
    const branch = activeBranches.filter((i) => i.branch_identity === data.branch);

    const InputData = {
      staff: data.staff._id,
      branch_name: data.branch_id,
      branch_id: branch[0].uuid,
      institute_id: useInstitute().getInstituteId(),
      salary_amount: data.salary_amount,
      staff_type: data.staff_type,
      balance: data.balance,
      transaction_id: data.transaction_id,
      payment_date: new Date()
    };
    const result = await addTeachingStaffSalary(InputData);
    if (result.success) {
      toast.success(result.message);
      handleClose();
      setRefetch((state) => !state);
    } else {
      let errorMessage = '';
      Object.values(result.message).forEach((errors) => {
        errors.forEach((error) => {
          errorMessage += `${error}\n`;
        });
      });
      toast.error(errorMessage.trim());
    }
  };

  const CustomInput = forwardRef(({ ...props }, ref) => {
    // ** Props
    const { label, readOnly } = props;

    return <TextField {...props} fullWidth inputRef={ref} label={label || ''} {...(readOnly && { inputProps: { readOnly: true } })} />;
  });

  const [isBranchSelected, setIsBranchSelected] = useState(false);
  const [isStaffTypeSelected, setIsStaffTypeSelected] = useState(false);
  const [isStaffSelected, setIsStaffSelected] = useState(false);

  return (
    <DatePickerWrapper>
      <Drawer
        open={open}
        anchor="right"
        variant="temporary"
        onClose={handleClose}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', xs: 300, sm: 500 } } }}
      >
        <Header>
          <Typography variant="h4" sx={{ outline: 1.5, outlineColor: '#0cce7f', px: 2, py: 1, borderRadius: '50px' }}>
            Add Salaries
          </Typography>
          <IconButton
            size="small"
            onClick={handleClose}
            sx={{
              p: '0.438rem',
              borderRadius: 1,
              color: 'text.primary',
              backgroundColor: 'action.selected',
              '&:hover': {
                backgroundColor: (theme) => `rgba(${theme.palette.secondary.main}, 0.16)`
              }
            }}
          >
            <Icon icon="tabler:x" fontSize="1.125rem" />
          </IconButton>
        </Header>
        <Box sx={{ p: (theme) => theme.spacing(0, 6, 6) }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
              <ImgStyled src={imgSrc} alt="Profile Pic" />
              <div>
                <ButtonStyled component="label" variant="contained" htmlFor="account-settings-upload-image">
                  Upload
                  <input
                    hidden
                    type="file"
                    value={inputValue}
                    accept="image/png, image/jpeg"
                    onChange={handleInputImageChange}
                    id="account-settings-upload-image"
                  />
                </ButtonStyled>
              </div>
            </Box> */}

            <Grid item xs={12} sx={{ mb: 2 }}>
              <Controller
                name="branch"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Autocomplete
                    fullWidth
                    options={activeBranches ? activeBranches : []}
                    getOptionLabel={(branch) => branch.branch_identity}
                    onChange={(event, newValue) => {
                      onChange(newValue?.branch_identity);
                      getActiveCoursesByBranch({ branch_id: newValue?.uuid });
                      if (!isBranchSelected) {
                        setIsBranchSelected(true);
                      }
                    }}
                    value={activeBranches.find((branch) => branch.branch_identity === value) || null}
                    renderInput={(params) => (
                      <TextField {...params} label="Select Branch" error={Boolean(errors.branch)} helperText={errors.branch?.message} />
                    )}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sx={{ mb: 2 }}>
              <Controller
                name="staff_type"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Autocomplete
                    fullWidth
                    value={value}
                    onChange={(e, newValue) => {
                      onChange(newValue);
                      getActiveStaffsByBranch(selectedBranchId, newValue);
                      if (!isStaffTypeSelected) {
                        setIsStaffTypeSelected(true);
                      }
                    }}
                    options={['Teaching', 'Non Teaching']}
                    disabled={!isBranchSelected}
                    renderInput={(params) => (
                      <Tooltip title={isBranchSelected ? '' : 'Please select a branch first'} arrow>
                        <span>
                          <TextField
                            {...params}
                            label="Select Staff Type"
                            error={Boolean(errors.staff_type)}
                            helperText={errors.staff_type?.message}
                            disabled={!isBranchSelected}
                            sx={{
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: isBranchSelected ? 'inherit' : '#EBEBE4'
                              }
                            }}
                          />
                        </span>
                      </Tooltip>
                    )}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sx={{ mb: 2 }}>
              <Controller
                name="staff"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Autocomplete
                    fullWidth
                    value={value || null} // Ensure value is not undefined
                    onChange={(event, newValue) => {
                      onChange(newValue || null);
                      if (!isStaffSelected) {
                        setIsStaffSelected(true);
                      }
                    }} // Handle null values
                    options={activeStaffs || []} // Ensure options is always an array
                    getOptionLabel={(staff) => staff?.full_name || ''} // Handle undefined staff
                    disabled={!isStaffTypeSelected}
                    renderInput={(params) => (
                      <Tooltip title={isBranchSelected ? '' : 'Please select a branch first'} arrow>
                        <span>
                          <TextField
                            {...params}
                            label="Select Staff"
                            error={Boolean(errors.staff)}
                            helperText={errors.staff?.message}
                            disabled={!isStaffTypeSelected}
                            sx={{
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: isStaffTypeSelected ? 'inherit' : '#EBEBE4'
                              }
                            }}
                          />
                        </span>
                      </Tooltip>
                    )}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6} sx={{ mb: 2 }}>
              <Controller
                name="payment_date"
                control={control}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: isStaffSelected ? 'inherit' : '#EBEBE4'
                  }
                }}
                render={({ field: { value, onChange } }) => (
                  <Tooltip title={isBranchSelected ? '' : 'Please select a branch first'} arrow>
                    <span>
                      <DatePicker
                        selected={value}
                        id="basic-input"
                        className="full-width-datepicker"
                        onChange={onChange}
                        disabled={!isStaffSelected}
                        placeholderText="Click to select a date"
                        customInput={<CustomInput label="Payment Date" sx />}
                        sx={{
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: isStaffSelected ? 'inherit' : '#EBEBE4'
                          }
                        }}
                      />
                    </span>
                  </Tooltip>
                )}
              />
              {errors.payment_date && (
                <p style={{ color: 'red', margin: '5px 0 0', fontSize: '0.875rem' }}>{errors.payment_date.message}</p>
              )}
            </Grid>

            <Grid item xs={12} sm={12}>
              <Controller
                name="transaction_id"
                control={control}
                render={({ field }) => (
                  <Tooltip title={isBranchSelected ? '' : 'Please select a branch first'} arrow>
                    <span>
                      <TextField
                        {...field}
                        sx={{
                          mb: 2,
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: isStaffSelected ? 'inherit' : '#EBEBE4'
                          }
                        }}
                        fullWidth
                        label="Transaction Id"
                        type="number"
                        error={Boolean(errors.transaction_id)}
                        helperText={errors.transaction_id?.message}
                        disabled={!isStaffSelected}
                      />
                    </span>
                  </Tooltip>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Controller
                name="salary_amount"
                control={control}
                render={({ field }) => (
                  <Tooltip title={isBranchSelected ? '' : 'Please select a branch first'} arrow>
                    <span>
                      <TextField
                        {...field}
                        fullWidth
                        label="salary amount"
                        type="number"
                        error={Boolean(errors.salary_amount)}
                        helperText={errors.salary_amount?.message}
                        disabled={!isStaffSelected}
                        sx={{
                          mb: 2,
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: isStaffSelected ? 'inherit' : '#EBEBE4'
                          }
                        }}
                      />
                    </span>
                  </Tooltip>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Controller
                name="balance"
                control={control}
                render={({ field }) => (
                  <Tooltip title={isBranchSelected ? '' : 'Please select a branch first'} arrow>
                    <span>
                      <TextField
                        {...field}
                        fullWidth
                        label="Balance"
                        type="number"
                        error={Boolean(errors.balance)}
                        helperText={errors.balance?.message}
                        disabled={!isStaffSelected}
                        sx={{
                          mb: 2,
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: isStaffSelected ? 'inherit' : '#EBEBE4'
                          }
                        }}
                      />
                    </span>
                  </Tooltip>
                )}
              />
            </Grid>

            <Box sx={{ display: 'flex', alignItems: 'center', mt: 4 }}>
              <Button type="submit" variant="contained" sx={{ mr: 3 }}>
                Submit
              </Button>
              <Button variant="tonal" color="secondary" onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Drawer>
    </DatePickerWrapper>
  );
};
FeesAddDrawer.propTypes = {
  open: PropTypes.any,
  toggle: PropTypes.any,
  setRefetch: PropTypes.any
};
export default FeesAddDrawer;
