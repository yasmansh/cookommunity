import Sidebar from "../Sidebar";
import Navbar from "../Navbar-second";
import AdvancedHeroSectionSearch from "../AdvancedHeroSection-search";
import { Container } from "./AdvancedSearchFood";

const AdvancedSearchFood = () => {
  return (
    <Container>
      <>
        <Sidebar/>
        <Navbar />
        <AdvancedHeroSectionSearch />
      </>
    </Container>
  );
};

export default AdvancedSearchFood;
