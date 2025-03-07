import { Grid, Button, Box, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import CategorySkeleton from 'components/cards/Skeleton/CategorySkeleton';
import CategoryCard from 'features/course-management/categories-page/category-overview-page/components/CategoryCard';
import CategoryCardHeader from 'features/course-management/categories-page/category-overview-page/components/CategoryCardHeader';
import CategoryFilter from 'features/course-management/categories-page/category-overview-page/components/CategoryFilterCard';
import { selectCourseCategories, selectLoading } from 'features/course-management/categories-page/redux/courseCategorySelectors';
import { getAllCourseCategories } from 'features/course-management/categories-page/redux/courseCategoryThunks';
import { useEffect, useMemo, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import NoDataFoundComponent from 'components/empty/noDataFound';
import FilterListIcon from '@mui/icons-material/FilterList';
import Icon from 'components/icon';
import CloseIcon from '@mui/icons-material/Close';
import CategoryAddModal from 'features/course-management/categories-page/category-overview-page/components/CategoryAddModal';
const Categories = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categoriesLoading = useSelector(selectLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const courseCategories = useSelector(selectCourseCategories);
  const [categoryRefetch, setCategoryRefetch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef(null);
  const wrapperRef = useRef(null);
  const handleAddClose = () => {
    setAddModalOpen(false);
  };

  const handleAdd = () => {
    setAddModalOpen(true);
  };

  useEffect(() => {
    const data = {
      branch_id: selectedBranchId,
      page: '1'
    };
    dispatch(getAllCourseCategories(data));
  }, [dispatch, selectedBranchId, categoryRefetch]);

  const memoizedCategories = useMemo(() => courseCategories || [], [courseCategories]);

  const onAddClick = () => {
    navigate('/course-management/courses/add');
  };

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <div ref={wrapperRef}>
        <Grid container>
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{display: 'flex', alignItems: 'center',gap:4}}>
              <Button variant="contained" sx={{p:1}} color="primary" onClick={toggleFilters} startIcon={<FilterListIcon />}>
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
              <Typography variant="h2">Course Categories</Typography>
            </Box>
            <Button
              onClick={handleAdd}
              variant="contained"
              color="primary"
              
              sx={{
                backgroundColor: '#0CCE7F',
                ':hover': { backgroundColor: '#0AA865' },
                ml: 2
              }}
              startIcon={<Icon icon="tabler:plus" />}
            >
              Add New Category
            </Button>
            
          </Grid>

          <CategoryAddModal open={isAddModalOpen} handleAddClose={handleAddClose} />
        </Grid>
        {/* Overlay for Filters */}
        {showFilters && (
          <Box
            ref={filterRef}
            sx={{
              position: 'relative',
              left: 0,
              right: 0,
              top: 10,
              backgroundColor: 'white',
              barderRadius:20,
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center'
            }}
          >
            <CategoryFilter selectedBranchId={selectedBranchId} />
            <CategoryCardHeader setCategoryRefetch={setCategoryRefetch} />
            <Button sx={{backgroundColor:'transparent', '&:hover': { backgroundColor: 'transparent' },}} onClick={toggleFilters}><CloseIcon/></Button>
          </Box>
        )}
      </div>

      {/* Main Content */}
      <Grid container>
        {categoriesLoading ? (
          <CategorySkeleton />
        ) : (
          <Grid item xs={12}>
            <Grid container spacing={2} className="match-height" sx={{ marginTop: 1 }}>
              {memoizedCategories?.data?.map((category, index) => (
                <CategoryCard key={index} category={category} setCategoryRefetch={setCategoryRefetch} />
              ))}
            </Grid>
          </Grid>
        )}

        {memoizedCategories?.data?.length === 0 && (
          <NoDataFoundComponent
            title="No Course Categories Found"
            onAdd={onAddClick}
            description="Start by adding a new course category to manage your courses effectively."
            buttonText="Add Course Category"
          />
        )}

        {/* Pagination */}
        {memoizedCategories?.last_page !== 1 && memoizedCategories?.last_page !== 0 && (
          <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Pagination
              count={memoizedCategories?.last_page}
              color="primary"
              sx={{
                backgroundColor: '#0CCE7F',
                '&:hover': {
                  backgroundColor: '#0AA865'
                }
              }}
              onChange={async (e, page) => {
                const data = {
                  branch_id: selectedBranchId,
                  page: page
                };
                dispatch(getAllCourseCategories(data));
              }}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Categories;
