import { Grid } from '@mui/material';
import CategoryCard from 'features/course-management/categories/components/CategoryCard';
import CategoryFilter from 'features/course-management/categories/components/CategoryFilterCard';
import CategoryCardHeader from 'features/course-management/categories/components/CategoryCardHeader';
import CategorySkeleton from 'components/cards/Skeleton/CategorySkeleton';
import { useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import { getAllCourseCategories } from 'features/course-management/categories/redux/courseCategoryThunks';
import { selectCourseCategories, selectLoading } from 'features/course-management/categories/redux/courseCategorySelectors';

import { useDispatch, useSelector } from 'react-redux';

// const dummyCategories = [
//   {
//     id: 1,
//     chipText: 'Active',
//     chipColor: 'success',
//     avatarColor: 'error',
//     title: 'React Js',
//     subtitle: '16 Courses',
//     avatarIcon: 'tabler:currency-dollar',
//     image:
//       'https://media.istockphoto.com/id/1411772543/photo/side-profile-of-african-woman-with-afro-isolated-against-a-white-background-in-a-studio.webp?b=1&s=170667a&w=0&k=20&c=AXoZk6bD-xbU4AQ66k4AKpWBRuDgHufmP4A1_Gn_5zg='
//   },
//   {
//     id: 2,
//     chipText: 'Active',
//     chipColor: 'success',
//     avatarColor: 'error',
//     title: 'Angular Js',
//     subtitle: '18 Courses',
//     avatarIcon: 'tabler:currency-dollar',
//     image:
//       'https://media.istockphoto.com/id/1491507378/photo/side-view-of-a-young-black-woman-standing-whilst-listening-to-music-on-her-headphones-with.webp?b=1&s=170667a&w=0&k=20&c=3vq3A-1ydBG8Sf9KD1iYUrB-yf9f0ZVFbxI0Kzx-c0k='
//   },
//   {
//     id: 3,
//     chipText: 'Active',
//     chipColor: 'success',
//     avatarColor: 'error',
//     title: 'Mango Db',
//     subtitle: '26 Courses',
//     avatarIcon: 'tabler:currency-dollar',
//     image:
//       'https://media.istockphoto.com/id/1471295100/photo/senior-black-woman-wearing-white-glasses.webp?b=1&s=170667a&w=0&k=20&c=GayeA6_-SPI23bJ8uglJFHJ093rwrG47Uq_zEz6zvHE='
//   },
//   {
//     id: 4,
//     chipText: 'Active',
//     chipColor: 'success',
//     avatarColor: 'error',
//     title: 'Html Css',
//     subtitle: '50 Courses',
//     avatarIcon: 'tabler:currency-dollar',
//     image:
//       'https://media.istockphoto.com/id/1386479313/photo/happy-millennial-afro-american-business-woman-posing-isolated-on-white.webp?b=1&s=170667a&w=0&k=20&c=ahypUC_KTc95VOsBkzLFZiCQ0VJwewfrSV43BOrLETM='
//   }
// ];

const Categories = () => {
  const dispatch = useDispatch();
  const courseCategories = useSelector(selectCourseCategories);
  const categoriesLoading = useSelector(selectLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  useEffect(() => {
    dispatch(getAllCourseCategories(selectedBranchId));
  }, [dispatch, selectedBranchId]);

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
            {courseCategories.map((category, index) => (
              <CategoryCard key={index} category={category} />
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
