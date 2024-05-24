import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Grid, IconButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import { PDFViewer } from 'react-view-pdf';
import { getImageUrl } from 'utils/imageUtils';

const StudentCertificateView = ({ open, handleViewClose, certificate }) => {
  const savedPdfUrl = `${process.env.REACT_APP_PUBLIC_API_URL}/storage/${certificate?.certificate_file}`;
  console.log(savedPdfUrl);
  console.log('certificate :', certificate);
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleViewClose}
        aria-labelledby="user-view-View"
        aria-describedby="user-view-View-description"
      >
        <DialogTitle
          id="user-view-View"
          sx={{
            textAlign: 'center',
            fontSize: '1.5rem !important',
            px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(10)} !important`],
            pt: (theme) => [`${theme.spacing(6)} !important`, `${theme.spacing(5)} !important`],
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box>
              <Avatar
                src={`${process.env.REACT_APP_PUBLIC_API_URL}/storage/${certificate?.student?.image}`}
                sx={{ mr: 2.5, height: 48, width: 48 }}
              />
            </Box>
            <Box>
              <Typography variant="h3">
                {certificate?.student?.first_name}
                {certificate?.student?.last_name}
              </Typography>
              <Typography variant="h5" sx={{ color: 'text.secondary', fontSize: 12 }}>
                {certificate?.student?.email}
              </Typography>
            </Box>
          </Box>

          <IconButton onClick={handleViewClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            pt: (theme) => [`${theme.spacing(6)} !important`, `${theme.spacing(4)} !important`],
            pb: (theme) => `${theme.spacing(5)} !important`,
            px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(8)} !important`]
          }}
        >
          <Grid item xs={12} sm={12} sx={{ mb: 4 }}>
            <PDFViewer url={getImageUrl(certificate?.file_upload)} />
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

StudentCertificateView.propTypes = {
  open: PropTypes.any,
  handleViewClose: PropTypes.any,
  certificate: PropTypes.any
};

export default StudentCertificateView;
