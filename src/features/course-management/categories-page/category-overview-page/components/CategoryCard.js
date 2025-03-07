import { Box, Card, CardContent, Grid, MenuItem, TextField, Typography } from '@mui/material';
import Icon from 'components/icon';
import CategoryDeleteModel from 'components/modal/DeleteModel';
import StatusChangeDialog from 'components/modal/DeleteModel';
import OptionsMenu from 'components/option-menu';
import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { deleteCourseCategory, updateCourseCategoryStatus } from '../../services/courseCategoryServices';
import CategoryEditModal from './CategoryEditModal';
import { getImageUrl } from 'utils/imageUtils';
import { useSpinner } from 'context/spinnerContext';

const CategoryCard = (props) => {
  const { category, setCategoryRefetch } = props;

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false);
  const [statusValue, setStatusValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryDeleteModelOpen, setCategoryDeleteModelOpen] = useState(false);
  const [selectedCategoryDeleteId, setSelectedCategoryDeleteId] = useState(null);
  const { show, hide } = useSpinner()

  const categoryLogoSrc = useMemo(() => `${getImageUrl(category?.image)}`, [category]);

  const handleEditClick = useCallback(() => {
    setSelectedCategory(category);
    setEditModalOpen(true);
  }, [category]);

  const handleDelete = useCallback((itemId) => {
    setSelectedCategoryDeleteId(itemId);
    setCategoryDeleteModelOpen(true);
  }, []);

  const handleCategoryDelete = async () => {
    show()
    const data = { id: selectedCategoryDeleteId };
    const result = await deleteCourseCategory(data);
    if (result.success) {
      toast.success(result.message);
      setCategoryRefetch((state) => !state);
      hide()
    } else {
      hide()
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
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: 300,
          boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
          borderRadius: '15px',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 0.75rem 1.5rem rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        {/* Image at the Top */}
        <Box
          sx={{
            height: 150,
            backgroundImage: `url(${categoryLogoSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderTopLeftRadius: '15px',
            borderTopRightRadius: '15px',
            imageRendering: "pixelated"
          }}
        />

        {/* Content at the Bottom */}
        <CardContent
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 2,
            paddingTop: 3,
          }}
        >
          <Box sx={{display:"flex",justifyContent:"space-between" ,alignItems:"center"}}>
            <Typography
               variant="h2"
               sx={{
                 fontSize: "1.5rem", 
                 fontWeight: "bold",
                 letterSpacing: "-0.01562em", 
                 background: "linear-gradient(to bottom right, #10B981, #8B5CF6)",
                 WebkitBackgroundClip: "text",
                 WebkitTextFillColor: "transparent",
                 display: "inline-block",
               }}
             
            >
              {category?.category_name}
            </Typography>
            {category?.course?.length > 0 && (
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                {category?.course?.length} Courses
              </Typography>
            )}

<OptionsMenu 
  menuProps={{ 
    sx: { 
      '& .MuiMenuItem-root': { 
        display: 'flex', 
        flexDirection: 'row-reverse' 
      },
      '& .MuiMenuItem-root svg': { ml: 2 } 
    } 
  }}
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
          <span style={{mt:5,color:"grey",display:"inline-block"}}>Status</span>
          <Box 
  sx={{ 
    display: 'flex', 
    alignItems: 'center', 
    gap: 1, 
    border: '1px solid #E0E0E0', 
    borderRadius: '8px', 
    padding: '6px 12px', 
    width: 'fit-content',
    backgroundColor: 'white',
    mt:-2 
  }}
>

  <Box 
    sx={{ 
      width: 10, 
      height: 10, 
      borderRadius: '50%', 
      backgroundColor: category?.is_active ? 'green' : 'gray' 
    }} 
  />
  

  <TextField
    size="small"
    select
    variant="standard"
  
    value={category?.is_active}
    onChange={(e) => handleStatusValue(e, category)}
    sx={{
      minWidth: 100,
      '& .MuiInputBase-root': {
        border: 'none',
      },
      '& .MuiSelect-select': {
        padding: 0, 
      },
      '& .MuiInput-underline:before': {
        borderBottom: 'none !important', 
      },
     
      
    }}
  >
    
    <MenuItem  value="true">Active</MenuItem>
    <MenuItem value="false">Inactive</MenuItem>
    
  </TextField>
</Box>

 
        </CardContent>
      </Card>

      <CategoryEditModal
        category={selectedCategory}
        open={isEditModalOpen}
        handleEditClose={() => setEditModalOpen(false)}
        setCategoryRefetch={setCategoryRefetch}
      />

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
