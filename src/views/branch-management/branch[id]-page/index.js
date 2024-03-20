import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import React from 'react';
import Coursescard from 'features/branch-management/view-branch/components/headerCards/Coursescard';
import UsersCard from 'features/branch-management/view-branch/components/headerCards/usersCard';
import StaffsCard from 'features/branch-management/view-branch/components/headerCards/staffsCard';
import StudentsCard from 'features/branch-management/view-branch/components/headerCards/studentsCard';
import Earningscard from 'features/branch-management/view-branch/components/Earningscard';
import SupportTicket from 'features/branch-management/view-branch/components/supportTickets';
import CardStudentAndTeachers from 'features/branch-management/view-branch/components/horizondalCards/CardStudentandTeacher';
import CardHorizondalCourses from 'features/branch-management/view-branch/components/horizondalCards/CardHorizondalCourses';
import { gridSpacing } from 'store/constant';
import CardHorizondalClasses from 'features/branch-management/view-branch/components/horizondalCards/CardHorizondalClasses';
import CardHorizondalUsers from 'features/branch-management/view-branch/components/horizondalCards/CardHorizondalUsers';
import { getBranchById } from 'features/branch-management/services/branchServices';
import { useDispatch } from 'react-redux';

const ViewBranch = () => {
  const dispatch = useDispatch();
  const [branchData, setBranchData] = useState([]);
  const location = useLocation();
  const BranchId = location.state.id;

  useEffect(() => {
    const data = {
      id: BranchId
    };
    getBranchdata(data);
    console.log('branchIdCheck',data)
  }, [dispatch, BranchId]);

  const getBranchdata = async (data) => {
    // const branchLoading = useSelector(selectLoading);
    try {
      const result = await getBranchById(data);
      if (result.success) {
        console.log('Branches:', result.data);
        setBranchData(result.data);
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log('viewSingleBranch:', branchData);
  console.log('BranchId:',BranchId);
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} sm={8} spacing={gridSpacing}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={6} sm={3}>
            <UsersCard />
          </Grid>
          <Grid item xs={6} sm={3}>
            <Coursescard />
          </Grid>
          <Grid item xs={6} sm={3}>
            <StaffsCard />
          </Grid>
          <Grid item xs={6} sm={3}>
            <StudentsCard />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={4}>
        <CardStudentAndTeachers />
      </Grid>
      <Grid item xs={12} sm={8}>
        <Earningscard />
      </Grid>

      <Grid item xs={12} sm={4}>
        <SupportTicket />
      </Grid>
      <Grid item xs={12} sm={4}>
        <CardHorizondalCourses />
      </Grid>
      <Grid item xs={12} sm={4}>
        <CardHorizondalClasses />
      </Grid>
      <Grid item xs={12} sm={4}>
        <CardHorizondalUsers />
      </Grid>
    </Grid>
  );
};

export default ViewBranch;
