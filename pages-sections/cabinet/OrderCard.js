import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Badge, Box, Typography } from "@mui/material";

import Avatar from "@mui/material/Avatar";


const SmallAvatar = styled(Avatar)(() => ({
  width: 28,
  height: 28,
  backgroundColor: "#ffffff",
  border: `1px solid #aaaaaa`,
  borderRadius: 5,
  left: "-5px",
}));

function OrderCard({ item }) {
  return (
    <Box
      key={item.itemId}
      sx={{
        p: 1,
        backgroundColor: "#ffffff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
        }}
      >
       
          {item.milkOff === true ? (
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={<SmallAvatar alt="без лактози" src={"/assets/icons/nomilkwitch_on.png"} />}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "50px",
                  height: "50px",
                  border: "1px solid #aaaaaa",
                  borderRadius: "5px",
                  backgroundColor: "white",
                }}
              />
            </Badge>
          ) : (
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: "50px",
                height: "50px",
                border: "1px solid #aaaaaa",
                borderRadius: "5px",
                backgroundColor: "white",
              }}
            />
          )}
       

        <Typography ml={2} variant="body2">
          {item.title} x{item.qty}
        </Typography>
      </Box>
    </Box>
  );
}

OrderCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default OrderCard;
