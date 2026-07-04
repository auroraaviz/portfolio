import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero        from './components/Hero'
import Projects    from './components/Projects'
import SobreMi     from './components/SobreMi'
import Habilidades from './components/Habilidades'
import Contacto    from './components/Contacto'

const SKY_MODES = {
    amanecer:  { top: "#0f051d", mid: "#4a1a6b", bottom: "#f472b6", label: "amanecer",  swatch: ["#0f051d", "#4a1a6b", "#f472b6"], icon: "🌅" },
    mediodia:  { top: "#7c3aed", mid: "#c4b5fd", bottom: "#a7f3d0", label: "mediodia",  swatch: ["#7c3aed", "#c4b5fd", "#a7f3d0"], icon: "☀️" },
    atardecer: { top: "#1e0b36", mid: "#8b5cf6", bottom: "#2dd4bf", label: "atardecer", swatch: ["#1e0b36", "#8b5cf6", "#2dd4bf"], icon: "🌆" },
    noche:     { top: "#03000a", mid: "#0f051d", bottom: "#2e1065", label: "noche",     swatch: ["#03000a", "#0f051d", "#2e1065"], icon: "🌙" },
};
const MODE_KEYS = ["amanecer", "mediodia", "atardecer", "noche"];

const getInitialMode = () => {
    const hour = typeof window !== "undefined" ? new Date().getHours() : 14;
    if (hour >= 5  && hour < 10) return "amanecer";
    if (hour >= 10 && hour < 19) return "mediodia";
    if (hour >= 19 && hour < 22) return "atardecer";
    return "noche";
};

const generateStars = (count) =>
    Array.from({ length: count }, (_, i) => {
        const roll = Math.random();
        const layer = roll > 0.75 ? "near" : roll > 0.45 ? "mid" : "far";
        const duration = layer === "near" ? Math.random() * 2.5 + 2
                       : layer === "mid"  ? Math.random() * 3 + 3.5
                       :                    Math.random() * 5 + 5;
        return {
            id: i, layer,
            x: Math.random() * 100, y: Math.random() * 100,
            size: layer === "near" ? Math.random() * 3 + 2
                : layer === "mid"  ? Math.random() * 1.8 + 1
                :                    Math.random() * 1 + 0.4,
            opacity: layer === "near" ? Math.random() * 0.35 + 0.65
                   : layer === "mid"  ? Math.random() * 0.3 + 0.35
                   :                    Math.random() * 0.2 + 0.15,
            duration, delay: Math.random() * duration,
            color: Math.random() > 0.85 ? "#fde68a"
                 : Math.random() > 0.7  ? "#bfdbfe"
                 : "#e9d5ff",
        };
    });

const makeBlobs = (base, seedOffset = 0) => {
    const count = Math.floor(Math.random() * 4) + 4;
    return Array.from({ length: count }, (_, i) => {
        const isBase = i === 0;
        const angle  = (i / count) * Math.PI * 1.4 + seedOffset;
        const spread = base * (0.55 + Math.random() * 0.5);
        return {
            x: isBase ? base * 0.08 : base * 0.5 + Math.cos(angle) * spread * 0.6,
            y: isBase ? base * 0.2  : base * 0.3 + Math.sin(angle) * spread * 0.28,
            w: isBase ? base * 0.88 : base * (Math.random() * 0.4 + 0.3),
            h: isBase ? base * 0.52 : base * (Math.random() * 0.32 + 0.25),
            blurExtra: Math.random() * 3,
        };
    });
};

const generateClouds = (count, yMin, yMax, sizeMin, sizeMax, speedMin, speedMax) =>
    Array.from({ length: count }, (_, i) => {
        const base     = Math.random() * (sizeMax - sizeMin) + sizeMin;
        const duration = Math.random() * (speedMax - speedMin) + speedMin;
        return { y: Math.random() * (yMax - yMin) + yMin, base, blobs: makeBlobs(base, i * 0.7), duration, delay: -(Math.random() * duration), opacity: Math.random() * 0.22 + 0.52 };
    });

const stars      = generateStars(160);
const cloudsFar  = generateClouds(7,  3, 45, 140, 260,  90, 140);
const cloudsMid  = generateClouds(6, 30, 68,  80, 160,  60,  95);
const cloudsNear = generateClouds(8, 55, 96,  45, 110,  35,  65);

function MilkyWay() {
    return (
        <div style={{ position:"absolute", top:"10%", left:"-10%", width:"120%", height:"45%", background:"linear-gradient(105deg,transparent 20%,rgba(139,92,246,0.06) 40%,rgba(167,139,250,0.1) 52%,rgba(109,40,217,0.07) 64%,transparent 80%)", transform:"rotate(-18deg)", pointerEvents:"none", zIndex:1, filter:"blur(18px)" }} />
    );
}

function Nebulae() {
    return (
        <>
            <div style={{ position:"absolute", top:"8%", left:"5%", width:"35%", height:"28%", background:"radial-gradient(ellipse at center,rgba(109,40,217,0.18) 0%,transparent 70%)", filter:"blur(30px)", pointerEvents:"none", zIndex:1 }} />
            <div style={{ position:"absolute", top:"35%", right:"8%", width:"28%", height:"22%", background:"radial-gradient(ellipse at center,rgba(45,212,191,0.1) 0%,transparent 70%)", filter:"blur(24px)", pointerEvents:"none", zIndex:1 }} />
            <div style={{ position:"absolute", bottom:"15%", left:"30%", width:"40%", height:"20%", background:"radial-gradient(ellipse at center,rgba(167,139,250,0.08) 0%,transparent 70%)", filter:"blur(20px)", pointerEvents:"none", zIndex:1 }} />
        </>
    );
}

function SkySelector({ currentMode, onSelect }) {
    const [expanded, setExpanded] = useState(false);
    return (
        <div style={{
            position: "fixed",
            top: "max(20px, env(safe-area-inset-top, 20px))",
            left: "max(20px, env(safe-area-inset-left, 20px))",
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
            gap: "8px",
        }}>
            <motion.button onClick={() => setExpanded(e => !e)} whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                style={{ display:"flex", alignItems:"center", gap:"7px", padding:"7px 12px 7px 8px", borderRadius:"20px", background:"rgba(5,1,18,0.6)", backdropFilter:"blur(12px)", border:"1px solid rgba(167,139,250,0.35)", boxShadow:"0 2px 12px rgba(109,40,217,0.3)", cursor:"pointer" }}>
                <div style={{ width:20, height:20, borderRadius:"50%", flexShrink:0, background:`linear-gradient(to bottom,${SKY_MODES[currentMode].swatch[0]},${SKY_MODES[currentMode].swatch[2]})`, border:"1.5px solid rgba(233,213,255,0.5)" }} />
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", letterSpacing:"1px", textTransform:"uppercase", color:"rgba(233,213,255,0.8)", whiteSpace:"nowrap" }}>{SKY_MODES[currentMode].icon} cielo</span>
            </motion.button>
            <AnimatePresence>
                {expanded && (
                    <motion.div initial={{ opacity:0, y:-8, scale:0.92 }} animate={{ opacity:1, y:0, scale:1 }} exit={{ opacity:0, y:-8, scale:0.92 }} transition={{ duration:0.2, ease:"easeOut" }}
                        style={{ display:"flex", flexDirection:"column", gap:"6px", background:"rgba(5,1,18,0.75)", backdropFilter:"blur(16px)", border:"1px solid rgba(167,139,250,0.2)", borderRadius:"16px", padding:"10px" }}>
                        {MODE_KEYS.map(key => {
                            const mode = SKY_MODES[key];
                            const isActive = currentMode === key;
                            return (
                                <motion.button key={key} onClick={() => { onSelect(key); setExpanded(false); }} whileHover={{ x:3 }}
                                    style={{ display:"flex", alignItems:"center", gap:"10px", background:isActive?"rgba(139,92,246,0.25)":"transparent", border:isActive?"1px solid rgba(167,139,250,0.4)":"1px solid transparent", borderRadius:"10px", padding:"6px 10px", cursor:"pointer", transition:"all 0.2s" }}>
                                    <div style={{ width:22, height:22, borderRadius:"50%", flexShrink:0, background:`linear-gradient(to bottom,${mode.swatch[0]},${mode.swatch[2]})`, border:isActive?"2px solid rgba(233,213,255,0.7)":"1.5px solid rgba(167,139,250,0.3)", boxShadow:isActive?"0 0 8px rgba(167,139,250,0.5)":"none" }} />
                                    <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", letterSpacing:"1.5px", textTransform:"uppercase", color:isActive?"#e9d5ff":"rgba(196,165,253,0.65)", whiteSpace:"nowrap" }}>{mode.icon} {key}</span>
                                </motion.button>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function App() {
    const [modeKey, setModeKey] = useState(getInitialMode);
    const [section, setSection] = useState("hero");

    const sky     = SKY_MODES[modeKey];
    const isNight = sky.label === "noche";
    const isDark  = sky.label === "noche" || sky.label === "atardecer" || sky.label === "amanecer";
    const isDaytime = sky.label === "mediodia";

    const renderClouds = (list, blurBase, zIdx, opacityMult = 1) => {
        if (isNight) return null;
        return list.map((cloud, i) => {
            const cloudW = cloud.base * 2.4;
            return (
                <motion.div key={i} initial={{ x:-cloudW-80 }} animate={{ x:"120vw" }}
                    transition={{ duration:cloud.duration, repeat:Infinity, ease:"linear", delay:cloud.delay }}
                    style={{ position:"absolute", top:`${cloud.y}%`, zIndex:zIdx, pointerEvents:"none" }}>
                    <div style={{ position:"relative", width:cloudW, height:cloud.base*0.9 }}>
                        {cloud.blobs.map((blob, bi) => (
                            <div key={bi} style={{ position:"absolute", left:blob.x, top:blob.y, width:blob.w, height:blob.h, borderRadius:"50%",
                                background:bi===0?"rgba(248,240,255,0.92)":bi%3===0?"rgba(230,215,255,0.78)":"rgba(240,228,255,0.84)",
                                opacity:cloud.opacity*opacityMult*(bi===0?1:0.82-bi*0.04),
                                filter:`blur(${blurBase+blob.blurExtra-bi*0.5}px)` }} />
                        ))}
                    </div>
                </motion.div>
            );
        });
    };

    return (
        <>
            <SkySelector currentMode={modeKey} onSelect={setModeKey} />

            {/* CIELO FIJO */}
            <div style={{ position:"fixed", top:0, left:0, right:0, bottom:0, background:`linear-gradient(to bottom,${sky.top} 0%,${sky.mid} 45%,${sky.bottom} 100%)`, transition:"background 2s ease", zIndex:0, overflow:"hidden" }}>
                {isNight && <MilkyWay />}
                {isNight && <Nebulae />}

                <motion.div initial={false} animate={{ opacity:isDaytime?1:0, scale:isDaytime?[1,1.04,1]:0.8 }}
                    transition={{ opacity:{duration:1.5}, scale:isDaytime?{duration:8,repeat:Infinity,ease:"easeInOut"}:{duration:1.5} }}
                    style={{ position:"absolute", top:"8%", right:"11%", width:56, height:56, borderRadius:"50%", background:"radial-gradient(circle at 40% 35%,#ffe4f0,#f9a8d4)", boxShadow:"0 0 60px 25px rgba(249,168,212,0.45),0 0 120px 50px rgba(167,139,250,0.2)", zIndex:2, pointerEvents:"none" }} />

                <motion.div initial={false} animate={{ opacity:!isDaytime?1:0, scale:!isDaytime?[1,1.03,1]:0.8 }}
                    transition={{ opacity:{duration:1.5}, scale:!isDaytime?{duration:9,repeat:Infinity,ease:"easeInOut"}:{duration:1.5} }}
                    style={{ position:"absolute", top:"9%", right:"12%", width:44, height:44, borderRadius:"50%", background:"radial-gradient(circle at 32% 28%,#f5efff,#c4b5fd)", boxShadow:"0 0 40px 16px rgba(167,139,250,0.35),0 0 80px 30px rgba(109,40,217,0.15)", zIndex:2, overflow:"hidden", pointerEvents:"none" }}>
                    <div style={{ position:"absolute", width:"24%", height:"24%", borderRadius:"50%", background:"rgba(139,92,246,0.22)", top:"26%", left:"20%" }} />
                    <div style={{ position:"absolute", width:"16%", height:"16%", borderRadius:"50%", background:"rgba(139,92,246,0.16)", top:"56%", left:"54%" }} />
                    <div style={{ position:"absolute", width:"11%", height:"11%", borderRadius:"50%", background:"rgba(139,92,246,0.14)", top:"36%", left:"64%" }} />
                    <div style={{ position:"absolute", width:"8%",  height:"8%",  borderRadius:"50%", background:"rgba(139,92,246,0.12)", top:"68%", left:"28%" }} />
                </motion.div>

                {!isDaytime && (
                    <motion.div initial={{ opacity:0 }} animate={{ opacity:0.5 }} transition={{ duration:2 }}
                        style={{ position:"absolute", top:"4%", right:"7%", width:120, height:120, borderRadius:"50%", background:"radial-gradient(circle,rgba(196,165,253,0.12) 0%,transparent 70%)", filter:"blur(8px)", zIndex:1, pointerEvents:"none" }} />
                )}

                {(sky.label==="noche"||sky.label==="amanecer"||sky.label==="atardecer") &&
                    stars.map(star => {
                        const modeMult = sky.label==="noche"?1:sky.label==="atardecer"?0.35:0.2;
                        const showStar = isNight||star.layer==="near"||(star.layer==="mid"&&star.id%3===0);
                        if (!showStar) return null;
                        const opacityMax = star.opacity * modeMult;
                        return (
                            <motion.div key={star.id}
                                animate={{ opacity:[opacityMax*0.5,opacityMax,opacityMax*0.5], scale:star.layer==="near"?[1,1.15,1]:[1,1.05,1] }}
                                transition={{ duration:star.duration, repeat:Infinity, ease:"easeInOut", delay:star.delay }}
                                style={{ position:"absolute", left:`${star.x}%`, top:`${star.y}%`,
                                    width:star.layer==="near"?star.size*1.6:star.size, height:star.layer==="near"?star.size*1.6:star.size,
                                    borderRadius:"50%", background:star.color,
                                    boxShadow:isNight&&star.layer==="near"?`0 0 ${star.size*3}px ${star.size}px rgba(196,165,253,0.55)`:isNight&&star.layer==="mid"?`0 0 ${star.size*2}px ${star.size*0.5}px rgba(196,165,253,0.3)`:"none",
                                    zIndex:star.layer==="near"?3:star.layer==="mid"?2:1 }} />
                        );
                    })
                }

                {renderClouds(cloudsFar,  9, 2, 0.85)}
                {renderClouds(cloudsMid,  7, 3, 0.95)}
                {renderClouds(cloudsNear, 5, 4, 0.75)}
            </div>

            {/* CONTENIDO */}
            <AnimatePresence mode="wait">
                {section === "hero" && (
                    <div key="hero" style={{ position:"relative", zIndex:1 }}>
                        <Hero
                            sky={sky}
                            onNameClick={() => setSection("sobremi")}
                        />
                        <Projects    sky={sky} />
                        <Habilidades sky={sky} />
                        <Contacto    sky={sky} />
                    </div>
                )}
                {section === "sobremi" && (
                    <SobreMi
                        key="sobremi"
                        sky= {sky}
                        isNight={isNight}
                        onBack={() => setSection("hero")}
                    />
                )}
            </AnimatePresence>
        </>
    );
}