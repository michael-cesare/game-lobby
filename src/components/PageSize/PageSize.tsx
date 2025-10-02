import React from 'react'

import { TotalSize } from './TotalSize';
import { CountField } from './countField';

export const PageSize = () => {
  return (
    <>
      <h2>Page Size: <TotalSize/></h2>
      <div>change: <CountField/></div>
    </>
  )
}