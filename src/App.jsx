// Importation de React et des hooks nécessaires
import React, { useState } from 'react';
// Importation de React Router pour gérer la navigation entre pages
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importation des composants personnalisés
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Dropdown from './components/Dropdown';
import Tag from './components/Tag';
import RecipeList from './components/RecipeList';
import RecipePage from './components/RecipePage';

// Importation du fichier JSON contenant toutes les recettes
import recipesData from './data/recipes.json';

function App() {
  // État pour stocker la valeur du champ de recherche principal
  const [search, setSearch] = useState('');
  // État pour stocker la liste des tags sélectionnés (ingrédients, appareils, ustensiles)
  const [tags, setTags] = useState([]);

  // Fonction pour normaliser une chaîne : en minuscule et sans accent (utile pour le tri et les filtres)
  const normalize = str =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "");
 
  // Fonction pour mettre la première lettre en majuscule et le reste en minuscule
  const capitalize = str =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  // Supprime les doublons dans une liste d'éléments textuels (normalisés) tout en conservant une version formatée pour l'affichage
  const getUniqueOriginals = (list) => {
    const map = new Map();
    list.forEach(item => {
      const key = normalize(item); // clé sans accent/minuscule
      if (!map.has(key)) {
        map.set(key, capitalize(item)); // conserve l'affichage capitalisé
      }
    });
    return Array.from(map.values());
  };

  // Ajoute un tag dans la liste s'il n'est pas déjà présent
  const handleTagAdd = (tag) => {
    if (!tags.includes(tag)) setTags([...tags, tag]);
  };

  // Supprime un tag de la liste
  const handleTagRemove = (tag) => {
    setTags(tags.filter(t => t !== tag));
  };

  // Met à jour le champ de recherche principal
  const handleSearch = (term) => {
    setSearch(term.toLowerCase());
  };

  // Filtrage des recettes en fonction du champ de recherche et des tags sélectionnés
  const filteredRecipes = recipesData.filter(recipe => {
    // Regroupe toutes les infos textuelles d'une recette (nom, description, ingrédients)
    const recipeText = `${recipe.name} ${recipe.description} ${recipe.ingredients.map(i => i.ingredient).join(' ')}`.toLowerCase();
    const matchSearch = recipeText.includes(search); // recherche principale
    const matchTags = tags.every(tag => recipeText.includes(tag.toLowerCase())); // tous les tags doivent être présents
    return matchSearch && matchTags;
  });

  // Récupération de toutes les valeurs uniques depuis les recettes filtrées
  const allIngredients = getUniqueOriginals(
    filteredRecipes.flatMap(r => r.ingredients.map(i => i.ingredient))
  );

  const allAppliances = getUniqueOriginals(
    filteredRecipes.map(r => r.appliance)
  );

  const allUstensils = getUniqueOriginals(
    filteredRecipes.flatMap(r => r.ustensils)
  );

  return (
    // Début du système de routage React Router
    <Router>
      <div className="container">
        {/* En-tête contenant le logo et le titre */}
        <Header />

        <Routes>
          {/* Route principale : recherche + filtres + liste des recettes */}
          <Route
            path="/"
            element={
              <>
                {/* Composant de recherche textuelle */}
                <SearchBar onSearch={handleSearch} />

                {/* Affichage des tags actifs */}
                <div id="tags-container" className="mb-2 d-flex flex-wrap">
                  {tags.map((tag, i) => (
                    <Tag key={i} label={tag} onRemove={handleTagRemove} />
                  ))}
                </div>

                {/* Filtres avancés avec dropdowns : ingrédients, appareils, ustensiles */}
                <div className="btn-group mb-4">
                  <Dropdown title="Ingrédients" items={allIngredients} onSelect={handleTagAdd} colorClass="primary" />
                  <Dropdown title="Appareils" items={allAppliances} onSelect={handleTagAdd} colorClass="success" />
                  <Dropdown title="Ustensiles" items={allUstensils} onSelect={handleTagAdd} colorClass="danger" />
                </div>

                {/* Affichage de la liste des recettes filtrées */}
                <RecipeList recipes={filteredRecipes} />
              </>
            }
          />

          {/* Route dynamique pour une recette individuelle via son ID */}
          <Route path="/recipe/:id" element={<RecipePage recipes={recipesData} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
