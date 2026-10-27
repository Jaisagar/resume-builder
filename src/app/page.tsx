import Profetionalcard from "../components/Profetionalcard";
import Slider from "../components/Slider";
import Customer from "../components/Costomer"
import Help from "../components/Help";
import Easysteps from "../components/Easysteps";
import Testimonials from "../components/Teatimonials";
import PickFromTemplates from "../components/PickfromTemplates";
import TranformCareer from "../components/TranformCareer";
import Innerbaner from "../components/Innerbaner";
// app/page.tsx
export default function HomePage() {
  return (
    <>
  
    <Slider/>
    <Profetionalcard/>
   <Customer/>
   <Help/>
   <Easysteps/>
   <Testimonials/>
   <PickFromTemplates/>
   <TranformCareer/>
   
    </>
  );
}
