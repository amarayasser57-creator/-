"use client"

import * as React from "react"
import { makeStyles, tokens, Button, Caption1 } from "@fluentui/react-components"
import { Copy20Regular, Checkmark20Regular } from "@fluentui/react-icons"

const useStyles = makeStyles({
  root: {
    borderRadius: tokens.borderRadiusMedium,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    overflow: "hidden",
    backgroundColor: tokens.colorNeutralBackground3,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    paddingTop: tokens.spacingVerticalXS,
    paddingBottom: tokens.spacingVerticalXS,
    backgroundColor: tokens.colorNeutralBackground4,
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
  },
  label: {
    color: tokens.colorNeutralForeground3,
    fontFamily: tokens.fontFamilyMonospace,
  },
  pre: {
    margin: 0,
    padding: tokens.spacingHorizontalL,
    overflowX: "auto",
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase400,
    color: tokens.colorNeutralForeground1,
    direction: "ltr",
    textAlign: "left",
  },
})

export function CodeBlock({ code, label = "code" }: { code: string; label?: string }) {
  const styles = useStyles()
  const [copied, setCopied] = React.useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // ignore
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Caption1 className={styles.label}>{label}</Caption1>
        <Button
          appearance="subtle"
          size="small"
          icon={copied ? <Checkmark20Regular /> : <Copy20Regular />}
          onClick={copy}
        >
          {copied ? "تم النسخ" : "نسخ"}
        </Button>
      </div>
      <pre className={styles.pre}>
        <code>{code}</code>
      </pre>
    </div>
  )
}
