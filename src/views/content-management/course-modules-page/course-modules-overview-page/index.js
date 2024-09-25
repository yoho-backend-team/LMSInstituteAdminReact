import { CardContent } from '@mui/material';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import StudyMaterialSkelton from 'components/cards/Skeleton/ContentSkeleton/MaterialSkelton';
import StatusDialog, { default as ModulesDeleteModal } from 'components/modal/DeleteModel';
import { getActiveBranches } from 'features/branch-management/services/branchServices';
import ModuleAddDrawer from 'features/content-management/course-contents/course-modules-page/components/ModuleAddDrawer';
import ModuleCard from 'features/content-management/course-contents/course-modules-page/components/ModuleCard';
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
import { useInstitute } from 'utils/get-institute-details';
import { useSpinner } from 'context/spinnerContext';

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
  const [reFetch, setRefetch] = useState(false);
  const [statusValue, setStatusValue] = useState({});
  const { show, hide } = useSpinner()
  const [page,setPage] = useState(1)

  const dispatch = useDispatch();
  const Module = useSelector(selectCourseModules);
  const ModuleLoading = useSelector(selectLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const institute_id = useInstitute().getInstituteId()

  useEffect(() => {
    dispatch(getAllCourseModules(
      { branch_id: selectedBranchId,institute_id:institute_id, page: '1' }
    ));
  }, [dispatch, selectedBranchId, refetch]);

  useEffect(() => {
    getActiveBranchesByUser();
  }, []);

  const getActiveBranchesByUser = async () => {
    const result = await getActiveBranches();

    setActiveBranches(result.data.data);
  };
  const userStatusObj = {
    true: 'success',
    false: 'error'
  };

  const handleRowClick = (params) => {
    setSelectedRow(params);
  };

  const handleStatusValue = (event, users) => {
    setStatusDialogOpen(true);
    setStatusValue(users);
  };

  const handleStatusChangeApi = async () => {
    try {
     show() 
     const data = {
      is_active: !statusValue?.is_active,
      module_id: statusValue?.uuid
     };
     const response = await updateCourseModulesStatus(data);
     toast.success(response.message);
      setRefetch((state) => !state);
      dispatch(getAllCourseModules(
        { branch_id: selectedBranchId,institute_id:institute_id, page: page }
      ));
    } catch (error) {
      toast.error(response.message);
    }finally{
      hide()
    }
  };

  const handleViewClose = () => {
    setViewModalOpen(false);
  };

  const toggleEditUserDrawer = () => {
    setEditUserOpen(!editUserOpen);
  };

  const handleDelete = useCallback((itemId) => {
    SetSelectedDeleteId(itemId);
    setModulesDeleteModalOpen(true);
  }, []);

  const handleContentDelete = async () => {
    const data = { id: selectedRow.uuid };
    const result = await deleteCourseModule(data);
    if (result.success) {
      toast.success(result.message);
      setrefetch((state) => !state);
    } else {
      toast.error(result.message);
    }
  };


  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);


  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ModuleHeader toggle={toggleAddUserDrawer} selectedBranchId={selectedBranchId} />
        </Grid>
        <Grid item xs={12}>
          <Grid>
            {ModuleLoading ? (
              <StudyMaterialSkelton />
            ) : (
              <Grid container spacing={2} sx={{ marginLeft: "20px", marginTop: "20px"}} >
              {
                Module?.data?.map((module,index) => (
                  <Grid item xs={12} sm={6} md={4} key={module?.id}>
                    <ModuleCard
                      index={index}
                      page={page}
                      name={module?.title}
                      description={module?.description}
                      courseName={module?.course?.course_name}
                      initialStatus={module?.is_active}
                      module={module}
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
            { !ModuleLoading && Module?.last_page !== 1 && Module?.last_page !== 0 && (
              <CardContent>
                <Grid sx={{ mt: 2, mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Pagination
                    count={Module?.last_page}
                    color="primary"
                    onChange={(e, page) => {
                      dispatch(getAllCourseModules({ branch_id: selectedBranchId,institute_id:institute_id, page: page }));
                    }}
                  />
                </Grid>
              </CardContent>
            )}
          </Grid>
        </Grid>

        <ModuleAddDrawer open={addUserOpen} toggle={toggleAddUserDrawer} branches={activeBranches} setRefetch={setrefetch} />
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
