import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

export default function ModalMain({ children, open, setOpen, title }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title"
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box>{title}</Box>
          <CloseOutlinedIcon
            onClick={() => setOpen(false)}
            sx={{ cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{children}</DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
