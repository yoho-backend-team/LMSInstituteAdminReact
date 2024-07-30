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
import { deleteFaqCategory, updateStatusFaqCategory} from 'features/faq-management/faq-categories/services/faqCategoryServices';
import { updateFaqCategory } from 'features/faq-management/faq-categories/services/faqCategoryServices';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useInstitute } from 'utils/get-institute-details';

const CategoriesDataGrid = () => {
  const [value, setValue] = useState('');
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedFaqCategory, setSelectedFaqCategory] = useState(null);
  const [selectedFaqCategoryStatus, setSelectedFaqCategoryStatus] = useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [statusOpen, setStatusDialogOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  const dispatch = useDispatch();
  const faqCategories = useSelector(selectFaqCategories);
  const faqCategoryLoading = useSelector(selectLoading);

  useEffect(() => {

    
    const data = {
      branchid: selectedBranchId,
      instituteid: useInstitute().getInstituteId(),
      page : 1,
      perPage :10
    };
   
    dispatch(getAllFaqCategories(data));
  }, [dispatch, selectedBranchId, refetch]);


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

  const handleDeleteApi = async () => {
    const data = {
      id: deletingItemId
    };
    const response = await deleteFaqCategory(data);
    if (response.success) {
      toast.success(response.message);
      setRefetch((state) => !state);
    } else {
      toast.error(response.message);
    }
  };
  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);

  const handleDelete = (itemId) => {
    setDeletingItemId(itemId);
    setDeleteDialogOpen(true);
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
      flex: 2.2,
      field: 'category_name',
      headerName: 'Category Name',
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
                {row?.category_name}
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
            <Card>
              <DataGrid
                autoHeight
                key={"id"}
                rowHeight={80}
                 rows={faqCategories?.data}
                columns={columns}
                disableRowSelectionOnClick
                hideFooterPagination
                hideFooter
                onRowClick={handleRowClick}
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
      {faqCategories?.last_page !== 1 && (
          <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Pagination
              count={faqCategories?.last_page}
              color="primary"
              onChange={async (e, page) => {
                const data = {
                  page: page
                };
                dispatch(getAllFaqCategories(data));
              }}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default CategoriesDataGrid;