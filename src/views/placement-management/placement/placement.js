import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Icon } from '@mui/material';
import client from 'api/client';
import PlacementHeader from 'features/placement/placement-header';
import { useEffect, useState } from 'react';
import { useInstitute } from 'utils/get-institute-details';
import NotificationSkeleton from 'components/cards/Skeleton/NotificationSkeleton';
import { getImageUrl } from 'utils/imageUtils';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import OptionsMenu from 'components/option-menu';
import { Link } from 'react-router-dom';
const Placement = () => {
  const [refetch, setRefetch] = useState(false);
  const [placements, setPlacements] = useState([]);
  const [selecetedPlacement, setSelectedplacement] = useState();
  const [loading, setLoading] = useState(true);
  const instituteId = useInstitute().getDetails();

  useEffect(() => {
    const getAllPlacements = async () => {
      try {
        const res = await client.placements.getAll({ institute_id: instituteId._id });
        console.log("placements",placements)
        setPlacements(res.data);
      } catch (err) {
        console.error('Failed to fetch placements', err);
      } finally {
        setLoading(false);
      }
    };

    getAllPlacements();
  }, []);

  const handleEdit = () => {
   
  }

  return (
    <>
      <Grid container spacing={1} className="match-height">
        <Grid item xs={12}>
          <PlacementHeader />
        </Grid>

        <Grid item xs={12}>
          {loading ? (
            <NotificationSkeleton />
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#F6F6F7' }}>
                    <TableCell>Company Name</TableCell>
                    <TableCell>Interview Date</TableCell>
                    <TableCell>Job name</TableCell>
                    <TableCell>Students</TableCell>
                    <TableCell>Active</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {placements.map((placement, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div>
                          <div style={{ fontWeight: 'bold' }}>{placement.company.name}</div>
                          <div style={{ fontSize: '0.875rem', color: '#555' }}>{placement.company.email}</div>
                        </div>
                      </TableCell>{' '}
                      <TableCell>
                        {new Date(placement.schedule.interviewDate).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </TableCell>
                      <TableCell>{placement.job.name}</TableCell>
                      <TableCell>
                        <AvatarGroup spacing="small" total={placement.student.length > 3 ? placement.student.length : undefined}>
                          {placement.student.slice(0, placement.student.length > 3 ? 3 : placement.student.length).map((student, i) => (
                            <Avatar key={i} src={getImageUrl(student.image)} />
                          ))}
                        </AvatarGroup>
                      </TableCell>
                      <TableCell>
                        <div>
                          {' '}
                          <Box>
                            <OptionsMenu
                              menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
                              iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
                              options={[
                                {
                                  text: 'Edit',
                                  icon: <Icon icon="tabler:edit" />,
                                  menuItemProps: {
                                    onClick: () => {
                                      setSelectedplacement(placement._id);
                                      handleEdit();
                                    }
                                  }
                                },
                                {
                                  text: 'Delete',
                                  icon: <Icon icon="mdi:delete-outline" />,
                                  menuItemProps: {
                                    onClick: () => handleDelete(placement?._id)
                                  }
                                }
                              ]}
                            />
                          </Box>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Placement;
