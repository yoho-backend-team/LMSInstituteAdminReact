import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Table,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Button,
  FormControlLabel,
  Checkbox
} from '@mui/material';

import { getAllPermissionsByRoleId } from '../services/groupService';
const GroupViewDialog = ({ open, group, setSelectedViewGroup, setViewDialogOpen }) => {
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    getAllPermissions();
  }, [group]);

  const getAllPermissions = async () => {
    try {
      const result = await getAllPermissionsByRoleId(group?.id);

      if (result.success) {
        setPermissions(result.data);
        console.log(result.data);
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.log(error);
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
                control={<Checkbox size="small" id={`${index}-write`} checked={true} />}
              />
            </TableCell>
          ))}
        </TableRow>
      ))
    );
  };

  const handleCloseViewModel = () => {
    setViewDialogOpen(false);
    setSelectedViewGroup('');
  };
  return (
    <Dialog fullWidth maxWidth="md" scroll="body" onClose={handleCloseViewModel} open={open}>
      <DialogTitle
        component="div"
        sx={{
          textAlign: 'center',
          px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(8)} !important`]
        }}
      >
        <Typography variant="h3" s>
          {group?.name}
        </Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          pb: (theme) => `${theme.spacing(3)} !important`,
          px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(8)} !important`]
        }}
      >
        <Typography variant="h4" sx={{ pb: 3 }}>
          Role Permissions
        </Typography>
        <TableContainer>
          <Table size="small">
            <TableHead></TableHead>
            <TableBody>{renderPermissions()}</TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'center',
          px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pb: (theme) => [`${theme.spacing(8)} !important`, `${theme.spacing(8)} !important`]
        }}
      >
        <Box className="demo-space-x">
          <Button color="secondary" variant="tonal" onClick={handleCloseViewModel}>
            Cancel
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default GroupViewDialog;
