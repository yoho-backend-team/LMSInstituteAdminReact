// ** MUI Imports
import Grid from '@mui/material/Grid';
import UserViewLeft from './UserViewLeft';
import UserViewRight from './UserViewRight';
import StaffManagementView from 'components/cards/Skeleton/StaffManagementView';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getUserProfileById } from 'features/user-management/users-page/services/userServices';

const UserView = () => {
  const location = useLocation();

  useEffect(() => {
    setUserId(location);
  }, [location]);

  const [userId, setUserId] = useState(location);
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getUserData(userId);
  }, [userId, refetch]);

  const getUserData = async (id) => {
    try {
      const data = {
        id: id
      };
      try {
        const result = await getUserProfileById();
        console.log(result,"result")
        setUserData(result.data);
        setLoading(false);
      } catch (error) {
        setLoading(false); 
      }finally{
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(userData,"user")
  return (
    <>
      {loading ? (
        <StaffManagementView />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={5} lg={4}>
            <UserViewLeft id={userData?.id} userData={userData} setRefetch={setRefetch} />
          </Grid>
          <Grid item xs={12} md={7} lg={8}>
            <UserViewRight id={userData?.id} userData={userData} setRefetch={setRefetch} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default UserView;
