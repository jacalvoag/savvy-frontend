'use client'

import Modal from './Modal'
import Button from './Button'
import { useState } from 'react'

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => Promise<void> | void
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  error?: string | null
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  error,
}: ConfirmDialogProps) {
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
      setLoading(true)
      try {
        await onConfirm()
      } finally {
        setLoading(false)
      }
    }

    return (
      <Modal isOpen={isOpen} onClose={onClose} title={title}>
        <div className="flex flex-col gap-5">
          <p className="text-gray-300 text-sm leading-relaxed">{message}</p>

          {error && (
            <div className="bg-red-900/30 border border-red-700 rounded-xl px-4 py-3">
            <p className="text-red-400 text-xs">{error}</p>
          </div>
        )}

        <div className="flex gap-3 justify-end">
          <Button variant="ghost" size="md" onClick={onClose} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button variant="danger" size="md" loading={loading} onClick={handleConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

