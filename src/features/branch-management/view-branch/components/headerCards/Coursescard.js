import PropTypes from 'prop-types';


import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Typography } from '@mui/material';


import MainCard from 'components/cards/MainCard';
import SkeletonEarningCard from 'components/cards/Skeleton/EarningCard';


import Icon from 'components/icon';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.success.dark,
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 184,
    height: 194,
    background: theme.palette.secondary[200],
    borderRadius: '50%',
    top: -107,
    right: -101,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 195,
    height: 223,
    background: theme.palette.info.light,
    borderRadius: '50%',
    top: -154,
    right: -72,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70
    }
  }
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const CoursesCard = ({ isLoading, branchData }) => {
  const theme = useTheme();
  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container sx={{justifyContent:'center',display:'flex'}}>
                  <Grid item xs={6} sx={{ display: "flex", justifyContent: "center"}} >
                    <Avatar  
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: theme.palette.primary[800],
                        mt: 1
                      }}
                    >
                      <Icon icon="tabler:books" color="white" />
                    </Avatar>
                  </Grid>
                  <Grid item xs={6} sx={{ display: "flex", justifyContent: "center",zIndex: 1000}} >
                    <Avatar  
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: theme.palette.primary[800],
                        mt: 1
                      }}
                    >
                      <Icon icon="tabler:users-group" color="white" />
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container xs={12}>
                <Grid item xs={6}>
                  <Box sx={{justifyContent:'center',display:'flex'}}>
                    <Typography sx={{ fontSize: '2rem', fontWeight: 500, mr: 1, mt: 1, mb: 0.75, color: theme.palette.common.white }}>
                      {branchData.courses ?? 0}
                    </Typography>
                  </Box>

                  <Box item sx={{ mb: 1,justifyContent:'center',display:'flex' }}>
                    <Typography
                      sx={{
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: theme.palette.common.white
                      }}
                    >
                      Courses
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{justifyContent:'center',display:'flex'}}>
                    <Typography sx={{ fontSize: '2rem', fontWeight: 500, mr: 1, mt: 1, mb: 0.75, color: theme.palette.common.white }}>
                      {branchData.batches ?? 0}
                    </Typography>
                  </Box>

                  <Box item sx={{ mb: 1,justifyContent:'center',display:'flex' }}>
                    <Typography
                      sx={{
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: theme.palette.common.white
                      }}
                    >
                      Batches
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

CoursesCard.propTypes = {
  isLoading: PropTypes.bool
};

export default CoursesCard;
