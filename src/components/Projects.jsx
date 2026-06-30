import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getTheme } from "../theme";

const projects = [
    {
        id: 0, number: "01", name: "Turistea",
        description: "Agencia de viajes fullstack en equipo durante las prácticas en Zaitec. Diseño visual, branding y logotipo de autoría propia.",
        stack: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
        github: "https://github.com/auroraaviz/turistea-agencia-viajes",
        demo: null, tag: "Proyecto estrella",
        starX: 18, starY: 22,
        mobileStarX: 28, mobileStarY: 16,
    },
    {
        id: 1, number: "02", name: "Superverde",
        description: "Supermercado vegano online con diseño visual propio desde cero. Identidad de marca, banners y maquetación completa.",
        stack: ["HTML5", "CSS3", "JavaScript"],
        github: "https://github.com/auroraaviz/superverde_SupermercadoVegano",
        demo: "https://auroraaviz.github.io/superverde_SupermercadoVegano/",
        tag: "Diseño propio",
        starX: 55, starY: 18,
        mobileStarX: 72, mobileStarY: 11,
    },
    {
        id: 2, number: "03", name: "DavanteDent",
        description: "Gestión de citas para clínica dental. CRUD completo con JavaScript vanilla, cookies, sin frameworks ni dependencias.",
        stack: ["JavaScript", "HTML5", "CSS3"],
        github: "https://github.com/auroraaviz/DavanteDent---Gesti-n-de-citas",
        demo: "https://auroraaviz.github.io/DavanteDent---Gesti-n-de-citas/",
        tag: "Demo en vivo",
        starX: 78, starY: 42,
        mobileStarX: 80, mobileStarY: 42,
    },
    {
        id: 3, number: "04", name: "Zapatillas",
        description: "E-commerce de zapatillas con catálogo, carrito y gestión de pedidos. Backend en PHP con base de datos MySQL.",
        stack: ["PHP", "MySQL", "HTML5", "CSS3"],
        github: "https://github.com/auroraaviz/tienda-Zapatillas-",
        demo: null, tag: "Fullstack",
        starX: 35, starY: 62,
        mobileStarX: 22, mobileStarY: 58,
    },
    {
        id: 4, number: "05", name: "Menta",
        description: "Web corporativa para empresa ficticia de diseño gráfico. Primer proyecto académico — maquetación HTML y CSS desde cero.",
        stack: ["HTML5", "CSS3"],
        github: "https://github.com/auroraaviz/pagina-web-ficticia_MENTA",
        demo: null, tag: "Maquetación",
        starX: 67, starY: 70,
        mobileStarX: 60, mobileStarY: 74,
    },
];

const constellationLines = [[0,1],[1,2],[2,4],[0,3],[3,4],[1,3]];

const stackColorsLight = {
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

function ShootingStar({ color }) {
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
                background:`linear-gradient(to right,${color},transparent)`,
                pointerEvents:"none", zIndex:10, borderRadius:"1px",
            }}
        />
    );
}

function StackPill({ tech, dark }) {
    const c = stackColorsLight[tech] || { bg:"rgba(109,40,217,0.12)", border:"rgba(139,92,246,0.4)", text:"rgba(55,8,130,0.9)" };
    if (dark) {
        return (
            <span style={{ padding:"3px 9px", borderRadius:"20px",
                background:"rgba(139,92,246,0.32)", border:"1px solid rgba(167,139,250,0.5)",
                fontFamily:"'DM Mono',monospace", fontSize:"9px", color:"#ede9fe" }}>{tech}</span>
        );
    }
    return (
        <span style={{
            padding:"3px 10px", borderRadius:"20px",
            background:c.bg, border:`1px solid ${c.border}`,
            fontFamily:"'DM Mono',monospace", fontSize:"9px", fontWeight:"500",
            color:c.text, letterSpacing:"0.2px", display:"inline-block",
        }}>{tech}</span>
    );
}

function ProjectContent({ project, theme }) {
    const numberColor = theme.dark ? "rgba(196,165,253,0.65)" : theme.tagColor;
    const nameColor   = theme.dark ? "#fff" : "rgba(20,10,45,0.95)";
    const descColor   = theme.dark ? "rgba(220,200,255,0.92)" : "rgba(45,30,75,0.85)";
    const btnBorder   = theme.dark ? "rgba(167,139,250,0.45)" : theme.panelBorder;
    const btnBg       = theme.dark ? "rgba(109,40,217,0.32)" : "rgba(120,90,200,0.1)";
    const btnBgStrong = theme.dark ? "rgba(139,92,246,0.5)"  : "rgba(120,90,200,0.18)";
    const btnText     = theme.dark ? "#e9d5ff" : "rgba(40,20,90,0.9)";

    return (
        <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
            <div style={{ display:"flex", alignItems:"baseline", gap:"6px" }}>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"10px", color:numberColor, flexShrink:0 }}>{project.number}</span>
                <span style={{ fontFamily:"'DM Mono',monospace", letterSpacing:"2px", fontSize:"1rem", fontWeight:"700", color:nameColor, lineHeight:1.2 }}>{project.name}</span>
            </div>
            <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:"0.73rem", color:descColor, lineHeight:1.65, margin:0 }}>
                {project.description}
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"4px" }}>
                {project.stack.map(t => <StackPill key={t} tech={t} dark={theme.dark}/>)}
            </div>
            <div style={{ display:"flex", gap:"6px" }}>
                <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                    style={{ flex:1, textAlign:"center", padding:"7px 0", borderRadius:"8px",
                        border:`1px solid ${btnBorder}`, background:btnBg,
                        color:btnText, textDecoration:"none",
                        fontFamily:"'Poppins',sans-serif", fontSize:"10px", fontWeight:"500", cursor:"pointer" }}>GitHub</a>
                {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                        style={{ flex:1, textAlign:"center", padding:"7px 0", borderRadius:"8px",
                            border:`1px solid ${btnBorder}`, background:btnBgStrong,
                            color:btnText, textDecoration:"none",
                            fontFamily:"'Poppins',sans-serif", fontSize:"10px", fontWeight:"500", cursor:"pointer" }}>Demo →</a>
                )}
            </div>
        </div>
    );
}

// Constelación — desktop
function DesktopConstellation({ projects, theme }) {
    const [openId, setOpenId]   = useState(null);
    const [hoverId, setHoverId] = useState(null);
    const lineDelays = useMemo(() => constellationLines.map((_,i) => i*0.3), []);

    return (
        <div style={{ position:"relative", width:"100%", height:"86vh", minHeight:620 }}>
            <ShootingStar color={theme.rays} />
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
                                stroke={theme.lineGlowMain} strokeWidth={isMain?"4":"2.5"} strokeLinecap="round" filter="url(#lgs)"
                                initial={{opacity:0}} animate={{opacity:1}} transition={{delay:lineDelays[i]+0.4,duration:1.2}}/>
                            <motion.line x1={`${pa.starX}%`} y1={`${pa.starY}%`} x2={`${pb.starX}%`} y2={`${pb.starY}%`}
                                stroke={isMain?theme.lineCore:theme.lineCoreSoft}
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
                    <div key={project.id} style={{ position:"absolute",left:`${project.starX}%`,top:`${project.starY}%`,transform:"translate(-50%,-50%)",zIndex:isOpen?30:5 }}>
                        <motion.div animate={{opacity:[0.15,0.45,0.15],scale:[0.9,1.15,0.9]}}
                            transition={{duration:3+project.id*0.45,repeat:Infinity,ease:"easeInOut"}}
                            style={{ position:"absolute",top:"50%",left:"50%",width:gr*2,height:gr*2,transform:"translate(-50%,-50%)",borderRadius:"50%",
                                background:theme.starGlow,pointerEvents:"none" }}/>
                        <motion.div animate={{scale:[1,1.25,1],opacity:[0.85,1,0.85]}}
                            transition={{duration:2.5+project.id*0.4,repeat:Infinity,ease:"easeInOut"}}
                            onClick={()=>setOpenId(isOpen?null:project.id)}
                            onMouseEnter={()=>setHoverId(project.id)} onMouseLeave={()=>setHoverId(null)}
                            style={{ position:"relative",width:sz,height:sz,borderRadius:"50%",
                                background:theme.starCore,
                                boxShadow:isHover?theme.starShadowHover:theme.starShadow,
                                cursor:"pointer",transition:"all 0.3s",zIndex:2 }}/>
                        <AnimatePresence>
                            {isHover&&!isOpen&&(
                                <motion.div initial={{opacity:0,scale:0.6}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.6}}
                                    style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none",zIndex:3}}>
                                    {[0,90,45,135].map((angle,ri)=>(
                                        <div key={ri} style={{position:"absolute",top:"50%",left:"50%",width:32,height:1.5,
                                            transform:`translate(-50%,-50%) rotate(${angle}deg)`,
                                            background:`linear-gradient(to right,transparent,${theme.rays},transparent)`,filter:"blur(0.4px)"}}/>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <AnimatePresence>
                            {isHover&&!isOpen&&(
                                <motion.div initial={{opacity:0,y:5}} animate={{opacity:1,y:0}} exit={{opacity:0,y:2}}
                                    style={{position:"absolute",bottom:"calc(100% + 14px)",left:"50%",transform:"translateX(-50%)",whiteSpace:"nowrap",textAlign:"center",pointerEvents:"none",zIndex:10}}>
                                    <span style={{display:"block",fontFamily:"'DM Mono',monospace",letterSpacing:"2px",fontSize:"14px",fontWeight:"700",color:theme.nameColor,textShadow:theme.nameShadow}}>{project.name}</span>
                                    <span style={{display:"block",fontFamily:"'DM Mono',monospace",fontSize:"9px",color:theme.tagColor,letterSpacing:"2px",textTransform:"uppercase",marginTop:"3px"}}>{project.tag}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <AnimatePresence>
                            {isOpen&&(
                                <motion.div initial={{opacity:0,scale:0.88,y:10}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:0.88,y:5}}
                                    style={{position:"absolute",bottom:"calc(100% + 18px)",left:"50%",transform:"translateX(-50%)",
                                        width:290,background:theme.panelBg,backdropFilter:"blur(28px)",
                                        border:`1px solid ${theme.panelBorder}`,borderRadius:"18px",padding:"20px",
                                        boxShadow:theme.panelShadow,zIndex:30}}>
                                    <div style={{position:"absolute",top:0,left:"15%",right:"15%",height:"1px",background:`linear-gradient(to right,transparent,${theme.panelHairline},transparent)`}}/>
                                    <ProjectContent project={project} theme={theme}/>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}

// Constelación — mobile
function MobileConstellation({ projects, theme }) {
    const [openId, setOpenId] = useState(null);
    const [hoverId, setHoverId] = useState(null);
    const lineDelays = useMemo(() => constellationLines.map((_, i) => i * 0.3), []);
    const openProject = openId !== null ? projects.find(p => p.id === openId) : null;

    return (
        <div style={{ position:"relative", width:"100%", padding:"0 8px" }}>
            <ShootingStar color={theme.rays} />
            <div style={{ position:"relative", width:"100%", paddingBottom:"min(90%, 420px)" }}>
                <div style={{ position:"absolute", inset:0 }}>
                    <svg style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%", pointerEvents:"none", zIndex:1, overflow:"visible" }}
                        viewBox="0 0 100 100" preserveAspectRatio="none">
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
                            const pa = projects[a], pb = projects[b], isMain = i < 2;
                            return (
                                <g key={i}>
                                    <motion.line x1={pa.mobileStarX} y1={pa.mobileStarY} x2={pb.mobileStarX} y2={pb.mobileStarY}
                                        stroke={theme.lineGlow} strokeWidth={isMain?"3":"2"} strokeLinecap="round" filter="url(#mgls)"
                                        initial={{opacity:0}} animate={{opacity:1}} transition={{delay:lineDelays[i]+0.4,duration:1.2}}/>
                                    <motion.line x1={pa.mobileStarX} y1={pa.mobileStarY} x2={pb.mobileStarX} y2={pb.mobileStarY}
                                        stroke={isMain?theme.lineCore:theme.lineCoreSoft}
                                        strokeWidth={isMain?"0.9":"0.6"} strokeDasharray={isMain?"none":"3 5"} strokeLinecap="round" filter="url(#mgl)"
                                        initial={{opacity:0,pathLength:0}} animate={{opacity:1,pathLength:1}} transition={{delay:lineDelays[i],duration:1.5,ease:"easeOut"}}/>
                                </g>
                            );
                        })}
                    </svg>
                    {projects.map(project => {
                        const isOpen=openId===project.id, isHover=hoverId===project.id, sz=isOpen||isHover?16:9;
                        return (
                            <div key={project.id} style={{ position:"absolute", left:`${project.mobileStarX}%`, top:`${project.mobileStarY}%`, transform:"translate(-50%,-50%)", zIndex:isOpen?20:5 }}>
                                <motion.div animate={{opacity:[0.15,0.4,0.15],scale:[0.9,1.2,0.9]}}
                                    transition={{duration:3+project.id*0.4,repeat:Infinity,ease:"easeInOut"}}
                                    style={{ position:"absolute",top:"50%",left:"50%",width:40,height:40,transform:"translate(-50%,-50%)",borderRadius:"50%",
                                        background:theme.starGlow,pointerEvents:"none" }}/>
                                <motion.div animate={{scale:[1,1.2,1],opacity:[0.85,1,0.85]}}
                                    transition={{duration:2.5+project.id*0.4,repeat:Infinity,ease:"easeInOut"}}
                                    onClick={()=>{ setOpenId(isOpen?null:project.id); }}
                                    onTouchStart={()=>setHoverId(project.id)}
                                    style={{ position:"relative",width:sz,height:sz,borderRadius:"50%",
                                        background:theme.starCore,
                                        boxShadow:isOpen||isHover?theme.starShadowHover:theme.starShadow,
                                        cursor:"pointer",transition:"all 0.3s",zIndex:2 }}/>
                                <AnimatePresence>
                                    {(isHover||isOpen)&&(
                                        <motion.div initial={{opacity:0,y:4}} animate={{opacity:1,y:0}} exit={{opacity:0,y:2}}
                                            style={{ position:"absolute", bottom:project.mobileStarY<20?"auto":"calc(100% + 10px)", top:project.mobileStarY<20?"calc(100% + 10px)":"auto",
                                                left:"50%",transform:"translateX(-50%)",whiteSpace:"nowrap",textAlign:"center",pointerEvents:"none",zIndex:10 }}>
                                            <span style={{display:"block",fontFamily:"'DM Mono',monospace",letterSpacing:"2px",fontSize:"13px",fontWeight:"700",color:theme.nameColor,textShadow:theme.nameShadow}}>{project.name}</span>
                                            <span style={{display:"block",fontFamily:"'DM Mono',monospace",fontSize:"8px",color:theme.tagColor,letterSpacing:"1.5px",textTransform:"uppercase",marginTop:"2px"}}>{project.tag}</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
            <AnimatePresence>
                {openProject&&(
                    <motion.div key={openProject.id} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:10}} transition={{duration:0.3,ease:"easeOut"}}
                        style={{ margin:"0 4px 28px", background:theme.panelBg, backdropFilter:"blur(28px)",
                            border:`1px solid ${theme.panelBorder}`, borderRadius:"18px", padding:"20px",
                            boxShadow:theme.panelShadow, position:"relative" }}
                        onClick={()=>setOpenId(null)}>
                        <div style={{position:"absolute",top:0,left:"15%",right:"15%",height:"1px",background:`linear-gradient(to right,transparent,${theme.panelHairline},transparent)`}}/>
                        <ProjectContent project={openProject} theme={theme}/>
                        <p style={{textAlign:"center",marginTop:"12px",marginBottom:0,fontFamily:"'DM Mono',monospace",fontSize:"8px",color:theme.tagColor,letterSpacing:"1.5px",opacity:0.7}}>toca para cerrar</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function Projects({ sky = {}, isNight: isNightProp = false }) {
    const currentMode = sky?.label || (isNightProp ? "noche" : "mediodia");
    const theme = getTheme(currentMode);

    const isMobile = useIsMobile();

    return (
        <section id="proyectos" style={{ position:"relative", width:"100%", minHeight:"110vh", paddingBottom:"120px", background:"transparent", overflow:"visible" }}>
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
                style={{textAlign:"center",marginBottom:"44px",padding:"0 24px",isolation:"isolate"}}>
                <h2 style={{
                    fontFamily:"'DM Mono',monospace",
                    fontSize:"clamp(1.8rem,4vw,2.6rem)",
                    fontWeight:700, margin:0, letterSpacing:"2px",
                }}>
                    <span key={currentMode} style={{
                        background: theme.titleGradient,
                        WebkitBackgroundClip:"text",
                        WebkitTextFillColor:"transparent",
                        backgroundClip:"text",
                        display:"inline-block",
                        textShadow:"none",
                    }}>Proyectos</span>
                </h2>
            </motion.div>

            {isMobile ? (
                <MobileConstellation projects={projects} theme={theme} />
            ) : (
                <DesktopConstellation projects={projects} theme={theme} />
            )}

            <motion.p initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{delay:0.5}}
                style={{ textAlign:"center", marginTop:isMobile?"16px":"18px",
                    fontFamily:"'Poppins',sans-serif", fontSize:"11px", fontWeight:"400",
                    letterSpacing:"2px", textTransform:"uppercase",
                    color:theme.tagColor, textShadow:theme.dark ? "0 0 14px rgba(167,139,250,0.45)" : "none" }}>
                {isMobile ? "✦ toca una estrella ✦" : "✦ explora las constelaciones ✦"}
            </motion.p>
        </section>
    );
}