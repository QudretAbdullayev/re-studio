import Header from '@/components/Layout/Header/Header';
import CombinedLoader from '@/components/LoaderLayout/LoaderLayout';
import Footer from '@/components/Layout/Footer/Footer';
import { SoundProvider } from '@/contexts/SoundContext';
import { fetchData } from "@/utils/httpService";
import Cookies from '@/components/Cookies/Cookies';

export default async function  RootLayout({ children }) {
  const [headerData, footerData] = await Promise.allSettled([fetchData("home/header"), fetchData("home/footer")]);

  const headerResults = headerData.status === "fulfilled" ? headerData.value : null;
  const footerResults = footerData.status === "fulfilled" ? footerData.value : null;
  return (
    <SoundProvider>
      <CombinedLoader>
        <Cookies />
        <Header data={headerResults} footerResults={footerResults} />
        {children}
        <Footer data={footerResults} />
      </CombinedLoader>
    </SoundProvider>
  );
}
