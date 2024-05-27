import { Grid } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import CategorySkeleton from 'components/cards/Skeleton/CategorySkeleton';
import CategoryCard from 'features/course-management/categories-page/category-overview-page/components/CategoryCard';
import CategoryCardHeader from 'features/course-management/categories-page/category-overview-page/components/CategoryCardHeader';
import CategoryFilter from 'features/course-management/categories-page/category-overview-page/components/CategoryFilterCard';
import { selectCourseCategories, selectLoading } from 'features/course-management/categories-page/redux/courseCategorySelectors';
import { getAllCourseCategories } from 'features/course-management/categories-page/redux/courseCategoryThunks';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Categories = () => {
  const dispatch = useDispatch();
  const categoriesLoading = useSelector(selectLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const courseCategories = useSelector(selectCourseCategories);
  const [categoryRefetch, setCategoryRefetch] = useState(false);

  useEffect(() => {
    const data = {
      branch_id: selectedBranchId,
      page: '1'
    };
    dispatch(getAllCourseCategories(data));
  }, [dispatch, selectedBranchId, categoryRefetch]);

  // Memoize categories data to prevent unnecessary re-renders
  const memoizedCategories = useMemo(() => courseCategories || [], [courseCategories]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <CategoryFilter selectedBranchId={selectedBranchId} />
        <CategoryCardHeader setCategoryRefetch={setCategoryRefetch} />
      </Grid>
      {categoriesLoading ? (
        <CategorySkeleton />
      ) : (
        <Grid item xs={12}>
          <Grid container spacing={2} className="match-height" sx={{ marginTop: 0 }}>
            {memoizedCategories?.map((category, index) => (
              <CategoryCard key={index} category={category} setCategoryRefetch={setCategoryRefetch} />
            ))}
          </Grid>
        </Grid>
      )}

      {/* Pagination */}
      {memoizedCategories?.last_page !== 1 && (
        <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Pagination
            count={memoizedCategories?.last_page}
            color="primary"
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
  );
};

export default Categories;
