import HomePage from "@/containers/HomePage/HomePage";
import { fetchData } from "@/utils/httpService";
import { notFound } from "next/navigation";

// export async function generateMetadata() {
//   const baseUrl = process.env.NEXT_PUBLIC_MAIN_URL;

//   const data = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}api/v1/seo/`,
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
//     // images: [data?.seo?.open_graph_image],
//     title: data?.title,
//     description: data?.description,
//     url: `https://wmx.school`,
//   };

//   return {
//     title: data?.title,
//     description: data?.description,
//     // openGraph: {
//     //   ...socialMedia,
//     //   type: "website",
//     // },
//     twitter: socialMedia,
//   };
// }

export default async function page() {
  const [data] = await Promise.allSettled([fetchData("home/homepage")]);

  const dataResults = data.status === "fulfilled" ? data.value : null;
  return (
    <HomePage data={dataResults}/>
  );
}


// import StarBorder from "@/components/StarBorder1/StarBorder";
// import { TextStaggerHover, TextStaggerHoverActive, TextStaggerHoverHidden } from "@/components/TextStaggerHover/TextStaggerHover";

// export default function Home() {
//   return (
//     <main style={{
//       minHeight: '100vh',
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       flexDirection: 'column',
//       gap: '2rem'
//     }}>
//       <TextStaggerHover as="h2">
//         <TextStaggerHoverActive animation="top">
//           Stagger Animation Y
//         </TextStaggerHoverActive>
//         <TextStaggerHoverHidden animation="bottom">
//           Stagger Animation Y
//         </TextStaggerHoverHidden>
//       </TextStaggerHover>

//       <TextStaggerHover as="h2">
//         <TextStaggerHoverActive animation="right">
//           Stagger Animation X
//         </TextStaggerHoverActive>
//         <TextStaggerHoverHidden animation="left">
//           Stagger Animation X
//         </TextStaggerHoverHidden>
//       </TextStaggerHover>

//       <TextStaggerHover as="h2">
//         <TextStaggerHoverActive animation="blur">
//           Blur Effect
//         </TextStaggerHoverActive>
//         <TextStaggerHoverHidden animation="blur">
//           Blur Effect
//         </TextStaggerHoverHidden>
//       </TextStaggerHover>
//     </main>
//   );
// }


// export default function Home() {
//   return (
//     <main>
//       <div style={{ padding: "2rem" }}>
//       <StarBorder>
//         Theme-aware Border
//       </StarBorder>
//     </div>
//     </main>
//   )}