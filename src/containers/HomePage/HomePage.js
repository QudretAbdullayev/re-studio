import styles from "./HomePage.module.scss";
import CustomSolutions from "@/components/CustomSolutions/CustomSolutions";
import Faq from "@/components/Faq/Faq";
import HomeCards from "@/components/HomeCards/HomeCards";
import Hero from "@/components/Hero/Hero";
import HomeSlider from "@/components/HomeSlider/HomeSlider";

const HomePage = ({data}) => {
    return (
        <main className={styles.homePage}>
            <Hero slogan={data.slogan} description={data.sub_slogan} about={data.about} tags={data.home_tags}/>
            <HomeSlider data={data.home_brands}/>
            <HomeCards cards={data.case_studies}/>
            <CustomSolutions solutions={data.solutions}/>
            <Faq faqs={data.faq} title={data.faq_title} label={data.faq_label}/>
        </main>
    )
}

export default HomePage