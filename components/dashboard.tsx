"use client"

import * as React from "react"
import {
  makeStyles,
  tokens,
  typographyStyles,
  Title1,
  Title3,
  Subtitle2,
  Body1,
  Caption1,
  Card,
  Button,
  Badge,
  ProgressBar,
  Divider,
} from "@fluentui/react-components"
import {
  Play24Filled,
  Trophy24Regular,
  Warning24Regular,
  BookOpen24Regular,
  ArrowLeft20Regular,
  Checkmark24Regular,
} from "@fluentui/react-icons"
import type { Lesson, Section, LanguageMeta, Level } from "../lib/types"
import type { LessonStatus, Reminder } from "../lib/use-progress"
import { LEVELS } from "../lib/curriculum"
import { Reminders } from "./reminders"

const useStyles = makeStyles({
  scroll: {
    height: "100%",
    overflowY: "auto",
    backgroundColor: tokens.colorNeutralBackground2,
  },
  container: {
    maxWidth: "1040px",
    marginInline: "auto",
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
    paddingTop: tokens.spacingVerticalXXL,
    paddingBottom: tokens.spacingVerticalXXXL,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  hero: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: tokens.spacingHorizontalL,
    padding: tokens.spacingHorizontalXXL,
    borderRadius: tokens.borderRadiusXLarge,
    background: `linear-gradient(135deg, ${tokens.colorBrandBackground2}, ${tokens.colorNeutralBackground1})`,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
  },
  heroEmoji: { fontSize: "56px", lineHeight: 1 },
  heroText: { flex: 1, minWidth: "240px", display: "flex", flexDirection: "column", gap: tokens.spacingVerticalXS },
  heroActions: { display: "flex", gap: tokens.spacingHorizontalS, flexWrap: "wrap" },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: tokens.spacingHorizontalM,
  },
  statCard: {
    padding: tokens.spacingHorizontalL,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  statHead: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    color: tokens.colorNeutralForeground2,
  },
  statValue: {
    ...typographyStyles.title1,
    color: tokens.colorBrandForeground1,
  },
  levelGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: tokens.spacingHorizontalM,
  },
  levelCard: {
    padding: tokens.spacingHorizontalL,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  levelHead: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  card: {
    padding: tokens.spacingHorizontalL,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  cardHead: { display: "flex", alignItems: "center", gap: tokens.spacingHorizontalS, color: tokens.colorBrandForeground1 },
  weakRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground3,
    cursor: "pointer",
    border: "none",
    width: "100%",
    textAlign: "start",
    color: tokens.colorNeutralForeground1,
    ":hover": { backgroundColor: tokens.colorNeutralBackground3Hover },
  },
  weakText: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column" },
  weakTitle: {
    ...typographyStyles.body1Strong,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  empty: { color: tokens.colorNeutralForeground3 },
  sectionTitle: { marginTop: tokens.spacingVerticalM },
})

function levelColor(level: string): "brand" | "success" | "warning" | "danger" {
  switch (level) {
    case "مبتدئ":
      return "success"
    case "متوسط":
      return "brand"
    case "متقدم":
      return "warning"
    default:
      return "danger"
  }
}

interface DashboardProps {
  meta: LanguageMeta
  sections: Section[]
  lessons: Lesson[]
  statuses: Record<string, LessonStatus>
  lastVisitedId?: string
  reminders: Reminder[]
  onSelectLesson: (lessonId: string) => void
  onAddReminder: (text: string, time: string) => void
  onRemoveReminder: (id: string) => void
}

export function Dashboard({
  meta,
  sections,
  lessons,
  statuses,
  lastVisitedId,
  reminders,
  onSelectLesson,
  onAddReminder,
  onRemoveReminder,
}: DashboardProps) {
  const styles = useStyles()

  const completed = lessons.filter((l) => statuses[l.id] === "completed").length
  const weakLessons = lessons.filter((l) => statuses[l.id] === "weak")
  const overall = lessons.length ? completed / lessons.length : 0

  const byLevel = React.useMemo(() => {
    return LEVELS.map((level) => {
      const levelLessons = lessons.filter((l) => l.level === level)
      const done = levelLessons.filter((l) => statuses[l.id] === "completed").length
      return { level, total: levelLessons.length, done }
    })
  }, [lessons, statuses])

  const continueLesson =
    (lastVisitedId && lessons.find((l) => l.id === lastVisitedId)) ||
    lessons.find((l) => statuses[l.id] !== "completed") ||
    lessons[0]

  return (
    <div className={styles.scroll}>
      <div className={styles.container}>
        <div className={styles.hero}>
          <span className={styles.heroEmoji} aria-hidden>
            {meta.emoji}
          </span>
          <div className={styles.heroText}>
            <Title1>{`مسار ${meta.name}`}</Title1>
            <Body1>{meta.tagline}</Body1>
            <div>
              <Badge appearance="tint" color="brand">
                {`${lessons.length} درس · ${sections.length} قسم · 4 مستويات`}
              </Badge>
            </div>
          </div>
          <div className={styles.heroActions}>
            {continueLesson ? (
              <Button
                appearance="primary"
                size="large"
                icon={<Play24Filled />}
                onClick={() => onSelectLesson(continueLesson.id)}
              >
                {lastVisitedId ? "متابعة التعلّم" : "ابدأ التعلّم"}
              </Button>
            ) : null}
          </div>
        </div>

        <div className={styles.statsGrid}>
          <Card className={styles.statCard}>
            <div className={styles.statHead}>
              <BookOpen24Regular />
              <Caption1>إجمالي الدروس</Caption1>
            </div>
            <span className={styles.statValue}>{lessons.length}</span>
          </Card>
          <Card className={styles.statCard}>
            <div className={styles.statHead}>
              <Checkmark24Regular />
              <Caption1>دروس مكتملة</Caption1>
            </div>
            <span className={styles.statValue}>{completed}</span>
          </Card>
          <Card className={styles.statCard}>
            <div className={styles.statHead}>
              <Warning24Regular />
              <Caption1>دروس ضعيفة</Caption1>
            </div>
            <span className={styles.statValue}>{weakLessons.length}</span>
          </Card>
          <Card className={styles.statCard}>
            <div className={styles.statHead}>
              <Trophy24Regular />
              <Caption1>نسبة الإنجاز</Caption1>
            </div>
            <span className={styles.statValue}>{`${Math.round(overall * 100)}%`}</span>
            <ProgressBar value={overall} thickness="large" color="brand" />
          </Card>
        </div>

        <Title3 className={styles.sectionTitle}>التقدّم حسب المستوى</Title3>
        <div className={styles.levelGrid}>
          {byLevel.map(({ level, total, done }) => (
            <Card key={level} className={styles.levelCard}>
              <div className={styles.levelHead}>
                <Subtitle2>{level}</Subtitle2>
                <Badge appearance="tint" color={levelColor(level)}>
                  {`${done}/${total}`}
                </Badge>
              </div>
              <ProgressBar
                value={total ? done / total : 0}
                thickness="large"
                color={levelColor(level) === "danger" ? "error" : levelColor(level)}
              />
              <Caption1 className={styles.empty}>
                {`${total ? Math.round((done / total) * 100) : 0}% مكتمل من هذا المستوى`}
              </Caption1>
            </Card>
          ))}
        </div>

        <Card className={styles.card}>
          <div className={styles.cardHead}>
            <Warning24Regular />
            <Subtitle2>{`الدروس الضعيفة (${weakLessons.length})`}</Subtitle2>
          </div>
          <Divider />
          {weakLessons.length === 0 ? (
            <Caption1 className={styles.empty}>
              لا توجد دروس ضعيفة حالياً. عندما تحدّد درساً كـ "ضعيف" سيظهر هنا لمراجعته بسهولة.
            </Caption1>
          ) : (
            weakLessons.slice(0, 12).map((l) => (
              <button key={l.id} className={styles.weakRow} onClick={() => onSelectLesson(l.id)}>
                <Warning24Regular style={{ color: tokens.colorStatusWarningForeground1 }} />
                <span className={styles.weakText}>
                  <span className={styles.weakTitle}>{l.title}</span>
                  <Caption1 className={styles.empty}>{`${l.sectionIndex}. ${l.sectionTitle} · ${l.level}`}</Caption1>
                </span>
                <ArrowLeft20Regular />
              </button>
            ))
          )}
        </Card>

        <Reminders reminders={reminders} onAdd={onAddReminder} onRemove={onRemoveReminder} />
      </div>
    </div>
  )
}
