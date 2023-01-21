import Sidebar from "../Sidebar";
import Navbar from "../Navbar-second";
import HeroSectionSearch from "../HeroSection-search";
import { Container } from "./SearchFood";

const SearchFood = () => {
  return (
    <Container>
      <>
        <Sidebar/>
        <Navbar />
        <HeroSectionSearch />
      </>
    </Container>
  );
};

export default SearchFood;
