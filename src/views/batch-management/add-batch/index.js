// material-ui
import { Button, Grid, Typography } from '@mui/material';
import StudentTableList from 'features/batch-management/add-batch/components/StudentTableList';
import DatePickerWrapper from 'styles/libs/react-datepicker';

// ==============================|| SAMPLE PAGE ||============================== //
// ** React Imports
import { forwardRef, useState } from 'react';

// ** MUI Imports
import Card from '@mui/material/Card';

import MenuItem from '@mui/material/MenuItem';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
// ** Custom Component Import
import { TextField as CustomTextField } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

// ** Third Party Imports
import DatePicker from 'react-datepicker';
import CustomChip from 'components/mui/chip';

const CustomInput = forwardRef((props, ref) => {
  return <CustomTextField fullWidth {...props} inputRef={ref} autoComplete="off" />;
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
};
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
const AddBatchPage = () => {
  // ** States
  const [date, setDate] = useState(null);

  const [selectedBranches, setSelectedBranches] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const handleBranchChange = (event) => {
    setSelectedBranches(event.target.value);
  };

  const handleStudentsChange = (event) => {
    setSelectedStudents(event.target.value);
  };
  return (
    <Grid container spacing={4} sx={{ p: 1 }}>
      <Grid item xs={12}>
        <Typography variant="h3">Create a new batch</Typography>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Typography variant="h4">Details</Typography>
        <Typography sx={{ color: 'text.secondary' }}>Name, start date, end date</Typography>
      </Grid>
      <Grid item xs={12} sm={9}>
        <DatePickerWrapper>
          <Card>
            <form onSubmit={(e) => e.preventDefault()}>
              <CardContent>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={12}>
                    <CustomTextField fullWidth label="Batch Name" placeholder="carterLeonard" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      selected={date}
                      showYearDropdown
                      showMonthDropdown
                      placeholderText="MM-DD-YYYY"
                      customInput={<CustomInput label="Start Date" />}
                      id="form-layouts-separator-date"
                      onChange={(date) => setDate(date)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      selected={date}
                      showYearDropdown
                      showMonthDropdown
                      placeholderText="MM-DD-YYYY"
                      customInput={<CustomInput label="End Date" />}
                      id="form-layouts-separator-date"
                      onChange={(date) => setDate(date)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      select
                      fullWidth
                      label="Branch"
                      id="select-multiple-checkbox"
                      SelectProps={{
                        MenuProps,
                        multiple: true,
                        value: selectedBranches,
                        onChange: (e) => handleBranchChange(e),
                        renderValue: (selected) => selected.join(', ')
                      }}
                    >
                      {names.map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox checked={selectedBranches.indexOf(name) > -1} />
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                    </CustomTextField>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <CustomTextField select fullWidth label="Course" id="form-layouts-separator-select" defaultValue="">
                      <MenuItem value="UK">UK</MenuItem>
                      <MenuItem value="USA">USA</MenuItem>
                      <MenuItem value="Australia">Australia</MenuItem>
                      <MenuItem value="Germany">Germany</MenuItem>
                    </CustomTextField>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <CustomTextField
                      select
                      fullWidth
                      label="Students"
                      id="select-multiple-chip"
                      SelectProps={{
                        MenuProps,
                        multiple: true,
                        value: selectedStudents,
                        onChange: (e) => handleStudentsChange(e),
                        renderValue: (selected) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            {selected.map((value) => (
                              <CustomChip key={value} label={value} sx={{ m: 0.75 }} skin="light" color="primary" />
                            ))}
                          </Box>
                        )
                      }}
                    >
                      {names.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </CustomTextField>
                  </Grid>
                </Grid>
              </CardContent>
            </form>
          </Card>
        </DatePickerWrapper>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4">Students List</Typography>
        <Typography sx={{ color: 'text.secondary' }}>Check, remove student</Typography>
      </Grid>
      <Grid item xs={12}>
        <StudentTableList />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained">Create Batch</Button>
      </Grid>
    </Grid>
  );
};

export default AddBatchPage;
