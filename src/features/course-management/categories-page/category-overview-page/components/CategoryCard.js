import { Avatar, Box, Card, CardContent, Grid, MenuItem, TextField, Typography } from '@mui/material';
import Icon from 'components/icon';
import { default as CategoryDeleteModel, default as StatusChangeDialog } from 'components/modal/DeleteModel';
import OptionsMenu from 'components/option-menu';
import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { deleteCourseCategory, updateCourseCategoryStatus } from '../../services/courseCategoryServices';
import CategoryEditModal from './CategoryEditModal';
import { getImageUrl } from 'utils/imageUtils';

const CategoryCard = (props) => {
  // Props
  const { category, setCategoryRefetch } = props;

  // State
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false);
  const [statusValue, setStatusValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryDeleteModelOpen, setCategoryDeleteModelOpen] = useState(false);
  const [selectedCategoryDeleteId, setSelectedCategoryDeleteId] = useState(null);

  // Memoized variables
  const categoryLogoSrc = useMemo(() => `${getImageUrl(category?.image)}`, [category]);

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
      is_active: !statusValue?.is_active,
      id: statusValue?.uuid
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
      <Card sx={{ minHeight: 260, boxShadow : "0 .25rem .875rem 0 rgba(38,43,67,.16)" }}>
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
                    text: 'Edit',
                    icon: <Icon icon="tabler:edit" />,
                    menuItemProps: {
                      onClick: () => {
                        handleEditClick();
                      }
                    }
                  },
                  {
                    text: 'Delete',
                    icon: <Icon icon="mdi:delete-outline" />,
                    menuItemProps: {
                      onClick: () => handleDelete(category?.uuid)
                    }
                  }
                ]}
              />
            </Box>
          </Box>

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
         { category?.course?.length&&<Typography variant="body1" sx={{ mb: 1, color: 'text.disabled' }}>
            {category?.course?.length} Courses
          </Typography>
          }
          {/* Category Status Selector */}
          <Grid sx={{ mt: 2 }}>
            <TextField
              size="small"
              select
              width={100}
              label="Status"
              SelectProps={{ value: category?.is_active, onChange: (e) => handleStatusValue(e, category) }}
            >
              <MenuItem value="true">Active</MenuItem>
              <MenuItem value="false">Inactive</MenuItem>
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
        title="Change Status"
        handleSubmit={handleStatusChangeApi}
      />

      <CategoryDeleteModel
        open={categoryDeleteModelOpen}
        setOpen={setCategoryDeleteModelOpen}
        description="Are you sure you want to delete this Category? "
        title="Delete"
        handleSubmit={handleCategoryDelete}
      />
    </Grid>
  );
};

CategoryCard.propTypes = {
  category: PropTypes.any,
  setCategoryRefetch: PropTypes.any
};

export default CategoryCard;
