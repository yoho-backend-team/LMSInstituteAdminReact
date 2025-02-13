// ** MUI Imports
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

// ** Icon Imports
import Icon from 'components/icon';

// ** Custom Components Imports
import CustomAvatar from 'components/mui/avatar';

const data = [
  {
    stats: '230',
    title: 'Online',
    color: 'primary',
    icon: 'tabler:books'
  },
  {
    color: 'info',
    stats: '45',
    title: 'Offline',
    icon: 'tabler:player-play'
  }
];

const renderStats = () => {
  return data.map((sale, index) => (
    <Grid item xs={6} md={6} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <CustomAvatar skin="light" color={sale.color} sx={{ mr: 1, width: 42, height: 42 }}>
          <Icon icon={sale.icon} fontSize="1.5rem" />
        </CustomAvatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h5">{sale.stats}</Typography>
          <Typography variant="body2">{sale.title}</Typography>
        </Box>
      </Box>
    </Grid>
  ));
};

const CardHorizondalClasses = () => {
  return (
    <Card sx={{
      backgroundColor: '#e3f2fd', // Set card background color (light blue)
      borderRadius: 2,
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Adjust shadow for effect
      '&:hover': {
        backgroundColor: '#bbdefb', // Change color slightly on hover
        transform: 'scale(1.02)', // Add hover animation
        boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)'
      }
    }}>
      <CardHeader
        title="Classes"
        sx={{ '& .MuiCardHeader-action': { m: 0, alignSelf: 'center' } }}
        action={
          <Typography variant="body2" sx={{ color: 'text.disabled' }}>
            Updated 1 week ago
          </Typography>
        }
      />
      <CardContent sx={{ pt: (theme) => `${theme.spacing(1.5)} !important` }}>
        <Grid container spacing={6}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CardHorizondalClasses;
