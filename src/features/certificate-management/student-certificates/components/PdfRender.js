import React from 'react'

const PdfRender = ({data}) => {
  return (
    <div
            dangerouslySetInnerHTML={{ __html: data }} 
    />
  )
}

export default PdfRender