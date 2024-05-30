import TabContext from '@mui/lab/TabContext';
import CustomTabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Grid } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Tab from '@mui/material/Tab';
import MainCard from 'components/cards/MainCard';
import TicketsCardsSkeleton from 'components/cards/Skeleton/TicketsCardsSkeleton';
import ClosedTicketCard from 'features/ticket-management/staff/components/ClosedTicketCard';
import OpenTicketCard from 'features/ticket-management/staff/components/OpenTicketCard';
import TicketResolveDrawer from 'features/ticket-management/staff/components/ResolveTicketDrawer';
import { selectLoading, selectStaffClosedTickets } from 'features/ticket-management/staff/redux/closed-tickets/staffClosedTicketSelectors';
import { getAllStaffClosedTickets } from 'features/ticket-management/staff/redux/closed-tickets/staffClosedTicketThunks';
import { selectStaffOpenTickets } from 'features/ticket-management/staff/redux/open-tickets/staffOpenTicketSelectors';
import { getAllStaffOpenTickets } from 'features/ticket-management/staff/redux/open-tickets/staffOpenTicketThunks';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInstitute } from 'utils/get-institute-details';

const StaffTicketsPage = () => {
  // States
  const [value, setValue] = useState('open');
  const dispatch = useDispatch();
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const studentOpenTickets = useSelector(selectStaffOpenTickets);
  const studentClosedTickets = useSelector(selectStaffClosedTickets);
  const staffLoading = useSelector(selectLoading);
  const [openResolveDrawer, setOpenResolveDrawer] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState({});

  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    dispatch(getAllStaffOpenTickets({ branch_id: selectedBranchId, status: 'opened', page: '1',institute_id:useInstitute().getInstituteId() }));
  }, [selectedBranchId, dispatch, refetch]);

  useEffect(() => {
    dispatch(getAllStaffClosedTickets({ branch_id: selectedBranchId, status: 'closed', page: '1',institute_id:useInstitute().getInstituteId() }));
  }, [selectedBranchId, dispatch, refetch]);

  const handleCloseDrawer = () => {
    setOpenResolveDrawer((state) => !state);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSelectedTicket = (data) => {
    setSelectedTicket(data);
  };

  return (
    <>
      <MainCard title="Staff Tickets" sx={{ minHeight: '100vh' }}>
        {staffLoading ? (
          <TicketsCardsSkeleton />
        ) : (
          <TabContext value={value}>
            <CustomTabList pill="true" onChange={handleChange} aria-label="customized tabs example">
              <Tab value="open" label="Opened Tickets" />
              <Tab value="close" label="Closed Tickets" />
            </CustomTabList>
            <TabPanel value="open" sx={{ pl: 0, pr: 0 }}>
              <Grid container spacing={2}>
                {studentOpenTickets?.data?.map((ticket, index) => (
                  <OpenTicketCard
                    key={index}
                    ticket={ticket}
                    handleSelectedTicket={handleSelectedTicket}
                    onClick={() => setOpenResolveDrawer(true)}
                  />
                ))}
                {studentOpenTickets?.last_page !== 1 && (
                  <Grid sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Pagination
                      count={studentOpenTickets?.last_page}
                      color="primary"
                      onChange={(e, page) => {
                        dispatch(getAllStaffOpenTickets({ branch_id: selectedBranchId, page: page }));
                      }}
                    />
                  </Grid>
                )}
              </Grid>
            </TabPanel>
            <TabPanel value="close" sx={{ pl: 0, pr: 0 }}>
              <Grid container spacing={2}>
                {studentClosedTickets?.data?.map((ticket, index) => (
                  <ClosedTicketCard key={index} ticket={ticket} />
                ))}
                {studentClosedTickets?.last_page !== 1 && (
                  <Grid sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Pagination
                      count={studentClosedTickets?.last_page}
                      color="primary"
                      onChange={(e, page) => {
                        dispatch(getAllStaffClosedTickets({ branch_id: selectedBranchId, page: page }));
                      }}
                    />
                  </Grid>
                )}
              </Grid>
            </TabPanel>
          </TabContext>
        )}
        <TicketResolveDrawer open={openResolveDrawer} toggle={handleCloseDrawer} setRefetch={setRefetch} ticket={selectedTicket} />
      </MainCard>
    </>
  );
};

export default StaffTicketsPage;
