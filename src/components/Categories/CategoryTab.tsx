import React from 'react'
import { useDispatch } from "react-redux";

import { IItems } from '@/features/lobby/typings';
import { changeFilter } from '@/features/lobby/actions';

interface IOwnProps {
  category: IItems,
}

export const CategoryTab = ( props: IOwnProps ) => {
  const { category } = props;
  const dispatch = useDispatch();

  
  const handleOnClick = (categoryFilter: string | undefined) => {
    if (!categoryFilter) {
      return false;
    }
    // TODO - send Category in games API properly as to Apply filter from BE side
    dispatch(changeFilter(categoryFilter));
  };

  return <li key={category.id}>
    {
      category.categoryFilter && category.categoryFilter.length > 0
        ? <button onClick={() => handleOnClick(category.categoryFilter)}><span>{category.name.en}</span></button>
        : <span>{category.name.en}</span>
    }
  </li>;
}
