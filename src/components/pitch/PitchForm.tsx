'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Check } from 'lucide-react'
import { toast } from 'sonner'
import { PITCH_DRAFT_KEY, PITCH_SCHEMA, type PitchField as PitchFieldDef } from './pitchSchema'
import { PitchField, type FieldViewModel } from './PitchField'
import { submitPitch } from '@/app/(frontend)/pitch/actions'

const MAX_DECK_BYTES = 10 * 1024 * 1024

type Values = Record<string, string>
type Checks = Record<string, string[]>

export function PitchForm() {
  const topRef = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)
  const [values, setValues] = useState<Values>({})
  const [checks, setChecks] = useState<Checks>({})
  const [files, setFiles] = useState<Record<string, File>>({})
  const [errors, setErrors] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const total = PITCH_SCHEMA.length

  // Restore a saved text draft (files are never persisted and must be re-added).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(PITCH_DRAFT_KEY)
      if (raw) {
        const d = JSON.parse(raw)
        // Restore saved answers, but always open on step 1 — opening the form
        // should start at the beginning, never resume mid-wizard.
        if (d.values) setValues(d.values)
        if (d.checks) setChecks(d.checks)
      }
    } catch {
      // ignore malformed drafts
    }
    setLoaded(true)
  }, [total])

  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(PITCH_DRAFT_KEY, JSON.stringify({ values, checks, step }))
    } catch {
      // storage may be unavailable (private mode) — non-fatal
    }
  }, [values, checks, step, loaded])

  const isFilled = useCallback(
    (f: PitchFieldDef) => {
      if (f.type === 'check') return (checks[f.id]?.length ?? 0) > 0
      if (f.type === 'file') return !!files[f.id]
      return (values[f.id]?.trim().length ?? 0) > 0
    },
    [values, checks, files],
  )

  const validateSection = useCallback(
    (idx: number) =>
      PITCH_SCHEMA[idx].fields.filter((f) => f.required && !isFilled(f)).map((f) => f.id),
    [isFilled],
  )

  const clearError = (id: string) => setErrors((prev) => prev.filter((e) => e !== id))

  const setText = (id: string, v: string) => {
    setValues((prev) => ({ ...prev, [id]: v }))
    clearError(id)
  }

  const choose = (f: PitchFieldDef, opt: string) => {
    if (f.type === 'check') {
      setChecks((prev) => {
        const cur = prev[f.id] ? [...prev[f.id]] : []
        const i = cur.indexOf(opt)
        if (i >= 0) cur.splice(i, 1)
        else cur.push(opt)
        return { ...prev, [f.id]: cur }
      })
    } else {
      setValues((prev) => ({ ...prev, [f.id]: opt }))
    }
    clearError(f.id)
  }

  const onFile = (f: PitchFieldDef, file: File | null) => {
    if (!file) {
      setFiles((prev) => {
        const next = { ...prev }
        delete next[f.id]
        return next
      })
      return
    }
    const isPdf = file.type === 'application/pdf' || /\.pdf$/i.test(file.name)
    if (!isPdf) {
      toast.error('The pitch deck must be a PDF.')
      return
    }
    if (file.size > MAX_DECK_BYTES) {
      toast.error('The pitch deck must be under 10 MB.')
      return
    }
    setFiles((prev) => ({ ...prev, [f.id]: file }))
    clearError(f.id)
  }

  const scrollTop = () => {
    const el = topRef.current
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 110
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  const goStep = (i: number) => {
    setStep(Math.min(Math.max(i, 0), total - 1))
    setErrors([])
    setTimeout(scrollTop, 0)
  }

  const next = () => {
    const missing = validateSection(step)
    if (missing.length) {
      setErrors(missing)
      return
    }
    goStep(step + 1)
  }

  const prev = () => goStep(step - 1)

  const buildVm = (f: PitchFieldDef): FieldViewModel => {
    const file = files[f.id]
    return {
      field: f,
      value: values[f.id] ?? '',
      selected: checks[f.id] ?? [],
      file: file ? { name: file.name, size: file.size } : null,
      error: errors.includes(f.id) ? 'This field is required.' : undefined,
      onText: (v) => setText(f.id, v),
      onChoose: (opt) => choose(f, opt),
      onFile: (file) => onFile(f, file),
    }
  }

  const submit = async () => {
    let firstMissing = -1
    let allMissing: string[] = []
    PITCH_SCHEMA.forEach((s, i) => {
      const m = validateSection(i)
      if (m.length) {
        if (firstMissing < 0) firstMissing = i
        allMissing = allMissing.concat(m)
      }
    })
    if (allMissing.length) {
      setErrors(allMissing)
      setStep(firstMissing)
      setTimeout(scrollTop, 0)
      toast.error('Please complete the required fields.')
      return
    }

    const payload: Record<string, unknown> = { ...values }
    for (const [k, v] of Object.entries(checks)) payload[k] = v

    const fd = new FormData()
    fd.append('payload', JSON.stringify(payload))
    for (const [id, file] of Object.entries(files)) fd.append(id, file)

    setSending(true)
    try {
      const result = await submitPitch(fd)
      if (result.success) {
        try {
          localStorage.removeItem(PITCH_DRAFT_KEY)
        } catch {
          // ignore
        }
        setSubmitted(true)
        if (result.error) toast.warning(result.error) // e.g. deck upload soft-failed
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        toast.error(result.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      toast.error('Could not submit right now. Please try again.')
    } finally {
      setSending(false)
    }
  }

  const reset = () => {
    try {
      localStorage.removeItem(PITCH_DRAFT_KEY)
    } catch {
      // ignore
    }
    setSubmitted(false)
    setStep(0)
    setValues({})
    setChecks({})
    setFiles({})
    setErrors([])
  }

  const requiredFields = PITCH_SCHEMA.flatMap((s) => s.fields).filter((f) => f.required)
  const filledCount = requiredFields.filter((f) => isFilled(f)).length
  const pct = requiredFields.length ? Math.round((filledCount / requiredFields.length) * 100) : 0

  const cur = PITCH_SCHEMA[step]
  const curNum = String(step + 1).padStart(2, '0')

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto my-10 bg-white border border-neutral-200/70 rounded-3xl p-10 md:p-12 text-center shadow-[0_18px_50px_-28px_rgba(0,0,0,0.22)]">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#ffb012] flex items-center justify-center">
          <Check size={30} strokeWidth={2.6} className="text-black" />
        </div>
        <div className="font-mono text-xs font-bold tracking-widest text-[#b9780c] uppercase mb-3">
          Received
        </div>
        <h2 className="!text-3xl font-bold tracking-tight mb-3">Thanks — your pitch is in.</h2>
        <p className="text-neutral-600 leading-relaxed mb-7 !text-base">
          We&apos;ll review your submission and do our best to get back to you soon. Due to travel
          and market conditions, there may be some delay. Reach us anytime at{' '}
          <a
            href="mailto:deals@dipaloventures.com"
            className="text-[#b9780c] font-semibold no-underline"
          >
            deals@dipaloventures.com
          </a>
          .
        </p>
        <button
          type="button"
          onClick={reset}
          className="font-mono text-xs font-bold tracking-wide uppercase px-6 py-3 rounded-full border border-neutral-900 bg-transparent text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors"
        >
          Submit another →
        </button>
      </div>
    )
  }

  return (
    <div ref={topRef}>
      {/* Progress */}
      <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
        <div className="font-mono text-[11px] font-bold tracking-wide text-neutral-500 uppercase">
          Step {step + 1} / {total} · {cur.title}
        </div>
        <div className="flex items-center gap-3">
          <div className="w-40 h-1.5 rounded-full bg-neutral-200 overflow-hidden">
            <div
              className="h-full bg-[#ffb012] rounded-full transition-[width] duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="font-mono text-[11px] font-bold text-neutral-500 whitespace-nowrap">
            {pct}% complete
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[248px_1fr] gap-9 items-start">
        {/* Sidebar stepper */}
        <aside className="hidden lg:flex lg:sticky lg:top-28 flex-col gap-4">
          <div>
            <div className="font-mono text-[11px] font-bold tracking-widest text-neutral-400 uppercase mb-4 pl-1">
              Sections
            </div>
            <div className="relative flex flex-col gap-px">
              <div className="absolute left-[21px] top-4 bottom-4 w-0.5 bg-neutral-200 rounded" />
              {PITCH_SCHEMA.map((s, i) => {
                const isCur = i === step
                const done = !isCur && validateSection(i).length === 0
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => goStep(i)}
                    className="flex items-center gap-3 py-2 pl-1.5 pr-3 rounded-xl bg-transparent text-left relative z-[1] transition-opacity hover:opacity-70"
                  >
                    {isCur ? (
                      <span className="w-[30px] h-[30px] flex-shrink-0 rounded-full bg-white border-2 border-[#ffb012] shadow-[0_0_0_4px_rgba(255,176,18,0.13)] text-[#b9780c] font-mono text-xs font-bold flex items-center justify-center">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    ) : done ? (
                      <span className="w-[30px] h-[30px] flex-shrink-0 rounded-full bg-[#ffb012] border-2 border-[#ffb012] flex items-center justify-center">
                        <Check size={14} strokeWidth={3} className="text-black" />
                      </span>
                    ) : (
                      <span className="w-[30px] h-[30px] flex-shrink-0 rounded-full bg-[#faf9f4] border-[1.5px] border-neutral-300 text-neutral-400 font-mono text-xs font-bold flex items-center justify-center">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    )}
                    <span
                      className={`text-sm ${
                        isCur
                          ? 'font-bold text-neutral-900'
                          : done
                            ? 'font-medium text-neutral-600'
                            : 'font-light text-neutral-500'
                      }`}
                    >
                      {s.short}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
          <div className="flex items-center gap-2.5 px-3.5 py-3 bg-white border border-neutral-200/70 rounded-2xl ml-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0 animate-pulse" />
            <span className="text-xs text-neutral-500 leading-snug">
              Progress saves automatically.
            </span>
          </div>
        </aside>

        {/* Form card */}
        <div className="relative overflow-hidden bg-white border border-neutral-200/70 rounded-3xl p-7 md:p-11 shadow-[0_1px_2px_rgba(40,30,10,0.04),0_30px_64px_-40px_rgba(40,30,10,0.3)]">
          <div className="pointer-events-none select-none absolute -top-8 right-4 z-0 font-bold leading-none tracking-tighter text-[165px] text-[#ffb012]/[0.08]">
            {curNum}
          </div>
          <div className="relative z-[1]">
            <div className="font-mono text-[11px] font-bold tracking-widest text-[#d98a12] uppercase mb-3 flex items-center gap-2">
              <span className="w-5 h-0.5 bg-[#ffb012] inline-block" />
              {cur.kicker}
            </div>
            <h2 className="!text-3xl font-bold tracking-tight leading-tight mb-2">{cur.title}</h2>
            {cur.blurb && (
              <p className="text-neutral-500 leading-relaxed mb-7 max-w-xl !text-[15px]">
                {cur.blurb}
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-6 mt-4">
              {cur.fields.map((f) => (
                <div
                  key={f.id}
                  className={f.half ? 'md:col-span-1 min-w-0' : 'md:col-span-2 min-w-0'}
                >
                  <PitchField vm={buildVm(f)} />
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between gap-4 mt-9 pt-7 border-t border-neutral-200/70">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={prev}
                  className="font-mono text-xs font-bold tracking-wide uppercase px-5 py-3 rounded-full border border-neutral-300 bg-white text-neutral-900 hover:border-neutral-900 transition-colors"
                >
                  ← Back
                </button>
              ) : (
                <span />
              )}
              {step < total - 1 ? (
                <button
                  type="button"
                  onClick={next}
                  className="font-mono text-xs font-bold tracking-wide uppercase px-6 py-3 rounded-full border-none bg-[#ffb012] text-black hover:bg-[#e89f0c] transition-colors shadow-[0_4px_14px_-6px_rgba(255,176,18,0.8)]"
                >
                  Continue →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submit}
                  disabled={sending}
                  className="font-mono text-xs font-bold tracking-wide uppercase px-6 py-3 rounded-full border-none bg-neutral-900 text-white hover:bg-black transition-colors disabled:opacity-50"
                >
                  {sending ? 'Submitting…' : 'Submit pitch →'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
