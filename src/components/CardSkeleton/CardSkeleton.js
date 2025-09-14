import styles from './CardSkeleton.module.scss'

const CardSkeleton = ({ className }) => {
    return (
        <div className={`${styles.card} ${className || ""}`}>
            <div className={styles.image}></div>
            <div className={styles.overlay}>
                <div className={styles.texts}>
                    <div className={styles.textLine1}></div>
                    <div className={styles.textLine2}></div>
                    <div className={styles.textLine3}></div>
                </div>
                <div className={styles.tags}>
                    <div className={styles.tag}></div>
                    <div className={styles.tag1}></div>
                </div>
            </div>
        </div>
    )
}

export default CardSkeleton