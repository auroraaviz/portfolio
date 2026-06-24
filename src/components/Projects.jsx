import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
    {
        id: 0, number: "01", name: "Turistea",
        description: "Agencia de viajes fullstack en equipo durante las prácticas en Zaitec. Diseño visual, branding y logotipo de autoría propia.",
        stack: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
        github: "https://github.com/auroraaviz/turistea-agencia-viajes",
        demo: null, tag: "Proyecto estrella",
        x: 15, y: 22, starX: 18, starY: 22,
        // Posición en el canvas móvil (%) — distribuidas para que no se solapen
        mobileStarX: 28, mobileStarY: 16,
        cloud: { w: 280, h: 160,
            blobs: [
                { l:"3%",  t:"28%",  w:"90%", h:"60%", blur:18 },
                { l:"18%", t:"-25%", w:"58%", h:"72%", blur:16 },
                { l:"0%",  t:"-4%",  w:"40%", h:"55%", blur:14 },
                { l:"54%", t:"-4%",  w:"38%", h:"50%", blur:14 },
                { l:"28%", t:"-38%", w:"32%", h:"42%", blur:12 },
            ],
        },
    },
    {
        id: 1, number: "02", name: "Superverde",
        description: "Supermercado vegano online con diseño visual propio desde cero. Identidad de marca, banners y maquetación completa.",
        stack: ["HTML5", "CSS3", "JavaScript"],
        github: "https://github.com/auroraaviz/superverde_SupermercadoVegano",
        demo: "https://auroraaviz.github.io/superverde_SupermercadoVegano/",
        tag: "Diseño propio",
        x: 58, y: 15, starX: 55, starY: 18,
        mobileStarX: 72, mobileStarY: 11,
        cloud: { w: 300, h: 120,
            blobs: [
                { l:"2%",  t:"32%",  w:"94%", h:"58%", blur:18 },
                { l:"8%",  t:"-12%", w:"42%", h:"55%", blur:15 },
                { l:"42%", t:"-10%", w:"40%", h:"52%", blur:15 },
                { l:"66%", t:"6%",   w:"28%", h:"40%", blur:13 },
                { l:"-2%", t:"10%",  w:"24%", h:"38%", blur:13 },
            ],
        },
    },
    {
        id: 2, number: "03", name: "DavanteDent",
        description: "Gestión de citas para clínica dental. CRUD completo con JavaScript vanilla, cookies, sin frameworks ni dependencias.",
        stack: ["JavaScript", "HTML5", "CSS3"],
        github: "https://github.com/auroraaviz/DavanteDent---Gesti-n-de-citas",
        demo: "https://auroraaviz.github.io/DavanteDent---Gesti-n-de-citas/",
        tag: "Demo en vivo",
        x: 78, y: 50, starX: 78, starY: 42,
        mobileStarX: 80, mobileStarY: 42,
        cloud: { w: 240, h: 140,
            blobs: [
                { l:"5%",  t:"26%",  w:"88%", h:"60%", blur:16 },
                { l:"16%", t:"-20%", w:"45%", h:"62%", blur:15 },
                { l:"50%", t:"-14%", w:"38%", h:"55%", blur:14 },
                { l:"-4%", t:"8%",   w:"30%", h:"44%", blur:13 },
            ],
        },
    },
    {
        id: 3, number: "04", name: "Zapatillas",
        description: "E-commerce de zapatillas con catálogo, carrito y gestión de pedidos. Backend en PHP con base de datos MySQL.",
        stack: ["PHP", "MySQL", "HTML5", "CSS3"],
        github: "https://github.com/auroraaviz/tienda-Zapatillas-",
        demo: null, tag: "Fullstack",
        x: 30, y: 62, starX: 35, starY: 62,
        mobileStarX: 22, mobileStarY: 58,
        cloud: { w: 290, h: 145,
            blobs: [
                { l:"3%",  t:"26%",  w:"84%", h:"60%", blur:18 },
                { l:"12%", t:"-18%", w:"46%", h:"64%", blur:16 },
                { l:"48%", t:"-2%",  w:"48%", h:"68%", blur:15 },
                { l:"-1%", t:"12%",  w:"24%", h:"40%", blur:13 },
                { l:"32%", t:"-30%", w:"24%", h:"36%", blur:12 },
            ],
        },
    },
    {
        id: 4, number: "05", name: "Menta",
        description: "Web corporativa para empresa ficticia de diseño gráfico. Primer proyecto académico — maquetación HTML y CSS desde cero.",
        stack: ["HTML5", "CSS3"],
        github: "https://github.com/auroraaviz/pagina-web-ficticia_MENTA",
        demo: null, tag: "Maquetación",
        x: 62, y: 72, starX: 67, starY: 70,
        mobileStarX: 60, mobileStarY: 74,
        cloud: { w: 210, h: 118,
            blobs: [
                { l:"7%",  t:"28%",  w:"84%", h:"58%", blur:15 },
                { l:"20%", t:"-18%", w:"48%", h:"62%", blur:14 },
                { l:"55%", t:"-8%",  w:"32%", h:"48%", blur:13 },
                { l:"2%",  t:"6%",   w:"24%", h:"38%", blur:12 },
            ],
        },
    },
];

const constellationLines = [[0,1],[1,2],[2,4],[0,3],[3,4],[1,3]];

const stackColors = {
    "PHP":        { bg:"rgba(109,40,217,0.18)", border:"rgba(139,92,246,0.5)",  text:"rgba(55,8,130,0.95)" },
    "MySQL":      { bg:"rgba(29,78,216,0.14)",  border:"rgba(59,130,246,0.45)", text:"rgba(10,38,130,0.95)" },
    "JavaScript": { bg:"rgba(133,77,14,0.14)",  border:"rgba(202,138,4,0.45)",  text:"rgba(95,48,0,0.95)"  },
    "Bootstrap":  { bg:"rgba(109,40,217,0.14)", border:"rgba(139,92,246,0.4)",  text:"rgba(55,8,130,0.9)"  },
    "HTML5":      { bg:"rgba(154,52,18,0.14)",  border:"rgba(234,88,12,0.4)",   text:"rgba(115,38,0,0.95)" },
    "CSS3":       { bg:"rgba(3,105,161,0.14)",  border:"rgba(14,165,233,0.4)",  text:"rgba(4,65,115,0.95)" },
};

function useIsMobile() {
    const [v, setV] = useState(() => typeof window !== "undefined" ? window.innerWidth < 768 : false);
    useEffect(() => {
        const h = () => setV(window.innerWidth < 768);
        window.addEventListener("resize", h);
        return () => window.removeEventListener("resize", h);
    }, []);
    return v;
}

function ShootingStar() {
    const [visible, setVisible] = useState(false);
    const [pos, setPos] = useState({ x:0, y:0, angle:0 });
    useEffect(() => {
        const spawn = () => {
            setPos({ x:Math.random()*75+5, y:Math.random()*35+3, angle:Math.random()*20+18 });
            setVisible(true);
            setTimeout(() => setVisible(false), 750);
        };
        const t = setTimeout(() => {
            spawn();
            const iv = setInterval(() => { if (Math.random()>0.35) spawn(); }, Math.random()*9000+7000);
            return () => clearInterval(iv);
        }, Math.random()*4000+2000);
        return () => clearTimeout(t);
    }, []);
    if (!visible) return null;
    return (
        <motion.div
            initial={{ opacity:0, scaleX:0 }}
            animate={{ opacity:[0,1,0.6,0], scaleX:[0,1,1] }}
            transition={{ duration:0.65, ease:"easeOut" }}
            style={{
                position:"absolute", left:`${pos.x}%`, top:`${pos.y}%`,
                width:100, height:1.5, transformOrigin:"left center",
                transform:`rotate(${pos.angle}deg)`,
                background:"linear-gradient(to right,rgba(255,255,255,0.9),rgba(196,165,253,0.7),transparent)",
                pointerEvents:"none", zIndex:10, borderRadius:"1px",
            }}
        />
    );
}

function StackPill({ tech }) {
    const c = stackColors[tech] || { bg:"rgba(109,40,217,0.12)", border:"rgba(139,92,246,0.4)", text:"rgba(55,8,130,0.9)" };
    return (
        <span style={{
            padding:"3px 10px", borderRadius:"20px",
            background:c.bg, border:`1px solid ${c.border}`,
            fontFamily:"'DM Mono',monospace", fontSize:"9px", fontWeight:"500",
            color:c.text, letterSpacing:"0.2px", display:"inline-block",
        }}>{tech}</span>
    );
}

function ProjectContent({ project }) {
    return (
        <div style={{ display:"flex", flexDirection:"column", gap:"9px" }}>
            <div style={{ display:"flex", alignItems:"baseline", gap:"6px" }}>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"9px", color:"rgba(100,40,200,0.5)" }}>{project.number}</span>
                <span style={{ fontFamily:"'Syne',sans-serif", fontSize:"0.98rem", fontWeight:"700", color:"rgba(25,5,75,0.95)", lineHeight:1.2 }}>{project.name}</span>
            </div>
            <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:"0.68rem", color:"rgba(45,8,95,0.8)", lineHeight:1.65, margin:0 }}>
                {project.description}
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"4px" }}>
                {project.stack.map(t => <StackPill key={t} tech={t}/>)}
            </div>
            <div style={{ display:"flex", gap:"6px" }}>
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    style={{ flex:1, textAlign:"center", padding:"6px 0", borderRadius:"8px",
                        border:"1px solid rgba(109,40,217,0.35)", background:"rgba(109,40,217,0.1)",
                        color:"rgba(50,5,120,0.9)", textDecoration:"none",
                        fontFamily:"'Poppins',sans-serif", fontSize:"10px", fontWeight:"500" }}>GitHub</a>
                {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        style={{ flex:1, textAlign:"center", padding:"6px 0", borderRadius:"8px",
                            border:"1px solid rgba(109,40,217,0.35)", background:"rgba(109,40,217,0.16)",
                            color:"rgba(50,5,120,0.9)", textDecoration:"none",
                            fontFamily:"'Poppins',sans-serif", fontSize:"10px", fontWeight:"500" }}>Demo →</a>
                )}
            </div>
        </div>
    );
}

function ProjectContentDark({ project }) {
    return (
        <div style={{ display:"flex", flexDirection:"column", gap:"9px" }}>
            <div style={{ display:"flex", alignItems:"baseline", gap:"6px" }}>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"9px", color:"rgba(196,165,253,0.55)" }}>{project.number}</span>
                <span style={{ fontFamily:"'Syne',sans-serif", fontSize:"0.98rem", fontWeight:"700", color:"#fff", lineHeight:1.2 }}>{project.name}</span>
            </div>
            <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:"0.68rem", color:"rgba(220,200,255,0.85)", lineHeight:1.65, margin:0 }}>
                {project.description}
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"4px" }}>
                {project.stack.map(t => (
                    <span key={t} style={{ padding:"3px 9px", borderRadius:"20px",
                        background:"rgba(139,92,246,0.32)", border:"1px solid rgba(167,139,250,0.5)",
                        fontFamily:"'DM Mono',monospace", fontSize:"9px", color:"#ede9fe" }}>{t}</span>
                ))}
            </div>
            <div style={{ display:"flex", gap:"6px" }}>
                <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}
                    style={{ flex:1, textAlign:"center", padding:"6px 0", borderRadius:"8px",
                        border:"1px solid rgba(167,139,250,0.45)", background:"rgba(109,40,217,0.32)",
                        color:"#e9d5ff", textDecoration:"none", fontFamily:"'Poppins',sans-serif", fontSize:"10px", fontWeight:"500" }}>GitHub</a>
                {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}
                        style={{ flex:1, textAlign:"center", padding:"6px 0", borderRadius:"8px",
                            border:"1px solid rgba(167,139,250,0.45)", background:"rgba(139,92,246,0.5)",
                            color:"#e9d5ff", textDecoration:"none", fontFamily:"'Poppins',sans-serif", fontSize:"10px", fontWeight:"500" }}>Demo →</a>
                )}
            </div>
        </div>
    );
}

// ─── CloudCard (desktop) ───────────────────────────────────────────────────────
function CloudCard({ project, isOpen, isHover, onOpen, onClose, onEnter, onLeave, scale = 1 }) {
    const { cloud } = project;
    const bw = cloud.w * scale;
    const bh = cloud.h * scale;
    const openW = Math.max(bw * 1.55, 240 * scale);
    const openH = Math.max(bh * 2.2,  200 * scale);
    const w = isOpen ? openW : (isHover ? bw * 1.05 : bw);
    const h = isOpen ? openH : (isHover ? bh * 1.05 : bh);
    const shadow = isOpen
        ? "drop-shadow(0 18px 44px rgba(100,30,220,0.35)) drop-shadow(0 4px 12px rgba(80,20,180,0.2)) drop-shadow(0 0 40px rgba(139,92,246,0.5))"
        : isHover
            ? "drop-shadow(0 12px 28px rgba(100,30,200,0.28)) drop-shadow(0 0 28px rgba(139,92,246,0.55)) drop-shadow(0 0 60px rgba(167,139,250,0.25))"
            : "drop-shadow(0 7px 18px rgba(100,30,200,0.16))";
    return (
        <motion.div
            onClick={isOpen ? onClose : onOpen}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            animate={{ width:w, height:h }}
            transition={{ type:"spring", stiffness:155, damping:26 }}
            style={{ position:"relative", cursor:"pointer", zIndex: isOpen ? 20 : isHover ? 10 : 5, filter:shadow, transition:"filter 0.35s ease" }}
        >
            <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
                {cloud.blobs.map((b, i) => (
                    <div key={i} style={{
                        position:"absolute", left:b.l, top:b.t, width:b.w, height:b.h,
                        borderRadius:"50%",
                        background: i === 0 ? "rgba(250,246,255,0.95)" : "rgba(243,235,255,0.90)",
                        filter:`blur(${b.blur * scale}px)`,
                    }}/>
                ))}
                <div style={{
                    position:"absolute", left:"28%", top:"-20%",
                    width:"36%", height:"20%", borderRadius:"50%",
                    background:"rgba(255,255,255,0.78)",
                    filter:`blur(${6 * scale}px)`,
                    opacity: isHover || isOpen ? 1 : 0.58,
                    transition:"opacity 0.3s", pointerEvents:"none",
                }}/>
            </div>
            <motion.div
                animate={{ opacity: isOpen ? 0 : 1 }}
                transition={{ duration:0.15 }}
                style={{
                    position:"absolute", inset:0, zIndex:10,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    paddingTop:`${bh * 0.08}px`, pointerEvents:"none",
                }}
            >
                <span style={{
                    fontFamily:"'Syne',sans-serif",
                    fontSize:`${Math.max(bw * 0.072, 10)}px`,
                    fontWeight:"700",
                    color: isHover ? "rgba(35,5,100,1)" : "rgba(55,12,120,0.86)",
                    textAlign:"center", padding:"0 14px",
                    transition:"color 0.3s", userSelect:"none",
                }}>{project.name}</span>
            </motion.div>
            <motion.div
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ duration:0.26, delay: isOpen ? 0.2 : 0 }}
                style={{
                    position:"absolute", top:"22%", left:"14%", right:"14%", bottom:"16%",
                    zIndex:11,
                    display:"flex", flexDirection:"column", justifyContent:"center",
                    overflow:"hidden", pointerEvents: isOpen ? "auto" : "none",
                }}
            >
                <ProjectContent project={project}/>
            </motion.div>
        </motion.div>
    );
}

// ─── DESKTOP DÍA ──────────────────────────────────────────────────────────────
function DesktopDayProjects({ projects }) {
    const [openId, setOpenId]   = useState(null);
    const [hoverId, setHoverId] = useState(null);
    return (
        <div style={{ position:"relative", width:"100%", height:"88vh", minHeight:620 }}>
            {projects.map(project => {
                const isOpen  = openId  === project.id;
                const isHover = hoverId === project.id;
                return (
                    <motion.div key={project.id}
                        animate={!isOpen ? { y:[0,-8,0] } : { y:0 }}
                        transition={!isOpen ? { duration:3.0+project.id*0.5, repeat:Infinity, ease:"easeInOut", delay:project.id*0.6 } : { duration:0.4 }}
                        style={{ position:"absolute", left:`${project.x}%`, top:`${project.y}%`, transform:"translate(-50%,-50%)" }}
                    >
                        <CloudCard project={project} isOpen={isOpen} isHover={isHover}
                            onOpen={() => setOpenId(project.id)} onClose={() => setOpenId(null)}
                            onEnter={() => setHoverId(project.id)} onLeave={() => setHoverId(null)}/>
                    </motion.div>
                );
            })}
        </div>
    );
}

// ─── MÓVIL DÍA — nubes en canvas 2D flotando, misma filosofía que desktop ─────
function MobileDayProjects({ projects }) {
    const [openId, setOpenId]   = useState(null);
    const [hoverId, setHoverId] = useState(null);

    // Posiciones adaptadas al viewport estrecho (distribuidas manualmente, sin solapamientos)
    const mobilePositions = [
        { x: 12, y: 8  },   // Turistea — arriba izquierda
        { x: 52, y: 4  },   // Superverde — arriba derecha
        { x: 62, y: 36 },   // DavanteDent — centro derecha
        { x: 8,  y: 48 },   // Zapatillas — centro izquierda
        { x: 38, y: 68 },   // Menta — abajo centro
    ];

    // Scale de nube para móvil: más pequeño pero suficiente para leer el nombre
    const CLOUD_SCALE = 0.68;

    return (
        // Canvas con altura fija + scroll si se expande alguna tarjeta
        <div style={{
            position: "relative",
            width: "100%",
            // Altura base del canvas: caben todas las nubes + margen
            minHeight: 480,
            height: 480,
            overflow: "visible",
        }}>
            {projects.map((project, idx) => {
                const pos    = mobilePositions[idx];
                const isOpen  = openId  === project.id;
                const isHover = hoverId === project.id;

                const { cloud } = project;
                const bw = cloud.w * CLOUD_SCALE;
                const bh = cloud.h * CLOUD_SCALE;
                const openW = Math.max(bw * 1.6, 220);
                const openH = Math.max(bh * 2.4, 210);
                const w = isOpen ? openW : bw;
                const h = isOpen ? openH : bh;

                const shadow = isOpen
                    ? "drop-shadow(0 14px 36px rgba(100,30,220,0.38)) drop-shadow(0 0 32px rgba(139,92,246,0.5))"
                    : "drop-shadow(0 6px 14px rgba(100,30,200,0.18))";

                return (
                    <motion.div
                        key={project.id}
                        // Flotar igual que desktop
                        animate={!isOpen ? { y: [0, -6, 0] } : { y: 0 }}
                        transition={!isOpen
                            ? { duration: 3.2 + project.id * 0.5, repeat: Infinity, ease: "easeInOut", delay: project.id * 0.55 }
                            : { duration: 0.4 }}
                        style={{
                            position: "absolute",
                            left: `${pos.x}%`,
                            top: `${pos.y}%`,
                            // Anclar por el centro de la nube
                            transform: "translate(-50%, -50%)",
                            zIndex: isOpen ? 30 : 5,
                        }}
                    >
                        {/* Nube — igual que CloudCard pero inline para control total */}
                        <motion.div
                            onClick={() => setOpenId(isOpen ? null : project.id)}
                            onMouseEnter={() => setHoverId(project.id)}
                            onMouseLeave={() => setHoverId(null)}
                            animate={{ width: w, height: h }}
                            transition={{ type: "spring", stiffness: 150, damping: 26 }}
                            style={{
                                position: "relative", cursor: "pointer",
                                filter: shadow, transition: "filter 0.3s ease",
                            }}
                        >
                            {/* Blobs */}
                            <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
                                {cloud.blobs.map((b, i) => (
                                    <div key={i} style={{
                                        position:"absolute", left:b.l, top:b.t, width:b.w, height:b.h,
                                        borderRadius:"50%",
                                        background: i === 0 ? "rgba(250,246,255,0.95)" : "rgba(243,235,255,0.90)",
                                        filter:`blur(${b.blur * CLOUD_SCALE}px)`,
                                    }}/>
                                ))}
                                <div style={{
                                    position:"absolute", left:"28%", top:"-20%",
                                    width:"36%", height:"20%", borderRadius:"50%",
                                    background:"rgba(255,255,255,0.78)",
                                    filter:`blur(${5}px)`, opacity:0.7, pointerEvents:"none",
                                }}/>
                            </div>

                            {/* Nombre — visible en cerrado */}
                            <motion.div
                                animate={{ opacity: isOpen ? 0 : 1 }}
                                transition={{ duration: 0.15 }}
                                style={{
                                    position:"absolute", inset:0, zIndex:10,
                                    display:"flex", alignItems:"center", justifyContent:"center",
                                    paddingTop:`${bh * 0.08}px`, pointerEvents:"none",
                                }}
                            >
                                <span style={{
                                    fontFamily:"'Syne',sans-serif",
                                    fontSize:`${Math.max(bw * 0.075, 10)}px`,
                                    fontWeight:"700",
                                    color:"rgba(55,12,120,0.88)",
                                    textAlign:"center", padding:"0 10px",
                                    userSelect:"none",
                                }}>{project.name}</span>
                            </motion.div>

                            {/* Contenido expandido */}
                            <motion.div
                                animate={{ opacity: isOpen ? 1 : 0 }}
                                transition={{ duration: 0.24, delay: isOpen ? 0.18 : 0 }}
                                style={{
                                    position:"absolute",
                                    top:"20%", left:"12%", right:"12%", bottom:"14%",
                                    zIndex:11,
                                    display:"flex", flexDirection:"column", justifyContent:"center",
                                    overflow:"hidden",
                                    pointerEvents: isOpen ? "auto" : "none",
                                }}
                            >
                                <ProjectContent project={project}/>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                );
            })}
        </div>
    );
}

// ─── DESKTOP NOCHE ────────────────────────────────────────────────────────────
function DesktopNightProjects({ projects }) {
    const [openId, setOpenId]   = useState(null);
    const [hoverId, setHoverId] = useState(null);
    const lineDelays = useMemo(() => constellationLines.map((_,i) => i*0.3), []);
    return (
        <div style={{ position:"relative", width:"100%", height:"88vh", minHeight:620 }}>
            <ShootingStar/>
            <svg style={{ position:"absolute",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:1,overflow:"visible" }}>
                <defs>
                    <filter id="lg" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2" result="b"/>
                        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                    <filter id="lgs" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="1" result="b"/>
                        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                </defs>
                {constellationLines.map(([a,b],i) => {
                    const pa=projects[a], pb=projects[b], isMain=i<2;
                    return (
                        <g key={i}>
                            <motion.line x1={`${pa.starX}%`} y1={`${pa.starY}%`} x2={`${pb.starX}%`} y2={`${pb.starY}%`}
                                stroke="rgba(167,139,250,0.12)" strokeWidth={isMain?"4":"2.5"} strokeLinecap="round" filter="url(#lgs)"
                                initial={{opacity:0}} animate={{opacity:1}} transition={{delay:lineDelays[i]+0.4,duration:1.2}}/>
                            <motion.line x1={`${pa.starX}%`} y1={`${pa.starY}%`} x2={`${pb.starX}%`} y2={`${pb.starY}%`}
                                stroke={isMain?"rgba(196,165,253,0.45)":"rgba(196,165,253,0.3)"}
                                strokeWidth={isMain?"1.2":"0.8"} strokeDasharray={isMain?"none":"4 6"}
                                strokeLinecap="round" filter="url(#lg)"
                                initial={{opacity:0,pathLength:0}} animate={{opacity:1,pathLength:1}}
                                transition={{delay:lineDelays[i],duration:1.5,ease:"easeOut"}}/>
                        </g>
                    );
                })}
            </svg>
            {projects.map(project => {
                const isOpen=openId===project.id, isHover=hoverId===project.id;
                const sz=isHover?20:11, gr=isHover?55:26;
                return (
                    <div key={project.id} style={{ position:"absolute",left:`${project.starX}%`,top:`${project.starY}%`,transform:"translate(-50%,-50%)",zIndex:isOpen?20:5 }}>
                        <motion.div animate={{opacity:[0.15,0.45,0.15],scale:[0.9,1.15,0.9]}}
                            transition={{duration:3+project.id*0.45,repeat:Infinity,ease:"easeInOut"}}
                            style={{ position:"absolute",top:"50%",left:"50%",width:gr*2,height:gr*2,transform:"translate(-50%,-50%)",borderRadius:"50%",
                                background:"radial-gradient(circle,rgba(196,165,253,0.4) 0%,rgba(139,92,246,0.15) 50%,transparent 75%)",pointerEvents:"none" }}/>
                        <motion.div animate={{scale:[1,1.25,1],opacity:[0.85,1,0.85]}}
                            transition={{duration:2.5+project.id*0.4,repeat:Infinity,ease:"easeInOut"}}
                            onClick={()=>setOpenId(isOpen?null:project.id)}
                            onMouseEnter={()=>setHoverId(project.id)} onMouseLeave={()=>setHoverId(null)}
                            style={{ position:"relative",width:sz,height:sz,borderRadius:"50%",
                                background:"radial-gradient(circle at 35% 35%,#ffffff,#e9d5ff)",
                                boxShadow:isHover?"0 0 22px 8px rgba(196,165,253,0.85),0 0 50px 18px rgba(139,92,246,0.4)":"0 0 10px 3px rgba(196,165,253,0.65),0 0 22px 6px rgba(139,92,246,0.25)",
                                cursor:"pointer",transition:"all 0.3s",zIndex:2 }}/>
                        <AnimatePresence>
                            {isHover&&!isOpen&&(
                                <motion.div initial={{opacity:0,scale:0.6}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.6}}
                                    style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none",zIndex:3}}>
                                    {[0,90,45,135].map((angle,ri)=>(
                                        <div key={ri} style={{position:"absolute",top:"50%",left:"50%",width:32,height:1.5,
                                            transform:`translate(-50%,-50%) rotate(${angle}deg)`,
                                            background:"linear-gradient(to right,transparent,rgba(233,213,255,0.85),transparent)",filter:"blur(0.4px)"}}/>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <AnimatePresence>
                            {isHover&&!isOpen&&(
                                <motion.div initial={{opacity:0,y:5}} animate={{opacity:1,y:0}} exit={{opacity:0,y:2}}
                                    style={{position:"absolute",bottom:"calc(100% + 14px)",left:"50%",transform:"translateX(-50%)",whiteSpace:"nowrap",textAlign:"center",pointerEvents:"none",zIndex:10}}>
                                    <span style={{display:"block",fontFamily:"'Syne',sans-serif",fontSize:"13px",fontWeight:"700",color:"#f5f0ff",textShadow:"0 0 16px rgba(167,139,250,1)"}}>{project.name}</span>
                                    <span style={{display:"block",fontFamily:"'DM Mono',monospace",fontSize:"9px",color:"rgba(196,165,253,0.7)",letterSpacing:"2px",textTransform:"uppercase",marginTop:"3px"}}>{project.tag}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <AnimatePresence>
                            {isOpen&&(
                                <motion.div initial={{opacity:0,scale:0.88,y:10}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:0.88,y:5}}
                                    style={{position:"absolute",bottom:"calc(100% + 18px)",left:"50%",transform:"translateX(-50%)",
                                        width:280,background:"rgba(5,1,18,0.94)",backdropFilter:"blur(28px)",
                                        border:"1px solid rgba(167,139,250,0.28)",borderRadius:"18px",padding:"18px",
                                        boxShadow:"0 12px 48px rgba(109,40,217,0.42),inset 0 1px 0 rgba(196,165,253,0.1)",zIndex:30}}>
                                    <div style={{position:"absolute",top:0,left:"15%",right:"15%",height:"1px",background:"linear-gradient(to right,transparent,rgba(196,165,253,0.65),transparent)"}}/>
                                    <ProjectContentDark project={project}/>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}

// ─── MÓVIL NOCHE — constelación 2D en SVG, igual que desktop ─────────────────
function MobileNightProjects({ projects }) {
    const [openId, setOpenId] = useState(null);
    const [hoverId, setHoverId] = useState(null);
    const lineDelays = useMemo(() => constellationLines.map((_, i) => i * 0.3), []);

    const openProject = openId !== null ? projects.find(p => p.id === openId) : null;

    return (
        <div style={{ position: "relative", width: "100%", padding: "0 8px" }}>
            <ShootingStar />

            {/* Canvas de constelación */}
            <div style={{ position: "relative", width: "100%", paddingBottom: "90%" }}>
                <div style={{ position: "absolute", inset: 0 }}>

                    {/* SVG de líneas — capa baja */}
                    <svg
                        style={{
                            position: "absolute", top: 0, left: 0,
                            width: "100%", height: "100%",
                            pointerEvents: "none", zIndex: 1, overflow: "visible",
                        }}
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                    >
                        <defs>
                            <filter id="mgl" x="-30%" y="-30%" width="160%" height="160%">
                                <feGaussianBlur stdDeviation="1.5" result="b"/>
                                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                            </filter>
                            <filter id="mgls" x="-30%" y="-30%" width="160%" height="160%">
                                <feGaussianBlur stdDeviation="0.8" result="b"/>
                                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                            </filter>
                        </defs>
                        {constellationLines.map(([a, b], i) => {
                            const pa = projects[a], pb = projects[b];
                            const isMain = i < 2;
                            return (
                                <g key={i}>
                                    {/* Halo difuso */}
                                    <motion.line
                                        x1={pa.mobileStarX} y1={pa.mobileStarY}
                                        x2={pb.mobileStarX} y2={pb.mobileStarY}
                                        stroke="rgba(167,139,250,0.1)"
                                        strokeWidth={isMain ? "3" : "2"}
                                        strokeLinecap="round"
                                        filter="url(#mgls)"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: lineDelays[i] + 0.4, duration: 1.2 }}
                                    />
                                    {/* Línea principal */}
                                    <motion.line
                                        x1={pa.mobileStarX} y1={pa.mobileStarY}
                                        x2={pb.mobileStarX} y2={pb.mobileStarY}
                                        stroke={isMain ? "rgba(196,165,253,0.45)" : "rgba(196,165,253,0.28)"}
                                        strokeWidth={isMain ? "0.9" : "0.6"}
                                        strokeDasharray={isMain ? "none" : "3 5"}
                                        strokeLinecap="round"
                                        filter="url(#mgl)"
                                        initial={{ opacity: 0, pathLength: 0 }}
                                        animate={{ opacity: 1, pathLength: 1 }}
                                        transition={{ delay: lineDelays[i], duration: 1.5, ease: "easeOut" }}
                                    />
                                </g>
                            );
                        })}
                    </svg>

                    {/* Estrellas — posicionadas en % sobre el contenedor */}
                    {projects.map(project => {
                        const isOpen  = openId  === project.id;
                        const isHover = hoverId === project.id;
                        const sz = isOpen || isHover ? 16 : 9;

                        return (
                            <div
                                key={project.id}
                                style={{
                                    position: "absolute",
                                    left: `${project.mobileStarX}%`,
                                    top:  `${project.mobileStarY}%`,
                                    transform: "translate(-50%, -50%)",
                                    zIndex: isOpen ? 20 : 5,
                                }}
                            >
                                {/* Halo pulsante */}
                                <motion.div
                                    animate={{ opacity: [0.15, 0.4, 0.15], scale: [0.9, 1.2, 0.9] }}
                                    transition={{ duration: 3 + project.id * 0.4, repeat: Infinity, ease: "easeInOut" }}
                                    style={{
                                        position: "absolute", top: "50%", left: "50%",
                                        width: 40, height: 40, transform: "translate(-50%,-50%)",
                                        borderRadius: "50%",
                                        background: "radial-gradient(circle,rgba(196,165,253,0.4) 0%,rgba(139,92,246,0.15) 50%,transparent 75%)",
                                        pointerEvents: "none",
                                    }}
                                />

                                {/* Punto estrella — tappable */}
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.85, 1, 0.85] }}
                                    transition={{ duration: 2.5 + project.id * 0.4, repeat: Infinity, ease: "easeInOut" }}
                                    onClick={() => setOpenId(isOpen ? null : project.id)}
                                    onMouseEnter={() => setHoverId(project.id)}
                                    onMouseLeave={() => setHoverId(null)}
                                    style={{
                                        position: "relative",
                                        width: sz, height: sz, borderRadius: "50%",
                                        background: "radial-gradient(circle at 35% 35%,#ffffff,#e9d5ff)",
                                        boxShadow: isOpen || isHover
                                            ? "0 0 18px 6px rgba(196,165,253,0.85),0 0 40px 14px rgba(139,92,246,0.4)"
                                            : "0 0 8px 2px rgba(196,165,253,0.65),0 0 18px 4px rgba(139,92,246,0.25)",
                                        cursor: "pointer", transition: "all 0.3s", zIndex: 2,
                                    }}
                                />

                                {/* Tooltip de nombre — visible al hover / tap (cuando no está el panel) */}
                                <AnimatePresence>
                                    {(isHover || isOpen) && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 2 }}
                                            style={{
                                                position: "absolute",
                                                // Posicionar arriba de la estrella (o abajo si está muy alta)
                                                bottom: project.mobileStarY < 20 ? "auto" : "calc(100% + 10px)",
                                                top:    project.mobileStarY < 20 ? "calc(100% + 10px)" : "auto",
                                                left: "50%", transform: "translateX(-50%)",
                                                whiteSpace: "nowrap", textAlign: "center",
                                                pointerEvents: "none", zIndex: 10,
                                            }}
                                        >
                                            <span style={{
                                                display: "block",
                                                fontFamily: "'Syne',sans-serif", fontSize: "11px", fontWeight: "700",
                                                color: "#f5f0ff", textShadow: "0 0 14px rgba(167,139,250,1)",
                                            }}>{project.name}</span>
                                            <span style={{
                                                display: "block",
                                                fontFamily: "'DM Mono',monospace", fontSize: "8px",
                                                color: "rgba(196,165,253,0.65)", letterSpacing: "1.5px",
                                                textTransform: "uppercase", marginTop: "2px",
                                            }}>{project.tag}</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Panel de detalle — debajo del canvas, se desliza */}
            <AnimatePresence>
                {openProject && (
                    <motion.div
                        key={openProject.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        style={{
                            margin: "0 8px 32px",
                            background: "rgba(5,1,18,0.94)",
                            backdropFilter: "blur(28px)",
                            border: "1px solid rgba(167,139,250,0.28)",
                            borderRadius: "18px",
                            padding: "18px",
                            boxShadow: "0 12px 48px rgba(109,40,217,0.42),inset 0 1px 0 rgba(196,165,253,0.1)",
                            position: "relative",
                        }}
                        onClick={() => setOpenId(null)}
                    >
                        {/* Línea decorativa superior */}
                        <div style={{
                            position: "absolute", top: 0, left: "15%", right: "15%",
                            height: "1px",
                            background: "linear-gradient(to right,transparent,rgba(196,165,253,0.65),transparent)",
                        }}/>
                        <ProjectContentDark project={openProject}/>
                        {/* Hint para cerrar */}
                        <p style={{
                            textAlign: "center", marginTop: "12px", marginBottom: 0,
                            fontFamily: "'DM Mono',monospace", fontSize: "8px",
                            color: "rgba(196,165,253,0.4)", letterSpacing: "1.5px",
                        }}>toca para cerrar</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── EXPORT ───────────────────────────────────────────────────────────────────
export default function Projects({ isNight = false }) {
    const isMobile = useIsMobile();
    return (
        <section id="proyectos" style={{
            position:"relative", width:"100%",
            minHeight:"110vh", paddingBottom:"120px",
            background:"transparent", overflow:"visible",
        }}>
            <motion.div
                initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                style={{ textAlign:"center", marginBottom:"44px", padding:"0 24px" }}
            >
                <p style={{
                    fontFamily:"'Poppins',sans-serif",
                    fontSize:"clamp(1.1rem,3vw,1.5rem)",
                    fontWeight:"600",
                    color:"rgba(233,213,255,0.92)",
                    margin:0, letterSpacing:"3px",
                    textTransform:"uppercase",
                    textShadow:"0 0 28px rgba(167,139,250,0.6), 0 1px 3px rgba(0,0,0,0.4)",
                }}>Proyectos</p>
            </motion.div>

            {isMobile ? (
                isNight
                    ? <MobileNightProjects projects={projects}/>
                    : <MobileDayProjects   projects={projects}/>
            ) : isNight ? (
                <DesktopNightProjects projects={projects}/>
            ) : (
                <DesktopDayProjects projects={projects}/>
            )}

            <motion.p
                initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ delay:0.5 }}
                style={{
                    textAlign:"center", marginTop: isMobile ? "16px" : "18px",
                    fontFamily:"'Poppins',sans-serif", fontSize:"11px", fontWeight:"400",
                    letterSpacing:"2px", textTransform:"uppercase",
                    color:"rgba(220,200,255,0.72)",
                    textShadow:"0 0 14px rgba(167,139,250,0.45)",
                }}
            >
                {isMobile
                    ? (isNight ? "✦ toca una estrella ✦" : "☁ pulsa una nube ☁")
                    : isNight ? "✦ explora las constelaciones ✦" : "☁ pulsa una nube para descubrir el proyecto ☁"}
            </motion.p>
        </section>
    );
}