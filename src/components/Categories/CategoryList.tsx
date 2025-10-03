import { CSSProperties } from 'react';
import { useSelector } from "react-redux";

import { selectConfig, selectConfigAPIError, selectIsLoadingConfig } from '@/features/lobby/selectors';

import { CategoryTab } from './CategoryTab';

interface IOwnProps {
  className?: string;
  style?: CSSProperties;
}

export const CategoryList = (props: IOwnProps) => {
  const { className, style } = props;
  const categories = useSelector(selectConfig);
  const error = useSelector(selectConfigAPIError);
  const loading = useSelector(selectIsLoadingConfig);

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
