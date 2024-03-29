// ** React Imports
import { useCallback, useState } from 'react';
// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import ContentSkeleton from 'components/cards/Skeleton//UserSkeleton';
import Icon from 'components/icon';
// ** Custom Components Imports
import MenuItem from '@mui/material/MenuItem';
import { default as ModulesDeleteModal } from 'components/modal/DeleteModel';
import CustomTextField from 'components/mui/text-field';
import OptionsMenu from 'components/option-menu';
import { getActiveBranches } from 'features/branch-management/services/branchServices';
import ModuleAddDrawer from 'features/content-management/course-contents/course-modules-page/components/ModuleAddDrawer';
import ModuleEdit from 'features/content-management/course-contents/course-modules-page/components/ModuleEdit';
import ModuleHeader from 'features/content-management/course-contents/course-modules-page/components/ModuleTableHeader';
import ModuleView from 'features/content-management/course-contents/course-modules-page/components/ModuleView';
import { selectCourseModules, selectLoading } from 'features/content-management/course-contents/course-modules-page/redux/moduleSelectors';
import { getAllCourseModules } from 'features/content-management/course-contents/course-modules-page/redux/moduleThunks';
import { setUsers } from 'features/user-management/users-page/redux/userSlices';
import { searchUsers } from 'features/user-management/users-page/services/userServices';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StatusDialog from 'components/modal/DeleteModel';
import {
  deleteCourseModule,
  updateCourseModule
} from 'features/content-management/course-contents/course-modules-page/services/moduleServices';
import toast from 'react-hot-toast';

const Modules = () => {
  const [value, setValue] = useState('');
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  // const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  // const [deletingItemId, setDeletingItemId] = useState(null);
  const [activeBranches, setActiveBranches] = useState([]);
  const [statusOpen, setStatusDialogOpen] = useState(false);
  const [ModulesDeleteModalOpen, setModulesDeleteModalOpen] = useState(false);
  const [selectedDeleteId, SetSelectedDeleteId] = useState(null);
  const [refetch, setrefetch] = useState(null);
  const [statusValue, setStatusValue] = useState({});

  console.log(selectedDeleteId);

  useEffect(() => {
    getActiveBranchesByUser();
  }, []);

  const getActiveBranchesByUser = async () => {
    const result = await getActiveBranches();

    console.log(result.data);
    setActiveBranches(result.data.data);
  };

  const handleStatusChangeApi = async () => {
    console.log('entered', statusValue);
    const data = {
      status: statusValue?.is_active === '1' ? '0' : '1',
      id: statusValue?.id
    };
    const response = await updateCourseModule(data);
    if (response.success) {
      toast.success(response.message);
      setRefetch((state) => !state);
    } else {
      toast.error(response.message);
    }
  };

  const handleRowClick = (params) => {
    setSelectedRow(params);
  };

  const handleStatusValue = (event, users) => {
    setStatusDialogOpen(true);
    setStatusValue(users);
  };

  const handleViewClose = () => {
    setViewModalOpen(false);
  };

  const toggleEditUserDrawer = () => {
    setEditUserOpen(!editUserOpen);
    console.log('toogle pressed');
  };
  //delete
  const handleDelete = useCallback((itemId) => {
    SetSelectedDeleteId(itemId);
    setModulesDeleteModalOpen(true);
  }, []);

  const handleContentDelete = async () => {
    const data = { id: selectedRow.id };
    const result = await deleteCourseModule(data);
    if (result.success) {
      toast.success(result.message);
      setrefetch((state) => !state);
    } else {
      toast.error(result.message);
    }
  };
  ////

  const dispatch = useDispatch();
  const Module = useSelector(selectCourseModules);
  const ModuleLoading = useSelector(selectLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  console.log(Module);
  useEffect(() => {
    dispatch(getAllCourseModules({ branch_id: selectedBranchId }));
  }, [dispatch, selectedBranchId, refetch]);

  const RowOptions = ({row}) => {
    return (
      <OptionsMenu
        menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
        iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
        options={[
          {
            text: 'View',
            icon: <Icon icon="tabler:eye" fontSize={20} />,
            menuItemProps: {
              onClick: () => {
                setViewModalOpen(true);     
                handleRowClick(row)
              }
            }
          },
          {
            text: 'Edit',
            icon: <Icon color="primary" icon="tabler:edit" fontSize={20} />,
            menuItemProps: {
              onClick: () => {
                toggleEditUserDrawer()
                handleRowClick(row)
              }
            }
          },
          {
            text: 'Delete',
            icon: <Icon color="error" icon="mdi:delete-outline" fontSize={20} />,
            menuItemProps: {
              onClick: () => {
                handleDelete()
                handleRowClick(row)
              }
            }
          }
        ]}
      />
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
      minWidth: 100,
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
      minWidth: 220,
      field: 'title',
      headerName: 'Title',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                sx={{
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                  textOverflow: 'ellipsis',
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {row?.title}
              </Typography>
              <Typography
                noWrap
                sx={{
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                  textOverflow: 'ellipsis',
                  color: 'text.secondary',
                  fontSize: '0.75rem',
                  mt: 1
                }}
              >
                {row?.description}
              </Typography>
            </Box>
          </Box>
        );
      }
    },
    {
      flex: 1.5,
      minWidth:220,
      field: 'course',
      headerName: 'course',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              noWrap
              sx={{
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                textOverflow: 'ellipsis',
                color: 'text.secondary',
                textTransform: 'capitalize'
              }}
            >
              {row?.institute_branch_courses?.course_name}
            </Typography>
          </Box>
        );
      }
    },
    {
      flex: 1,
      minWidth: 180,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => {
        return (
          <div>
            <CustomTextField select defaultValue={row.is_active} onChange={(e) => handleStatusValue(e, row)}>
              <MenuItem value="1">Active</MenuItem>
              <MenuItem value="0">Inactive</MenuItem>
            </CustomTextField>
          </div>
        );
      }
    },
    {
      flex: 1,
      minWidth: 120,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => <RowOptions row={row} />
    }
  ];

  console.log(selectedRow);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ModuleHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} selectedBranchId={selectedBranchId} />
        </Grid>
        {ModuleLoading ? (
          <ContentSkeleton />
        ) : (
          <Grid item xs={12}>
            <Card>
              <DataGrid
                sx={{ p: 2 }}
                autoHeight
                rowHeight={80}
                rows={Module}
                columns={columns}
                disableRowSelectionOnClick
                pageSizeOptions={[10, 25, 50]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                // onRowClick={handleRowClick}

              />
            </Card>
          </Grid>
        )}
        <ModuleAddDrawer open={addUserOpen} toggle={toggleAddUserDrawer} branches={activeBranches} />
        <ModuleEdit open={editUserOpen} toggle={toggleEditUserDrawer} modules={selectedRow} />
        <ModulesDeleteModal
          open={ModulesDeleteModalOpen}
          setOpen={setModulesDeleteModalOpen}
          description="Are you sure you want to delete this Modules?"
          title="Delete"
          handleSubmit={handleContentDelete}
        />
        <StatusDialog
          open={statusOpen}
          setOpen={setStatusDialogOpen}
          description="Are you sure you want to Change Status"
          title="Status"
          handleSubmit={handleStatusChangeApi}
        />
        <ModuleView open={isViewModalOpen} handleViewClose={handleViewClose} data={selectedRow} modules={selectedRow} />
      </Grid>
    </>
  );
};

export default Modules;
