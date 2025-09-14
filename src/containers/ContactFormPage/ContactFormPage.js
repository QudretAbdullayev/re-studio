import ContactForm from '@/components/ContactForm/ContactForm'

const ContactFormPage = ({data}) => {
  return (
    <main className='g-container'>
      <ContactForm data={data}/>
    </main>
  )
}

export default ContactFormPage