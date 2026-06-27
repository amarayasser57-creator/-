"use client"

import * as React from "react"
import {
  makeStyles,
  tokens,
  Card,
  Subtitle2,
  Body1,
  Caption1,
  Button,
  Input,
  Field,
} from "@fluentui/react-components"
import {
  Alert24Regular,
  Add20Regular,
  Delete20Regular,
  Clock20Regular,
} from "@fluentui/react-icons"
import type { Reminder } from "../lib/use-progress"

const useStyles = makeStyles({
  card: {
    padding: tokens.spacingHorizontalL,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  head: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    color: tokens.colorBrandForeground1,
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalS,
    alignItems: "flex-end",
  },
  grow: { flex: 1, minWidth: "180px" },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  item: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground3,
  },
  itemText: { flex: 1, minWidth: 0 },
  time: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    color: tokens.colorBrandForeground1,
    fontFamily: tokens.fontFamilyMonospace,
  },
  empty: { color: tokens.colorNeutralForeground3 },
})

interface RemindersProps {
  reminders: Reminder[]
  onAdd: (text: string, time: string) => void
  onRemove: (id: string) => void
}

export function Reminders({ reminders, onAdd, onRemove }: RemindersProps) {
  const styles = useStyles()
  const [text, setText] = React.useState("")
  const [time, setTime] = React.useState("19:00")

  const submit = () => {
    if (!text.trim()) return
    onAdd(text.trim(), time)
    setText("")
  }

  return (
    <Card className={styles.card}>
      <div className={styles.head}>
        <Alert24Regular />
        <Subtitle2>تذكيرات الدراسة</Subtitle2>
      </div>

      <div className={styles.form}>
        <div className={styles.grow}>
          <Field label="عنوان التذكير">
            <Input
              value={text}
              onChange={(_, d) => setText(d.value)}
              placeholder="مثال: مراجعة الدروس الضعيفة"
              onKeyDown={(e) => {
                if (e.key === "Enter") submit()
              }}
            />
          </Field>
        </div>
        <Field label="الوقت">
          <Input type="time" value={time} onChange={(_, d) => setTime(d.value)} />
        </Field>
        <Button appearance="primary" icon={<Add20Regular />} onClick={submit}>
          إضافة
        </Button>
      </div>

      <div className={styles.list}>
        {reminders.length === 0 ? (
          <Caption1 className={styles.empty}>
            لا توجد تذكيرات بعد. أضف تذكيراً لتثبيت عادة الدراسة اليومية.
          </Caption1>
        ) : (
          reminders.map((r) => (
            <div key={r.id} className={styles.item}>
              <span className={styles.time}>
                <Clock20Regular />
                {r.time}
              </span>
              <Body1 className={styles.itemText}>{r.text}</Body1>
              <Button
                appearance="subtle"
                size="small"
                icon={<Delete20Regular />}
                aria-label="حذف التذكير"
                onClick={() => onRemove(r.id)}
              />
            </div>
          ))
        )}
      </div>
    </Card>
  )
}
