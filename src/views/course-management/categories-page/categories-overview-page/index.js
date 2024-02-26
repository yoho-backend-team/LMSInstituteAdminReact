import { Grid } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import CategorySkeleton from 'components/cards/Skeleton/CategorySkeleton';
import CategoryCard from 'features/course-management/categories-page/category-overview-page/components/CategoryCard';
import CategoryCardHeader from 'features/course-management/categories-page/category-overview-page/components/CategoryCardHeader';
import CategoryFilter from 'features/course-management/categories-page/category-overview-page/components/CategoryFilterCard';
import { selectCourseCategories, selectLoading } from 'features/course-management/categories-page/redux/courseCategorySelectors';
import { getAllCourseCategories } from 'features/course-management/categories-page/redux/courseCategoryThunks';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Categories = () => {
  const dispatch = useDispatch();
  const courseCategories = useSelector(selectCourseCategories);
  const categoriesLoading = useSelector(selectLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const [categoryRefetch, setCategoryRefetch] = useState(false);

  useEffect(() => {
    dispatch(getAllCourseCategories(selectedBranchId));
  }, [dispatch, selectedBranchId, categoryRefetch]);

  console.log(courseCategories);
  return (
    <Grid>
      {categoriesLoading ? (
        <CategorySkeleton />
      ) : (
        <div>
          <Grid item xs={12} sm={12}>
            <CategoryFilter />
            <CategoryCardHeader />
          </Grid>
          <Grid container spacing={2} className="match-height" sx={{ marginTop: 0 }}>
            {courseCategories?.data?.map((category, index) => (
              <CategoryCard key={index} category={category} setCategoryRefetch={ setCategoryRefetch} />
            ))}
          </Grid>
        </div>
      )}
      <Grid sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination count={10} color="primary" />
      </Grid>
    </Grid>
  );
};

export default Categories;
