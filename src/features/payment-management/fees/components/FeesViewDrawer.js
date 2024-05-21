import { Avatar, Box, CardContent, Grid, Typography } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Icon from 'components/icon';
import PropTypes from 'prop-types';

const FeesViewDrawer = ({ open, toggle, selectedRowDetails }) => {
  const Header = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(6),
    justifyContent: 'space-between'
  }));

  const handleClose = () => {
    toggle();
  };

  return (
    <>
      <Drawer
        open={open}
        anchor="right"
        variant="temporary"
        onClose={handleClose}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 500 } } }}
      >
        <Header>
          <Typography variant="h5">Fees Details</Typography>
          <IconButton
            size="small"
            onClick={handleClose}
            sx={{
              p: '0.438rem',
              borderRadius: 1,
              color: 'text.primary',
              backgroundColor: 'action.selected',
              '&:hover': {
                backgroundColor: (theme) => `rgba(${theme.palette.secondary.main}, 0.16)`
              }
            }}
          >
            <Icon icon="tabler:x" fontSize="1.125rem" />
          </IconButton>
        </Header>

        <CardContent>
          {selectedRowDetails && (
            <Grid item xs={12} sm={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    src={`${process.env.REACT_APP_PUBLIC_API_URL}/storage/${selectedRowDetails?.students?.image}`}
                    sx={{ mr: 2.5, height: 38, width: 38 }}
                  />
                  <Box>
                    <Typography variant="h4"> Refund Id</Typography>
                    <Typography variant="body4" sx={{ color: 'text.secondary', fontSize: 12 }}>
                      {selectedRowDetails.fee_id}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ fontSize: 15, color: 'primary.main' }}>{selectedRowDetails.status}</Typography>
                </Box>
              </Box>

              <Typography variant="h4" sx={{ mt: 6, mb: 3, color: 'text.main' }}>
                Student Deatails :
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Typography sx={{ width: 150 }}>Student Id : </Typography>
                <Typography sx={{ color: 'text.secondary' }}>{selectedRowDetails?.transaction_id}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Typography sx={{ width: 150 }}>Student Name : </Typography>
                <Typography sx={{ color: 'text.secondary' }}>{selectedRowDetails?.student?.full_name}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Typography sx={{ width: 150 }}>Student Email : </Typography>
                <Typography sx={{ color: 'text.secondary' }}>{selectedRowDetails?.student?.email}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Typography sx={{ width: 150 }}>Paid Amount : </Typography>
                <Typography sx={{ color: 'text.secondary' }}>{selectedRowDetails?.paid_amount}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Typography sx={{ width: 150 }}>Payment Date : </Typography>
                <Typography sx={{ color: 'text.secondary' }}>{selectedRowDetails?.payment_date}</Typography>
              </Box>
            </Grid>
          )}
        </CardContent>
      </Drawer>
    </>
  );
};

FeesViewDrawer.propTypes = {
  open: PropTypes.any,
  toggle: PropTypes.any,
  selectedRowDetails: PropTypes.any
};
export default FeesViewDrawer;
