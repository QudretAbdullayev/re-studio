import ContactFormPage from '@/containers/ContactFormPage/ContactFormPage'
import { fetchData } from "@/utils/httpService";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_MAIN_URL}apply/`,
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
    // images: [data?.seo?.open_graph_image],
    title: data?.seo_title,
    description: data?.seo_description,
    url: `https://heats.az/apply`,
  };

  return {
    title: data?.seo_title,
    description: data?.seo_description,
    // openGraph: {
    //   ...socialMedia,
    //   type: "website",
    // },
    twitter: socialMedia,
  };
}


export default async function page() {
  const [data] = await Promise.allSettled([fetchData("apply/")]);

  const dataResults = data.status === "fulfilled" ? data.value : null;
  if (data.detail === "Not found." || otherWorksData.detail === "Not found.") {
    notFound()
  }
  return (
    <ContactFormPage data={dataResults}/>
  )
}