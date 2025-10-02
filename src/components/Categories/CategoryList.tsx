import { CSSProperties, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { IItems } from '@/features/lobby/typings';
import { loadedConfig, isLoadingConfig, configAPIError } from '@/features/lobby/actions';
import { selectConfig, selectConfigAPIError, selectIsLoadingConfig } from '@/features/lobby/selectors';

import { CategoryTab } from './CategoryTab';

interface IOwnProps {
  className?: string;
  style?: CSSProperties;
}

export const CategoryList = (props: IOwnProps) => {
  const { className, style } = props;
  const dispatch = useDispatch();
  const categories = useSelector(selectConfig);
  const error = useSelector(selectConfigAPIError);
  const loading = useSelector(selectIsLoadingConfig);

  useEffect(() => {
    async function fetchCategories() {
      dispatch(isLoadingConfig(true));
      const response = await fetch('https://casino.api.pikakasino.com/v1/pika/config');

      if (!response.ok) {
        dispatch(configAPIError(`HTTP error! status: ${response.status}`));
      } else {
        const data = await response.json();
        const lobbyCategories: IItems[] = data.menu?.lobby?.items || [];
        dispatch(loadedConfig(lobbyCategories));
      }
    }
    fetchCategories();
  }, []);

  return (
    <div className={className} style={style}>
      <h2>Game Categories</h2>
      {loading ? (
        <p>Loading categories...</p>
      ) : error ? (
        <p>Error loading categories: {error}</p>
      ) : (
        <ul>
          {categories.map((category) => (
            <CategoryTab
              key={category.id}
              category={category}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
