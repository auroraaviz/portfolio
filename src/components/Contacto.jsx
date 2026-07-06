import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getTheme } from "../theme";

//array con todos los datos de contacto
const contactLinks = [
    { glyph: "✦", label: "Email",    value: "auroraavilaizquierdo@gmail.com", href: "mailto:auroraavilaizquierdo@gmail.com", color: "#6366f1" },
    { glyph: "✦", label: "LinkedIn", value: "aurora-avila-dev",               href: "https://linkedin.com/in/aurora-avila-dev", color: "#6366f1" },
    { glyph: "✦", label: "GitHub",   value: "auroraaviz",                     href: "https://github.com/auroraaviz", color: "#6366f1" },
    { glyph: "✦", label: "Teléfono", value: "627 355 118",                    href: "tel:+34627355118", color: "#6366f1"},
];

//array que almacena la posición de cada apartado
const STAR_ANCHORS = [
    { x: 7,  y: 30 },  // tarjeta 0 (Email)    — fila superior izq
    { x: 57, y: 30 },  // tarjeta 1 (LinkedIn) — fila superior dcha
    { x: 7,  y: 70 },  // tarjeta 2 (GitHub)   — fila inferior izq
    { x: 57, y: 70 },  // tarjeta 3 (Teléfono) — fila inferior dcha
];

// Conexiones entre tarjetas — forman una constelación de cuatro estrellas
const STAR_LINES = [[0,1],[0,2],[1,3],[2,3],[0,3]];

export default function Contacto({ sky = {} }) {
    const [hover, setHover] = useState(null);
    const currentMode = sky?.label || "mediodia";
    const theme = getTheme(currentMode);
    const isNight = currentMode === "noche";
    const isBright = currentMode === "amanecer" || currentMode === "atardecer";

    const lineColor = isNight
        ? "rgba(196,165,253,0.22)"
        : theme.lineCoreSoft || "rgba(99,102,241,0.18)";

        //contenedor principal de la sección de contacto
    return (
        <section id="contacto" style={{
            position: "relative", width: "100%",
            padding: "80px 24px 120px",
            background: "transparent",
            overflow: "hidden",
        }}>

            <div style={{ maxWidth: 720, margin: "0 auto", position: "relative" }}>

                {/* ── Constelación de fondo ── */}
                <svg
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        /* empieza justo donde empieza el grid (título ocupa ~132px + margen 56px) */
                        top: 188, left: 0, right: 0,
                        width: "100%", height: 220,
                        pointerEvents: "none", zIndex: 0, overflow: "visible",
                    }}
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <filter id="ct-glow" x="-30%" y="-30%" width="160%" height="160%">
                            <feGaussianBlur stdDeviation="1.2" result="b"/>
                            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                        </filter>
                    </defs>

                    {/* Pequeños puntos de estrella en cada ancla */}
                    {STAR_ANCHORS.map((pt, i) => {
                        const color = contactLinks[i].color;
                        return (
                            <motion.circle key={i}
                                cx={pt.x} cy={pt.y} r={isBright ? "1.3" : "0.9"}
                                fill={color}
                                opacity={isNight ? 0.55 : isBright ? 0.65 : 0.35}
                                filter={isNight ? "url(#ct-glow)" : "none"}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: isNight ? 0.55 : isBright ? 0.65 : 0.35, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                            />
                        );
                    })}
                </svg>

                {/* Título */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: "center", marginBottom: 56, isolation: "isolate", position: "relative", zIndex: 1 }}
                >
                <h2 style={{
                    fontFamily: "'Poppins',sans-serif",
                    fontSize: "clamp(1.8rem, 4vw, 2.0rem)",
                    fontWeight: 700, margin: "0 0 12px 0",
                    letterSpacing: "clamp(4px, 2vw, 20px)",
                    textTransform: "uppercase",
                }}>
                        <span
                            key={currentMode}
                            style={{
                                background: theme.titleGradient,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                display: "inline-block",
                            }}
                        >
                            Hablemos
                        </span>
                    </h2>
                    <p style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "10px", letterSpacing: "3px",
                        textTransform: "uppercase",
                        color: isBright ? "rgba(255,241,250,0.92)" : theme.subtitleColor,
                        textShadow: currentMode === "mediodia" ? "0 1px 6px rgba(255,255,255,0.85)" 
                        : isBright ? "0 1px 10px rgba(76,5,40,0.45)"
                        : "0 0 14px rgba(167,139,250,0.5)",
                    }}>
                        ✦ disponible inmediatamente · almería · híbrido o remoto ✦
                    </p>
                </motion.div>

                {/* Grid 2×2 — z-index 1 para estar sobre el SVG */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: 16,
                    position: "relative", zIndex: 1,
                }} className="contacto-grid">
                    {contactLinks.map((link, i) => {
                        const isHovered = hover === i;
                        const color = link.color;
                        return (
                            <motion.a
                                key={i}
                                href={link.href}
                                target={link.href.startsWith("http") ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                onMouseEnter={() => setHover(i)}
                                onMouseLeave={() => setHover(null)}
                                style={{
                                    display: "flex", alignItems: "center", gap: 18,
                                    padding: "1.1rem clamp(0.9rem, 4vw, 1.6rem)",
                                    borderRadius: 20,
                                    background: isHovered ? theme.cardBgHover : theme.cardBg,
                                    border: `1px solid ${isHovered ? color + "55" : theme.cardBorder}`,
                                    backdropFilter: "blur(12px)",
                                    textDecoration: "none",
                                    transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                                    transform: isHovered ? "translateY(-3px)" : "translateY(0)",
                                    boxShadow: isHovered
                                        ? `0 0 0 1px ${color}33, 0 12px 32px -8px ${color}40`
                                        : theme.cardShadow,
                                }}
                            >
                                {/* Icono-estrella */}
                                <div style={{
                                    position: "relative",
                                    width: 48, height: 48, borderRadius: "50%", flexShrink: 0,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    background: isBright ? `${color}28` : `${color}18`,
                                    border: `1px solid ${color}${isHovered ? "60" : "35"}`,
                                    boxShadow: isHovered ? `0 0 18px 5px ${color}35` : isNight ? `0 0 10px 2px ${color}22` : "none",
                                    transition: "all 0.3s ease",
                                }}>
                                    {/* halo pulsante — mismo lenguaje que el resto del sitio */}
                                    <motion.div
                                        animate={{
                                            opacity: isNight ? [0.12, 0.32, 0.12] : [0.06, 0.18, 0.06],
                                            scale: [0.8, 1.2, 0.8],
                                        }}
                                        transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                                        style={{
                                            position: "absolute", inset: -10,
                                            borderRadius: "50%",
                                            background: `radial-gradient(circle, ${color}55 0%, transparent 70%)`,
                                            pointerEvents: "none",
                                        }}
                                    />
                                    <span style={{
                                        position: "relative",
                                        fontFamily: "'DM Mono', monospace",
                                        fontSize: 20, color,
                                        textShadow: isHovered
                                            ? `0 0 14px ${color}`
                                            : isNight ? `0 0 8px ${color}88` : "none",
                                        transition: "text-shadow 0.3s ease",
                                    }}>{link.glyph}</span>
                                </div>

                                {/* Info */}
                                <div style={{ minWidth: 0 }}>
                                    <p style={{
                                        fontFamily: "'DM Mono', monospace",
                                        fontSize: "10px", letterSpacing: "2px",
                                        textTransform: "uppercase",
                                        color: theme.labelColor, margin: "0 0 5px",
                                    }}>{link.label}</p>
                                    <p style={{
                                        fontFamily: "'Poppins', sans-serif",
                                        fontSize: "0.88rem", fontWeight: 500,
                                        color: theme.valueColor, margin: 0,
                                        wordBreak: "break-all",
                                    }}>{link.value}</p>
                                </div>
                            </motion.a>
                        );
                    })}
                </div>

                {/* Footer */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    style={{
                        position: "relative", zIndex: 1,
                        textAlign: "center", marginTop: 56,
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "9px", letterSpacing: "2.5px",
                        textTransform: "uppercase",
                        color: isBright ? "rgba(255,241,250,0.85)" : theme.footerColor,
                        textShadow: currentMode === "mediodia" ? "0 1px 5px rgba(255,255,255,0.8)" 
                        : isBright ? "0 1px 8px rgba(76,5,40,0.4)"
                        : "0 0 12px rgba(167,139,250,0.4)",
                    }}
                >
                    Aurora Ávila Izquierdo · 2026 · hecho con React
                </motion.p>
            </div>

            <style>{`
                @media (max-width: 560px) {
                    .contacto-grid { grid-template-columns: 1fr !important; }
                }
                @media (max-width: 400px) {
                    .contacto-grid { gap: 10px !important; }
                    .contacto-grid a > div:first-child {
                        width: 40px !important;
                        height: 40px !important;
                    }
                }
            `}</style>
        </section>
    );
}