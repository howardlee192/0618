import { defineField, defineType } from 'sanity'
import { SliderInput } from '../components/SliderInput'

export default defineType({
  name: 'home',
  title: '首頁設定 (Home Settings)',
  type: 'document',
  fields: [
    defineField({
      name: 'featuredProjects',
      title: '精選作品 (Featured Projects)',
      description: '可以在這裡新增、刪除或上下拖曳來改變首頁精選作品的順序',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'project' }]
        }
      ]
    }),
    defineField({
      name: 'highlights',
      title: '重點文字影像 (Highlight Media)',
      description: '設定首頁大字的浮動影像（圖片輪播或影片）',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'word',
              title: '標籤文字 (Text ID)',
              description: '例如: VISUAL, MOTION, PERSONAL, HONG KONG, TAIWAN',
              type: 'string',
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: 'mediaType',
              title: '媒體類型 (Media Type)',
              type: 'string',
              options: {
                list: [
                  { title: '圖片輪播 (Slideshow)', value: 'slideshow' },
                  { title: '影片 (Video)', value: 'video' },
                ],
                layout: 'radio'
              },
              initialValue: 'slideshow',
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: 'images',
              title: '輪播圖片 (Slideshow Images)',
              type: 'array',
              of: [{ type: 'image' }],
              hidden: ({ parent }) => parent?.mediaType !== 'slideshow'
            }),
            defineField({
              name: 'slideshowSpeed',
              title: '輪播速度 (Slideshow Speed) 秒數',
              type: 'number',
              initialValue: 6,
              components: {
                input: SliderInput
              },
              hidden: ({ parent }) => parent?.mediaType !== 'slideshow'
            }),
            defineField({
              name: 'videoFile',
              title: '影片檔案 (Video File)',
              type: 'file',
              options: { accept: 'video/mp4,video/webm' },
              hidden: ({ parent }) => parent?.mediaType !== 'video'
            })
          ],
          preview: {
            select: {
              title: 'word',
              mediaType: 'mediaType',
              image: 'images.0'
            },
            prepare(selection) {
              const { title, mediaType, image } = selection
              return {
                title: title,
                subtitle: mediaType === 'video' ? '影片 (Video)' : '輪播圖片 (Slideshow)',
                media: image
              }
            }
          }
        }
      ]
    })
  ]
})
