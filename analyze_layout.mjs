import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const files = fs.readdirSync(path.join(__dirname, 'src/pages/projects'))
  .filter(f => f.startsWith('Project') && f !== 'ProjectTemplate.tsx');

for (const file of files) {
  const content = fs.readFileSync(path.join(__dirname, 'src/pages/projects', file), 'utf8');
  console.log(`\n=== ${file} ===`);
  
  const rightColumnMatch = content.match(/<div className="w-full md:w-2\/3">([\s\S]*?)<div className="mt-32 flex justify-center/);
  if (!rightColumnMatch) {
    console.log("Could not find right column");
    continue;
  }
  
  const rightCol = rightColumnMatch[1];
  
  // Find all separators
  const separatorRegex = /<h3[^>]*>[\s\S]*?\{lang === 'ENG' \? (['"`])([\s\S]*?)\1 : (['"`])([\s\S]*?)\3\}[\s\S]*?<\/h3>/g;
  let match;
  while ((match = separatorRegex.exec(rightCol)) !== null) {
    console.log(`Separator: ${match[2]} / ${match[4]}`);
  }
  
  const separatorRegex2 = /<div className="border-t border-black\/10 pt-10 mb-10 text-center[^>]*>\s*(.*?)\s*<\/div>/g;
  while ((match = separatorRegex2.exec(rightCol)) !== null) {
    console.log(`Centered Separator: ${match[1]}`);
  }
}
