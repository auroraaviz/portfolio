import { useState } from "react";
import { motion } from "framer-motion";
import { getTheme } from "../theme";

const contactLinks = [
    { glyph: "✉", label: "Email",    value: "auroraavilaizquierdo@gmail.com", href: "mailto:auroraavilaizquierdo@gmail.com" },
    { glyph: "◈", label: "LinkedIn", value: "aurora-avila-dev",               href: "https://linkedin.com/in/aurora-avila-dev" },
    { glyph: "⬡", label: "GitHub",   value: "auroraaviz",                     href: "https://github.com/auroraaviz" },
    { glyph: "◎", label: "Teléfono", value: "627 355 118",                    href: "tel:+34627355118" },
];

const glyphColors = {
    "✉": "#ec4899",
    "◈": "#6366f1",
    "⬡": "#2563eb",
    "◎": "#0d9488",
};

export default function Contacto({ sky = {} }) {
    const [hover, setHover] = useState(null);
    const currentMode = sky?.label || "mediodia";
    const theme = getTheme(currentMode);
    const isNight = currentMode === "noche";

    return (
        <section id="contacto" style={{
            position: "relative", width: "100%",
            padding: "80px 24px 120px",
            background: "transparent",
        }}>
            <div style={{ maxWidth: 720, margin: "0 auto" }}>

                {/* Título */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: "center", marginBottom: 56, isolation: "isolate" }}
                >
                    <h2 style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                        fontWeight: 700, margin: "0 0 12px 0",
                        letterSpacing: "2px",
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
                        color: theme.subtitleColor,
                    }}>
                        ✦ disponible inmediatamente · almería · híbrido o remoto ✦
                    </p>
                </motion.div>

                {/* Grid 2x2 */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: 16,
                }} className="contacto-grid">
                    {contactLinks.map((link, i) => {
                        const isHovered = hover === i;
                        const color = glyphColors[link.glyph];
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
                                {/* Glyph */}
                                <div style={{
                                    width: 48, height: 48, borderRadius: "50%", flexShrink: 0,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    background: `${color}18`,
                                    border: `1px solid ${color}35`,
                                    boxShadow: isHovered ? `0 0 16px 4px ${color}33` : "none",
                                    transition: "all 0.3s ease",
                                }}>
                                    <span style={{
                                        fontFamily: "'DM Mono', monospace",
                                        fontSize: 20, color,
                                        textShadow: isHovered ? `0 0 12px ${color}` : isNight ? `0 0 8px ${color}88` : "none",
                                        transition: "text-shadow 0.3s ease",
                                    }}>{link.glyph}</span>
                                </div>

                                {/* Info */}
                                <div>
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
                        textAlign: "center", marginTop: 56,
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "9px", letterSpacing: "2.5px",
                        textTransform: "uppercase",
                        color: theme.footerColor,
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
                }
                @media (max-width: 400px) {
                    .contacto-grid a > div:first-child {
                        width: 40px !important;
                        height: 40px !important;
                    }
                }
            `}</style>
        </section>
    );
}