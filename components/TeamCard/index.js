import PropTypes from "prop-types";

import Stack from "@mui/material/Stack";

import { Box, Grid, Typography } from "@mui/material";

function TeamCard({ image, name, position, description = "", socials = [] }) {
  return (
    <Box display="flex" flexDirection="column">
      <Grid container justifyContent="center" alignContent="center">
        <Box
          component="img"
          src={image}
          shadow={"md"}
          sx={{ border: "2px solid #000000" }}
          width="75%"
          position="relative"
          zIndex={1}
        />
      </Grid>
      <Box pt={2} sx={{ textAlign: "center" }}>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="body2" mb={2}>
          {position}
        </Typography>
      </Box>
      <div>
        <Typography variant="body2" mb={2}>
          {description}
        </Typography>
        <Stack direction="row" spacing={4} mt={3}>
          {socials}
        </Stack>
      </div>
    </Box>
  );
}

TeamCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  description: PropTypes.string,
  socials: PropTypes.node,
};

export default TeamCard;
