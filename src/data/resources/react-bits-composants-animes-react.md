## À quoi ça sert

Un bon site se reconnaît souvent à de petits détails animés : un titre qui apparaît lettre par lettre, un fond qui bouge doucement, une carte qui réagit au survol. React Bits, créé par David Haz, rassemble plus de 215 composants gratuits de ce genre pour React. Chacun a une démo en direct avec des réglages, et tu copies le code dans ton projet : il t'appartient, tu le modifies comme tu veux.

| Catégorie | Nombre | Ce que tu y trouves |
|---|---:|---|
| Text Animations | 33 | Texte découpé, machine à écrire, mots qui tournent, apparitions au défilement |
| Animations | 38 | Effets de curseur, survols, bordures, effets sur les images |
| Components | 48 | Cartes, navigation, carrousels, galeries |
| Micro | 34 | Boutons, interrupteurs, indicateurs |
| Backgrounds | 63 | Dégradés, particules, grilles et effets de shader pour des sections entières |

Chaque composant existe en quatre versions : JavaScript ou TypeScript, avec du CSS ou du Tailwind.

## 1. Installer un composant

Le nom d'un composant se termine par la version voulue : `JS` ou `TS`, puis `CSS` ou `TW` (Tailwind). Avec la commande shadcn, par exemple le composant SplitText en TypeScript et Tailwind :

```bash
npx shadcn@latest add @react-bits/SplitText-TS-TW
```

Ou avec jsrepo :

```bash
npx jsrepo@latest add https://reactbits.dev/r/SplitText-TS-TW
```

Tu peux aussi tout copier à la main : ouvre l'onglet Code d'un composant sur reactbits.dev, choisis ta version et colle les fichiers dans ton projet.

## 2. Laisser Claude Code l'installer

React Bits fonctionne avec le serveur MCP de shadcn. Claude Code peut alors chercher et ajouter des composants à ta place. Déclare d'abord le registre de React Bits dans le fichier `components.json` de ton projet :

```json
{
  "registries": {
    "@react-bits": "https://reactbits.dev/r/{name}.json"
  }
}
```

Puis connecte Claude Code :

```bash
npx shadcn@latest mcp init --client claude
```

Ensuite, décris ton besoin normalement :

```text
Ajoute le composant SplitText de React Bits (version TypeScript et Tailwind) au
titre principal de ma page d'accueil. Montre-moi les fichiers créés avant de
modifier la page.
```

```text
Propose-moi trois fonds animés de React Bits pour la section d'accueil de mon
site, discrets et sur fond sombre. Ne les installe pas avant que je choisisse.
```

## 3. Choisis peu d'effets

Chaque animation coûte de la vitesse et peut gêner la lecture. Quelques réflexes :

- Garde un seul effet fort par écran. Un fond animé plus un titre animé plus un curseur personnalisé donnent une page chargée, et lente sur téléphone.
- Vérifie la vitesse de ta page après chaque ajout.
- Pense aux personnes qui demandent moins de mouvement dans leur système : l'animation doit pouvoir se couper.

Tu peux demander à Claude de contrôler tout cela :

```text
Lis le composant React Bits que je viens d'ajouter. Dis-moi s'il fonctionne en
continu même hors de l'écran, s'il respecte le réglage "réduire les animations"
du système, et ce qu'il ajoute au poids de la page. Propose des corrections sans
les appliquer avant ma validation.
```

## 4. Les outils créatifs gratuits

React Bits propose aussi cinq outils dans le navigateur : Background Studio (régler un fond animé et l'exporter en code, image ou vidéo), Center Stage (transformer une capture d'écran en visuel de produit sur un téléphone ou un ordinateur), Shape Magic (créer un logo en 3D), Texture Lab (appliquer des effets à des photos et vidéos) et Sound Lab (choisir des sons d'interface). Ils sont sur reactbits.dev/tools.

## À savoir sur la licence

La licence est MIT avec une clause supplémentaire, la Commons Clause. Tu peux utiliser les composants dans un site, une application ou un produit, y compris payant. Tu ne peux pas revendre ni redistribuer les composants eux-mêmes, seuls, en pack ou portés vers une autre technologie. Il en va de même pour les images, vidéos et sons exportés des outils : ils sont à toi dans ton projet, mais tu ne peux pas les vendre en pack.

Il existe aussi une offre payante, React Bits Pro, avec des pages complètes, des modèles et des blocs d'interface. Les 215 composants dont parle ce guide restent gratuits.

Source : [github.com/DavidHDev/react-bits](https://github.com/DavidHDev/react-bits)
