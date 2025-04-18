import React from 'react';

export default function Tag({ label, onRemove }) {
  return (
    <div className="tags badge bg-primary ps-3 pe-2 py-2 me-3 mb-2 rounded">
      <span>{label}</span>
      <button type="button" className="tag-close-btn ms-1" onClick={() => onRemove(label)}>
        <img src="/assets/img/tag-close.svg" alt="" aria-hidden="true" />
      </button>
    </div>
  );
}
