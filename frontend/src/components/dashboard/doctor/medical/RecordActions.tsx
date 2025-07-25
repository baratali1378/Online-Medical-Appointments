// components/dashboard/doctor/medical/RecordActions.tsx
"use client";

import React from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/navigation";

interface Props {
  recordId: number;
  onDelete?: (id: number) => void;
}

export const RecordActions: React.FC<Props> = ({ recordId, onDelete }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openConfirm, setOpenConfirm] = React.useState(false);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => setAnchorEl(null);

  const handleView = () => {
    router.push(`/dashboard/doctor/medical-records/${recordId}`);
    handleCloseMenu();
  };

  const handleEdit = () => {
    router.push(`/dashboard/doctor/medical-records/${recordId}/edit`);
    handleCloseMenu();
  };

  const handleDeleteClick = () => {
    setOpenConfirm(true);
    handleCloseMenu();
  };

  const handleConfirmDelete = () => {
    if (onDelete) onDelete(recordId);
    setOpenConfirm(false);
  };

  return (
    <>
      <IconButton
        onClick={(e) => {
          e.stopPropagation(); // ✅ Prevent row click
          handleOpenMenu(e);
        }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={(e: Event) => {
          e.stopPropagation();
          handleCloseMenu();
        }}
      >
        <MenuItem
          onClick={(e) => {
            e.stopPropagation(); // 👈 prevent row click
            handleView();
          }}
        >
          <ListItemIcon>
            <Visibility fontSize="small" />
          </ListItemIcon>
          <ListItemText>View</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={(e) => {
            e.stopPropagation(); // 👈 prevent row click
            handleEdit();
          }}
        >
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={(e) => {
            e.stopPropagation(); // 👈 prevent row click
            handleDeleteClick();
          }}
        >
          <ListItemIcon>
            <Delete fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this medical record? This action
          cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
