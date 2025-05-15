import CloseIcon from '@mui/icons-material/Close';
import { Chip, Grid, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import CustomChip from 'components/mui/chip';
import PropTypes from 'prop-types';
import { PDFViewer } from 'react-view-pdf';
import { getImageUrl } from 'utils/imageUtils';

const StudyMaterialView = ({ open, handleViewClose, StudyMaterials }) => {
  const savedPdfUrl = require('assets/pdf.pdf');

  return (
    <div>
      <Dialog
       maxWidth="sm" 
       fullWidth 
        open={open}
        onClose={handleViewClose}
        aria-labelledby="user-view-View"
        aria-describedby="user-view-View-description"
      >
        <Box sx={{display:'flex',justifyContent:'flex-end' , px:2}}>

        <IconButton onClick={handleViewClose}>
            <CloseIcon />
          </IconButton>
        </Box>
              <PDFViewer url={StudyMaterials?.file?getImageUrl(StudyMaterials?.file):savedPdfUrl} />
        <DialogTitle
          id="user-view-View"
          sx={{
            textAlign: 'center',
            fontSize: '1.5rem !important',
            pt: (theme) => [`${theme.spacing(6)} !important`, `${theme.spacing(5)} !important`],
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignContent:'center',
            px:8
          }}
        >
          {/* <Chip color='secondary' label={StudyMaterials?.title} sx={{textTransform: 'uppercase'}}></Chip> */}
          <Typography variant='h1' sx={{color:'primary'}}> ⭐{StudyMaterials?.title}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center',justifyContent:"center", }}>
                <CustomChip
                  sx={{ ml: 1 }}  
                  rounded
                  size="small"
                  skin="light"
                  // color="primary"
                  color={StudyMaterials?.is_active? 'primary' : 'error'}
                  label={StudyMaterials?.is_active? 'Active' : 'Inactive'}
                />
              </Box>
        </DialogTitle>
        <DialogContent
          sx={{
            pt: (theme) => [`${theme.spacing(6)} !important`, `${theme.spacing(1)} !important`],
            pb: (theme) => `${theme.spacing(5)} !important`,
            px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(8)} !important`]
          }}
        >
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item md={12} sm={6} >
              <Box sx={{display: 'flex',flexDirection:"column",alignItems:'start' ,boxShadow: 3, p:3 }} >

              <Box sx={{ display: 'flex', alignItems: 'center',justifyContent:"center" }}>
                <Typography variant="h3">Title :</Typography>
                <Typography variant="subtitle1" sx={{ ml: 1 ,mt:0.5}}>
                  {StudyMaterials?.title}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center',justifyContent:"center", mt: 1 }}>
                <Typography variant="h3">Course Name :</Typography>
                <Typography variant="subtitle1" sx={{ ml: 1 }}>
                  {StudyMaterials?.course?.course_name}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex',alignItems: 'start', justifyContent:"center",flexDirection: 'row', mt: 1 }}>
                <Typography variant="h3">Description </Typography>
                <Typography variant="subtitle1" sx={{ ml: 1 }}>
                  : {StudyMaterials?.description}
                </Typography>
              </Box>

                            
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

StudyMaterialView.propTypes = {
  open: PropTypes.any,
  handleViewClose: PropTypes.any,
  StudyMaterials: PropTypes.any
};

export default StudyMaterialView;
