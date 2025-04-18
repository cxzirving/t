import React from 'react';

export default function SearchBar({ onSearch }) {
  return (
    <form id="form" role="search" autoComplete="off" className="position-relative mb-4">
      <label className="visually-hidden" htmlFor="search">Rechercher</label>
      <input
        id="search"
        className="search-input col-12 rounded"
        type="text"
        placeholder="Rechercher un ingrédient, appareil, ustensiles ou une recette"
        // Le texte saisi par l'utilisateur est envoyé à la fonction onSearch pour mettre à jour l'état de recherche.
        onChange={(e) => onSearch(e.target.value)}
      />
      <div className="search-img position-absolute top-50 translate-middle">
        <img className="search-logo" alt="" src="/assets/img/search.svg" />
      </div>
    </form>
  );
}
