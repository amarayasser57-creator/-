"use client"

import * as React from "react"
import {
  makeStyles,
  mergeClasses,
  tokens,
  typographyStyles,
  Input,
  Dropdown,
  Option,
  Field,
  Button,
  Badge,
  ProgressBar,
  Caption1,
  Body1Strong,
  Tooltip,
} from "@fluentui/react-components"
import {
  Search24Regular,
  ChevronDown20Regular,
  ChevronRight20Regular,
  CheckmarkCircle16Filled,
  Warning16Filled,
  Circle16Regular,
  Home24Regular,
  Dismiss20Regular,
} from "@fluentui/react-icons"
import type { Lesson, Section, Level } from "../lib/types"
import type { LessonStatus } from "../lib/use-progress"
import { LEVELS } from "../lib/curriculum"

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: tokens.colorNeutralBackground2,
    borderInlineStart: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    overflow: "hidden",
  },
  controls: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    paddingTop: tokens.spacingVerticalL,
    paddingBottom: tokens.spacingVerticalM,
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
  },
  filterRow: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
  },
  filterItem: {
    flex: 1,
    minWidth: 0,
  },
  progressBlock: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    marginTop: tokens.spacingVerticalXS,
  },
  progressHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  homeBtn: {
    justifyContent: "flex-start",
  },
  list: {
    flex: 1,
    overflowY: "auto",
    paddingBottom: tokens.spacingVerticalXXL,
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    width: "100%",
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    textAlign: "start",
    color: tokens.colorNeutralForeground1,
    ":hover": { backgroundColor: tokens.colorNeutralBackground2Hover },
  },
  sectionTitleWrap: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  sectionTitle: {
    ...typographyStyles.body1Strong,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  sectionMeta: {
    color: tokens.colorNeutralForeground3,
  },
  lessonRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    width: "100%",
    paddingTop: tokens.spacingVerticalXS,
    paddingBottom: tokens.spacingVerticalXS,
    paddingInlineStart: tokens.spacingHorizontalXXL,
    paddingInlineEnd: tokens.spacingHorizontalL,
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    textAlign: "start",
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase300,
    fontFamily: tokens.fontFamilyBase,
    ":hover": { backgroundColor: tokens.colorNeutralBackground2Hover },
  },
  lessonRowActive: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  lessonText: {
    flex: 1,
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  iconCompleted: { color: tokens.colorStatusSuccessForeground1 },
  iconWeak: { color: tokens.colorStatusWarningForeground1 },
  iconNeutral: { color: tokens.colorNeutralForeground4 },
  empty: {
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    paddingTop: tokens.spacingVerticalXL,
    textAlign: "center",
    color: tokens.colorNeutralForeground3,
  },
})

function StatusIcon({ status, className }: { status?: LessonStatus; className: string }) {
  if (status === "completed") return <CheckmarkCircle16Filled className={className} />
  if (status === "weak") return <Warning16Filled className={className} />
  return <Circle16Regular className={className} />
}

interface SidebarProps {
  sections: Section[]
  lessons: Lesson[]
  statuses: Record<string, LessonStatus>
  selectedLessonId?: string
  onSelectLesson: (lessonId: string) => void
  onGoHome: () => void
  onClose?: () => void
}

export function Sidebar({
  sections,
  lessons,
  statuses,
  selectedLessonId,
  onSelectLesson,
  onGoHome,
  onClose,
}: SidebarProps) {
  const styles = useStyles()
  const [query, setQuery] = React.useState("")
  const [level, setLevel] = React.useState<Level | "الكل">("الكل")
  const [sectionFilter, setSectionFilter] = React.useState<string>("الكل")
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({})

  const normalizedQuery = query.trim().toLowerCase()

  const filteredLessons = React.useMemo(() => {
    return lessons.filter((l) => {
      if (level !== "الكل" && l.level !== level) return false
      if (sectionFilter !== "الكل" && l.sectionId !== sectionFilter) return false
      if (normalizedQuery) {
        const haystack = `${l.title} ${l.topic} ${l.sectionTitle}`.toLowerCase()
        if (!haystack.includes(normalizedQuery)) return false
      }
      return true
    })
  }, [lessons, level, sectionFilter, normalizedQuery])

  const lessonsBySection = React.useMemo(() => {
    const map = new Map<string, Lesson[]>()
    for (const l of filteredLessons) {
      const arr = map.get(l.sectionId) ?? []
      arr.push(l)
      map.set(l.sectionId, arr)
    }
    return map
  }, [filteredLessons])

  const isSearching = normalizedQuery.length > 0 || level !== "الكل" || sectionFilter !== "الكل"

  // expand the section of the selected lesson
  React.useEffect(() => {
    if (selectedLessonId) {
      const lesson = lessons.find((l) => l.id === selectedLessonId)
      if (lesson) setExpanded((prev) => ({ ...prev, [lesson.sectionId]: true }))
    }
  }, [selectedLessonId, lessons])

  const completedCount = React.useMemo(
    () => lessons.filter((l) => statuses[l.id] === "completed").length,
    [lessons, statuses],
  )
  const progress = lessons.length ? completedCount / lessons.length : 0

  const toggleSection = (id: string) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))

  const visibleSections = sections.filter(
    (s) => !isSearching || (lessonsBySection.get(s.id)?.length ?? 0) > 0,
  )

  return (
    <div className={styles.root}>
      <div className={styles.controls}>
        {onClose ? (
          <div className={styles.progressHeader}>
            <Body1Strong>المحتوى</Body1Strong>
            <Button
              appearance="subtle"
              icon={<Dismiss20Regular />}
              aria-label="إغلاق القائمة"
              onClick={onClose}
            />
          </div>
        ) : null}

        <Button
          appearance="subtle"
          icon={<Home24Regular />}
          className={styles.homeBtn}
          onClick={onGoHome}
        >
          الرئيسية ولوحة التقدم
        </Button>

        <Input
          value={query}
          onChange={(_, data) => setQuery(data.value)}
          contentBefore={<Search24Regular />}
          placeholder="ابحث في الدروس..."
          aria-label="بحث في الدروس"
        />

        <div className={styles.filterRow}>
          <div className={styles.filterItem}>
            <Field label="المستوى">
              <Dropdown
                value={level}
                selectedOptions={[level]}
                onOptionSelect={(_, data) => setLevel((data.optionValue as Level) ?? "الكل")}
              >
                <Option value="الكل">الكل</Option>
                {LEVELS.map((lv) => (
                  <Option key={lv} value={lv}>
                    {lv}
                  </Option>
                ))}
              </Dropdown>
            </Field>
          </div>
          <div className={styles.filterItem}>
            <Field label="القسم">
              <Dropdown
                value={
                  sectionFilter === "الكل"
                    ? "الكل"
                    : sections.find((s) => s.id === sectionFilter)?.title ?? "الكل"
                }
                selectedOptions={[sectionFilter]}
                onOptionSelect={(_, data) => setSectionFilter(data.optionValue ?? "الكل")}
              >
                <Option value="الكل" text="الكل">
                  الكل
                </Option>
                {sections.map((s) => (
                  <Option key={s.id} value={s.id} text={s.title}>
                    {`${s.index}. ${s.title}`}
                  </Option>
                ))}
              </Dropdown>
            </Field>
          </div>
        </div>

        <div className={styles.progressBlock}>
          <div className={styles.progressHeader}>
            <Caption1>تقدّمك في هذه اللغة</Caption1>
            <Caption1>{`${completedCount} / ${lessons.length}`}</Caption1>
          </div>
          <ProgressBar value={progress} thickness="large" color="brand" />
          <Caption1 className={styles.sectionMeta}>{`${Math.round(progress * 100)}% مكتمل`}</Caption1>
        </div>
      </div>

      <div className={styles.list}>
        {visibleSections.length === 0 ? (
          <div className={styles.empty}>
            <Caption1>لا توجد دروس مطابقة لبحثك.</Caption1>
          </div>
        ) : (
          visibleSections.map((section) => {
            const sectionLessons = isSearching
              ? lessonsBySection.get(section.id) ?? []
              : lessons.filter((l) => l.sectionId === section.id)
            const isOpen = isSearching || expanded[section.id]
            const doneInSection = sectionLessons.filter(
              (l) => statuses[l.id] === "completed",
            ).length
            return (
              <div key={section.id}>
                <button
                  className={styles.sectionHeader}
                  onClick={() => toggleSection(section.id)}
                  aria-expanded={isOpen}
                >
                  {isOpen ? <ChevronDown20Regular /> : <ChevronRight20Regular />}
                  <div className={styles.sectionTitleWrap}>
                    <span className={styles.sectionTitle}>
                      {`${section.index}. ${section.title}`}
                    </span>
                    <Caption1 className={styles.sectionMeta}>
                      {`${section.level} · ${doneInSection}/${sectionLessons.length} مكتمل`}
                    </Caption1>
                  </div>
                  <Badge appearance="tint" color="informative" size="small">
                    {sectionLessons.length}
                  </Badge>
                </button>

                {isOpen
                  ? sectionLessons.map((lesson) => {
                      const status = statuses[lesson.id]
                      const active = lesson.id === selectedLessonId
                      const iconClass =
                        status === "completed"
                          ? styles.iconCompleted
                          : status === "weak"
                            ? styles.iconWeak
                            : styles.iconNeutral
                      return (
                        <button
                          key={lesson.id}
                          className={mergeClasses(
                            styles.lessonRow,
                            active && styles.lessonRowActive,
                          )}
                          onClick={() => onSelectLesson(lesson.id)}
                        >
                          <Tooltip
                            content={
                              status === "completed"
                                ? "مكتمل"
                                : status === "weak"
                                  ? "درس ضعيف — راجعه"
                                  : "لم يكتمل بعد"
                            }
                            relationship="label"
                          >
                            <span style={{ display: "inline-flex" }}>
                              <StatusIcon status={status} className={iconClass} />
                            </span>
                          </Tooltip>
                          <span className={styles.lessonText}>
                            {`${lesson.index}. ${lesson.title}`}
                          </span>
                        </button>
                      )
                    })
                  : null}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
