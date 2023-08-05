export const GreenAreaMinDeliveryOrder = 40000;
export const YellowAreaMinDeliveryOrder = 60000;
export const RedAreaMinDeliveryOrder = 100000;

export const GreenAreaDeliveryCost = 7000;
export const YellowAreaDeliveryCost = 8000;
export const RedAreaDeliveryCost = 10000;

export const GreenAreaDeliveryTime = 50;
export const YellowAreaDeliveryTime = 55;
export const RedAreaDeliveryTime = 80;

export default function getPrice(dataset, deliveryOptions, selectedPromotion) {
  try {
    // console.log("getPrice");
    // calculate total
    const result = {
      total: dataset.reduce(
        (value, obj) =>
          value + obj.qty * parseFloat(obj.milkOff === true ? obj.linkedPrice : obj.price),
        0
      ),
      promotion: null,
      delivery: 0,
      discount: 0,
      grand_total: 0,
    };

    const cartList = dataset.filter((x) => x.positionOfTheWeek !== true);

    // console.log('deliveryOptions', deliveryOptions);
    // console.log('selectedPromotion', selectedPromotion);
    // if (selectedPromotion === "Самовивіз") {
    //   //
    //   // global -10%
    //   //
    //   const filteredTotal = cartList.reduce(
    //     (value, obj) =>
    //       value + obj.qty * parseFloat(obj.milkOff === true ? obj.linkedPrice : obj.price),
    //     0
    //   );

    //   if (filteredTotal > 0) {
    //     result.promotion = {
    //       promotion_id: "6",
    //       name: "Самовивіз -10%",
    //       products: cartList.map((x) => ({
    //         id: x.milkOff === true ? x.linkedPosition : x.id,
    //         count: x.qty,
    //       })),
    //     };
    //     result.discount = filteredTotal * 0.1;
    //   }
    // } else 
    if (selectedPromotion === "4+1") {
      // check promotions
      //
      // 4 + 1
      //
      // check count
      const positionsForPromotion = cartList.filter((x) => x.category_name === "Роли");
      const applicable41 = positionsForPromotion.reduce((value, obj) => value + obj.qty, 0) > 4;

      if (applicable41) {
        // split by qty
        let bonusPositionsList = [];
        positionsForPromotion.forEach((element) => {
          for (let index = 0; index < element.qty; index++) {
            bonusPositionsList.push({
              ...element,
              id: element.milkOff === true ? element.linkedPosition : element.id,
              price: element.milkOff === true ? element.linkedPrice : element.price,
            });
          }
        });
        bonusPositionsList = bonusPositionsList.sort((a, b) => a.price - b.price);
        const elToDiscountCount = Math.floor(bonusPositionsList.length / (4 + 1));
        const elToDiscount = [];
        for (let index = 0; index < elToDiscountCount; index++) {
          elToDiscount.push(bonusPositionsList.shift());
        }
        result.promotion = {
          promotion_id: "4",
          name: "4+1",
        };

        result.discount = elToDiscount.reduce((value, obj) => value + Number(obj.price), 0);
      }
    }
    // console.log("deliveryOptions", deliveryOptions);
    // calculate delivery
    switch (deliveryOptions?.area) {
      case "green":
        if (result.total < GreenAreaMinDeliveryOrder) {
          result.delivery = GreenAreaDeliveryCost;
        }
        break;
      case "yellow":
        if (result.total < YellowAreaMinDeliveryOrder) {
          result.delivery = YellowAreaDeliveryCost;
        }

        break;
      case "red":
        result.delivery = RedAreaDeliveryCost;
        break;
      default:
        break;
    }

    result.grand_total = result.total + result.delivery - result.discount;
    return result;
  } catch (e) {
    console.error(e);
  }
}
