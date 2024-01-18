// ** React Imports
import { useState } from 'react';

// ** MUI Imports
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import MenuItem from '@mui/material/MenuItem';
// ** Custom Component Import
import { TextField as CustomTextField } from '@mui/material';

// ** Third Party Imports
import CustomChip from 'components/mui/chip';

// const CustomInput = forwardRef((props, ref) => {
//   return <CustomTextField fullWidth {...props} inputRef={ref} autoComplete="off" />;
// });

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
const AddBranchForms = () => {
  // ** States
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
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12}>
              <CustomTextField fullWidth label=" Branch Name" placeholder="carterLeonard" />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextField fullWidth type="number" label="Phone No." placeholder="123-456-7890" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField fullWidth type="number" label=" Alternate Phone No." placeholder="123-456-7890" />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField multiline rows={3} fullWidth label="Address" placeholder="1456, Liberty Street" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField fullWidth type="number" label="PIN Code" placeholder="612503" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField fullWidth label="Landmark" placeholder="Nr. Wall Street" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField fullWidth label="City" placeholder="Kumbakonam" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField fullWidth label="State" placeholder="TamilNadu" />
            </Grid>

            <Grid item xs={12} sm={12}>
              <CustomTextField
                select
                fullWidth
                label="Courses"
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

export default AddBranchForms;
