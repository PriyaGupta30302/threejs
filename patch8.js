const fs = require('fs');
const file = "/Users/priya/Projects/priya's/threejs/src/components/Network3D.tsx";
let code = fs.readFileSync(file, 'utf8');

// 1. Remove Network2D and mobile fallback check
const fallbackStart = code.indexOf('// CSS 2D Fallback for mobile');
const fallbackEnd = code.indexOf('  // If isActive is explicitly passed');
if (fallbackStart !== -1 && fallbackEnd !== -1) {
  code = code.substring(0, fallbackStart) + code.substring(fallbackEnd);
}

// 2. Adjust scale for mobile
code = code.replace('<group ref={groupRef} scale={0.75}>', '<group ref={groupRef} scale={isMobile ? 0.55 : 0.75}>');

fs.writeFileSync(file, code);
console.log("Patched successfully");
