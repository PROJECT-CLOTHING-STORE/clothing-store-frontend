import React from 'react'
import { PaymentModule } from '@modules'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Payment: NextPage = () => {
  const router = useRouter()
  return <PaymentModule id={router.query.id} />
}

export default Payment
