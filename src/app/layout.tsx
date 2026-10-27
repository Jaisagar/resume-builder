import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/globals.css";
import "../css/style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode } from 'react';
import Navbarmenu from "../components/Navbarmenu";
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer';




export const metadata = {
  title: 'My App',
  description: 'A Next.js 13+ app',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
          <Navbarmenu />
       
          <main>{children}</main>
            {/* <FontAwesomeIcon icon={faThumbsUp} /> */}
           
         <Footer/>
      </body>
    </html>
  );
}
