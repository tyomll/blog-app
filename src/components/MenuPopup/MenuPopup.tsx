import React from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

interface MenuPopupProps {
  deletePost: () => void;
  setOpenModal?: (arg: boolean) => void;
}
const MenuPopup: React.FC<MenuPopupProps> = ({ deletePost, setOpenModal }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    deletePost();
  };
  const handleOpenModal = () => {
    handleClose();
    setOpenModal && setOpenModal(true);
  };

  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}>
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            fontFamily: "'DM Sans', sans-serif",
            maxHeight: 45 * 4.5,
            width: '15ch',
            borderRadius: '10px',
          },
        }}>
        <MenuItem onClick={handleOpenModal}>
          <EditIcon sx={{ marginRight: '10px' }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteOutlineOutlinedIcon sx={{ marginRight: '10px' }} />
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

export default MenuPopup;
