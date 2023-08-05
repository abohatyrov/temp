import PropTypes from "prop-types";
// import LogoIcon from "assets/icons/syodo-logo-black.png";
import { Box, Typography } from "@mui/material";

function PromotionBanner({ size, ...rest }) {
  return (
    <Box {...rest}>
      {size === "small" ? null : (
        <Typography variant="body2" sx={{ textAlign: "center" }}>
          Акція тижня від
        </Typography>
      )}
      <Box display="flex">
        <Box
          sx={{
            backgroundColor: "primary",
            border: "2px solid #000000",
            p: size === "small" ? 0.5 : 1,
          }}
        >
          <Typography
            variant={size === "small" ? "h6" : "h4"}
            color="white"
            verticalAlign="middle"
          >
            -50%
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "white",
            borderStyle: "solid",
            borderColor: "#000000",
            borderWidth: "2px 2px 2px 0px",
            px: size === "small" ? 0.5 : 1,
          }}
        >
          <img
            src="/img/icons/syodo-logo-black.png"
            alt="Syodo"
            style={{
              marginLeft: 5,
              width: size === "small" ? 50 : 75,
              position: "relative",
              transform:
                size === "small" ? "translateY(0px)" : "translateY(10px)",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

PromotionBanner.defaultProps = {
  size: "medium",
};

PromotionBanner.propTypes = {
  size: PropTypes.string,
};

export default PromotionBanner;
