import React from "react";
import { ThemeProvider, Tooltip } from "../../utils/MaterialTailwind";
import { styles } from "../../styles/style";

type Props = {
  room:any;
};

const RoomCard = ({room}: Props) => {
  return (
    <ThemeProvider>
      <div className="md:mx-[12%] mx-[5%] grid grid-cols-3 p-2 md:p-4 border border-gray-300 rounded-md hover:shadow-md">
        <div className="col-span-2">
          <div className="grid md:grid-cols-3 grid-cols-2 gap-5">
            <div className="md:col-span-1 flex items-center">
              <img
                src={room?.imageUrl}
                alt="ui/ux review check"
                className="overflow-hidden rounded-md"
              />
            </div>
            <div className="items-start h-full flex flex-col justify-center md:col-span-2 gap-2">
              <p className="lg:text-xl md:text-sm font-Poppins text-black dark:text-white text-sm uppercase tracking-wider mb-1">
                Room No: <span className="font-medium">{room?.number}</span>{" "}
              </p>
              <div className="border-l-4 pl-3 text-xs md:text-sm lg:text-lg">
                {room?.type} Room
              </div>
              <div className="flex gap-2 md:pt-2">
                <Tooltip content={`65" HDTV`}>
                  <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-1 lg:p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="lg:h-5 h-3 lg:w-5 w-3"
                    >
                      <path d="M19.5 6h-15v9h15V6z" />
                      <path
                        fillRule="evenodd"
                        d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v11.25C1.5 17.16 2.34 18 3.375 18H9.75v1.5H6A.75.75 0 006 21h12a.75.75 0 000-1.5h-3.75V18h6.375c1.035 0 1.875-.84 1.875-1.875V4.875C22.5 3.839 21.66 3 20.625 3H3.375zm0 13.5h17.25a.375.375 0 00.375-.375V4.875a.375.375 0 00-.375-.375H3.375A.375.375 0 003 4.875v11.25c0 .207.168.375.375.375z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </Tooltip>
                <Tooltip content="Free wifi">
                  <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-1 lg:p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="lg:h-5 h-3 lg:w-5 w-3"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.371 8.143c5.858-5.857 15.356-5.857 21.213 0a.75.75 0 010 1.061l-.53.53a.75.75 0 01-1.06 0c-4.98-4.979-13.053-4.979-18.032 0a.75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.182 3.182c4.1-4.1 10.749-4.1 14.85 0a.75.75 0 010 1.061l-.53.53a.75.75 0 01-1.062 0 8.25 8.25 0 00-11.667 0 .75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.204 3.182a6 6 0 018.486 0 .75.75 0 010 1.061l-.53.53a.75.75 0 01-1.061 0 3.75 3.75 0 00-5.304 0 .75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.182 3.182a1.5 1.5 0 012.122 0 .75.75 0 010 1.061l-.53.53a.75.75 0 01-1.061 0l-.53-.53a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between md:px-2 pl-4">
        <p className="text-lg lg:text-2xl w-full flex justify-end p-4 font-semibold">&#8377; {room?.pricePerNight}</p>
          <div
            className={`${styles.button} text-white hover:bg-white hover:text-black border border-black rounded-md transition duration-300`}
          >
            Book 
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default RoomCard;
