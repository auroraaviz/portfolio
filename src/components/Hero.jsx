import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SKY_ACCENTS = {
    amanecer:  "#f9a8d4",
    mediodia:  "#a5b4fc",
    atardecer: "#5eead4",
    noche:     "#c4b5fd",
};

export default function Hero({ sky = {}, onNameClick }) {
    const [hoverBtn, setHoverBtn]   = useState(false);
    const [scrolled, setScrolled]   = useState(false);
    const [hoverName, setHoverName] = useState(false);
    const [clicked, setClicked]     = useState(false);
    const accent = SKY_ACCENTS[sky?.label] || SKY_ACCENTS.noche;

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleNameClick = () => {
        if (clicked) return;
        setClicked(true);
        setTimeout(() => {
            onNameClick?.();
            setTimeout(() => setClicked(false), 300);
        }, 420);
    };

    return (
        <div style={{
            position: "relative", width: "100%", minHeight: "100dvh",
            display: "flex", alignItems: "center", justifyContent: "center",
        }}>
            <div style={{ textAlign: "center", zIndex: 10, padding: "0 20px", marginTop: "-4vh" }}>

                <motion.p
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    style={{
                        fontFamily: "'DM Mono',monospace", fontSize: "11px", letterSpacing: "5px",
                        color: "#e9d5ff", marginBottom: "14px", textTransform: "uppercase",
                        textShadow: `0 0 20px ${accent}cc,0 1px 3px rgba(0,0,0,0.6)`,
                    }}
                >
                    Desarrollo Web
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={clicked
                        ? { opacity: 0, scale: 1.18, filter: "blur(12px)" }
                        : { opacity: 1, y: 0, scale: hoverName ? 1.035 : 1,
                            filter: hoverName
                                ? [
                                    "blur(0px)",
                                    "drop-shadow(0 2px 10px rgba(196,165,253,0.6))",
                                    `drop-shadow(0 0 18px ${accent}88)`,
                                  ].join(" ")
                                : [
                                    "blur(0px)",
                                    "drop-shadow(0 2px 6px rgba(167,139,250,0.4))",
                                    `drop-shadow(0 0 10px ${accent}55)`,
                                  ].join(" ")
                          }
                    }
                    transition={clicked
                        ? { duration: 0.42, ease: [0.4, 0, 0.2, 1] }
                        : { opacity: { delay: 0.4, duration: 0.6 }, scale: { duration: 0.3 }, filter: { duration: 0.3 } }
                    }
                    onClick={handleNameClick}
                    onMouseEnter={() => setHoverName(true)}
                    onMouseLeave={() => setHoverName(false)}
                    style={{
                        fontSize: "clamp(3rem,9vw,6rem)",
                        lineHeight: 1.05, marginBottom: "10px",
                        fontFamily: "'Syncopate', sans-serif",
                        fontWeight: "400",
                        textTransform: "uppercase",
                        letterSpacing: hoverName ? "9px" : "3px",
                        cursor: "pointer", userSelect: "none",
                        transition: "letter-spacing 0.45s cubic-bezier(0.25,0.46,0.45,0.94)",
                    }}
                >
                    <span style={{
                        display: "inline-block",
                        backgroundImage: `linear-gradient(135deg, #ffffff 55%, ${accent} 130%)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        transform: "translateZ(0)",
                        willChange: "transform",
                        isolation: "isolate",
                    }}>
                        Aurora Ávila
                    </span>
                </motion.h1>

                <p
                    className={`hint-text${clicked ? " clicked" : ""}`}
                    style={{
                        fontFamily: "'DM Mono',monospace",
                        fontSize: "12px", letterSpacing: "4px",
                        textTransform: "uppercase", marginBottom: "clamp(12px, 3vw, 20px)",
                        pointerEvents: "none", transition: "all 0.4s ease",
                        color: sky?.label === "mediodia" ? "#2e1065" : "#f4f1ff",
                        textShadow: sky?.label === "mediodia"
                            ? "0 0 12px rgba(255,255,255,0.8)"
                            : "0 0 18px rgba(111,63,255,0.6)"
                    }}
                >
                    ✦ pulsa para conocerme ✦
                </p>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: clicked ? 0 : 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    style={{
                        fontSize: "clamp(0.95rem,2.2vw,1.1rem)", color: "#f5f0ff",
                        maxWidth: "480px", margin: "0 auto clamp(20px, 5vw, 36px)", lineHeight: 1.6,
                        fontFamily: "'Poppins',sans-serif", fontWeight: "300", letterSpacing: "0.5px",
                        textShadow: "0 1px 4px rgba(0,0,0,0.55),0 0 24px rgba(109,40,217,0.4)",
                    }}
                >
                    Frontend · Diseño UI/UX · Almería
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: clicked ? 0 : 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <a
                        href="#contacto"
                        onMouseEnter={() => setHoverBtn(true)}
                        onMouseLeave={() => setHoverBtn(false)}
                        style={{
                            display: "inline-flex", alignItems: "center", gap: "8px",
                            padding: "11px clamp(22px, 6vw, 38px)",
                            borderRadius: "40px",
                            border: hoverBtn ? `1px solid ${accent}88` : "1px solid rgba(233,213,255,0.28)",
                            background: hoverBtn
                                ? "rgba(139,92,246,0.22)"
                                : "rgba(139,92,246,0.08)",
                            backdropFilter: "blur(16px)",
                            color: "rgba(240,230,255,0.92)",
                            textDecoration: "none",
                            fontFamily: "'DM Mono',monospace",
                            fontSize: "11px", fontWeight: "500",
                            letterSpacing: "3px", textTransform: "uppercase",
                            transition: "all 0.4s ease",
                            boxShadow: hoverBtn
                                ? `0 0 32px ${accent}44, inset 0 1px 0 rgba(255,255,255,0.1)`
                                : "inset 0 1px 0 rgba(255,255,255,0.06)",
                        }}
                    >
                        contacto
                        <span style={{
                            opacity: hoverBtn ? 1 : 0.45,
                            transition: "opacity 0.4s ease, transform 0.4s ease",
                            transform: hoverBtn ? "translateX(3px)" : "translateX(0)",
                            display: "inline-block",
                            fontSize: "10px",
                        }}>✦</span>
                    </a>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: scrolled || clicked ? 0 : 1 }}
                transition={{ delay: 1.8, duration: 0.6 }}
                style={{ position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", pointerEvents: "none" }}
            >
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "9px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(233,213,255,0.55)" }}>scroll</span>
                <div style={{ width: "1px", height: "32px", background: "rgba(196,165,253,0.25)", position: "relative", overflow: "hidden" }}>
                    <motion.div animate={{ y: ["-100%","200%"] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "50%", background: accent }} />
                </div>
            </motion.div>
        </div>
    );
}