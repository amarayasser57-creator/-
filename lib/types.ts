export type LanguageId = "java" | "python" | "cpp"

export type Level = "مبتدئ" | "متوسط" | "متقدم" | "احترافي"

export interface LanguageMeta {
  id: LanguageId
  name: string
  emoji: string
  tagline: string
  brand: string
}

export interface Section {
  id: string
  language: LanguageId
  index: number
  title: string
  level: Level
  topics: string[]
  lessonCount: number
}

export interface Lesson {
  id: string
  language: LanguageId
  sectionId: string
  sectionTitle: string
  sectionIndex: number
  level: Level
  index: number
  globalIndex: number
  title: string
  topic: string
  angle: string
}

export interface LessonContent {
  intro: string
  objectives: string[]
  explanation: string[]
  code: string
  solution: string
  hint: string
  exercise: string
}
