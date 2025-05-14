import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import FaqSkeleton from 'components/cards/Skeleton/FaqSkeleton';
import NoDataFoundComponent from 'components/empty/noDataFound';
import Icon from 'components/icon';
import { default as DeleteDialog, default as StatusDialog } from 'components/modal/DeleteModel';
import CustomTextField from 'components/mui/text-field';
import OptionsMenu from 'components/option-menu';
import { getActiveFaqCategories, getAllFaqCategories } from 'features/faq-management/faq-categories/services/faqCategoryServices';
import FaqAccordian from 'features/faq-management/faqs/components/FaqAccordian';
import FaqAddDrawer from 'features/faq-management/faqs/components/FaqAddDrawer';
import FaqEdit from 'features/faq-management/faqs/components/FaqEdit';
import FaqTableHeader from 'features/faq-management/faqs/components/FaqTableHeader';
import { selectFaqs, selectLoading } from 'features/faq-management/faqs/redux/faqSelectors';
import { getAllFaqs } from 'features/faq-management/faqs/redux/faqThunks';
import { deleteFaq, updateStatusFaq } from 'features/faq-management/faqs/services/faqServices';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import secureLocalStorage from 'react-secure-storage';
import { useInstitute } from 'utils/get-institute-details';
import { useStudent } from 'utils/get-student-details';


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
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const faqs = useSelector(selectFaqs);
  const faqLoading = useSelector(selectLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  useEffect(() => {
    const getFaqCategories = async () => {
      const institute = useInstitute().getDetails();
      console.log("institue uuid",institute.uuid);
      const data = {
        branchid: selectedBranchId,
        instituteid: institute.uuid,
        is_active: true,
        page: 1,
        perPage: 10
      };
      const result = await getAllFaqCategories(data);
      console.log("faqcategories objectid:",result)
      setFaqCategories(result.data);
    };
    getFaqCategories();
  }, [selectedBranchId]);
  console.log("faqcat id:",faqCategories);

  const fetchFaqs = async (page) => {
  try {
    const institute = useInstitute().getDetails();
    const data = {
      branchid: selectedBranchId,
      instituteId: institute?.uuid,
      page: page,
      perPage: rowsPerPage,
      catid: faqCategories.map((category => category._id))
    };
    console.log("faq sending data:", data);
    
    const response = await dispatch(getAllFaqs(data)); 
    console.log("Response after dispatch:", response); 

    setError(false);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    setError(true);
  }
};



  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);

  const handleDelete = (itemId) => {
    setDeletingItemId(itemId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteApi = async () => {
    try {
      const data = { uuid: deletingItemId };
      const response = await deleteFaq(data);
      console.log('Delete response data:', response);

      if (response.success) {
        setSuccessDescription('Item deleted successfully!');
        setFailureDescription('');
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

  const handlePageChange = (event, page) => {
    console.log('Page changed to:', page);
    setCurrentPage(page);
    fetchFaqs(page);
  };

  useEffect(() => {
    console.log('Current Page:', currentPage);
    if (faqs?.data?.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      fetchFaqs(currentPage);
    }
  }, [currentPage, refetch]);

  const handleStatusChange = (e, row) => {
    setSelectedFaq(row);
    setSelectedFaqStatus(e.target.value);
    setStatusDialogOpen(true);
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

  const handleFilter = useCallback(
    async (val) => {
      try {
        setValue(val);
        const result = await searchUsers(val);
        if (result.success) {
          dispatch(setUsers(result.data));
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch]
  );

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
  };

  return (
    <>
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
        ) : faqs?.data?.length > 0 ? (
          <Grid item xs={12}>
            <Card sx={{ boxShadow: '0 .25rem .875rem 0 rgba(38,43,67,.16)', mt: 1 }}>
              <DataGrid
                sx={{
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
        ) : error ? (
          <Grid item xs={12}>
            <NoDataFoundComponent
              title={error}
              description={error.message}
              buttonText="Retry"
              onAdd={() => fetchFaqs(currentPage)}
            />
          </Grid>
        ) : null }

        <FaqAddDrawer open={addUserOpen} toggle={toggleAddUserDrawer} faqCategories={faqCategories || []} setRefetch={setRefetch} />
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
    </>
  );
};

export default FaqDataGrid;
