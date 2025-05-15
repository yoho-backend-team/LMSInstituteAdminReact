import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import client from 'api/client';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
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
      acceptedFiles.map(async(file)=>{
        const fileData = new FormData()
        fileData.append("file",file)
        const uploadFile = await client.file.upload(fileData)
        toast.success(uploadFile.message)
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
        justifyContent: 'center',
        flexDirection: 'column',
        border: 'dashed',
        p: 4,
        borderWidth: 2,
        borderRadius: 4,
        my: 3,
        background: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle cx="50" cy="50" r="50" fill="%23E3F2FD" /><circle cx="150" cy="150" r="40" fill="%23BBDEFB" /></svg>') no-repeat center`,
        backgroundSize: 'cover',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      }}
    >
        <CloudUploadIcon style={{ fontSize: 80, color: '#1976d2' }} />
      <Typography variant="h5" sx={{ mb: 2 ,color:"blue"}}>
        Drop files here or click to upload.
      </Typography>
      {/* <Typography sx={{ color: 'text.secondary' }}>
        (This is just a demo drop zone. Selected files are not actually uploaded.)
      </Typography> */}
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
