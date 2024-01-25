import React, { useState } from 'react';
// ** MUI Imports
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import Card from '@mui/material/Card';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CustomChip from 'components/mui/chip';
import { Avatar as CustomAvatar } from '@mui/material';
// import { Icon } from '@mui/material';
// import Chip from '@mui/material/Chip';
// import { Face } from '@mui/icons-material';

const roleColors = {
  admin: 'error',
  editor: 'info',
  author: 'warning',
  maintainer: 'success',
  subscriber: 'primary'
};

const statusColors = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
};

const TeachingIdCard = () => {
  const data = {
    id: 1,
    role: 'admin',
    status: 'active',
    username: 'mdthasthakir',
    // avatarColor: 'primary',
    country: 'El Salvador',
    company: 'Yotz PVT LTD',
    billing: 'Manual - Cash',
    contact: '(479) 232-9151',
    currentPlan: 'enterprise',
    fullName: 'Mohammed Thasthakir',
    email: 'gslixby0@abc.net.au',
    avatar: 'https://weassist.io/wp-content/uploads/2022/11/Avatar-11-1.png'
  };
  const [flipped, setFlipped] = useState(false);
  const [flippedIndex, setFlippedIndex] = useState(false);
  const [array] = useState([1, 2, 3, 4, 5, 6]);
  const flip = (index) => {
    setFlippedIndex(index);
    setFlipped(!flipped);
  };
  return (
    <Grid container spacing={3} sx={{}}>
      {array.map((i, index) => (
        <Grid
          key={index}
          item
          xs={12}
          sm={3}
          sx={{
            position: 'relative',
            width: '100%',
            height: 460,
            display: 'block'
          }}
        >
          <Grid
            onMouseEnter={() => flip(index)}
            onMouseLeave={() => flip(null)}
            className={`${index === flippedIndex ? 'flipped' : ''}`}
            sx={{
              position: 'relative',
              '&.flipped': {
                '.front': {
                  transform: 'rotateY(180deg)'
                },
                '.back': {
                  transform: 'rotateY(0deg)'
                }
              },
              '.front, .back': {
                // boxSizing: 'border-box',
                // display: 'block',
                position: 'absolute',
                backfaceVisibility: 'hidden',
                transition: 'transform ease 500ms'
                // zIndex: 2
              },
              '.front': {
                transform: 'rotateY(0deg)'
              },
              '.back': {
                transform: 'rotateY(-180deg)'
              }
            }}
          >
            <Card className="front" sx={{ width: '100%' }}>
              <CardContent sx={{ pt: 6.5, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                {data.avatar ? (
                  <CustomAvatar
                    src={data.avatar}
                    alt={data.fullName}
                    variant="light"
                    sx={{ width: 100, height: 100, mb: 3, border: `4px solid ${roleColors.subscriber}` }}
                  />
                ) : (
                  <CustomAvatar
                    skin="light"
                    // variant="rounded"
                    color={statusColors.active}
                    sx={{ width: 100, height: 100, mb: 3, fontSize: '3rem' }}
                  >
                    {getInitials(data.fullName)}
                  </CustomAvatar>
                )}
                <Typography variant="h4" sx={{ mb: 2 }}>
                  {data.fullName}
                </Typography>
                <CustomChip
                  rounded
                  skin="light"
                  size="small"
                  label={`@ ${data.username}`}
                  color={statusColors.active}
                  // sx={{ textTransform: 'capitalize' }}
                />
                <Box mt={3}>
                  <img
                    style={{ borderRadius: '10px' }}
                    height={100}
                    src="https://static.vecteezy.com/system/resources/previews/000/406/024/original/vector-qr-code-illustration.jpg"
                    alt="qrCode"
                  />
                </Box>
              </CardContent>

              <CardContent sx={{ pt: (theme) => `${theme.spacing(0)} !important` }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Box sx={{ mr: 4, alignItems: 'center' }}>
                    <CustomChip
                      rounded
                      skin="light"
                      size="small"
                      label={data.role}
                      color={roleColors[data.role]}
                      sx={{ textTransform: 'capitalize' }}
                    />
                    {/* <div style={{display:'flex'}}>
                  <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>1.23k</Typography>
                  <Typography variant="body2">Task Done</Typography>
                </div> */}
                    {/* <CustomAvatar skin="light" variant="rounded" sx={{ mr: 2.5, width: 38, height: 38 }}>
                  <Icon fontSize="1.75rem" icon="tabler:checkbox" />
                </CustomAvatar> */}
                  </Box>
                  <Box sx={{ alignItems: 'center' }}>
                    {/* <div>
                  <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>568</Typography>
                  <Typography variant="body2">Project Done</Typography>
                </div>
                <CustomAvatar skin="light" variant="rounded" sx={{ mr: 2.5, width: 38, height: 38 }}>
                  <Icon fontSize="1.75rem" icon="tabler:briefcase" />
                </CustomAvatar> */}
                    <CustomChip
                      rounded
                      skin="dark"
                      size="small"
                      label={data.role}
                      color={roleColors[data.role]}
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
            <Card className="back" sx={{ width: '100%' }}>
              <CardContent sx={{ pb: 3 }}>
                <Typography variant="body2" sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                  Details
                </Typography>
                <Box sx={{ pt: 4 }}>
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Username:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>@{data.username}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Email:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{data.email}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Status:</Typography>
                    <CustomChip
                      rounded
                      skin="light"
                      size="small"
                      label={data.status}
                      color={statusColors[data.status]}
                      sx={{
                        textTransform: 'capitalize'
                      }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Role:</Typography>
                    <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{data.role}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Tax ID:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>Tax-8894</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Contact:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>+1 {data.contact}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Language:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>English</Typography>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Country:</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{data.country}</Typography>
                  </Box>
                </Box>
              </CardContent>

              <CardActions sx={{ display: 'flex', justifyContent: 'center', pt: 0 }}>
                <Button
                  variant="contained"
                  sx={{ mr: 2 }}
                  // onClick={handleEditClickOpen}
                >
                  Edit
                </Button>
                <Button color="error" variant="tonal" onClick={() => setSuspendDialogOpen(true)}>
                  Suspend
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default TeachingIdCard;
