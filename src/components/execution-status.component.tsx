import React from 'react'
import { Tag } from 'antd'

interface ExecutionStatusTagProps {
  status?: 'OK' | 'ERROR' | string
}

export const ExecutionStatusTag = ({ status }: ExecutionStatusTagProps) => {
  if (status === 'OK') {
    return <Tag color="green">OK</Tag>
  }

  if (status === 'ERROR') {
    return <Tag color="magenta">Error</Tag>
  }

  return <Tag color="orange">Unknown</Tag>
}
