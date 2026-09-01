# Portfolio — architecture

Site statique en HTML/CSS/JS pur (pas de framework, pas de build). Trois fichiers :

- `index.html` — structure et contenu
- `style.css` — design (tokens de couleur/typo en haut du fichier)
- `script.js` — menu mobile + animation du hero (canvas)

## Structure des sections (dans l'ordre)

1. **Header** — nav fixe avec ancre vers chaque section
2. **Hero** — titre d'accroche + animation canvas (vecteurs de vélocité, clin d'œil au debug physique) + boutons vers itch.io et vers les projets
3. **À propos** — bio courte + liste de compétences
4. **Projets** — 4 projets détaillés en blocs alternés image/texte (Grapple Swing, Guardian's Awakening, IA foot, locomotion IK). Duplique le bloc `<article class="project">` pour en ajouter d'autres.
5. **Jeux itch.io** — grille de cartes qui pointent vers tes pages itch.io individuelles, + un lien "voir tout" vers ton profil itch.io
6. **Contact** — email / LinkedIn / GitHub / itch.io
7. **Footer**

## À personnaliser avant de publier

Cherche les commentaires `<!-- TODO -->` dans `index.html` :
- lien itch.io principal (hero + section jeux + contact)
- liens GitHub / LinkedIn / email réels
- liens GitHub/itch.io de chaque projet détaillé
- images dans `images/` (voir `images/README.txt`)
- la phrase sur ta disponibilité actuelle

Le contenu des 4 projets détaillés est déjà pré-rempli à partir de ce que tu m'as partagé
(Grapple Swing, Guardian's Awakening, IA de bot foot, locomotion IK quadrupède) — relis-les et
ajuste le ton/les détails techniques à ta convenance.

## Personnaliser le design

Tout le système de couleur/typo est dans les variables CSS en haut de `style.css` (`:root`).
Changer `--accent` change la couleur signature du site (utilisée dans le hero, les liens,
les boutons).

## Héberger le site

Ce site est 100% statique, donc n'importe quel hébergement statique fonctionne :
- **GitHub Pages** (gratuit, recommandé si tu as déjà un compte GitHub) : pousse ce dossier
  dans un repo, active Pages dans les settings.
- **Netlify / Vercel** : glisser-déposer le dossier suffit.

Note : itch.io peut héberger des pages HTML5, mais c'est pensé pour des builds de jeux
(zip avec un seul point d'entrée), pas vraiment pour un site portfolio multi-pages — GitHub
Pages ou Netlify sont plus adaptés ici, et c'est gratuit dans les deux cas.
