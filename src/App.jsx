import React, { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Dropdown from './components/Dropdown';
import Tag from './components/Tag';
import RecipeList from './components/RecipeList';
import recipesData from './data/recipes.json';

function App() {
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);

  const normalize = str =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "");

  const capitalize = str =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const getUniqueOriginals = (list) => {
    const map = new Map();
    list.forEach(item => {
      const key = normalize(item);
      if (!map.has(key)) {
        map.set(key, capitalize(item));
      }
    });
    return Array.from(map.values());
  };

  const handleTagAdd = (tag) => {
    if (!tags.includes(tag)) setTags([...tags, tag]);
  };

  const handleTagRemove = (tag) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleSearch = (term) => {
    setSearch(term.toLowerCase());
  };

  const filteredRecipes = recipesData.filter(recipe => {
    const recipeText = `${recipe.name} ${recipe.description} ${recipe.ingredients.map(i => i.ingredient).join(' ')}`.toLowerCase();
    const matchSearch = recipeText.includes(search);
    const matchTags = tags.every(tag => recipeText.includes(tag.toLowerCase()));
    return matchSearch && matchTags;
  });

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
    <div className="container">
      <Header />
      <SearchBar onSearch={handleSearch} />

      <div id="tags-container" className="mb-2 d-flex flex-wrap">
        {tags.map((tag, i) => (
          <Tag key={i} label={tag} onRemove={handleTagRemove} />
        ))}
      </div>

      <div className="btn-group mb-4">
        <Dropdown title="Ingrédients" items={allIngredients} onSelect={handleTagAdd} colorClass="primary" />
        <Dropdown title="Appareils" items={allAppliances} onSelect={handleTagAdd} colorClass="success" />
        <Dropdown title="Ustensiles" items={allUstensils} onSelect={handleTagAdd} colorClass="danger" />
      </div>

      <RecipeList recipes={filteredRecipes} />
    </div>
  );
}

export default App;
