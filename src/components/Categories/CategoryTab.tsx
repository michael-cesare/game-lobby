import React, { useCallback } from 'react'
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import classNames from 'classnames';

import styles from './CategoryList.module.scss'

import { IItems } from '@/features/lobby/typings';
import { changeFilter } from '@/features/lobby/actions';
import { selectCategory } from '@/features/lobby/selectors';
import { Button } from '../Button';

interface IOwnProps {
  category: IItems,
}

export const CategoryTab = ( props: IOwnProps ) => {
  const { category } = props;
  const { id = -1, categoryFilter = '', name: { en = ''} } = category;
  const selectedCategory = useSelector(selectCategory, shallowEqual);
  const dispatch = useDispatch();

  const handleOnClick = useCallback( () => {
    if (categoryFilter.length === 0) {
      return false;
    }
    if (selectedCategory === categoryFilter) {
      return false; // avoid re-dispatching the same filter
    }
    // TODO - send Category in games API properly as to Apply filter from BE side
    dispatch(changeFilter(categoryFilter));
  }, [categoryFilter, selectedCategory, dispatch] );

  const isSelected = categoryFilter === selectedCategory;
  
  const ownClass = classNames( styles.categoryTab, {
    [styles.selected]: isSelected
  } );

  return <div key={id} className={ownClass} >
    {
      categoryFilter.length > 0
        ? <Button onClick={handleOnClick}><span>{en}</span></Button>
        : <span>{en}</span>
    }
  </div>;
}
