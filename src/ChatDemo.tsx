import { useEffect, useRef, useState } from 'react'

type Msg = { from: 'user' | 'bot'; text: string }

const script: Msg[] = [
  { from: 'user', text: 'Hola! Quiero hacer un pedido' },
  {
    from: 'bot',
    text: '¡Hola! Bienvenido a Pizzería La Esquina 🍕 ¿Ya sabés qué vas a pedir o querés que te pase la carta?',
  },
  { from: 'user', text: 'Una pizza muzzarella y 6 empanadas de carne, con envío' },
  {
    from: 'bot',
    text: 'Perfecto 🙌 Te paso el resumen:\n• 1 Pizza Muzzarella\n• 6 Empanadas de carne cortada a cuchillo\n• Envío a domicilio\n¿A qué dirección te lo mandamos y cómo pagás?',
  },
  { from: 'user', text: 'Av. San Martín 123, pago por transferencia' },
  {
    from: 'bot',
    text: '✅ ¡Pedido confirmado! Te llega en 40 a 60 minutos.\nPara la transferencia usá el alias que te paso y mandá el comprobante por acá.',
  },
]

export function ChatDemo() {
  const reduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [count, setCount] = useState(reduced ? script.length : 0)
  const [typing, setTyping] = useState(false)
  const [run, setRun] = useState(0)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduced) return
    let cancelled = false
    const timers: number[] = []
    let t = 600
    script.forEach((m, i) => {
      const delay = m.from === 'bot' ? 1300 : 900
      if (m.from === 'bot') timers.push(window.setTimeout(() => !cancelled && setTyping(true), t))
      t += delay
      timers.push(
        window.setTimeout(() => {
          if (cancelled) return
          setTyping(false)
          setCount(i + 1)
        }, t),
      )
      t += 500
    })
    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [run, reduced])

  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [count, typing])

  const done = count >= script.length

  return (
    <figure className="phone" aria-label="Demo del bot de pedidos">
      <div className="phone-head">
        <span className="avatar">🍕</span>
        <div>
          <strong>Pizzería La Esquina</strong>
          <small>{typing ? 'escribiendo…' : 'bot de pedidos · demo'}</small>
        </div>
      </div>
      <div className="phone-body" ref={bodyRef} aria-live="polite">
        {script.slice(0, count).map((m, i) => (
          <div key={`${run}-${i}`} className={`bubble ${m.from}`}>
            {m.text}
          </div>
        ))}
        {typing && (
          <div className="bubble bot typing" aria-label="escribiendo">
            <i />
            <i />
            <i />
          </div>
        )}
      </div>
      <figcaption>
        {done && !reduced ? (
          <button
            className="link-btn"
            onClick={() => {
              setCount(0)
              setRun((r) => r + 1)
            }}
          >
            ↻ Ver de nuevo
          </button>
        ) : (
          <span className="muted">Conversación de ejemplo</span>
        )}
      </figcaption>
    </figure>
  )
}
