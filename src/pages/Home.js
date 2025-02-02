import React, { useEffect, useState, useRef } from "react";
import "../styles/Home.css";
import ProgressBar from "./ProgressBar";
import ProgressBar2 from "./ProgressBar2";

const Home = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState(null);
  const [footerText, setFooterText] = useState("Time is money.");

  const texts = [
    `" World "`,
    `" 世界 "`,
    `" せかい "`,
    `" 세계 "`,
    `" عالم "`,
    `" Мир "`,
    `" Welt "`,
    `" Mundo "`,
    `" Monde "`,
    `" दुनिया "`,
    `" โลก "`,
    `" Thế giới "`,
    `" Dunia "`,
    `" Wereld "`,
    `" Värld "`,
    `" Świat "`,
    `" Dünya "`,
    `" Κόσμος "`,
    `" Svět "`,
    `" Maailma "`,
    `" Verden "`,
    `" Világ "`,
  ];

  const footerTexts = [
    "Time is money.",
    "Time waits for no one.",
    "Lost time is never found again.",
    "Make time, not excuses.!",
    "Time is more valuable than money.",
    "Time is life.",
    "Nothing is more valuable than time.",
    "Time once lost, is lost forever.",
    "Time is wealth.",
    "Every moment is a fresh beginning.",
    "Wasting time is stealing from yourself.",
  ];

  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);

  useEffect(() => {
    const handleTyping = () => {
      const currentText = texts[textIndex];

      if (!isDeleting) {
        setDisplayedText((prev) => currentText.substring(0, prev.length + 1));
        if (displayedText === currentText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayedText((prev) => currentText.substring(0, prev.length - 1));
        if (displayedText === "") {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? 50 : 150);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, textIndex, texts]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const randomIndex = Math.floor(Math.random() * footerTexts.length);
            setFooterText(footerTexts[randomIndex]);
          }
          document.body.classList.toggle("footer-pull", entry.isIntersecting);
        });
      },
      { threshold: 0.5 }
    );

    const footer = document.querySelector("#footer");
    if (footer) observer.observe(footer);

    return () => {
      if (footer) observer.unobserve(footer);
    };
  }, []);

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
    if (
      !section1Ref.current ||
      !section2Ref.current ||
      !section3Ref.current ||
      !section4Ref.current
    )
      return;

    const scrollY = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;

    const lastSectionOffset = section4Ref.current.offsetTop;

    if (scrollY > lastSectionOffset + 50) {
      return;
    }

    const sections = [
      section1Ref.current.offsetTop,
      section2Ref.current.offsetTop,
      section3Ref.current.offsetTop,
      section4Ref.current.offsetTop,
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
    <div className="home noto-sans-sc">
      <main>
        <section ref={section1Ref} className="snap-section">
          <h1 className="typing-text">{displayedText}</h1>
        </section>

        <section ref={section2Ref} className="snap-section">
          <div className="card-content">
            <ProgressBar />
          </div>
        </section>

        <section ref={section3Ref} className="snap-section">
          <div className="card-content">
            <ProgressBar2 />
          </div>
        </section>

        <section ref={section4Ref} className="snap-section">
          <div className="text-content">
            <p>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </p>
          </div>
        </section>
      </main>
      <footer id="footer">{footerText}</footer>
    </div>
  );
};

export default Home;
