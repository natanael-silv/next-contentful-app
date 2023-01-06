import Image from "next/image";

import * as contentful from "contentful";

var client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_SPACE_TOKEN as string,
});

interface HomeProps {
  Card: {
    title: string;
    image: string;
    genre: string[];
  }[];
}

export default function Home({ Card }: HomeProps) {
  const data = Card;
  console.log(data);

  return data.map((element, index) => {
    return (
      <div key={index}>
        <h1>{element.title}</h1>
        <Image
          src={`https:${element.image}`}
          height={416}
          width={570}
          alt=""
          priority
        />

        {element.genre.map((genre, index) => {
          return <div key={index}>{genre}</div>;
        })}
      </div>
    );
  });
}

export async function getStaticProps() {
  const res = await client.getEntries({ content_type: "seriesIndication" });
  const card = res.items.map((element: any) => {
    return {
      title: element.fields.showTitle,
      image: element.fields.bannerImage.fields.file.url,
      genre: element.fields.genre,
    };
  });
  return {
    props: {
      Card: card,
    },
  };
}
