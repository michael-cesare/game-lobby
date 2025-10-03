import React from 'react'
import { useSelector } from "react-redux";

import { selectResultCount } from '@/features/lobby/reselectors';

export const TotalSize = () => {
  const resultCount = useSelector(selectResultCount);

  return (
    <span>{resultCount}</span>
  )
}