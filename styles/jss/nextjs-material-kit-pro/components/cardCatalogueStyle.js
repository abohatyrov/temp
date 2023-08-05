
const cardCatalogueStyle = {
  cardContainer: {
    marginTop: "24px",
    "&:hover": {
      transform: "scale(1.04)",
      transition: "transform .3s ease-in-out" /* Animation */,
    },
    transition: "transform .3s ease-in-out",
    border: "1px solid #aaaaaa",
    borderRadius: 3,
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 5px 0 rgba(0, 0, 0, 0.1)",
    width: "100%",
    display: "flex",
    position: "relative",
    wordWrap: "break-word",
    flexDirection: "column",
  },

  lactozaSwitch: {
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      backgroundColor: "#aab4be!important",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url('/assets/icons/nomilkwitch_on.png')`,
          backgroundSize: "75% auto",
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor: "#aab4be!important",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: "#ffffff",
      width: 32,
      height: 32,
      "&:before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "75% auto",
        backgroundImage: `url('/assets/icons/nomilkwitch_off.png')`,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: "#aab4be!important",
      borderRadius: 20 / 2,
      width: "50px",
      height: "1em!important",
    },
  },
};

export default cardCatalogueStyle;
