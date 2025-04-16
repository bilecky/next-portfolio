import { NextPage } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { RiArrowGoBackFill } from "react-icons/ri";

const NotFound: NextPage = async () => {
  const tNotFound = await getTranslations("404");

  return (
    <div className="flex h-screen items-center justify-center bg-background text-mainFontColor landscape:items-start">
      <div className="w-full text-center">
        <h1 className="font-doto text-[35vw] font-extrabold leading-none landscape-short:text-[15vw]">
          404
        </h1>
        <div className="my-6">
          <h2 className="font-mainHeaderFont text-xl font-thin md:text-2xl">
            {tNotFound("ProjectNotFound")}
          </h2>
        </div>
        <div className="button_wrapper">
          <Link
            href="/"
            className="group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-sm border-2 border-mainFontColor bg-transparent px-4 py-2 leading-none text-mainFontColor transition-all duration-300"
          >
            <div className="text_container relative">
              <span className="first_text block overflow-hidden text-center transition-all duration-300 group-hover:translate-y-[-100%] group-hover:opacity-0">
                {tNotFound("StandardButton")}
              </span>
              <span className="second_text absolute inset-0 flex translate-y-[100%] items-center justify-center overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {tNotFound("StandardButton")}
              </span>
            </div>

            <RiArrowGoBackFill className="ml-3 text-2xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
