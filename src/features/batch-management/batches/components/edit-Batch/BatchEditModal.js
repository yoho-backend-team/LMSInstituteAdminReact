import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField as CustomTextField, Grid } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { forwardRef, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import * as yup from 'yup';
import { updateBatch } from '../../services/batchServices';

const CustomInput = forwardRef((props, ref) => {
  return <CustomTextField fullWidth {...props} inputRef={ref} autoComplete="off" />;
});

const validationSchema = yup.object().shape({
  batch_name: yup
    .string()
    .matches(/^[a-zA-Z0-9\s]+$/, 'Batch Name should not contain special characters')
    .required('Batch Name is required'),
  start_date: yup.date().required('Start Date is required'),
  end_date: yup.date().required('End Date is required'),

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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]);

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

  useEffect(() => {
    if (selectedBatch) {
      setValue('batch_name', selectedBatch?.batch_name || '');
      setValue('start_date', selectedBatch?.start_date || '');
      setValue('end_date', selectedBatch?.end_date || '');
      setValue("students",selectedBatch?.student)
      setSelectedStudents(selectedBatch?.student)
      setStartDate(new Date(selectedBatch?.start_date || null));
      setEndDate(new Date(selectedBatch?.end_date || null));
    }
  }, [selectedBatch, setValue]);
  console.log(selectedBatch,"selectedbatch")
  const handleClose = () => {
    setValue('batch_name', '');
    setValue('start_date', '');
    setValue('end_date', '');
    setValue('students', '');
    handleEditClose();
    reset();
  };

  const onSubmit = async (data) => {
    const inputData = {
      batch_name: data?.batch_name,
      start_date: data?.start_date,
      end_date: data?.end_date,
      student: data?.student,
      uuid : selectedBatch?.uuid
    };
    const result = await updateBatch(inputData);

    if (result.success) {
      toast.success(result.message);
      setBatchRefetch((prev)=>!prev)
      handleEditClose()
      reset()
    } else {
      toast.error(result?.message);
    }
    [ setBatchRefetch];
  };

  const handleStartDateChange = (date) => {
    setValue('startDate', date);
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setValue('endDate', date);
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
                            value={value}
                            label="Batch Name"
                            onChange={onChange}
                            placeholder="Leonard"
                            error={Boolean(errors['batch_name'])}
                            aria-describedby="stepper-linear-personal-institute_batch_name"
                            helperText={errors.batch_name?.message}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="start_date"
                        control={control}
                        render={({ value }) => (
                          <DatePicker
                            selected={startDate}
                            value={value}
                            showYearDropdown
                            showMonthDropdown
                            placeholderText="MM-DD-YYYY"
                            customInput={
                              <CustomInput label="Start Date" error={Boolean(errors.start_date)} helperText={errors.start_date?.message} />
                            }
                            id="form-layouts-separator-date"
                            onChange={handleStartDateChange}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="end_date"
                        control={control}
                        render={({ value }) => (
                          <DatePicker
                            selected={endDate}
                            value={value}
                            showYearDropdown
                            showMonthDropdown
                            placeholderText="MM-DD-YYYY"
                            customInput={
                              <CustomInput label="End Date" error={Boolean(errors.end_date)} helperText={errors.end_date?.message} />
                            }
                            id="form-layouts-separator-date"
                            onChange={handleEndDateChange}
                          />
                        )}
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
                            options={selectedBatch?.student}
                            getOptionLabel={(option) => option?.full_name}
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
                              setSelectedStudents(newValue);
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

BatchEditModal.propTypes = {
  open: PropTypes.any,
  handleEditClose: PropTypes.any,
  selectedBatch: PropTypes.any,
  setBatchRefetch: PropTypes.any
};

export default BatchEditModal;
