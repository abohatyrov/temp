import Image from "next/image";
import ProductsService from "/api/ProductsService";
import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";

export default function ProductImage(props) {
  const [prodDetails, setProdDetails] = useState(null);

  const fetchDetails = async () => {
    const { productId } = props;
    const productDetailsResponse = await ProductsService.getProductsById(
      productId
    );
   
    setProdDetails(productDetailsResponse[0]);
  };
  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div>
      {prodDetails ? (
        <Image
          alt={prodDetails?.title}
          // className={classes.image}
          src={prodDetails?.image}
          width={55}
          height={55}
          style={{ backgroundColor: "white", border: "1px solid #000000" }}
        />
      ) : (
        <Skeleton variant="rect" width={55} height={55} />
      )}
    </div>
  );
}
