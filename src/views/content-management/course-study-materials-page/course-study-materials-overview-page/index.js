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
import { default as StatusChangeDialog, default as StudyMaterialDeletemodal } from 'components/modal/DeleteModel';
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
import {
  deleteCourseStudyMaterial,
  updateCourseStudyMaterialStatus
} from 'features/content-management/course-contents/course-study-materials-page/services/studyMaterialServices';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const StudyMaterials = () => {
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [StudyMaterialDeletemodalOpen, setStudyMaterialDeletemodalOpen] = useState(false);
  const [selectedDeleteId, SetSelectedDeleteId] = useState(null);
  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false);
  const [statusValue, setStatusValue] = useState({});
  
  const dispatch = useDispatch();
  const StudyMaterials = useSelector(selectCourseStudyMaterials);
  const StudyMaterialsLoading = useSelector(selectLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  useEffect(() => {
    dispatch(getAllCourseStudyMaterials({ branch_id: selectedBranchId, page: '1' }));
  }, [dispatch, selectedBranchId, refetch]);

  const [activeBranches, setActiveBranches] = useState([]);
  useEffect(() => {
    getActiveBranchesByUser();
  }, []);

  const getActiveBranchesByUser = async () => {
    const result = await getActiveBranches();

    setActiveBranches(result.data.data);
  };

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);

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

  const userStatusObj = {
    1: 'success',
    0: 'error'
  };

  const handleStatusValue = (event, users) => {
    setStatusChangeDialogOpen(true);
    setStatusValue(users);
  };

  const handleStatusChangeApi = async () => {
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

  const toggleEditUserDrawer = () => {
    setEditUserOpen(!editUserOpen);
  };

  const handleRowClick = (params) => {
    setSelectedRow(params);
  };

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

  const columns = [
    {
      // flex: 0.4,
      minWidth: 150,
      headerName: 'Id',
      field: 'id',
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
              sx={{
                color: 'text.secondary',
                textTransform: 'capitalize'
              }}
            >
              {row?.course?.course_name}
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
                  borderColor: row.is_active? 'success' : 'error',
                  color: userStatusObj[row?.is_active]
                }
              }}
            >
              <MenuItem value={true}>Active</MenuItem>
              <MenuItem value={false}>Inactive</MenuItem>
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
  
  
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <StudyMaterialHeader toggle={toggleAddUserDrawer} selectedBranchId={selectedBranchId} />
        </Grid>
        <Grid item xs={12}>
          <Card>
            {StudyMaterialsLoading ? (
              <ContentSkeleton />
            ) : (
              <DataGrid
                sx={{ p: 2 }}
                autoHeight
                getRowHeight={() => 'auto'}
                rows={StudyMaterials?StudyMaterials:[]}
                columns={columns}
                disableRowSelectionOnClick
                hideFooterPagination
                hideFooter
              />
            )}

            {StudyMaterials?.last_page !== 1 && (
              <CardContent>
                <Grid sx={{ mt: 2, mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Pagination
                    count={StudyMaterials?.last_page}
                    color="primary"
                    onChange={(e, page) => {
                      dispatch(getAllCourseStudyMaterials({ branch_id: selectedBranchId, page: page }));
                    }}
                  />
                </Grid>
              </CardContent>
            )}
          </Card>
        </Grid>
        <StudyMaterialAddDrawer setRefetch={setRefetch} open={addUserOpen} toggle={toggleAddUserDrawer} branches={activeBranches} />
        <StudyMaterialEdit
          setRefetch={setRefetch}
          StudyMaterials={selectedRow}
          open={editUserOpen}
          toggle={toggleEditUserDrawer}
          initialValues={selectedRow}
        />
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

        <StudyMaterialView open={isViewModalOpen} handleViewClose={handleViewClose} StudyMaterials={selectedRow} />
      </Grid>
    </>
  );
};

export default StudyMaterials;
