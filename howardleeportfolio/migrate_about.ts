import { getCliClient } from 'sanity/cli';
import { v4 as uuidv4 } from 'uuid';

const client = getCliClient();

async function migrate() {
  const doc = {
    _id: 'aboutPage',
    _type: 'about',
    name: {
      en: 'Howard Lee',
      zh: '李浩勤 Howard Lee'
    },
    role: {
      en: 'Motion & Visual Designer / Artist',
      zh: '動態與視覺設計師 / 藝術家'
    },
    bio: {
      en: "An artist and motion designer from Hong Kong, currently based in Taiwan. Lee's work revolves around the interpersonal relationships and emotional issues of contemporary youth. He has participated in numerous stage and performance visual designs. Excelling at breaking through medium constraints, he uses motion storytelling and design strategies to lead audiences through the ups and downs of life across visual and physical spaces.",
      zh: "來自香港、現居台灣的藝術家與動態影像設計師。李氏的創作圍繞著當代青年的人際關係與情感議題，曾參與多場舞台與展演影像設計。他擅長打破載體限制，運用動態敘事與設計策略，帶領觀眾在影像與場域中體驗人生起伏。"
    },
    section1: {
      title: { en: '01. Spatial Motion Visuals', zh: '01. 場域型動態視覺' },
      desc: { en: "I excel at employing design strategies to accurately analyze project directions while considering the overall spatial presentation. Whether for stages or exhibitions, I use visuals and digital animation to create immersive experiences, ensuring the design resonates deeply with the audience.", zh: "我擅長運用設計策略，精準分析專案方向，並將整體的空間呈現納入考量。在舞台或展演，我都透過影像與數位動畫，為觀眾打造具沉浸感的體驗，讓設計與受眾產生深刻共鳴。" }
    },
    section2: {
      title: { en: '02. Core Capabilities', zh: '02. 核心技能領域' },
      skills: {
        en: ['Motion Design', 'Projection Mapping', 'Concert Visuals', '3D Animation', 'Interaction Design', 'Visual Identity'],
        zh: ['動態設計', '光雕投影', '演唱會影像', '3D 動畫', '互動設計', '視覺識別']
      }
    },
    section3: {
      title: { en: '03. Core Direction', zh: '03. 核心方向' },
      desc: { en: "My creations focus on contemporary interpersonal relationships, conveying my observations on social connections across various mediums. The goal is to touch and inspire audiences through concise and impactful motion visuals.", zh: "我的創作關注當代人與人之間的關係，在不同載體中傳達我對社會關係的觀察。目標是透過簡練、具張力的動態視覺，觸動觀眾並帶來啟發。" }
    },
    resumeSections: [
      {
        _key: uuidv4(),
        _type: 'resumeSection',
        title: { en: 'Education', zh: '學歷' },
        items: [
          { _key: uuidv4(), _type: 'resumeItem', year: { en: '2025 - Present', zh: '2025 - 迄今' }, description: { en: 'BFA in Communications Design,\nShih Chien University, Taiwan (Animation & Moving Image Design)', zh: '實踐大學 媒體傳達設計學系, 台灣 (動畫影像設計組)' } },
          { _key: uuidv4(), _type: 'resumeItem', year: { en: '2024 - 2025', zh: '2024 - 2025' }, description: { en: 'BFA in Media Design, Tatung University, Taiwan (Interaction Design)', zh: '大同大學 媒體設計學系, 台灣 (互動設計組)' } },
          { _key: uuidv4(), _type: 'resumeItem', year: { en: '2023 - 2024', zh: '2023 - 2024' }, description: { en: 'BFA in Digital Media Design, Ming Chuan University, Taiwan', zh: '銘傳大學 數位媒體設計學系, 台灣' } },
          { _key: uuidv4(), _type: 'resumeItem', year: { en: '2020 - 2023', zh: '2020 - 2023' }, description: { en: 'Diploma, HKICC Lee Shau Kee School of Creativity, Hong Kong (Film and Video Arts)', zh: '香港兆基創意書院, 香港 (電影與錄像藝術)' } }
        ]
      },
      {
        _key: uuidv4(),
        _type: 'resumeSection',
        title: { en: 'Experience', zh: '工作經歷' },
        items: [
          { _key: uuidv4(), _type: 'resumeCategory', title: { en: 'Concert Visual', zh: '演唱會視覺設計' } },
          { _key: uuidv4(), _type: 'resumeItem', year: { en: '2026', zh: '2026' }, description: { en: 'Hsinchu "ON LOOP" 2026 New Year’s Eve Concert, Taiwan\n<small>Animation Design (TRASH & Hsu Wei-Hsiang) & Visual Execution</small>', zh: '「新竹ON LOOP 不斷電」2026大新竹跨年晚會, 台灣\n<small>動畫設計（TRASH & 徐暐翔）& 視訊執行</small>' } },
          { _key: uuidv4(), _type: 'resumeItem', year: { en: '2025', zh: '2025' }, description: { en: '2025 20th KKBOX Music Awards Concert, Taiwan\n<small>Animation Design (Together Lonely & Forever)</small>', zh: '2025第20屆KKBOX風雲榜演唱會, 高雄, 台灣\n<small>動畫設計（一起寂寞 & 永遠永遠）</small>' } },
          { _key: uuidv4(), _type: 'resumeItem', year: { en: '2024', zh: '2024' }, description: { en: 'Cyndi Wang "SUGAR HIGH 2.0" World Tour, Taipei, Taiwan\n<small>Animation Visual Design (Miss You Most & Wedding Dress of Flowers)</small>', zh: '王心凌「SUGAR HIGH 2.0世界巡迴演唱會」, 台北, 台灣\n<small>動畫視覺設計（最想你的 & 花的嫁紗）</small>' } },
          { _key: uuidv4(), _type: 'resumeItem', year: { en: '2024', zh: '2024' }, description: { en: 'Xu Song "Breath of the Wild" 2024 World Tour, China\n<small>Animation Visual Design (Nemesis)</small>', zh: '許嵩「呼吸之野」2024巡迴演唱會, 中國\n<small>動畫視覺設計（宿敵）</small>' } },
          
          { _key: uuidv4(), _type: 'resumeCategory', title: { en: 'Commercial', zh: '商業廣告' } },
          { _key: uuidv4(), _type: 'resumeItem', year: { en: '2024', zh: '2024' }, description: { en: 'General Air-Conditioner Commercial 2024 "Fabulous 50, Number One Achievement", Hong Kong\n<small>Motion Graphic Designer & Illustration</small>', zh: '珍寶冷氣廣告2024 精彩50 成就第一, 香港\n<small>Motion Graphic Designer & Illustration</small>' } },
          
          { _key: uuidv4(), _type: 'resumeCategory', title: { en: 'Immersive Video', zh: '沉浸式影像製作' } },
          { _key: uuidv4(), _type: 'resumeItem', year: { en: '2023', zh: '2023' }, description: { en: 'BOC (Hong Kong) Private Banking Presents "No.1 Cultural Grotto" Immersive Art Installation, Hong Kong\n<small>2D Motion Designer / Editor / Compositor: "Heavenly Sound" Chapter</small>', zh: '中國銀行(香港)私人銀行呈獻《第一號文化洞窟—萬籟有聲：天籟 • 地籟 • 人籟》沉浸式展演藝術裝置, 香港\n<small>2D 動態設計 / 剪輯 / 合成：「天籟」章節</small>' } },
          
          { _key: uuidv4(), _type: 'resumeCategory', title: { en: 'Performance', zh: '個人演出' } },
          { _key: uuidv4(), _type: 'resumeItem', year: { en: '2026', zh: '2026' }, description: { en: 'Audio Visual Performance, "Unsorted",\nShih Chien University, Taiwan', zh: '即時音像演出「Unsorted」, 實踐大學, 台灣' } }
        ]
      },
      {
        _key: uuidv4(),
        _type: 'resumeSection',
        title: { en: 'Exhibitions', zh: '參展經歷' },
        items: [
          { _key: uuidv4(), _type: 'resumeItem', year: { en: '2025', zh: '2025' }, description: { en: 'Taoyuan International Design Award, Taoyuan Arts Center, Taiwan', zh: '桃園國際設計獎, 桃園展演中心, 台灣' } },
          { _key: uuidv4(), _type: 'resumeItem', year: { en: '2023', zh: '2023' }, description: { en: 'HKSC Graduation Show 2023: undefined, Hong Kong', zh: '香港兆基創意書院 畢業展 2023：無意義•無異議, 香港' } }
        ]
      },
      {
        _key: uuidv4(),
        _type: 'resumeSection',
        title: { en: 'Awards', zh: '獎項' },
        items: [
          { _key: uuidv4(), _type: 'resumeItem', year: { en: '2026', zh: '2026' }, description: { en: 'Tung Ming Award, 24th Digital Content Competition, Shih Chien University\nJury Award by Artist Yu Cheng-Ta', zh: '實踐大學第24屆東閔盃數位內容競賽\n評審獎 藝術家余政達' } },
          { _key: uuidv4(), _type: 'resumeItem', year: { en: '2026', zh: '2026' }, description: { en: 'Young Ones ADC: Design for Good,\nBronze Cube, NYC', zh: 'Young Ones ADC: Design for Good,\n銅立方獎, 紐約' } },
          { _key: uuidv4(), _type: 'resumeItem', year: { en: '2025', zh: '2025' }, description: { en: 'Taiwan International Student Design Competition (TISDC), Bronze Prize, Taiwan', zh: '臺灣國際學生創意設計大賽 (TISDC), 銅獎, 台灣' } },
          { _key: uuidv4(), _type: 'resumeItem', year: { en: '2025', zh: '2025' }, description: { en: 'Taoyuan Design Award (Visual and Commercial Design), Excellence Award, Taiwan', zh: '桃園設計獎 (視覺與商業設計類), 特優獎, 台灣' } },
          { _key: uuidv4(), _type: 'resumeItem', year: { en: '2025', zh: '2025' }, description: { en: 'Taiwan Golden Star Design Award (Poster Design), Gold Award, Taiwan', zh: '台灣金星設計獎 (海報設計類), 金獎, 台灣' } },
          { _key: uuidv4(), _type: 'resumeItem', year: { en: '2021, 2023', zh: '2021, 2023' }, description: { en: 'Bright Future Creativity Scholarship (Animation & Sculpture), Hong Kong', zh: '鵬程創意獎學金 (動畫與雕塑), 香港' } }
        ]
      }
    ]
  };

  try {
    const result = await client.createOrReplace(doc);
    console.log('Migration successful:', result._id);
  } catch (err) {
    console.error('Migration failed:', err);
  }
}

migrate();
