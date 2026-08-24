'use client'

import React from 'react'
import { Upload } from 'lucide-react'
import {
  PITCH_EMAIL_MAX,
  PITCH_LONG_TEXT_MAX,
  PITCH_SHORT_TEXT_MAX,
  PITCH_URL_MAX,
  type PitchField as PitchFieldDef,
} from './pitchSchema'

export interface FileMeta {
  name: string
  size: number
}

export interface FieldViewModel {
  field: PitchFieldDef
  value: string
  selected: string[]
  file: FileMeta | null
  error?: string
  onText: (value: string) => void
  onChoose: (option: string) => void
  onFile: (file: File | null) => void
}

const CONTROL =
  'w-full bg-white border border-neutral-200/60 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#ffb012] shadow-sm transition-all duration-200 font-light'

function fmtBytes(n: number): string {
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`
  return `${(n / 1024 / 1024).toFixed(1)} MB`
}

export function PitchField({ vm }: { vm: FieldViewModel }) {
  const { field } = vm
  const isInput = field.type === 'text' || field.type === 'email' || field.type === 'url'
  const inputType = field.type === 'email' ? 'email' : field.type === 'url' ? 'url' : 'text'
  const isChoice = field.type === 'radio' || field.type === 'check'
  const maxLength =
    field.type === 'email'
      ? PITCH_EMAIL_MAX
      : field.type === 'url'
        ? PITCH_URL_MAX
        : field.type === 'long'
          ? PITCH_LONG_TEXT_MAX
          : PITCH_SHORT_TEXT_MAX

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline gap-1.5 flex-wrap">
        <span className="text-sm font-medium text-neutral-900 leading-snug">{field.label}</span>
        {field.required && <span className="text-[#d98a12] font-bold text-sm">*</span>}
      </div>
      {field.help && <p className="text-xs text-neutral-500 leading-snug !text-xs">{field.help}</p>}

      {isInput && (
        <input
          type={inputType}
          placeholder={field.placeholder}
          value={vm.value}
          maxLength={maxLength}
          onChange={(e) => vm.onText(e.target.value)}
          className={CONTROL}
        />
      )}

      {field.type === 'long' && (
        <textarea
          rows={4}
          placeholder={field.placeholder}
          value={vm.value}
          maxLength={maxLength}
          onChange={(e) => vm.onText(e.target.value)}
          className={`${CONTROL} resize-y min-h-[104px] leading-relaxed`}
        />
      )}

      {field.type === 'select' && (
        <select
          value={vm.value}
          onChange={(e) => vm.onText(e.target.value)}
          className={`${CONTROL} cursor-pointer`}
        >
          <option value="" disabled>
            Select…
          </option>
          {(field.options ?? []).map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      )}

      {isChoice && (
        <div className="flex flex-wrap gap-2">
          {(field.options ?? []).map((o) => {
            const on = field.type === 'check' ? vm.selected.includes(o) : vm.value === o
            return (
              <button
                key={o}
                type="button"
                onClick={() => vm.onChoose(o)}
                className={`px-4 py-2.5 rounded-full text-sm leading-none border transition-colors duration-150 ${
                  on
                    ? 'border-[#ffb012] bg-[#ffb012] text-black font-semibold'
                    : 'border-neutral-200 bg-white text-neutral-700 font-light hover:border-neutral-900'
                }`}
              >
                {o}
              </button>
            )
          })}
        </div>
      )}

      {field.type === 'file' &&
        (vm.file ? (
          <div className="flex items-center gap-3 px-4 py-3.5 border border-neutral-200 rounded-xl bg-white">
            <div className="w-9 h-9 flex-shrink-0 rounded-lg bg-[#fbefd4] flex items-center justify-center font-mono text-[10px] font-bold text-[#b9780c]">
              PDF
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-neutral-900 truncate">{vm.file.name}</div>
              <div className="font-mono text-[11px] text-neutral-500 mt-0.5">
                {fmtBytes(vm.file.size)}
              </div>
            </div>
            <button
              type="button"
              onClick={() => vm.onFile(null)}
              className="font-mono text-[11px] uppercase tracking-wide text-neutral-500 hover:text-red-600 px-1.5 py-1.5 transition-colors"
            >
              Remove
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center gap-2.5 px-5 py-7 border-[1.5px] border-dashed border-neutral-300 rounded-2xl bg-white/60 cursor-pointer text-center transition-colors hover:border-[#ffb012] hover:bg-[#fcf6e9]">
            <input
              type="file"
              accept="application/pdf,.pdf"
              className="hidden"
              onChange={(e) => vm.onFile(e.target.files?.[0] ?? null)}
            />
            <span className="w-10 h-10 rounded-full bg-[#ffb012] flex items-center justify-center">
              <Upload size={18} strokeWidth={2.2} className="text-black" />
            </span>
            <span className="text-sm font-medium text-neutral-900">
              Drop your pitch deck or <span className="text-[#b9780c] underline">browse</span>
            </span>
            <span className="font-mono text-[10px] tracking-widest uppercase text-neutral-400">
              PDF · Max 10 MB
            </span>
          </label>
        ))}

      {vm.error && (
        <p className="font-mono text-[11px] text-red-600 flex items-center gap-1.5">
          <span>▲</span>
          {vm.error}
        </p>
      )}
    </div>
  )
}
