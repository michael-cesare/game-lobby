import { CSSProperties, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import styles from './CategoryList.module.scss'

import { selectConfig, selectConfigAPIError, selectIsLoadingConfig } from '@/features/lobby/selectors';

import { CategoryTab } from './CategoryTab';
import { AppDispatch } from '@/redux/createStore';
import { getConfig } from '@/features/lobby/configApi';

interface IOwnProps {
  className?: string;
  style?: CSSProperties;
}

export const CategoryList = (props: IOwnProps) => {
  const { className, style } = props;
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(selectConfig);
  const error = useSelector(selectConfigAPIError);
  const loading = useSelector(selectIsLoadingConfig);

  useEffect(() => {
    // SSR Hydration issue workaround - fetch config on client as data is too big to handle hydration
    dispatch(getConfig());
  }, [dispatch]);

  return (
    <div className={className} style={style}>
      <h2>Game Categories</h2>
      {loading ? (
        <p>Loading categories...</p>
      ) : error ? (
        <p>Error loading categories: {error}</p>
      ) : (
        <div className={styles.categoryList}>
          {categories.map((category) => (
            <CategoryTab
              key={category.id}
              category={category}
            />
          ))}
        </div>
      )}
    </div>
  );
};
