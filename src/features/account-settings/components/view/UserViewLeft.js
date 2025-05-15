// ** React Imports
import { useState } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';

// ** Custom Components
import UserEditDialog from '../UserEditDialog';
import { getImageUrl } from 'utils/imageUtils';
import { profilePlaceholder } from 'utils/placeholders';

const UserViewLeft = ({ userData, id, setRefetch }) => {
  const statusColors = {
    1: 'success',
    pending: 'warning',
    0: 'error'
  };

  // ** States
  const [openEdit, setOpenEdit] = useState(false);

  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);

  const DetailRow = ({ label, value, tooltip = false }) => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between',gap: 2 ,pl:3 ,pr: 3 }}>
      <Typography color="text.primary" fontWeight={500}>
        {label}:
      </Typography>
      {tooltip ? (
        <Tooltip title={value} arrow>
          <Typography>{value}</Typography>
        </Tooltip>
      ) : (
        <Typography>{value}</Typography>
      )}
    </Box>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        // alignItems: 'center',
        minHeight: '70vh',
        backgroundColor: '#f0f2f5',
      }}
    >
      <Card
        sx={{
          width: {sm: 'full',md:'50vw'},
          // maxWidth: '100vw',
          borderRadius: 4,
          boxShadow: 4,
          backgroundColor: '#ffffff',
          p:2
        }}
      >
        {/* Header with avatar and basic info */}
        <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 3, borderBottom: '1px solid #e0e0e0' }}>
          <Avatar
            src={userData?.image ? getImageUrl(userData.image) : profilePlaceholder}
            alt={userData?.name}
            sx={{ width: 80, height: 80 }}
          />
          <Box>
            <Typography variant="h5" fontWeight="bold">
              {`${userData?.first_name || ''} ${userData?.last_name || ''}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {userData?.email || 'N/A'}
            </Typography>
            <Chip label={userData?.role?.identity || 'User'} sx={{ mt: 1, backgroundColor: '#ff7407', color: '#fff' }} />
          </Box>
          <Chip
            label={userData?.is_active ? 'Active' : 'Inactive'}
            sx={{
              ml: 'auto',
              backgroundColor: userData?.is_active ? '#4caf50' : '#f44336',
              color: '#fff',
              fontWeight: 'bold'
            }}
          />
        </Box>

        {/* User Details */}
        <CardContent>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333', mb: 2, textTransform: 'uppercase' }}>
            User Details
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: 'grid', rowGap: 2 }}>
            <DetailRow label="Name" value={`${userData.first_name || ''} ${userData.last_name || ''}`} />
            <DetailRow label="Email" value={userData.email || 'N/A'} tooltip />
            <DetailRow
              label="Status"
              value={
                <Chip
                  size="small"
                  label={userData.is_active ? 'Active' : 'Inactive'}
                  sx={{ backgroundColor: userData.is_active ? '#c8e6c9' : '#ffcdd2', color: '#000' }}
                />
              }
            />
            <DetailRow label="Contact" value={userData.phone_number || 'N/A'} />
          </Box>
        </CardContent>

        {/* Action Buttons */}
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            onClick={handleEditClickOpen}
            sx={{
              backgroundColor: '#00adb5',
              textTransform: 'none',
              borderRadius: 2,
              px: 3,
              py: 1,
              ':hover': { backgroundColor: '#007b7f' }
            }}
          >
            Edit Profile
          </Button>
        </Box>
      </Card>

      {/* Edit Dialog */}
      <UserEditDialog id={id} userData={userData} openEdit={openEdit} handleEditClose={handleEditClose} setRefetch={setRefetch} />
    </Box>
  );
};

export default UserViewLeft;
