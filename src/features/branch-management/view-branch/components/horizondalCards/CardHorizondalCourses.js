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
    stats: '22',
    title: 'Active',
    color: 'success',
    icon: 'tabler:book'
  },
  {
    color: 'error',
    stats: '3',
    title: 'Inactive',
    icon: 'tabler:book-off'
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

const CardHorizondalCourses = () => {
  return (
    <Card>
      <CardHeader
        title="Courses"
        sx={{ '& .MuiCardHeader-action': { m: 0, alignSelf: 'center' } }}
        action={
          <Typography variant="body2" sx={{ color: 'text.disabled' }}>
            Updated 1 month ago
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

export default CardHorizondalCourses;
