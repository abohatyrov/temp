import { Typography, Button, Tabs, tabsClasses } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import CardCatalogue from "/components/Card/CardCatalogue";
import Tab from "@mui/material/Tab";
import Analytics from "/helpers/Analytics";
import 'intersection-observer';
import CardCatalogueLoading from "../components/Card/CardCatalogueLoading";

const sortData = (a, b) => {
  if (a.categorySortOrder !== b.categorySortOrder) {
    return a.categorySortOrder - b.categorySortOrder;
  }

  const aSortOrder = `${a.sortOrder}` ?? "1";
  const bSortOrder = `${b.sortOrder}` ?? "1";
  if (aSortOrder !== bSortOrder) {
    // Compare alphanumeric strings using localeCompare()
    return aSortOrder.localeCompare(bSortOrder);
  }

  // If sortOrder is identical or empty, sort by title
  return a.title.localeCompare(b.title);
};


export default function ProductsSection({
  sectionName = null,
  catalogue = [],
  onItemAddToCart = () => {},
  mobileView = false,
}) {
  const sectionRef = useRef(null);

  const [selectedCategory, setSelectedCategory] = useState(0);
  const [flatList, setFlatList] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [displayCount, setDisplayCount] = useState(6);

  const handleChangeCategory = (event, newValue) => {
    setSelectedCategory(newValue);
  
    if (newValue === 0) {
      //all
      setDisplayedProducts(flatList);
    } else {
      // display coresponding secction
      setDisplayedProducts(flatList.filter(i=> i.subcategory === catalogue[newValue - 1].key));
    }
    const container = document.getElementById("category-filter-container");
    const headerOffset =
      document.body.getElementsByTagName("header")[0]?.clientHeight ?? 124;
    window.scrollTo(0, container?.offsetTop - headerOffset);
    document.body.scrollTop = container?.offsetTop - headerOffset;
  };

  const handleCategorySelectorStick = () => {
    const windowsScrollTop = window.pageYOffset;
    const headerOffset =
      document.body.getElementsByTagName("header")[0]?.clientHeight ?? 124;

    const sectioncontainer = document.getElementById(sectionName + "-block");
    const container = document.getElementById("category-filter-container");
    const tabs = document.getElementById("category-filter");

    if (container && tabs) {
      if (windowsScrollTop > container.offsetTop - headerOffset) {
        tabs.style.zIndex = 100;
        tabs.style.position = "fixed";
        tabs.style.width = `${container.clientWidth}px`;
        if (windowsScrollTop <= sectioncontainer.clientHeight) {
          tabs.style.top = `${headerOffset}px`;
        } else {
          tabs.style.top = `${
            sectioncontainer?.clientHeight - windowsScrollTop + headerOffset
          }px`;
        }
      } else {
        tabs.style.position = "static";
      }
    }
  };

  useEffect(() => {
    const flattenList = catalogue
      .map((category) =>
        category.products.map((p) => {
          return { ...p, categorySortOrder: category.sortorder };
        })
      )
      .flat()
      .sort(sortData);
    setFlatList(flattenList);
    setDisplayedProducts(flattenList);
    if (catalogue?.length > 1) {
      window.addEventListener("scroll", handleCategorySelectorStick);
    }
    return function cleanup() {
      if (catalogue?.length > 1) {
        window.removeEventListener("scroll", handleCategorySelectorStick);
      }
    };
  }, [catalogue]);

  useEffect(() => {
    // Intersection Observer configuration
    const options = {
      root: null, // Use the viewport as the root element
      rootMargin: "0px",
      threshold: 0.05, // Trigger when at least 10% of the section is visible
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Cleanup the observer when the component unmounts
    return () => {
      if (sectionRef.current) {
      observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Function to be called when the section intersects the viewport
  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Fetch additional data when the section becomes visible
        setDisplayCount((prev) => prev + 3);
      }
    });
  };

  return (
    <div id={sectionName + "-block"}>
      {sectionName && !mobileView && (
        <Typography variant="h3" mt={3} mb={1} sx={{ textAlign: "center" }}>
          {sectionName}
        </Typography>
      )}

      {catalogue.length > 1 && (
        <div className="w-full" id="category-filter-container">
          <Tabs
            id="category-filter"
            className=" bg-white border border-solid border-gray-400 drop-shadow  w-full z-100"
            value={selectedCategory}
            onChange={handleChangeCategory}
            variant={mobileView ? "scrollable" : "fullWidth"}
            centered={!mobileView}
            scrollButtons
            allowScrollButtonsMobile
            sx={{
              [`& .${tabsClasses.scrollButtons}`]: {
                "&.Mui-disabled": { opacity: 0.3 },
              },
            }}
          >
            <Tab
              label="Всі"
              key="Всі"
              component={Button}
              classes={{
                selected: "color-white bg-red-700",
              }}
            />
            {catalogue.map((subcategory) =>
              subcategory.products.length > 0 ? (
                <Tab
                  component={Button}
                  label={subcategory.key}
                  key={subcategory.key}
                  classes={{
                    selected: "color-white bg-red-700",
                  }}
                />
              ) : null
            )}
          </Tabs>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 mt-2">
        {displayedProducts.slice(0, displayCount).map((item) => (
          <CardCatalogue
            key={item.id}
            mobileView={mobileView}
            id={item.id}
            image={item.image}
            category={{ color: "warning", label: "hub" }}
            title={item.title}
            description={item.description}
            weight={item.weight}
            price={item.price}
            linkedPosition={item.linkedPosition}
            linkedPrice={item.linkedPrice}
            positionOfTheWeek={item.positionOfTheWeek}
            showAsNew={item.showAsNew}
            onAction={(e) => {
              onItemAddToCart({
                ...item,
                qty: e.qty,
                milkOff: e.milkOff,
              });

              Analytics.addItemToShoppingCart(
                {
                  ...item,
                  qty: e.qty,
                  milkOff: e.milkOff,
                },
                window
              );
            }}
          />
        ))}
      </div>

      <div ref={sectionRef}>
        {/* LOAD MORE */}
        {displayedProducts.length > displayCount && (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 mt-2">
            <CardCatalogueLoading />
            <CardCatalogueLoading className="hidden md:block"/>
            <CardCatalogueLoading className="hidden xl:block"/>
          </div>
        )}
      </div>
    </div>
  );
}

ProductsSection.propTypes = {
  sectionName: PropTypes.string,
  catalogue: PropTypes.arrayOf(PropTypes.object),
  onItemAddToCart: PropTypes.func,
  mobileView: PropTypes.bool,
};
