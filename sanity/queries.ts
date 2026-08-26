import { defineQuery } from 'next-sanity'

export const coursesQuery = defineQuery(`*[_type == "course"] | order(popular desc, studentCount desc){
  _id, title, slug, summary, coverImage, level, price, popular, studentCount,
  category->{ _id, title, slug },
  instructor->{ _id, name, slug, photo },
  learningOutcomes,
  modules[]{ _key, title, summary, lessons[]->{ _id, title, slug } }
}`)

export const courseBySlugQuery = defineQuery(`*[_type == "course" && slug.current == $slug][0]{
  _id, title, slug, summary, coverImage, level, price, popular, studentCount,
  category->{ _id, title, slug, description },
  instructor->{ _id, name, slug, photo, expertise, bio },
  learningOutcomes,
  modules[]{
    _key, title, summary,
    lessons[]->{ _id, title, slug, videoUrl, thumbnail, duration, freePreview, studentCount }
  }
}`)

export const courseSlugsQuery = defineQuery(`*[_type == "course"]{ "slug": slug.current }`)

export const lessonBySlugQuery = defineQuery(`*[_type == "lesson" && slug.current == $slug][0]{
  _id, title, slug, videoUrl, thumbnail, duration, freePreview, studentCount,
  notes, keyPoints, proTip, resources,
  "parentCourses": *[_type == "course" && ^._id in modules[].lessons[]._ref]{
    _id, title, slug,
    category->{ title, slug },
    modules[]{ _key, title, lessons[]->{ _id } }
  }
}`)

export const lessonSlugsQuery = defineQuery(`*[_type == "lesson"]{ "slug": slug.current }`)

export const lessonsQuery = defineQuery(`*[_type == "lesson"] | order(studentCount desc){
  _id, title, slug, videoUrl, thumbnail, duration, freePreview
}`)

export const instructorBySlugQuery = defineQuery(`*[_type == "instructor" && slug.current == $slug][0]{
  _id, name, slug, photo, expertise, bio,
  "courses": *[_type == "course" && instructor._ref == ^._id]{
    _id, title, slug, summary, coverImage, level, price, studentCount
  }
}`)

export const instructorsQuery = defineQuery(`*[_type == "instructor"] | order(name asc){
  _id, name, slug, photo, expertise
}`)

export const categoriesQuery = defineQuery(`*[_type == "category"] | order(title asc){
  _id, title, slug, description
}`)

export const categoryBySlugQuery = defineQuery(`*[_type == "category" && slug.current == $slug][0]{
  _id, title, slug, description,
  "courses": *[_type == "course" && category._ref == ^._id]{
    _id, title, slug, summary, coverImage, level, price, studentCount
  }
}`)
