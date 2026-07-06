import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getTheme } from "../theme";

const highlights = [
    { glyph: "✦", label: "Diseño propio", desc: "Logotipos, branding e interfaces desde cero", color: "#ec4899" },
    { glyph: "✦", label: "Frontend",       desc: "HTML, CSS, JS, Bootstrap 5, React",          color: "#8b5cf6" },
    { glyph: "✦", label: "Fullstack",      desc: "PHP, MySQL, API REST, Git",                   color: "#3b82f6" },
    { glyph: "✦", label: "Disponible",     desc: "Almería · híbrido · remoto",                  color: "#14b8a6" },
];

// Posiciones desktop (espacio más ancho, paneles laterales caben bien)
const STAR_POSITIONS_DESKTOP = [
    { x: 18, y: 22 },
    { x: 65, y: 12 },
    { x: 82, y: 55 },
    { x: 42, y: 72 },
    { x: 12, y: 60 },
];

// Posiciones mobile — más centradas y separadas verticalmente para que
// el panel de info (que se abre a un lado) no se salga de pantalla ni se solape
const STAR_POSITIONS_MOBILE = [
    { x: 24, y: 16 },
    { x: 72, y: 14 },
    { x: 80, y: 50 },
    { x: 30, y: 80 },
    { x: 18, y: 52 },
];

function useIsMobile() {
    const [v, setV] = useState(() => typeof window !== "undefined" ? window.innerWidth < 768 : false);
    useEffect(() => {
        const h = () => setV(window.innerWidth < 768);
        window.addEventListener("resize", h);
        return () => window.removeEventListener("resize", h);
    }, []);
    return v;
}

//lineas que conectan las constelaciones por grupos de dos
const CONSTELLATION_LINES = [[0,1],[1,2],[2,3],[3,4],[4,0],[1,3]];

//bloque de texto con diferentes modos de color según el dia.
function AboutText({ currentMode, isBright }) {
    const isNight = currentMode === "noche";

    const textColor   = isNight ? "rgba(218,198,255,0.90)"
                       : isBright ? "rgba(255,248,251,0.95)"
                       : "rgba(15,2,55,0.88)";
    const bodyColor   = isNight ? "rgba(218,198,255,0.82)"
                       : isBright ? "rgba(255,248,251,0.88)"
                       : "rgba(35,8,90,0.80)";
    const strongColor = isNight ? "#e9d5ff"
                       : isBright ? "#fff2f8"
                       : "rgba(80,10,180,0.95)";
    const paragraphShadow = isBright ? "0 1px 10px rgba(30,4,40,0.55)" : "none";

    // Píldora: cristal oscuro en noche, cristal claro en el resto
    // cristal claro más suave en amanecer/atardecer 
    const pillBg     = isNight ? "rgba(10,2,24,0.45)" : isBright ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.4)";
    const pillBorder = isNight ? "1px solid rgba(255,255,255,0.14)" : isBright ? "1px solid rgba(255,255,255,0.32)" : "1px solid rgba(255,255,255,0.55)";
    const pillText   = isNight ? "rgba(255,250,255,0.95)" : isBright ? "rgba(255,248,251,0.95)" : "rgba(46,10,70,0.88)";
    
    return (
        <div style={{ textAlign:"center", width:"min(420px,88vw)" }}>
            <p style={{
                display: "inline-block",
                fontFamily:"'DM Mono',monospace",
                fontSize:"clamp(9px,1.3vw,11px)",
                letterSpacing:"3px", textTransform:"uppercase",
                color: pillText,
                textShadow: isBright ? "0 1px 6px rgba(30,4,25,0.6)" : "none",
                background: pillBg,
                backdropFilter: "blur(6px)",
                border: pillBorder,
                borderRadius: "20px",
                padding: "6px 16px",
                margin:"0 0 14px",
            }}>
            ✦ desarrolladora web · almería
            </p>
            <p style={{
                fontFamily:"'Poppins',sans-serif",
                fontSize:"clamp(0.82rem,2.5vw,0.94rem)",
                fontWeight:500, color: textColor,
                textShadow: paragraphShadow,
                lineHeight:1.78, margin:"0 0 10px",
            }}>
                Recién graduada en DAW con experiencia real. Durante mis prácticas en{" "}
                <strong style={{ color: strongColor, fontWeight:600 }}>Zaitec</strong>{" "}
                participé en{" "}
                <strong style={{ color: strongColor, fontWeight:600 }}>Turistea</strong>,
                app fullstack para agencia de viajes.
            </p>
            <p style={{
                fontFamily:"'Poppins',sans-serif",
                fontSize:"clamp(0.82rem,2.5vw,0.94rem)",
                fontWeight:400, color: bodyColor,
                textShadow: paragraphShadow,
                lineHeight:1.78, margin:0,
            }}>
                Me especializo en{" "}
                <strong style={{ color: strongColor, fontWeight:600 }}>frontend</strong>{" "}
                combinando código y diseño visual propio.
            </p>
        </div>
    );
}

// Variación sutil del halo pulsante por estrella
// para que las 4 sean diferentes
const HALO_AMPLITUDES = [1.22, 1.32, 1.16, 1.26];

function ConstellationStar({ highlight, pos, delay, isOpen, onToggle, isNight, isMobile, currentMode, index }) {
    const [hover, setHover] = useState(false);
    const sz = hover || isOpen ? 16 : 9;
    const theme = getTheme(currentMode);
    const haloAmp = HALO_AMPLITUDES[index % HALO_AMPLITUDES.length];

    const starBg     = isNight
        ? `radial-gradient(circle at 35% 35%,#ffffff,${highlight.color}cc)`
        : `radial-gradient(circle at 35% 35%,#ffffff,${highlight.color})`;
    const glowHover  = `0 0 18px 7px ${highlight.color}88,0 0 40px 14px ${highlight.color}44`;
    const glowIdle   = isNight
        ? `0 0 9px 3px ${highlight.color}66,0 0 20px 5px ${highlight.color}33`
        : `0 0 6px 2px ${highlight.color}55,0 0 14px 4px ${highlight.color}22`;
    const haloOpacity = isNight ? [0.12,0.38,0.12] : [0.08,0.28,0.08];

    // El panel de info se ancla al lado con más espacio: si la estrella está
    // en la mitad izquierda, el panel se abre hacia la derecha (y viceversa);
    // Esto evita que el panel se salga de pantalla en los bordes.
    const anchorLeft  = pos.x < 50;
    const anchorBelow = pos.y < 50;

    const panelLeft   = anchorLeft ? "0" : "auto";
    const panelRight  = !anchorLeft ? "0" : "auto";
    const panelBottom = anchorBelow ? "auto" : "calc(100% + 14px)";
    const panelTop    = anchorBelow ? "calc(100% + 14px)" : "auto";

    //isNight se usa como único para el color del texto porque
    //solo el modo noche cambia realmente el requisito de contraste.
    const panelBg     = theme.panelBg;
    const labelClr    = isNight ? "#fff" : "rgba(20,4,70,0.95)";
    const descClr     = isNight ? "rgba(220,200,255,0.82)" : "rgba(45,8,100,0.78)";
    const tooltipClr  = isNight ? "#f5f0ff" : "rgba(20,4,70,0.92)";

    return (
        <div style={{ position:"absolute", left:`${pos.x}%`, top:`${pos.y}%`, transform:"translate(-50%,-50%)", zIndex: isOpen ? 40 : 10 }}>
            {/* Halo de la estrella */}
            <motion.div
                animate={{ opacity: haloOpacity, scale:[0.88, haloAmp, 0.88] }}
                transition={{ duration:3.2+delay, repeat:Infinity, ease:"easeInOut" }}
                style={{ position:"absolute", top:"50%", left:"50%", width:48, height:48, transform:"translate(-50%,-50%)", borderRadius:"50%", background:`radial-gradient(circle,${highlight.color}50 0%,transparent 70%)`, pointerEvents:"none" }}
            />
            {/* Estrella clicable*/}
            <motion.div
                animate={{ scale:[1,1.2,1], opacity:[0.82,1,0.82] }}
                transition={{ duration:2.6+delay*0.4, repeat:Infinity, ease:"easeInOut" }}
                onClick={onToggle}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{
                    position:"relative", width:sz, height:sz, borderRadius:"50%",
                    background: starBg,
                    boxShadow: hover||isOpen ? glowHover : glowIdle,
                    cursor:"pointer", transition:"width 0.22s,height 0.22s,box-shadow 0.22s", zIndex:2,
                }}
            />
            {/* Tooltip nombre */}
            <AnimatePresence>
                {hover && !isOpen && (
                    <motion.div initial={{ opacity:0, y:4 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                        style={{
                            position:"absolute", bottom:"calc(100% + 10px)", left:"50%", transform:"translateX(-50%)",
                            whiteSpace:"nowrap", pointerEvents:"none", zIndex:10,
                            background: panelBg, backdropFilter:"blur(12px)",
                            border: `1px solid ${highlight.color}50`,
                            borderRadius:"14px", padding:"6px 14px",
                            boxShadow:`0 6px 20px -6px ${highlight.color}40`,
                        }}>
                        <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:14, fontWeight:700, color: tooltipClr }}>{highlight.label}</span>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Panel de detalle — se abre al hacer click en la estrella */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity:0, scale:0.8, rotate:-4, y:10 }}
                        animate={{ opacity:1, scale:1, rotate:0, y:0 }}
                        exit={{ opacity:0, scale:0.85, y:6 }}
                        transition={{ type:"spring", stiffness:380, damping:24 }}
                        onClick={e => e.stopPropagation()}
                        style={{
                            position:"absolute", top:panelTop, bottom:panelBottom, left:panelLeft, right:panelRight,
                            width: isMobile ? "min(200px,60vw)" : "min(230px,62vw)",
                            background: panelBg, backdropFilter:"blur(28px)",
                            border: `1.5px solid ${highlight.color}70`,
                            borderRadius:18,
                            overflow: "hidden",
                            boxShadow:`0 16px 44px ${highlight.color}45`,
                            zIndex:30,
                        }}
                    >

                        {/* Botón cerrar */}
                        <button
                            onClick={onToggle}
                            aria-label="Cerrar"
                            style={{
                                position:"absolute", top:14, right:12,
                                width:22, height:22, borderRadius:"50%",
                                background: `${highlight.color}18`,
                                border: `1px solid ${highlight.color}50`,
                                cursor:"pointer",
                                display:"flex", alignItems:"center", justifyContent:"center",
                                fontFamily:"'Poppins',sans-serif", fontSize:13, lineHeight:1,
                                color: highlight.color, padding:0, zIndex:2,
                            }}
                        >×</button>

                        <div style={{ padding: isMobile ? "18px 16px 16px" : "20px 18px 18px", display:"flex", flexDirection:"column", alignItems:"center", gap:8, textAlign:"center" }}>
                    
                            <motion.span
                                initial={{ opacity:0, y:4 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.15, duration:0.3 }}
                                style={{ fontFamily:"'Poppins',sans-serif", fontSize:"1.05rem", fontWeight:700, color: labelClr, letterSpacing:"0.2px" }}
                            >{highlight.label}</motion.span>
                            <motion.p
                                initial={{ opacity:0, y:4 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.22, duration:0.3 }}
                                style={{ fontFamily:"'Poppins',sans-serif", fontSize:"0.85rem", color: descClr, lineHeight:1.65, margin:0 }}
                            >{highlight.desc}</motion.p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function SobreMi({ sky = {}, isNight: isNightProp = false, onBack }) {
    const [openStar, setOpenStar] = useState(null);
    const isMobile = useIsMobile();
    const STAR_POSITIONS = isMobile ? STAR_POSITIONS_MOBILE : STAR_POSITIONS_DESKTOP;
    const lineDelays = [0, 0.25, 0.5, 0.75, 1.0, 1.25];

    //sky como fuente principal del estado de tema y isNightProp como fallback para mantener 
    //compatibilidad con versiones antiguas del componente sin romper el render.
    const currentMode = sky?.label || (isNightProp ? "noche" : "mediodia");
    const isNight  = currentMode === "noche";
    const isBright = currentMode === "amanecer" || currentMode === "atardecer";

    const lineHalo  = isNight ? "rgba(167,139,250,0.10)" : isBright ? "rgba(30,4,25,0.18)" : "rgba(80,40,180,0.12)";
    //Usas una línea blanca con halo oscuro para garantizar legibilidad sobre un fondo variable
    const lineMain  = isNight ? "rgba(196,165,253,0.40)" : isBright ? "rgba(255,255,255,0.7)"  : "rgba(100,50,200,0.30)";
    const labelTop  = isNight ? "rgba(233,213,255,0.60)" : isBright ? "rgba(255,246,250,0.9)" : "rgba(30,5,80,0.55)";
    const backBg    = isNight ? "rgba(5,1,18,0.65)"      : "rgba(255,255,255,0.55)";
    const backBorder= isNight ? "rgba(167,139,250,0.35)"  : "rgba(100,50,200,0.3)";
    const backColor = isNight ? "rgba(233,213,255,0.85)"  : "rgba(30,5,80,0.85)";

    return (
        <>
            <style>{`
                .sm-back {
                    position: fixed;
                    top: 16px;
                    right: max(16px, env(safe-area-inset-right, 16px));
                    z-index: 200;
                    padding: 8px 18px;
                    border-radius: 24px;
                    background: ${backBg};
                    backdrop-filter: blur(14px);
                    border: 1px solid ${backBorder};
                    color: ${backColor};
                    font-family: 'DM Mono', monospace;
                    font-size: 10px;
                    letter-spacing: 1.5px;
                    text-transform: uppercase;
                    cursor: pointer;
                    box-shadow: 0 2px 14px rgba(109,40,217,0.25);
                }
            `}</style>

            <motion.div
                key="sobremi"
                initial={{ opacity:0, scale:1.1 }}
                animate={{ opacity:1, scale:1 }}
                exit={{ opacity:0, scale:0.94, filter:"blur(6px)" }}
                transition={{ duration:0.5, ease:[0.22,1,0.36,1] }}
                style={{ position:"fixed", inset:0, zIndex:10 }}
            >
                <motion.button className="sm-back"
                    initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.4 }}
                    onClick={onBack} whileHover={{ scale:1.05, x:-2 }} whileTap={{ scale:0.96 }}>
                    ← volver
                </motion.button>

                {/* Título sobre mí— clamp en top para no solaparse con el SkySelector en móvil */}
                <motion.p
                    initial={{ opacity:0 }}
                    animate={{ opacity:1 }}
                    transition={{ delay:0.28 }}
                    style={{
                        position: "fixed",
                        top: "clamp(22px, 3vw, 28px)",
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontFamily: "'DM Mono',monospace",
                        fontSize: 13,
                        letterSpacing: "4px",
                        textTransform: "uppercase",
                        color: labelTop,
                        textShadow: isNight ? "0 0 18px rgba(167,139,250,0.5)" : isBright ? "0 1px 8px rgba(30,4,40,0.5)" : "none",
                        pointerEvents: "none",
                        whiteSpace: "nowrap",
                        zIndex: 150,
                        margin: 0,
                    }}
                >
                    ✦ sobre mí
                </motion.p>

                <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"64px 24px 48px", boxSizing:"border-box" }}>

                    {/* Texto descriptivo */}
                    <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3, duration:0.55 }} style={{ marginBottom:48, zIndex:6 }}>
                        <AboutText currentMode={currentMode} isBright={isBright} />
                    </motion.div>

                    {/* Canvas constelación */}
                    <div style={{ position:"relative", width:"min(500px,88vw)", height:"min(260px,44vw)", minHeight: isMobile ? 240 : 200, flexShrink:0 }}>
                        <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", zIndex:5, overflow:"visible" }}>
                            <defs>
                                <filter id="smgl2">
                                    <feGaussianBlur stdDeviation="1.5" result="b"/>
                                    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                                </filter>
                            </defs>
                            {CONSTELLATION_LINES.map(([a, b], i) => {
                                const pa = STAR_POSITIONS[a], pb = STAR_POSITIONS[b];
                                return (
                                    <g key={i}>
                                        <motion.line x1={`${pa.x}%`} y1={`${pa.y}%`} x2={`${pb.x}%`} y2={`${pb.y}%`}
                                            stroke={lineHalo} strokeWidth="3" strokeLinecap="round"
                                            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:lineDelays[i]+0.4, duration:1.1 }} />
                                        <motion.line x1={`${pa.x}%`} y1={`${pa.y}%`} x2={`${pb.x}%`} y2={`${pb.y}%`}
                                            stroke={lineMain} strokeWidth="0.9" strokeDasharray="4 6"
                                            strokeLinecap="round" filter="url(#smgl2)"
                                            initial={{ opacity:0, pathLength:0 }} animate={{ opacity:1, pathLength:1 }}
                                            transition={{ delay:lineDelays[i], duration:1.5, ease:"easeOut" }} />
                                    </g>
                                );
                            })}
                        </svg>

                        {highlights.map((h, i) => (
                            <ConstellationStar
                                key={i} highlight={h}
                                pos={STAR_POSITIONS[i]}
                                delay={0.28 + i * 0.12}
                                isOpen={openStar === i}
                                isNight={isNight}
                                isMobile={isMobile}
                                currentMode={currentMode}
                                index={i}
                                onToggle={() => setOpenStar(prev => prev === i ? null : i)}
                            />
                        ))}

                        {/* Estrella decorativa extra */}
                        {STAR_POSITIONS[4] && (
                            <motion.div
                                animate={{ scale:[1,1.2,1], opacity: isNight ? [0.5,0.85,0.5] : [0.3,0.6,0.3] }}
                                transition={{ duration:3.5, repeat:Infinity, ease:"easeInOut" }}
                                style={{ position:"absolute", left:`${STAR_POSITIONS[4].x}%`, top:`${STAR_POSITIONS[4].y}%`, transform:"translate(-50%,-50%)", width:6, height:6, borderRadius:"50%",
                                    background: isNight ? "radial-gradient(circle at 35% 35%,#ffffff,#c4b5fd)" : "radial-gradient(circle at 35% 35%,#ffffff,#a78bfa)",
                                    boxShadow: isNight ? "0 0 8px 2px rgba(196,165,253,0.6)" : "0 0 6px 2px rgba(139,92,246,0.4)",
                                    zIndex:8 }}
                            />
                        )}
                    </div>

                    {/* Hint final*/}    
                    <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.2 }}
                        style={{
                            display: "inline-block",
                            fontFamily:"'DM Mono',monospace", fontSize: 10, letterSpacing:"3px", textTransform:"uppercase",
                            color: isNight ? "rgba(255,250,255,0.9)" : isBright ? "rgba(255,248,251,0.95)" : "rgba(46,10,70,0.85)",
                            textShadow: isBright ? "0 1px 6px rgba(30,4,25,0.6)" : "none",
                            background: isNight ? "rgba(10,2,24,0.4)" : isBright ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.38)",
                            backdropFilter: "blur(6px)",
                            border: isNight ? "1px solid rgba(255,255,255,0.1)" : isBright ? "1px solid rgba(255,255,255,0.3)" : "1px solid rgba(255,255,255,0.5)",
                            borderRadius: "20px",
                            padding: "6px 14px",
                            margin:"24px 0 0", pointerEvents:"none",
                         }}>
                                ✦ pulsa las estrellas para descubrir más ✦
                </motion.p>
                </div>
            </motion.div>
        </>
    );
}