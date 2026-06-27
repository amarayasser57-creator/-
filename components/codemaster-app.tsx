"use client"

import * as React from "react"
import {
  makeStyles,
  tokens,
  typographyStyles,
  TabList,
  Tab,
  ToggleButton,
  Button,
  Tooltip,
  Spinner,
  OverlayDrawer,
  DrawerBody,
} from "@fluentui/react-components"
import {
  WeatherMoon24Regular,
  WeatherSunny24Regular,
  Navigation24Regular,
  Code24Filled,
} from "@fluentui/react-icons"
import { useThemeMode } from "../app/providers"
import { LANGUAGES, getCurriculum, getLanguageMeta } from "../lib/curriculum"
import type { LanguageId } from "../lib/types"
import { useProgress } from "../lib/use-progress"
import { Sidebar } from "./sidebar"
import { Dashboard } from "./dashboard"
import { LessonView } from "./lesson-view"

const useStyles = makeStyles({
  app: {
    display: "flex",
    flexDirection: "column",
    height: "100dvh",
    backgroundColor: tokens.colorNeutralBackground2,
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    flexWrap: "wrap",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  brandMark: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    borderRadius: tokens.borderRadiusLarge,
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
  },
  brandText: { ...typographyStyles.subtitle1, color: tokens.colorNeutralForeground1 },
  brandSub: { ...typographyStyles.caption1, color: tokens.colorNeutralForeground3 },
  brandTextWrap: { display: "flex", flexDirection: "column" },
  tabsWrap: { flex: 1, display: "flex", justifyContent: "center", minWidth: "240px" },
  spacer: { flex: 1 },
  menuBtn: {
    "@media (min-width: 1024px)": { display: "none" },
  },
  body: {
    flex: 1,
    minHeight: 0,
    display: "grid",
    gridTemplateColumns: "1fr",
    "@media (min-width: 1024px)": {
      gridTemplateColumns: "340px 1fr",
    },
  },
  sidebarDesktop: {
    display: "none",
    minHeight: 0,
    "@media (min-width: 1024px)": { display: "block" },
  },
  main: { minWidth: 0, minHeight: 0 },
  loading: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  drawerBody: { padding: 0, display: "flex" },
})

export function CodeMasterApp() {
  const styles = useStyles()
  const { mode, setMode } = useThemeMode()
  const progress = useProgress()

  const [language, setLanguage] = React.useState<LanguageId>("java")
  const [selectedLessonId, setSelectedLessonId] = React.useState<string | undefined>(undefined)
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const { sections, lessons } = React.useMemo(() => getCurriculum(language), [language])
  const meta = getLanguageMeta(language)

  const selectedLesson = React.useMemo(
    () => lessons.find((l) => l.id === selectedLessonId),
    [lessons, selectedLessonId],
  )

  const { prevLesson, nextLesson } = React.useMemo(() => {
    if (!selectedLesson) return { prevLesson: undefined, nextLesson: undefined }
    const idx = lessons.findIndex((l) => l.id === selectedLesson.id)
    return {
      prevLesson: idx > 0 ? lessons[idx - 1] : undefined,
      nextLesson: idx < lessons.length - 1 ? lessons[idx + 1] : undefined,
    }
  }, [lessons, selectedLesson])

  const selectLesson = React.useCallback(
    (lessonId: string) => {
      setSelectedLessonId(lessonId)
      progress.setLastVisited(language, lessonId)
      setDrawerOpen(false)
    },
    [language, progress],
  )

  const changeLanguage = (lang: LanguageId) => {
    setLanguage(lang)
    setSelectedLessonId(undefined)
  }

  const goHome = () => {
    setSelectedLessonId(undefined)
    setDrawerOpen(false)
  }

  const sidebar = (
    <Sidebar
      sections={sections}
      lessons={lessons}
      statuses={progress.statuses}
      selectedLessonId={selectedLessonId}
      onSelectLesson={selectLesson}
      onGoHome={goHome}
      onClose={drawerOpen ? () => setDrawerOpen(false) : undefined}
    />
  )

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <Button
          className={styles.menuBtn}
          appearance="subtle"
          icon={<Navigation24Regular />}
          aria-label="فتح قائمة الدروس"
          onClick={() => setDrawerOpen(true)}
        />
        <div className={styles.brand}>
          <span className={styles.brandMark} aria-hidden>
            <Code24Filled />
          </span>
          <div className={styles.brandTextWrap}>
            <span className={styles.brandText}>CodeMaster 500</span>
            <span className={styles.brandSub}>1500 درس · 3 لغات</span>
          </div>
        </div>

        <div className={styles.tabsWrap}>
          <TabList
            selectedValue={language}
            onTabSelect={(_, data) => changeLanguage(data.value as LanguageId)}
            size="large"
          >
            {LANGUAGES.map((lang) => (
              <Tab key={lang.id} value={lang.id}>
                {`${lang.emoji} ${lang.name}`}
              </Tab>
            ))}
          </TabList>
        </div>

        <Tooltip content={mode === "light" ? "الوضع الداكن" : "الوضع الفاتح"} relationship="label">
          <ToggleButton
            checked={mode === "dark"}
            onClick={() => setMode(mode === "light" ? "dark" : "light")}
            icon={mode === "light" ? <WeatherMoon24Regular /> : <WeatherSunny24Regular />}
            appearance="subtle"
            aria-label="تبديل السمة"
          />
        </Tooltip>
      </header>

      <div className={styles.body}>
        <aside className={styles.sidebarDesktop}>{sidebar}</aside>

        <main className={styles.main}>
          {!progress.hydrated ? (
            <div className={styles.loading}>
              <Spinner size="large" label="جارٍ التحميل..." />
            </div>
          ) : selectedLesson ? (
            <LessonView
              key={selectedLesson.id}
              lesson={selectedLesson}
              status={progress.statuses[selectedLesson.id]}
              onMarkCompleted={() => progress.markCompleted(selectedLesson.id)}
              onMarkWeak={() => progress.markWeak(selectedLesson.id)}
              prevLesson={prevLesson}
              nextLesson={nextLesson}
              onNavigate={selectLesson}
            />
          ) : (
            <Dashboard
              meta={meta}
              sections={sections}
              lessons={lessons}
              statuses={progress.statuses}
              lastVisitedId={progress.lastVisited[language]}
              reminders={progress.reminders}
              onSelectLesson={selectLesson}
              onAddReminder={progress.addReminder}
              onRemoveReminder={progress.removeReminder}
            />
          )}
        </main>
      </div>

      <OverlayDrawer
        open={drawerOpen}
        onOpenChange={(_, data) => setDrawerOpen(data.open)}
        position="start"
        size="medium"
      >
        <DrawerBody className={styles.drawerBody}>{sidebar}</DrawerBody>
      </OverlayDrawer>
    </div>
  )
}
