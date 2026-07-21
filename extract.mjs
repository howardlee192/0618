import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const files = fs.readdirSync(path.join(__dirname, 'src/pages/projects'))
  .filter(f => f.startsWith('Project') && f !== 'ProjectTemplate.tsx');

const results = {};

for (const file of files) {
  const content = fs.readFileSync(path.join(__dirname, 'src/pages/projects', file), 'utf8');
  
  const extractMatch = (keyword) => {
    // Regex is tricky, let's just do simple string searching
    const keywordStr = `? '${keyword}'`;
    const keywordIdx = content.indexOf(keywordStr);
    if (keywordIdx === -1) return null;
    
    // find the next '<span'
    const spanIdx = content.indexOf('<span', keywordIdx);
    if (spanIdx === -1) return null;
    
    const spanEndIdx = content.indexOf('>', spanIdx);
    if (spanEndIdx === -1) return null;
    
    const nextCloseIdx = content.indexOf('</span>', spanEndIdx);
    if (nextCloseIdx === -1) return null;
    
    let textContent = content.substring(spanEndIdx + 1, nextCloseIdx).trim();
    
    // Parse `{lang === 'ENG' ? 'en' : 'zh'}`
    const m = textContent.match(/\{lang === 'ENG' \? (['"`])([\s\S]*?)\1 : (['"`])([\s\S]*?)\3\}/);
    if (m) {
      return { en: m[2], zh: m[4] };
    }
    
    // Sometimes it's wrapped in <> ... </>
    const m2 = textContent.match(/\{lang === 'ENG' \? <>\s*([\s\S]*?)\s*<\/> : (['"`])([\s\S]*?)\2\}/);
    if (m2) {
      return { en: m2[1].replace(/<br \/>/g, '\n'), zh: m2[3] };
    }
    
    // Sometimes it's just a string without ternary
    const m3 = textContent.match(/\{lang === 'ENG' \? (['"`])([\s\S]*?)\1 : <>([\s\S]*?)<\/>\}/);
    if (m3) {
      return { en: m3[2], zh: m3[3].replace(/<br \/>/g, '\n') };
    }
    
    return null;
  }
  
  let materials = extractMatch('Materials');
  let course = extractMatch('Course');
  
  let awards = null;
  const awardsStr = `? 'Awards'`;
  const awardsIdx = content.indexOf(awardsStr);
  if (awardsIdx !== -1) {
    const detailsIdx = content.indexOf('<details', awardsIdx - 200);
    if (detailsIdx !== -1) {
      const pIdx = content.indexOf(' whitespace-pre-wrap', detailsIdx);
      if (pIdx !== -1) {
        const divEnd = content.indexOf('>', pIdx);
        const nextDiv = content.indexOf('</div>', divEnd);
        const textContent = content.substring(divEnd + 1, nextDiv).trim();
        const m = textContent.match(/\{lang === 'ENG'\s*\?\s*(['"`])([\s\S]*?)\1\s*:\s*(['"`])([\s\S]*?)\3\}/);
        if (m) {
          awards = { en: m[2], zh: m[4] };
        }
      }
    }
  }
  
  let description = null;
  const descIdx1 = content.indexOf(`font-['Mozilla_Text'] opacity-80 text-base`);
  const descIdx2 = content.indexOf(`whitespace-pre-wrap`, descIdx1);
  if (descIdx1 !== -1) {
    const divEnd = content.indexOf('>', descIdx1);
    const nextDiv = content.indexOf('</div>', divEnd);
    let textContent = content.substring(divEnd + 1, nextDiv).trim();
    const m = textContent.match(/\{lang === 'ENG'\s*\?\s*(['"`])([\s\S]*?)\1\s*:\s*(['"`])([\s\S]*?)\3\}/);
    if (m) {
      description = { en: m[2], zh: m[4] };
    }
  }
  
  results[file] = { materials, course, awards, description };
}

fs.writeFileSync(path.join(__dirname, 'extracted.json'), JSON.stringify(results, null, 2));
console.log('Extraction complete');
