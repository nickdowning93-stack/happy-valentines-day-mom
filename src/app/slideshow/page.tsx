"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";

const PHOTOS = [
  { src: "/photos/1.jpg", caption: "Johnny & James" },
  { src: "/photos/2.jpg", caption: "Your favorite boys!" },
  { src: "/photos/3.jpg", caption: "So much love!" },
  { src: "/photos/4.jpg", caption: "Hugs and kisses!" },
  { src: "/photos/5.jpg", caption: "Double trouble!" },
  { src: "/photos/6.jpg", caption: "Our best smiles!" },
  { src: "/photos/7.jpg", caption: "Just for you, Nana!" },
  { src: "/photos/8.jpg", caption: "We love you!" },
  { src: "/photos/9.jpg", caption: "Partners in crime!" },
  { src: "/photos/10.jpg", caption: "All smiles for you!" },
  { src: "/photos/11.jpg", caption: "The dream team!" },
  { src: "/photos/12.jpg", caption: "Making memories!" },
  { src: "/photos/13.jpg", caption: "Two peas in a pod!" },
  { src: "/photos/14.jpg", caption: "Adventure time!" },
  { src: "/photos/15.jpg", caption: "Goofballs!" },
  { src: "/photos/16.jpg", caption: "Sending you love!" },
  { src: "/photos/17.jpg", caption: "Besties forever!" },
  { src: "/photos/18.jpg", caption: "Too cool for school!" },
  { src: "/photos/19.jpg", caption: "Brothers for life!" },
  { src: "/photos/20.jpg", caption: "Our hearts are yours!" },
  { src: "/photos/21.jpg", caption: "Living our best life!" },
  { src: "/photos/22.jpg", caption: "Cheese!" },
  { src: "/photos/23.jpg", caption: "Little heartbreakers!" },
  { src: "/photos/24.jpg", caption: "The boys are back!" },
  { src: "/photos/25.jpg", caption: "Nothing but love!" },
  { src: "/photos/26.jpg", caption: "Forever your boys!" },
  { src: "/photos/27.jpg", caption: "Smile for Nana!" },
  { src: "/photos/28.jpg", caption: "XOXO from us!" },
  { src: "/photos/29.jpg", caption: "Can't stop, won't stop!" },
  { src: "/photos/30.jpg", caption: "Love you to the moon!" },
];

const LOVE_MESSAGES = [
  "We love you so much! 💖",
  "Best Nana ever! 🥰",
  "XOXO forever! 💋",
  "You're the greatest! ❤️",
  "Hugs from your boys! 🤗",
  "Sending all our love! 💕",
  "You mean the world to us! 🌎💖",
  "Our #1 Nana! 🏆❤️",
  "You're our everything! 💝",
  "Can't love you more! 😘",
  "Kisses from the boys! 💋💋",
  "You make us smile! 😊❤️",
  "Nana = Superhero! 🦸‍♀️💖",
  "We're so lucky! 🍀❤️",
  "Love you always! 💕🥰",
];

// YouTube video ID for "Hate It or Love It" by The Game ft. 50 Cent
const YOUTUBE_VIDEO_ID = "BuMBmK5uksg";

function FloatingHearts() {
  const [hearts, setHearts] = useState<
    { id: number; left: number; size: number; delay: number; duration: number; emoji: string }[]
  >([]);

  useEffect(() => {
    const emojis = ["❤️", "💕", "💖", "💗", "💘", "💝", "💋", "😘"];
    const items = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 20 + 12,
      delay: Math.random() * 10,
      duration: Math.random() * 8 + 10,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setHearts(items);
  }, []);

  return (
    <>
      {hearts.map((h) => (
        <div
          key={h.id}
          className="floating-element"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
          }}
        >
          {h.emoji}
        </div>
      ))}
    </>
  );
}

function XOXOCorners() {
  return (
    <>
      {[
        { top: "20px", left: "20px" },
        { top: "20px", right: "20px" },
        { bottom: "20px", left: "20px" },
        { bottom: "20px", right: "20px" },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "fixed",
            ...pos,
            fontSize: "24px",
            color: "rgba(230, 57, 70, 0.4)",
            fontWeight: "bold",
            fontFamily: "Georgia, serif",
            pointerEvents: "none",
            zIndex: 5,
          }}
        >
          XOXO
        </div>
      ))}
    </>
  );
}

export default function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(-1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const photos = PHOTOS;

  const nextSlide = useCallback(() => {
    if (photos.length === 0) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => {
        const next = prev + 1;
        if (next >= photos.length) {
          setShowFinalMessage(true);
          setTimeout(() => {
            setShowFinalMessage(false);
            setCurrentSlide(0);
          }, 8000);
          return prev;
        }
        return next;
      });
      setIsTransitioning(false);
    }, 500);
  }, [photos.length]);

  const startSlideshow = () => {
    setCurrentSlide(0);
    setMusicStarted(true);
    intervalRef.current = setInterval(nextSlide, 4000);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (currentSlide === 0 && musicStarted && !showFinalMessage) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(nextSlide, 4000);
    }
  }, [currentSlide, musicStarted, showFinalMessage, nextSlide]);

  // Intro screen
  if (currentSlide === -1) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #fff0f3 0%, #ffd6e0 30%, #ffb3c6 60%, #ff8fab 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <FloatingHearts />
        <XOXOCorners />

        <div
          style={{
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "30px",
            textAlign: "center",
            padding: "0 20px",
          }}
        >
          <div className="bounce-in" style={{ fontSize: "60px" }}>
            🎵
          </div>
          <h1
            className="shimmer-text bounce-in"
            style={{
              fontSize: "clamp(32px, 7vw, 56px)",
              fontWeight: "bold",
              animationDelay: "0.3s",
            }}
          >
            Ready for a surprise?
          </h1>
          <p
            className="fade-in-up"
            style={{
              color: "#c1121f",
              fontSize: "20px",
              fontStyle: "italic",
              animationDelay: "0.6s",
            }}
          >
            🎶 &quot;Hate It or Love It&quot; - The Game ft. 50 Cent 🎶
          </p>
          <p
            className="fade-in-up"
            style={{
              color: "#e63946",
              fontSize: "14px",
              fontStyle: "italic",
              animationDelay: "0.8s",
              opacity: 0.7,
            }}
          >
            &quot;Hate it or love it, the underdog&apos;s on top... and Nana, you&apos;re always on top of our hearts!&quot;
          </p>

          <button
            onClick={startSlideshow}
            className="bounce-in"
            style={{
              animationDelay: "1s",
              background: "linear-gradient(135deg, #e63946, #ff69b4)",
              color: "white",
              border: "none",
              padding: "18px 50px",
              fontSize: "22px",
              fontWeight: "bold",
              borderRadius: "50px",
              cursor: "pointer",
              boxShadow:
                "0 4px 20px rgba(230, 57, 70, 0.4), 0 0 40px rgba(255, 105, 180, 0.2)",
              transition: "all 0.3s ease",
              fontFamily: "Georgia, serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
              e.currentTarget.style.boxShadow =
                "0 6px 30px rgba(230, 57, 70, 0.6), 0 0 60px rgba(255, 105, 180, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 4px 20px rgba(230, 57, 70, 0.4), 0 0 40px rgba(255, 105, 180, 0.2)";
            }}
          >
            ▶ Start the Show! 💖
          </button>

          <div
            className="fade-in-up"
            style={{
              fontSize: "18px",
              letterSpacing: "6px",
              color: "#e63946",
              fontWeight: "bold",
              animationDelay: "1.3s",
            }}
          >
            💋 XOXO 💋
          </div>
        </div>
      </div>
    );
  }

  // Final message screen
  if (showFinalMessage) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #c1121f 0%, #e63946 30%, #ff69b4 60%, #ffd6e0 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <FloatingHearts />
        <XOXOCorners />

        {/* Hidden YouTube player keeps playing */}
        <iframe
          ref={iframeRef}
          style={{ position: "absolute", width: 0, height: 0, border: "none", opacity: 0 }}
          src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&start=0`}
          allow="autoplay"
          title="music"
        />

        <div
          style={{
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "25px",
            textAlign: "center",
            padding: "0 20px",
          }}
        >
          <div className="bounce-in" style={{ fontSize: "80px" }}>
            💖
          </div>

          <h1
            className="bounce-in"
            style={{
              fontSize: "clamp(28px, 7vw, 52px)",
              fontWeight: "bold",
              color: "white",
              textShadow: "0 4px 20px rgba(0,0,0,0.3)",
              animationDelay: "0.3s",
              lineHeight: 1.3,
            }}
          >
            Happy Valentine&apos;s Day
          </h1>

          <h2
            className="bounce-in"
            style={{
              fontSize: "clamp(24px, 6vw, 44px)",
              fontWeight: "bold",
              color: "#fff0f3",
              textShadow: "0 2px 15px rgba(0,0,0,0.2)",
              animationDelay: "0.6s",
            }}
          >
            From Your Favorite Grandsons
          </h2>

          <div
            className="bounce-in"
            style={{
              fontSize: "clamp(36px, 8vw, 64px)",
              fontWeight: "bold",
              color: "white",
              textShadow: "0 4px 25px rgba(0,0,0,0.3)",
              animationDelay: "0.9s",
            }}
          >
            Johnny & James
          </div>

          <div
            className="fade-in-up"
            style={{
              fontSize: "40px",
              letterSpacing: "10px",
              animationDelay: "1.2s",
            }}
          >
            💋💋💋
          </div>

          <div
            className="fade-in-up"
            style={{
              fontSize: "28px",
              letterSpacing: "8px",
              color: "rgba(255,255,255,0.8)",
              fontWeight: "bold",
              animationDelay: "1.5s",
            }}
          >
            XOXOXOXO
          </div>

          <p
            className="fade-in-up"
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "16px",
              fontStyle: "italic",
              animationDelay: "2s",
            }}
          >
            We love you more than words can say! ❤️
          </p>
        </div>
      </div>
    );
  }

  // Main slideshow
  const currentPhoto = photos[currentSlide] || photos[0];
  const message = LOVE_MESSAGES[currentSlide % LOVE_MESSAGES.length];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #fff0f3 0%, #ffd6e0 30%, #ffb3c6 60%, #ff8fab 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "20px",
      }}
    >
      <FloatingHearts />
      <XOXOCorners />

      {/* Hidden YouTube player for music */}
      {musicStarted && (
        <iframe
          ref={iframeRef}
          style={{ position: "fixed", width: 0, height: 0, border: "none", opacity: 0, pointerEvents: "none" }}
          src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}`}
          allow="autoplay"
          title="music"
        />
      )}

      {/* Top bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          display: "flex",
          justifyContent: "center",
          padding: "15px 20px",
          background: "rgba(255, 240, 243, 0.9)",
          backdropFilter: "blur(10px)",
          borderBottom: "2px solid rgba(230, 57, 70, 0.2)",
        }}
      >
        <span
          className="shimmer-text"
          style={{ fontSize: "20px", fontWeight: "bold" }}
        >
          💕 Johnny & James&apos; Valentine&apos;s Slideshow 💕
        </span>
      </div>

      {/* Photo container */}
      <div
        style={{
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          maxWidth: "600px",
          width: "100%",
          marginTop: "60px",
        }}
      >
        {/* Love message */}
        <div
          key={`msg-${currentSlide}`}
          className="bounce-in"
          style={{
            fontSize: "clamp(18px, 4vw, 28px)",
            color: "#e63946",
            fontWeight: "bold",
            textAlign: "center",
            textShadow: "0 2px 10px rgba(230, 57, 70, 0.2)",
          }}
        >
          {message}
        </div>

        {/* Photo */}
        <div
          key={`photo-${currentSlide}`}
          className={`photo-frame ${isTransitioning ? "slide-exit" : "slide-enter"}`}
          style={{
            width: "100%",
            maxWidth: "500px",
            aspectRatio: "4/3",
            position: "relative",
            background: "#fff0f3",
          }}
        >
          <Image
            src={currentPhoto.src}
            alt={currentPhoto.caption}
            fill
            style={{ objectFit: "cover", borderRadius: "8px" }}
            sizes="(max-width: 600px) 100vw, 500px"
            priority
          />
        </div>

        {/* Caption */}
        <div
          key={`caption-${currentSlide}`}
          className="fade-in-up"
          style={{
            fontSize: "clamp(16px, 3vw, 24px)",
            color: "#c1121f",
            fontStyle: "italic",
            textAlign: "center",
          }}
        >
          {currentPhoto.caption}
        </div>

        {/* Slide progress bar */}
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            height: "6px",
            background: "rgba(230, 57, 70, 0.15)",
            borderRadius: "3px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${((currentSlide + 1) / photos.length) * 100}%`,
              height: "100%",
              background: "linear-gradient(90deg, #e63946, #ff69b4)",
              borderRadius: "3px",
              transition: "width 0.5s ease",
            }}
          />
        </div>

        {/* XOXO bottom */}
        <div
          style={{
            fontSize: "18px",
            letterSpacing: "8px",
            color: "rgba(230, 57, 70, 0.5)",
            fontWeight: "bold",
          }}
        >
          💋 XOXO 💋
        </div>

        {/* Manual controls */}
        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <button
            onClick={() => {
              if (intervalRef.current) clearInterval(intervalRef.current);
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentSlide((prev) =>
                  prev <= 0 ? photos.length - 1 : prev - 1
                );
                setIsTransitioning(false);
              }, 300);
              intervalRef.current = setInterval(nextSlide, 4000);
            }}
            style={{
              background: "rgba(230, 57, 70, 0.1)",
              border: "2px solid #e63946",
              color: "#e63946",
              padding: "10px 20px",
              borderRadius: "25px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              transition: "all 0.3s",
              fontFamily: "Georgia, serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#e63946";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(230, 57, 70, 0.1)";
              e.currentTarget.style.color = "#e63946";
            }}
          >
            ← Prev
          </button>

          <span style={{ color: "#e63946", fontWeight: "bold", fontSize: "14px" }}>
            {currentSlide + 1} / {photos.length}
          </span>

          <button
            onClick={() => {
              if (intervalRef.current) clearInterval(intervalRef.current);
              nextSlide();
              intervalRef.current = setInterval(nextSlide, 4000);
            }}
            style={{
              background: "rgba(230, 57, 70, 0.1)",
              border: "2px solid #e63946",
              color: "#e63946",
              padding: "10px 20px",
              borderRadius: "25px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              transition: "all 0.3s",
              fontFamily: "Georgia, serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#e63946";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(230, 57, 70, 0.1)";
              e.currentTarget.style.color = "#e63946";
            }}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
