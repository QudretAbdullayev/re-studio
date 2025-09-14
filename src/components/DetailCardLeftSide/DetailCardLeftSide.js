import DetailCardDetailProject from "../DetailCardDetailProject/DetailCardDetailProject";
import DetailCardHero from "../DetailCardHero/DetailCardHero";
import DetailMainImage from "../DetailMainImage/DetailMainImage";
import styles from "./DetailCardLeftSide.module.scss";

export default function DetailCardLeftSide({data, onMainImageClick}) {

  return (
    (data.tags || data.image || data.client_description) && <div className={styles.container}>
      {data.tags && <DetailCardHero tags={data.tags} title={data.title} description={data.short_description}/> }
      {data.image && <div className={styles.mainImageContainer}>
        <DetailMainImage image={data.image} title={data.title} onClick={onMainImageClick}/>
      </div>}
      {data.client_description && <DetailCardDetailProject description={data.client_description} website={data.client_website} year={data.year} client={data.client_title} image={data.website_image}/>}
    </div>
  );
}
