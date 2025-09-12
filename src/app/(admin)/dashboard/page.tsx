'use client'
import { useAuth } from '@/contexts/AuthContext'
import React from 'react'

const Dashboard = () => {
  const { user } = useAuth()
  return (
    <div>
      Dashboard
      {user?.role}
    </div>
  )
}

export default Dashboard
