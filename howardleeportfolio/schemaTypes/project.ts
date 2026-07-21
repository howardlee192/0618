import { defineField, defineType } from 'sanity'
import { SliderInput } from '../components/SliderInput'

export default defineType({
  name: 'project',
  title: '作品專案 (Project)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '專案標題 (Title)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleZh',
      title: '專案標題 (中文)',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: '網址縮寫 (Slug)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: '分類 (Category)',
      type: 'string',
      options: {
        list: [
          { title: 'Personal', value: 'personal' },
          { title: 'Work', value: 'work' },
          { title: 'Both (Work & Personal)', value: 'both' }
        ],
        layout: 'radio',
      },
      initialValue: 'personal',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnailSize',
      title: '縮圖大小 (Thumbnail Size)',
      description: '決定這個作品在列表頁面中佔據的格子大小。',
      type: 'string',
      options: {
        list: [
          { title: 'Normal (一般 - 1格)', value: 'normal' },
          { title: 'Tall (直長 - 佔2格高)', value: 'tall' },
          { title: 'Wide (橫長 - 佔2格寬)', value: 'wide' },
        ],
        layout: 'radio',
      },
      initialValue: 'normal',
    }),
    
    // --- 專案詳細資訊 (Metadata) ---
    defineField({
      name: 'layoutStyle',
      title: '排版風格 (Layout Style)',
      description: '決定專案下方內容的排版方式。',
      type: 'string',
      options: {
        list: [
          { title: '全寬排版 (Full Width) - 內容橫跨全螢幕', value: 'fullWidth' },
          { title: '右側滑動 (Right Side Scroll) - 左側固定，內容全縮在右側', value: 'split' }
        ],
        layout: 'radio'
      },
      initialValue: 'fullWidth',
    }),
    defineField({
      name: 'isUnderConstruction',
      title: '施工中 (Under Construction)',
      description: '開啟後，此作品在網格中仍會顯示封面，但訪客點進去只會看到「施工中 / Coming Soon」的提示畫面，不會看到未完成的內容。',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'sortOrder',
      title: '排序權重 (Sort Order Weight)',
      description: '決定專案在列表中的排序。數字越大越前面（例如設定為 100 會排在最上面）。預設為 0。',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'year',
      title: '年份 (Year)',
      type: 'string',
    }),
    defineField({
      name: 'medium',
      title: '媒介 (Medium)',
      type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'zh', type: 'string', title: '中文' }
      ]
    }),

    defineField({
      name: 'materials',
      title: '媒材 (Materials)',
      type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'zh', type: 'string', title: '中文' }
      ]
    }),
    defineField({
      name: 'materialsLabel',
      title: '分類標籤顯示 (Materials / Tools)',
      type: 'string',
      options: {
        list: [
          { title: '顯示為「媒材 (Materials)」', value: 'materials' },
          { title: '顯示為「工具 (Tools)」', value: 'tools' },
          { title: '依據頁面自動切換 (Work 顯示 Tools / Personal 顯示 Materials)', value: 'both' }
        ],
        layout: 'radio'
      },
      initialValue: 'materials',
      description: '選擇此專案在網頁上要顯示為「媒材 (Materials)」還是「工具 (Tools)」。'
    }),
    defineField({
      name: 'hasCourse',
      title: '是否屬於課程專案？(Is this a course project?)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'course',
      title: '課程 (Course)',
      type: 'object',
      hidden: ({ document }) => !document?.hasCourse,
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'zh', type: 'string', title: '中文' }
      ]
    }),
    defineField({
      name: 'awards',
      title: '獎項設定 (Awards)',
      type: 'object',
      fields: [
        { 
          name: 'showAwards', 
          title: '顯示獎項 (Show Awards)', 
          type: 'boolean', 
          description: '關閉後，網頁上將不會顯示任何獎項資訊。',
          initialValue: true 
        },
        { 
          name: 'isExpandable', 
          title: '折疊顯示 (Expandable)', 
          type: 'boolean', 
          description: '開啟後，網頁上的獎項會變成「展開查看 (View Details)」的折疊選單。',
          initialValue: false
        },
        {
          name: 'list',
          title: '獎項列表 (Awards List)',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'zh', title: '中文獎項', type: 'text', rows: 2 },
                { name: 'en', title: '英文獎項', type: 'text', rows: 2 }
              ]
            }
          ]
        },
        { name: 'zh', title: '舊版中文獎項 (已隱藏)', type: 'text', rows: 3, hidden: true },
        { name: 'en', title: '舊版英文獎項 (已隱藏)', type: 'text', rows: 3, hidden: true }
      ]
    }),
    defineField({
      name: 'description',
      title: '專案介紹 (Description)',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English' },
        { name: 'zh', type: 'text', title: '中文' }
      ]
    }),

    // --- 封面區域 ---
    defineField({
      name: 'coverType',
      title: '封面類型 (Cover Type)',
      type: 'string',
      options: {
        list: [
          { title: 'Image (單張圖片)', value: 'image' },
          { title: 'Slideshow (圖片輪播)', value: 'slideshow' },
          { title: 'Video URL (影片網址 - 適合長影片 YouTube/Vimeo)', value: 'videoUrl' },
          { title: 'Video File (直接上傳影片檔 - 適合 100MB 以下短影片)', value: 'videoFile' },
        ],
        layout: 'radio',
      },
      initialValue: 'image',
    }),
    defineField({
      name: 'coverImage',
      title: '封面圖片 (Cover Image)',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ document }) => document?.coverType !== 'image'
    }),
    defineField({
      name: 'coverSlideshowImages',
      title: '封面輪播圖片 (Slideshow Images)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      hidden: ({ document }) => document?.coverType !== 'slideshow',
      validation: (Rule) => Rule.min(2).error('請至少上傳 2 張圖片以進行輪播')
    }),
    defineField({
      name: 'coverSlideshowSpeed',
      title: '輪播速度 (Slideshow Speed)',
      type: 'number',
      description: '設定每張圖片停留的時間（秒）',
      initialValue: 6,
      options: {
        // @ts-ignore
        range: { min: 1, max: 15, step: 0.5 }
      },
      components: {
        input: SliderInput
      },
      hidden: ({ document }) => document?.coverType !== 'slideshow'
    }),
    defineField({
      name: 'coverVideoUrl',
      title: '封面影片網址',
      type: 'url',
      description: '請貼上 YouTube 或 Vimeo 網址，或是外部 .mp4 連結',
      hidden: ({ document }) => document?.coverType !== 'videoUrl'
    }),
    defineField({
      name: 'coverVideoFile',
      title: '封面影片上傳',
      type: 'file',
      options: { accept: 'video/mp4,video/webm' },
      description: 'Sanity 免費版單一檔案建議不要超過 100MB，超過建議使用上方的 Video URL。',
      hidden: ({ document }) => document?.coverType !== 'videoFile'
    }),

    // --- 區塊拼圖內容 (Content Blocks) ---
    defineField({
      name: 'contentBlocks',
      title: '內容區塊 (Content Blocks)',
      description: '在這裡自由組合各種排版區塊，就像疊積木一樣！',
      type: 'array',
      of: [
        // 1. Highlight Block (大圖或雙排圖)
        {
          type: 'object',
          name: 'highlightBlock',
          title: '高光圖區塊 (Highlight Block)',
          fields: [
            {
              name: 'images',
              title: '圖片 (Images)',
              description: '放 1 張會變全寬大圖，放 2 張會並排。',
              type: 'array',
              of: [{ type: 'image', options: { hotspot: true } }],
              validation: (Rule) => Rule.max(2)
            }
          ],
          preview: {
            prepare() { return { title: '🖼️ 高光圖區塊 (Highlight Block)' } }
          }
        },
        // 1.5 Slideshow Block
        {
          type: 'object',
          name: 'slideshowBlock',
          title: '輪播圖區塊 (Slideshow Block)',
          description: '會自動每 6 秒輪播的圖片區塊（適用於首頁大圖）。',
          fields: [
            {
              name: 'images',
              title: '圖片 (Images)',
              type: 'array',
              of: [{ type: 'image', options: { hotspot: true } }]
            }
          ],
          preview: {
            prepare() { return { title: '🎞️ 輪播圖區塊 (Slideshow Block)' } }
          }
        },
        // 2. Masonry Grid Block (瀑布流)
        {
          type: 'object',
          name: 'masonryGridBlock',
          title: '瀑布流網格區塊 (Masonry Grid Block)',
          fields: [
            {
              name: 'columns',
              title: '欄位數量 (Columns)',
              type: 'number',
              options: { list: [2, 3], layout: 'radio' },
              initialValue: 2
            },
            {
              name: 'mediaItems',
              title: '圖片或影片 (Media Items)',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'mediaItem',
                  title: '多媒體 (Media)',
                  fields: [
                    {
                      name: 'type',
                      type: 'string',
                      options: { 
                        list: [
                          { title: 'Image (圖片)', value: 'image' },
                          { title: 'Video URL (影片網址)', value: 'videoUrl' },
                          { title: 'Video File (直接上傳影片)', value: 'videoFile' }
                        ], 
                        layout: 'radio' 
                      },
                      initialValue: 'image'
                    },
                    {
                      name: 'image',
                      type: 'image',
                      options: { hotspot: true },
                      hidden: ({ parent }) => parent?.type !== 'image'
                    },
                    {
                      name: 'videoUrl',
                      type: 'url',
                      title: '影片網址 (YouTube/Vimeo)',
                      hidden: ({ parent }) => parent?.type !== 'videoUrl'
                    },
                    {
                      name: 'videoFile',
                      type: 'file',
                      title: '上傳影片檔 (.mp4)',
                      options: { accept: 'video/mp4,video/webm' },
                      hidden: ({ parent }) => parent?.type !== 'videoFile'
                    },
                    {
                      name: 'span2',
                      title: '跨越 2 欄 (Span 2 columns)',
                      type: 'boolean',
                      initialValue: false
                    }
                  ]
                }
              ]
            }
          ],
          preview: {
            prepare() { return { title: '🧱 瀑布流網格區塊 (Masonry Grid Block)' } }
          }
        },
        // 3. Separator Block
        {
          type: 'object',
          name: 'separatorBlock',
          title: '文字分隔線 (Separator Block)',
          fields: [
            { name: 'en', type: 'string', title: 'English Title' },
            { name: 'zh', type: 'string', title: '中文標題' },
            {
              name: 'style',
              title: '樣式 (Style)',
              type: 'string',
              options: {
                list: [
                  { title: '置中大寫 (Centered Uppercase)', value: 'centered' },
                  { title: '靠左標題 (Left-aligned)', value: 'left-aligned' }
                ],
                layout: 'radio'
              },
              initialValue: 'centered'
            }
          ],
          preview: {
            select: { title: 'en', subtitle: 'zh' },
            prepare(selection) {
              const { title, subtitle } = selection
              return { title: `--- ${title || subtitle || 'Separator'} ---` }
            }
          }
        },
        // 4. Standard Grid Block
        {
          type: 'object',
          name: 'standardGridBlock',
          title: '標準網格區塊 (Standard Grid Block)',
          description: '真正的 Grid 網格，支援圖片跨越兩欄。',
          fields: [
            {
              name: 'columns',
              title: '欄位數量 (Columns)',
              type: 'number',
              options: { list: [2, 3], layout: 'radio' },
              initialValue: 2
            },
            {
              name: 'mediaItems',
              title: '圖片或影片 (Media Items)',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'mediaItem',
                  title: '多媒體 (Media)',
                  fields: [
                    {
                      name: 'type',
                      type: 'string',
                      options: { 
                        list: [
                          { title: 'Image (圖片)', value: 'image' },
                          { title: 'Video URL (影片網址)', value: 'videoUrl' },
                          { title: 'Video File (直接上傳影片)', value: 'videoFile' }
                        ], 
                        layout: 'radio' 
                      },
                      initialValue: 'image'
                    },
                    {
                      name: 'image',
                      type: 'image',
                      options: { hotspot: true },
                      hidden: ({ parent }) => parent?.type !== 'image'
                    },
                    {
                      name: 'videoUrl',
                      type: 'url',
                      title: '影片網址 (YouTube/Vimeo)',
                      hidden: ({ parent }) => parent?.type !== 'videoUrl'
                    },
                    {
                      name: 'videoFile',
                      type: 'file',
                      title: '上傳影片檔 (.mp4)',
                      options: { accept: 'video/mp4,video/webm' },
                      hidden: ({ parent }) => parent?.type !== 'videoFile'
                    },
                    {
                      name: 'span2',
                      title: '跨越 2 欄 (Span 2 columns)',
                      type: 'boolean',
                      initialValue: false
                    }
                  ]
                }
              ]
            }
          ],
          preview: {
            prepare() { return { title: '🪟 標準網格區塊 (Standard Grid Block)' } }
          }
        }
      ]
    })
  ],
})
