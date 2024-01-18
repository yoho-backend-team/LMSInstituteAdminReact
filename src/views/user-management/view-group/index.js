import React, { useState, useEffect } from 'react';
import {
  Typography,
  Table,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  FormControlLabel,
  Checkbox,
  Card,
  CardHeader,
  CardContent
} from '@mui/material';

import { getAllPermissions } from 'features/user-management/groups/services/groupService';

const GroupViewPage = () => {
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    getPermissions();
  }, []);

  const getPermissions = async () => {
    try {
      const result = await getAllPermissions();
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

  return (
    <Card fullWidth maxWidth="md" scroll="body">
      <CardHeader
        component="div"
        sx={{
          textAlign: 'center',
          px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(8)} !important`]
        }}
        title="Admin"
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
            <TableBody>{renderPermissions()}</TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default GroupViewPage;
