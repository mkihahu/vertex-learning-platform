import { defineField, defineType } from 'sanity'

export const video = defineType({
  name: 'video',
  title: 'Video (internal)',
  type: 'document',
  fields: [
    defineField({
      name: 'url',
      title: 'Video URL',
      type: 'url',
      validation: (r) => r.required().uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'chapters',
      title: 'Table of contents',
      description: 'Chapter markers from provider or authored.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'chapter',
          fields: [
            defineField({ name: 'startSeconds', title: 'Start (seconds)', type: 'number', validation: (r) => r.required().min(0) }),
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (r) => r.required() }),
          ],
        },
      ],
    }),
    defineField({
      name: 'chunks',
      title: 'Transcript chunks',
      description: 'Timestamped transcript pieces. Never return whole array in page queries.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'chunk',
          fields: [
            defineField({ name: 'startSeconds', title: 'Start (seconds)', type: 'number', validation: (r) => r.required().min(0) }),
            defineField({ name: 'text', title: 'Text', type: 'text', rows: 2, validation: (r) => r.required() }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'url' },
  },
})
