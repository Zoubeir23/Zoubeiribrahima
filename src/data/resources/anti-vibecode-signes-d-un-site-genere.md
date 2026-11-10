## À quoi ça sert

Un site généré par une IA sans consigne finit souvent avec les mêmes réflexes : dégradé violet sur fond noir, trois cartes de fonctionnalités alignées, faux compteurs d'utilisateurs, onglet resté sur « Create Next App ». Les visiteurs les repèrent en une seconde.

Le skill `anti-vibecode`, publié par Melvynx dans son dépôt `shared-skills`, recense 43 de ces signes et les transforme en règles. Il sert avant de construire (pour les éviter) et après (pour les trouver et les corriger).

## 1. Installer le skill

```bash
npx skills add Melvynx/shared-skills --skill anti-vibecode -g -a claude-code
```

## 2. L'activer avant de construire

```text
/anti-vibecode
```

Avant d'écrire une page, il fixe trois choix qui éliminent la plupart des signes : une couleur de marque qui n'est ni violette ni indigo, une police autre qu'Inter, Geist ou Space Grotesk, et une mise en page qui n'est pas « titre centré plus trois cartes ».

## 3. Auditer ou corriger un site existant

```text
/anti-vibecode audit
/anti-vibecode fix
```

- `audit` lance un scanner sur le code, puis vérifie à l'œil ce qu'une recherche automatique ne voit pas. Il ne modifie rien.
- `fix` fait l'audit puis corrige les signes trouvés, des plus visibles aux moins visibles.

## Les familles de signes

Sans recopier la liste de l'auteur, voici ce qu'elle couvre : les couleurs et surfaces, la mise en page, les icônes, la typographie, les animations, les textes (formules creuses, faux témoignages), et surtout ce qui manque : mentions légales, politique de confidentialité, favicon par défaut, image de partage absente, liens de pied de page qui ne mènent nulle part. La liste complète, avec ce qu'il faut faire à la place de chaque signe, est dans le fichier `references/signs.md` du dépôt.

## Bon à savoir

Le dépôt `Melvynx/shared-skills` ne précise pas de licence. Tu peux l'installer et l'utiliser comme proposé par son auteur, mais pas en redistribuer le contenu.

Source : [github.com/Melvynx/shared-skills](https://github.com/Melvynx/shared-skills/tree/main/skills/anti-vibecode)
