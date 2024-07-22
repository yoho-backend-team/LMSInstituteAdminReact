import CloseIcon from '@mui/icons-material/Close';
import { Grid, IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { PDFViewer } from 'react-view-pdf';
import { getImageUrl } from 'utils/imageUtils';


const PdfViewer = ({ open, handleViewClose, pdf }) => {


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
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
        >
          <IconButton onClick={handleViewClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            pt: (theme) => [`${theme.spacing(6)} !important`, `${theme.spacing(1)} !important`],
            pb: (theme) => `${theme.spacing(5)} !important`,
            px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(8)} !important`]
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} sx={{ mb: 4, mt: 1.5 }}>
              <PDFViewer url={getImageUrl(pdf?.file)} />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PdfViewer
