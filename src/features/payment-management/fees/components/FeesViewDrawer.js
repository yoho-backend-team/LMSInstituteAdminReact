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

  // Function to format date using Intl.DateTimeFormat
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // Display in 12-hour format
  }).format(date);
};

  const history1 = selectedRowDetails?.payment_history?.[0] || [];

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
          <Typography variant="h5" sx={{ outline: 1.5, outlineColor: '#0cce7f', px: 2, py: 1, borderRadius: '50px' }}>
            Fees Details
          </Typography>
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
        <Box sx={{ display: 'flex',justifyContent:'center' }}>
          <CardContent sx={{ maxWidth: 400, p: 2, boxShadow: 3, borderRadius: 3 }}>
            {selectedRowDetails && (
              <Grid item xs={12} sm={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      src={`${process.env.REACT_APP_PUBLIC_API_URL}/storage/${selectedRowDetails?.students?.image}`}
                      sx={{ mr: 2.5, height: 38, width: 38 }}
                    />
                    <Box>
                      <Typography variant="h4"> {selectedRowDetails?.student?.username}</Typography>
                      <Typography variant="body4" sx={{ color: 'text.secondary', fontSize: 12 }}>
                        
                        {selectedRowDetails.student?.email}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: 15, color: 'primary.main' }}>{selectedRowDetails.status}</Typography>
                  </Box>
                </Box>

                <Typography variant="h4" sx={{ mt: 3, mb: 3, color: 'text.main' }}>
                  Student Deatails :
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Typography sx={{ width: 150 , fontWeight:500 }}>Transaction Id : </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{history1.transaction_id}</Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Typography sx={{ width: 150 , fontWeight: 500 }}>Student Name : </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{selectedRowDetails?.student?.full_name}</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Typography sx={{ width: 150 , fontWeight: 500 }}>Student Email : </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{selectedRowDetails?.student?.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Typography sx={{ width: 150 , fontWeight: 500 }}>Student ID : </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{selectedRowDetails?.student?.id}</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Typography sx={{ width: 150 , fontWeight: 500 }}> Roll NO : </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{selectedRowDetails?.student?.roll_no}</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Typography sx={{ width: 150 , fontWeight: 500 }}>Paid Amount : </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{history1?.paid_amount}</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Typography sx={{ width: 150 , fontWeight: 500 }}>Payment Date : </Typography>
                  <Typography sx={{ color: "text.secondary" }}>{formatDate(history1?.payment_date)}</Typography>
                </Box>
              </Grid>
            )}
          </CardContent>
        </Box>
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
