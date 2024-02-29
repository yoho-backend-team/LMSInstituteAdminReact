import React, { useState, useMemo, useCallback } from 'react';
import { Box, IconButton, Avatar, Card, CardContent, Typography, Grid, MenuItem, TextField } from '@mui/material';
import Icon from 'components/icon';
import DeleteDialog from 'components/modal/DeleteModel';
import CategoryEditModal from './CategoryEditModal';

const CategoryCard = (props) => {
  // Props
  const { sx, category, setCategoryRefetch } = props;

  // State
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [statusValue, setStatusValue] = useState(category?.is_active);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  console.log(deletingItemId);

  // Memoized variables
  const categoryLogoSrc = useMemo(() => `${process.env.REACT_APP_PUBLIC_API_URL}/storage/${category?.logo}`, [category]);

  // Event handlers
  const handleEditClick = useCallback(() => {
    setSelectedCategory(category);
    setEditModalOpen(true);
  }, [category]);

  const handleDeleteClick = useCallback(() => {
    setDeletingItemId(category.id); // Assuming category has an id property
    setDeleteDialogOpen(true);
  }, [category]);

  const handleStatusChange = useCallback((event) => {
    setStatusValue(event.target.value);
    setDeleteDialogOpen(true); // Not sure why opening delete dialog here, check if necessary
  }, []);

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
              {/* Edit Button */}
              <IconButton onClick={handleEditClick} aria-label="Edit" color="primary">
                <Icon icon="tabler:edit" />
              </IconButton>
              {/* Delete Button */}
              <IconButton onClick={handleDeleteClick} aria-label="Delete" color="error">
                <Icon icon="tabler:archive-filled" />
              </IconButton>
            </Box>
          </Box>
          {/* Category Details */}
          <Typography variant="h3" sx={{ mb: 1, mt: 2 }}>
            {category?.category_name}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1, color: 'text.disabled' }}>
            {category?.course?.length} Courses
          </Typography>
          {/* Category Status Selector */}
          <Grid sx={{ mt: 1 }}>
            <TextField size="small" select fullWidth label="Status" SelectProps={{ value: statusValue, onChange: handleStatusChange }}>
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
      {/* Delete Dialog */}
      <DeleteDialog
        open={isDeleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        description="Are you sure you want to delete this item?"
        title="Delete"
      />
    </Grid>
  );
};

export default CategoryCard;
