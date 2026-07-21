import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'about',
  title: '關於我 (About)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '姓名 (Name)',
      type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'zh', type: 'string', title: '中文' }
      ]
    }),
    defineField({
      name: 'role',
      title: '職稱 (Role)',
      type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'zh', type: 'string', title: '中文' }
      ]
    }),
    defineField({
      name: 'bio',
      title: '自我介紹 (Bio)',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English' },
        { name: 'zh', type: 'text', title: '中文' }
      ]
    }),
    defineField({
      name: 'section1',
      title: '區塊 1 (Section 1)',
      type: 'object',
      fields: [
        { name: 'title', title: '標題', type: 'object', fields: [{name: 'en', type: 'string', title: 'English'}, {name: 'zh', type: 'string', title: '中文'}] },
        { name: 'desc', title: '內文', type: 'object', fields: [{name: 'en', type: 'text', title: 'English'}, {name: 'zh', type: 'text', title: '中文'}] }
      ]
    }),
    defineField({
      name: 'section2',
      title: '區塊 2 (Section 2 - Skills)',
      type: 'object',
      fields: [
        { name: 'title', title: '標題', type: 'object', fields: [{name: 'en', type: 'string', title: 'English'}, {name: 'zh', type: 'string', title: '中文'}] },
        { name: 'skills', title: '技能標籤', type: 'object', fields: [
          { name: 'en', type: 'array', title: 'English Skills', of: [{type: 'string'}] },
          { name: 'zh', type: 'array', title: '中文技能', of: [{type: 'string'}] }
        ]}
      ]
    }),
    defineField({
      name: 'section3',
      title: '區塊 3 (Section 3)',
      type: 'object',
      fields: [
        { name: 'title', title: '標題', type: 'object', fields: [{name: 'en', type: 'string', title: 'English'}, {name: 'zh', type: 'string', title: '中文'}] },
        { name: 'desc', title: '內文', type: 'object', fields: [{name: 'en', type: 'text', title: 'English'}, {name: 'zh', type: 'text', title: '中文'}] }
      ]
    }),
    defineField({
      name: 'resumeSections',
      title: '履歷區塊 (Resume Sections)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'resumeSection',
          title: '履歷大項 (例如：工作經歷)',
          fields: [
            { name: 'title', title: '區塊標題', type: 'object', fields: [{name: 'en', type: 'string', title: 'English'}, {name: 'zh', type: 'string', title: '中文'}] },
            {
              name: 'items',
              title: '項目列表',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'resumeItem',
                  title: '一般經歷項目 (Resume Item)',
                  fields: [
                    { name: 'year', title: '年份 (左側)', type: 'object', fields: [{name: 'en', type: 'string', title: 'English'}, {name: 'zh', type: 'string', title: '中文'}] },
                    { name: 'description', title: '描述 (右側)', type: 'object', fields: [{name: 'en', type: 'text', title: 'English'}, {name: 'zh', type: 'text', title: '中文'}] }
                  ],
                  preview: {
                    select: { title: 'description.zh', subtitle: 'year.zh' }
                  }
                },
                {
                  type: 'object',
                  name: 'resumeCategory',
                  title: '分類標題 (Category Title)',
                  fields: [
                    { name: 'title', title: '標題', type: 'object', fields: [{name: 'en', type: 'string', title: 'English'}, {name: 'zh', type: 'string', title: '中文'}] }
                  ],
                  preview: {
                    select: { title: 'title.zh' },
                    prepare(selection) {
                      return { title: `📂 ${selection.title}` }
                    }
                  }
                }
              ]
            }
          ],
          preview: {
            select: { title: 'title.zh' }
          }
        }
      ]
    })
  ]
})
