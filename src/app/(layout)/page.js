import HomePage from "@/containers/HomePage/HomePage";
import { fetchData } from "@/utils/httpService";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_MAIN_URL}home/homepage`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  )
    .then((res) => {
      if (res.statusText !== "OK") {
        return notFound();
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Error fetching data:", error.message);
      return notFound();
    });

  const socialMedia = {
    images: [data?.opg_image],
    title: data?.seo_title,
    description: data?.seo_description,
    url: `https://heats.az`,
  };

  return {
    title: data?.seo_title,
    description: data?.seo_description,
    openGraph: {
      ...socialMedia,
      type: "website",
    },
    twitter: socialMedia,
  };
}

export default async function page() {
  const [data] = await Promise.allSettled([fetchData("home/homepage")]);

  const dataResults = data.status === "fulfilled" ? data.value : null;
  return (
    <HomePage data={dataResults}/>
  );
}