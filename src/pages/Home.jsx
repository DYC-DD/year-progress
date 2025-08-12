import React, { useEffect, useRef, useState } from "react";
import DayOfYear from "../components/DayOfYear/DayOfYear";
import DayTrack from "../components/DayTrack/DayTrack";
import YearPct from "../components/YearPct/YearPct";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import "../styles/Home.css";

const Home = () => {
  const [scrollTimeout, setScrollTimeout] = useState(null);

  // eslint-disable-next-line no-unused-vars
  const [isHeaderVisible, setIsHeaderVisible] = useState(false); // true / false 開關 Header

  const sectionGridRef = useRef(null);
  const sectionPctRef = useRef(null);
  const sectionTrackRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      const t = setTimeout(() => snapToNearestSection(), 200);
      setScrollTimeout(t);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollTimeout]);

  const sectionsTops = () => {
    const arr = [
      sectionGridRef.current?.offsetTop ?? 0,
      sectionPctRef.current?.offsetTop ?? 0,
      sectionTrackRef.current?.offsetTop ?? 0,
    ];
    return arr;
  };

  const snapToNearestSection = () => {
    if (
      !sectionGridRef.current ||
      !sectionPctRef.current ||
      !sectionTrackRef.current
    )
      return;
    const scrollY = window.scrollY;
    const tops = sectionsTops();

    let closestIndex = 0;
    let minDistance = Infinity;
    tops.forEach((top, i) => {
      const d = Math.abs(scrollY - top);
      if (d < minDistance) {
        minDistance = d;
        closestIndex = i;
      }
    });

    window.scrollTo({ top: tops[closestIndex], behavior: "smooth" });
  };

  const scrollToRef = (ref) => {
    const top = ref.current?.offsetTop ?? 0;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="home-page">
      {isHeaderVisible && (
        <Header
          onScrollTo={(section) => {
            if (section === "grid") scrollToRef(sectionGridRef);
            if (section === "pct") scrollToRef(sectionPctRef);
            if (section === "track") scrollToRef(sectionTrackRef);
          }}
        />
      )}

      <main className="home-page-main">
        <section
          id="year-grid"
          ref={sectionGridRef}
          className="home-page-section"
        >
          <div className="home-page-card">
            <DayOfYear />
          </div>
        </section>

        <section
          id="year-pct"
          ref={sectionPctRef}
          className="home-page-section"
        >
          <div className="home-page-card">
            <YearPct />
          </div>
        </section>

        <section
          id="day-track"
          ref={sectionTrackRef}
          className="home-page-section"
        >
          <div className="home-page-card">
            <DayTrack />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
