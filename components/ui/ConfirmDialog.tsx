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

