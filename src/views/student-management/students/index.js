// material-ui
import { Box, Avatar, Divider, Typography, Stack, Grid } from '@mui/material';
// import { PropTypes } from '@mui/material';
import SocialsButton from './CardStyle/SocialButton';
import SvgIconStyle from './CardStyle/svgIconStyle';
import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
// project imports
import styled from '@emotion/styled';
// import MainCard from 'components/cards/MainCard';
import Image from './CardStyle/image';
import cssStyles from './CardStyle/cssStyles';
// import UserCard from './CardStyle/userCard';

// ==============================|| SAMPLE PAGE ||============================== //

const OverlayStyle = styled('div')(({ theme }) => ({
  ...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.darker }),
  top: 0,
  zIndex: 8,
  content: "''",
  width: '100%',
  height: '100%',
  position: 'absolute'
}));

// ----------------------------------------------------------------------

// UserCard.propTypes = {
//   user: PropTypes.object.isRequired,
// };

const Students = () => (
  <Container>
    <Box
      sx={{
        display: 'grid',
        gap: 3,
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)'
        }
      }}
    >
      <Grid>
        <Card sx={{ textAlign: 'center' }}>
          <Box sx={{ position: 'relative' }}>
            <SvgIconStyle
              src="https://minimal-assets-api.vercel.app/assets/icons/shape-avatar.svg"
              sx={{
                width: 144,
                height: 62,
                zIndex: 10,
                left: 0,
                right: 0,
                bottom: -26,
                mx: 'auto',
                position: 'absolute',
                color: 'background.paper'
              }}
            />
            <Avatar
              alt="image"
              src="https://www.trickscity.com/wp-content/uploads/2016/11/K0cAXP3.jpg"
              sx={{
                width: 64,
                height: 64,
                zIndex: 11,
                left: 0,
                right: 0,
                bottom: -32,
                mx: 'auto',
                position: 'absolute'
              }}
            />
            <OverlayStyle />
            <Image src="https://i.pinimg.com/originals/52/2c/1a/522c1a4289f2e2d0e29ed59071de9dce.jpg" alt="overlaystyle" ratio="16/9" />
          </Box>

          <Typography variant="subtitle1" sx={{ mt: 6 }}>
            Anish
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Front-end Developer
          </Typography>

          <Stack alignItems="center">
            <SocialsButton initialColor sx={{ my: 2.5 }} />
          </Stack>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Box sx={{ py: 3, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div>
              <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
                Follower
              </Typography>
              <Typography variant="subtitle1">100</Typography>
            </div>

            <div>
              <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
                Following
              </Typography>
              <Typography variant="subtitle1">100</Typography>
            </div>

            <div>
              <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
                Total Post
              </Typography>
              <Typography variant="subtitle1">2</Typography>
            </div>
          </Box>
        </Card>
      </Grid>
      <Grid Item sm={4} xs={12}>
        <Card sx={{ textAlign: 'center' }}>
          <Box sx={{ position: 'relative' }}>
            <SvgIconStyle
              src="https://minimal-assets-api.vercel.app/assets/icons/shape-avatar.svg"
              sx={{
                width: 144,
                height: 62,
                zIndex: 10,
                left: 0,
                right: 0,
                bottom: -26,
                mx: 'auto',
                position: 'absolute',
                color: 'background.paper'
              }}
            />
            <Avatar
              alt="image"
              src="https://i.pinimg.com/originals/d9/e9/a0/d9e9a0e75e88814c9480b8038af03d18.jpg"
              sx={{
                width: 64,
                height: 64,
                zIndex: 11,
                left: 0,
                right: 0,
                bottom: -32,
                mx: 'auto',
                position: 'absolute'
              }}
            />
            <OverlayStyle />
            <Image src="https://i.pinimg.com/originals/52/2c/1a/522c1a4289f2e2d0e29ed59071de9dce.jpg" alt="overlaystyle" ratio="16/9" />
          </Box>

          <Typography variant="subtitle1" sx={{ mt: 6 }}>
            Anish
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Front-end Developer
          </Typography>

          <Stack alignItems="center">
            <SocialsButton initialColor sx={{ my: 2.5 }} />
          </Stack>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Box sx={{ py: 3, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div>
              <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
                Follower
              </Typography>
              <Typography variant="subtitle1">100</Typography>
            </div>

            <div>
              <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
                Following
              </Typography>
              <Typography variant="subtitle1">100</Typography>
            </div>

            <div>
              <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
                Total Post
              </Typography>
              <Typography variant="subtitle1">2</Typography>
            </div>
          </Box>
        </Card>
      </Grid>
      <Grid Item sm={4} xs={12}>
        <Card sx={{ textAlign: 'center' }}>
          <Box sx={{ position: 'relative' }}>
            <SvgIconStyle
              src="https://minimal-assets-api.vercel.app/assets/icons/shape-avatar.svg"
              sx={{
                width: 144,
                height: 62,
                zIndex: 10,
                left: 0,
                right: 0,
                bottom: -26,
                mx: 'auto',
                position: 'absolute',
                color: 'background.paper'
              }}
            />
            <Avatar
              alt="image"
              src="https://i.pinimg.com/originals/d9/e9/a0/d9e9a0e75e88814c9480b8038af03d18.jpg"
              sx={{
                width: 64,
                height: 64,
                zIndex: 11,
                left: 0,
                right: 0,
                bottom: -32,
                mx: 'auto',
                position: 'absolute'
              }}
            />
            <OverlayStyle />
            <Image src="https://i.pinimg.com/originals/52/2c/1a/522c1a4289f2e2d0e29ed59071de9dce.jpg" alt="overlaystyle" ratio="16/9" />
          </Box>

          <Typography variant="subtitle1" sx={{ mt: 6 }}>
            Anish
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Front-end Developer
          </Typography>

          <Stack alignItems="center">
            <SocialsButton initialColor sx={{ my: 2.5 }} />
          </Stack>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Box sx={{ py: 3, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div>
              <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
                Follower
              </Typography>
              <Typography variant="subtitle1">100</Typography>
            </div>

            <div>
              <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
                Following
              </Typography>
              <Typography variant="subtitle1">100</Typography>
            </div>

            <div>
              <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
                Total Post
              </Typography>
              <Typography variant="subtitle1">2</Typography>
            </div>
          </Box>
        </Card>
      </Grid>
      <Grid Item sm={4} xs={12}>
        <Card sx={{ textAlign: 'center' }}>
          <Box sx={{ position: 'relative' }}>
            <SvgIconStyle
              src="https://minimal-assets-api.vercel.app/assets/icons/shape-avatar.svg"
              sx={{
                width: 144,
                height: 62,
                zIndex: 10,
                left: 0,
                right: 0,
                bottom: -26,
                mx: 'auto',
                position: 'absolute',
                color: 'background.paper'
              }}
            />
            <Avatar
              alt="image"
              src="https://i.pinimg.com/originals/d9/e9/a0/d9e9a0e75e88814c9480b8038af03d18.jpg"
              sx={{
                width: 64,
                height: 64,
                zIndex: 11,
                left: 0,
                right: 0,
                bottom: -32,
                mx: 'auto',
                position: 'absolute'
              }}
            />
            <OverlayStyle />
            <Image src="https://i.pinimg.com/originals/52/2c/1a/522c1a4289f2e2d0e29ed59071de9dce.jpg" alt="overlaystyle" ratio="16/9" />
          </Box>

          <Typography variant="subtitle1" sx={{ mt: 6 }}>
            Anish
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Front-end Developer
          </Typography>

          <Stack alignItems="center">
            <SocialsButton initialColor sx={{ my: 2.5 }} />
          </Stack>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Box sx={{ py: 3, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div>
              <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
                Follower
              </Typography>
              <Typography variant="subtitle1">100</Typography>
            </div>

            <div>
              <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
                Following
              </Typography>
              <Typography variant="subtitle1">100</Typography>
            </div>

            <div>
              <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
                Total Post
              </Typography>
              <Typography variant="subtitle1">2</Typography>
            </div>
          </Box>
        </Card>
      </Grid>
    </Box>
  </Container>
);

export default Students;
