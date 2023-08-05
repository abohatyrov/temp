// import MKTypography from "components/MKTypography";
import PropTypes from "prop-types";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import { Box } from "@mui/material";

function NewBanner({ size = "medium", ...rest }) {
  return (
    <Box {...rest}>
      <Box display="flex">
        <Box
          sx={{
            p: size === "small" || window.innerWidth < 790 ? 0.5 : 1,
          }}
        >
          <FiberNewIcon fontSize="large" color="primary" />
        </Box>
      </Box>
    </Box>
  );
}

NewBanner.propTypes = {
  size: PropTypes.string,
};

export default NewBanner;
