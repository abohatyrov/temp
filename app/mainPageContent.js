"use client";

import React, { useEffect, useState } from "react";

import useShoppingCart from "hooks/useShoppingCart";

import isEmpty from "helpers/strhelper";
import { Container } from "@mui/material";
import ProductsSection from "/pages-sections/ProductsSection";

import ShoppingCartAlert from "../components/ShoppingCartAlert/ShoppingCartAlert";
import BottomNavigationSection from "../components/BottomNavigation/BottomNavigation";

export default function MainPageContent({
  catalogue = {},
  subcategorySettings = [],
  // isMobileView = false
}) {
  const [isMobileView, setIsMobileView] = useState(true);

  const { addItemToCart } = useShoppingCart();
  const [showAddToCartMessage, setShowAddToCartMessage] = useState(false);

  const handleAddToCart = (e) => {
    addItemToCart(e);
    setShowAddToCartMessage(true);
  };

  const groupBySubCategory = (products, sortSettings) => {
    // group by subcategory
    const grouped = products.reduce((obj, item) => {
      const key = isEmpty(item.subcategory) ? "Інше" : item.subcategory;
      if (!obj.hasOwnProperty(key)) {
        obj[key] = [];
      }
      obj[key].push(item);
      return obj;
    }, {});

    const keys = Object.keys(grouped);
    const keyCount = keys.length;

    if (keyCount > 1) {
      const sortedBySubCategory = sortSettings
        .filter(({ title }) => grouped[title])
        .sort((a, b) => (a.sortorder > b.sortorder ? 1 : -1))
        .map(({ title, sortorder }) => ({
          key: title,
          sortorder: sortorder,
          products: grouped[title],
        }));
      return sortedBySubCategory;
    } else {
      return [
        {
          key: "Інше",
          products: grouped["Інше"],
        },
      ];
    }
  };

  useEffect(() => {
    setIsMobileView(window.innerWidth <= 750);
  }, []);

  return (
    <Container
      maxWidth="xl"
      disableGutters={isMobileView}
      sx={{ pt: 6, pb: 10 }}
    >
      {/* Drinks */}
      {!isMobileView && catalogue["9"]?.length > 0 && (
        <ProductsSection
          sectionName="Напої"
          catalogue={groupBySubCategory(catalogue["9"], subcategorySettings)}
          onItemAddToCart={(e) => handleAddToCart(e)}
          mobileView={isMobileView}
        />
      )}

      {/* Rols */}
      {catalogue["7"]?.length > 0 && (
        <ProductsSection
          sectionName={isMobileView ? null : "Роли"}
          catalogue={groupBySubCategory(catalogue["7"], subcategorySettings)}
          onItemAddToCart={(e) => handleAddToCart(e)}
          mobileView={isMobileView}
        />
      )}

      {/* Sets */}
      {!isMobileView && catalogue["8"]?.length > 0 && (
        <ProductsSection
          sectionName="Сети"
          catalogue={groupBySubCategory(catalogue["8"], subcategorySettings)}
          onItemAddToCart={(e) => handleAddToCart(e)}
          mobileView={isMobileView}
        />
      )}

      {/* Sushi */}
      {!isMobileView && catalogue["13"]?.length > 0 && (
        <ProductsSection
          sectionName="Суші"
          catalogue={groupBySubCategory(catalogue["13"], subcategorySettings)}
          onItemAddToCart={(e) => handleAddToCart(e)}
          mobileView={isMobileView}
        />
      )}

      {/* Deserts */}
      {!isMobileView && catalogue["11"]?.length > 0 && (
        <ProductsSection
          sectionName="Десерти"
          catalogue={groupBySubCategory(catalogue["11"], subcategorySettings)}
          onItemAddToCart={(e) => handleAddToCart(e)}
          mobileView={isMobileView}
        />
      )}

      <ShoppingCartAlert
        show={showAddToCartMessage}
        onClose={() => setShowAddToCartMessage(false)}
      />

      {/* Bottom Menu */}
      {isMobileView && <BottomNavigationSection />}
    </Container>
  );
}
