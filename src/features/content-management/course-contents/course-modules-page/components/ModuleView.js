import CloseIcon from '@mui/icons-material/Close';
import { Grid, IconButton, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { PDFViewer } from 'react-view-pdf';
const ModuleView = ({ open, handleViewClose, modules }) => {
  const savedPdfUrl = require('assets/pdf.pdf');
  // const savedPdfUrl = require(`${process.env.REACT_APP_PUBLIC_API_URL}/storage/${Module.document} `);
  console.log(modules);
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleViewClose}
        aria-labelledby="user-view-View"
        aria-describedby="user-view-View-description"
        // sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 800 } }}
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
          View Module Informationsss
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
            <Grid item md={12} sm={12}>
              <Typography variant="h3">{modules?.title}</Typography>

              <Typography variant="h6" sx={{mt:1.5}}>{modules?.description}</Typography>
            </Grid>
            <Grid item xs={12} sm={12} sx={{ mb: 4 ,mt:1.5}}>
              <PDFViewer url={savedPdfUrl} />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModuleView;
