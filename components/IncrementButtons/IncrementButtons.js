import React, { useState } from "react";

import PropTypes from "prop-types";

import { IconButton, Typography } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

function IncrementButtons({ initValue = 1, allowZero = false, onChange = () => {}}) {
  const [count, setCount] = useState(1);

  React.useEffect(() => {
    setCount(initValue);
  }, [initValue]);

  return (
    <div className="border border-solid rounded border-[#aaaa] flex justify-between items-center w-24">
      <IconButton
        onClick={() => {
          if (count > (allowZero ? 0 : 1)) {
            onChange(count - 1);
          }
        }}
      >
        <Remove />
      </IconButton>
      <Typography variant="button">{count}</Typography>
      <IconButton
        onClick={() => {
          onChange(count + 1);
        }}
      >
        <Add />
      </IconButton>
    </div>
  );
}


IncrementButtons.propTypes = {
  onChange: PropTypes.func,
  initValue: PropTypes.number,
  allowZero: PropTypes.bool,
};

export default IncrementButtons;
