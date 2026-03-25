'use client'

import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  maxWidth?: string
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-md',
}: ModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
          onClick={onClose}
          aria-hidden="true"
        />
        {/* Dialog */}
        <div
          className={[
            'relative w-full bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl shadow-2xl',
            'animate-[modalIn_0.15s_ease-out]',
            maxWidth,
          ].join(' ')}
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          {title && (
