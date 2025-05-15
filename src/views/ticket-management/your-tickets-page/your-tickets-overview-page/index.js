import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Grid, Pagination, Tab, Typography, useTheme } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import MainCard from 'components/cards/MainCard';
import AdminTicketsCardsSkeleton from 'components/cards/Skeleton/AdminTcketSkeleton';
import ClosedTicketCard from 'features/ticket-management/your-tickets/components/ClosedTicketCard';
import CreateTicketDrawer from 'features/ticket-management/your-tickets/components/CreateTicketDrawer';
import OpenTicketCard from 'features/ticket-management/your-tickets/components/OpenTicketCard';
import { selectClosedTickets } from 'features/ticket-management/your-tickets/redux/closed-tickets/yourClosedTicketSelectors';
import { getAllClosedTickets } from 'features/ticket-management/your-tickets/redux/closed-tickets/yourClosedTicketThunks';
import { selectLoading, selectOpenTickets } from 'features/ticket-management/your-tickets/redux/open-tickets/yourOpenTicketSelectors';
import { getAllOpenTickets } from 'features/ticket-management/your-tickets/redux/open-tickets/yourOpenTicketThunks';
import { useInstitute } from 'utils/get-institute-details';
import NoDataFoundComponent from 'components/empty/noDataFound';
import { useNavigate } from 'react-router';
import { IconArrowLeft } from '@tabler/icons-react';

const YourTicketsPage = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('open');
  const dispatch = useDispatch();
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const adminOpenTickets = useSelector(selectOpenTickets);
  const adminClosedTickets = useSelector(selectClosedTickets);
  const studentLoading = useSelector(selectLoading);
  const [openResolveDrawer, setOpenResolveDrawer] = useState(false);
  const [openCreateTicketDrawer, setOpenCreateTicketDrawer] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState({});
  const [refetch, setRefetch] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    dispatch(
      getAllOpenTickets({ branch_id: selectedBranchId, status: 'opened', page: '1', institute_id: useInstitute().getInstituteId() })
    );
  }, [selectedBranchId, dispatch, refetch]);

  useEffect(() => {
    dispatch(
      getAllClosedTickets({ branch_id: selectedBranchId, status: 'closed', page: '1', institute_id: useInstitute().getInstituteId() })
    );
  }, [selectedBranchId, dispatch, refetch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSelectedTicket = (data) => {
    setSelectedTicket(data);
  };

  return (
    <>
      <Button sx={{my:2}} variant='contained' onClick={() => navigate('/ticket-management/student-ticket')}><IconArrowLeft stroke={2}/></Button>
      <MainCard>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h3">Your Tickets</Typography>
          <Button variant="contained" onClick={() => setOpenCreateTicketDrawer(true)}>
            Create
          </Button>
        </Box>
        {studentLoading ? (
          <AdminTicketsCardsSkeleton />
        ) : (
          <>
            <Grid container spacing={2}>
              <Grid marginTop={5} item xs={12}>
                <TabContext value={value}>
                  <TabList
                    onChange={handleChange}
                    aria-label="customized tabs example"
                    sx={{
                      '& .MuiTabs-indicator': {
                        backgroundColor: theme.palette.primary.main,
                        height: 4
                      },
                      '& .MuiTab-root': {
                        textTransform: 'none',
                        minWidth: 100,
                        fontWeight: theme.typography.fontWeightRegular,
                        marginRight: theme.spacing(1),
                        color: theme.palette.text.secondary,
                        transition: 'all 0.3s ease',
                        overflow: 'visible',
                        '&.Mui-selected': {
                          color: theme.palette.primary.main,
                          fontWeight: theme.typography.fontWeightMedium
                        },
                        '&:hover': {
                          transform: 'translateY(2px)'
                        },
                        borderRadius: '8px',
                        padding: '12px 16px',
                        background: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
                        boxShadow: `0 4px 15px rgba(0, 0, 0, 0.1)`
                      },
                      mb: 2
                    }}
                  >
                    <Tab value="open" label={<Typography variant="h6">Opened Tickets</Typography>} />
                    <Tab value="close" label={<Typography variant="h6">Closed Tickets</Typography>} />
                  </TabList>

                  <TabPanel value="open" sx={{ pl: 0, pr: 0 }}>
                    {adminOpenTickets?.data?.data?.length > 0 ? (
                      <Grid container spacing={2}>
                        {adminOpenTickets?.data?.map((ticket, index) => (
                          <OpenTicketCard key={index} ticket={ticket} handleSelectedTicket={handleSelectedTicket} />
                        ))}
                      </Grid>
                    ) : (
                      <NoDataFoundComponent
                        title="No Open Tickets Found"
                        description="There are currently no open tickets."
                        buttonText="Refresh"
                        onAdd={() => setRefetch(!refetch)}
                      />
                    )}
                  </TabPanel>

                  <TabPanel value="close" sx={{ pl: 0, pr: 0 }}>
                    {adminOpenTickets?.data?.data?.length > 0 ? (
                      <Grid container spacing={2}>
                        {adminClosedTickets?.data?.map((ticket, index) => (
                          <ClosedTicketCard key={index} ticket={ticket} />
                        ))}
                      </Grid>
                    ) : (
                      <NoDataFoundComponent
                        title="No Closed Tickets Found"
                        description="There are currently no closed tickets."
                        buttonText="Refresh"
                        onAdd={() => setRefetch(!refetch)}
                      />
                    )}
                  </TabPanel>
                </TabContext>
              </Grid>
            </Grid>
            {adminClosedTickets.length > 1 && (
              <Grid sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Pagination
                  count={adminClosedTickets?.last_page}
                  color="primary"
                  onChange={(e, page) => {
                    dispatch(getAllClosedTickets({ branch_id: selectedBranchId, page: page }));
                  }}
                />
              </Grid>
            )}
          </>
        )}
        <CreateTicketDrawer
          open={openCreateTicketDrawer}
          toggle={() => setOpenCreateTicketDrawer(false)}
          setRefetch={setRefetch}
          ticket={selectedTicket}
        />
      </MainCard>
    </>
  );
};

export default YourTicketsPage;
