// ** React Imports
import { forwardRef, useState } from 'react';

// ** MUI Imports
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

import MenuItem from '@mui/material/MenuItem';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
// ** Custom Component Import
import { TextField as CustomTextField } from '@mui/material';

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

const FormLayoutsSeparator = () => {
  // ** States
  const [date, setDate] = useState(null);
  const [personName, setPersonName] = useState([]);
  //   const [personNameNative, setPersonNameNative] = useState([]);

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  return (
    <Card>
      {/* <CardHeader title="Multi Column with Form Separator" />
      <Divider sx={{ m: '0 !important' }} /> */}
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
            <Grid item xs={12} sm={12}>
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
                  value: personName,
                  onChange: (e) => handleChange(e),
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
  );
};

export default FormLayoutsSeparator;
