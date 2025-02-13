import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { fetchUserProfile, removeSelectedChat, selectChat, sendMsg } from 'features/community/components/AppChat';
import { useDispatch, useSelector } from 'react-redux';
import { formatDateToMonthShort } from 'utils/format';
import { getInitials } from 'utils/get-initials';
import CommunitySkeleton from 'components/cards/Skeleton/CommunitySkeleton';
import ChatContent from 'features/community/components/ChatContent';
import SidebarLeft from 'features/community/components/SidebarLeft';
import { getAllCommunities } from 'features/community/redux/communityThunks';
import { selectCommunities } from 'features/community/redux/communitySelectors';
import { getCommunityDetails } from 'features/community/services/communityServices';
import { io } from 'socket.io-client';
import { useSpinner } from 'context/spinnerContext';
import secureLocalStorage from 'react-secure-storage';

<<<<<<< HEAD
const useTimeout = (callback, delay) => {
=======
const FaqDataGrid = () => {
  const [value, setValue] = useState('');
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [successDescription, setSuccessDescription] = useState('');
  const [failureDescription, setFailureDescription] = useState('');
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [statusOpen, setStatusDialogOpen] = useState(false);
  const [faqCategories, setFaqCategories] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [selectedFaqStatus, setSelectedFaqStatus] = useState(null);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

  const dispatch = useDispatch();
  const faqs = useSelector(selectFaqs);
  const faqLoading = useSelector(selectLoading);



  const fetchFaqs = (page) => {
    const institute = JSON.parse(localStorage.getItem('institute'));
    const data = {
      branchid: institute?.branchid,
      instituteId: institute?._id,
      page,
      perPage: rowsPerPage
    };
    dispatch(getAllFaqs(data));
  };

  useEffect(() => {
    const institute = JSON.parse(localStorage.getItem('institute'));

    const data = {
      branchid: selectedBranchId,
      instituteId: institute._id,
      page: 1,
      perPage: 10
    };
    console.log('data:', data);

    dispatch(getAllFaqs(data));
  }, [dispatch, selectedBranchId, refetch]);

  useEffect(() => {
    const getFaqCategories = async () => {
      const institute = JSON.parse(localStorage.getItem('institute'));
      const data = {
        branchid: selectedBranchId,
        instituteid: institute.uuid,
        is_active: true,
        page: 1,
        perPage: 10
      };
      const result = await getActiveFaqCategories(data);
      setFaqCategories(result.data);
    };
    getFaqCategories();
  }, [selectedBranchId]);

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);

  const handleDelete = (itemId) => {
    setDeletingItemId(itemId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteApi = async () => {
    try {
      const data = {
        id: deletingItemId
      };
      const response = await deleteFaq(data);
      console.log('delete response data : ', response);

      // if (faqs?.data?.length === 1 && currentPage > 1) {
      //   setCurrentPage(currentPage - 1);
      // }
      if (response.success) {
        setSuccessDescription('Item deleted successfully!');
        setFailureDescription('');
        // toast.success(response.message);
        // fetchFaqs(currentPage);
        setRefetch((state) => !state);
      } else {
        setFailureDescription('Failed to delete the item. Please try again.');
        setSuccessDescription('');
        toast.error(response.message);
      }
    } catch (error) {
      setFailureDescription('An error occurred while deleting the item.');
      setSuccessDescription('');
    }
  };
  // console.log(faqs,"faqs")
  const handleStatusChangeApi = async () => {
    const data = {
      is_active: selectedFaqStatus,
      uuid: selectedFaq?.uuid
    };
    const response = await updateStatusFaq(data);
    if (response.success) {
      toast.success(response.message);
      fetchFaqs(currentPage);
    } else {
      toast.error(response.message);
    }
  };

  useEffect(() => {
    if (faqs?.data?.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1); 
  } else {
    fetchFaqs(currentPage); 
    console.log("last page",faqs);
    
  }
  }, [currentPage, refetch]);

  const handleStatusChange = (e, row) => {
    setSelectedFaq(row);
    setSelectedFaqStatus(e.target.value);
    setStatusDialogOpen(true);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    // fetchFaqs(page);  
  };
  

  const toggleEditUserDrawer = () => {
    setEditUserOpen(!editUserOpen);
  };

  const columns = [
    {
      flex: 0.5,
      headerName: 'Id',
      sortable: false,
      field: 'employee_id',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
            {row?.id}
          </Typography>
        );
      }
    },
    {
      flex: 1.5,
      field: 'title',
      headerName: 'Faq Name',
      sortable: false,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                sx={{
                  textAlign: 'justify',
                  fontSize: '15px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: 'text.secondary'
                }}
              >
                {row?.title}
              </Typography>
              <Typography noWrap sx={{ textAlign: 'justify', color: 'text.secondary', mt: 1.3, fontSize: '13px' }}>
                {row?.description}
              </Typography>
            </Box>
          </Box>
        );
      }
    },
    {
      flex: 1,
      field: 'Category',
      headerName: 'Category',
      sortable: false,
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap sx={{ textAlign: 'justify', color: 'text.secondary', textTransform: 'capitalize' }}>
              {row?.title}
            </Typography>
          </Box>
        );
      }
    },
    {
      flex: 1,
      field: 'status',
      headerName: 'Status',
      sortable: false,
      renderCell: ({ row }) => {
        return (
          <div>
            <CustomTextField select value={row.is_active} onChange={(e) => handleStatusChange(e, row)}>
              <MenuItem value="true">Active</MenuItem>
              <MenuItem value="false">Inactive</MenuItem>
            </CustomTextField>
          </div>
        );
      }
    },
    {
      flex: 1,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      renderCell: ({ row }) => (
        <Box sx={{ gap: 1 }}>
          <OptionsMenu
            menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
            iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
            options={[
              {
                text: 'Edit',
                icon: <Icon icon="tabler:edit" />,
                menuItemProps: {
                  onClick: () => {
                    toggleEditUserDrawer();
                  }
                }
              },
              {
                text: 'Delete',
                icon: <Icon icon="mdi:delete-outline" />,
                menuItemProps: {
                  onClick: () => {
                    handleDelete(row?.uuid);
                  }
                }
              }
            ]}
          />
        </Box>
      )
    }
  ];
>>>>>>> a8d8554387264e85ea792f13f7281cd5e0c92bd4

  useEffect(() => {
    const fetchData = async () => {
      const data = {
        branchid: selectedBranchId,
        userId: userData._id,
        instituteId: institute._id
      };

      const response = await dispatch(getAllCommunities(data));

      if (response && response.data.data && response.data.data.length > 0) {
        const chatId = response.data.data[0]._id;
        const updatedData = { ...data, chatId };

        const messages = await getAllBatchChats(updatedData);
        if (messages) {
          setChats(messages.data);
        }
      }
    };

    fetchData();
  }, [dispatch, selectedBranchId, chats]);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen);
  const handleUserProfileLeftSidebarToggle = () => setUserProfileLeftOpen(!userProfileLeftOpen);
  const handleUserProfileRightSidebarToggle = async () => {
    const result = await getCommunityDetails({ chatId: selectedBatch._id });
    if (result) {
      setCommunityDetails(result?.data);
    }
    setUserProfileRightOpen(!userProfileRightOpen);
  };

  const [loading, setLoading] = useState(true);

  useTimeout(() => {
    setLoading(false);
  }, 1000);

  return (
    <>
<<<<<<< HEAD
      {loading ? (
        <CommunitySkeleton />
      ) : (
        <Box
          className="app-chat"
          sx={{
            width: '100%',
            display: 'flex',
            height: '81vh',
            flexDirection: 'row',
            borderRadius: 1,
            overflow: 'hidden',
            position: 'relative',
            backgroundColor: 'background.paper',
            boxShadow: skin === 'bordered' ? 0 : 6,
            ...(skin === 'bordered' && { border: `1px solid ${theme.palette.divider}` })
          }}
        >
          <SidebarLeft
            store={store}
            hidden={hidden}
            mdAbove={mdAbove}
            dispatch={dispatch}
            statusObj={statusObj}
            userStatus={userStatus}
            selectChat={selectChat}
            getInitials={getInitials}
            sidebarWidth={sidebarWidth}
            setUserStatus={setUserStatus}
            leftSidebarOpen={leftSidebarOpen}
            removeSelectedChat={removeSelectedChat}
            userProfileLeftOpen={userProfileLeftOpen}
            formatDateToMonthShort={formatDateToMonthShort}
            handleLeftSidebarToggle={handleLeftSidebarToggle}
            handleUserProfileLeftSidebarToggle={handleUserProfileLeftSidebarToggle}
            communities={communities}
            setChats={setChats}
            chats={chats}
            setSelectedBatch={setSelectedBatch}
            setCommunityDetails={setCommunityDetails}
            communityDetails={communityDetails}
            socket={socket}
            setMessages={setMessages}
            messages={messages}
          />
          <ChatContent
            store={store}
            hidden={hidden}
            sendMsg={sendMsg}
            mdAbove={mdAbove}
            dispatch={dispatch}
            statusObj={statusObj}
            getInitials={getInitials}
            sidebarWidth={sidebarWidth}
            userProfileRightOpen={userProfileRightOpen}
            handleLeftSidebarToggle={handleLeftSidebarToggle}
            handleUserProfileRightSidebarToggle={handleUserProfileRightSidebarToggle}
            chats={chats}
            selectedBatch={selectedBatch}
            setChats={setChats}
            communityDetails={communityDetails}
            socket={socket}
            messages={messages}
            setMessages={setMessages}
          />
        </Box>
      )}
=======
      <Grid container>
        <Grid item xs={12}>
          {/* <FaqAccordian faqCategories={faqCategories?.data} faqs={faqs?.data} /> */}
        </Grid>
        <Grid item xs={12}>
          <FaqTableHeader
            value={value}
            handleFilter={handleFilter}
            faqCategories={faqCategories?.data}
            toggle={toggleAddUserDrawer}
            selectedBranchId={selectedBranchId}
          />
        </Grid>
        {faqLoading ? (
          <Grid item xs={12}>
            <Card sx={{ boxShadow: '0 .25rem .875rem 0 rgba(38,43,67,.16)' }}>
              <FaqSkeleton />
            </Card>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Card sx={{ boxShadow: '0 .25rem .875rem 0 rgba(38,43,67,.16)', mt: 1 }}>
              <DataGrid
                sx={{
                  '& .MuiDataGrid-row': {
                    border: '1px solid#cfccd1',
                    borderLeft: 'none',
                    borderRight: 'none'
                  },
                  '& .MuiDataGrid-row': {
                    border: '1px solid #e6e5e7',
                    borderLeft: 'none',
                    borderRight: 'none',
                    ':hover': {
                      backgroundColor: '#f5f5f7',
                      border: '1px solid #e6e5e7',
                      borderLeft: 'none',
                      borderRight: 'none'
                    }
                  },
                  '& .MuiDataGrid-columnHeaders': {
                    border: '1px solid #e6e5e7',
                    borderLeft: 'none',
                    borderRight: 'none'
                  },
                  '& .MuiDataGrid-columnHeader:hover': { backgroundColor: 'inherit', borderRight: 'none' }
                }}
                autoHeight
                rowHeight={60}
                rows={faqs?.data || []}
                columns={columns}
                getRowId={(row) => row._id || row.id}
                disableRowSelectionOnClick
                hideFooterPagination
                hideFooter
                onRowClick={handleRowClick}
                disableColumnFilter
                disableColumnMenu
              />
            </Card>
          </Grid>
        )}

        <FaqAddDrawer open={addUserOpen} toggle={toggleAddUserDrawer} faqCategories={faqCategories?.data || []} setRefetch={setRefetch} />
        <FaqEdit
          open={editUserOpen}
          toggle={toggleEditUserDrawer}
          initialValues={selectedRow || {}}
          faqCategories={faqCategories?.data}
          setRefetch={setRefetch}
        />

        <DeleteDialog
          open={isDeleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          description="Are you sure you want to delete this item?"
          title="Delete"
          handleSubmit={handleDeleteApi}
          successDescription={successDescription}
          failureDescription={failureDescription}
        />

        <StatusDialog
          open={statusOpen}
          setOpen={setStatusDialogOpen}
          description="Are you sure you want to Change Status"
          title="Status"
          handleSubmit={handleStatusChangeApi}
        />
      </Grid>
      <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination count={faqs?.last_page || 1} page={currentPage} onChange={handlePageChange} />
      </Grid>
>>>>>>> a8d8554387264e85ea792f13f7281cd5e0c92bd4
    </>
  );
};
Community.contentHeightFixed = true;

<<<<<<< HEAD
export default Community;
=======
export default FaqDataGrid;
