import React, { useEffect, useMemo, useState } from 'react';
import { Grid } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import CategorySkeleton from 'components/cards/Skeleton/CategorySkeleton';
import CategoryCard from 'features/course-management/categories-page/category-overview-page/components/CategoryCard';
import CategoryCardHeader from 'features/course-management/categories-page/category-overview-page/components/CategoryCardHeader';
import CategoryFilter from 'features/course-management/categories-page/category-overview-page/components/CategoryFilterCard';
import { useDispatch, useSelector } from 'react-redux';
import { selectCourseCategories, selectLoading } from 'features/course-management/categories-page/redux/courseCategorySelectors';
import { getAllCourseCategories } from 'features/course-management/categories-page/redux/courseCategoryThunks';

const Categories = () => {
  // Redux hooks
  const dispatch = useDispatch();
  const categoriesLoading = useSelector(selectLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const courseCategories = useSelector(selectCourseCategories);

  // Local state
  const [categoryRefetch, setCategoryRefetch] = useState(false);

  // Fetch course categories on component mount or when dependencies change
  useEffect(() => {
    dispatch(getAllCourseCategories(selectedBranchId));
  }, [dispatch, selectedBranchId, categoryRefetch]);

  // Memoize categories data to prevent unnecessary re-renders
  const memoizedCategories = useMemo(() => courseCategories?.data || [], [courseCategories]);

  return (
    <Grid container>
      {/* Category skeleton or content based on loading state */}
      {categoriesLoading ? (
        <CategorySkeleton />
      ) : (
        <React.Fragment>
          {/* Category filter and header */}
          <Grid item xs={12}>
            <CategoryFilter />
            <CategoryCardHeader setCategoryRefetch={setCategoryRefetch} />
          </Grid>

          {/* Display categories */}
          <Grid container spacing={2} className="match-height" sx={{ marginTop: 0 }}>
            {memoizedCategories.map((category, index) => (
              <CategoryCard key={index} category={category} setCategoryRefetch={setCategoryRefetch} />
            ))}
          </Grid>
        </React.Fragment>
      )}

      {/* Pagination */}
      <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination count={10} color="primary" />
      </Grid>
    </Grid>
  );
};

export default Categories;
