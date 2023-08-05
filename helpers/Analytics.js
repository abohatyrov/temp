const Analytics = {
  tagPageVisit(window, pagetitle) {
    window.gtag("event", "page_view", {
      page_title: pagetitle,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  },

  tagEvent(window, pagetitle, eventname, eventdetails) {
    window.gtag("event", pagetitle, { [eventname]: eventdetails });
  },

  viewItem(product) {
    if (product && dataLayer) {
      // console.info("viewItem event");
      try {
        dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
        dataLayer.push({
          event: "view_item",
          ecommerce: {
            items: [
              {
                item_id: product.id,
                item_name: product.title,
                currency: "UAH",
                item_category: product.category_name,
              },
            ],
          },
        });
      } catch (error) {
        console.log("error", error);
      }
    }
  },

  addItemToShoppingCart(product, window) {
    if (product && window.dataLayer) {
      const item = {
        item_id: product.id,
        item_name: product.title,
        currency: "UAH",
        price: product.milkOff
          ? parseFloat(product.linkedPrice) / 100
          : parseFloat(product.price) / 100,
        item_category: product.category_name,
        quantity: product.qty,
        item_variant: product.milkOff ? "без лактози" : "",
      };
      //console.log(" window.fbq(track, AddToCart)")
      window.fbq("track", "AddToCart", {
        content_ids: [item.item_id],
        content_type: "product",
        value: item.price,
        currency: "UAH",
      });

      window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
      window.dataLayer.push({
        event: "add_to_cart",
        ecommerce: {
          items: [item],
        },
      });
    }
  },

  removeFromShoppingCart(product) {
    if (product && dataLayer) {
      // console.info("remove_from_cart event", product);
      dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
      dataLayer.push({
        event: "remove_from_cart",
        ecommerce: {
          items: [
            {
              item_id: product.id,
              item_name: product.title,
              currency: "UAH",
              price: product.milkOff
                ? parseFloat(product.linkedPrice) / 100
                : parseFloat(product.price) / 100,
              item_category: product.category_name,
              quantity: product.qty,
              item_variant: product.milkOff ? "без лактози" : "",
            },
          ],
        },
      });
    }
  },

  viewShoppingCart() {
    if (dataLayer) {
      // console.info("view_cart event");
      dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
      dataLayer.push({
        event: "view_cart",
        ecommerce: {
          items: [],
        },
      });
    }
  },

  beginCheckout(products, totalPrice, window) {
    if (dataLayer && products) {
        // console.info("begin_checkout event", products);
        //  console.log(" window.fbq(track, Purchase)", window.fbq)
         window.fbq("track", "Purchase", {
          value: totalPrice,
          currency: "UAH",
        });

        
      dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
      dataLayer.push({
        event: "begin_checkout",
        ecommerce: {
          items: products.map((product) => {
            return {
              item_id: product.id,
              item_name: product.title,
              currency: "UAH",
              price: product.milkOff
                ? parseFloat(product.linkedPrice) / 100
                : parseFloat(product.price) / 100,
              item_category: product.category_name,
              quantity: product.qty,
              item_variant: product.milkOff ? "без лактози" : "",
            };
          }),
        },
      });
    }
  },

  purchase(products) {
    if (dataLayer && products) {
      // console.info("purchase event");
      dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
      dataLayer.push({
        event: "purchase",
        ecommerce: {
          items: products.map((product) => {
            return {
              item_id: product.id,
              item_name: product.title,
              currency: "UAH",
              price: product.milkOff
                ? parseFloat(product.linkedPrice) / 100
                : parseFloat(product.price) / 100,
              item_category: product.category_name,
              quantity: product.qty,
              item_variant: product.milkOff ? "без лактози" : "",
            };
          }),
        },
      });
    }
  },
};

export default Analytics;
