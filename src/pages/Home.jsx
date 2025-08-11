import React, { useEffect, useRef, useState } from "react";
import DayOfYear from "../components/DayOfYear/DayOfYear";
import DayTrack from "../components/DayTrack/DayTrack";
import YearPct from "../components/YearPct/YearPct";
import "../styles/Home.css";

const Home = () => {
  const [scrollTimeout, setScrollTimeout] = useState(null);

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
    <div className="home-page font-noto-sans-sc">
      <nav
        aria-label="Section anchors"
        style={{
          position: "fixed",
          zIndex: 10,
          right: "1rem",
          top: "1rem",
          display: "flex",
          gap: "0.5rem",
          fontFamily: "Ubuntu Mono, monospace",
        }}
      >
        <a
          href="#year-grid"
          onClick={(e) => {
            e.preventDefault();
            scrollToRef(sectionGridRef);
          }}
          style={{ color: "#bbb", textDecoration: "none" }}
        >
          grid
        </a>
        <a
          href="#year-pct"
          onClick={(e) => {
            e.preventDefault();
            scrollToRef(sectionPctRef);
          }}
          style={{ color: "#bbb", textDecoration: "none" }}
        >
          percent
        </a>
        <a
          href="#day-track"
          onClick={(e) => {
            e.preventDefault();
            scrollToRef(sectionTrackRef);
          }}
          style={{ color: "#bbb", textDecoration: "none" }}
        >
          track
        </a>
      </nav>

      <main className="home-page__main">
        <section
          id="year-grid"
          ref={sectionGridRef}
          className="home-page__section"
        >
          <div className="home-page__card">
            <DayOfYear />
          </div>
        </section>

        <section
          id="year-pct"
          ref={sectionPctRef}
          className="home-page__section"
        >
          <div className="home-page__card">
            <YearPct />
            <p className="home-page__description">
              Dividing the year into 100 pieces.
            </p>
          </div>
        </section>

        <section
          id="day-track"
          ref={sectionTrackRef}
          className="home-page__section"
        >
          <div className="home-page__card">
            <DayTrack />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
