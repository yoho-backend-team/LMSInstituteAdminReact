import Card from '@mui/material/Card';
import styled from '@emotion/styled';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import CustomChip from 'components/mui/chip';

import { format } from 'date-fns';

const EcommerceStatistics = ({ batchData, theme }) => {

    
    const formatDate = (dateString) => {
      if (!dateString) return '';
      return format(new Date(dateString), 'yyyy/MM/dd'); 
    };

  const CardStyle = styled(Card)(({ theme }) => ({
    borderColor: theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.primary.main,
    background: theme.palette.mode === 'light' ? '#ffffff' : theme.palette.dark.main,
    marginTop: '16px',
    marginBottom: '16px',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: "0 .25rem .875rem 0 rgba(38,43,67,.16)",
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
                    variant="h1"
                    sx={{
                      color: `${theme.palette.mode === 'light' ? theme.palette.dark.main : theme.palette.light}`,
                      fontSize: '1.875rem',
                      fontWeight: 'bold',
                      background: 'linear-gradient(to right, #2563eb, #7c3aed)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      display: 'inline-block', // 
                    }}
                  >
                    {batchData.batch_name}
                  </Typography>
                }
              />

              <CardContent sx={{ mt: 0, pt: 0 }}>

                <Grid container>


                  <Grid item xs={12} sm={7} sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>

                    <Typography variant="h3" sx={{ color: '#4b5563' }}>Course Name :</Typography>
                    <Typography
                      variant="h3"
                      sx={{ color: `${theme.palette.mode === 'light' ? '#4b5563' : theme.palette.light}`, ml: 1 }}
                    >
                      {batchData?.course?.course_name}
                    </Typography>


                    <Typography sx={{ ml: 2 }}>
                      <CustomChip label={batchData.id} color="primary"
                        sx={{
                          background: 'linear-gradient(to right, #3b82f6, #7c3aed)',
                          color: 'white',
                          py: 2,
                          borderRadius: '9999px',
                          fontWeight: 500,
                          textAlign: 'center',
                        }}></CustomChip>
                    </Typography>


                  </Grid>



                  <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <Typography variant="h3" sx={{ color: '#4b5563' }}>Duration:</Typography>
                    <Typography
                      variant="h3"
                      sx={{ ml: 1, color: `${theme.palette.mode === 'light' ? '#4b5563' : theme.palette.light}` }}
                    >
                      {batchData?.course?.duration}
                    </Typography>

                    <Typography variant="h3" sx={{ ml: 0.5, color: '#4b5563' }}>days</Typography>
                  </Grid>


                  <Grid item xs={12} sm={3} sx={{ mt: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                      <CustomChip label={formatDate(batchData.start_date)} size="large" color="secondary" variant="tonal" skin="dark" rounded sx={{
                        background: 'linear-gradient(to right, #3b82f6, #7c3aed)',
                        color: 'white'
                      }} />
                      <div className="connect" />
                      <CustomChip label={formatDate(batchData.end_date)} size="large" color="secondary" variant="tonal" skin="dark" rounded sx={{
                        background: 'linear-gradient(to right, #3b82f6, #7c3aed)',
                        color: 'white'
                      }} />
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
