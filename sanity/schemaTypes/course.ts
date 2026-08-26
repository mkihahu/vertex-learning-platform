import { defineField, defineType } from 'sanity'

export const course = defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'summary', title: 'Summary', type: 'text', rows: 3, validation: (r) => r.required() }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
    defineField({
      name: 'level',
      title: 'Level',
      type: 'string',
      options: { list: [
        { title: 'Beginner', value: 'beginner' },
        { title: 'Intermediate', value: 'intermediate' },
        { title: 'Advanced', value: 'advanced' },
      ] },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'price', title: 'Price', type: 'number', validation: (r) => r.required().min(0) }),
    defineField({ name: 'popular', title: 'Popular', type: 'boolean', initialValue: false }),
    defineField({ name: 'studentCount', title: 'Student count', type: 'number', validation: (r) => r.min(0).integer() }),
    defineField({
      name: 'instructor',
      title: 'Instructor',
      type: 'reference',
      to: [{ type: 'instructor' }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'learningOutcomes',
      title: 'What you will learn',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'learningOutcome',
          title: 'Outcome',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: { list: ['layers', 'workflow', 'gauge', 'rocket', 'shield', 'code', 'database', 'chart'] },
            }),
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
          ],
        },
      ],
      validation: (r) => r.max(8),
    }),
    defineField({
      name: 'modules',
      title: 'Modules',
      description: 'Ordered modules. Lesson numbers (e.g. 5.1) are derived from order.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'module',
          title: 'Module',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'summary', title: 'Summary', type: 'text', rows: 2 }),
            defineField({
              name: 'lessons',
              title: 'Lessons',
              type: 'array',
              of: [{ type: 'reference', to: [{ type: 'lesson' }] }],
              validation: (r) => r.min(1),
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'summary' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', media: 'coverImage', subtitle: 'level' },
  },
  orderings: [
    { title: 'Popular first', name: 'popularDesc', by: [{ field: 'popular', direction: 'desc' }] },
    { title: 'Student count, high → low', name: 'studentCountDesc', by: [{ field: 'studentCount', direction: 'desc' }] },
  ],
})
