const fs = require('fs');
const file = "/Users/priya/Projects/priya's/threejs/src/components/Network3D.tsx";
let code = fs.readFileSync(file, 'utf8');

const network2DCode = `
// CSS 2D Fallback for mobile
function Network2D() {
  const { lines, bgDots, bgLines } = useMemo(() => {
    const linesArr = [];
    for (let i = 0; i < NODES.length; i++) {
      for (let j = i + 1; j < NODES.length; j++) {
        const dx = NODES[i].position[0] - NODES[j].position[0];
        const dy = NODES[i].position[1] - NODES[j].position[1];
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 4.5 && (i * j) % 3 !== 0) {
          linesArr.push([NODES[i], NODES[j]]);
        }
      }
    }

    const dotsArr = [];
    for(let i=0; i<30; i++) {
      dotsArr.push({
        x: Math.sin(i * 13.5) * 4,
        y: Math.cos(i * 21.2) * 4
      });
    }

    const bgLinesArr = [];
    for(let i=0; i<15; i++) {
      bgLinesArr.push([dotsArr[i], dotsArr[(i + 7) % dotsArr.length]]);
    }

    return { lines: linesArr, bgDots: dotsArr, bgLines: bgLinesArr };
  }, []);

  const getPos = (x, y) => ({
    left: \`\${50 + x * 12}%\`,
    top: \`\${50 - y * 12}%\`,
  });

  return (
    <div className="w-full h-full flex items-center justify-center pointer-events-none overflow-hidden select-none">
      <style>{\`
        @keyframes reverse-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .animate-reverse-spin {
          animation: reverse-spin 40s linear infinite;
        }
      \`}</style>
      <div className="relative w-[150%] aspect-square animate-[spin_40s_linear_infinite]">
        
        <svg className="absolute inset-0 w-full h-full overflow-visible">
          {bgLines.map((line, i) => (
             <line key={\`bgl-\${i}\`} x1={getPos(line[0].x, line[0].y).left} y1={getPos(line[0].x, line[0].y).top} x2={getPos(line[1].x, line[1].y).left} y2={getPos(line[1].x, line[1].y).top} stroke="#3AA89B" strokeWidth="1" opacity="0.2" />
          ))}
          {lines.map((line, i) => (
             <line key={\`ml-\${i}\`} x1={getPos(line[0].position[0], line[0].position[1]).left} y1={getPos(line[0].position[0], line[0].position[1]).top} x2={getPos(line[1].position[0], line[1].position[1]).left} y2={getPos(line[1].position[0], line[1].position[1]).top} stroke="#3AA89B" strokeWidth="1.5" opacity="0.4" />
          ))}
        </svg>

        {bgDots.map((dot, i) => (
          <div key={\`bgd-\${i}\`} className="absolute w-2 h-2 rounded-full bg-[#3AA89B] opacity-40 -translate-x-1/2 -translate-y-1/2" style={getPos(dot.x, dot.y)} />
        ))}

        {NODES.map((node) => (
          <div key={node.id} className="absolute animate-reverse-spin" style={getPos(node.position[0], node.position[1])}>
             <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full shadow-lg border border-gray-100 whitespace-nowrap -translate-x-1/2 -translate-y-1/2">
               {node.icon === '👻' || node.icon === '⚛️' ? (
                 <span className="text-sm leading-none">{node.icon}</span>
               ) : (
                 <div
                   className="w-4 h-4 rounded flex items-center justify-center text-white text-[9px] font-bold shadow-sm"
                   style={{ backgroundColor: node.color }}
                 >
                   {node.icon}
                 </div>
               )}
               <span className="text-black font-bold text-[11px] tracking-tight">{node.label}</span>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function`;

code = code.replace("export default function", network2DCode);

const oldMobileReturn = `  // Mobile Performance Optimization: Return a static rotating image instead of heavy WebGL/Three.js
  if (isMobile) {
    return (
      <div className="w-full h-full flex items-center justify-center pointer-events-none select-none">
        <img 
          src="/globe.svg" 
          alt="Network Globe" 
          className="w-[120%] object-contain animate-[spin_40s_linear_infinite] opacity-90"
        />
      </div>
    );
  }`;

const newMobileReturn = `  // Mobile Performance Optimization: Pure 2D CSS Animation
  if (isMobile) {
    return <Network2D />;
  }`;

code = code.replace(oldMobileReturn, newMobileReturn);

fs.writeFileSync(file, code);
console.log("Patched successfully");
