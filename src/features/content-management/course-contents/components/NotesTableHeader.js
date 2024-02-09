// ** MUI Imports
import { Grid, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
// ** Icon Imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Icon from 'components/icon';

const NotesHeader = (props) => {
  const { handleFilter, toggle, value } = props;
  const [statusValue, setStatusValue] = useState('');

  const handleStatusValue = (e) => {
    setStatusValue(e.target.value);
  };
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Notes" />
          <CardContent sx={{ pt: 0, pb: 0 }}>
            <Grid container spacing={2} sx={{ alignItems: 'flex-end', justifyContent: 'flex-end', display: 'flex' }}>
              <Grid item xs={12} sx={{ mb: 3 }}>
                <Grid container spacing={4}>
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
                      label="Search Notes"
                      sx={{}}
                      placeholder="Search Notes"
                      onChange={(e) => handleFilter(e.target.value)}
                    />
                  </Grid>

                  <Grid item sm={3} xs={12} sx={{ justifyContent: 'flex-end', alignItems: 'flex-end', mt: 1 }}>
                    <Button fullWidth onClick={toggle} variant="contained" sx={{ '& svg': { mr: 2 } }}>
                      <Icon fontSize="1.125rem" icon="tabler:plus" />
                      Add Notes
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default NotesHeader;
