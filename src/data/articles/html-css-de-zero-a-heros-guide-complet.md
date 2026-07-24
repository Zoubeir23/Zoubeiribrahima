# HTML & CSS
## Guide Complet du Developpeur Web
### De Zero a Heros

> Le web est fait de deux briques simples : la structure (HTML) et l'habillage (CSS). Maitrisez-les, et vous pourrez construire n'importe quelle interface.
> - Tim Berners-Lee (inspire)

**Patrice Neussi** (inspire du style des guides precedents)
*Developpeur Full-Stack - Universite de Yaounde I*

---

## Table des matieres

**Preface**
**1. Introduction au web front-end**
1.1 Comment fonctionne un site web
1.2 Role de HTML et CSS
1.3 Environnement de developpement

**2. Les bases de HTML**
2.1 Structure d'un document HTML
2.2 Balises, attributs et elements
2.3 Les balises essentielles (titres, paragraphes, liens, images)
2.4 Commentaires HTML

**3. Mise en forme textuelle et listes**
3.1 Balises de formatage (`strong`, `em`, `mark`, etc.)
3.2 Listes ordonnees et non ordonnees
3.3 Listes de definitions

**4. Les liens et ancres**
4.1 Liens absolus et relatifs
4.2 Ouvrir un lien dans un nouvel onglet
4.3 Ancres internes

**5. Les images et medias**
5.1 Balise `<img>`
5.2 Formats d'image (JPEG, PNG, WebP, SVG)
5.3 Video et audio (`<video>`, `<audio>`)

**6. Les tableaux HTML**
6.1 Structure (`<table>`, `<tr>`, `<td>`, `<th>`)
6.2 Fusion de cellules (`colspan`, `rowspan`)

**7. Les formulaires HTML**
7.1 Balise `<form>` et methodes GET/POST
7.2 Champs de saisie (`<input>`, `<textarea>`, `<select>`)
7.3 Boutons, labels et champs specifiques (email, date, etc.)
7.4 Validation HTML5

**8. Introduction a CSS**
8.1 Syntaxe CSS (selecteurs, proprietes, valeurs)
8.2 Trois facons d'integrer CSS (externe, interne, inline)
8.3 Cascade et specificite

**9. Selecteurs CSS avances**
9.1 Selecteurs simples (classe, ID, type)
9.2 Selecteurs contextuels (descendant, enfant, adjacent)
9.3 Pseudo-classes (`:hover`, `:nth-child`, `:not`)
9.4 Pseudo-elements (`::before`, `::after`)

**10. Couleurs et unites**
10.1 Noms de couleurs, hexadecimal, RGB, HSL
10.2 Unites absolues (px, pt) et relatives (em, rem, %, vw, vh)

**11. Le modele de boite (Box Model)**
11.1 Contenu, padding, bordure, marge
11.2 Calcul de la largeur reelle
11.3 `box-sizing: border-box`

**12. Fond et bordures**
12.1 `background-color`, `background-image`
12.2 `border`, `border-radius`
12.3 Ombres (`box-shadow`, `text-shadow`)

**13. Le positionnement**
13.1 Flux normal (`static`)
13.2 `relative`, `absolute`, `fixed`, `sticky`
13.3 `z-index` (empilement)

**14. Flexbox - mise en page moderne**
14.1 Principes : conteneur flex et items
14.2 `flex-direction`, `justify-content`, `align-items`
14.3 `flex-wrap`, `flex-grow`, `order`
14.4 Exemples concrets (navbar, carte, centrage)

**15. Grid CSS - la grille puissante**
15.1 Creer une grille (`display: grid`)
15.2 Definir les colonnes et lignes (`grid-template-columns`, `grid-template-rows`)
15.3 Placement des items (`grid-column`, `grid-row`)
15.4 Gap, zones nommees (`grid-template-areas`)

**16. Typographie responsive**
16.1 Polices systeme et web fonts (Google Fonts)
16.2 `@font-face`
16.3 Proprietes : `font-family`, `font-size`, `font-weight`, `line-height`

**17. Les transitions et animations**
17.1 `transition` (changement progressif)
17.2 `transform` (rotation, translation, echelle)
17.3 Keyframes et `animation`

**18. Responsive design**
18.1 Viewport et balise `<meta>`
18.2 Media queries (`@media`)
18.3 Approches : mobile-first, breakpoints communs
18.4 Images responsives (`srcset`, `picture`)

**19. Accessibilite (a11y) et bonnes pratiques**
19.1 Attributs ARIA
19.2 Structure semantique (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
19.3 Contrastes, navigation au clavier

**20. Preprocesseurs CSS (introduction)**
20.1 SASS / SCSS : variables, imbrication, mixins

**21. Outils et workflow**
21.1 DevTools (inspecteur)
21.2 Validation W3C
21.3 Organisation des fichiers (BEM, OOCSS)

**22. Fiche de revision**
22.1 Balises HTML incontournables
22.2 Proprietes CSS essentielles
22.3 Snippets frequents

**23. Conclusion**
23.1 Recapitulatif
23.2 Projets pour progresser

---

## Preface

Bienvenue dans **HTML & CSS - De Zero a Heros**.

Ce guide vous apprendra a creer des pages web de zero, sans aucune connaissance prealable. Vous maitriserez la structure (HTML) et la mise en forme (CSS) pour realiser des sites modernes, responsives et accessibles.

Chaque chapitre contient :
- des explications claires,
- des exemples de code,
- des exercices pratiques,
- des astuces de pro.

> Le plus beau site du monde a commence par une simple balise `<html>`.

---

## 1. Introduction au web front-end

### 1.1 Comment fonctionne un site web

- Un navigateur envoie une requete a un serveur.
- Le serveur renvoie un fichier **HTML** (la structure).
- Le navigateur lit le HTML, charge les **CSS** (styles) et **JavaScript** (interactions).
- Il affiche la page selon les regles CSS.

### 1.2 Role de HTML et CSS

- **HTML** (HyperText Markup Language) : contenu et structure (titres, paragraphes, images...).
- **CSS** (Cascading Style Sheets) : apparence (couleurs, tailles, disposition).

### 1.3 Environnement de developpement

Un simple editeur de texte et un navigateur suffisent.

**Recommandations :**
- Editeur : VS Code, Sublime Text, ou meme Notepad++.
- Navigateur : Firefox (DevTools) ou Chrome.
- Extension live-server (VS Code) pour voir les changements en direct.

---

**Exercice 1** : Creez un dossier `mon-site`, puis un fichier `index.html` avec le contenu `Bonjour monde !` et ouvrez-le dans le navigateur.

---

## 2. Les bases de HTML

### 2.1 Structure d'un document HTML

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mon premier site</title>
</head>
<body>
    <h1>Bienvenue sur mon site</h1>
    <p>Ceci est un paragraphe.</p>
</body>
</html>
```

**Explication :**
- `<!DOCTYPE html>` : indique la version HTML5.
- `<html>` : racine du document.
- `<head>` : metadonnees (titre, encodage, CSS...).
- `<body>` : contenu visible.

### 2.2 Balises, attributs et elements

Une balise ouvrante `<balise>` et une balise fermante `</balise>` forment un element.
Certaines sont auto-fermantes (`<img>`, `<br>`, `<input>`).

Attributs : `nom="valeur"` (exemple : `<a href="https://exemple.com">`).

### 2.3 Balises essentielles

| Balise | Role |
|--------|------|
| `<h1>` a `<h6>` | Titres (h1 = plus important) |
| `<p>` | Paragraphe |
| `<a>` | Lien hypertexte |
| `<img>` | Image |
| `<br>` | Saut de ligne |
| `<hr>` | Ligne horizontale |

Exemple :

```html
<h2>A propos</h2>
<p>Je suis <strong>developpeur</strong> web.</p>
<img src="photo.jpg" alt="Ma photo">
<a href="contact.html">Me contacter</a>
```

### 2.4 Commentaires HTML

```html
<!-- Ceci est un commentaire, invisible a l'ecran -->
```

---

**Exercice 2** : Creez une page avec un titre principal, un sous-titre, un paragraphe et une image de votre choix.

---

## 3. Mise en forme textuelle et listes

### 3.1 Balises de formatage

- `<strong>` : important (gras, mais aussi semantique)
- `<em>` : emphase (italique)
- `<mark>` : surligne
- `<small>` : texte secondaire
- `<del>` : barre (supprime)
- `<ins>` : souligne (insere)

### 3.2 Listes non ordonnees (`<ul>`) et ordonnees (`<ol>`)

```html
<ul>
  <li>Pomme</li>
  <li>Poire</li>
</ul>

<ol>
  <li>Premier</li>
  <li>Deuxieme</li>
</ol>
```

### 3.3 Listes de definitions

```html
<dl>
  <dt>HTML</dt>
  <dd>Langage de structure</dd>
  <dt>CSS</dt>
  <dd>Langage de style</dd>
</dl>
```

---

**Exercice 3** : Creez une page Recette avec une liste d'ingredients (non ordonnee) et les etapes (ordonnee).

---

## 4. Les liens et ancres

### 4.1 Liens absolus et relatifs

- Absolu : `https://exemple.com/page.html`
- Relatif : `contact.html` (meme dossier), `images/photo.jpg` (sous-dossier), `../index.html` (dossier parent)

### 4.2 Ouvrir un lien dans un nouvel onglet

```html
<a href="https://google.com" target="_blank" rel="noopener">Google</a>
```

`rel="noopener"` ameliore la securite.

### 4.3 Ancres internes

```html
<h2 id="section1">Section 1</h2>
<a href="#section1">Aller a la section 1</a>
```

---

**Exercice 4** : Creez un menu de navigation (Accueil, Services, Contact) avec des liens pointant vers des sections de la meme page.

---

## 5. Les images et medias

### 5.1 Balise `<img>`

```html
<img src="photo.jpg" alt="Description" width="300" height="200">
```

`alt` : texte alternatif (obligatoire pour l'accessibilite).

### 5.2 Formats d'image

- JPEG : photo (avec compression)
- PNG : transparence
- WebP : moderne, leger
- SVG : vectoriel (logo, icones)

### 5.3 Video et audio

```html
<video controls width="400">
  <source src="video.mp4" type="video/mp4">
  Votre navigateur ne supporte pas la video.
</video>

<audio controls>
  <source src="son.mp3" type="audio/mpeg">
</audio>
```

---

**Exercice 5** : Ajoutez une galerie de 3 images sur votre page.

---

## 6. Les tableaux HTML

### 6.1 Structure

```html
<table border="1">
  <thead>
    <tr><th>Nom</th><th>Age</th></tr>
  </thead>
  <tbody>
    <tr><td>Alice</td><td>30</td></tr>
    <tr><td>Bob</td><td>25</td></tr>
  </tbody>
</table>
```

### 6.2 Fusion de cellules

```html
<tr>
  <td colspan="2">Cellule sur deux colonnes</td>
</tr>
<tr>
  <td rowspan="2">Cellule sur deux lignes</td>
</tr>
```

---

**Exercice 6** : Creez un tableau representant un emploi du temps (lignes = heures, colonnes = jours).

---

## 7. Les formulaires HTML

### 7.1 Balise `<form>`

```html
<form action="/traitement" method="post">
  <!-- champs -->
</form>
```

- `method="get"` : les donnees apparaissent dans l'URL (recherche).
- `method="post"` : pour envoyer des donnees sensibles ou volumineuses.

### 7.2 Champs de saisie

```html
<input type="text" name="nom" placeholder="Votre nom">
<input type="email" name="email" required>
<textarea name="message" rows="5" cols="30"></textarea>
<select name="pays">
  <option value="fr">France</option>
  <option value="cm">Cameroun</option>
</select>
```

### 7.3 Boutons

```html
<button type="submit">Envoyer</button>
<button type="reset">Effacer</button>
```

### 7.4 Validation HTML5

Utilisez `required`, `type="email"`, `type="number"`, `pattern`.

---

**Exercice 7** : Creez un formulaire d'inscription (nom, email, mot de passe, date de naissance, case a cocher J'accepte les CGU).

---

## 8. Introduction a CSS

### 8.1 Syntaxe CSS

```css
selecteur {
  propriete: valeur;
}
```

Exemple :

```css
p {
  color: blue;
  font-size: 16px;
}
```

### 8.2 Trois facons d'integrer CSS

1. **Externe** (recommande) : `<link rel="stylesheet" href="style.css">`
2. **Interne** : `<style>` dans `<head>`
3. **Inline** : `<p style="color:red;">` (a eviter)

### 8.3 Cascade et specificite

- Plus une regle est specifique, plus elle est prioritaire.
- Ordre : `inline style` > `#id` > `.classe` > `balise` > regles par defaut.
- Le mot-cle `!important` force la priorite (a utiliser avec parcimonie).

---

**Exercice 8** : Creez un fichier `style.css` et liez-le a votre HTML. Changez la couleur de tous les titres en vert.

---

## 9. Selecteurs CSS avances

### 9.1 Selecteurs simples

```css
h1 { }
.ma-classe { }
#mon-id { }
```

### 9.2 Selecteurs contextuels

```css
div p { }
div > p { }
h1 + p { }
h1 ~ p { }
```

### 9.3 Pseudo-classes

```css
a:hover { color: red; }
li:nth-child(2) { }
input:focus { background: yellow; }
:not(p) { }
```

### 9.4 Pseudo-elements

```css
p::first-letter { font-size: 200%; }
p::before { content: "★ "; }
p::after { content: " ✓"; }
```

---

**Exercice 9** : Faites en sorte que chaque ligne paire d'un tableau ait un fond gris clair (utilisez `:nth-child(even)`).

---

## 10. Couleurs et unites

### 10.1 Couleurs

- Noms : `red`, `blue`, `lightgray`
- Hexadecimal : `#FF0000` (rouge)
- RGB : `rgb(255,0,0)`
- HSL : `hsl(0, 100%, 50%)`
- Avec transparence : `rgba(255,0,0,0.5)`, `hsla(...)`

### 10.2 Unites

- **Absolues** : `px` (pixels), `pt` (points)
- **Relatives** : `em`, `rem`, `%`, `vw`, `vh`

**Bonnes pratiques** : utilisez `rem` pour les tailles de police, `%` ou `vw` pour les largeurs responsives.

---

## 11. Le modele de boite (Box Model)

### 11.1 Composants

Tout element HTML est une boite rectangulaire : contenu, padding, bordure, marge.

Proprietes : `width`, `height`, `padding`, `border`, `margin`.

### 11.2 Calcul de la largeur reelle

Par defaut, la largeur reelle = `width` + paddings + bordures horizontales.

### 11.3 `box-sizing: border-box`

```css
* {
  box-sizing: border-box;
}
```

Alors `width` inclut le padding et la bordure.

---

**Exercice 10** : Creez deux boites cote a cote avec des marges, bordures et paddings differents. Testez `box-sizing`.

---

## 12. Fond et bordures

### 12.1 Arriere-plan

```css
div {
  background-color: #f0f0f0;
  background-image: url('pattern.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
```

### 12.2 Bordures

```css
div {
  border: 2px solid black;
  border-radius: 10px;
  border-top: none;
}
```

### 12.3 Ombres

```css
box-shadow: 5px 5px 10px rgba(0,0,0,0.3);
text-shadow: 1px 1px 1px gray;
```

---

**Exercice 11** : Concevez une carte (card) avec une image de fond, une bordure arrondie et une ombre.

---

## 13. Le positionnement

### 13.1 Flux normal (`static`)

Les elements s'affichent les uns apres les autres.

### 13.2 `relative`, `absolute`, `fixed`, `sticky`

```css
.relative {
  position: relative;
  top: 10px;
}
.absolute {
  position: absolute;
  top: 0;
  left: 0;
}
.fixed {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
.sticky {
  position: sticky;
  top: 0;
}
```

### 13.3 `z-index`

Controle l'ordre d'empilement (plus grand = au-dessus).

---

**Exercice 12** : Creez un bandeau en haut de page `fixed` et un bouton Retour en haut en bas a droite.

---

## 14. Flexbox

### 14.1 Principes

Flexbox permet de repartir l'espace dans un conteneur et d'aligner ses enfants.

```css
.conteneur {
  display: flex;
}
```

### 14.2 Axes et alignements

- `flex-direction` : `row` ou `column`
- `justify-content` : alignement horizontal
- `align-items` : alignement vertical

### 14.3 Comportement des items

- `flex-wrap` : `wrap`
- `flex-grow`
- `order`

### 14.4 Exemples

```css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
```

```css
.nav {
  display: flex;
  gap: 20px;
  list-style: none;
}
```

---

**Exercice 13** : Realisez une barre de navigation avec logo a gauche, liens au centre et icone de connexion a droite.

---

## 15. Grid CSS

### 15.1 Creer une grille

```css
.grille {
  display: grid;
  grid-template-columns: 200px 1fr 2fr;
  gap: 20px;
}
```

### 15.2 Definir les colonnes/lignes

- `fr`
- `repeat(3, 1fr)`
- `minmax(100px, auto)`

### 15.3 Placement des items

```css
.item {
  grid-column: 1 / 3;
  grid-row: span 2;
}
```

### 15.4 Zones nommees

```css
.grille {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
}
.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
```

---

**Exercice 14** : Creez une mise en page magazine avec en-tete, menu lateral, zone principale et pied de page.

---

## 16. Typographie responsive

### 16.1 Polices systeme

```css
body {
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
}
```

### 16.2 Google Fonts

```html
<link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
```

```css
body {
  font-family: 'Open Sans', sans-serif;
}
```

### 16.3 `@font-face`

```css
@font-face {
  font-family: 'MaPolice';
  src: url('maPolice.woff2') format('woff2');
}
```

### 16.4 Proprietes essentielles

- `font-size`
- `font-weight`
- `line-height`
- `text-align`

---

**Exercice 15** : Choisissez deux polices Google Fonts (une pour les titres, une pour le texte) et appliquez-les.

---

## 17. Transitions et animations

### 17.1 Transition

```css
.bouton {
  background: blue;
  transition: background 0.3s ease, transform 0.2s;
}
.bouton:hover {
  background: red;
  transform: scale(1.05);
}
```

### 17.2 Transformations

- `rotate(10deg)`
- `translate(20px, 10px)`
- `scale(1.2)`

### 17.3 Animations (keyframes)

```css
@keyframes clignoter {
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}
.alerte {
  animation: clignoter 1s infinite;
}
```

---

**Exercice 16** : Faites un bouton qui change de couleur et grandit au survol avec une transition fluide.

---

## 18. Responsive design

### 18.1 Viewport

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### 18.2 Media queries

```css
.container { grid-template-columns: 1fr; }

@media (min-width: 768px) {
  .container { grid-template-columns: 1fr 1fr; }
}

@media (min-width: 1024px) {
  .container { grid-template-columns: 1fr 1fr 1fr; }
}
```

### 18.3 Images responsives

```html
<img srcset="petite.jpg 400w, grande.jpg 800w"
     sizes="(max-width: 600px) 400px, 800px"
     src="grande.jpg" alt="...">
```

Balise `<picture>` pour changer d'image selon la taille ou le format.

---

**Exercice 17** : Rendez votre page responsive : la navigation devient colonne sur mobile, le nombre de colonnes change selon la largeur.

---

## 19. Accessibilite et bonnes pratiques

### 19.1 Semantique HTML

Utilisez les balises appropriees :

- `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- `<button>` plutot qu'un `<div>` cliquable.

### 19.2 Attributs ARIA

```html
<button aria-label="Fermer">X</button>
<nav role="navigation">...</nav>
```

### 19.3 Contrastes et navigation clavier

- Verifiez les contrastes.
- Testez la navigation avec la touche `Tab`.

---

**Exercice 18** : Ajoutez des attributs `aria` a un formulaire et testez la navigation au clavier.

---

## 20. Preprocesseurs CSS (introduction)

### 20.1 SASS / SCSS

```scss
$couleur-primaire: #3498db;

nav {
  ul {
    margin: 0;
    li {
      display: inline-block;
    }
  }
}

@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
  border-radius: $radius;
}
```

Il faut compiler le SCSS en CSS.

---

## 21. Outils et workflow

### 21.1 DevTools

- Inspecter un element.
- Modifier CSS en direct.
- Simuler des appareils mobiles.

### 21.2 Validation W3C

- [validator.w3.org](https://validator.w3.org) pour HTML.
- [jigsaw.w3.org/css-validator](https://jigsaw.w3.org/css-validator) pour CSS.

### 21.3 Organisation des fichiers

```text
mon-projet/
  index.html
  css/
    style.css
    reset.css
  images/
  js/
```

**Methodologie BEM** : `.card__title--large`.

---

## 22. Fiche de revision

### 22.1 Balises HTML incontournables

| Balise | Usage |
|--------|-------|
| `<html>` | racine |
| `<head>` | metadonnees |
| `<body>` | contenu |
| `<h1>` a `<h6>` | titres |
| `<p>` | paragraphe |
| `<a>` | lien |
| `<img>` | image |
| `<ul>`, `<ol>`, `<li>` | listes |
| `<table>` | tableau |
| `<form>` | formulaire |
| `<div>` | conteneur generique |
| `<span>` | conteneur inline |

### 22.2 Proprietes CSS essentielles

| Propriete | Role |
|-----------|------|
| `color` | couleur du texte |
| `background` | fond |
| `margin`, `padding` | espacements |
| `border` | bordure |
| `display` | bloc / inline / flex / grid |
| `position` | type de positionnement |
| `width`, `height` | dimensions |
| `font-size` | taille de police |
| `text-align` | alignement |
| `flex` | mise en page flexible |
| `grid` | grille |

### 22.3 Snippets frequents

**Reset CSS simple :**

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

**Centrer une div :**

```css
.centre {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
```

**Navbar responsive (mobile-first) :**

```css
.nav-links {
  display: none;
}
@media (min-width: 768px) {
  .nav-links {
    display: flex;
    gap: 20px;
  }
}
```

---

## 23. Conclusion

### 23.1 Recapitulatif

Vous avez appris :

- La structure HTML et ses balises semantiques.
- Les formulaires, tableaux, images et medias.
- Les bases de CSS : selecteurs, boite, couleurs, unites.
- La mise en page moderne avec **Flexbox** et **Grid**.
- Les animations, transitions et le responsive design.
- L'accessibilite et les bonnes pratiques.

### 23.2 Projets pour progresser

- **CV en ligne** : une page simple avec photo, competences, experiences.
- **Page de restaurant** : menu, galerie, formulaire de reservation.
- **Clone d'une page d'accueil**.
- **Portfolio personnel** : responsive, animations au scroll.

> Ce n'est pas la taille du code qui compte, mais la beaute de l'interface que vous creez.

---

**Guide realise par Patrice Neussi (inspiration du style Django)**
*PROPENTATECH - 2025*
📧 propentatech@gmail.com
🌐 www.propentatech.com
