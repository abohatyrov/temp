import ProductsService from "api/ProductsService";
import ConfigurationService from "../api/ConfigurationService";

export default async function sitemap() {
  const productsResponse = await ProductsService.getProducts();
  const blogsResponse = await ConfigurationService.getBlogs();
  const staticRouting = [
    {
      url: "https://syodo.com.ua", // Absolute url
      lastModified: new Date(),
    },
    {
      url: "https://syodo.com.ua/menu/sushi",
      lastModified: new Date(),
    },
    {
      url: "https://syodo.com.ua/menu/rols",
      lastModified: new Date(),
    },
    {
      url: "https://syodo.com.ua/menu/sets",
      lastModified: new Date(),
    },

    {
      url: "https://syodo.com.ua/menu/drinks",
      lastModified: new Date(),
    },
    {
      url: "https://syodo.com.ua/menu/sauces",
      lastModified: new Date(),
    },
    {
      url: "https://syodo.com.ua/menu/desserts",
      lastModified: new Date(),
    },
    {
      url: "https://syodo.com.ua/promotions",
      lastModified: new Date(),
    },
    {
      url: "https://syodo.com.ua/about",
      lastModified: new Date(),
    },
    {
      url: "https://syodo.com.ua/delivery",
      lastModified: new Date(),
    },
    {
      url: "https://syodo.com.ua/contacts",
      lastModified: new Date(),
    },
    {
      url: "https://syodo.com.ua/oferta",
      lastModified: new Date(),
    },
    {
      url: "https://syodo.com.ua/blog",
      lastModified: new Date(),
    },
  ];
  const dynamicRoutes = productsResponse
    .filter(
      (r) =>
        // SUSHI
        r.category_id === "13" ||
        // Rols
        r.category_id === "7" ||
        // Sets
        r.category_id === "8" ||
        // Deserts
        r.category_id === "11" ||
        // Drinks
        r.category_id === "9"
    )
    .map((r) => ({
      url: `https://syodo.com.ua/products/${r.id}`,
      lastModified: new Date(),
    }));

  const dynamicBlogsRoutes = blogsResponse.map((b) => ({
    url: `https://syodo.com.ua/blogs/${b.id}`,
    lastModified: new Date(),
  }));

  return staticRouting.concat(dynamicRoutes).concat(dynamicBlogsRoutes);
}
