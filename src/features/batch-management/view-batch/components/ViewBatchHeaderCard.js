import Card from '@mui/material/Card';
import styled from '@emotion/styled';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import CustomChip from 'components/mui/chip';

const EcommerceStatistics = ({ batchData, theme }) => {
  console.log('batchData2:', batchData);
  const CardStyle = styled(Card)(({ theme }) => ({
    borderColor: theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.primary.main,
    background: theme.palette.mode === 'light' ? theme.palette.secondary.light : theme.palette.dark.main,
    marginTop: '16px',
    marginBottom: '16px',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
      content: '""',
      position: 'absolute',
      width: '289px',
      height: '200px',
      borderColor: theme.palette.primary.main,
      top: '-27px',
      right: '-8px'
    }
  }));

  const renderStats = () => {
    return (
      <Grid item xs={12} md={12}>
        <Grid container>
          <Grid item xs={12}>
            <CardStyle>
              <CardHeader
                title={
                  <Typography
                    variant="h3"
                    sx={{
                      color: `${theme.palette.mode === 'light' ? theme.palette.dark.main : theme.palette.light}`
                    }}
                  >
                    {batchData.batch_name}
                  </Typography>
                }
              />
              <CardContent sx={{ mt: 0, pt: 0 }}>
                <Grid container>
                  <Grid item xs={12} sm={5} sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <Typography variant="h5">Course Name :</Typography>
                    <Typography
                      variant="h5"
                      sx={{ color: `${theme.palette.mode === 'light' ? theme.palette.dark.main : theme.palette.light}`, ml: 1 }}
                    >
                      {batchData?.institute_course?.institute_course_branch?.course_name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <Typography>
                      <CustomChip label={batchData.batch_id} rounded color="primary" variant="contained"></CustomChip>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <Typography variant="h5">Duration:</Typography>
                    <Typography
                      variant="h4"
                      sx={{ ml: 1, color: `${theme.palette.mode === 'light' ? theme.palette.dark.main : theme.palette.light}` }}
                    >
                      {batchData?.institute_course?.institute_course_branch?.course_duration}
                    </Typography>
                    <Typography sx={{ ml: 0.5 }}>days</Typography>
                  </Grid>
                  <Grid item xs={12} sm={3} sx={{ mt: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                      <CustomChip label={batchData.start_date} size="large" color="secondary" variant="tonal" skin="dark" rounded />
                      <div className="connect" />
                      <CustomChip label={batchData.end_date} size="large" color="secondary" variant="tonal" skin="dark" rounded />
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </CardStyle>
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
  theme: PropTypes.any
};

export default EcommerceStatistics;
