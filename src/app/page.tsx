"use client";

import { useRouter } from "next/navigation";
import { FunctionComponent } from "react";

const HomePage: FunctionComponent = () => {
  const router = useRouter();
  router.replace("/create-post");

  return <></>;
};

export default HomePage;
