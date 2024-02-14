// ** React Imports
import { useCallback, useState } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
// ** MUI Imports
import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
// import CardHeader from '@mui/material/CardHeader';
import { IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Icon from 'components/icon';

// ** Custom Components Imports
import MenuItem from '@mui/material/MenuItem';
import StudentCertificateTableHeader from './StudentCertificateTableHeader';
import GroupDeleteDialog from 'features/user-management/groups/components/GroupDeleteDialog';
import { setUsers } from 'features/user-management/users/redux/userSlices';
import { searchUsers } from 'features/user-management/users/services/userServices';
import { useDispatch } from 'react-redux';
import StudyMaterialAddDrawer from './StudentCertificateAddDrawer';
import StudyMaterialEdit from './StudentCertificateEdit';
import StudyMaterialView from './StudentCertificateView';
import CustomTextField from 'components/mui/text-field';

// const userStatusObj = {
//   Active: 'success',
//   Inactive: 'error'
// };

const StudentCertificateDataGrid = () => {
  const [value, setValue] = useState('');
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDeleteMaterial, setSelectedDeleteMaterial] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    // toggleEditUserDrawer();
  };
  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);

  const handleStatusChange = (event, row) => {
    setSelectedDeleteMaterial(row);
    setDeleteDialogOpen(true);
  };

  const handleViewClose = () => {
    setViewModalOpen(false);
  };
  const handleView = () => {
    setViewModalOpen(true);
  };

  const handleDeleteGroup = async () => {
    try {
      const result = await deleteGroup(selectedDeleteMaterial.id);

      if (result.success) {
        toast.success(result.message);
        dispatch(getAllGroups());
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleEditUserDrawer = () => {
    setEditUserOpen(!editUserOpen);
    console.log('Toggle drawer');
  };

  const RowOptions = () => {
    return (
      <Box sx={{ gap: 1 }}>
        <IconButton onClick={() => handleView()} aria-label="capture screenshot" color="primary">
          <Icon icon="tabler:eye" />
        </IconButton>
        <IconButton onClick={toggleEditUserDrawer} aria-label="capture screenshot" color="secondary">
          <Icon icon="tabler:edit" />
        </IconButton>
        <IconButton
          onClick={() => {
            // setSelectedDeleteGroupId(item.id);
            setDeleteDialogOpen(true);
          }}
          aria-label="capture screenshot"
          color="error"
        >
          <Icon icon="mdi:delete-outline" />
        </IconButton>
      </Box>
    );
  };

  const studentcertificates = [
    {
      id: 1,
      title: 'Introduction to JavaScript',
      description: 'Learn the basics of JavaScript programming language.',
      course_name: 'JavaScript Fundamentals',
      status: 'Active',
      file: 'intro_to_js.pdf'
    },
    {
      id: 2,
      title: 'Advanced JavaScript Concepts',
      description: 'Explore advanced concepts such as closures, prototypes, and async programming.',
      course_name: 'Advanced JavaScript',
      status: 'Active',
      file: 'advanced_js_notes.docx'
    },
    {
      id: 3,
      title: 'DOM Manipulation',
      description: 'Study how to interact with the Document Object Model (DOM).',
      course_name: 'Web Development with JavaScript',
      status: 'Inactive',
      file: 'dom_manipulation_video.mp4'
    },
    {
      id: 4,
      title: 'Node.js Basics',
      description: 'Get started with server-side JavaScript using Node.js.',
      course_name: 'Node.js Fundamentals',
      status: 'Active',
      file: 'nodejs_basics.txt'
    },
    {
      id: 5,
      title: 'React.js Fundamentals',
      description: 'Learn the basics of building user interfaces with React.js.',
      course_name: 'React.js for Beginners',
      status: 'Active',
      file: 'react_fundamentals.pdf'
    },
    {
      id: 6,
      title: 'JavaScript Design Patterns',
      description: 'Explore common design patterns used in JavaScript applications.',
      course_name: 'Design Patterns in JS',
      status: 'Active',
      file: 'js_design_patterns.doc'
    },
    {
      id: 7,
      title: 'Testing in JavaScript',
      description: 'Understand how to write tests for JavaScript code.',
      course_name: 'JavaScript Testing',
      status: 'Inactive',
      file: 'testing_in_js_video.mkv'
    },
    {
      id: 8,
      title: 'ES6 Features',
      description: 'Explore the features introduced in ECMAScript 6 (ES6).',
      course_name: 'Modern JavaScript',
      status: 'Active',
      file: 'es6_features_cheatsheet.pdf'
    },
    {
      id: 9,
      title: 'Web Development Best Practices',
      description: 'Learn best practices for building robust and maintainable web applications.',
      course_name: 'Web Dev Best Practices',
      status: 'Active',
      file: 'web_dev_best_practices.docx'
    },
    {
      id: 10,
      title: 'Asynchronous Programming in JavaScript',
      description: 'Understand how to work with asynchronous code in JavaScript.',
      course_name: 'Async JS',
      status: 'Inactive',
      file: 'async_programming_guide.txt'
    }
  ];

  // ** Hooks
  const dispatch = useDispatch();

  const handleFilter = useCallback(
    async (val) => {
      try {
        setValue(val);
        const result = await searchUsers(val);
        if (result.success) {
          console.log('Search results:', result.data);
          dispatch(setUsers(result.data));
        } else {
          console.log(result.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch]
  );

  const columns = [
    {
      flex: 0.8,
      // minWidth: 120,
      headerName: 'Id',
      field: 'employee_id',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
            {row?.id}
          </Typography>
        );
      }
    },
    {
      flex: 1.5,
      // minWidth: 280,
      field: 'title',
      headerName: 'Title',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                // component={Link}
                sx={{
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {row?.title}
              </Typography>
            </Box>
          </Box>
        );
      }
    },
    {
      flex: 1,
      // minWidth: 190,
      field: 'description',
      headerName: 'Description',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row?.description}
          </Typography>
        );
      }
    },
    {
      flex: 1.5,
      field: 'course',
      // minWidth: 170,
      headerName: 'course',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row?.course_name}
            </Typography>
          </Box>
        );
      }
    },

    {
      flex: 1,
      // minWidth: 110,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => {
        return (
          <div>
            <CustomTextField select defaultValue={row.status} onChange={(e) => handleStatusChange(e, row)}>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </CustomTextField>
          </div>
        );
      }
    },
    {
      flex: 1,
      // minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => <RowOptions id={row?.id} />
    }
  ];
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <StudentCertificateTableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
        </Grid>

        <Grid item xs={12} sx={{mt:2}}>
          <Card>
            <DataGrid 
              autoHeight
              rowHeight={80}
              rows={studentcertificates}
              columns={columns}
              disableRowSelectionOnClick 
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              onRowClick={handleRowClick}
            />
          </Card>
        </Grid>

        <StudyMaterialAddDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
        <StudyMaterialEdit open={editUserOpen} toggle={toggleEditUserDrawer} initialValues={selectedRow} />
        <GroupDeleteDialog open={deleteDialogOpen} setOpen={setDeleteDialogOpen} handleDeleteGroup={handleDeleteGroup} />
        <StudyMaterialView open={isViewModalOpen} handleViewClose={handleViewClose} />
      </Grid>
    </>
  );
};

export default StudentCertificateDataGrid;
