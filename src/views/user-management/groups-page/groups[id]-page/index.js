import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import AddGroupSkeleton from 'components/cards/Skeleton/AddGroupSkeleton';
import { getAllPermissionsByRoleId } from 'features/user-management/groups-page/services/groupService';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';

const GroupViewPage = () => {
  const [permissions, setPermissions] = useState([]);
  const location = useLocation();
  const group = location?.state?.group;
  const [loading, setLoading] = useState(true);

  // Effect to fetch permissions when the group ID changes
  useEffect(() => {
    if (group?.id) {
      getPermissions(group.id);
    }
  }, [group?.id]);

  // Function to fetch permissions by group ID
  const getPermissions = async (id) => {
    try {
      setLoading(true);
      const result = await getAllPermissionsByRoleId({ role: id });
      console.log("the id is sent")
      if (result.success) {
        // setPermissions(result.data);
        console.log(result.data)
        const test = JSON.stringify(result.data);
        const permissions = JSON.parse(test);

        permissions.forEach(permission => {

          const truevalue = ["$2a$12$H9pZ8mcflz2hZz6tXJpzZeJbWUPwE.AxcUBiHZtA5v57AgD8gXMOu", "$2a$12$/PDEzd8Zx/WJS.9O3xhoF.kBKGOBqExG4zs/gmeaRc4nb9wwNek0a"
            , "$2a$12$JQZ.xBeYO7bpulGLzcEDV.vxZRBamUuTYfzBSlFJLvqwi2QOovw0e", "$2a$12$KFLsbzpwKzWHWl/iQOdFru4IwgW4CbvVKwLSn.xo8ugA7FjDHoJam", "$2a$12$wFY8T3TyGd7Tim1tYdne5eMpc6OI6MAgcEM5qK/Cwk0USWXaYkxam",
            "$2a$12$otMNt92G3Ba99NV.CIYmwe.VJigfeu2M3gx4hFxp2i/yERw/4FW8q"];


          const isPermissioncreatePresent = truevalue.includes(permission.create_permission.permission);
          const isPermissionreadPresent = truevalue.includes(permission.read_permission.permission);
          const isPermissionupdatePresent = truevalue.includes(permission.update_permission.permission);
          const isPermissiondeletePresent = truevalue.includes(permission.delete_permission.permission);

          permission.create_permission.permission = isPermissioncreatePresent
          permission.read_permission.permission = isPermissionreadPresent
          permission.update_permission.permission = isPermissionupdatePresent
          permission.delete_permission.permission = isPermissiondeletePresent

        });

        setPermissions(permissions);

      } else {

      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Memoized rendering of permissions to prevent unnecessary re-renders
  const renderPermissions = useMemo(() => {
    return permissions?.map((module, moduleIndex) => (
      <React.Fragment key={moduleIndex}>
        {/* {module?.screens?.map((screen, screenIndex) => ( */}
        <TableRow key={module?.id} sx={{ '& .MuiTableCell-root:first-of-type': { pl: '0 !important' } }}>
          <TableCell
            sx={{
              fontWeight: 600,
              whiteSpace: 'nowrap',
              fontSize: (theme) => theme.typography.h6.fontSize
            }}
          >
            {module?.identity}
          </TableCell>
          {/* {module?.permissions?.map((permission, permissionIndex) => ( */}
          {
            module?.create_permission?.permission && <TableCell key={module._id}>
              <FormControlLabel
                label={"create"}
                sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                control={<Checkbox size="small" id={`${module?._id}-write`} checked={module?.create_permission?.permission} />}
              />
            </TableCell>
          }
          {
            module?.read_permission?.permission && <TableCell key={module._id}>
              <FormControlLabel
                label={"read"}
                sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                control={<Checkbox size="small" id={`${module?._id}-write`} checked={module?.read_permission?.permission} />}
              />
            </TableCell>
          }
          {
            module?.create_permission?.permission && <TableCell key={module._id}>
              <FormControlLabel
                label={"update"}
                sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                control={<Checkbox size="small" id={`${module?._id}-write`} checked={module?.update_permission?.permission} />}
              />
            </TableCell>
          }
          {
            module?.delete_permission?.permission && <TableCell key={module._id}>
              <FormControlLabel
                label={"delete"}
                sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                control={<Checkbox size="small" id={`${module?._id}-write`} checked={module?.delete_permission?.permission} />}
              />
            </TableCell>
          }
          {/* ))} */}
        </TableRow>
        {/* ))} */}
      </React.Fragment>
    ));
  }, [permissions]);

  return (
    <>
      {loading ? (
        <AddGroupSkeleton />
      ) : (
        <Card>
          <CardHeader
            component="div"
            sx={{
              textAlign: 'center',
              px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pt: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(8)} !important`]
            }}
            title={group?.identity}
          ></CardHeader>
          <CardContent
            sx={{
              pb: (theme) => `${theme.spacing(3)} !important`,
              px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(8)} !important`]
            }}
          >
            <Typography variant="h4" sx={{ pb: 3 }}>
              Group Permissions
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead></TableHead>
                <TableBody>{renderPermissions}</TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default GroupViewPage;
