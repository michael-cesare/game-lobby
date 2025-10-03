import React from 'react'
import { useSelector } from "react-redux";

import { selectPageSize } from '@/features/lobby/selectors';

export const TotalSize = () => {
  const pageSize = useSelector(selectPageSize);

  return (
    <span>{pageSize}</span>
  )
}