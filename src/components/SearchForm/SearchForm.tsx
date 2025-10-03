import React from 'react'

import { TotalSize } from './TotalSize';
import { CountField } from './CountField';
import { GameNameField } from './GameNameField';

export const SearchForm = () => {
  return (
    <>
      <h2>Search Results: <TotalSize/></h2>
      <div>Page Size: <CountField/></div>
      <div>Game: <GameNameField/></div>
    </>
  )
}