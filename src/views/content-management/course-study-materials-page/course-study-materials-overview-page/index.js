import { CardContent } from '@mui/material';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import ContentSkeleton from 'components/cards/Skeleton//UserSkeleton';
import StudyMaterialSkelton from 'components/cards/Skeleton/ContentSkeleton/MaterialSkelton';
import { default as StatusChangeDialog, default as StudyMaterialDeletemodal } from 'components/modal/DeleteModel';
import { getActiveBranches } from 'features/branch-management/services/branchServices';
import StudyMaterialAddDrawer from 'features/content-management/course-contents/course-study-materials-page/components/StudyMaterialAddDrawer';
import StudyMaterialCard from 'features/content-management/course-contents/course-study-materials-page/components/StudyMaterialCard';
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
  const [page,setPage] = useState(1)
  
  const dispatch = useDispatch();
  const StudyMaterials = useSelector(selectCourseStudyMaterials);
  const StudyMaterialsLoading = useSelector(selectLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  console.log('input    ---'+StudyMaterials);
  
  useEffect(() => {
    dispatch(getAllCourseStudyMaterials({ branch: selectedBranchId, page: '1' }));
  }, [dispatch, selectedBranchId, refetch]);

  const [activeBranches, setActiveBranches] = useState([]);
  useEffect(() => {
    getActiveBranchesByUser();
  }, []);

  const getActiveBranchesByUser = async () => {
    const result = await getActiveBranches();

    setActiveBranches(result.data);
  };

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);

  const handleDelete = useCallback((itemId) => {
    SetSelectedDeleteId(itemId);
    setStudyMaterialDeletemodalOpen(true);
  }, []);

  const handleContentDelete = async () => {
    const data = { id: selectedRow.uuid };
    const result = await deleteCourseStudyMaterial(data);
    if (result.success) {
      toast.success(result.message);
      setRefetch((state) => !state);
    } else {
      toast.error(result.message);
    }
  };


  const handleStatusValue = (event, users) => {
    setStatusChangeDialogOpen(true);
    setStatusValue(users);
  };

  const handleStatusChangeApi = async () => {
    const data = {
      is_active: !statusValue?.is_active,
      id: statusValue?.uuid
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


  
  console.log(StudyMaterials,"studyMaterials")
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <StudyMaterialHeader toggle={toggleAddUserDrawer} selectedBranchId={selectedBranchId} sx={{ boxShadow : "0 .25rem .875rem 0 rgba(38,43,67,.16)" }} />
        </Grid>      
      </Grid>
      <Grid item xs={12}>
          <Grid item xs={12}>
            {StudyMaterialsLoading ? (
              <StudyMaterialSkelton />
            ) : (
              <Grid container spacing={2} sx={{ marginLeft: "20px", marginTop: "20px"}} >
              {
                StudyMaterials?.data?.map((material,index) => (
                  <Grid item xs={12} sm={6} md={4} key={material?.id}>
                    <StudyMaterialCard
                      index={index}
                      page={page}
                      name={material?.title}
                      description={material?.description}
                      courseName={material?.course?.course_name}
                      initialStatus={material?.is_active}
                      material={material}
                      handleStatusValue={handleStatusValue}
                      handleRowClick={handleRowClick}
                      setViewModalOpen={setViewModalOpen}
                      toggleEditUserDrawer={toggleEditUserDrawer}
                      handleDelete={handleDelete}
                    />
                  </Grid>
                ))
              }
              </Grid>
            )}

            {!StudyMaterialsLoading && StudyMaterials?.last_page !== 1 && (
              <CardContent>
                <Grid sx={{ mt: 2, mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Pagination
                    count={StudyMaterials?.last_page}
                    page={page}
                    color="primary"
                    onChange={(e, page) => {
                      dispatch(getAllCourseStudyMaterials({ branch: selectedBranchId, page: page }));
                      setPage(page)
                    }}
                  />
                </Grid>
              </CardContent>
            )}
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
