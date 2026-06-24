import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const highlights = [
    { glyph: "✦", label: "Diseño propio", desc: "Logotipos, branding e interfaces desde cero", color: "#ec4899", x: 10, y: 28 },
    { glyph: "◈", label: "Frontend",       desc: "HTML, CSS, JS, Bootstrap 5, React",          color: "#8b5cf6", x: 82, y: 22 },
    { glyph: "⬡", label: "Fullstack",      desc: "PHP, MySQL, API REST, Git",                   color: "#3b82f6", x: 20, y: 75 },
    { glyph: "◎", label: "Disponible",     desc: "Almería · híbrido · remoto",                  color: "#14b8a6", x: 78, y: 70 },
];

const STAR_POSITIONS = [
    { x: 18, y: 22 },
    { x: 65, y: 12 },
    { x: 82, y: 55 },
    { x: 42, y: 72 },
    { x: 12, y: 60 },
];
const CONSTELLATION_LINES = [[0,1],[1,2],[2,3],[3,4],[4,0],[1,3]];

function AboutText({ isNight }) {
    const textColor  = isNight ? "rgba(218,198,255,0.90)" : "rgba(15,2,55,0.88)";
    const bodyColor  = isNight ? "rgba(218,198,255,0.82)" : "rgba(35,8,90,0.80)";
    const labelColor = isNight ? "rgba(196,165,253,0.50)" : "rgba(80,15,170,0.55)";
    const strongColor= isNight ? "#e9d5ff"                : "rgba(80,10,180,0.95)";

    return (
        <div style={{ textAlign:"center", width:"min(420px,88vw)" }}>
            <p style={{
                fontFamily:"'DM Mono',monospace",
                fontSize:"clamp(8px,1.2vw,10px)",
                letterSpacing:"3px", textTransform:"uppercase",
                color: labelColor, margin:"0 0 14px",
            }}>
                ✦ desarrolladora web · almería
            </p>
            <p style={{
                fontFamily:"'Poppins',sans-serif",
                fontSize:"clamp(0.82rem,1.5vw,0.94rem)",
                fontWeight:500,
                color: textColor,
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
                fontSize:"clamp(0.82rem,1.5vw,0.94rem)",
                fontWeight:400,
                color: bodyColor,
                lineHeight:1.78, margin:0,
            }}>
                Me especializo en{" "}
                <strong style={{ color: strongColor, fontWeight:600 }}>frontend</strong>{" "}
                combinando código y diseño visual propio.
            </p>
        </div>
    );
}

function makeCloudBlobs(w, h) {
    return [
        { x: 0,       y: h*0.40, w: w,       h: h*0.60, blur: 18 },
        { x: w*0.06,  y: h*0.04, w: w*0.34,  h: h*0.58, blur: 14 },
        { x: w*0.26,  y: h*-0.08,w: w*0.30,  h: h*0.54, blur: 13 },
        { x: w*0.48,  y: h*0.02, w: w*0.32,  h: h*0.56, blur: 14 },
        { x: w*0.66,  y: h*0.10, w: w*0.26,  h: h*0.48, blur: 12 },
        { x: w*-0.02, y: h*0.28, w: w*0.20,  h: h*0.46, blur: 11 },
        { x: w*0.80,  y: h*0.28, w: w*0.20,  h: h*0.44, blur: 11 },
    ];
}

function TextCloud() {
    const W = 480, H = 210;
    const blobs = makeCloudBlobs(W, H);
    return (
        <motion.div
            initial={{ opacity:0, scale:0.84, y:18 }}
            animate={{ opacity:1, scale:1, y:[0,-6,0] }}
            transition={{
                opacity:{ delay:0.15, duration:0.55 },
                scale:{ delay:0.15, duration:0.6, ease:[0.22,1,0.36,1] },
                y:{ duration:5.5, repeat:Infinity, ease:"easeInOut", delay:0.9 },
            }}
            style={{
                position:"relative",
                width:"min(480px,90vw)", height:"min(210px,38vw)", minHeight:180,
                filter:"drop-shadow(0 18px 50px rgba(109,40,217,0.28)) drop-shadow(0 4px 14px rgba(139,92,246,0.16))",
                flexShrink:0,
            }}
        >
            {blobs.map((b, i) => (
                <div key={i} style={{
                    position:"absolute", left:b.x, top:b.y, width:b.w, height:b.h,
                    borderRadius:"50%",
                    background: i===0 ? "rgba(252,248,255,0.95)" : "rgba(248,242,255,0.91)",
                    filter:`blur(${b.blur}px)`, pointerEvents:"none",
                }} />
            ))}
            <div style={{
                position:"absolute", top:"16%", left:"8%", right:"8%", bottom:"8%",
                zIndex:10, display:"flex", alignItems:"center", justifyContent:"center",
            }}>
                <AboutText isNight={false} />
            </div>
        </motion.div>
    );
}

const highlightClouds = [
    { w:170, h:125, blobs:[
        { l:"2%",  t:"32%", w:"92%", h:"58%", blur:16 },
        { l:"14%", t:"-18%",w:"50%", h:"64%", blur:13 },
        { l:"50%", t:"-8%", w:"40%", h:"56%", blur:12 },
        { l:"-2%", t:"10%", w:"24%", h:"42%", blur:10 },
        { l:"28%", t:"-30%",w:"28%", h:"38%", blur:9  },
    ]},
    { w:165, h:118, blobs:[
        { l:"3%",  t:"30%", w:"90%", h:"60%", blur:16 },
        { l:"16%", t:"-14%",w:"46%", h:"60%", blur:13 },
        { l:"52%", t:"-6%", w:"36%", h:"52%", blur:12 },
        { l:"0%",  t:"8%",  w:"22%", h:"40%", blur:10 },
    ]},
    { w:172, h:122, blobs:[
        { l:"2%",  t:"30%", w:"94%", h:"58%", blur:16 },
        { l:"10%", t:"-20%",w:"52%", h:"66%", blur:13 },
        { l:"46%", t:"-6%", w:"44%", h:"58%", blur:12 },
        { l:"-3%", t:"12%", w:"24%", h:"42%", blur:10 },
        { l:"30%", t:"-32%",w:"26%", h:"36%", blur:9  },
    ]},
    { w:168, h:120, blobs:[
        { l:"3%",  t:"32%", w:"88%", h:"58%", blur:16 },
        { l:"14%", t:"-16%",w:"48%", h:"62%", blur:13 },
        { l:"52%", t:"-4%", w:"36%", h:"54%", blur:12 },
        { l:"1%",  t:"8%",  w:"20%", h:"38%", blur:10 },
    ]},
];

function HighlightCloud({ highlight, cloudDef, index, isOpen, onToggle }) {
    const [isHover, setIsHover] = useState(false);
    const bw = cloudDef.w, bh = cloudDef.h;
    const openW = 240, openH = 210;
    const w = isOpen ? openW : (isHover ? bw * 1.06 : bw);
    const h = isOpen ? openH : (isHover ? bh * 1.06 : bh);
    const shadow = isOpen
        ? `drop-shadow(0 16px 40px rgba(100,30,220,0.34)) drop-shadow(0 0 36px rgba(139,92,246,0.48))`
        : isHover
            ? `drop-shadow(0 10px 24px rgba(100,30,200,0.26)) drop-shadow(0 0 22px rgba(139,92,246,0.52))`
            : `drop-shadow(0 6px 16px rgba(100,30,200,0.14))`;
    const accent = highlight.color;

    return (
        <motion.div
            animate={!isOpen ? { y:[0,-7,0] } : { y:0 }}
            transition={!isOpen
                ? { duration:3.2+index*0.55, repeat:Infinity, ease:"easeInOut", delay:index*0.5 }
                : { duration:0.4 }}
        >
            <motion.div
                onClick={onToggle}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                animate={{ width:w, height:h }}
                transition={{ type:"spring", stiffness:140, damping:24 }}
                style={{ position:"relative", cursor:"pointer", filter:shadow, transition:"filter 0.3s ease" }}
            >
                <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
                    {cloudDef.blobs.map((b, i) => (
                        <div key={i} style={{
                            position:"absolute", left:b.l, top:b.t, width:b.w, height:b.h,
                            borderRadius:"50%",
                            background: i===0 ? "rgba(252,248,255,0.95)" : "rgba(245,238,255,0.92)",
                            filter:`blur(${b.blur}px)`,
                        }}/>
                    ))}
                    <div style={{
                        position:"absolute", left:"28%", top:"-12%",
                        width:"38%", height:"26%", borderRadius:"50%",
                        background:`${accent}1a`, filter:"blur(10px)",
                        opacity: isHover||isOpen ? 1 : 0.5, transition:"opacity 0.3s", pointerEvents:"none",
                    }}/>
                </div>
                <motion.div
                    animate={{ opacity: isOpen ? 0 : 1 }}
                    transition={{ duration:0.15 }}
                    style={{
                        position:"absolute", inset:0, zIndex:10,
                        display:"flex", flexDirection:"column",
                        alignItems:"center", justifyContent:"center",
                        gap:5, paddingTop:`${bh*0.05}px`, pointerEvents:"none",
                    }}
                >
                    <span style={{
                        fontFamily:"'DM Mono',monospace",
                        fontSize:`${Math.max(bw * 0.18, 20)}px`,
                        color: accent, textShadow:`0 0 12px ${accent}66`, lineHeight:1,
                    }}>{highlight.glyph}</span>
                    <span style={{
                        fontFamily:"'Plus Jakarta Sans',sans-serif",
                        fontSize:`${Math.max(bw * 0.078, 11)}px`,
                        fontWeight:700,
                        color: isHover ? "rgba(25,5,80,1)" : "rgba(45,8,100,0.85)",
                        textAlign:"center", padding:"0 10px",
                        transition:"color 0.3s", userSelect:"none",
                    }}>{highlight.label}</span>
                </motion.div>
                <motion.div
                    animate={{ opacity: isOpen ? 1 : 0 }}
                    transition={{ duration:0.25, delay: isOpen ? 0.18 : 0 }}
                    style={{
                        position:"absolute", top:"14%", left:"10%", right:"10%", bottom:"10%",
                        zIndex:11,
                        display:"flex", flexDirection:"column",
                        alignItems:"center", justifyContent:"center",
                        gap:8, textAlign:"center", overflow:"hidden",
                        pointerEvents: isOpen ? "auto" : "none",
                    }}
                >
                    <span style={{ fontFamily:"'DM Mono',monospace", fontSize:24, color: accent, textShadow:`0 0 14px ${accent}88` }}>{highlight.glyph}</span>
                    <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"0.85rem", fontWeight:700, color:"rgba(20,4,70,0.95)" }}>{highlight.label}</span>
                    <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:"0.71rem", color:"rgba(45,8,100,0.78)", lineHeight:1.65, margin:0 }}>{highlight.desc}</p>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

function ConstellationStar({ highlight, pos, delay, isOpen, onToggle }) {
    const [hover, setHover] = useState(false);
    const sz = hover || isOpen ? 16 : 9;
    const panelLeft   = pos.x < 50 ? "0" : "auto";
    const panelRight  = pos.x >= 50 ? "0" : "auto";
    const panelBottom = pos.y < 50 ? "auto" : "calc(100% + 12px)";
    const panelTop    = pos.y < 50 ? "calc(100% + 12px)" : "auto";

    return (
        <div style={{ position:"absolute", left:`${pos.x}%`, top:`${pos.y}%`, transform:"translate(-50%,-50%)", zIndex: isOpen ? 40 : 10 }}>
            <motion.div
                animate={{ opacity:[0.12,0.38,0.12], scale:[0.88,1.18,0.88] }}
                transition={{ duration:3.2+delay, repeat:Infinity, ease:"easeInOut" }}
                style={{ position:"absolute", top:"50%", left:"50%", width:48, height:48, transform:"translate(-50%,-50%)", borderRadius:"50%", background:`radial-gradient(circle,${highlight.color}50 0%,transparent 70%)`, pointerEvents:"none" }}
            />
            <motion.div
                animate={{ scale:[1,1.2,1], opacity:[0.82,1,0.82] }}
                transition={{ duration:2.6+delay*0.4, repeat:Infinity, ease:"easeInOut" }}
                onClick={onToggle}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{
                    position:"relative", width:sz, height:sz, borderRadius:"50%",
                    background:`radial-gradient(circle at 35% 35%,#ffffff,${highlight.color}cc)`,
                    boxShadow: hover||isOpen
                        ? `0 0 18px 7px ${highlight.color}88,0 0 40px 14px ${highlight.color}44`
                        : `0 0 9px 3px ${highlight.color}66,0 0 20px 5px ${highlight.color}33`,
                    cursor:"pointer", transition:"width 0.22s,height 0.22s,box-shadow 0.22s", zIndex:2,
                }}
            />
            <AnimatePresence>
                {hover && !isOpen && (
                    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                        style={{ position:"absolute", bottom:"calc(100% + 9px)", left:"50%", transform:"translateX(-50%)", whiteSpace:"nowrap", pointerEvents:"none", zIndex:10 }}>
                        <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:11, fontWeight:700, color:"#f5f0ff", textShadow:`0 0 12px ${highlight.color}` }}>{highlight.label}</span>
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity:0, scale:0.88, y:6 }} animate={{ opacity:1, scale:1, y:0 }} exit={{ opacity:0, scale:0.9 }}
                        onClick={e => e.stopPropagation()}
                        style={{
                            position:"absolute", top:panelTop, bottom:panelBottom, left:panelLeft, right:panelRight,
                            width:"min(200px,56vw)",
                            background:"rgba(5,1,18,0.94)", backdropFilter:"blur(28px)",
                            border:`1px solid ${highlight.color}44`, borderRadius:14, padding:13,
                            boxShadow:`0 10px 36px ${highlight.color}30`, zIndex:30,
                        }}
                    >
                        <div style={{ position:"absolute", top:0, left:"15%", right:"15%", height:1, background:`linear-gradient(to right,transparent,${highlight.color}88,transparent)` }} />
                        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6, textAlign:"center" }}>
                            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:20, color:highlight.color, textShadow:`0 0 14px ${highlight.color}` }}>{highlight.glyph}</span>
                            <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"0.86rem", fontWeight:700, color:"#fff" }}>{highlight.label}</span>
                            <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:"0.73rem", color:"rgba(220,200,255,0.82)", lineHeight:1.6, margin:0 }}>{highlight.desc}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function SobreMi({ isNight = false, onBack }) {
    const [openStar, setOpenStar] = useState(null);
    const [openCloud, setOpenCloud] = useState(null);
    const lineDelays = [0, 0.25, 0.5, 0.75, 1.0, 1.25];

    return (
        <>
            <style>{`
                .sm-back {
                    position:fixed; top:16px; right:16px; z-index:200;
                    padding:8px 18px; border-radius:24px;
                    background:rgba(5,1,18,0.65); backdrop-filter:blur(14px);
                    border:1px solid rgba(167,139,250,0.35);
                    color:rgba(233,213,255,0.85);
                    font-family:'DM Mono',monospace; font-size:10px;
                    letter-spacing:1.5px; text-transform:uppercase;
                    cursor:pointer; box-shadow:0 2px 14px rgba(109,40,217,0.25);
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

                <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.28 }}
                    style={{ position:"fixed", top:22, left:"50%", transform:"translateX(-50%)", fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:"4px", textTransform:"uppercase", color:"rgba(233,213,255,0.6)", textShadow:"0 0 18px rgba(167,139,250,0.5)", pointerEvents:"none", whiteSpace:"nowrap", zIndex:150, margin:0 }}>
                    ✦ sobre mí
                </motion.p>

                {!isNight && (
                    <div style={{
                        position:"absolute", inset:0, overflowY:"auto",
                        display:"flex", flexDirection:"column",
                        alignItems:"center", justifyContent:"center",
                        padding:"72px 24px 40px", boxSizing:"border-box", gap:0,
                    }}>
                        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.15, duration:0.55 }}>
                            <TextCloud />
                        </motion.div>
                        <div style={{
                            display:"flex", flexWrap:"wrap", justifyContent:"center",
                            width:"min(560px,96vw)", marginTop:24, gap:0,
                        }}>
                            {highlights.map((h, i) => {
                                const vOffsets = [0, 32, 48, 16];
                                return (
                                    <motion.div key={i}
                                        initial={{ opacity:0, y:14 }}
                                        animate={{ opacity:1, y:[vOffsets[i]-8, vOffsets[i], vOffsets[i]-8] }}
                                        transition={{
                                            opacity:{ delay:0.2+i*0.1, duration:0.5 },
                                            y:{ duration:3.2+i*0.55, repeat:Infinity, ease:"easeInOut", delay:i*0.55 },
                                        }}
                                        style={{
                                            width:"50%", display:"flex",
                                            justifyContent: i%2===0 ? "flex-end" : "flex-start",
                                            paddingRight: i%2===0 ? 8 : 0,
                                            paddingLeft:  i%2===1 ? 8 : 0,
                                            zIndex: openCloud===i ? 20 : 5, position:"relative",
                                        }}
                                    >
                                        <HighlightCloud highlight={h} cloudDef={highlightClouds[i]} index={i}
                                            isOpen={openCloud===i} onToggle={() => setOpenCloud(openCloud===i ? null : i)} />
                                    </motion.div>
                                );
                            })}
                        </div>
                        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.9 }}
                            style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:"3px", textTransform:"uppercase", color:"rgba(233,213,255,0.36)", pointerEvents:"none", margin:"32px 0 0" }}>
                            ☁ pulsa una nube para descubrir más ☁
                        </motion.p>
                    </div>
                )}

                {isNight && (
                    <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"64px 24px 48px", boxSizing:"border-box", gap:0 }}>
                        <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3, duration:0.55 }} style={{ marginBottom:48, zIndex:6 }}>
                            <AboutText isNight={true} />
                        </motion.div>
                        <div style={{ position:"relative", width:"min(500px,88vw)", height:"min(260px,44vw)", minHeight:200, flexShrink:0 }}>
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
                                                stroke="rgba(167,139,250,0.1)" strokeWidth="3" strokeLinecap="round"
                                                initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:lineDelays[i]+0.4, duration:1.1 }} />
                                            <motion.line x1={`${pa.x}%`} y1={`${pa.y}%`} x2={`${pb.x}%`} y2={`${pb.y}%`}
                                                stroke="rgba(196,165,253,0.40)" strokeWidth="0.9" strokeDasharray="4 6"
                                                strokeLinecap="round" filter="url(#smgl2)"
                                                initial={{ opacity:0, pathLength:0 }} animate={{ opacity:1, pathLength:1 }}
                                                transition={{ delay:lineDelays[i], duration:1.5, ease:"easeOut" }} />
                                        </g>
                                    );
                                })}
                            </svg>
                            {highlights.map((h, i) => (
                                <ConstellationStar key={i} highlight={h} pos={STAR_POSITIONS[i]}
                                    delay={0.28 + i * 0.12} isOpen={openStar === i}
                                    onToggle={() => setOpenStar(prev => prev === i ? null : i)} />
                            ))}
                            {STAR_POSITIONS[4] && (
                                <motion.div
                                    animate={{ scale:[1,1.2,1], opacity:[0.5,0.85,0.5] }}
                                    transition={{ duration:3.5, repeat:Infinity, ease:"easeInOut" }}
                                    style={{ position:"absolute", left:`${STAR_POSITIONS[4].x}%`, top:`${STAR_POSITIONS[4].y}%`, transform:"translate(-50%,-50%)", width:6, height:6, borderRadius:"50%", background:"radial-gradient(circle at 35% 35%,#ffffff,#c4b5fd)", boxShadow:"0 0 8px 2px rgba(196,165,253,0.6)", zIndex:8 }}
                                />
                            )}
                        </div>
                        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.2 }}
                            style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:"3px", textTransform:"uppercase", color:"rgba(233,213,255,0.30)", margin:"24px 0 0", pointerEvents:"none" }}>
                            ✦ pulsa las estrellas para descubrir más ✦
                        </motion.p>
                    </div>
                )}
            </motion.div>
        </>
    );
}