import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  FormControl,
  TextField,
  Table,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Tooltip,
  Button,
  Icon,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import toast from 'react-hot-toast';
import { getAllPermissions, getPermissionsByRoleId, updateGroup } from '../services/groupService';

const GroupEditDialog = ({ open, setEditDialogOpen, setSelectedEditGroup, group }) => {
  const [selectedCheckbox, setSelectedCheckbox] = useState([]);
  const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [permissionCount, setPermissionCount] = useState('');
  const [groupName, setGroupName] = useState(group?.name);
  console.log(selectedCheckbox);

  useEffect(() => {
    getPermissions();
    setGroupName(group?.name);
  }, []);

  useEffect(() => {
    getAllPermissionsIdByRole();
  }, [group]);

  const handleCloseEditModel = () => {
    setEditDialogOpen(false);
    setSelectedEditGroup('');
  };

  const getPermissions = async () => {
    try {
      const result = await getAllPermissions();

      if (result.success) {
        setPermissions(result.data);
        setPermissionCount(result.permissionsCount);
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAllPermissionsIdByRole = async () => {
    try {
      const result = await getPermissionsByRoleId(group?.id);

      if (result.success) {
        result.data?.forEach((permission) => {
          togglePermission(permission);
        });
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const togglePermission = (id) => {
    const arr = selectedCheckbox;
    if (selectedCheckbox?.includes(id)) {
      arr.splice(arr.indexOf(id), 1);
      setSelectedCheckbox([...arr]);
    } else {
      arr.push(id);
      setSelectedCheckbox([...arr]);
    }
  };

  const handleSelectAllCheckbox = () => {
    if (isIndeterminateCheckbox) {
      setSelectedCheckbox([]);
    } else {
      const arr = [];
      permissionCount?.forEach((permission) => {
        arr.push(permission.id);
      });
      setSelectedCheckbox(arr);
      setIsIndeterminateCheckbox(true);
    }
  };

  const renderPermissions = () => {
    return permissions?.map((module) =>
      module?.screens?.map((screen, index) => (
        <TableRow key={index} sx={{ '& .MuiTableCell-root:first-of-type': { pl: '0 !important' } }}>
          <TableCell
            sx={{
              fontWeight: 600,
              whiteSpace: 'nowrap',
              fontSize: (theme) => theme.typography.h6.fontSize
            }}
          >
            {screen?.screen_name}
          </TableCell>
          {screen?.permissions?.map((permission, index) => (
            <TableCell key={index}>
              <FormControlLabel
                label={permission?.name}
                sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                control={
                  <Checkbox
                    size="small"
                    id={`${index}-write`}
                    // disabled/
                    onChange={() => togglePermission(permission?.id)}
                    checked={selectedCheckbox?.includes(permission?.id)}
                  />
                }
              />
            </TableCell>
          ))}
        </TableRow>
      ))
    );
  };

  const handleGroupEdit = async () => {
    try {
      const result = await updateGroup(group?.id, groupName, selectedCheckbox);

      if (result.success) {
        toast.success(result.message);
        handleCloseEditModel();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      scroll="body"
      onClose={() => {
        handleCloseEditModel();
        setSelectedCheckbox([]);
      }}
      open={open}
    >
      <DialogTitle
        component="div"
        sx={{
          textAlign: 'center',
          px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(5)} !important`],
          pt: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(8)} !important`]
        }}
      >
        <Typography variant="h3">{`Edit Role`}</Typography>
        <Typography color="text.secondary">Set Role Permissions</Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          pb: (theme) => `${theme.spacing(5)} !important`,
          px: (theme) => [`${theme.spacing(3)} !important`, `${theme.spacing(5)} !important`]
        }}
      >
        <Box sx={{ my: 4 }}>
          <FormControl fullWidth>
            <TextField
              fullWidth
              label="Role Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter Role Name"
            />
          </FormControl>
        </Box>
        <Typography variant="h4">Role Permissions</Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ pl: '0 !important' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      whiteSpace: 'nowrap',
                      alignItems: 'center',
                      textTransform: 'capitalize',
                      '& svg': { ml: 1, cursor: 'pointer' },
                      color: (theme) => theme.palette.text.secondary,
                      fontSize: (theme) => theme.typography.h6.fontSize
                    }}
                  >
                    Administrator Access
                    <Tooltip placement="top" title="Allows a full access to the system">
                      <Box sx={{ display: 'flex' }}>
                        <Icon icon="tabler:info-circle" fontSize="1.25rem" />
                      </Box>
                    </Tooltip>
                  </Box>
                </TableCell>
                <TableCell colSpan={3}>
                  <FormControlLabel
                    label="Select All"
                    sx={{ '& .MuiTypography-root': { textTransform: 'capitalize', color: 'text.secondary' } }}
                    control={
                      <Checkbox
                        size="small"
                        onChange={handleSelectAllCheckbox}
                        indeterminate={isIndeterminateCheckbox}
                        checked={selectedCheckbox?.length === permissionCount?.length}
                      />
                    }
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderPermissions()}</TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'center',
          px: (theme) => [`${theme.spacing(3)} !important`, `${theme.spacing(8)} !important`],
          pb: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(8)} !important`]
        }}
      >
        <Box className="demo-space-x">
          <Button type="submit" variant="contained" onClick={handleGroupEdit}>
            Submit
          </Button>
          <Button
            color="secondary"
            variant="tonal"
            onClick={() => {
              handleCloseEditModel();
              setSelectedCheckbox([]);
            }}
          >
            Cancel
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default GroupEditDialog;
