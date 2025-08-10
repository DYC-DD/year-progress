import React, { useEffect, useRef, useState } from "react";
import DayTrack from "../components/DayTrack/DayTrack";
import YearPct from "../components/YearPct/YearPct";
import "../styles/Home.css";

const Home = () => {
  const [scrollTimeout, setScrollTimeout] = useState(null);

  const section1Ref = useRef(null);
  const section2Ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      const newTimeout = setTimeout(() => {
        snapToNearestSection();
      }, 200);
      setScrollTimeout(newTimeout);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [scrollTimeout]);

  const snapToNearestSection = () => {
    if (!section1Ref.current || !section2Ref.current) return;

    const scrollY = window.scrollY;
    const sections = [
      section1Ref.current.offsetTop,
      section2Ref.current.offsetTop,
    ];

    let closestIndex = 0;
    let minDistance = Infinity;

    sections.forEach((offset, index) => {
      const distance = Math.abs(scrollY - offset);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    window.scrollTo({
      top: sections[closestIndex],
      behavior: "smooth",
    });
  };

  return (
    <div className="home-page font-noto-sans-sc">
      <main className="home-page__main">
        <section ref={section1Ref} className="home-page__section">
          <div className="home-page__card">
            <YearPct />
            <p className="home-page__description">
              Dividing the year into 100 pieces.
            </p>
          </div>
        </section>

        <section ref={section2Ref} className="home-page__section">
          <div className="home-page__card">
            <DayTrack />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
