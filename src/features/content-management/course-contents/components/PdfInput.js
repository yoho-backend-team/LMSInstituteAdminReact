import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import client from 'api/client';
import Icon from 'components/icon';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';

const CoursePdfInput = ({ setCourseNotePdf,setValue,files,setFiles }) => {

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'file/*': ['.pdf']
    },
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles,"accepeted")
      acceptedFiles.map(async(file)=>{
        const fileData = new FormData()
        fileData.append("file",file)
        const uploadFile = await client.file.upload(fileData)
        toast.success(uploadFile.message)
        console.log(uploadFile,"uploadFile")
        setValue("pdf_file",uploadFile.data.file)
      })
      setFiles(acceptedFiles.map((file) => Object.assign(file)));
      setCourseNotePdf(acceptedFiles[0]);
    }
  });

  const renderMedia = () => {
    if (files.length) {
      return files.map((file) => <iframe title={file.name} key={file.name} src={URL.createObjectURL(file)} width="100%" height="500px" />);
    }

    return (
      <Box
        sx={{
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          border: 'dashed',
          p: 2,
          borderWidth: 0.5,
          my: 3
        }}
      >
        <Box
          sx={{
            mb: 5.75,
            width: 48,
            height: 48,
            display: 'flex',
            borderRadius: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: (theme) => theme.palette.primary.main,
            color: '#fff'
          }}
        >
          <Icon icon="tabler:upload" fontSize="1.75rem" />
        </Box>
        <Typography variant="h4" sx={{ mb: 2.5 }}>
          Drop files here or click to upload.
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>(This is just a demo drop zone. Selected files are not actually uploaded.)</Typography>
      </Box>
    );
  };

  return (
    <Grid>
      <Box {...getRootProps({ className: 'dropzone' })} sx={files.length ? { minHeight: 150 } : {}}>
        <input {...getInputProps()} />
        {renderMedia()}
      </Box>
    </Grid>
  );
};

CoursePdfInput.propTypes = {
  setCourseNotePdf: PropTypes.any
};

export default CoursePdfInput;
