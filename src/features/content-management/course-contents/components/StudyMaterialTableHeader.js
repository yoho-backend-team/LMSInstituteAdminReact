// ** MUI Imports
import { Grid, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
// ** Icon Imports
import Header from 'components/Header';
import Icon from 'components/icon';

const TableHeader = (props) => {
  // ** Props
  const { handleFilter, toggle, value } = props;
  const [statusValue, setStatusValue] = useState('');

  const handleStatusValue = (e) => {
    setStatusValue(e.target.value);
  };
  return (
    <Grid>
      {/* <DatePickerWrapper>
        <Grid container spacing={6}></Grid>
      </DatePickerWrapper> */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      > 
      <Grid sx={{my:3}}>
      <Header title="Study Materials"  />
      </Grid>
        <Grid container spacing={2} sx={{ alignItems: 'flex-end', justifyContent: 'flex-end', display: 'flex' }}>
          <Grid item xs={12} sx={{mb:3}}>
            <Grid container spacing={4} >
              <Grid item xs={12} sm={3}>
                <TextField select fullWidth label="Status" SelectProps={{ value: statusValue, onChange: (e) => handleStatusValue(e) }}>
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="downloaded">Downloaded</MenuItem>
                  <MenuItem value="draft">Draft</MenuItem>
                  <MenuItem value="paid">Paid</MenuItem>
                  <MenuItem value="partial payment">Partial Payment</MenuItem>
                  <MenuItem value="past due">Past Due</MenuItem>
                  <MenuItem value="sent">Sent</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField select fullWidth label="Course" SelectProps={{ value: statusValue, onChange: (e) => handleStatusValue(e) }}>
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="downloaded">Downloaded</MenuItem>
                  <MenuItem value="draft">Draft</MenuItem>
                  <MenuItem value="paid">Paid</MenuItem>
                  <MenuItem value="partial payment">Partial Payment</MenuItem>
                  <MenuItem value="past due">Past Due</MenuItem>
                  <MenuItem value="sent">Sent</MenuItem>
                </TextField>
              </Grid>
              <Grid item sm={3} xs={12}>
                <TextField
                  fullWidth
                  value={value}
                  label="Search Study Materials"
                  sx={{}}
                  placeholder="Search Study Materials"
                  onChange={(e) => handleFilter(e.target.value)}
                />
              </Grid>

              <Grid item sm={3} xs={12} sx={{ justifyContent: 'flex-end', alignItems: 'flex-end', mt: 1 }}>
                <Button fullWidth onClick={toggle} variant="contained" sx={{ '& svg': { mr: 2 } }}>
                  <Icon fontSize="1.125rem" icon="tabler:plus" />
                  Add Study Material
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default TableHeader;
