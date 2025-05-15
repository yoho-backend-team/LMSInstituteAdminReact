import CloseIcon from '@mui/icons-material/Close';
import { Grid, IconButton,Collapse,Button } from '@mui/material';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import CustomChip from 'components/mui/chip';
import PropTypes from 'prop-types';
import { PDFViewer } from 'react-view-pdf';
import { getImageUrl } from 'utils/imageUtils';
import ReportIcon from '@mui/icons-material/Report';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from 'react';

const CourseStudyMaterialView = ({ open, handleViewClose, StudyMaterials }) => {
  const savedPdfUrl = require('assets/pdf.pdf');

  const [isPdfVisible, setPdfVisible] = useState(false);  

  const handlePDFView = () => {
    setPdfVisible((prev) => !prev);  
  };


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

            <Grid item md={12} sm={12}>

                {/*  Inactive Course Alert */}
            {!StudyMaterials?.is_active && (
              <Box
                sx={{
                  backgroundColor: '#fef3c7',  
                  border: '1px solid #fde68a', 
                  borderRadius: '8px',
                  padding: '16px',
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'flex-start'
                }}
              >
                <ReportIcon style={{ width: '20px', height: '20px', color: '#d97706', marginRight: '12px' }} />
                <Typography sx={{ color: '#92400e' }}>
                  This course is currently inactive. Contact your administrator for more information.
                </Typography>
              </Box>
            )}


              <Box  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* <Typography variant="h3">Title :</Typography> */}
                <Typography variant="h1" sx={{ ml: 1 }}>
                  {StudyMaterials?.title}
                </Typography>

                {StudyMaterials?.is_active ? (
                <CustomChip
                  rounded
                  size="small"
                  skin="light"
                  color="primary"
                  label="Active"
                />
              ) : (
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    backgroundColor: '#fee2e2',  
                    color: '#b91c1c'  
                  }}
                >
                  Inactive
                </Box>
              )}
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'row', mt: 1 }}>
                {/* <Typography variant="h3">Description </Typography> */}
                <Typography variant="h4" sx={{ ml: 1,mt:1,color: 'gray', fontSize: '1rem'  }}>
                {StudyMaterials?.description}
                </Typography>
              </Box>

              {/* <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 1 }}>
                <Typography variant="h3">Status :</Typography>
                <CustomChip
                  sx={{ ml: 1 }}
                  rounded
                  size="small"
                  skin="light"
                  color="primary"
                  label={StudyMaterials?.is_active ? 'Active' : 'Inactive'}
                />
              </Box> */}

            </Grid>

            {/* <Grid item xs={12} sm={12} sx={{ mb: 4, mt: 1.5 }}>
              <PDFViewer url={getImageUrl(StudyMaterials?.file)} />
            </Grid> */}

             {/* PDF Section */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Typography variant="h2" sx={{mb:2, color: 'black', fontWeight: 600 }}>Course Materials</Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#f3f4f6', 
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',  
              }}
            >
              <Typography variant="h6" sx={{ color: 'black', fontWeight: 600 }}>
                PDF
              </Typography>

              <Button
                variant="outlined"
                startIcon={<VisibilityIcon />}
                onClick={handlePDFView}
                sx={{
                  textTransform: 'none',
                  borderColor: '#3b82f6', 
                  color: '#3b82f6',       
                  '&:hover': {
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    borderColor: '#3b82f6'
                  }
                }}
              >
                   {isPdfVisible ? 'Hide' : 'View'}
              </Button>
            </Box>

            <Collapse in={isPdfVisible}>
              <Box sx={{ mt: 2, height: '500px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                <PDFViewer url={getImageUrl(StudyMaterials?.file)} />
              </Box>
            </Collapse>

          </Grid>

          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

CourseStudyMaterialView.propTypes = {
  open: PropTypes.any,
  handleViewClose: PropTypes.any,
  StudyMaterials: PropTypes.any
};
export default CourseStudyMaterialView;
