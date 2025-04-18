import PropTypes from 'prop-types';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'components/cards/MainCard';
import SkeletonEarningCard from 'components/cards/Skeleton/EarningCard';

// assets
import Icon from 'components/icon';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
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
    background: theme.palette.secondary.light,
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

const PaymentsCard = ({ isLoading, branchData }) => {
  const theme = useTheme();
  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <CardWrapper border={false} content={false} sx={{ boxShadow: "0 .25rem .875rem 0 rgba(38,43,67,.16)"}} >
          <Box sx={{ p: 2 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container sx={{display:'flex'}}>
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
                      <Icon icon="tabler:coin-rupee" color="white" />
                    </Avatar>
                  </Grid>
                  <Grid item xs={6} sx={{ display: "flex", justifyContent: 'center',zIndex:1000}}>
                    <Avatar  
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: theme.palette.primary[800],
                        mt: 1
                      }}
                    >
                      <Icon icon="tabler:credit-card-pay" color="white" />
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container xs={12}>
                <Grid item xs={6}>
                  <Box sx={{justifyContent:'center',display:'flex'}}>
                    <Typography sx={{ fontSize: '2rem', fontWeight: 500, mr: 1, mt: 1, mb: 0.75, color: theme.palette.common.white }}>
                      {branchData.profits ?? 0}
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
                      Profits
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{justifyContent:'center',display:'flex'}}>
                    <Typography sx={{ fontSize: '2rem', fontWeight: 500, mr: 1, mt: 1, mb: 0.75, color: theme.palette.common.white }}>
                      {branchData.payouts ?? 0}
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
                      Payouts
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

PaymentsCard.propTypes = {
  isLoading: PropTypes.bool
};

export default PaymentsCard;
