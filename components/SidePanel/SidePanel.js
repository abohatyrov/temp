import Drawer from "@mui/material/Drawer";
import PropTypes from "prop-types";

export default function SidePanel({
  open = false,
  onClose = () => {},
  children,
}) {
  return (
    <Drawer anchor="right" open={open} onClose={() => onClose()}>
      {children}
    </Drawer>
  );
}

SidePanel.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
