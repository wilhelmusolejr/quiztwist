import Navigator from "../Components/Navigator";
import Section from "../Components/Section";
import {
  faBook,
  faFlask,
  faMap,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import CategoryContainer from "../Components/CategoryContainer";

export default function Homee() {
  return (
    <>
      <Navigator />
      <header>
        <Section className="container d-flex flex-wrap flex-lg-nowrap align-items-center justify-content-center">
          {/* left */}
          <div className="my-5">
            <h1 className="text-capitalize w-75 m-auto text-center text-lg-start">
              Daily quiz, daily bonus-play today!
            </h1>
          </div>

          {/* rigt */}
          <div className="d-flex flex-wrap  justify-content-center align-items-center">
            <CategoryContainer icon={faFlask} title="General" />
            <CategoryContainer icon={faBook} title="English" />
            <CategoryContainer icon={faRocket} title="Science" />
            <CategoryContainer icon={faMap} title="Country" />
          </div>
        </Section>
      </header>
    </>
  );
}
