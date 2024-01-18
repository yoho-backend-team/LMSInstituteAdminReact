// ** React Components
import React, { useEffect } from 'react';

// ** Mui Components
import {
  Checkbox,
  FormControlLabel,
  FormControl,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
  Typography,
  Box,
  Button,
  TextField
} from '@mui/material';

// ** Custom Components
import Icon from 'components/icon';

// ** Toast Import
import toast from 'react-hot-toast';

// ** Api Services Import
import { addGroup, getAllPermissions } from '../services/groupService';

const GroupAddDialog = (props) => {
  // ** Props
  const { addDialogOpen, setAddDialogOpen } = props;

  // ** States
  const [groupName, setGroupName] = React.useState('');
  const [selectedCheckbox, setSelectedCheckbox] = React.useState([]);
  const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = React.useState(false);
  const [permissions, setPermissions] = React.useState([]);

  // ** useEffects
  useEffect(() => {
    if (selectedCheckbox.length > 0 && selectedCheckbox.length < permissions.length * 8) {
      setIsIndeterminateCheckbox(true);
    } else {
      setIsIndeterminateCheckbox(false);
    }
  }, [selectedCheckbox, permissions]);

  useEffect(() => {
    getPermissions();
  }, []);

  // ** Method for AddNewGroup
  const handleAddGroup = async () => {
    try {
      const result = await addGroup(groupName, selectedCheckbox);

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }

      handleAddDialogClose();
    } catch (error) {
      console.log(error);
    }
  };

  // ** Method for SelectAllPermissions
  const handleSelectAllCheckbox = () => {
    if (isIndeterminateCheckbox) {
      setSelectedCheckbox([]);
    } else {
      permissions.forEach((screens) => {
        screens?.screens?.forEach((permissions) => {
          permissions?.permissions?.forEach((permission) => {
            togglePermission(permission.id);
          });
        });
      });
    }
  };

  // ** Method for Manage Permission selection
  const togglePermission = (id) => {
    const arr = selectedCheckbox;
    if (selectedCheckbox.includes(id)) {
      arr.splice(arr.indexOf(id), 1);
      setSelectedCheckbox([...arr]);
    } else {
      arr.push(id);
      setSelectedCheckbox([...arr]);
    }
  };

  // ** Method for GetAllPermissions
  const getPermissions = async () => {
    try {
      const result = await getAllPermissions();

      if (result.success) {
        setPermissions(result.data);
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ** Method for RenderPermissions
  const renderPermissions = () => {
    return permissions.map((module) =>
      module.screens.map((screen, index) => (
        <TableRow key={index} sx={{ '& .MuiTableCell-root:first-of-type': { pl: '0 !important' } }}>
          <TableCell
            sx={{
              fontWeight: 600,
              whiteSpace: 'nowrap',
              fontSize: (theme) => theme.typography.h6.fontSize
            }}
          >
            {screen.screen_name}
          </TableCell>
          {screen.permissions.map((permission, index) => (
            <TableCell key={index}>
              <FormControlLabel
                label={permission.name}
                sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                control={
                  <Checkbox
                    size="small"
                    id={`${index}-write`}
                    onChange={() => togglePermission(permission.id)}
                    checked={selectedCheckbox.includes(permission.id)}
                  />
                }
              />
            </TableCell>
          ))}
        </TableRow>
      ))
    );
  };

  // ** Method for Close Dialog
  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
    setSelectedCheckbox([]);
    setIsIndeterminateCheckbox(false);
  };

  return (
    <Dialog fullWidth maxWidth="md" scroll="body" onClose={handleAddDialogClose} open={addDialogOpen}>
      <DialogTitle
        component="div"
        sx={{
          textAlign: 'center',
          px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(5)} !important`],
          pt: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(8)} !important`]
        }}
      >
        <Typography variant="h3">{`Add Role`}</Typography>
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
                        checked={selectedCheckbox.length === permissions.length}
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
          <Button type="submit" variant="contained" onClick={handleAddGroup}>
            Submit
          </Button>
          <Button color="secondary" variant="tonal" onClick={handleAddDialogClose}>
            Cancel
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default GroupAddDialog;
