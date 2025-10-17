import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import classNames from 'classnames';

import styles from './CategoryList.module.scss'

import { AppDispatch } from '@/redux/createStore';
import { selectConfig, selectConfigAPIError, selectIsLoadingConfig } from '@/features/lobby/selectors';
import { getConfig } from '@/features/lobby/configApi';

import { CategoryTab } from './CategoryTab';

interface IOwnProps {
  className?: string;
}

export const CategoryList = (props: IOwnProps) => {
  const { className } = props;
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(selectConfig);
  const error = useSelector(selectConfigAPIError);
  const loading = useSelector(selectIsLoadingConfig);

  useEffect(() => {
    // SSR Hydration issue workaround - fetch config on client as data is too big to handle hydration
    dispatch(getConfig());
  }, [dispatch]);

  const ownClass = classNames( styles.categories, className )

  return (
    <div className={ownClass}>
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
