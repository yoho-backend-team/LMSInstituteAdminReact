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
      instituteId: institute._id
      
    };
    console.log(data)
    dispatch(getAllFaqs(data));
  }, [dispatch, selectedBranchId, refetch]);

  const getFaqCategories = async () => {
    const result = await getActiveFaqCategories();
    setFaqCategories(result.data.data);
  };

  console.log(deletingItemId);

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);

  const handleDelete = (itemId) => {
    console.log('Delete clicked for item ID:', itemId);
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
    console.log('Toggle drawer');
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
              {row?.institute_faq_module?.title}
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
              <MenuItem value="1">Active</MenuItem>
              <MenuItem value="0">Inactive</MenuItem>
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
          console.log('Search results:', result.data);
          dispatch(setUsers(result.data));
        } else {
          console.log(result.message);
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
          <FaqAccordian faqCategories={faqCategories} />
        </Grid>
        <Grid item xs={12}>
          <FaqTableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} selectedBranchId={selectedBranchId} />
        </Grid>
        {faqLoading ? (
          <FaqSkeleton />
        ) : (
          <Grid item xs={12}>
            <Card>
              <DataGrid
                autoHeight
                rowHeight={80}
                rows={faqs}
                columns={columns}
                getRowId={(row) => row._id} 
                disableRowSelectionOnClick
                hideFooterPagination
                hideFooter
                onRowClick={handleRowClick}
              />
            </Card>
          </Grid>
        )}
        <FaqAddDrawer open={addUserOpen} toggle={toggleAddUserDrawer} faqCategories={faqCategories} setRefetch={setRefetch} />
        <FaqEdit
          open={editUserOpen}
          toggle={toggleEditUserDrawer}
          initialValues={selectedRow}
          faqCategories={faqCategories}
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
        <Pagination count={10} color="primary" />
      </Grid>
    </>
  );
};

export default FaqDataGrid;
