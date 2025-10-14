import React from 'react'
import { useDispatch } from "react-redux";

import styles from './CategoryList.module.scss'

import { IItems } from '@/features/lobby/typings';
import { changeFilter } from '@/features/lobby/actions';

interface IOwnProps {
  category: IItems,
}

export const CategoryTab = ( props: IOwnProps ) => {
  const { category } = props;
  const { id = -1, categoryFilter = '', name: { en = ''} } = category;
  const dispatch = useDispatch();

  const handleOnClick = () => {
    if (categoryFilter.length === 0) {
      return false;
    }
    // TODO - send Category in games API properly as to Apply filter from BE side
    dispatch(changeFilter(categoryFilter));
  };

  return <div key={id} className={styles.categoryTab} >
    {
      categoryFilter.length > 0
        ? <button onClick={handleOnClick}><span>{en}</span></button>
        : <span>{en}</span>
    }
  </div>;
}
