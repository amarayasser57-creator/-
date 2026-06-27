"use client"

import * as React from "react"
import {
  makeStyles,
  tokens,
  typographyStyles,
  Title2,
  Title3,
  Subtitle2,
  Body1,
  Caption1,
  Badge,
  Button,
  Card,
  Divider,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
  MessageBar,
  MessageBarBody,
  MessageBarTitle,
  Spinner,
} from "@fluentui/react-components"
import {
  CheckmarkCircle24Regular,
  Warning24Regular,
  Lightbulb24Regular,
  Eye24Regular,
  EyeOff24Regular,
  ArrowRight24Regular,
  ArrowLeft24Regular,
  Target24Regular,
  Code24Regular,
  Sparkle24Regular,
} from "@fluentui/react-icons"
import type { Lesson } from "../lib/types"
import type { LessonStatus } from "../lib/use-progress"
import { buildLessonContent, getLanguageMeta } from "../lib/curriculum"
import { CodeBlock } from "./code-block"

const useStyles = makeStyles({
  scroll: {
    height: "100%",
    overflowY: "auto",
    backgroundColor: tokens.colorNeutralBackground2,
  },
  container: {
    maxWidth: "860px",
    marginInline: "auto",
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
    paddingTop: tokens.spacingVerticalXXL,
    paddingBottom: tokens.spacingVerticalXXXL,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  headerRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalS,
    alignItems: "center",
  },
  title: {
    marginTop: tokens.spacingVerticalXS,
  },
  card: {
    padding: tokens.spacingHorizontalL,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  sectionLabel: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    color: tokens.colorBrandForeground1,
  },
  objectives: {
    margin: 0,
    paddingInlineStart: tokens.spacingHorizontalL,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    color: tokens.colorNeutralForeground1,
  },
  paragraphs: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  hintBody: {
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusMedium,
    padding: tokens.spacingHorizontalL,
    borderInlineStartWidth: tokens.strokeWidthThicker,
    borderInlineStartStyle: "solid",
    borderInlineStartColor: tokens.colorBrandStroke1,
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalS,
    alignItems: "center",
  },
  spacer: { flex: 1 },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalM,
    marginTop: tokens.spacingVerticalM,
  },
  navText: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    minWidth: 0,
  },
  statValue: {
    ...typographyStyles.title2,
    color: tokens.colorBrandForeground1,
  },
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

interface LessonViewProps {
  lesson: Lesson
  status?: LessonStatus
  onMarkCompleted: () => void
  onMarkWeak: () => void
  prevLesson?: Lesson
  nextLesson?: Lesson
  onNavigate: (lessonId: string) => void
}

export function LessonView({
  lesson,
  status,
  onMarkCompleted,
  onMarkWeak,
  prevLesson,
  nextLesson,
  onNavigate,
}: LessonViewProps) {
  const styles = useStyles()
  const content = React.useMemo(() => buildLessonContent(lesson), [lesson])
  const langMeta = getLanguageMeta(lesson.language)

  const [showSolution, setShowSolution] = React.useState(false)
  const [hintState, setHintState] = React.useState<"idle" | "loading" | "ready">("idle")

  // reset transient UI when lesson changes
  React.useEffect(() => {
    setShowSolution(false)
    setHintState("idle")
  }, [lesson.id])

  const requestHint = () => {
    setHintState("loading")
    setTimeout(() => setHintState("ready"), 900)
  }

  return (
    <div className={styles.scroll}>
      <div className={styles.container}>
        <Breadcrumb aria-label="مسار الدرس" size="small">
          <BreadcrumbItem>
            <BreadcrumbButton>{`${langMeta.emoji} ${langMeta.name}`}</BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <BreadcrumbButton>{`${lesson.sectionIndex}. ${lesson.sectionTitle}`}</BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <BreadcrumbButton current>{`الدرس ${lesson.index}`}</BreadcrumbButton>
          </BreadcrumbItem>
        </Breadcrumb>

        <div>
          <div className={styles.headerRow}>
            <Badge appearance="filled" color={levelColor(lesson.level)}>
              {lesson.level}
            </Badge>
            <Badge appearance="tint" color="informative">
              {`الدرس ${lesson.globalIndex} من 500`}
            </Badge>
            {status === "completed" ? (
              <Badge appearance="tint" color="success">
                مكتمل
              </Badge>
            ) : null}
            {status === "weak" ? (
              <Badge appearance="tint" color="warning">
                درس ضعيف
              </Badge>
            ) : null}
          </div>
          <Title2 className={styles.title}>{lesson.title}</Title2>
        </div>

        <MessageBar intent="info">
          <MessageBarBody>
            <MessageBarTitle>نظرة عامة</MessageBarTitle>
            {content.intro}
          </MessageBarBody>
        </MessageBar>

        <Card className={styles.card}>
          <div className={styles.sectionLabel}>
            <Target24Regular />
            <Subtitle2>أهداف الدرس</Subtitle2>
          </div>
          <ul className={styles.objectives}>
            {content.objectives.map((o, i) => (
              <li key={i}>
                <Body1>{o}</Body1>
              </li>
            ))}
          </ul>
        </Card>

        <Card className={styles.card}>
          <Title3>الشرح</Title3>
          <div className={styles.paragraphs}>
            {content.explanation.map((p, i) => (
              <Body1 key={i}>{p}</Body1>
            ))}
          </div>
        </Card>

        <Card className={styles.card}>
          <div className={styles.sectionLabel}>
            <Code24Regular />
            <Subtitle2>مثال برمجي</Subtitle2>
          </div>
          <CodeBlock code={content.code} label={`${langMeta.name.toLowerCase()}`} />
        </Card>

        <Card className={styles.card}>
          <div className={styles.sectionLabel}>
            <Sparkle24Regular />
            <Subtitle2>تمرين تطبيقي</Subtitle2>
          </div>
          <Body1>{content.exercise}</Body1>
          <Divider />
          <div className={styles.actions}>
            <Button
              appearance="primary"
              icon={showSolution ? <EyeOff24Regular /> : <Eye24Regular />}
              onClick={() => setShowSolution((s) => !s)}
            >
              {showSolution ? "إخفاء الحل" : "عرض الحل"}
            </Button>
            <Button
              appearance="outline"
              icon={hintState === "loading" ? <Spinner size="tiny" /> : <Lightbulb24Regular />}
              onClick={requestHint}
              disabled={hintState === "loading"}
            >
              {hintState === "idle" ? "تلميح ذكي (AI)" : hintState === "loading" ? "جارٍ التوليد..." : "تلميح ذكي (AI)"}
            </Button>
          </div>

          {hintState === "ready" ? (
            <div className={styles.hintBody}>
              <Caption1>مساعد CodeMaster الذكي</Caption1>
              <Body1>{content.hint}</Body1>
            </div>
          ) : null}

          {showSolution ? <CodeBlock code={content.solution} label="solution" /> : null}
        </Card>

        <Card className={styles.card}>
          <Subtitle2>تتبّع تقدّمك</Subtitle2>
          <div className={styles.actions}>
            <Button
              appearance={status === "completed" ? "primary" : "secondary"}
              icon={<CheckmarkCircle24Regular />}
              onClick={onMarkCompleted}
            >
              {status === "completed" ? "تم الإكمال ✓" : "وضع علامة مكتمل"}
            </Button>
            <Button
              appearance={status === "weak" ? "primary" : "outline"}
              icon={<Warning24Regular />}
              onClick={onMarkWeak}
            >
              تحديده كدرس ضعيف
            </Button>
            <span className={styles.spacer} />
          </div>
          <Caption1 style={{ color: tokens.colorNeutralForeground3 }}>
            الدروس الضعيفة تُجمع تلقائياً في لوحة التقدم لتسهيل مراجعتها لاحقاً.
          </Caption1>
        </Card>

        <div className={styles.nav}>
          <Button
            appearance="subtle"
            icon={<ArrowRight24Regular />}
            disabled={!prevLesson}
            onClick={() => prevLesson && onNavigate(prevLesson.id)}
          >
            <span className={styles.navText}>
              <Caption1>الدرس السابق</Caption1>
            </span>
          </Button>
          <Button
            appearance="primary"
            iconPosition="after"
            icon={<ArrowLeft24Regular />}
            disabled={!nextLesson}
            onClick={() => nextLesson && onNavigate(nextLesson.id)}
          >
            الدرس التالي
          </Button>
        </div>
      </div>
    </div>
  )
}
