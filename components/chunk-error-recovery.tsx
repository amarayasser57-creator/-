"use client"

import * as React from "react"

/**
 * Recovers from stale code-chunk load failures.
 *
 * When the dev server re-syncs files (or a new version is deployed), the browser
 * may still reference an old chunk URL that no longer exists. The dynamic import
 * then rejects with a ChunkLoadError whose reason is a DOM error Event, which
 * serializes to `{"isTrusted":true}` in the runtime overlay. We detect that case
 * and trigger a single full reload so the page fetches the current chunks.
 */
export function ChunkErrorRecovery() {
  React.useEffect(() => {
    const RELOAD_KEY = "__chunk_reload_attempted"

    const isChunkLoadError = (value: unknown): boolean => {
      if (!value) return false
      if (value instanceof Error) {
        return (
          value.name === "ChunkLoadError" ||
          /Loading chunk|Failed to load chunk|Loading CSS chunk|error loading dynamically imported module/i.test(
            value.message,
          )
        )
      }
      // The rejection reason can be a raw DOM Event ({"isTrusted":true}) coming
      // from a <script>/<link> onerror handler used by the chunk loader.
      if (typeof Event !== "undefined" && value instanceof Event) {
        const target = value.target as HTMLElement | null
        const src =
          (target as HTMLScriptElement | null)?.src ??
          (target as HTMLLinkElement | null)?.href ??
          ""
        return /_next\/static\/chunks\//.test(src)
      }
      return false
    }

    const recover = () => {
      if (sessionStorage.getItem(RELOAD_KEY)) return
      sessionStorage.setItem(RELOAD_KEY, "1")
      window.location.reload()
    }

    // Clear the guard once a load completes cleanly.
    const clearGuard = () => sessionStorage.removeItem(RELOAD_KEY)

    const onRejection = (event: PromiseRejectionEvent) => {
      if (isChunkLoadError(event.reason)) {
        event.preventDefault()
        recover()
      }
    }

    const onError = (event: ErrorEvent) => {
      if (isChunkLoadError(event.error) || isChunkLoadError(event)) {
        recover()
      }
    }

    window.addEventListener("unhandledrejection", onRejection)
    window.addEventListener("error", onError, true)
    window.addEventListener("load", clearGuard)

    return () => {
      window.removeEventListener("unhandledrejection", onRejection)
      window.removeEventListener("error", onError, true)
      window.removeEventListener("load", clearGuard)
    }
  }, [])

  return null
}
