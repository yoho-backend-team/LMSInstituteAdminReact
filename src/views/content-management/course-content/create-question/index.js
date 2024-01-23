import { Box, Button, Card, CardContent, Grid, MenuItem, Typography } from '@mui/material';
import React from 'react';
import { useTheme } from '@mui/material';
// import CustomTextField from 'components/mui/text-field';
import { TextField as CustomTextField } from '@mui/material';
import CustomMultiSelectOptions from './CustomMultiSelectOptions';
const CreateQuestion = () => {
  const theme = useTheme();
  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h3">Create a new question</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" sx={{ my: 4 }}>
              Select topic
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Box
                  sx={{
                    minHeight: 150,
                    backgroundColor: theme.palette.secondary.light,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5,
                    // borderWidth: 6,
                    border: '3px solid',
                    borderColor: theme.palette.secondary.dark
                  }}
                >
                  <Typography variant="h4">1.Waterfall approach</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box
                  sx={{
                    minHeight: 150,
                    backgroundColor: theme.palette.secondary.light,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5
                  }}
                >
                  <Typography variant="h4" sx={{ color: theme.palette.primary.main }}>
                    1.Waterfall approach
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box
                  sx={{
                    minHeight: 150,
                    backgroundColor: theme.palette.secondary.light,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5
                  }}
                >
                  <Typography variant="h4">1.Waterfall approach</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box
                  sx={{
                    minHeight: 150,
                    backgroundColor: theme.palette.secondary.light,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5
                  }}
                >
                  <Typography variant="h4">1.Waterfall approach</Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button size="large" sx={{ my: 3 }}>
                + Create New Topic
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4">Enter question details</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              value={''}
              label="Question Type"
              // onChange={onChange}
              placeholder="carterLeonard"
              select
            >
              <MenuItem>Multi-selection questions</MenuItem>
              <MenuItem>Multi-option questions</MenuItem>
            </CustomTextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              value={''}
              label="Question difficulty level"
              // onChange={onChange}
              placeholder="carterLeonard"
              select
            >
              <MenuItem>Multi-selection questions</MenuItem>
              <MenuItem>Multi-option questions</MenuItem>
            </CustomTextField>
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              value={''}
              label="Question"
              // onChange={onChange}
              placeholder="carterLeonard"
            ></CustomTextField>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4">Enter the options</Typography>
            <Typography variant="h6">Mark the correct options</Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <CustomMultiSelectOptions />
          </Grid>
          <Grid item xs={12}>
            <Button size="large" sx={{}}>
              + Add Option
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ mt: 3 }}>
            <Button size="large" variant="contained" sx={{}}>
              Create
            </Button>
            <Button size="large" sx={{ ml: 3 }}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CreateQuestion;
