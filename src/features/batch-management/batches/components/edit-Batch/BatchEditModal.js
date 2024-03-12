// material-ui
import { Button, Grid } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Controller, useForm } from 'react-hook-form';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import * as yup from 'yup';
// ** React Imports
import { forwardRef, useState, useEffect } from 'react';
// ** MUI Imports
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
// ** Custom Component Import
import { TextField as CustomTextField } from '@mui/material';
// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup';
import Autocomplete from '@mui/material/Autocomplete';
import DatePicker from 'react-datepicker';
import toast from 'react-hot-toast';
import { updateBatch } from '../../services/batchServices';

const CustomInput = forwardRef((props, ref) => {
  return <CustomTextField fullWidth {...props} inputRef={ref} autoComplete="off" />;
});

const validationSchema = yup.object().shape({
  batch_name: yup.string().required('Batch Name is required'),
  startDate: yup.date().required('Start Date is required'),
  endDate: yup.date().required('End Date is required'),

  students: yup
    .array()
    .min(1, 'Please select at least one Student')
    .test({
      name: 'atLeastOneStudent',
      message: 'Please select at least one Student',
      test: (value) => value && value.length > 0
    })
    .nullable()
});

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder'
];

const BatchEditModal = ({ open, handleEditClose, selectedBatch, setBatchRefetch }) => {
  // ** States
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [selectedStudents, setSelectedStudents] = useState([]);

  console.log(setSelectedStudents);

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',

    resolver: yupResolver(validationSchema)
  });

  // Set form values when selectedBranch changes
  useEffect(() => {
    if (selectedBatch) {
      setValue('batch_name', selectedBatch.batch.batch_name || '');
      setValue('start_date', selectedBatch.batch.start_date || '');
      setValue('end_date', selectedBatch.batch.end_date || '');
      setValue('students', selectedBatch.batch.students || '');
    }
  }, [selectedBatch, setValue]);
  const handleClose = () => {
    setValue('batch_name', '');
    setValue('start_date', '');
    setValue('end_date', '');
    setValue('students', '');
    handleEditClose();
    reset();
  };

 

  const onSubmit = async (data) => {
    console.log(data);

    const inputData = {
      batch_name: data?.batch_name,
      start_date: data?.start_date,
      end_date: data?.end_date,
      students: data?.students
    };
    const result = await updateBatch(inputData);

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
    [batches, setBatchRefetch];
  };

  // Form submission handler
  // const onSubmit = useCallback(
  //   async (data) => {
  //     // const inputData = new FormData();
  //     inputData.append('batch_name', batches?.batch?.batch_name);
  //     // inputData.append('logo', selectedImage);
  //     inputData.append('category_name', data?.batch_name);

  //     try {
  //       const result = await updateBatch(inputData);
  //       if (result.success) {
  //         setBatchRefetch((state) => !state);
  //         toast.success(result.message);
  //       } else {
  //         toast.error(result.message);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  //   [batches, setBatchRefetch]
  //   );

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="user-view-edit"
        aria-describedby="user-view-edit-description"
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 800 } }}
      >
        <DialogTitle
          id="user-view-edit"
          sx={{
            textAlign: 'center',
            fontSize: '1.5rem !important',
            px: (theme) => [`${theme.spacing(3)} !important`, `${theme.spacing(3)} !important`],
            pt: (theme) => [`${theme.spacing(3)} !important`, `${theme.spacing(3)} !important`]
          }}
        >
          Edit Batch
        </DialogTitle>
        <DialogContent
          sx={{
            pt: (theme) => [`${theme.spacing(3)} !important`, `${theme.spacing(2)} !important`],
            pb: (theme) => `${theme.spacing(3)} !important`,
            px: (theme) => [`${theme.spacing(3)} !important`, `${theme.spacing(4)} !important`]
          }}
        >
          <Grid item xs={12} sm={9}>
            <DatePickerWrapper>
              <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={12}>
                      <Controller
                        name="batch_name"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            fullWidth
                            defaultValue={value}
                            // defaultValue={selectedBatch?.batch?.batch_name}
                            label="Batch Name"
                            onChange={onChange}
                            placeholder="carterLeonard"
                            error={Boolean(errors.batch_name)}
                            helperText={errors.batch_name?.message}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <DatePicker
                        selected={startDate}
                        showYearDropdown
                        showMonthDropdown
                        placeholderText="MM-DD-YYYY"
                        customInput={
                          <CustomInput
                            label="Start Date"
                            defaultValue={selectedBatch?.batch?.start_date}
                            error={Boolean(errors.startDate)}
                            helperText={errors.startDate?.message}
                          />
                        }
                        id="form-layouts-separator-date"
                        onChange={handleStartDateChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <DatePicker
                        selected={endDate}
                        defaultValue={''}
                        showYearDropdown
                        showMonthDropdown
                        placeholderText="MM-DD-YYYY"
                        customInput={
                          <CustomInput
                            label="End Date"
                            defaultValue={''}
                            error={Boolean(errors.endDate)}
                            helperText={errors.endDate?.message}
                          />
                        }
                        id="form-layouts-separator-date"
                        onChange={handleEndDateChange}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <Controller
                        name="students"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <Autocomplete
                            multiple
                            id="students-autocomplete"
                            options={names}
                            getOptionLabel={(option) => option}
                            renderInput={(params) => (
                              <CustomTextField
                                {...params}
                                value={value}
                                onChange={onChange}
                                label="Students"
                                fullWidth
                                error={Boolean(errors.students)}
                                helperText={errors.students?.message}
                              />
                            )}
                            value={selectedStudents}
                            onChange={(event, newValue) => {
                              setValue('students', newValue);
                            }}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                  <Box>
                    <Button type="submit" variant="contained" sx={{ mr: 3 }}>
                      Update
                    </Button>
                    <Button variant="tonal" color="error" onClick={handleClose}>
                      Cancel
                    </Button>
                  </Box>
                </Grid>
              </form>
            </DatePickerWrapper>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BatchEditModal;
