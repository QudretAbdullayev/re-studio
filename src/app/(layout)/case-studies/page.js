import ProjectsPage from '@/containers/ProjectsPage/ProjectsPage'
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
  const [caseStudiesData, pageData] = await Promise.allSettled([
    fetchData(`case_studies/case_studies/?page=1&page_size=4`),
    fetchData(`case_studies/categories_with_section/`),
  ]);

  const caseStudies = caseStudiesData.status === "fulfilled" ? caseStudiesData.value : null;
  const data = pageData.status === "fulfilled" ? pageData.value : null;

  if (!caseStudies || !data || data.detail === "Not found.") {
    notFound()
  }
  
  return (
    <ProjectsPage caseStudies={caseStudies} data={data}/>
  )
}

export default Page
