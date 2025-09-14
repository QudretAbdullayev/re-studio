import Success from '@/assets/icons/Success'
import styles from './Snackbar.module.scss'
import Error from '@/assets/icons/Error'

const Snackbar = ({success, message}) => {
  return (
    <div className={styles.snackbar}>
      {success ? 
      <>
      <Success /> {message}</> : 
      <span>
      <Error /> {message}</span>}
    </div>
  )
}

export default Snackbar