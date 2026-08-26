import { defineField, defineType } from 'sanity'

export const lesson = defineType({
  name: 'lesson',
  title: 'Lesson',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      validation: (r) =>
        r.required().uri({ scheme: ['https'] }),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'duration',
      title: 'Duration (seconds)',
      type: 'number',
      validation: (r) => r.min(0).integer(),
    }),
    defineField({
      name: 'freePreview',
      title: 'Free preview',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'studentCount',
      title: 'Student count',
      type: 'number',
      validation: (r) => r.min(0).integer(),
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'keyPoints',
      title: 'In this lesson you will',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (r) => r.max(10),
    }),
    defineField({
      name: 'proTip',
      title: 'Pro tip',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'resources',
      title: 'Resources',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'resource',
          title: 'Resource',
          fields: [
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Link', value: 'link' },
                  { title: 'Article', value: 'article' },
                  { title: 'Video', value: 'video' },
                  { title: 'Doc', value: 'doc' },
                  { title: 'GitHub', value: 'github' },
                ],
              },
            }),
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
            defineField({ name: 'url', title: 'URL', type: 'url', validation: (r) => r.uri({ scheme: ['http', 'https'] }) }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'type' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', media: 'thumbnail', subtitle: 'duration' },
    prepare({ title, media, subtitle }) {
      const dur = typeof subtitle === 'number' ? `${Math.floor(subtitle / 60)}m ${subtitle % 60}s` : subtitle
      return { title, media, subtitle: dur as string }
    },
  },
  orderings: [
    { title: 'Student count, high → low', name: 'studentCountDesc', by: [{ field: 'studentCount', direction: 'desc' }] },
    { title: 'Title A→Z', name: 'titleAsc', by: [{ field: 'title', direction: 'asc' }] },
  ],
})
