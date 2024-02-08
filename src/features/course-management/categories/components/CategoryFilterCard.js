import {useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import { TextField } from '@mui/material';
import DatePickerWrapper from 'styles/libs/react-datepicker';

const CategoryFilter = () => {

  const [statusValue, setStatusValue] = useState('');

  const handleStatusValue = (e) => {
    setStatusValue(e.target.value);
  };

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Course Categories" />
            <CardContent sx={{pt:0}}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Status"
                    SelectProps={{ value: statusValue, onChange: (e) => handleStatusValue(e) }}
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="downloaded">Downloaded</MenuItem>
                    <MenuItem value="draft">Draft</MenuItem>
                    <MenuItem value="paid">Paid</MenuItem>
                    <MenuItem value="partial payment">Partial Payment</MenuItem>
                    <MenuItem value="past due">Past Due</MenuItem>
                    <MenuItem value="sent">Sent</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Categories"
                    SelectProps={{ value: statusValue, onChange: (e) => handleStatusValue(e) }}
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="downloaded">Downloaded</MenuItem>
                    <MenuItem value="draft">Draft</MenuItem>
                    <MenuItem value="paid">Paid</MenuItem>
                    <MenuItem value="partial payment">Partial Payment</MenuItem>
                    <MenuItem value="past due">Past Due</MenuItem>
                    <MenuItem value="sent">Sent</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  );
};

export default CategoryFilter;
