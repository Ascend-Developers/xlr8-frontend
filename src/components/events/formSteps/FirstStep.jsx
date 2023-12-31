/* eslint-disable react/jsx-props-no-spreading */
import Input from 'components/common/input/Input'
import { ErrorMessage, useFormikContext } from 'formik'
import { useDropzone } from 'react-dropzone'

import React, { useCallback } from 'react'

function FirstStep() {
  const formik = useFormikContext()
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result
        console.log(binaryStr)
      }
      reader.readAsArrayBuffer(file)
    })
  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <div className='row'>
      <div className='col-md-6'>
        <Input
          name='name'
          handleChange={formik.handleChange}
          placeholder='Event Name'
          label='Event Name'
        />
        <ErrorMessage className='error-text' component='p' name='name' />
      </div>

      <div className='col-md-6'>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drag drop some files here, or click to select files</p>
        </div>
      </div>
    </div>
  )
}

export default FirstStep
