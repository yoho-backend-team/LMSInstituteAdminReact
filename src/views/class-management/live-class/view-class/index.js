// material-ui
import { ClosedCaption, EmojiPeople, LibraryBooks, People, Public, VideoLibrary } from '@mui/icons-material';
import { Avatar, Box, Card, CardMedia, Divider, Grid, Typography } from '@mui/material';
import CustomChip from 'components/mui/chip';

const ViewLiveClass = () => (
  <Card sx={{ p: 3, alignItems: 'center' }}>
    <Box sx={{ p: 2 }}>
      <Typography variant="h3" mb={1}>
        UI/UX Basic Fundamentals
      </Typography>
      <Typography variant="h6" mb={2}>
        <span style={{ fontWeight: '600' }}> Prof:</span> Jessica Moni
      </Typography>
    </Box>
    <Grid container xs={12} spacing={1}>
      <Grid item xs={12} sm={8} sx={{ p: 2, border: '1px solid #BED1CF', borderRadius: 2 }}>
        <Card>
          <CardMedia sx={{ height: '14.5625rem' }} image="https://www.devstringx.com/wp-content/uploads/2022/07/React-2048x1024.jpg" />
        </Card>

        <Box sx={{ p: 2 }}>
          <Typography variant="h4" mb={2}>
            About This Course
          </Typography>
          <Typography variant="p">
            Learn web design in 1 hour with 25+ simple-to-use rules and guidelines — tons of amazing web design resources included!
          </Typography>
        </Box>
        <Divider />
        <Grid container sx={{ mt: 1, p: 2 }}>
          <Grid item xs={12} sm={4} sx={{ alignItems: 'center' }}>
            <Typography sx={{ alignItems: 'center', display: 'flex', mb: 3 }} gap={1}>
              <EmojiPeople color="primary" />
              <Typography>Skill level:</Typography> All Level
            </Typography>
            <Typography sx={{ alignItems: 'center', display: 'flex', mb: 3 }} gap={1}>
              <People color="error" />
              <Typography> Students:</Typography> 38815
            </Typography>
            <Typography sx={{ alignItems: 'center', display: 'flex', mb: 3 }} gap={1}>
              <Public color="success" />
              <Typography>Languages: </Typography> English
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography sx={{ alignItems: 'center', display: 'flex', mb: 3 }} gap={1}>
              <ClosedCaption color="primary" />
              <Typography> Captions:</Typography> true
            </Typography>
            <Typography sx={{ alignItems: 'center', display: 'flex', mb: 3 }} gap={1}>
              <LibraryBooks color="secondary" />
              <Typography> Lectures:</Typography> 19
            </Typography>
            <Typography sx={{ alignItems: 'center', display: 'flex', mb: 3 }} gap={1}>
              <VideoLibrary color="error" />
              <Typography>Video:</Typography> 1.5 total hours
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card sx={{ p: 2, mb: 3 }}>
          <Typography variant="h5" mb={2}>
            Instructor
          </Typography>
          <Grid container>
            <Grid item sx={12} sm={12}>
              <Box display="flex" alignItems="center" gap={3} sx={{ borderRadius: '10px', overflow: 'hidden' }}>
                <Avatar alt="Remy Sharp" src="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_0.jpg" />

                <Typography variant="h4">Devonne Wallbridge</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={3}></Grid>
            <Grid item xs={12} sm={9}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Web Developer, Designer, and Teacher
              </Typography>
            </Grid>
          </Grid>
        </Card>
        <Card sx={{ p: 2, mb: 3 }}>
          <Typography variant="h5" mb={2}>
            Teacher
          </Typography>
          <Grid container>
            <Grid item sx={12} sm={12}>
              <Box display="flex" alignItems="center" gap={3} sx={{ borderRadius: '10rem', overflow: 'hidden' }}>
                <Avatar alt="Remy Sharp" src="https://i.pinimg.com/originals/14/3e/65/143e656d09e4848f85289b6a602d75ec.jpg" />

                <Typography variant="h4">Jessica Moni</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={3}></Grid>
            <Grid item xs={12} sm={9}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Web Developer, Designer, and Teacher
              </Typography>
            </Grid>
          </Grid>
        </Card>
        <Card sx={{ p: 2 }}>
          <Box>
            <Typography variant="h5" mb={2}>
              Other Details
            </Typography>
            <Divider />
            <Typography mt={2} mb={2}>
              Duration: 3:00 hrs
            </Typography>
            <Typography mb={2}>Date: 09/02/1999</Typography>
            <Typography mb={2}>Language: English</Typography>
            <Typography mb={4}>Level: Beginner</Typography>
          </Box>

          <Box alignItems="center" display="flex" gap={2}>
            <CustomChip label="React" skin="light" color="primary" />
            <CustomChip label="material UI" skin="light" color="success" />
          </Box>
        </Card>
      </Grid>
    </Grid>
  </Card>
);

export default ViewLiveClass;
