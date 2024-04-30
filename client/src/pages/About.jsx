import{ useState } from 'react';

const About = () => {
  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const requestOptions = {
      method: 'POST',
      body: formData,
      headers: {
        'userId': userId,
      },
    };

    try {
      const response = await fetch('/api/profile/photo/update', requestOptions);

      if (!response.ok) {
        throw new Error(`Failed to upload file: ${response.statusText}`);
      }

      // Read response asynchronously to check upload progress
      alert('File uploaded successfully!');
      setUploadProgress(0); // Reset progress after successful upload
    } catch (error) {
      console.error('Upload error:', error);
      alert('An error occurred while uploading the file.');
      setUploadProgress(0); // Reset progress on upload error
    }
  };

  return (
    <div>
      <h2>Upload File</h2>
      <input type="file" onChange={handleFileChange} />
      <br />
      <input type="text" placeholder="Enter User ID" value={userId} onChange={handleUserIdChange} />
      <br />
      <button onClick={handleUpload}>Upload</button>
      <br />
      {uploadProgress > 0 && <progress value={uploadProgress} max="100">{uploadProgress}%</progress>}
    </div>
  );
};

export default About;
