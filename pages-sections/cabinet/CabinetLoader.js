import PropTypes from "prop-types";
import { Box, Skeleton } from "@mui/material";

function CabinetLoader({ isLoading = false }) {
  return (
    <>
      {isLoading ? (
         <Box pt={1} pb={12} px={{ xs: 1, md: 3, lg: 5 }}>
         <Box display="flex" my={1}>
           <Box width="100%" m={1}>
             <Skeleton
               animation="wave"
               variant="rectangular"
               height={40}
             />
           </Box>
           <Box width="100%" mt={0.5}>
             <Skeleton animation="wave" />
             <Skeleton animation="wave" />
           </Box>
         </Box>
         <Box display="flex" my={1}>
           <Box width="100%" m={1}>
             <Skeleton
               animation="wave"
               variant="rectangular"
               height={40}
             />
           </Box>
           <Box width="100%" mt={0.5}>
             <Skeleton animation="wave" />
             <Skeleton animation="wave" />
           </Box>
         </Box>
         <Box display="flex" my={1}>
           <Box width="100%" m={1}>
             <Skeleton
               animation="wave"
               variant="rectangular"
               height={40}
             />
           </Box>
           <Box width="100%" mt={0.5}>
             <Skeleton animation="wave" />
             <Skeleton animation="wave" />
           </Box>
         </Box>
         <Box display="flex" my={1}>
           <Box width="100%" m={1}>
             <Skeleton
               animation="wave"
               variant="rectangular"
               height={40}
             />
           </Box>
           <Box width="100%" mt={0.5}>
             <Skeleton animation="wave" />
             <Skeleton animation="wave" />
           </Box>
         </Box>
         <Box display="flex" my={1}>
           <Box width="100%" m={1}>
             <Skeleton
               animation="wave"
               variant="rectangular"
               height={40}
             />
           </Box>
           <Box width="100%" mt={0.5}>
             <Skeleton animation="wave" />
             <Skeleton animation="wave" />
           </Box>
         </Box>
       </Box>
      ) : null}
    </>
  );
}

CabinetLoader.propTypes = {
  isLoading: PropTypes.bool,
};

export default CabinetLoader;
