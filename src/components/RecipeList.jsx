import React from 'react';
import RecipeCard from './RecipeCard';

export default function RecipeList({ recipes }) {
  return (
    <div className="row">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="col-md-6 col-lg-4">
          <RecipeCard recipe={recipe} />
        </div>
      ))}
    </div>
  );
}
