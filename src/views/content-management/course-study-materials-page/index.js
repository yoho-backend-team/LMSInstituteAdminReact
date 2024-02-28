// ** React Imports
import { useCallback, useState } from 'react';
// ** MUI Imports
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import Icon from 'components/icon';
import { useEffect } from 'react';
// ** Custom Components Imports
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import ContentSkeleton from 'components/cards/Skeleton/ContentSkeleton';
import DeleteDialog from 'components/modal/DeleteModel';
import CustomTextField from 'components/mui/text-field';
import StudyMaterialAddDrawer from 'features/content-management/course-contents/course-study-materials-page/components/StudyMaterialAddDrawer';
import StudyMaterialEdit from 'features/content-management/course-contents/course-study-materials-page/components/StudyMaterialEdit';
import StudyMaterialHeader from 'features/content-management/course-contents/course-study-materials-page/components/StudyMaterialTableHeader';
import StudyMaterialView from 'features/content-management/course-contents/course-study-materials-page/components/StudyMaterialView';
import { setUsers } from 'features/user-management/users-page/redux/userSlices';
import { searchUsers } from 'features/user-management/users-page/services/userServices';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveBranches } from 'features/branch-management/services/branchServices';
import {
  selectCourseStudyMaterials,
  selectLoading
} from 'features/content-management/course-contents/course-study-materials-page/redux/studyMaterialSelectors';
import { getAllCourseStudyMaterials } from 'features/content-management/course-contents/course-study-materials-page/redux/studyMaterialThunks';
import { updateCourseStudyMaterialStatus } from 'features/content-management/course-contents/course-study-materials-page/services/studyMaterialServices';
import toast from 'react-hot-toast';
const StudyMaterials = () => {
  const [value, setValue] = useState('');
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedModuleStatus, setSelectedModuleStatus] = useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [refetch, setRefetch] = useState(false);

  console.log(deletingItemId);

  const dispatch = useDispatch();
  const StudyMaterials = useSelector(selectCourseStudyMaterials);
  const StudyMaterialsLoading = useSelector(selectLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);


  useEffect(() => {
    dispatch(getAllCourseStudyMaterials(selectedBranchId));
  }, [dispatch, selectedBranchId, refetch]);

  const [activeBranches, setActiveBranches] = useState([]);
  useEffect(() => {
    getActiveBranchesByUser();
  }, []);

  const getActiveBranchesByUser = async () => {
    const result = await getActiveBranches();

    console.log("active branches : ", result.data);
    setActiveBranches(result.data.data);
  };

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
  };
  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);



  const handleStatusChange = (e, row) => {
    setSelectedModule(row);
    setSelectedModuleStatus(e.target.value);
    setDeleteDialogOpen(true);
  };

  const handleStatusChangeApi = async () => {
    const data = {
      status: selectedModuleStatus,
      id: selectedModule?.id
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

  const handleDelete = (itemId) => {
    console.log('Delete clicked for item ID:', itemId);
    setDeletingItemId(itemId);
    setDeleteDialogOpen(true);
  };

  const toggleEditUserDrawer = () => {
    setEditUserOpen(!editUserOpen);
    console.log('Toggle drawer');
  };

  const RowOptions = () => {
    return (
      <Box sx={{ gap: 1 }}>
        <IconButton onClick={() => handleView()} aria-label="capture screenshot" color="primary">
          <Icon icon="tabler:eye" />
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
              <Typography noWrap sx={{ color: 'text.secondary', fontSize: "0.75rem", mt: 1 }}>
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
      renderCell: ({ row }) => <RowOptions id={row?.id} />
    }
  ];

  return (
    <>
      {StudyMaterialsLoading ? (
        <ContentSkeleton />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <StudyMaterialHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
          </Grid>
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
          <StudyMaterialAddDrawer open={addUserOpen} toggle={toggleAddUserDrawer} branches={activeBranches} />
          <StudyMaterialEdit open={editUserOpen} toggle={toggleEditUserDrawer} initialValues={selectedRow} />
          <DeleteDialog
            open={isDeleteDialogOpen}
            setOpen={setDeleteDialogOpen}
            description="Are you sure you want to delete this item?"
            title="Delete"
            handleSubmit={handleStatusChangeApi}
          />
          <StudyMaterialView open={isViewModalOpen} handleViewClose={handleViewClose} />
        </Grid>
      )}
    </>
  );
};

export default StudyMaterials;
