import { CSSProperties, useState, useEffect } from 'react';

interface OwnProps {
  className?: string;
  style?: CSSProperties;
}

interface Category {
  id: string;
  name: {
    en: string;
    pt: string;
  };
  type: string;
}

export const CategoryList = ({ className, style }: OwnProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      setError(null);
      const response = await fetch('https://casino.api.pikakasino.com/v1/pika/config');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const lobbyCategories = data.menu?.lobby?.items || [];
      setCategories(lobbyCategories);
      setLoading(false);
    }
    fetchCategories();
  }, []);

  return (
    <div className={className} style={style}>
      <h2>Game Categories</h2>
      {loading ? (
        <p>Loading categories...</p>
      ) : error ? (
        <p>Error loading categories</p>
      ) : (
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              {category.name.en}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
