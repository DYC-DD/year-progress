import React, { useState, useRef } from "react";
import { TiChevronLeftOutline, TiChevronRightOutline } from "react-icons/ti";
import "../styles/List.css";

const MAX_VISIBILITY = 4;
const SWIPE_THRESHOLD = 50;

const Card = ({ title, content }) => (
  <div className="card">
    <h2>{title}</h2>
    <p>{content}</p>
  </div>
);

const cardsData = [
  { title: "Card 1", content: "This is the content for card 1." },
  { title: "Card 2", content: "This is the content for card 2." },
  { title: "Card 3", content: "This is the content for card 3." },
  { title: "Card 4", content: "This is the content for card 4." },
  { title: "Card 5", content: "This is the content for card 5." },
  { title: "Card 6", content: "This is the content for card 6." },
  { title: "Card 7", content: "This is the content for card 7." },
];

const Carousel = () => {
  const [active, setActive] = useState(0);

  const touchStartX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchEndX - touchStartX.current;

    if (Math.abs(diffX) > SWIPE_THRESHOLD) {
      if (diffX < 0 && active < cardsData.length - 1) {
        setActive((prev) => prev + 1);
      } else if (diffX > 0 && active > 0) {
        setActive((prev) => prev - 1);
      }
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="carousel"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {active > 0 && (
        <button
          className="nav left desktop-only"
          onClick={() => setActive((prev) => prev - 1)}
        >
          <TiChevronLeftOutline />
        </button>
      )}

      {cardsData.map((card, i) => (
        <div
          key={i}
          className="card-container"
          style={{
            "--active": i === active ? 1 : 0,
            "--offset": (active - i) / 3,
            "--direction": Math.sign(active - i),
            "--abs-offset": Math.abs(active - i) / 3,
            pointerEvents: active === i ? "auto" : "none",
            opacity: Math.abs(active - i) >= MAX_VISIBILITY ? "0" : "1",
            display: Math.abs(active - i) > MAX_VISIBILITY ? "none" : "block",
          }}
        >
          <Card title={card.title} content={card.content} />
        </div>
      ))}

      {active < cardsData.length - 1 && (
        <button
          className="nav right desktop-only"
          onClick={() => setActive((prev) => prev + 1)}
        >
          <TiChevronRightOutline />
        </button>
      )}
    </div>
  );
};

export default Carousel;
