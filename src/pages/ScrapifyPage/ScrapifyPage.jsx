import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import './ScrapifyPage.scss';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  const onDrop = (acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);

    // Set preview URL using URL.createObjectURL for preview purposes
    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onloadend = () => setPreviewUrl(reader.result);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select an image');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadStatus('Image uploaded successfully!');
      console.log(response.data); // Response data from the backend
    } catch (error) {
      console.error(error);
      setUploadStatus('Upload failed!');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className='scrapify-page'>
      <div className='upload-grid'>
        <div className='left-grid'>
          <div {...getRootProps()} className='upload-sec'>
            <input {...getInputProps()} />
            {selectedFile ? (
              <img className='img-preview' src={previewUrl} alt='Selected image preview' />
            ) : (
              <div className='upload-txt'>
                <svg
                  width={105}
                  height={105}
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M69.857 69.575L52.524 52.242 35.19 69.575M52.524 52.242v39'
                    stroke='#000'
                    strokeWidth={5}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M88.88 79.932a21.667 21.667 0 00-10.356-40.69h-5.46a34.667 34.667 0 10-59.54 31.633'
                    stroke='#000'
                    strokeWidth={5}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M69.857 69.575L52.524 52.242 35.19 69.575'
                    stroke='#000'
                    strokeWidth={5}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                Drag & Drop
              </div>
            )}
            {uploadStatus && <p>{uploadStatus}</p>}
            <button className='upload-btn' onClick={handleSubmit}>
              Upload Image
            </button>
          </div>
        </div>
        <div className='right-grid'>


        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
