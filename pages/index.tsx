import CardInfo from "../components/molecules/Card/Card";
import FilterHeader from "../components/molecules/FilterHeader";

import * as contentful from "contentful";
import { useState } from "react";

var client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_SPACE_TOKEN as string,
});

export interface CardProps {
  title: string;
  image: string;
  slug?: string;
  description?: string;
  author?: string;
  genre: string[];
}
export interface HomeProps {
  Card: CardProps[];
}

export default function Home({ Card }: HomeProps) {
  const data = Card;
  const [series, setFilteredSeries] = useState(data);
  console.log(data);

  const handleSelect = (value: string) => {
    const filteredData = data.filter((item) => {
      if (item.genre.includes(value)) {
        return item;
      }
      if (value === "all") {
        return item;
      }
    });
    setFilteredSeries(filteredData);
  };

  return (
    <div>
      <FilterHeader selectedItem={handleSelect} />
      <section className="flex flex-col items-center p-10 md:grid gap-5  grid-cols-2 md:max-w-[770px] xl:grid-cols-card xl:max-w-[1170px] my-0 mx-auto justify-center">
        {series.map((element, index) => {
          return (
            <CardInfo
              key={index}
              title={element.title}
              genre={element.genre}
              image={element.image}
              slug={element.slug}
            />
          );
        })}
      </section>
    </div>
  );
}

export async function getStaticProps() {
  const res = await client.getEntries({ content_type: "seriesIndication" });
  console.log(res);
  const card = res.items.map((element: any) => {
    return {
      title: element.fields.showTitle,
      image: element.fields.bannerImage.fields.file.url,
      genre: element.fields.genre,
      author: element.fields.author,
      slug: element.fields.slug,
    };
  });
  return {
    props: {
      Card: card,
    },
  };
}
