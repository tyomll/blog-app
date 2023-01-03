import React from 'react';
import Avatar from 'react-avatar-edit';

interface ImageUploadModalPropsType {
  photoURL: string;
}
const ImageUploadModal: React.FC<ImageUploadModalPropsType> = ({ photoURL }) => {
  const [preview, setPreview] = React.useState<string | null>(null);
  const onClose = () => {
    setPreview(null);
  };

  const onCrop = (photoURL: any) => {
    setPreview(photoURL);
  };

  return (
    <Avatar
      width={800}
      height={800}
      onCrop={() => onCrop(photoURL)}
      onClose={onClose}
      src={photoURL}
    />
  );
};

export default ImageUploadModal;
