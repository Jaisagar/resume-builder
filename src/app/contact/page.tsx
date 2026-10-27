import ContactForm from "../../components/ContactForm";
import Image from 'next/image'
import Imagescontact from "../../../public/img/about.jpg";
import InnerBanner from "@/src/components/Innerbaner";

export default function ContactPage() {
  return (
    <>
      <InnerBanner />
      <section className="space">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="contact-img">
              <Image src={Imagescontact} alt="" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="contact-form">
              <h1>Contact Us</h1>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
      </section>
    </>
  );
}