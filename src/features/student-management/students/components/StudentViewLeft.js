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
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const ProfilePicture = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: '50%',
  border: `4px solid ${theme.palette.background.paper}`,
  boxShadow: theme.shadows[4], // subtle shadow around the profile image
  marginBottom: theme.spacing(2), // consistent spacing
}));

const UserViewLeft = ({ student }) => {
  const imageUrl = student?.image ? getImageUrl(student?.image) : imagePlaceholder;

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2, overflow: 'hidden', bgcolor: 'background.paper', textAlign: 'center' }}>
      <CardMedia
        component="img"
        alt="profile-header"
        image="https://th.bing.com/th/id/R.2609fa18d5091dc020ae92e8ffde827d?rik=EFdtfi8dYkunsA&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f05%2fBeautiful-Gradient-Wallpaper.jpg&ehk=wHC%2bBEdWF6fKy71W%2byG8l40bZoD6JV35mjLfEsDFAdQ%3d&risl=&pid=ImgRaw&r=0"
        sx={{
          height: { xs: 150, md: 250 },
          objectFit: 'cover',
        }}
      />
      <CardContent sx={{ pt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <ProfilePicture src={imageUrl} alt="profile-picture" sx={{mt:-10}}/>
        <Typography variant="h5" sx={{ mb:4, fontWeight: '600', color: 'text.primary' }}>
          {student.first_name} {student.last_name}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", color: "text.secondary", mb: 2 }}>
      <CalendarTodayIcon fontSize="small" sx={{ mr: 1 }} />
      <Typography variant="body2">Joined on 11/09/2023</Typography>
    </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", color: "text.secondary" }}>
      <Box
        sx={{
          width: 12,
          height: 12,
          backgroundColor: "blue",
          borderRadius: "4px",
          mr: 1,
        }}
      />
      <Typography variant="body2">ReactJs</Typography>
    </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
            <Icon fontSize="1.25rem" icon="tabler:map-pin" />
            <Typography variant="body2" sx={{ ml: 1 }}>London</Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          color={student.is_active ? 'success' : 'error'}
          sx={{ mt: 3, '& svg': { mr: 1 }, borderRadius: 2,  backgroundColor: student.is_active? "green" : "gray",
          color: "white",
          borderRadius: "20px",
          padding: "4px 10px",
          fontSize: "14px",
          fontWeight: "500", }}
        >
          <Icon icon="tabler:check" fontSize="1.125rem"  />
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
