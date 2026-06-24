import { useState } from "react";
import { motion } from "framer-motion";

const contactLinks = [
    {
        icon: "✉️",
        label: "Email",
        value: "auroraavilaizquierdo@gmail.com",
        href: "mailto:auroraavilaizquierdo@gmail.com",
    },
    {
        icon: "💼",
        label: "LinkedIn",
        value: "aurora-avila-dev",
        href: "https://linkedin.com/in/aurora-avila-dev",
    },
    {
        icon: "🐙",
        label: "GitHub",
        value: "auroraaviz",
        href: "https://github.com/auroraaviz",
    },
    {
        icon: "📞",
        label: "Teléfono",
        value: "627 355 118",
        href: "tel:+34627355118",
    },
];

export default function Contacto({ isNight = false }) {
    const [form, setForm]     = useState({ nombre: "", email: "", mensaje: "" });
    const [enviado, setEnviado] = useState(false);
    const [hover, setHover]   = useState(null);

    const cardBg     = isNight ? "rgba(5,1,18,0.6)"       : "rgba(250,246,255,0.5)";
    const cardBorder = isNight ? "rgba(167,139,250,0.18)"  : "rgba(139,92,246,0.2)";
    const labelColor = isNight ? "rgba(196,165,253,0.65)"  : "rgba(100,40,200,0.6)";
    const inputBg    = isNight ? "rgba(255,255,255,0.05)"  : "rgba(109,40,217,0.05)";
    const inputBorder= isNight ? "rgba(167,139,250,0.22)"  : "rgba(139,92,246,0.22)";
    const inputColor = isNight ? "rgba(233,213,255,0.9)"   : "rgba(30,5,80,0.9)";
    const valueColor = isNight ? "rgba(220,200,255,0.85)"  : "rgba(40,5,100,0.88)";

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    // Sin backend por ahora — simula el envío
    const handleSubmit = e => {
        e.preventDefault();
        if (!form.nombre || !form.email || !form.mensaje) return;
        setEnviado(true);
        setTimeout(() => { setEnviado(false); setForm({ nombre: "", email: "", mensaje: "" }); }, 4000);
    };

    return (
        <section id="contacto" style={{
            position: "relative",
            width: "100%",
            padding: "80px 24px 120px",
            maxWidth: 860,
            margin: "0 auto",
        }}>
            {/* Título */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ textAlign: "center", marginBottom: 52 }}
            >
                <p style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
                    fontWeight: "600",
                    color: "rgba(233,213,255,0.92)",
                    margin: 0, letterSpacing: "3px",
                    textTransform: "uppercase",
                    textShadow: "0 0 28px rgba(167,139,250,0.6), 0 1px 3px rgba(0,0,0,0.4)",
                }}>
                    Contacto
                </p>
                <p style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "0.85rem", fontWeight: "300",
                    color: isNight ? "rgba(196,165,253,0.6)" : "rgba(233,213,255,0.7)",
                    marginTop: 10, letterSpacing: "0.5px",
                    textShadow: "0 1px 4px rgba(0,0,0,0.4)",
                }}>
                    Disponible inmediatamente · Almería · híbrido o remoto
                </p>
            </motion.div>

            <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.4fr",
                gap: 24,
                alignItems: "start",
            }}
                className="contacto-grid"
            >
                {/* Links de contacto */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    style={{ display: "flex", flexDirection: "column", gap: 12 }}
                >
                    {contactLinks.map((link, i) => (
                        <motion.a
                            key={i}
                            href={link.href}
                            target={link.href.startsWith("http") ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            onMouseEnter={() => setHover(i)}
                            onMouseLeave={() => setHover(null)}
                            style={{
                                display: "flex", alignItems: "center", gap: 14,
                                background: hover === i
                                    ? (isNight ? "rgba(109,40,217,0.28)" : "rgba(139,92,246,0.12)")
                                    : cardBg,
                                border: `1px solid ${hover === i ? "rgba(167,139,250,0.4)" : cardBorder}`,
                                borderRadius: 14,
                                padding: "14px 16px",
                                backdropFilter: "blur(12px)",
                                textDecoration: "none",
                                transition: "all 0.25s ease",
                                boxShadow: hover === i ? "0 4px 20px rgba(109,40,217,0.2)" : "none",
                            }}
                        >
                            <span style={{ fontSize: 20, flexShrink: 0 }}>{link.icon}</span>
                            <div>
                                <p style={{
                                    fontFamily: "'DM Mono', monospace",
                                    fontSize: "9px", letterSpacing: "2px",
                                    textTransform: "uppercase",
                                    color: labelColor, margin: 0, marginBottom: 2,
                                }}>{link.label}</p>
                                <p style={{
                                    fontFamily: "'Poppins', sans-serif",
                                    fontSize: "0.75rem", fontWeight: "500",
                                    color: valueColor, margin: 0,
                                }}>{link.value}</p>
                            </div>
                        </motion.a>
                    ))}
                </motion.div>

                {/* Formulario */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    style={{
                        background: cardBg,
                        border: `1px solid ${cardBorder}`,
                        borderRadius: 18,
                        padding: "24px",
                        backdropFilter: "blur(14px)",
                    }}
                >
                    {enviado ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{
                                textAlign: "center",
                                padding: "32px 0",
                            }}
                        >
                            <p style={{ fontSize: 36, marginBottom: 12 }}>✨</p>
                            <p style={{
                                fontFamily: "'Syne', sans-serif",
                                fontSize: "1rem", fontWeight: "700",
                                color: isNight ? "#e9d5ff" : "rgba(40,5,100,0.95)",
                                marginBottom: 8,
                            }}>¡Mensaje enviado!</p>
                            <p style={{
                                fontFamily: "'Poppins', sans-serif",
                                fontSize: "0.78rem",
                                color: isNight ? "rgba(196,165,253,0.65)" : "rgba(80,30,160,0.65)",
                            }}>Me pondré en contacto contigo pronto.</p>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                            {/* Nombre */}
                            <div>
                                <label style={{
                                    display: "block",
                                    fontFamily: "'DM Mono', monospace",
                                    fontSize: "9px", letterSpacing: "2px",
                                    textTransform: "uppercase",
                                    color: labelColor, marginBottom: 6,
                                }}>Nombre</label>
                                <input
                                    name="nombre"
                                    value={form.nombre}
                                    onChange={handleChange}
                                    placeholder="Tu nombre"
                                    style={{
                                        width: "100%", padding: "10px 14px",
                                        borderRadius: 10,
                                        background: inputBg,
                                        border: `1px solid ${inputBorder}`,
                                        color: inputColor,
                                        fontFamily: "'Poppins', sans-serif",
                                        fontSize: "0.82rem",
                                        outline: "none",
                                        boxSizing: "border-box",
                                    }}
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label style={{
                                    display: "block",
                                    fontFamily: "'DM Mono', monospace",
                                    fontSize: "9px", letterSpacing: "2px",
                                    textTransform: "uppercase",
                                    color: labelColor, marginBottom: 6,
                                }}>Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="tu@email.com"
                                    style={{
                                        width: "100%", padding: "10px 14px",
                                        borderRadius: 10,
                                        background: inputBg,
                                        border: `1px solid ${inputBorder}`,
                                        color: inputColor,
                                        fontFamily: "'Poppins', sans-serif",
                                        fontSize: "0.82rem",
                                        outline: "none",
                                        boxSizing: "border-box",
                                    }}
                                />
                            </div>

                            {/* Mensaje */}
                            <div>
                                <label style={{
                                    display: "block",
                                    fontFamily: "'DM Mono', monospace",
                                    fontSize: "9px", letterSpacing: "2px",
                                    textTransform: "uppercase",
                                    color: labelColor, marginBottom: 6,
                                }}>Mensaje</label>
                                <textarea
                                    name="mensaje"
                                    value={form.mensaje}
                                    onChange={handleChange}
                                    placeholder="Cuéntame en qué puedo ayudarte..."
                                    rows={4}
                                    style={{
                                        width: "100%", padding: "10px 14px",
                                        borderRadius: 10,
                                        background: inputBg,
                                        border: `1px solid ${inputBorder}`,
                                        color: inputColor,
                                        fontFamily: "'Poppins', sans-serif",
                                        fontSize: "0.82rem",
                                        outline: "none",
                                        resize: "vertical",
                                        boxSizing: "border-box",
                                    }}
                                />
                            </div>

                            {/* Botón enviar */}
                            <button
                                type="submit"
                                style={{
                                    padding: "11px 0",
                                    borderRadius: 30,
                                    border: "1.5px solid rgba(233,213,255,0.5)",
                                    background: "rgba(109,40,217,0.35)",
                                    color: "#f0e6ff",
                                    fontFamily: "'Poppins', sans-serif",
                                    fontWeight: "500", fontSize: "12px",
                                    letterSpacing: "2px", textTransform: "uppercase",
                                    cursor: "pointer",
                                    transition: "all 0.3s ease",
                                    backdropFilter: "blur(8px)",
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = "rgba(139,92,246,0.55)";
                                    e.currentTarget.style.boxShadow  = "0 4px 24px rgba(139,92,246,0.45)";
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = "rgba(109,40,217,0.35)";
                                    e.currentTarget.style.boxShadow  = "none";
                                }}
                            >
                                Enviar mensaje
                            </button>

                            <p style={{
                                fontFamily: "'DM Mono', monospace",
                                fontSize: "8px", letterSpacing: "1.5px",
                                textTransform: "uppercase",
                                color: isNight ? "rgba(196,165,253,0.35)" : "rgba(109,40,217,0.35)",
                                textAlign: "center", margin: 0,
                            }}>
                                o escríbeme directamente a auroraavilaizquierdo@gmail.com
                            </p>
                        </form>
                    )}
                </motion.div>
            </div>

            {/* Footer mínimo */}
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                style={{
                    textAlign: "center", marginTop: 60,
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "9px", letterSpacing: "2.5px",
                    textTransform: "uppercase",
                    color: "rgba(196,165,253,0.3)",
                }}
            >
                Aurora Ávila Izquierdo · 2026 · hecho con React
            </motion.p>

            <style>{`
                @media (max-width: 640px) {
                    .contacto-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
                input::placeholder, textarea::placeholder {
                    color: rgba(167,139,250,0.35);
                }
            `}</style>
        </section>
    );
}