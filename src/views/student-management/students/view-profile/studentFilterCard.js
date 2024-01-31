import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import CustomTextField from 'components/mui/text-field';
// import Button from 'themes/overrides/button';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
// import { Button } from '@mui/material';

const StudentFilter = () => {
  const [statusValue, setStatusValue] = useState('');

  const handleStatusValue = (e) => {
    setStatusValue(e.target.value);
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Filters" />

          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <CustomTextField select fullWidth label="Name" SelectProps={{ value: statusValue, onChange: (e) => handleStatusValue(e) }}>
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="downloaded">Downloaded</MenuItem>
                  <MenuItem value="draft">Draft</MenuItem>
                  <MenuItem value="paid">Paid</MenuItem>
                  <MenuItem value="partial payment">Partial Payment</MenuItem>
                  <MenuItem value="past due">Past Due</MenuItem>
                  <MenuItem value="sent">Sent</MenuItem>
                </CustomTextField>
              </Grid>

              <Grid item xs={12} sm={3}>
                <CustomTextField
                  select
                  fullWidth
                  label="Course"
                  SelectProps={{ value: statusValue, onChange: (e) => handleStatusValue(e) }}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="downloaded">Downloaded</MenuItem>
                  <MenuItem value="draft">Draft</MenuItem>
                  <MenuItem value="paid">Paid</MenuItem>
                  <MenuItem value="partial payment">Partial Payment</MenuItem>
                  <MenuItem value="past due">Past Due</MenuItem>
                  <MenuItem value="sent">Sent</MenuItem>
                </CustomTextField>
              </Grid>
              <Grid item xs={12} sm={3}>
                <CustomTextField
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
                </CustomTextField>
              </Grid>
              <Grid item xs={12} sm={3}>
                <CustomTextField
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
                </CustomTextField>
              </Grid>
              <Grid item xs={12} sm={9} />
              <Grid item xs={12} sm={3}>
                <Box component={Link} to={'add'}>
                  <Button variant="contained" fullWidth href="add-new-student">
                    Add New Student
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default StudentFilter;
