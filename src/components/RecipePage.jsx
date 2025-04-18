import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function RecipePage({ recipes }) {
  // Récupère l'id de la recette depuis l'URL
  const { id } = useParams();

  // Recherche de la recette correspondante dans les données
  const recipe = recipes.find((r) => r.id === parseInt(id));

  // Si aucune recette n'est trouvée, affiche un message d'erreur
  if (!recipe) {
    return (
      <div className="text-center mt-5">
        <h2>Recette introuvable</h2>
        <Link to="/" className="btn btn-primary mt-3">Retour à l'accueil</Link>
      </div>
    );
  }

  return (
    <div className="recipe-detail mt-4">
      <Link to="/" className="btn btn-outline-primary mb-4">← Retour à l'accueil</Link>

      <h2 className="mb-3">{recipe.name}</h2>
      <div className="d-flex align-items-center mb-3">
        <img src="/assets/img/time.svg" alt="" className="me-2" />
        <span>{recipe.time} minutes</span>
      </div>

      <h4>Ingrédients :</h4>
      <ul className="mb-3">
        {recipe.ingredients.map((item, index) => (
          <li key={index}>
            <strong>{item.ingredient}</strong>
             {item.quantity && ` : ${item.quantity}${item.unit ? ' _' + item.unit : ''}`}
          </li>
        ))}
      </ul>

      <h4>Instructions :</h4>
      <p>{recipe.description}</p>

      <h5 className="mt-4">Appareil : {recipe.appliance}</h5>
      <h5>Ustensiles : {recipe.ustensils.join(', ')}</h5>
    </div>
  );
}
