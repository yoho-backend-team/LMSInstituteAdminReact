import { Avatar, Box, Card, CardContent, Grid, MenuItem, TextField, Typography } from '@mui/material';
import Icon from 'components/icon';
import CategoryDeleteModel from 'components/modal/DeleteModel';
import StatusChangeDialog from 'components/modal/DeleteModel';
import OptionsMenu from 'components/option-menu';
import { useCallback, useMemo, useState } from 'react';
import CategoryEditModal from './CategoryEditModal';
import { updateCourseCategoryStatus } from '../../services/courseCategoryServices';
import { deleteCourseCategory } from '../../services/courseCategoryServices';
import toast from 'react-hot-toast';

const CategoryCard = (props) => {
  // Props
  const { sx, category, setCategoryRefetch } = props;

  // State
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false);
  const [statusValue, setStatusValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryDeleteModelOpen, setCategoryDeleteModelOpen] = useState(false);
  const [selectedCategoryDeleteId, setSelectedCategoryDeleteId] = useState(null);

  // Memoized variables
  const categoryLogoSrc = useMemo(() => `${process.env.REACT_APP_PUBLIC_API_URL}/storage/${category?.logo}`, [category]);

  // Event handlers
  const handleEditClick = useCallback(() => {
    setSelectedCategory(category);
    setEditModalOpen(true);
  }, [category]);

  // Memoize the handleDelete function to prevent unnecessary re-renders
  const handleDelete = useCallback((itemId) => {
    setSelectedCategoryDeleteId(itemId);
    setCategoryDeleteModelOpen(true);
  }, []);

  // Handle branch deletion
  const handleCategoryDelete = async () => {
    const data = { id: selectedCategoryDeleteId };
    const result = await deleteCourseCategory(data);
    if (result.success) {
      toast.success(result.message);
      setCategoryRefetch((state) => !state);
    } else {
      toast.error(result.message);
    }
  };

  const handleStatusChangeApi = async () => {
    const data = {
      status: statusValue?.is_active === '1' ? '0' : '1',
      id: statusValue?.id
    };
    const response = await updateCourseCategoryStatus(data);
    if (response.success) {
      toast.success(response.message);
      setCategoryRefetch((state) => !state);
    } else {
      toast.error(response.message);
    }
  };

  const handleStatusValue = (event, category) => {
    setStatusChangeDialogOpen(true);
    setStatusValue(category);
  };

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Card sx={{ ...sx }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          {/* Category Logo and Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            {/* Category Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Avatar alt="Category Logo" src={categoryLogoSrc} sx={{ width: 56, height: 56 }} />
            </Box>
            {/* Category Actions */}
            <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <OptionsMenu
                menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
                iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
                options={[
                  {
                    // to: `/apps/invoice/edit/${row.id}`,
                    text: 'Edit',
                    icon: <Icon icon="tabler:edit" />,
                    menuItemProps: {
                      onClick: () => {
                        handleEditClick();
                      }
                    }
                  },
                  {
                    // to: `/apps/invoice/delete/${row.id}`,
                    text: 'Delete',
                    icon: <Icon icon="mdi:delete-outline" />,
                    menuItemProps: {
                      onClick: () => handleDelete(category?.id)
                    }
                  }
                ]}
              />
            </Box>
          </Box>
          {/* Category Details */}
          <Typography
            variant="h3"
            sx={{
              mb: 1,
              mt: 2,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              textOverflow: 'ellipsis'
            }}
          >
            {category?.category_name}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1, color: 'text.disabled' }}>
            {category?.course?.length} Courses
          </Typography>
          {/* Category Status Selector */}
          <Grid sx={{ mt: 2 }}>
            <TextField
              size="small"
              select
              width={100}
              label="Status"
              SelectProps={{ value: category?.is_active, onChange: (e) => handleStatusValue(e, category) }}
            >
              <MenuItem value="1">Active</MenuItem>
              <MenuItem value="0">Inactive</MenuItem>
            </TextField>
          </Grid>
        </CardContent>
      </Card>
      {/* Category Edit Modal */}
      <CategoryEditModal
        category={selectedCategory}
        open={isEditModalOpen}
        handleEditClose={() => setEditModalOpen(false)}
        setCategoryRefetch={setCategoryRefetch}
      />
      {/* Status Change Modal */}
      <StatusChangeDialog
        open={statusChangeDialogOpen}
        setOpen={setStatusChangeDialogOpen}
        description="Are you sure you want to Change Status"
        title="Status"
        handleSubmit={handleStatusChangeApi}
      />

      <CategoryDeleteModel
        open={categoryDeleteModelOpen}
        setOpen={setCategoryDeleteModelOpen}
        description="Are you sure you want to delete this item?"
        title="Delete"
        handleSubmit={handleCategoryDelete}
      />
    </Grid>
  );
};

export default CategoryCard;
