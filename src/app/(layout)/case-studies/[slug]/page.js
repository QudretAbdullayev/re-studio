import ProjectPage from '@/containers/ProjectsPage/ProjectPage';
import { fetchData } from '@/utils/httpService';
import { notFound } from 'next/navigation';

export async function generateMetadata({params}) {
  const { slug } = await params;
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_MAIN_URL}case_studies/case_studies/${slug}/`,
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
    title: data?.seo_title || data?.title,
    description: data?.seo_description || data?.short_description,
    url: `https://heats.az/case-studies/${slug}`,
  };

  return {
    title: data?.seo_title || data?.title,
    description: data?.seo_description || data?.short_description,
    // openGraph: {
    //   ...socialMedia,
    //   type: "website",
    // },
    twitter: socialMedia,
  };
}

const Page = async ({ params }) => {
  const { slug } = await params;
  const [caseStudyData, otherWorks] = await Promise.allSettled([
    fetchData(`case_studies/case_studies/${slug}/`),
    fetchData(`case_studies/case_studies/?page=1&page_size=20`),
  ]);

  const data = caseStudyData.status === "fulfilled" ? caseStudyData.value : null;
  const otherWorksData = otherWorks.status === "fulfilled" ? otherWorks.value : null;

  if (data.detail === "Not found.") {
    notFound()
  }

  return (
    <ProjectPage data={data} otherWorksData={otherWorksData.results}/>
  )
}

export default Page

