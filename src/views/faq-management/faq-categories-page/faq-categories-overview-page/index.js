import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import ContentSkeleton from 'components/cards/Skeleton/ContentSkeleton';
import Icon from 'components/icon';
import { default as DeleteDialog, default as StatusDialog } from 'components/modal/DeleteModel';
import CustomTextField from 'components/mui/text-field';
import OptionsMenu from 'components/option-menu';
import FaqCategoriesAddDrawer from 'features/faq-management/faq-categories/components/FaqCategoriesAddDrawer';
import FaqCategoriesEdit from 'features/faq-management/faq-categories/components/FaqCategoriesEdit';
import FaqCategoriesTableHeader from 'features/faq-management/faq-categories/components/FaqCategoriesTableHeader';
import { selectFaqCategories, selectLoading } from 'features/faq-management/faq-categories/redux/faqCategorySelectors';
import { getAllFaqCategories } from 'features/faq-management/faq-categories/redux/faqCategoryThunks';
import { deleteFaqCategory, updateStatusFaqCategory } from 'features/faq-management/faq-categories/services/faqCategoryServices';
import { updateFaqCategory } from 'features/faq-management/faq-categories/services/faqCategoryServices';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import secureLocalStorage from 'react-secure-storage';
import { useInstitute } from 'utils/get-institute-details';

const CategoriesDataGrid = () => {
  const [value, setValue] = useState('');
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedFaqCategory, setSelectedFaqCategory] = useState(null);
  const [selectedFaqCategoryStatus, setSelectedFaqCategoryStatus] = useState(null);
  const [successDescription, setSuccessDescription] = useState('');
  const [failureDescription, setFailureDescription] = useState('');
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [statusOpen, setStatusDialogOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  const dispatch = useDispatch();
  const faqCategories = useSelector(selectFaqCategories);
  const faqCategoryLoading = useSelector(selectLoading);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

  useEffect(() => {
    const institute = useInstitute().getDetails();
    console.log('instituteId:', institute.uuid);

    const data = {
      branchid: selectedBranchId,
      instituteid: institute?.uuid,
      page: currentPage,
      perPage: rowsPerPage
    };
    console.log('data:', data);
    dispatch(getAllFaqCategories(data));
  }, [dispatch, selectedBranchId, currentPage, refetch]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
  };

  const handleStatusChange = (e, row) => {
    setSelectedFaqCategory(row);
    setSelectedFaqCategoryStatus(e.target.value);
    setStatusDialogOpen(true);
  };

  const handleStatusChangeApi = async () => {
    const data = {
      is_active: selectedFaqCategoryStatus,
      uuid: selectedFaqCategory?.uuid
    };
    const response = await updateFaqCategory(data);
    if (response.success) {
      toast.success(response.message);
      setRefetch((state) => !state);
    } else {
      toast.error(response.message);
    }
  };


  const handleDelete = (itemId) => {
    setDeletingItemId(itemId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteApi = async () => {
    try {
      const data = {
        uuid: deletingItemId
      };
      const response = await deleteFaqCategory(data);
      console.log('delete response data : ', response);

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

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);
  const toggleEditUserDrawer = () => setEditUserOpen(!editUserOpen);

  const columns = [
    {
      flex: 0.5,
      headerName: 'Id',
      sortable: false,
      field: 'serial',
      renderCell: (params) => {
        const index = params.api.getAllRowIds().indexOf(params.id);
        return (
          <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary' }}>
            {(currentPage - 1) * rowsPerPage + index + 1}
          </Typography>
        );
      }
    },
    {
      flex: 2.2,
      field: 'category_name',
      headerName: 'Category Name',
      sortable: false,
      renderCell: ({ row }) => (
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
              {row?.category_name}
            </Typography>
            <Typography noWrap sx={{ textAlign: 'justify', color: 'text.secondary', mt: 1.3, fontSize: '13px' }}>
              {row?.description}
            </Typography>
          </Box>
        </Box>
      )
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

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <FaqCategoriesTableHeader
            value={value}
            handleFilter={handleFilter}
            toggle={toggleAddUserDrawer}
            selectedBranchId={selectedBranchId}
          />
        </Grid>
        {faqCategoryLoading ? (
          <ContentSkeleton />
        ) : (
          <Grid item xs={12}>
            <Card sx={{ boxShadow: '0 .25rem .875rem 0 rgba(38,43,67,.16)', mt: 1 }}>
              <DataGrid
                autoHeight
                key={'id'}
                sx={{
                  '& .MuiDataGrid-row': {
                    border: '1px solid #e6e5e7',
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
                  }
                }}
                rowHeight={60}
                rows={faqCategories?.data || []}
                columns={columns}
                disableRowSelectionOnClick
                disableColumnFilter
                disableColumnMenu
                onRowClick={handleRowClick}
                hideFooterPagination
                hideFooter
              />
            </Card>
          </Grid>
        )}
        <FaqCategoriesAddDrawer open={addUserOpen} toggle={toggleAddUserDrawer} setRefetch={setRefetch} />
        <FaqCategoriesEdit open={editUserOpen} toggle={toggleEditUserDrawer} initialValues={selectedRow} setRefetch={setRefetch} />
        <DeleteDialog
          open={isDeleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          description="Are you sure you want to delete this item?"
          title="Delete"
          handleSubmit={handleDeleteApi}
          successDescription={successDescription}
          failureDescription={failureDescription}
          setRefetch={setRefetch}
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
        <Pagination count={faqCategories?.last_page || 1} page={currentPage} onChange={handlePageChange} />
      </Grid>
    </>
  );
};

export default CategoriesDataGrid;
