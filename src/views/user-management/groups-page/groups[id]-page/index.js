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
      const result = await getAllPermissionsByRoleId({role:id});
  
      if (result.success) {
        setPermissions(result.data);
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
          <TableRow key={module?.id} sx={{ '& .MuiTableCell-root:first-of-type': { pl: '0 !important' },
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
          transition: 'background-color 0.2s ease'
        },
        borderLeft: '4px solid transparent',
        '&:hover': {
          backgroundColor: 'rgba(25, 118, 210, 0.04)'
        } }}>
            <TableCell
             sx={{
              fontWeight: 500,
              whiteSpace: 'nowrap', 
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              gap: 1.5, 
              m:2 
            }}
            >
              {module?.identity}
            </TableCell>

            <TableCell sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>

            {/* {module?.permissions?.map((permission, permissionIndex) => ( */}
             {
              module?.create_permission?.permission &&<TableCell key={module._id}
              elevation={0}
              sx={{
                p: 1,
                borderRadius: '8px',
                backgroundColor: 'rgba(25, 118, 210, 0.08)',
                borderColor: 'primary.main'
              }}
              >
                <FormControlLabel
                  label={"create"}
                  sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                  control={<Checkbox size="small" id={`${module?._id}-write`} checked={module?.create_permission?.permission} />}
                />
              </TableCell>
             }
             {
              module?.read_permission?.permission &&<TableCell key={module._id}
              sx={{
                p: 1,
                borderRadius: '8px',
                backgroundColor: 'rgba(25, 118, 210, 0.08)',
                borderColor: 'primary.main'
              }}>
                <FormControlLabel
                  label={"read"}
                  sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                  control={<Checkbox size="small" id={`${module?._id}-write`} checked={module?.read_permission?.permission} />}
                />
              </TableCell>
             }
             {
              module?.create_permission?.permission &&<TableCell key={module._id}
              sx={{
                p: 1,
                borderRadius: '8px',
                backgroundColor: 'rgba(25, 118, 210, 0.08)',
                borderColor: 'primary.main'
              }}>
                <FormControlLabel
                  label={"update"}
                  sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                  control={<Checkbox size="small" id={`${module?._id}-write`} checked={module?.update_permission?.permission} />}
                />
              </TableCell>
             }
             {
              module?.delete_permission?.permission &&<TableCell key={module._id}
              sx={{
                p: 1,
                borderRadius: '8px',
                backgroundColor: 'rgba(25, 118, 210, 0.08)',
                borderColor: 'primary.main'
              }}>
                <FormControlLabel
                  label={"delete"}
                  sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                  control={<Checkbox size="small" id={`${module?._id}-write`} checked={module?.delete_permission?.permission} />}
                />
              </TableCell>
             }
             {/* ))} */}
             </TableCell>
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
