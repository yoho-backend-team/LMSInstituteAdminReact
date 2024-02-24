// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// ** Icon Imports
// import Icon from 'components/icon';

// ** Custom Components Imports
import CustomAvatar from 'components/mui/avatar';

const renderStats = () => {
  return (
    <Grid item xs={12} md={12}>
      <Box sx={{ display: 'flex', gap: 3 }}>
        <Box>
          <Box>
            <Typography>Course</Typography>
          </Box>
          <Box>
            <Typography variant="h4">Ux Design</Typography>
          </Box>
        </Box>

        <Box>
          <Box>
            <Typography>Batch</Typography>
          </Box>
          <Box>
            <Typography variant="h4">#3022024</Typography>
          </Box>
        </Box>

        <Box>
          <Box>
            <Typography>Duration</Typography>
          </Box>
          <Box>
            <Typography variant="h4">1:24:36</Typography>
          </Box>
        </Box>

        <Box>
          <Box>
            <Typography>Date</Typography>
          </Box>
          <Box>
            <Typography variant="h4">13 Feb 2024</Typography>
          </Box>
        </Box>

        <Box>
          <Box>
            <Typography>Started at</Typography>
          </Box>
          <Box>
            <Typography variant="h4">10:30 AM</Typography>
          </Box>
        </Box>

        <Box>
          <Box>
            <Typography>Ended at</Typography>
          </Box>
          <Box>
            <Typography variant="h4">11:54 AM</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 3, mt: 4 }}>
        <Box sx={{}}>
          <Box>
            <Typography>instructor</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <CustomAvatar skin="light" sx={{ mr: 1, width: 36, height: 36 }}>
              {/* <Icon icon={sale.icon} fontSize="1.5rem" /> */}
            </CustomAvatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h5">jerome bell</Typography>
            </Box>
          </Box>
        </Box>

        <Box>
          <Box>
            <Typography>coordinator</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <CustomAvatar skin="light" sx={{ mr: 1, width: 36, height: 36 }}>
              {/* <Icon icon={sale.icon} fontSize="1.5rem" /> */}
            </CustomAvatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h5">Robert Fox</Typography>
            </Box>
          </Box>
        </Box>

        <Box>
          <Box>
            <Typography>class type</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h4">Online</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

const EcommerceStatistics = () => {
  return (
    <Card>
      <CardHeader title="UX Class 13022024" sx={{ '& .MuiCardHeader-action': { m: 0, alignSelf: 'center' } }} />
      <CardContent sx={{ pt: (theme) => `${theme.spacing(0.75)} !important`, pb: (theme) => `${theme.spacing(3.5)} !important` }}>
        <Grid container spacing={6}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default EcommerceStatistics;
