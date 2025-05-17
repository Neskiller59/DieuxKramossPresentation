const searchInput = document.getElementById('searchInput');
const items = document.querySelectorAll('[data-nom]');

// Prépare les données pour Fuse.js
const data = Array.from(items).map(item => ({
  name: item.getAttribute('data-nom'),
  type: item.getAttribute('data-name'),
  id: item.id || item.getAttribute('data-nom'),
  element: item
}));

const fuse = new Fuse(data, {
  keys: ['name', 'type'],
  threshold: 0.4,
  ignoreLocation: true
});

// Fonction de recherche
function lancerRecherche(query) {
  // Supprime les anciennes surbrillances
  items.forEach(item => item.classList.remove('highlight'));

  // Si la recherche est vide, ne fait rien
  if (!query) return;

  const results = fuse.search(query);

  // Met en surbrillance les résultats
  results.forEach((result, index) => {
    result.item.element.classList.add('highlight');
    if (index === 0) {
      result.item.element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

// Lance la recherche seulement quand on appuie sur Entrée
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    lancerRecherche(searchInput.value.trim());
  }
});
