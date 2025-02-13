// ** MUI Imports
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material';
import MainCard from 'components/cards/MainCard';


import Icon from 'components/icon';
import OptionsMenu from 'components/option-menu';
import CustomAvatar from 'components/mui/avatar';

const data = [
  {
    subtitle: '142',
    title: 'New Tickets',
    avatarIcon: 'tabler:ticket'
  },
  {
    subtitle: '28',
    avatarColor: 'info',
    title: 'Open Tickets',
    avatarIcon: 'tabler:circle-check'
  },
  {
    subtitle: '1 Day',
    title: ' Average Response Time',
    avatarColor: 'warning',
    avatarIcon: 'tabler:clock'
  }
];
const CardWrapper = styled(MainCard)(({ theme }) => ({

  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 223,
    height: 217,
    background: theme.palette.primary.dark,
    borderRadius: '50%',
    bottom: -125,
    right: -101,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 200,
    height: 200,
    background: theme.palette.secondary.dark,
    borderRadius: '50%',
    top: -139,
    left: -116,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70
    }
  }
}));

const SupportTicket = () => {
  return (
    <CardWrapper>
      <CardHeader
        title="Support Tickets"
        subheader="Last 7 Days"
        action={<OptionsMenu options={['Refresh', 'Edit', 'Share']} iconButtonProps={{ size: 'small', sx: { color: 'text.disabled' } }} />}
      />
      <CardContent>
        <Grid container>
          <Grid item xs={12} >
            <Typography variant="h1">164</Typography>
            <Typography sx={{ mb: 4, color: 'text.secondary' }}>Total Tickets</Typography>
            {data.map((item, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: index !== data.length - 1 ? 4 : undefined }}>
                <CustomAvatar skin="light" variant="rounded" color={item.avatarColor} sx={{ mr: 4, width: 34, height: 34 }}>
                  <Icon icon={item.avatarIcon} />
                </CustomAvatar>
                <Box sx={{
        backgroundColor: '#e3f2fd', 
        borderRadius: 2,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        width:"250px",
          height:"100px",
          paddingLeft:"10px", 
          paddingTop:"10px",
          color:"black", 
        '&:hover': {
          backgroundColor: '#bbdefb', 
          transform: 'scale(1.02)', 
          boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
          
        }
      }}>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                    {item.subtitle}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Grid>
        </Grid>
      </CardContent>
    </CardWrapper>
  );
};

export default SupportTicket;
