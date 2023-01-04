import React from 'react';
import Avatar from 'react-avatar-edit';
import s from './UploadimageModal.module.scss';

interface UploadimageModalPropsType {
  setPhoto: (arg: null | string) => void;
  handleAvatarSumbit: () => void;
  setUploadMode: (arg: boolean) => void;
}
const UploadimageModal: React.FC<UploadimageModalPropsType> = ({
  setPhoto,
  handleAvatarSumbit,
  setUploadMode,
}) => {
  const onClose = () => {
    setPhoto(null);
  };

  const onCrop = (preview: string | null) => {
    setPhoto(preview);
  };
  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.upload}>
          <Avatar
            width={400}
            height={400}
            label={'Choose a photo'}
            onCrop={onCrop}
            onClose={onClose}
          />
          <div className={s.buttons}>
            <button onClick={() => setUploadMode(false)}>Cancel</button>
            <button onClick={handleAvatarSumbit}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadimageModal;
