import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import FaqSkeleton from 'components/cards/Skeleton/FaqSkeleton';
import Icon from 'components/icon';
import { default as DeleteDialog, default as StatusDialog } from 'components/modal/DeleteModel';
import CustomTextField from 'components/mui/text-field';
import OptionsMenu from 'components/option-menu';
import { getActiveFaqCategories } from 'features/faq-management/faq-categories/services/faqCategoryServices';
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
import { useInstitute } from 'utils/get-institute-details';

const FaqDataGrid = () => {
  const [value, setValue] = useState('');
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [statusOpen, setStatusDialogOpen] = useState(false);
  const [faqCategories, setFaqCategories] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [selectedFaqStatus, setSelectedFaqStatus] = useState(null);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const dispatch = useDispatch();

  const faqs = useSelector(selectFaqs);
  const faqLoading = useSelector(selectLoading);
  useEffect(() => {
    getFaqCategories();
  }, []);

  useEffect(() => {
    const institute = JSON.parse(localStorage.getItem('institute'))
  
    const data = {
      branchid: selectedBranchId,      
      instituteId: institute._id,
      page : 1,
      perPage :10
    };

    dispatch(getAllFaqs(data));
  }, [dispatch, selectedBranchId, refetch]);

  const getFaqCategories = async () => {
    const institute = JSON.parse(localStorage.getItem('institute'))
    const data = {
      branchid: selectedBranchId,      
      instituteid: institute.uuid,is_active:true,
      page : 1,
      perPage :10
    };
    const result = await getActiveFaqCategories(data);
    setFaqCategories(result.data);
  };


  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);

  const handleDelete = (itemId) => {
    setDeletingItemId(itemId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteApi = async () => {
    const data = {
      id: deletingItemId
    };
    const response = await deleteFaq(data);
    if (response.success) {
      toast.success(response.message);
      setRefetch((state) => !state);
    } else {
      toast.error(response.message);
    }
  };

  const handleStatusChange = (e, row) => {
    setSelectedFaq(row);
    setSelectedFaqStatus(e.target.value);
    setStatusDialogOpen(true);
  };

  const handleStatusChangeApi = async () => {
    const data = {
      is_active: selectedFaqStatus,
      uuid: selectedFaq?.uuid
    };
    const response = await updateStatusFaq(data);
    if (response.success) {
      toast.success(response.message);
      setRefetch((state) => !state);
    } else {
      toast.error(response.message);
    }
  };

  const toggleEditUserDrawer = () => {
    setEditUserOpen(!editUserOpen);
  };

  const columns = [
    {
      flex: 0.5,
      headerName: 'Id',
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
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
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
      renderCell: ({ row }) => (
        <Box sx={{ gap: 1 }}>
          <OptionsMenu
            menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
            iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
            options={[
              {
                // to: `/apps/invoice/edit/${row.id}`,
                text: 'Edit',
                icon: <Icon icon="tabler:edit" />,
                menuItemProps: {
                  onClick: () => {
                    toggleEditUserDrawer();
                  }
                }
              },
              {
                // to: `/apps/invoice/delete/${row.id}`,
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
          <FaqAccordian faqCategories={faqCategories?.data} faqs={faqs?.data} />
        </Grid>
        <Grid item xs={12}>
          <FaqTableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} selectedBranchId={selectedBranchId} />
        </Grid>
        {faqLoading ? (
          <FaqSkeleton />
        ) : (
          <Grid item xs={12}>
            <Card sx={{ boxShadow: "0 .25rem .875rem 0 rgba(38,43,67,.16)"}} >
              <DataGrid
                sx={{
                  '& .MuiDataGrid-row' : {
                    border: "1px solid #e6e5e7",
                    borderLeft: "none",
                    borderRight: "none",
                  },
                  "& .MuiDataGrid-row" : {
                    border : "1px solid #e6e5e7",
                    borderLeft: "none",
                    borderRight: "none",
                    ":hover" : {
                       backgroundColor : "#f5f5f7",
                       border : "1px solid #e6e5e7",
                       borderLeft: "none",
                       borderRight: "none"
                    }
                  },
                  "& .MuiDataGrid-columnHeaders" : {
                       border : "1px solid #e6e5e7",
                       borderLeft: "none",
                       borderRight: "none"
                  }
                }}
                autoHeight
                rowHeight={60}
                rows={faqs?.data?faqs?.data:[]}
                columns={columns}
                getRowId={(row) => row._id} 
                disableRowSelectionOnClick
                hideFooterPagination
                hideFooter
                onRowClick={handleRowClick}
                disableColumnFilter={true}
                disableColumnMenu={true}
              />
            </Card>
          </Grid>
        )}
        <FaqAddDrawer open={addUserOpen} toggle={toggleAddUserDrawer} faqCategories={faqCategories?.data} setRefetch={setRefetch} />
        <FaqEdit
          open={editUserOpen}
          toggle={toggleEditUserDrawer}
          initialValues={selectedRow}
          faqCategories={faqCategories?.data}
          setRefetch={setRefetch}
        />
        <DeleteDialog
          open={isDeleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          description="Are you sure you want to delete this item?"
          title="Delete"
          handleSubmit={handleDeleteApi}
        />
        <StatusDialog
          open={statusOpen}
          setOpen={setStatusDialogOpen}
          description="Are you sure you want to Change Status"
          title="Status"
          handleSubmit={handleStatusChangeApi}
        />
      </Grid>
      <Grid sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
      {faqs?.last_page !== 1 && (
          <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Pagination
              count={faqs?.last_page}
              color="primary"
              onChange={async (e, page) => {
                const data = {
                  page: page
                };
                dispatch(getActiveFaqCategories(data));
              }}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default FaqDataGrid;
