import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getTheme } from "../theme";

const grupos = [
    {
        categoria: "Frontend Development", glyph: "✦", color: "#6366f1",
        skills: [
            { nombre: "HTML5",           x: 12, y: 35 },
            { nombre: "CSS3",            x: 28, y: 18 },
            { nombre: "JavaScript ES6+", x: 48, y: 38 },
            { nombre: "Bootstrap 5",     x: 22, y: 68 },
            { nombre: "React.js",        x: 68, y: 22 },
            { nombre: "Responsive Web",  x: 82, y: 55 },
        ],
        lines: [[0,1],[1,2],[2,4],[4,5],[0,3],[3,2]],
    },
    {
        categoria: "Diseño & UI/UX", glyph: "✦", color: "#ec4899",
        skills: [
            { nombre: "Figma Studio",      x: 15, y: 40 },
            { nombre: "Adobe Illustrator", x: 38, y: 20 },
            { nombre: "UI/UX Design",      x: 70, y: 35 },
            { nombre: "Branding",          x: 48, y: 70 },
        ],
        lines: [[0,1],[1,2],[2,3],[0,3]],
    },
    {
        categoria: "Backend & Bases de Datos", glyph: "✦", color: "#2563eb",
        skills: [
            { nombre: "PHP Ecosystem",         x: 20, y: 50 },
            { nombre: "MySQL / DB",            x: 52, y: 25 },
            { nombre: "API REST Architecture", x: 78, y: 60 },
        ],
        lines: [[0,1],[1,2],[0,2]],
    },
    {
        categoria: "Herramientas & Entorno", glyph: "✦", color: "#0d9488",
        skills: [
            { nombre: "Git / GitHub",  x: 18, y: 30 },
            { nombre: "VS Code Suite", x: 48, y: 18 },
            { nombre: "Postman API",   x: 75, y: 42 },
            { nombre: "XAMPP Stack",   x: 35, y: 68 },
        ],
        lines: [[0,1],[1,2],[2,3],[0,3],[1,3]],
    },
];

function ShootingStar({ color }) {
    const [visible, setVisible] = useState(false);
    const [pos, setPos] = useState({ x: 0, y: 0, angle: 0 });

    useEffect(() => {
        let intervalId;
        const spawn = () => {
            setPos({
                x: Math.random() * 60 + 5,
                y: Math.random() * 50 + 5,
                angle: Math.random() * 15 + 20,
            });
            setVisible(true);
            setTimeout(() => setVisible(false), 800);
        };
        const timeoutId = setTimeout(() => {
            intervalId = setInterval(() => {
                if (Math.random() > 0.4) spawn();
            }, 6000);
        }, Math.random() * 2000 + 1000);
        return () => {
            clearTimeout(timeoutId);
            if (intervalId) clearInterval(intervalId);
        };
    }, []);

    if (!visible) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scaleX: 0, x: -20 }}
            animate={{ opacity: [0, 1, 0.6, 0], scaleX: [0, 1.5, 1], x: 40 }}
            transition={{ duration: 0.7, ease: "linear" }}
            style={{
                position: "absolute", left: `${pos.x}%`, top: `${pos.y}%`,
                width: 110, height: 2, transformOrigin: "left center",
                transform: `rotate(${pos.angle}deg)`,
                background: `linear-gradient(to right, #fff, ${color}, transparent)`,
                pointerEvents: "none", zIndex: 10, borderRadius: "50%",
                filter: "drop-shadow(0 0 4px #fff)",
            }}
        />
    );
}

// Calcula dónde abrir el tooltip para que no se salga del canvas.
// x e y son la posición del nodo en % dentro del canvas.
function tooltipPosition(x, y) {
    // Vertical: si el nodo está en el tercio superior, el tooltip va abajo
    const vertical   = y < 30 ? "bottom" : "top";
    // Horizontal: centra por defecto; si el nodo está muy a la derecha, ancla a la derecha
    const horizontal = x > 70 ? "right" : x < 30 ? "left" : "center";
    return { vertical, horizontal };
}

function ConstellationGroup({ grupo, gi, currentMode }) {
    const [hoveredStar, setHoveredStar] = useState(null);

    const base = getTheme(currentMode);
    const theme = useMemo(() => ({
        canvasBg:       base.cardBg,
        canvasBgHover:  base.cardBgHover,
        canvasBorder:   base.cardBorder,
        headerText:     base.headerText,
        labelText:      base.labelColor,
        lineColor:      `${grupo.color}${base.dark ? "20" : "30"}`,
        lineColorMain:  `${grupo.color}${base.dark ? "cc" : "95"}`,
        tooltipBg:      base.tooltipBg,
        tooltipText:    base.tooltipText,
        boxShadow:      base.canvasBoxShadow,
        boxShadowHover: `0 0 0 1px ${grupo.color}44, ${base.canvasBoxShadow}`,
    }), [grupo.color, base]);

    const isNight = currentMode === "noche";

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ delay: gi * 0.12, duration: 0.7, ease: "easeOut" }}
            style={{ marginBottom: 40 }}
        >
            {/* Cabecera */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, paddingLeft: 4 }}>
                <span style={{
                    fontFamily: "'DM Mono', monospace", fontSize: 20, color: grupo.color,
                    textShadow: isNight ? `0 0 14px ${grupo.color}` : "none",
                }}>{grupo.glyph}</span>

                <span style={{
                    fontFamily: "'Poppins', sans-serif", fontSize: "1rem", fontWeight: 700,
                    color: theme.headerText, letterSpacing: "0.8px",
                    textShadow: isNight ? "0 0 20px rgba(167,139,250,0.4)"
                     : currentMode === "amanecer" ? "0 1px 8px rgba(76,5,40,0.4)"
                     : "none",
                }}>{grupo.categoria}</span>

                <div style={{
                    flex: 1, height: 1, marginLeft: 12,
                    background: `linear-gradient(to right, ${grupo.color}50, transparent)`,
                }} />
            </div>

            {/* Panel */}
            <div
                style={{
                    position: "relative", width: "100%",
                    height: "clamp(200px, 28vw, 240px)",
                    borderRadius: 24,
                    background: theme.canvasBg,
                    border: `1px solid ${theme.canvasBorder}`,
                    boxShadow: theme.boxShadow,
                    backdropFilter: "blur(12px)",
                    isolation: "isolate",
                    overflow: "hidden",
                    transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.border = `1px solid ${grupo.color}50`;
                    e.currentTarget.style.background = theme.canvasBgHover;
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = theme.boxShadowHover;
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.border = `1px solid ${theme.canvasBorder}`;
                    e.currentTarget.style.background = theme.canvasBg;
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = theme.boxShadow;
                }}
            >
                {isNight && <ShootingStar color={grupo.color} />}

                {/* Líneas SVG */}
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none", zIndex: 1 }}>
                    <defs>
                        <filter id={`glow-${gi}`} x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="blur"/>
                            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                        </filter>
                    </defs>
                    {grupo.lines.map(([a, b], li) => {
                        const pa = grupo.skills[a], pb = grupo.skills[b];
                        if (!pa || !pb) return null;
                        return (
                            <g key={li}>
                                <motion.line
                                    x1={`${pa.x}%`} y1={`${pa.y}%`}
                                    x2={`${pb.x}%`} y2={`${pb.y}%`}
                                    stroke={theme.lineColor} strokeWidth="3.5" strokeLinecap="round"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    transition={{ delay: gi * 0.1 + li * 0.05 + 0.3, duration: 0.6 }}
                                />
                                <motion.line
                                    x1={`${pa.x}%`} y1={`${pa.y}%`}
                                    x2={`${pb.x}%`} y2={`${pb.y}%`}
                                    stroke={theme.lineColorMain} strokeWidth="1.2"
                                    strokeDasharray="4 5" strokeLinecap="round"
                                    filter={isNight ? `url(#glow-${gi})` : "none"}
                                    initial={{ opacity: 0, pathLength: 0 }}
                                    animate={{ opacity: 1, pathLength: 1 }}
                                    transition={{ delay: gi * 0.1 + li * 0.04, duration: 1, ease: "easeOut" }}
                                />
                            </g>
                        );
                    })}
                </svg>

                {/* Estrellas */}
                {grupo.skills.map((skill, si) => {
                    const isHovered = hoveredStar === si;
                    const { vertical, horizontal } = tooltipPosition(skill.x, skill.y);

                    // Posición vertical del tooltip
                    const tipTop    = vertical === "bottom" ? "calc(100% + 14px)" : "auto";
                    const tipBottom = vertical === "top"    ? "calc(100% + 14px)" : "auto";

                    // Posición horizontal del tooltip
                    // "center" → centrado sobre el nodo (transform -50%)
                    // "left"   → anclado a la izquierda del nodo, no se sale por la izquierda
                    // "right"  → anclado a la derecha del nodo, no se sale por la derecha
                    const tipStyle = (() => {
                        if (horizontal === "left")  return { left: 0,    transform: "none" };
                        if (horizontal === "right") return { right: 0,   transform: "none", left: "auto" };
                        return { left: "50%", transform: "translateX(-50%)" };
                    })();

                    // La flecha del tooltip apunta siempre hacia el nodo
                    const arrowStyle = (() => {
                        const base = {
                            position: "absolute", width: 8, height: 8,
                            background: theme.tooltipBg,
                            borderRight: `1px solid ${grupo.color}55`,
                            transform: "rotate(45deg)",
                        };
                        if (vertical === "bottom") {
                            // tooltip está abajo → flecha arriba
                            return { ...base, top: -5, borderTop: `1px solid ${grupo.color}55`,
                                borderRight: `1px solid ${grupo.color}55`, borderBottom: "none", borderLeft: "none",
                                left: horizontal === "left" ? 14 : horizontal === "right" ? "auto" : "50%",
                                right: horizontal === "right" ? 14 : "auto",
                                marginLeft: horizontal === "center" ? -4 : 0,
                            };
                        }
                        // tooltip está arriba → flecha abajo
                        return { ...base, bottom: -5, borderBottom: `1px solid ${grupo.color}55`,
                            borderRight: `1px solid ${grupo.color}55`, borderTop: "none", borderLeft: "none",
                            left: horizontal === "left" ? 14 : horizontal === "right" ? "auto" : "50%",
                            right: horizontal === "right" ? 14 : "auto",
                            marginLeft: horizontal === "center" ? -4 : 0,
                        };
                    })();

                    return (
                        <div
                            key={si}
                            style={{
                                position: "absolute", left: `${skill.x}%`, top: `${skill.y}%`,
                                transform: "translate(-50%, -50%)", zIndex: isHovered ? 20 : 5,
                            }}
                            onMouseEnter={() => setHoveredStar(si)}
                            onMouseLeave={() => setHoveredStar(null)}
                        >
                            {/* Halo pulsante */}
                            <motion.div
                                animate={{
                                    opacity: isNight
                                        ? (isHovered ? [0.5, 0.9, 0.5] : [0.15, 0.45, 0.15])
                                        : (isHovered ? [0.3, 0.6, 0.3] : [0.08, 0.25, 0.08]),
                                    scale: isHovered ? [1.2, 1.9, 1.2] : [0.9, 1.4, 0.9],
                                }}
                                transition={{ duration: isHovered ? 1.4 : 3.2, repeat: Infinity, ease: "easeInOut", delay: si * 0.2 }}
                                style={{
                                    position: "absolute", top: "50%", left: "50%",
                                    width: 44, height: 44, transform: "translate(-50%,-50%)",
                                    borderRadius: "50%",
                                    background: `radial-gradient(circle, ${grupo.color}55 0%, transparent 85%)`,
                                    pointerEvents: "none",
                                }}
                            />

                            {/* Nodo */}
                            <motion.div
                                animate={{
                                    scale: isHovered ? 1.8 : 1,
                                    boxShadow: isHovered
                                        ? `0 0 18px 6px ${grupo.color}, 0 0 6px 2px #fff`
                                        : isNight
                                            ? `0 0 10px 3px ${grupo.color}bb, 0 0 4px 1px #fff`
                                            : `0 2px 5px ${grupo.color}40, 0 0 2px #fff`,
                                }}
                                transition={{ duration: 0.22, ease: "easeOut" }}
                                style={{
                                    position: "relative",
                                    width: 10, height: 10, borderRadius: "50%",
                                    background: `radial-gradient(circle at 35% 35%, #ffffff 40%, ${grupo.color})`,
                                    cursor: "default", zIndex: 2,
                                }}
                            />

                            {/* Tooltip — reposicionado según x,y del nodo */}
                            <AnimatePresence>
                                {isHovered && (
                                    <motion.div
                                        initial={{ opacity: 0, y: vertical === "bottom" ? -4 : 4, scale: 0.85 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: vertical === "bottom" ? -4 : 4, scale: 0.85 }}
                                        transition={{ duration: 0.16 }}
                                        style={{
                                            position: "absolute",
                                            top: tipTop, bottom: tipBottom,
                                            ...tipStyle,
                                            whiteSpace: "nowrap",
                                            background: theme.tooltipBg,
                                            border: `1px solid ${grupo.color}55`,
                                            borderRadius: 10,
                                            padding: "5px 12px",
                                            backdropFilter: "blur(16px)",
                                            boxShadow: `0 4px 20px -4px ${grupo.color}50`,
                                            pointerEvents: "none", zIndex: 30,
                                        }}
                                    >
                                        <div style={arrowStyle} />
                                        <span style={{
                                            fontFamily: "'Poppins', sans-serif",
                                            fontSize: "0.8rem", fontWeight: 600,
                                            color: theme.tooltipText, letterSpacing: "0.2px",
                                        }}>{skill.nombre}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Etiqueta fija */}
                            <span style={{
                                position: "absolute", top: "calc(100% + 8px)", left: "50%",
                                transform: "translateX(-50%)",
                                fontFamily: "'Poppins', sans-serif", fontSize: "clamp(9px, 2.2vw, 11px)",
                                fontWeight: 600, letterSpacing: "0.2px",
                                color: theme.labelText,
                                whiteSpace: "nowrap", pointerEvents: "none",
                            }}>{skill.nombre}</span>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
}

export default function Habilidades({ sky = {} }) {
    const currentMode = sky?.label || "mediodia";
    const isNight = currentMode === "noche";
    const theme = getTheme(currentMode);
    const isBright = currentMode === "amanecer" || currentMode === "atardecer";

    return (
        <section id="habilidades" style={{
            position: "relative", width: "100%", padding: "120px 24px",
            background: "transparent", overflow: "hidden",
            isolation: "isolate",
        }}>
            <div style={{ maxWidth: 960, margin: "0 auto" }}>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: "center", marginBottom: 70, isolation: "isolate" }}
                >
                    <h2 style={{
                        fontFamily: "'Poppins',sans-serif",
                        fontSize: "clamp(1.8rem, 4vw, 2.0rem)",
                        fontWeight: 700, margin: "0 0 14px 0",
                        letterSpacing: "clamp(4px, 2vw, 20px)",
                        textTransform: "uppercase",
            }}>
                        <span key={currentMode} style={{
                            background: theme.titleGradient,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            display: "inline-block",
                        }}>
                            Mis habilidades técnicas
                        </span>
                    </h2>
                </motion.div>

                <div
                    style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "32px 40px" }}
                    className="habilidades-grid"
                >
                    {grupos.map((grupo, gi) => (
                        <ConstellationGroup
                            key={grupo.categoria}
                            grupo={grupo}
                            gi={gi}
                            currentMode={currentMode}
                        />
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    style={{
                        textAlign: "center", marginTop: 54,
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase",
                        color: isBright ? "rgba(255,241,250,0.92)" : theme.subtitleColor,
                        textShadow: currentMode === "mediodia" ? "0 1px 6px rgba(255,255,255,0.85)" 
                        : isBright ? "0 1px 10px rgba(76,5,40,0.45)"
                        : "0 0 14px rgba(167,139,250,0.5)",
                    }}
                >
                    ✦ explora las estrellas para descubrir detalles · learning everyday ✦
                </motion.p>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .habilidades-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
                }
                @media (max-width: 380px) {
                    .habilidades-grid { gap: 14px !important; }
                }
            `}</style>
        </section>
    );
}