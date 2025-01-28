import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Icon from 'components/icon';
import PropTypes from 'prop-types';
import { getImageUrl } from 'utils/imageUtils';
import { imagePlaceholder } from 'utils/placeholders';

const ProfilePicture = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: '50%',
  border: `4px solid ${theme.palette.background.paper}`,
  boxShadow: theme.shadows[4], // subtle shadow around the profile image
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4),
  },
}));

const UserViewLeft = ({ student }) => {
  const imageUrl = student?.image ? getImageUrl(student?.image) : imagePlaceholder;

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2, overflow: 'hidden', bgcolor: 'background.paper' }}>
      <CardMedia
        component="img"
        alt="profile-header"
        image="https://th.bing.com/th/id/R.2609fa18d5091dc020ae92e8ffde827d?rik=EFdtfi8dYkunsA&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f05%2fBeautiful-Gradient-Wallpaper.jpg&ehk=wHC%2bBEdWF6fKy71W%2byG8l40bZoD6JV35mjLfEsDFAdQ%3d&risl=&pid=ImgRaw&r=0"
        sx={{
          height: { xs: 150, md: 250 },
          objectFit: 'cover',
        }}
      />
      <CardContent sx={{ pt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <ProfilePicture src={imageUrl} alt="profile-picture" />
        <Typography variant="h5" sx={{ mt: 2, fontWeight: '600', color: 'text.primary' }}>
          {student.first_name} {student.last_name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
          ReactJs Developer | London | Joined 11/09/2023
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
            <Icon fontSize="1.25rem" icon="tabler:briefcase" />
            <Typography variant="body2">ReactJs</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
            <Icon fontSize="1.25rem" icon="tabler:map-pin" />
            <Typography variant="body2">London</Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          color={student.is_active ? 'success' : 'error'}
          sx={{ mt: 3, '& svg': { mr: 1 }, borderRadius: 2 }}
        >
          <Icon icon="tabler:check" fontSize="1.125rem" />
          {student.is_active ? 'Active' : 'Inactive'}
        </Button>
      </CardContent>
    </Card>
  );
};

UserViewLeft.propTypes = {
  student: PropTypes.object.isRequired,
};

export default UserViewLeft;

