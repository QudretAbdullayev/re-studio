import AboutCardContainer from '@/components/AboutCardContainer/AboutCardContainer'
import AboutUs from '@/components/AboutUs/AboutUs'
import CustomSolutions from '@/components/CustomSolutions/CustomSolutions'
import DescriptionBlock from '@/components/DescriptionBlock/DescriptionBlock'
import Faq from '@/components/Faq/Faq'

const AboutPage = ({data}) => {
  return (
    <main>
      <AboutUs title={data.section_label} description={data.main_text} description_left={data.left_text} description_right={data.right_text}/>
      <AboutCardContainer images={data.images}/>
      <DescriptionBlock footer={data.footer_text} animation={data.extra_text}/>
      <CustomSolutions solutions={data.custom_solutions}/>
      <Faq faqs={data.faqs} title={data.faq_title} label={data.faq_label}/>
    </main>
  )
}

export default AboutPage