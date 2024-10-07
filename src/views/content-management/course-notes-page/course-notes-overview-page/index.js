import { CardContent, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import ContentSkeleton from 'components/cards/Skeleton//UserSkeleton';
import NoteSkelton from 'components/cards/Skeleton/ContentSkeleton/NoteSkelton';
import Icon from 'components/icon';
import { default as NotesDeleteModal, default as StatusChangeDialog } from 'components/modal/DeleteModel';
import OptionsMenu from 'components/option-menu';
import { getActiveBranches } from 'features/branch-management/services/branchServices';
import NotesAddDrawer from 'features/content-management/course-contents/course-notes-page/components/NotesAddDrawer';
import NotesCard from 'features/content-management/course-contents/course-notes-page/components/NotesCard';
import NotesEdit from 'features/content-management/course-contents/course-notes-page/components/NotesEdit';
import NotesHeader from 'features/content-management/course-contents/course-notes-page/components/NotesTableHeader';
import NotesView from 'features/content-management/course-contents/course-notes-page/components/NotesView';
import { selectCourseNotes, selectLoading } from 'features/content-management/course-contents/course-notes-page/redux/noteSelectors';
import { getAllCourseNotes } from 'features/content-management/course-contents/course-notes-page/redux/noteThunks';
import {
  deleteCourseNote,
  updateCourseNotesStatus
} from 'features/content-management/course-contents/course-notes-page/services/noteServices';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const Notes = () => {
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [NotesDeleteModalOpen, setNotesDeleteModalOpen] = useState(false);
  const [selectedDeleteId, SetSelectedDeleteId] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false);
  const [statusValue, setStatusValue] = useState({});
  const [page,setPage] = useState("1")

  const userStatusObj = {
    true: 'success',
    false: 'error'
  };

  const handleStatusValue = (event, note) => {
    console.log(note,"users")
    setStatusChangeDialogOpen(true);
    setStatusValue(note);
  };

  const handleStatusChangeApi = async () => {
    
    const data = {
      is_active: !statusValue?.is_active,
      id: statusValue?.uuid
    };
    console.log(data,statusValue,selectedRow)
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
    const data = { id: selectedRow.uuid };
    const result = await deleteCourseNote(data);
    if (result.success) {
      toast.success(result.message);
      setRefetch((state) => !state);
    } else {
      toast.error(result.message);
    }
  };
  

  const dispatch = useDispatch();
  const Notes = useSelector(selectCourseNotes);
  const NotesLoading = useSelector(selectLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  useEffect(() => {
    dispatch(getAllCourseNotes({ branch: selectedBranchId, page: '1' }));
  }, [dispatch, selectedBranchId, refetch]);

  const [activeBranches, setActiveBranches] = useState([]);
  useEffect(() => {
    getActiveBranchesByUser();
  }, []);

  const getActiveBranchesByUser = async () => {
    const result = await getActiveBranches();

    setActiveBranches(result.data);
  };

  const handleRowClick = (params) => {
    setSelectedRow(params);
  };

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);
  const toggleEditUserDrawer = () => {
    setEditUserOpen(!editUserOpen);
  };


  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <NotesHeader toggle={toggleAddUserDrawer} selectedBranchId={selectedBranchId} />
        </Grid>

        <Grid item xs={12}>
          <Grid>
            {NotesLoading ? (
              <NoteSkelton />
            ) : (
              <Grid container xs={12} spacing={2} >
                {
                  Notes?.data?.map((note,index) => (
                     <Grid item xs={4}>
                       <NotesCard
                        page={page}
                        index={index}
                        initialStatus={note?.is_active}
                        name={note?.title}
                        note={note}
                        courseName={note?.course?.course_name}
                        handleRowClick={handleRowClick}
                        handleStatusValue={handleStatusValue}
                        handleDelete={handleDelete}
                        setViewModalOpen={setViewModalOpen}
                        toggleEditUserDrawer={toggleEditUserDrawer}
                       />
                     </Grid>
                  ))
                }
              </Grid>
              // <DataGrid
              //   sx={{ p: 2 }}
              //   autoHeight
              //   getRowHeight={() => 'auto'}
              //   rows={Notes}
              //   columns={columns}
              //   disableRowSelectionOnClick
              //   hideFooterPagination
              //   hideFooter
              // />
            )}

            {!NotesLoading && Notes?.last_page !== 1 && (
              <CardContent>
                <Grid sx={{ mt: 2, mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Pagination
                    count={Notes?.last_page}
                    page={page}
                    color="primary"
                    onChange={(e, page) => {
                      dispatch(getAllCourseNotes({ branch: selectedBranchId, page: page }));
                      setPage(page)
                    }}
                  />
                </Grid>
              </CardContent>
            )}
          </Grid>
        </Grid>

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
