import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const EcommerceStatistics = ({ batchData, theme }) => {
  console.log('batchData2:', batchData);

  const renderStats = () => {
    return (
      <Grid item xs={12} md={12}>
        <Grid container>
          <Grid item xs={12}>
            <Card>
              <CardHeader
                title={
                  <Typography variant="h4" sx={{ color: theme.palette.primary.main }}>
                    {batchData.batch_name}
                  </Typography>
                }
              />
              <CardContent sx={{ mt: 0, pt: 0 }}>
                <Grid container spacing={4}>
                  <Grid item>
                    <Typography variant="h5" sx={{ color: 'grey.500' }}>
                      Course Name
                    </Typography>
                    <Typography variant="h4" sx={{ mt: 1 }}>
                      {batchData?.institute_course?.institute_course_branch?.course_name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" sx={{ color: 'grey.500' }}>
                      Batch id
                    </Typography>
                    <Typography variant="h4" sx={{ mt: 1 }}>
                      {batchData.batch_id}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" sx={{ color: 'grey.500' }}>
                      Duration
                    </Typography>
                    <Typography variant="h4" sx={{ mt: 1 }}>
                      {batchData?.institute_course?.institute_course_branch?.course_duration}
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Typography variant="h5" sx={{ color: 'grey.500' }}>
                      Sarted Date
                    </Typography>
                    <Typography variant="h4" sx={{ mt: 1 }}>
                      {batchData.start_date}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" sx={{ color: 'grey.500' }}>
                      Ended Date
                    </Typography>
                    <Typography variant="h4" sx={{ mt: 1 }}>
                      {batchData.end_date}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid container spacing={6}>
      {renderStats()}
    </Grid>
  );
};

EcommerceStatistics.propTypes = {
  batchData: PropTypes.any,
  theme: PropTypes.any,
};

export default EcommerceStatistics;
