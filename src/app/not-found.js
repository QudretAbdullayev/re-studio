import Custom404 from "@/components/Custom404/Custom404"
import HeatmapCanvas from "@/components/HeatmapCanvas/HeatmapCanvas"
import Header from "@/components/Layout/Header/Header"
import { SoundProvider } from "@/contexts/SoundContext"
import { fetchData } from "@/utils/httpService";
import ScrollTracker from "@/components/ScrollTracker/ScrollTracker";

export default async function NotFound() {
  const [headerData] = await Promise.allSettled([fetchData("home/header")]);

  const headerResults = headerData.status === "fulfilled" ? headerData.value : null;

  return (
    <SoundProvider>
     <ScrollTracker />
      <HeatmapCanvas/>
      <Header data={headerResults} />
      <Custom404/>
    </SoundProvider>
  )
}