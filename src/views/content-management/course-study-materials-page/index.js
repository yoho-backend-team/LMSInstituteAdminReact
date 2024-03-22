// ** React Imports
import { useCallback, useState } from 'react';
// ** MUI Imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import Icon from 'components/icon';
import { TextField } from '@mui/material';
import { useEffect } from 'react';
// ** Custom Components Imports
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import ContentSkeleton from 'components/cards/Skeleton/ContentSkeleton';
// import DeleteDialog from 'components/modal/DeleteModel';
// import CustomTextField from 'components/mui/text-field';
import OptionsMenu from 'components/option-menu';
import { getActiveBranches } from 'features/branch-management/services/branchServices';
import StudyMaterialAddDrawer from 'features/content-management/course-contents/course-study-materials-page/components/StudyMaterialAddDrawer';
import StudyMaterialEdit from 'features/content-management/course-contents/course-study-materials-page/components/StudyMaterialEdit';
import StudyMaterialHeader from 'features/content-management/course-contents/course-study-materials-page/components/StudyMaterialTableHeader';
import StudyMaterialView from 'features/content-management/course-contents/course-study-materials-page/components/StudyMaterialView';
import {
  selectCourseStudyMaterials,
  selectLoading
} from 'features/content-management/course-contents/course-study-materials-page/redux/studyMaterialSelectors';
import { getAllCourseStudyMaterials } from 'features/content-management/course-contents/course-study-materials-page/redux/studyMaterialThunks';
import { updateCourseStudyMaterialStatus } from 'features/content-management/course-contents/course-study-materials-page/services/studyMaterialServices';
import { setUsers } from 'features/user-management/users-page/redux/userSlices';
import { searchUsers } from 'features/user-management/users-page/services/userServices';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { default as StatusChangeDialog, default as StudyMaterialDeletemodal } from 'components/modal/DeleteModel';
import { deleteCourseStudyMaterial } from 'features/content-management/course-contents/course-study-materials-page/services/studyMaterialServices';

const StudyMaterials = () => {
  const [value, setValue] = useState('');
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  // const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  // const [deletingItemId, setDeletingItemId] = useState(null);
  const [refetch, setRefetch] = useState(false);
  // const [statusOpen, setStatusDialogOpen] = useState(false);
  const [StudyMaterialDeletemodalOpen, setStudyMaterialDeletemodalOpen] = useState(false);
  const [selectedDeleteId, SetSelectedDeleteId] = useState(null);
  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false);
  const [statusValue,setStatusValue]=useState({})

  console.log(selectedDeleteId);

  const dispatch = useDispatch();
  const StudyMaterials = useSelector(selectCourseStudyMaterials);
  const StudyMaterialsLoading = useSelector(selectLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  useEffect(() => {
    dispatch(getAllCourseStudyMaterials({ branch_id: selectedBranchId }));
  }, [dispatch, selectedBranchId, refetch]);

  const [activeBranches, setActiveBranches] = useState([]);
  useEffect(() => {
    getActiveBranchesByUser();
  }, []);

  const getActiveBranchesByUser = async () => {
    const result = await getActiveBranches();

    console.log('active branches : ', result.data);
    setActiveBranches(result.data.data);
  };

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
  };
  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);

  //delete
  const handleDelete = useCallback((itemId) => {
    SetSelectedDeleteId(itemId);
    setStudyMaterialDeletemodalOpen(true);
  }, []);

  const handleContentDelete = async () => {
    const data = { id: selectedRow.id };
    const result = await deleteCourseStudyMaterial(data);
    if (result.success) {
      toast.success(result.message);
      setRefetch((state) => !state);
    } else {
      toast.error(result.message);
    }
  };
  ////
  const userStatusObj = {
    1: 'success',
    0: 'error'
  };

  const handleStatusValue = (event, users) => {
    setStatusChangeDialogOpen(true);
    setStatusValue(users);
  };

  const handleStatusChangeApi = async () => {
    console.log('entered',statusValue);
    const data = {
      status: statusValue?.is_active === '1' ? '0' : '1',
      id: statusValue?.id
    };
    const response = await updateCourseStudyMaterialStatus(data);
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
  const handleView = () => {
    setViewModalOpen(true);
  };

  const toggleEditUserDrawer = () => {
    setEditUserOpen(!editUserOpen);
    console.log('Toggle drawer');
  };

  const RowOptions = (id) => {
    return (
      <OptionsMenu
        menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
        iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
        options={[
          {
            text: 'View',
            icon: <Icon icon="tabler:eye" fontSize={20} />,
            menuItemProps: {
              onClick: () => handleView()
            }
          },
          {
            text: 'Edit',
            icon: <Icon color="primary" icon="tabler:edit" fontSize={20} />,
            menuItemProps: {
              onClick: () => toggleEditUserDrawer(id)
            }
          },
          {
            text: 'Delete',
            icon: <Icon color="error" icon="mdi:delete-outline" fontSize={20} />,
            menuItemProps: {
              onClick: () => handleDelete(id)
            }
          }
        ]}
      />
    );
  };

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
                  '&:hover': { color: 'primary.main' },
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                  textOverflow: 'ellipsis'
                }}
              >
                {row?.title}
              </Typography>
              <Typography
                noWrap
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.75rem',
                  mt: 1,
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                  textOverflow: 'ellipsis'
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
      field: 'course',
      headerName: 'course',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              noWrap
              sx={{
                color: 'text.secondary',
                textTransform: 'capitalize',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                textOverflow: 'ellipsis'
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
      flex: 1,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => <RowOptions id={row?.id} />
    }
  ];

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <StudyMaterialHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} selectedBranchId={selectedBranchId} />
        </Grid>
        {StudyMaterialsLoading ? (
          <ContentSkeleton />
        ) : (
          <Grid item xs={12}>
            <Card>
              <DataGrid
                autoHeight
                rowHeight={80}
                rows={StudyMaterials}
                columns={columns}
                disableRowSelectionOnClick
                pageSizeOptions={[10, 25, 50]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                onRowClick={handleRowClick}
              />
            </Card>
          </Grid>
        )}
        <StudyMaterialAddDrawer open={addUserOpen} toggle={toggleAddUserDrawer} branches={activeBranches} />
        <StudyMaterialEdit StudyMaterials={selectedRow} open={editUserOpen} toggle={toggleEditUserDrawer} initialValues={selectedRow} />
        <StudyMaterialDeletemodal
          open={StudyMaterialDeletemodalOpen}
          setOpen={setStudyMaterialDeletemodalOpen}
          description="Are you sure you want to delete this StudyMaterials?"
          title="Delete"
          handleSubmit={handleContentDelete}
        />
        <StatusChangeDialog
          open={statusChangeDialogOpen}
          setOpen={setStatusChangeDialogOpen}
          description="Are you sure you want to Change Status"
          title="Status"
          handleSubmit={handleStatusChangeApi}
        />

        <StudyMaterialView open={isViewModalOpen} handleViewClose={handleViewClose} />
      </Grid>
    </>
  );
};

export default StudyMaterials;
