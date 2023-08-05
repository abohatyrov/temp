import BoxContainer from "/components/BoxContainer/BoxContainer";
import ConfigurationService from "/api/ConfigurationService";
import Link from "next/link";
import Image from "next/image";

export async function generateMetadata() {
  const pageSettings = {
    siteName: "SYODŌ • Блог • Ода•до•якості",
    title: "SYODŌ • Блог • Ода•до•якості",
    description: "SYODŌ • Блог • Ода•до•якості",
    image: "https://media.syodo.com.ua/logo/SYODOlogo_black.png",
    imageAlt: "SYODŌ • Блог • Ода•до•якості",
    url: `https://syodo.com.ua/blog`,
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
  const blogPostsResponse = await ConfigurationService.getBlogs();

  return (
    <div className="flex flex-col items-center mb-10">
      <BoxContainer className="max-w-screen-xl grid gap-4">
        {blogPostsResponse.map((blogArticle) => (
          <Link
            href={`/blog/${blogArticle.id}`}
            key={blogArticle.id}
            className="text-black hover:text-[primary]"
          >
            <BoxContainer className="grid md:flex space-x-4">
              <div className="drop-shadow-lg rounded-md ">
                <img src={blogArticle.imgUrl} alt={blogArticle.title} width="250px" className="relative drop-shadow-lg rounded-md max-h-48"/>
              </div>
              <div>
                <h3>{blogArticle.title}</h3>
                <p className="text-sm">{`Опубліковано: ${new Date(
                  blogArticle.mod_date
                ).toLocaleDateString()}`}</p>
              </div>
            </BoxContainer>
          </Link>
        ))}
      </BoxContainer>
    </div>
  );
}
