// ** React Imports
import { useState } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Divider from '@mui/material/Divider';

// ** Icon Imports
import Icon from 'components/icon';

import PropTypes from 'prop-types';

const   DeleteDialog = (props) => {
  // ** Props
  const { open, setOpen, handleSubmit, description, title, successDescription, failureDescription } = props;



  // ** States
  const [userInput, setUserInput] = useState('yes');
  const [secondDialogOpen, setSecondDialogOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleSecondDialogClose = () => setSecondDialogOpen(false);

  const handleConfirmation = (value) => {
    handleClose();
    setUserInput(value);
    setSecondDialogOpen(true);
  };

  return (
    <>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512, borderRadius: 4, boxShadow: 4 } }}
      >
        <DialogContent
          sx={{
            px: (theme) => [theme.spacing(6), theme.spacing(8)],
            pt: (theme) => [theme.spacing(4), theme.spacing(6)],
            textAlign: 'center'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              '& svg': { mb: 4, color: 'warning.main' }
            }}
          >
            <Icon icon="tabler:alert-triangle" fontSize="5.5rem" />
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
              Confirm Action
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {description}
            </Typography>
          </Box>
        </DialogContent>
        <Divider />
        <DialogActions
          sx={{
            justifyContent: 'center',
            py: (theme) => theme.spacing(4),
            px: (theme) => theme.spacing(6)
          }}
        >
          <Button
            variant="contained"
            color="error"
            size="large"
            sx={{ minWidth: 120, mr: 2 }}
            onClick={() => {
              handleSubmit();
              handleConfirmation('yes');
            }}
          >
            Yes, {title}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            sx={{ minWidth: 120 }}
            onClick={() => handleConfirmation('cancel')}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullWidth
        open={secondDialogOpen}
        onClose={handleSecondDialogClose}
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512, borderRadius: 4, boxShadow: 4 } }}
      >
        <DialogContent
          sx={{
            px: (theme) => [theme.spacing(6), theme.spacing(8)],
            pt: (theme) => [theme.spacing(4), theme.spacing(6)],
            textAlign: 'center'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              '& svg': {
                mb: 4,
                color: userInput === 'yes' ? 'success.main' : 'error.main'
              }
            }}
          >
            <Icon fontSize="5.5rem" icon={userInput === 'yes' ? 'tabler:circle-check' : 'tabler:circle-x'} />
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
              {userInput === 'yes' ? 'Success!' : 'Cancelled'}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {userInput === 'yes' ? successDescription : failureDescription}
            </Typography>
          </Box>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ justifyContent: 'center', py: (theme) => theme.spacing(3) }}>
          <Button variant="contained" color="success" size="large" onClick={handleSecondDialogClose}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  successDescription: PropTypes.string.isRequired,
  failureDescription: PropTypes.string.isRequired
};

export default DeleteDialog;
