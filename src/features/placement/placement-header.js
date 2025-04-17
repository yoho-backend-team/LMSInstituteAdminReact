import { useNavigate } from 'react-router-dom';
import { Grid, Typography, Box, Button, Card } from '@mui/material';
import Icon from 'components/icon';
import { Link } from 'react-router-dom';

const PlacementHeader = () => {
  const navigate = useNavigate();

  const handleOpenForm = () => {
    navigate('/placement-form');//
  };

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Box sx={{  }}>
            <Card sx={{ boxShadow: '0 .25rem .875rem 0 rgba(38,43,67,.16)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 6, py: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h2">Placement</Typography>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    component={Link}
                    to="placement-form"
                    sx={{
                      '& svg': { mr: 2 },
                      px: 2,
                      py: 1.7,
                      borderRadius: '50px',
                      backgroundColor: '#0CCE7F',
                      ':hover': { backgroundColor: '#0AA865' },
                      fontSize: { xs: '0.8rem', sm: '0.9rem' }
                    }}
                  >
                    <Icon fontSize="1.125rem" icon="tabler:plus" />
                    Add Placement
                  </Button>
                </Box>
              </Box>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default PlacementHeader;
