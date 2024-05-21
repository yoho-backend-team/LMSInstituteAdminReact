import { yupResolver } from '@hookform/resolvers/yup';
import { Card, Grid, Stack } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import FormProvider from 'features/course-management/courses-page/course-add-page/components/FormProvider';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import CoursePdfInput from './CoursePdfInput';

export default function CourseValidate({ setCourseSyllabus }) {
  const NewProductSchema = Yup.object().shape({
    images: Yup.array().min(1, 'Images is required')
  });

  const defaultValues = useMemo(
    () => ({
      course_logo: [],
      course_template: ''
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues
  });

  const { reset, handleSubmit, watch } = methods;
  const [files, setFiles] = useState([]);

  const values = watch();

  console.log(values);

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <div>
                <CardHeader title="Course Syllabus" />
                <CoursePdfInput setCourseSyllabus={setCourseSyllabus} files={files} setFiles={setFiles} />
              </div>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

CourseValidate.propTypes = {
  setCourseSyllabus: PropTypes.any
};
