import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import ContentSkeleton from 'components/cards/Skeleton//UserSkeleton';
import Icon from 'components/icon';
import { default as NotesDeleteModal, default as StatusChangeDialog } from 'components/modal/DeleteModel';
import OptionsMenu from 'components/option-menu';
import { getActiveBranches } from 'features/branch-management/services/branchServices';
import NotesAddDrawer from 'features/content-management/course-contents/course-notes-page/components/NotesAddDrawer';
import NotesEdit from 'features/content-management/course-contents/course-notes-page/components/NotesEdit';
import NotesHeader from 'features/content-management/course-contents/course-notes-page/components/NotesTableHeader';
import NotesView from 'features/content-management/course-contents/course-notes-page/components/NotesView';
import { selectCourseNotes, selectLoading } from 'features/content-management/course-contents/course-notes-page/redux/noteSelectors';
import { getAllCourseNotes } from 'features/content-management/course-contents/course-notes-page/redux/noteThunks';
import {
  deleteCourseNote,
  updateCourseNotesStatus
} from 'features/content-management/course-contents/course-notes-page/services/noteServices';
import { setUsers } from 'features/user-management/users-page/redux/userSlices';
import { searchUsers } from 'features/user-management/users-page/services/userServices';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const Notes = () => {
  const [value, setValue] = useState('');
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [NotesDeleteModalOpen, setNotesDeleteModalOpen] = useState(false);
  const [selectedDeleteId, SetSelectedDeleteId] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false);
  const [statusValue, setStatusValue] = useState({});

  console.log(selectedDeleteId);

  const userStatusObj = {
    1: 'success',
    0: 'error'
  };

  const handleStatusValue = (event, users) => {
    setStatusChangeDialogOpen(true);
    setStatusValue(users);
  };

  const handleStatusChangeApi = async () => {
    console.log('entered', statusValue);
    const data = {
      status: statusValue?.is_active === '1' ? '0' : '1',
      id: statusValue?.id
    };
    const response = await updateCourseNotesStatus(data);
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

  //delete
  const handleDelete = useCallback((itemId) => {
    SetSelectedDeleteId(itemId);
    setNotesDeleteModalOpen(true);
  }, []);

  const handleContentDelete = async () => {
    const data = { id: selectedRow.id };
    const result = await deleteCourseNote(data);
    if (result.success) {
      toast.success(result.message);
      setRefetch((state) => !state);
    } else {
      toast.error(result.message);
    }
  };
  ////

  const dispatch = useDispatch();
  const Notes = useSelector(selectCourseNotes);
  const NotesLoading = useSelector(selectLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  useEffect(() => {
    dispatch(getAllCourseNotes({ branch_id: selectedBranchId }));
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
    setSelectedRow(params);
  };

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);
  const toggleEditUserDrawer = () => {
    setEditUserOpen(!editUserOpen);
    console.log('toogle pressed');
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
      // flex: 1.8,
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
                  textAlign: 'justify',
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

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <NotesHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} selectedBranchId={selectedBranchId} />
        </Grid>

        {NotesLoading ? (
          <ContentSkeleton />
        ) : (
          <Grid item xs={12}>
            <Card>
              <DataGrid
                sx={{ p: 2 }}
                autoHeight
                getRowHeight={() => 'auto'}
                rows={Notes?.data}
                columns={columns}
                disableRowSelectionOnClick
                pageSizeOptions={[10, 25, 50]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
              />
            </Card>
          </Grid>
        )}

        <NotesAddDrawer setRefetch={setRefetch} open={addUserOpen} toggle={toggleAddUserDrawer} branches={activeBranches} />
        <NotesEdit setRefetch={setRefetch} open={editUserOpen} toggle={toggleEditUserDrawer} notes={selectedRow} />
        <NotesDeleteModal
          open={NotesDeleteModalOpen}
          setOpen={setNotesDeleteModalOpen}
          description="Are you sure you want to delete this Notes?"
          title="Delete"
          handleSubmit={handleContentDelete}
        />
        <StatusChangeDialog
          open={statusChangeDialogOpen}
          setOpen={setStatusChangeDialogOpen}
          description="Are you sure you want to Change Status"
          title="Change Status"
          handleSubmit={handleStatusChangeApi}
        />
        <NotesView open={isViewModalOpen} handleViewClose={handleViewClose} notes={selectedRow} />
      </Grid>
    </>
  );
};

export default Notes;
