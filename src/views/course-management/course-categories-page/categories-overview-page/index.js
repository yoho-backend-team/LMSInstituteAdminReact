import { Grid, Button, Box } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import CategorySkeleton from 'components/cards/Skeleton/CategorySkeleton';
import CategoryCard from 'features/course-management/categories-page/category-overview-page/components/CategoryCard';
import CategoryCardHeader from 'features/course-management/categories-page/category-overview-page/components/CategoryCardHeader';
import CategoryFilter from 'features/course-management/categories-page/category-overview-page/components/CategoryFilterCard';
import { selectCourseCategories, selectLoading } from 'features/course-management/categories-page/redux/courseCategorySelectors';
import { getAllCourseCategories } from 'features/course-management/categories-page/redux/courseCategoryThunks';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import NoDataFoundComponent from 'components/empty/noDataFound';
import FilterListIcon from '@mui/icons-material/FilterList';

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categoriesLoading = useSelector(selectLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const courseCategories = useSelector(selectCourseCategories);
  const [categoryRefetch, setCategoryRefetch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const data = {
      branch_id: selectedBranchId,
      page: '1',
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
      <Grid container>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={toggleFilters}
            sx={{
              mb: 2,
              display: 'flex',
              alignItems: 'center',
            }}
            startIcon={<FilterListIcon />}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </Grid>
      </Grid>

      {/* Overlay for Filters */}
      {showFilters && (
        <Box
          sx={{
            position: 'absolute',
            top: 80, 
            left: 0,
            right: 0,
            zIndex: 10,
            backgroundColor: 'rgba(255, 255, 255, 0.9)', 
            padding: 2,
            boxShadow: 3,
          }}
        >
          <CategoryFilter selectedBranchId={selectedBranchId} />
          <CategoryCardHeader setCategoryRefetch={setCategoryRefetch} />
        </Box>
      )}

      {/* Main Content */}
      <Grid container sx={{ opacity: showFilters ? 0.5 : 1 }}>
        {categoriesLoading ? (
          <CategorySkeleton />
        ) : (
          <Grid item xs={12}>
            <Grid container spacing={2} className="match-height" sx={{ marginTop: 0 }}>
              {memoizedCategories?.data?.map((category, index) => (
                <CategoryCard
                  key={index}
                  category={category}
                  setCategoryRefetch={setCategoryRefetch}
                />
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
        {memoizedCategories?.last_page !== 1 &&
          memoizedCategories?.last_page !== 0 && (
            <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Pagination
                count={memoizedCategories?.last_page}
                color="primary"
                sx={{
                  backgroundColor: '#0CCE7F',
                  '&:hover': {
                    backgroundColor: '#0AA865',
                  },
                }}
                onChange={async (e, page) => {
                  const data = {
                    branch_id: selectedBranchId,
                    page: page,
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

