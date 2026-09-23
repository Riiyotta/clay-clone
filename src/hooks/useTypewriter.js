import { useEffect, useRef, useState } from 'react'

/**
 * The prompt block's placeholder typewriter, measured off the original:
 *   type   ~33ms/char, with an extra 33ms skipped roughly every 5th char (~38.6ms avg)
 *   hold   ~1520ms at the full string
 *   delete ~33.4ms/char
 *   pause  0-500ms empty before the next string
 * => ~8.3s per string, ~25s for the 3-string loop.
 *
 * The caret is a trailing '|' toggling every 495ms, independent of the typing.
 */
export default function useTypewriter(strings, { type = 33, hold = 1520, del = 33, gap = 400 } = {}) {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [caret, setCaret] = useState(true)
  const state = useRef({ i: 0, n: 0, phase: 'type' })
  const [nonce, setNonce] = useState(0)

  useEffect(() => {
    const blink = setInterval(() => setCaret((c) => !c), 495)
    return () => clearInterval(blink)
  }, [])

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setText(strings[0])
      return
    }
    let timer
    const tick = () => {
      const s = state.current
      const full = strings[s.i]
      let wait = type

      if (s.phase === 'type') {
        s.n += 1
        setText(full.slice(0, s.n))
        // the original skips an extra frame roughly every 5th character
        wait = s.n % 5 === 0 ? type * 2 : type
        if (s.n >= full.length) { s.phase = 'hold'; wait = hold }
      } else if (s.phase === 'hold') {
        s.phase = 'delete'
        wait = del
      } else if (s.phase === 'delete') {
        s.n -= 1
        setText(full.slice(0, Math.max(0, s.n)))
        wait = del
        if (s.n <= 0) { s.phase = 'pause'; wait = gap }
      } else {
        s.i = (s.i + 1) % strings.length
        setIndex(s.i)
        s.n = 0
        s.phase = 'type'
      }
      timer = setTimeout(tick, wait)
    }
    timer = setTimeout(tick, 600)
    return () => clearTimeout(timer)
  }, [strings, type, hold, del, gap, nonce])

  // jump straight to a string (chip click) and restart the cycle there
  const jumpTo = (n) => {
    state.current = { i: n, n: 0, phase: 'type' }
    setIndex(n)
    setText('')
    setNonce((v) => v + 1)
  }

  return { text: text + (caret ? '|' : ''), index, jumpTo }
}
