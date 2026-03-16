'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useGoals } from '@/hooks/useGoals'
import { useGroups } from '@/hooks/useGroups'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import ProgressBar from '@/components/ui/ProgressBar'
import CircleProgress from '@/components/ui/CircleProgress'
import Avatar from '@/components/ui/Avatar'
import { SkeletonCard } from '@/components/ui/Skeleton'
import type { Goal } from '@/types'

                        variant="primary"
                        size="sm"
                        className="flex-1"
                        onClick={() => { setBoostGoalId(goal.id); setBoostAmount(''); setBoostError(null) }}
                      >
                        ⚡ Boost
                      </Button>
                      <Button
                        id={`archive-${goal.id}`}
                        variant="ghost"
                        size="sm"
                        title="Archive goal"
                        onClick={() => archiveGoal(goal.id)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
