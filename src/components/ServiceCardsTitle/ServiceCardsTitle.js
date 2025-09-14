import styles from './ServiceCardsTitle.module.scss';

export default function ServiceCardsTitle({title = 'Create'}){
  return (
    <div className={styles.title}>
      {title}
    </div>
  )
}