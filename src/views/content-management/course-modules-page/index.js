// ** React Imports
import { useCallback, useState } from 'react';
// ** MUI Imports
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import ContentSkeleton from 'components/cards/Skeleton/ContentSkeleton';
import Icon from 'components/icon';
// ** Custom Components Imports
import MenuItem from '@mui/material/MenuItem';
import DeleteDialog from 'components/modal/DeleteModel';
import CustomTextField from 'components/mui/text-field';
import ModuleAddDrawer from 'features/content-management/course-contents/course-modules-page/components/ModuleAddDrawer';
import ModuleEdit from 'features/content-management/course-contents/course-modules-page/components/ModuleEdit';
import ModuleHeader from 'features/content-management/course-contents/course-modules-page/components/ModuleTableHeader';
import ModuleView from 'features/content-management/course-contents/course-modules-page/components/ModuleView';
import { setUsers } from 'features/user-management/users-page/redux/userSlices';
import { searchUsers } from 'features/user-management/users-page/services/userServices';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCourseModules, selectLoading } from 'features/content-management/course-contents/course-modules-page/redux/moduleSelectors';
import { getAllCourseModules } from 'features/content-management/course-contents/course-modules-page/redux/moduleThunks';
import { getActiveBranches } from 'features/branch-management/services/branchServices';

const Modules = () => {
  const [value, setValue] = useState('');
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [activeBranches, setActiveBranches] = useState([]);
  useEffect(() => {
    getActiveBranchesByUser();
  }, []);

  const getActiveBranchesByUser = async () => {
    const result = await getActiveBranches();

    console.log(result.data);
    setActiveBranches(result.data.data);
  };

  console.log(deletingItemId);

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
  };

  const handleStatusChange = () => {
    setDeleteDialogOpen(true);
  };

  const handleViewClose = () => {
    setViewModalOpen(false);
  };
  const handleView = () => {
    setViewModalOpen(true);
  };

  const toggleEditUserDrawer = () => {
    setEditUserOpen(!editUserOpen);
    console.log('toogle pressed');
  };
  const handleDelete = (itemId) => {
    console.log('Delete clicked for item ID:', itemId);
    setDeletingItemId(itemId);
    setDeleteDialogOpen(true);
  };

  const dispatch = useDispatch();
  const Module = useSelector(selectCourseModules);
  const ModuleLoading = useSelector(selectLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  console.log(Module);

  useEffect(() => {
    dispatch(getAllCourseModules(selectedBranchId));
  }, [dispatch, selectedBranchId]);

  const RowOptions = () => {
    return (
      <Box sx={{ gap: 1 }}>
        <IconButton aria-label="capture screenshot" color="primary">
          <Icon onClick={() => handleView()} icon="tabler:eye" />
        </IconButton>
        <IconButton onClick={toggleEditUserDrawer} aria-label="capture screenshot" color="secondary">
          <Icon icon="tabler:edit" />
        </IconButton>
        <IconButton onClick={() => handleDelete()} aria-label="capture screenshot" color="error">
          <Icon icon="mdi:delete-outline" />
        </IconButton>
      </Box>
    );
  };

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);

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

  const columns = [
    {
      flex: 0.6,
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
      flex: 1.8,
      field: 'title',
      headerName: 'Title',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                sx={{
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {row?.title}
              </Typography>
              <Typography noWrap sx={{ color: 'text.secondary', fontSize: '0.75rem', mt: 1 }}>
                {row?.description}
              </Typography>
            </Box>
          </Box>
        );
      }
    },
    {
      flex: 1.5,
      field: 'course',
      headerName: 'course',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row?.institute_branch_courses?.course_name}
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
            <CustomTextField select defaultValue={row.is_active} onChange={(e) => handleStatusChange(e, row.id)}>
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
      renderCell: ({ row }) => <RowOptions id={row?.id} />
    }
  ];

  return (
    <>
      {ModuleLoading ? (
        <ContentSkeleton />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ModuleHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
          </Grid>
          <Grid item xs={12}>
            <Card>
              <DataGrid
                autoHeight
                rowHeight={80}
                rows={Module}
                columns={columns}
                disableRowSelectionOnClick
                pageSizeOptions={[10, 25, 50]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                onRowClick={handleRowClick}
              />
            </Card>
          </Grid>
          <ModuleAddDrawer open={addUserOpen} toggle={toggleAddUserDrawer} branches={activeBranches} />
          <ModuleEdit open={editUserOpen} toggle={toggleEditUserDrawer} initialValues={selectedRow} />
          <DeleteDialog
            open={isDeleteDialogOpen}
            setOpen={setDeleteDialogOpen}
            description="Are you sure you want to delete this item?"
            title="Delete"
          />
          <ModuleView open={isViewModalOpen} handleViewClose={handleViewClose} />
        </Grid>
      )}
    </>
  );
};

export default Modules;
