import ContactUs from "@/components/ContactUs/ContactUs";

const ContactPage = ({data}) => {
  return (
    <main className="g-container">
      <ContactUs data={data} />
    </main>
  );
};

export default ContactPage;
