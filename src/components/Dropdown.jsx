import React, { useState, useRef, useEffect } from 'react';
// useState : pour gérer l'ouverture/fermeture du menu
// useRef : pour référencer l'élément HTML (le menu) dans le DOM
// useEffect : pour détecter les clics en dehors du menu et le fermer automatiquement

export default function Dropdown({ title, items, onSelect, colorClass }) {
  // Composant Dropdown reçoit 4 props :
  // - title : le nom du menu (ex: "Ingrédients")
  // - items : la liste des éléments à afficher
  // - onSelect : fonction appelée quand on clique sur un élément
  // - colorClass : pour adapter la couleur du bouton (primary, success, danger)

  const [open, setOpen] = useState(false); // État pour savoir si le menu est ouvert ou fermé
  const dropdownRef = useRef(); // Référence à la div contenant le menu

  const sortedItems = [...items].sort((a, b) => a.localeCompare(b));
  // Trie alphabétiquement les items avant de les afficher

  const toggleDropdown = () => setOpen(!open);
  // Fonction qui inverse l'état open : ouvre ou ferme le menu quand on clique sur le bouton

  useEffect(() => {
    // Ce bloc permet de fermer le menu si on clique en dehors
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Si le clic est en dehors du menu, on le ferme
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside); // écoute les clics
    return () => document.removeEventListener('mousedown', handleClickOutside); // nettoyage quand le composant disparaît
  }, []);

  return (
    <div ref={dropdownRef} className="custom-dropdown mb-3 me-md-3 position-relative">
      {/* Conteneur du menu déroulant, avec positionnement relatif pour placer la liste en absolu */}

      <button
        className={`custom-btn custom-${colorClass} btn-lg w-100 d-flex justify-content-between align-items-center`}
        onClick={toggleDropdown}
      >
        {/* Bouton cliquable pour ouvrir/fermer le menu */}
        {title}
        <img
          src="/assets/img/dropdown.svg"
          alt=""
          className={`ms-3 dropdown-arrow ${open ? 'rotate' : ''}`}
        />
        {/* Flèche qui pivote si le menu est ouvert */}
      </button>

      <ul className={`custom-dropdown-menu ${colorClass}-dropdown ${open ? 'show' : ''}`}>
        {/* Liste affichée uniquement si open === true (classe 'show') */}
        {sortedItems.map((item, idx) => (
          <li key={idx}>
            {/* Pour chaque item trié, on affiche un bouton */}
            <button
              className="custom-dropdown-item"
              type="button"
              onClick={() => {
                onSelect(item);     // On appelle la fonction passée en prop avec l'élément cliqué
                setOpen(false);     // On ferme le menu juste après
              }}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
