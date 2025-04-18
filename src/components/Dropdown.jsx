import React from 'react';

export default function Dropdown({ title, items, onSelect, colorClass }) {
  const sortedItems = [...items].sort((a, b) => a.localeCompare(b));

  return (
    <div className="dropdown mb-3 me-md-3">
      <button className={`btn btn-${colorClass} btn-lg dropdown-toggle w-100`} data-bs-toggle="dropdown">
        {title}
        <img src="/assets/img/dropdown.svg" alt="" className="ms-3 dropdown-arrow" />
      </button>
      <ul className={`dropdown-menu ${colorClass}-dropdown`}> 
        {sortedItems.map((item, idx) => (
          <li key={idx}>
            <button className="dropdown-item" type="button" onClick={() => onSelect(item)}>
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
