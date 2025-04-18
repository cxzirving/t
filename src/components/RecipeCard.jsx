import { Link } from 'react-router-dom';

export default function RecipeCard({ recipe }) {
  return (
    <Link to={`/recipe/${recipe.id}`} className="text-decoration-none text-dark">
      <div className="card mb-4">
        <div className="card-img-top"></div>
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-name">{recipe.name}</h5>
            <div className="d-flex align-items-center">
              <img src="/assets/img/watch-time.svg" className="card-time-watch me-2" alt="Time icon" />
              <span className="card-time">{recipe.time} min</span>
            </div>
          </div>
          <ul className="card-ingredients-list">
            {recipe.ingredients.map((item, index) => (
              <li key={index} className="card-ingredients-list-item">
                <span className="card-ingredients-list-item-ingredient">{item.ingredient}</span>
                {item.quantity ? `: ${item.quantity}${item.unit ? ' ' + item.unit : ''}` : ''}
              </li>
            ))}
          </ul>
          <p className="card-description mt-2">{recipe.description}</p>
        </div>
      </div>
    </Link>
  );
}
