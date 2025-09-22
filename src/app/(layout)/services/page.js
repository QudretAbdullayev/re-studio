import ServicesPage from '@/containers/ServicesPage/ServicesPage'
import { fetchData } from '@/utils/httpService';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_MAIN_URL}services/`,
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
    url: `https://heats.az/services`,
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

const Page = async ({ params: { slug } }) => {
  const [servicesData] = await Promise.allSettled([
    fetchData(`services/`)
  ]);

  const data = servicesData.status === "fulfilled" ? servicesData.value : null;

  if (data.detail === "Not found.") {
    notFound()
  }

  return (
    <ServicesPage data={data}/>
  )
}

export default Page

