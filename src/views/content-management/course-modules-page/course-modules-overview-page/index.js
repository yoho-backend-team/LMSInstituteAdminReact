import { CardContent, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import ContentSkeleton from 'components/cards/Skeleton//UserSkeleton';
import Icon from 'components/icon';
import StatusDialog, { default as ModulesDeleteModal } from 'components/modal/DeleteModel';
import OptionsMenu from 'components/option-menu';
import { getActiveBranches } from 'features/branch-management/services/branchServices';
import ModuleAddDrawer from 'features/content-management/course-contents/course-modules-page/components/ModuleAddDrawer';
import ModuleEdit from 'features/content-management/course-contents/course-modules-page/components/ModuleEdit';
import ModuleHeader from 'features/content-management/course-contents/course-modules-page/components/ModuleTableHeader';
import ModuleView from 'features/content-management/course-contents/course-modules-page/components/ModuleView';
import { selectCourseModules, selectLoading } from 'features/content-management/course-contents/course-modules-page/redux/moduleSelectors';
import { getAllCourseModules } from 'features/content-management/course-contents/course-modules-page/redux/moduleThunks';
import {
  deleteCourseModule,
  updateCourseModulesStatus
} from 'features/content-management/course-contents/course-modules-page/services/moduleServices';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const Modules = () => {
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [activeBranches, setActiveBranches] = useState([]);
  const [statusOpen, setStatusDialogOpen] = useState(false);
  const [ModulesDeleteModalOpen, setModulesDeleteModalOpen] = useState(false);
  const [selectedDeleteId, SetSelectedDeleteId] = useState(null);
  const [refetch, setrefetch] = useState(false);
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
  const userStatusObj = {
    1: 'success',
    0: 'error'
  };

  const handleRowClick = (params) => {
    setSelectedRow(params);
  };

  const handleStatusValue = (event, users) => {
    setStatusDialogOpen(true);
    setStatusValue(users);
  };

  const handleStatusChangeApi = async () => {
    console.log('entered', statusValue);
    const data = {
      status: statusValue?.is_active === '1' ? '0' : '1',
      id: statusValue?.id
    };
    const response = await updateCourseModulesStatus(data);
    if (response.success) {
      toast.success(response.message);
      setRefetch((state) => !state);
    } else {
      toast.error(response.message);
    }
  };

  const handleViewClose = () => {
    setViewModalOpen(false);
  };

  const toggleEditUserDrawer = () => {
    setEditUserOpen(!editUserOpen);
    console.log('toogle pressed');
  };

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

  const dispatch = useDispatch();
  const Module = useSelector(selectCourseModules);
  const ModuleLoading = useSelector(selectLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  console.log(Module);
  useEffect(() => {
    dispatch(getAllCourseModules({ branch_id: selectedBranchId, page: '1' }));
  }, [dispatch, selectedBranchId, refetch]);

  const RowOptions = ({ row }) => {
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
                handleRowClick(row);
              }
            }
          },
          {
            text: 'Edit',
            icon: <Icon color="primary" icon="tabler:edit" fontSize={20} />,
            menuItemProps: {
              onClick: () => {
                toggleEditUserDrawer();
                handleRowClick(row);
              }
            }
          },
          {
            text: 'Delete',
            icon: <Icon color="error" icon="mdi:delete-outline" fontSize={20} />,
            menuItemProps: {
              onClick: () => {
                handleDelete();
                handleRowClick(row);
              }
            }
          }
        ]}
      />
    );
  };

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);

  const columns = [
    {
      // flex: 0.4,
      minWidth: 150,
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
      flex: 1,
      minWidth: 320,
      field: 'title',
      headerName: 'Title',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', my: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {row?.title}
              </Typography>
              <Typography
                sx={{
                  // textAlign: 'justify',
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
      // flex: 1.5,
      minWidth: 220,
      field: 'course',
      headerName: 'course',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              // noWrap
              sx={{
                // overflow: 'hidden',
                // display: '-webkit-box',
                // WebkitLineClamp: 1,
                // WebkitBoxOrient: 'vertical',
                // textOverflow: 'ellipsis',
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
      // flex: 0.4,
      minWidth: 180,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => {
        return (
          <div>
            <TextField
              size="small"
              select
              value={row?.is_active}
              label="status"
              id="custom-select"
              sx={{
                color: userStatusObj[row?.is_active]
              }}
              onChange={(e) => handleStatusValue(e, row)}
              SelectProps={{
                sx: {
                  borderColor: row.is_active === '1' ? 'success' : 'error',
                  color: userStatusObj[row?.is_active]
                }
              }}
            >
              <MenuItem value={1}>Active</MenuItem>
              <MenuItem value={0}>Inactive</MenuItem>
            </TextField>
          </div>
        );
      }
    },
    {
      // flex: 0.4,
      minWidth: 180,
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
          <ModuleHeader toggle={toggleAddUserDrawer} selectedBranchId={selectedBranchId} />
        </Grid>
        <Grid item xs={12}>
          <Card>
            {ModuleLoading ? (
              <ContentSkeleton />
            ) : (
              <DataGrid
                sx={{ p: 2 }}
                autoHeight
                getRowHeight={() => 'auto'}
                rows={Module?.data}
                columns={columns}
                disableRowSelectionOnClick
                hideFooterPagination
                hideFooter
              />
            )}
            {Module?.last_page !== 1 && (
              <CardContent>
                <Grid sx={{ mt: 2, mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Pagination
                    count={Module?.last_page}
                    color="primary"
                    onChange={(e, page) => {
                      dispatch(getAllCourseModules({ branch_id: selectedBranchId, page: page }));
                    }}
                  />
                </Grid>
              </CardContent>
            )}
          </Card>
        </Grid>

        <ModuleAddDrawer open={addUserOpen} toggle={toggleAddUserDrawer} branches={activeBranches} />
        <ModuleEdit open={editUserOpen} toggle={toggleEditUserDrawer} modules={selectedRow} setRefetch={setrefetch} />
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
