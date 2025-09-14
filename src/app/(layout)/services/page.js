import ServicesPage from '@/containers/ServicesPage/ServicesPage'
import { fetchData } from '@/utils/httpService';
import { notFound } from 'next/navigation';

// export async function generateMetadata({ params: { slug } }) {
//   const baseUrl = process.env.NEXT_PUBLIC_MAIN_URL;
  
//   const data = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}news/news-detail/${slug}`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       cache: "no-store",
//     }
//   )
//     .then((res) => {
//       if (res.statusText !== "OK") {
//         return notFound();
//       }
//       return res.json();
//     })
//     .catch((error) => {
//       console.error("Error fetching data:", error.message);
//       return notFound();
//     });

//   const socialMedia = {
//     images: [data?.news_detail?.cover_image],
//     title: data?.news_detail?.seo_title,
//     description: data?.news_detail?.seo_description,
//     url: `${baseUrl}xeberler/${slug}`,
//   };

//   return {
//     title:  data?.news_detail?.seo_title,
//     description: data?.news_detail?.seo_description,
//     openGraph: {
//       ...socialMedia,
//       type: "website",
//     },
//     twitter: socialMedia,
//   };
// }

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

