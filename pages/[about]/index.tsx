import React from "react";

import * as contentful from "contentful";
import { useRouter } from "next/router";
import Image from "next/image";

import BackButton from "../../components/atoms/BackButton";
import { HomeProps } from "../";


var client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_SPACE_TOKEN as string,
});

export default function About({ Card }: HomeProps) {
  const router = useRouter();
  const findShow = Card.find((element) => element.slug === router.query.about);

  return (
    <>
      <BackButton />
      <div className="p-5 my-0 mx-auto max-w-[329px] text-left md:max-w-[570px]">
        <h1 className="text-white font-extrabold text-4xl mb-5">
          {findShow?.title}
        </h1>
        <p className="text-white mb-8">{findShow?.description}</p>
        <div className="mb-8 ">
          <span className="text-[#EF6D58] ">GENRE</span>
          {findShow?.genre.map((genre) => {
            return <div className="text-white">{genre}</div>;
          })}
        </div>
      </div>
      <Image
        src={`https:${findShow?.image}`}
        width={329}
        height={202}
        alt={""}
        className="mb-8 my-0 mx-auto md:w-[750px] xl:w-[1170px] rounded-md"
      />
      <span className="flex  justify-center text-white">
        Indicated by: {findShow?.author}
      </span>
    </>
  );
}
export const getStaticPaths = async () => {
  // fetch data from an external API
  const card = await client.getEntries({ content_type: "seriesIndication" });

  // create a list of paths with the card data
  const paths = card.items.map((card: any) => ({
    params: {
      about: card.fields.showTitle,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};
export async function getStaticProps() {
  const res = await client.getEntries({ content_type: "seriesIndication" });
  const card = res.items.map((element: any) => {
    return {
      title: element.fields.showTitle,
      image: element.fields.bannerImage.fields.file.url,
      genre: element.fields.genre,
      description: element.fields.description,
      author: element.fields.author.fields.name,
      slug: element.fields.slug,
    };
  });
  return {
    props: {
      Card: card,
    },
  };
}
