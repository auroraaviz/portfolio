import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
    {
        id: 0, number: "01", name: "Turistea",
        description: "Agencia de viajes fullstack desarrollada en equipo durante las prácticas en Zaitec. Diseño visual, branding y logotipo de autoría propia.",
        stack: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
        github: "https://github.com/auroraaviz/turistea-agencia-viajes",
        demo: null, tag: "Proyecto estrella",
        x: 15, y: 20, cloudSize: 160, starX: 18, starY: 22,
    },
    {
        id: 1, number: "02", name: "Superverde",
        description: "Supermercado vegano online con diseño visual propio desde cero. Identidad de marca, banners y maquetación completa.",
        stack: ["HTML5", "CSS3", "JavaScript"],
        github: "https://github.com/auroraaviz/superverde_SupermercadoVegano",
        demo: "https://auroraaviz.github.io/superverde_SupermercadoVegano/",
        tag: "Diseño propio",
        x: 52, y: 14, cloudSize: 145, starX: 55, starY: 18,
    },
    {
        id: 2, number: "03", name: "DavanteDent",
        description: "Gestión de citas para clínica dental. CRUD completo con JavaScript vanilla, almacenamiento en cookies, sin frameworks ni dependencias.",
        stack: ["JavaScript", "HTML5", "CSS3"],
        github: "https://github.com/auroraaviz/DavanteDent---Gesti-n-de-citas",
        demo: "https://auroraaviz.github.io/DavanteDent---Gesti-n-de-citas/",
        tag: "Demo en vivo",
        x: 78, y: 38, cloudSize: 135, starX: 78, starY: 42,
    },
    {
        id: 3, number: "04", name: "Tienda Zapatillas",
        description: "E-commerce de zapatillas con catálogo, carrito y gestión de pedidos. Backend en PHP con base de datos MySQL.",
        stack: ["PHP", "MySQL", "HTML5", "CSS3"],
        github: "https://github.com/auroraaviz/tienda-Zapatillas-",
        demo: null, tag: "Fullstack",
        x: 33, y: 58, cloudSize: 138, starX: 35, starY: 62,
    },
    {
        id: 4, number: "05", name: "Menta",
        description: "Web corporativa estática para empresa ficticia de diseño gráfico. Primer proyecto académico — maquetación HTML y CSS desde cero.",
        stack: ["HTML5", "CSS3"],
        github: "https://github.com/auroraaviz/pagina-web-ficticia_MENTA",
        demo: null, tag: "Maquetación",
        x: 65, y: 65, cloudSize: 125, starX: 67, starY: 70,
    },
];

const constellationLines = [[0,1],[1,2],[2,4],[0,3],[3,4],[1,3]];

// Pastillas sobre fondo oscuro (panel de estrella) — colores sólidos y visibles
const stackColorsDark = {
    "PHP":        { bg: "rgba(139,92,246,0.45)",  border: "rgba(167,139,250,0.7)",  text: "#ede9fe" },
    "MySQL":      { bg: "rgba(37,99,235,0.45)",   border: "rgba(96,165,250,0.7)",   text: "#dbeafe" },
    "JavaScript": { bg: "rgba(180,130,0,0.45)",   border: "rgba(250,204,21,0.65)",  text: "#fef08a" },
    "Bootstrap":  { bg: "rgba(124,58,237,0.4)",   border: "rgba(196,165,253,0.65)", text: "#ede9fe" },
    "HTML5":      { bg: "rgba(194,65,12,0.45)",   border: "rgba(251,146,60,0.65)",  text: "#fed7aa" },
    "CSS3":       { bg: "rgba(3,105,161,0.45)",   border: "rgba(56,189,248,0.65)",  text: "#bae6fd" },
};

// Pastillas sobre fondo claro (nube expandida día) — texto oscuro, fondo tintado
const stackColorsLight = {
    "PHP":        { bg: "rgba(139,92,246,0.18)",  border: "rgba(109,40,217,0.5)",   text: "#3b0764" },
    "MySQL":      { bg: "rgba(37,99,235,0.15)",   border: "rgba(37,99,235,0.5)",    text: "#1e3a8a" },
    "JavaScript": { bg: "rgba(161,98,7,0.15)",    border: "rgba(161,98,7,0.45)",    text: "#713f12" },
    "Bootstrap":  { bg: "rgba(124,58,237,0.15)",  border: "rgba(109,40,217,0.45)",  text: "#4c1d95" },
    "HTML5":      { bg: "rgba(194,65,12,0.15)",   border: "rgba(194,65,12,0.45)",   text: "#7c2d12" },
    "CSS3":       { bg: "rgba(3,105,161,0.15)",   border: "rgba(3,105,161,0.45)",   text: "#0c4a6e" },
};

function ShootingStar() {
    const [visible, setVisible] = useState(false);
    const [pos, setPos] = useState({ x: 0, y: 0, angle: 0 });

    useEffect(() => {
        const spawn = () => {
            setPos({
                x: Math.random() * 75 + 5,
                y: Math.random() * 35 + 3,
                angle: Math.random() * 20 + 18,
            });
            setVisible(true);
            setTimeout(() => setVisible(false), 750);
        };
        const initial = setTimeout(() => {
            spawn();
            const interval = setInterval(() => {
                if (Math.random() > 0.35) spawn();
            }, Math.random() * 9000 + 7000);
            return () => clearInterval(interval);
        }, Math.random() * 4000 + 2000);
        return () => clearTimeout(initial);
    }, []);

    if (!visible) return null;
    return (
        <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: [0, 1, 0.6, 0], scaleX: [0, 1, 1] }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            style={{
                position: "absolute",
                left: `${pos.x}%`, top: `${pos.y}%`,
                width: 100, height: 1.5,
                transformOrigin: "left center",
                transform: `rotate(${pos.angle}deg)`,
                background: "linear-gradient(to right, rgba(255,255,255,0.9), rgba(196,165,253,0.7), transparent)",
                pointerEvents: "none", zIndex: 10,
                filter: "blur(0.3px)",
                borderRadius: "1px",
            }}
        />
    );
}

function StackPill({ tech, dark }) {
    const palette = dark ? stackColorsDark : stackColorsLight;
    const c = palette[tech] || (dark
        ? { bg: "rgba(255,255,255,0.15)", border: "rgba(255,255,255,0.3)", text: "#f0e6ff" }
        : { bg: "rgba(0,0,0,0.08)",       border: "rgba(0,0,0,0.2)",       text: "#1a0040" });
    return (
        <span style={{
            padding: "3px 9px",
            borderRadius: "20px",
            background: c.bg,
            border: `1px solid ${c.border}`,
            fontFamily: "'DM Mono', monospace",
            fontSize: "9.5px",
            fontWeight: "500",
            color: c.text,
            letterSpacing: "0.3px",
            display: "inline-block",
        }}>{tech}</span>
    );
}

function ProjectContent({ project, dark = true }) {
    const textMain = dark ? "#ffffff"              : "rgba(20,5,50,0.95)";
    const textNum  = dark ? "rgba(196,165,253,0.6)" : "rgba(109,40,217,0.5)";
    const textSub  = dark ? "rgba(233,213,255,0.8)" : "rgba(50,10,90,0.8)";
    const btnBg    = dark ? "rgba(109,40,217,0.3)"  : "rgba(109,40,217,0.1)";
    const btnBorder= dark ? "rgba(167,139,250,0.5)" : "rgba(109,40,217,0.4)";
    const btnText  = dark ? "#e9d5ff"              : "#3b0764";
    const demoBg   = dark ? "rgba(139,92,246,0.45)" : "rgba(109,40,217,0.18)";

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: textNum }}>
                    {project.number}
                </span>
                <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.05rem", fontWeight: "700", color: textMain, lineHeight: 1.2 }}>
                    {project.name}
                </span>
            </div>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.72rem", color: textSub, lineHeight: 1.65, margin: 0 }}>
                {project.description}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                {project.stack.map(tech => <StackPill key={tech} tech={tech} dark={dark} />)}
            </div>
            <div style={{ display: "flex", gap: "8px", marginTop: "2px" }}>
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    style={{
                        flex: 1, textAlign: "center", padding: "7px 0", borderRadius: "8px",
                        border: `1px solid ${btnBorder}`, background: btnBg, color: btnText,
                        textDecoration: "none", fontFamily: "'Poppins', sans-serif",
                        fontSize: "11px", fontWeight: "500",
                    }}>GitHub</a>
                {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        style={{
                            flex: 1, textAlign: "center", padding: "7px 0", borderRadius: "8px",
                            border: `1px solid ${btnBorder}`, background: demoBg, color: btnText,
                            textDecoration: "none", fontFamily: "'Poppins', sans-serif",
                            fontSize: "11px", fontWeight: "500",
                        }}>Demo →</a>
                )}
            </div>
        </div>
    );
}

// Nube con tres capas de blobs — base ancha + cúpula alta + detalles
function CloudShape({ size, isOpen, isHover, name }) {
    const w = size * 2.4;
    const h = size * 0.9;
    return (
        <div style={{ position: "relative", width: "100%", height: "100%", overflow: "visible" }}>
            {/* Sombra suave debajo */}
            {!isOpen && (
                <div style={{
                    position: "absolute",
                    bottom: "-8px", left: "10%", right: "10%",
                    height: "18px",
                    background: "radial-gradient(ellipse at center, rgba(109,40,217,0.2) 0%, transparent 70%)",
                    filter: "blur(6px)",
                    pointerEvents: "none",
                }} />
            )}

            {/* Blob base — cuerpo principal */}
            <div style={{
                position: "absolute",
                left: "5%", top: "22%",
                width: "90%", height: "62%",
                borderRadius: "50%",
                background: isOpen ? "rgba(252,248,255,0.97)" : "rgba(246,238,255,0.92)",
                filter: isOpen ? "blur(2px)" : "blur(9px)",
                transition: "filter 0.4s ease",
            }} />

            {!isOpen && (<>
                {/* Cúpula central alta — da volumen */}
                <div style={{
                    position: "absolute",
                    left: "22%", top: "-18%",
                    width: "52%", height: "65%",
                    borderRadius: "50%",
                    background: "rgba(252,246,255,0.95)",
                    filter: "blur(8px)",
                }} />
                {/* Cúpula izquierda */}
                <div style={{
                    position: "absolute",
                    left: "5%", top: "-8%",
                    width: "38%", height: "52%",
                    borderRadius: "50%",
                    background: "rgba(244,234,255,0.88)",
                    filter: "blur(7px)",
                }} />
                {/* Cúpula derecha */}
                <div style={{
                    position: "absolute",
                    left: "55%", top: "-5%",
                    width: "34%", height: "46%",
                    borderRadius: "50%",
                    background: "rgba(244,234,255,0.85)",
                    filter: "blur(7px)",
                }} />
                {/* Detalle cima — punto brillante */}
                <div style={{
                    position: "absolute",
                    left: "35%", top: "-22%",
                    width: "22%", height: "30%",
                    borderRadius: "50%",
                    background: "rgba(255,252,255,0.9)",
                    filter: "blur(5px)",
                }} />
                {/* Borde iluminado superior — simula luz cenital */}
                <div style={{
                    position: "absolute",
                    left: "18%", top: "-26%",
                    width: "60%", height: "22%",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.55)",
                    filter: "blur(4px)",
                    opacity: isHover ? 0.9 : 0.6,
                    transition: "opacity 0.3s ease",
                }} />
            </>)}

            {/* Nombre visible en nube cerrada */}
            {!isOpen && (
                <div style={{
                    position: "absolute", inset: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    zIndex: 10, paddingTop: "4px",
                }}>
                    <span style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: `${Math.max(size * 0.1, 13)}px`,
                        fontWeight: "700",
                        color: isHover ? "rgba(60,20,120,1)" : "rgba(76,29,149,0.88)",
                        textAlign: "center",
                        padding: "0 14px",
                        transition: "color 0.3s ease",
                        textShadow: isHover ? "0 1px 10px rgba(139,92,246,0.25)" : "none",
                    }}>{name}</span>
                </div>
            )}
        </div>
    );
}

export default function Projects({ isNight = false }) {
    const [openId, setOpenId]   = useState(null);
    const [hoverId, setHoverId] = useState(null);

    // Delays fijos para las constelaciones — evita recalcular en cada render
    const lineDelays = useMemo(() => constellationLines.map((_, i) => i * 0.3), []);

    return (
        <section id="proyectos" style={{
            position: "relative",
            width: "100%",
            minHeight: "110vh",
            paddingBottom: "120px",
            background: "transparent",
            overflow: "visible",
        }}>
            {/* Título */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ textAlign: "center", marginBottom: "40px", padding: "0 24px" }}
            >
                <p style={{
                    fontFamily: "'DM Mono', monospace", fontSize: "11px",
                    letterSpacing: "4px", textTransform: "uppercase",
                    color: "rgba(196,165,253,0.75)", marginBottom: "10px",
                    textShadow: "0 0 16px rgba(167,139,250,0.4)",
                }}>Proyectos</p>
                <h2 style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "clamp(2rem, 5vw, 3rem)",
                    fontWeight: "700", color: "#ffffff", lineHeight: 1.1,
                    textShadow: "0 2px 20px rgba(139,92,246,0.4)",
                }}>Lo que he construido</h2>
            </motion.div>

            {/* Área interactiva */}
            <div style={{ position: "relative", width: "100%", height: "80vh", minHeight: 550 }}>

                {isNight && <ShootingStar />}

                {/* Constelaciones mejoradas */}
                {isNight && (
                    <svg style={{
                        position: "absolute", top: 0, left: 0,
                        width: "100%", height: "100%",
                        pointerEvents: "none", zIndex: 1, overflow: "visible",
                    }}>
                        <defs>
                            {/* Glow para líneas */}
                            <filter id="line-glow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="2" result="blur"/>
                                <feMerge>
                                    <feMergeNode in="blur"/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                            {/* Glow suave para línea de base */}
                            <filter id="line-glow-soft" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="1" result="blur"/>
                                <feMerge>
                                    <feMergeNode in="blur"/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                        </defs>

                        {constellationLines.map(([a, b], i) => {
                            const pa = projects[a], pb = projects[b];
                            // Grosor varía según qué línea: algunas más prominentes
                            const isMain = i < 2;
                            return (
                                <g key={i}>
                                    {/* Línea de halo — más gruesa y muy transparente */}
                                    <motion.line
                                        x1={`${pa.starX}%`} y1={`${pa.starY}%`}
                                        x2={`${pb.starX}%`} y2={`${pb.starY}%`}
                                        stroke="rgba(167,139,250,0.12)"
                                        strokeWidth={isMain ? "4" : "2.5"}
                                        strokeLinecap="round"
                                        filter="url(#line-glow-soft)"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: lineDelays[i] + 0.4, duration: 1.2 }}
                                    />
                                    {/* Línea principal */}
                                    <motion.line
                                        x1={`${pa.starX}%`} y1={`${pa.starY}%`}
                                        x2={`${pb.starX}%`} y2={`${pb.starY}%`}
                                        stroke={isMain ? "rgba(196,165,253,0.45)" : "rgba(196,165,253,0.3)"}
                                        strokeWidth={isMain ? "1.2" : "0.8"}
                                        strokeDasharray={isMain ? "none" : "4 6"}
                                        strokeLinecap="round"
                                        filter="url(#line-glow)"
                                        initial={{ opacity: 0, pathLength: 0 }}
                                        animate={{ opacity: 1, pathLength: 1 }}
                                        transition={{ delay: lineDelays[i], duration: 1.5, ease: "easeOut" }}
                                    />
                                </g>
                            );
                        })}
                    </svg>
                )}

                {projects.map((project) => {
                    const isOpen  = openId === project.id;
                    const isHover = hoverId === project.id;

                    // ── NOCHE: estrella ──
                    if (isNight) {
                        const starSize = isHover ? 20 : 11;
                        const glowR    = isHover ? 55 : 26;

                        return (
                            <div key={project.id} style={{
                                position: "absolute",
                                left: `${project.starX}%`, top: `${project.starY}%`,
                                transform: "translate(-50%, -50%)",
                                zIndex: isOpen ? 20 : 5,
                            }}>
                                {/* Halo exterior pulsante */}
                                <motion.div
                                    animate={{ opacity: [0.15, 0.45, 0.15], scale: [0.9, 1.15, 0.9] }}
                                    transition={{ duration: 3 + project.id * 0.45, repeat: Infinity, ease: "easeInOut" }}
                                    style={{
                                        position: "absolute",
                                        top: "50%", left: "50%",
                                        width: glowR * 2, height: glowR * 2,
                                        transform: "translate(-50%, -50%)",
                                        borderRadius: "50%",
                                        background: "radial-gradient(circle, rgba(196,165,253,0.4) 0%, rgba(139,92,246,0.15) 50%, transparent 75%)",
                                        pointerEvents: "none",
                                        transition: "width 0.3s ease, height 0.3s ease",
                                    }}
                                />

                                {/* Núcleo de la estrella */}
                                <motion.div
                                    animate={{ scale: [1, 1.25, 1], opacity: [0.85, 1, 0.85] }}
                                    transition={{ duration: 2.5 + project.id * 0.4, repeat: Infinity, ease: "easeInOut" }}
                                    onClick={() => setOpenId(isOpen ? null : project.id)}
                                    onMouseEnter={() => setHoverId(project.id)}
                                    onMouseLeave={() => setHoverId(null)}
                                    style={{
                                        position: "relative",
                                        width: starSize, height: starSize,
                                        borderRadius: "50%",
                                        background: "radial-gradient(circle at 35% 35%, #ffffff, #e9d5ff)",
                                        boxShadow: isHover
                                            ? "0 0 22px 8px rgba(196,165,253,0.85), 0 0 50px 18px rgba(139,92,246,0.4)"
                                            : "0 0 10px 3px rgba(196,165,253,0.65), 0 0 22px 6px rgba(139,92,246,0.25)",
                                        cursor: "pointer",
                                        transition: "all 0.3s ease",
                                        zIndex: 2,
                                    }}
                                />

                                {/* Rayos de difracción al hover */}
                                <AnimatePresence>
                                    {isHover && !isOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.6 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.6 }}
                                            style={{
                                                position: "absolute",
                                                top: "50%", left: "50%",
                                                transform: "translate(-50%, -50%)",
                                                pointerEvents: "none", zIndex: 3,
                                            }}
                                        >
                                            {[0, 90, 45, 135].map((angle, ri) => (
                                                <div key={ri} style={{
                                                    position: "absolute",
                                                    top: "50%", left: "50%",
                                                    width: 32, height: 1.5,
                                                    transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                                                    background: "linear-gradient(to right, transparent 0%, rgba(233,213,255,0.85) 50%, transparent 100%)",
                                                    filter: "blur(0.4px)",
                                                }} />
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Tooltip hover */}
                                <AnimatePresence>
                                    {isHover && !isOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 2 }}
                                            style={{
                                                position: "absolute",
                                                bottom: "calc(100% + 14px)",
                                                left: "50%", transform: "translateX(-50%)",
                                                whiteSpace: "nowrap", textAlign: "center",
                                                pointerEvents: "none", zIndex: 10,
                                            }}
                                        >
                                            <span style={{
                                                display: "block",
                                                fontFamily: "'Syne', sans-serif", fontSize: "13px",
                                                fontWeight: "700", color: "#f5f0ff",
                                                textShadow: "0 0 16px rgba(167,139,250,1), 0 0 32px rgba(139,92,246,0.7)",
                                                letterSpacing: "0.3px",
                                            }}>{project.name}</span>
                                            <span style={{
                                                display: "block",
                                                fontFamily: "'DM Mono', monospace", fontSize: "9px",
                                                color: "rgba(196,165,253,0.7)",
                                                letterSpacing: "2px", textTransform: "uppercase", marginTop: "3px",
                                            }}>{project.tag}</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Panel de proyecto abierto */}
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.88, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.88, y: 5 }}
                                            style={{
                                                position: "absolute",
                                                bottom: "calc(100% + 20px)",
                                                left: "50%", transform: "translateX(-50%)",
                                                width: 285,
                                                background: "rgba(5,1,18,0.94)",
                                                backdropFilter: "blur(30px)",
                                                border: "1px solid rgba(167,139,250,0.3)",
                                                borderRadius: "18px", padding: "20px",
                                                boxShadow: "0 12px 48px rgba(109,40,217,0.45), 0 0 0 1px rgba(196,165,253,0.06), inset 0 1px 0 rgba(196,165,253,0.1)",
                                                zIndex: 30,
                                            }}
                                        >
                                            {/* Línea de luz en el borde superior */}
                                            <div style={{
                                                position: "absolute", top: 0, left: "15%", right: "15%",
                                                height: "1px",
                                                background: "linear-gradient(to right, transparent, rgba(196,165,253,0.7), transparent)",
                                            }} />
                                            <ProjectContent project={project} dark={true} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    }

                    // ── DÍA: nube expandible ──
                    const expandedW = Math.max(project.cloudSize * 2.6, 340);
                    const expandedH = Math.max(project.cloudSize * 2.0, 260);
                    const normalW   = isHover ? project.cloudSize * 1.16 : project.cloudSize;
                    const normalH   = isHover ? project.cloudSize * 0.62 : project.cloudSize * 0.52;

                    return (
                        <motion.div
                            key={project.id}
                            onClick={() => setOpenId(isOpen ? null : project.id)}
                            onMouseEnter={() => setHoverId(project.id)}
                            onMouseLeave={() => setHoverId(null)}
                            animate={{ width: isOpen ? expandedW : normalW, height: isOpen ? expandedH : normalH }}
                            transition={{ type: "spring", stiffness: 175, damping: 22 }}
                            style={{
                                position: "absolute",
                                left: `${project.x}%`, top: `${project.y}%`,
                                transform: "translate(-50%, -50%)",
                                cursor: "pointer",
                                zIndex: isOpen ? 20 : isHover ? 10 : 5,
                                filter: isHover && !isOpen
                                    ? "drop-shadow(0 6px 24px rgba(139,92,246,0.35))"
                                    : "none",
                                transition: "filter 0.3s ease",
                            }}
                        >
                            {isOpen ? (
                                // Nube expandida — forma rectangular con bordes suaves
                                <div style={{
                                    position: "relative", width: "100%", height: "100%",
                                    background: "rgba(252,248,255,0.96)",
                                    borderRadius: "24px",
                                    backdropFilter: "blur(8px)",
                                    boxShadow: "0 8px 40px rgba(109,40,217,0.2), 0 2px 8px rgba(139,92,246,0.15), inset 0 1px 0 rgba(255,255,255,0.8)",
                                    border: "1px solid rgba(196,165,253,0.3)",
                                }}>
                                    <AnimatePresence>
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ delay: 0.16, duration: 0.28 }}
                                            style={{
                                                position: "absolute",
                                                top: "12%", left: "10%", right: "10%", bottom: "10%",
                                                display: "flex", flexDirection: "column",
                                                justifyContent: "center", zIndex: 10, overflow: "hidden",
                                            }}
                                        >
                                            <ProjectContent project={project} dark={false} />
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <CloudShape
                                    size={project.cloudSize}
                                    isOpen={false}
                                    isHover={isHover}
                                    name={project.name}
                                />
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* Hint */}
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                style={{
                    textAlign: "center", marginTop: "16px",
                    fontFamily: "'DM Mono', monospace", fontSize: "11px",
                    letterSpacing: "2px", textTransform: "uppercase",
                    color: "rgba(196,165,253,0.5)",
                }}
            >
                {isNight ? "✦ explora las constelaciones ✦" : "☁ pulsa una nube para descubrir el proyecto ☁"}
            </motion.p>
        </section>
    );
}