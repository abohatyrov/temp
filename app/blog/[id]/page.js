import Image from "next/image";

import BoxContainer from "/components/BoxContainer/BoxContainer";
import ProductsService from "/api/ProductsService";
import ConfigurationService from "/api/ConfigurationService";
import BlogPageContent from "./blogPageContent";

export async function generateMetadata({ params }) {
  const blogPost = await ConfigurationService.getBlogById(params.id);
  // console.log("blogResponse", blogPost);

  const pageSettings = {
    siteName: blogPost.ceoTitle ?? "SYODŌ • Блог • Ода•до•якості",
    title: blogPost.ceoTitle ?? "SYODŌ • Блог • Ода•до•якості",
    description: blogPost.ceoDescription ?? blogPost.ceoDescription,
    image: blogPost.imgUrl,
    imageAlt: blogPost.ceoTitle,
    url: `https://syodo.com.ua/blog/${params.id}`,
  };

  return {
    title: pageSettings.title,
    description: pageSettings.description,
    themeColor: "black",
    robots: {
      googleBot: {
        "max-image-preview": "large",
      },
    },
    alternates: {
      canonical: pageSettings.url,
    },
    openGraph: {
      title: pageSettings.title,
      description: pageSettings.description,
      url: pageSettings.url,
      siteName: pageSettings.siteName,
      images: [
        {
          url: pageSettings.image,
          alt: pageSettings.imageAlt,
        },
      ],
      locale: "uk_UA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageSettings.title,
      description: pageSettings.description,
      images: [pageSettings.image],
    },
  };
}

export default async function BlogPage({ params }) {
  // console.log('blog id', params.id)
  const blogPost = await ConfigurationService.getBlogById(params.id);

  const productsResponse = await ProductsService.getProducts();
  let positions = [];
  if ((blogPost.linkedPositions ?? []).length > 0) {
    positions = productsResponse.filter((x) =>
      blogPost.linkedPositions.includes(x.id)
    );
  }

  return (
    <div className="flex flex-col items-center mb-10">
      <BoxContainer className="max-w-6xl">
        <div
          style={{
            aspectRatio: "1.4971/1",
            width: "100%",
            position: "relative",
          }}
        >
          <Image fill src={blogPost.imgUrl} alt={blogPost.title} />
        </div>
        <div
          className="descriptionBlock"
          dangerouslySetInnerHTML={{ __html: blogPost.body }}
        />
        {/* productsToShow */}
        <BlogPageContent relatedProducts={positions} />
      </BoxContainer>
    </div>
  );
}
