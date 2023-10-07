import React from 'react'
import { BsInfoCircleFill } from "react-icons/bs"

export default function Alert({alert}) {
  return (
    alert !== null && (
        <div className='alert-msg'>
            <BsInfoCircleFill/> {alert.msg}
        </div>
    )
  )
}
