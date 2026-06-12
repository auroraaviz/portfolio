import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Hero({ sky = {} }) {
    const [hoverBtn, setHoverBtn] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div style={{
            position: "relative",
            width: "100%",
            minHeight: "100dvh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <div style={{
                textAlign: "center",
                zIndex: 10,
                padding: "0 20px",
                marginTop: "-4vh",
            }}>
                {/* Eyebrow — más opaco y con sombra para que se lea siempre */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "11px",
                        letterSpacing: "5px",
                        color: "#e9d5ff",
                        marginBottom: "14px",
                        textTransform: "uppercase",
                        textShadow: "0 0 20px rgba(167,139,250,0.8), 0 1px 3px rgba(0,0,0,0.6)",
                    }}
                >
                    Desarrolladora Web
                </motion.p>

                {/* Nombre — sin cambios, ya funciona */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    style={{
                        fontSize: "clamp(3rem, 9vw, 6rem)",
                        fontWeight: "700",
                        color: "#ffffff",
                        lineHeight: 1.05,
                        marginBottom: "16px",
                        fontFamily: "'Syne', sans-serif",
                        letterSpacing: "-1px",
                        textShadow: "0 2px 30px rgba(167,139,250,0.5), 0 0 60px rgba(139,92,246,0.3)",
                    }}
                >
                    Aurora Ávila
                </motion.h1>

                {/* Subtítulo — blanco puro con sombra oscura para contraste universal */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    style={{
                        fontSize: "clamp(0.95rem, 2.2vw, 1.1rem)",
                        color: "#f5f0ff",
                        maxWidth: "480px",
                        margin: "0 auto 36px",
                        lineHeight: 1.6,
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: "300",
                        letterSpacing: "0.5px",
                        textShadow: "0 1px 4px rgba(0,0,0,0.55), 0 0 24px rgba(109,40,217,0.4)",
                    }}
                >
                    Frontend · Diseño UI/UX · Almería
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <a
                        href="#contacto"
                        onMouseEnter={() => setHoverBtn(true)}
                        onMouseLeave={() => setHoverBtn(false)}
                        style={{
                            display: "inline-block",
                            padding: "13px 36px",
                            borderRadius: "30px",
                            border: "1.5px solid rgba(233,213,255,0.65)",
                            color: "#f0e6ff",
                            background: hoverBtn
                                ? "rgba(139,92,246,0.5)"
                                : "rgba(109,40,217,0.25)",
                            backdropFilter: "blur(12px)",
                            textDecoration: "none",
                            fontWeight: "500",
                            fontSize: "13px",
                            fontFamily: "'Poppins', sans-serif",
                            letterSpacing: "2px",
                            textTransform: "uppercase",
                            transition: "all 0.3s ease",
                            boxShadow: hoverBtn
                                ? "0 4px 28px rgba(139,92,246,0.55), inset 0 1px 0 rgba(255,255,255,0.1)"
                                : "0 2px 16px rgba(109,40,217,0.3), inset 0 1px 0 rgba(255,255,255,0.07)",
                        }}
                    >
                        Contacto
                    </a>
                </motion.div>
            </div>

            {/* Indicador de scroll */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: scrolled ? 0 : 1 }}
                transition={{ delay: 1.8, duration: 0.6 }}
                style={{
                    position: "absolute",
                    bottom: "32px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "6px",
                    pointerEvents: "none",
                }}
            >
                <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "9px",
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    color: "rgba(233,213,255,0.55)",
                    textShadow: "0 0 10px rgba(167,139,250,0.5)",
                }}>scroll</span>
                <div style={{
                    width: "1px",
                    height: "32px",
                    background: "rgba(196,165,253,0.25)",
                    position: "relative",
                    overflow: "hidden",
                }}>
                    <motion.div
                        animate={{ y: ["-100%", "200%"] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                        style={{
                            position: "absolute",
                            top: 0, left: 0,
                            width: "100%",
                            height: "50%",
                            background: "rgba(233,213,255,0.9)",
                        }}
                    />
                </div>
            </motion.div>
        </div>
    );
}