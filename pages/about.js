import React from "react";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

const about = () => {
  return (
    <div className={poppins.className}>
      <h2>This is about section .....</h2>
    </div>
  );
};

export default about;
