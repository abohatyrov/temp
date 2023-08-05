import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Badge, Typography } from "@mui/material";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

// import IconNoMilk from "assets/icons/nomilkwitch_on.png";
import PromotionBanner from "/components/PromotionBanner";
import IncrementButtons from "/components/IncrementButtons/IncrementButtons";
import Image from "next/image";

const SmallAvatar = styled(Avatar)(() => ({
  width: 28,
  height: 28,
  backgroundColor: "#ffffff",
  border: `1px solid #000000`,
  left: "-5px",
}));

function ShoppingCartList({
  itemsList,
  onQtyChange = () => {},
  onItemRemove = () => {},
  showDescriptions = true,
  mobileView = false,
}) {
  return (
    <div className="space-y-2">
      {itemsList.map((item) => (
        <div
          key={item.itemId}
          className="p-1 border border-solid rounded border-[#aaaaaa] bg-white"
        >
          {mobileView ? (
            <div className="px-2 pb-2">
              {/* HEADER */}
              <div className="flex justify-between items-center">
                <Typography variant="h5" fontSize="1.2rem">
                  {item.title}
                </Typography>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  sx={{ mr: 0.1 }}
                  onClick={() => {
                    onItemRemove(item);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
              {/* BODY */}
              <div className="flex space-x-2">
                
                  
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={75}
                        height={75}
                        className="border border-solid rounded border-[#aaaaaa] bg-white"
                      />
                  
                

                <div>
                  {showDescriptions && (
                    <Typography
                      variant={mobileView ? "body2" : "button"}
                      color="text"
                      sx={{ mb: 1 }}
                    >
                      {item.description}
                    </Typography>
                  )}
                  <Typography variant="caption" color="text" component="span">
                    {item.weight}
                  </Typography>
                  {item.milkOff === true && (
                      <div className="flex space-x-1 items-center">
                        <Image
                          alt="Без лактози"
                          src="/assets/icons/nomilkwitch_on.png"
                          width={25}
                          height={25}
                        />
                        <Typography variant="subtitle2" color="error">БЕЗ ЛАКТОЗИ</Typography>
                      </div>
                    )}
                </div>
              </div>
              {item.positionOfTheWeek && (
                <div className="w-full text-center">
                  <Typography variant="button" color="error">
                    Ця позиція не бере участі в акціях 4+1 та -10% на самовивіз
                  </Typography>
                </div>
              )}

              {/* FOOTER */}
              <div className="flex justify-between items-center pt-1">
                {item.positionOfTheWeek ? (
                  <PromotionBanner size="small" />
                ) : (
                  <IncrementButtons
                    initValue={item.qty ?? 1}
                    onChange={(count) => {
                      onQtyChange(item.itemId, count);
                    }}
                    size="medium"
                  />
                )}
                <Typography
                  variant="h5"
                  color="primary"
                  ml={2}
                  fontSize="1.2rem"
                >
                  {(parseFloat(
                    item.milkOff === true ? item.linkedPrice : item.price
                  ) *
                    item.qty) /
                    100}
                  грн
                </Typography>
              </div>
            </div>
          ) : (
            <div className="p-2">
              <div className="flex w-full space-x-2">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={75}
                  height={75}
                  className="border border-solid rounded border-[#aaaaaa] bg-white"
                />

                <div className="flex justify-between w-full">
                  <div>
                    <Typography variant="h5" fontSize="1.2rem">
                      {item.title}
                    </Typography>
                    {showDescriptions && (
                      <Typography color="text">{item.description}</Typography>
                    )}
                     <Typography variant="caption" color="text" component="span">
                    {item.weight}
                  </Typography>
                    {item.milkOff === true && (
                      <div className="flex space-x-1 items-center">
                        <Image
                          alt="Без лактози"
                          src="/assets/icons/nomilkwitch_on.png"
                          width={25}
                          height={25}
                        />
                        <Typography variant="subtitle2" color="error">БЕЗ ЛАКТОЗИ</Typography>
                      </div>
                    )}
                  </div>
                  <div>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      sx={{ mr: 0.1 }}
                      onClick={() => {
                        onItemRemove(item);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
              </div>

              <div className="flex items-center pt-1 justify-end">
                {item.positionOfTheWeek ? (
                  <PromotionBanner size="small" />
                ) : (
                  <IncrementButtons
                    initValue={item.qty ?? 1}
                    onChange={(count) => {
                      onQtyChange(item.itemId, count);
                    }}
                    size="medium"
                  />
                )}
                <Typography
                  variant="h5"
                  fontSize="1.2rem"
                  color="primary"
                  ml={2}
                  sx={{ minWidth: 90 }}
                >
                  {(parseFloat(
                    item.milkOff === true ? item.linkedPrice : item.price
                  ) *
                    item.qty) /
                    100}
                  грн
                </Typography>
              </div>
              {item.positionOfTheWeek && (
                <Typography variant="button" color="error">
                  Ця позиція не бере участі в акціях 4+1 та -10% на самовивіз
                </Typography>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

ShoppingCartList.propTypes = {
  itemsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  onQtyChange: PropTypes.func,
  onItemRemove: PropTypes.func,
  showDescriptions: PropTypes.bool,
  mobileView: PropTypes.bool,
};

export default ShoppingCartList;
