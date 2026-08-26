import { type SchemaTypeDefinition } from 'sanity'

import { category } from './category'
import { course } from './course'
import { instructor } from './instructor'
import { lesson } from './lesson'
import { video } from './video'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [category, instructor, lesson, course, video],
}
