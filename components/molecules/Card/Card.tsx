import Image from "next/image";
import Link from "next/link";
import { CardProps } from "../../../pages";


export default function Card({ title, image, genre, slug }: CardProps) {
 
  return (
    <div
      className="xl:w-[370px] w-[329px] h-[429px] relative"
     
    >
      <Link href={`/${slug}`}>
        <img
          src={image}
          //height={416}
          //width={329}
          alt=""
          // priority
          className="w-full h-[416px] brightness-50  rounded-md"
        />

        <div className="flex flex-col  absolute  bottom-32 px-7 py-3 font-medium">
          {genre.map((genre, index) => {
            return (
              <div
                key={index}
                className=" text-center mb-3 
              rounded-full p-3 bg-white text-[#391400]"
              >
                {genre}
              </div>
            );
          })}
        </div>
        <h1 className="text-4xl font-extrabold absolute text-white bottom-14 px-7">
          {title}
        </h1>
      </Link>
    </div>
  );
}
