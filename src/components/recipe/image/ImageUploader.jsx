import { useState } from 'react';
import CloudinaryUploadWidget from './CloudinaryUploadWidget';

// const ImageUploader = ({ publicId, setPublicId }) => {
const ImageUploader = ({ image }) => {
  console.log('ImageUploader image:', image);
  // Cloudinary cloud name
  const [cloudName] = useState('dr8avu1nv');
  // Cloudinary upload preset
  const [uploadPreset] = useState('boo7ine9');

  // Cloudinary upload widget configuration
  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    cropping: true, // Add a cropping step.
    // showAdvancedOptions: true,  // Add advanced options (public_id and tag).
    sources: ['local', 'url', 'camera', 'google_drive'], // Restrict the upload sources to URL and local files.
    multiple: false, // Restrict upload to a single file.
    folder: 'recipes', // Upload files to the specified folder.
    // tags: ["users", "profile"], // Add the given tags to the uploaded files.
    // context: {alt: "user_uploaded"}, // Add the given context data to the uploaded files.
    clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'], // Restrict uploading to image files only.
    maxImageFileSize: 2000000, // Restrict file size to less than 2MB
    // maxImageWidth: 2000, // Scales the image down to a width of 2000 pixels before uploading.
    // theme: "purple", // Change the theme.
  });

  return (
    <CloudinaryUploadWidget
      uwConfig={uwConfig}
      image={image}
      // publicId={publicId}
      // setPublicId={setPublicId}
    />
  );
};

export default ImageUploader;
