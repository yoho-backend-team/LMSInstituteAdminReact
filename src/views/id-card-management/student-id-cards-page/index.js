import { useEffect, useState } from 'react';
// ** MUI Imports
import { Avatar as CustomAvatar, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import IdCardSkeleton from 'components/cards/Skeleton/IdCardSkeleton';
import DeleteDialog from 'components/modal/DeleteModel';
import CustomChip from 'components/mui/chip';
import StudentFilterCard from 'features/id-card-management/student-id-cards/components/StudentFilterCard';
import { selectLoading, selectStudentIdCards } from 'features/id-card-management/student-id-cards/redux/studentIdcardSelectors';

import { getAllStudentIdCards } from 'features/id-card-management/student-id-cards/redux/studentIdcardThunks';
import { useDispatch, useSelector } from 'react-redux';
import { getInitials } from 'utils/get-initials';

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

const StudentIdCard = () => {
  const [flipped, setFlipped] = useState(false);
  const [flippedIndex, setFlippedIndex] = useState(false);

  const flip = (index) => {
    setFlippedIndex(index);
    setFlipped(!flipped);
  };

  const [statusValue, setStatusValue] = useState('');
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleFilterByStatus = (e) => {
    setStatusValue(e.target.value);
    setDeleteDialogOpen(true);
  };

  const dispatch = useDispatch();
  const StudentIdCards = useSelector(selectStudentIdCards);
  const StudentIdCardsLoading = useSelector(selectLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  console.log(StudentIdCards);

  useEffect(() => {
    dispatch(getAllStudentIdCards(selectedBranchId));
  }, [dispatch, selectedBranchId]);

  const data = [
    {
      id: 1,
      role: 'admin',
      status: 'active',
      username: 'mdthasthakir',
      country: 'El Salvador',
      company: 'Yotz PVT LTD',
      billing: 'Manual - Cash',
      contact: '(479) 232-9151',
      currentPlan: 'enterprise',
      fullName: 'Mohammed Thasthakir',
      email: 'gslixby0@abc.net.au',
      avatar: 'https://weassist.io/wp-content/uploads/2022/11/Avatar-11-1.png'
    },
    {
      id: 2,
      role: 'user',
      status: 'inactive',
      username: 'johndoe123',
      country: 'United States',
      company: 'Tech Solutions Inc.',
      billing: 'Credit Card',
      contact: '(123) 456-7890',
      currentPlan: 'basic',
      fullName: 'John Doe',
      email: 'johndoe@example.com',
      avatar: 'https://example.com/avatar2.png'
    },
    {
      id: 3,
      role: 'manager',
      status: 'active',
      username: 'manager123',
      country: 'United Kingdom',
      company: 'ABC Corporation',
      billing: 'PayPal',
      contact: '(987) 654-3210',
      currentPlan: 'premium',
      fullName: 'Emma Johnson',
      email: 'emma@example.com',
      avatar: 'https://example.com/avatar3.png'
    },
    {
      id: 4,
      role: 'user',
      status: 'active',
      username: 'jsmith',
      country: 'Canada',
      company: 'XYZ Ltd.',
      billing: 'Automatic - Credit Card',
      contact: '(567) 890-1234',
      currentPlan: 'standard',
      fullName: 'Jane Smith',
      email: 'jane.smith@example.com',
      avatar: 'https://example.com/avatar4.png'
    },
    {
      id: 5,
      role: 'admin',
      status: 'active',
      username: 'adminuser',
      country: 'Australia',
      company: 'Acme Corp',
      billing: 'Automatic - Bank Transfer',
      contact: '(111) 222-3333',
      currentPlan: 'enterprise',
      fullName: 'Admin User',
      email: 'admin@example.com',
      avatar: 'https://example.com/avatar5.png'
    },
    {
      id: 6,
      role: 'manager',
      status: 'inactive',
      username: 'manager456',
      country: 'France',
      company: 'Tech Innovations',
      billing: 'Manual - Check',
      contact: '(444) 555-6666',
      currentPlan: 'premium',
      fullName: 'Louis Dupont',
      email: 'louis@example.com',
      avatar: 'https://example.com/avatar6.png'
    }
  ];

  return (
    <>
      <Grid>
        <Grid spacing={1} className="match-height">
          {StudentIdCardsLoading ? (
            <IdCardSkeleton />
          ) : (
            <Grid>
              <Grid item xs={12} sm={12}>
                <StudentFilterCard />
              </Grid>
              <Grid container spacing={2} className="match-height" sx={{ marginTop: 0 }}>
                {data.map((item, index) => (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    sm={3}
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: 410,
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
                          position: 'absolute',
                          backfaceVisibility: 'hidden',
                          transition: 'transform ease 500ms'
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
                              color={statusColors.active}
                              sx={{ width: 100, height: 100, mb: 3, fontSize: '3rem' }}
                            >
                              {getInitials(item.fullName)}
                            </CustomAvatar>
                          )}
                          <Typography variant="h4" sx={{ mb: 2 }}>
                            {item.fullName}
                          </Typography>
                          <CustomChip rounded skin="light" size="small" label={`@ ${item.username}`} color={statusColors.active} />
                          <Box mt={3}>
                            <img
                              style={{ borderRadius: '10px' }}
                              height={100}
                              src="https://static.vecteezy.com/system/resources/previews/000/406/024/original/vector-qr-code-illustration.jpg"
                              alt="qrCode"
                            />
                          </Box>
                        </CardContent>
                      </Card>
                      <Card className="back" sx={{ width: '100%' }}>
                        <CardContent sx={{ pb: 3 }}>
                          <Typography variant="body2" sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                            Details
                          </Typography>
                          <Box sx={{ pt: 4 }}>
                            <Box sx={{ display: 'flex', mb: 3, flexWrap: 'wrap' }}>
                              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Username:</Typography>
                              <Typography sx={{ color: 'text.secondary' }}>@{item.username}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', mb: 2, flexWrap: 'wrap' }}>
                              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Email:</Typography>
                              <Typography sx={{ color: 'text.secondary' }}>{item.email}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', mb: 2, flexWrap: 'wrap' }}>
                              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Role:</Typography>
                              <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{item.role}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', mb: 2, flexWrap: 'wrap' }}>
                              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Tax ID:</Typography>
                              <Typography sx={{ color: 'text.secondary' }}>Tax-8894</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', mb: 2, flexWrap: 'wrap' }}>
                              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Contact:</Typography>
                              <Typography sx={{ color: 'text.secondary' }}>+1 {item.contact}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', mb: 2, flexWrap: 'wrap' }}>
                              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Language:</Typography>
                              <Typography sx={{ color: 'text.secondary' }}>English</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Country:</Typography>
                              <Typography sx={{ color: 'text.secondary' }}>{item.country}</Typography>
                            </Box>
                          </Box>

                          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                            <TextField
                              select
                              fullWidth
                              label="Status"
                              SelectProps={{ value: statusValue, onChange: (e) => handleFilterByStatus(e) }}
                            >
                              <MenuItem value="0">Active</MenuItem>
                              <MenuItem value="1">Deactive</MenuItem>
                            </TextField>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
              <Grid container justifyContent="flex-end" mt={2}>
                <div className="demo-space-y">
                  <Pagination count={10} color="primary" />
                </div>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      <DeleteDialog
        open={isDeleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        description="Are you sure you want to delete this item?"
        title="Delete"
      />
    </>
  );
};

export default StudentIdCard;
