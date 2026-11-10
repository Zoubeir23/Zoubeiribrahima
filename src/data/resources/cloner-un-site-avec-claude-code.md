## À quoi ça sert

Ce gabarit Next.js, publié par JCodesMore sous licence MIT, ajoute à ton agent une commande qui reconstruit un site existant en composants modifiables. Utile pour migrer ton propre site (WordPress, Webflow, Squarespace) vers du code que tu possèdes, récupérer un site dont tu as perdu les sources, ou comprendre comment une page est montée.

## 1. Préparer le projet

Colle ce prompt dans Claude Code. L'agent s'occupe de l'installation :

```text
Installe https://github.com/JCodesMore/ai-website-cloner-template comme un projet
indépendant, dans un nouveau dossier. Demande-moi d'abord où le placer.
Clone le dépôt, supprime le remote origin, installe les dépendances,
puis lance npm run check. Laisse le projet prêt à cloner un site.
```

## 2. Reconstruire un site

Ouvre Claude Code dans ce nouveau dossier, avec l'accès au navigateur activé, puis :

```text
/clone-website https://exemple.com
```

L'agent repère les pages du site, l'observe sur ordinateur et sur mobile, reconstruit chaque section en composants, puis compare sa version à l'original et corrige les écarts.

## 3. L'adapter à ta marque

Une fois la reconstruction terminée, demande la personnalisation :

```text
Adapte tout le site à ma marque : mes couleurs, mon logo et les textes de mon
produit. Voici mes informations : ...
```

## La règle à respecter

Reconstruis ton propre site ou étudie une mise en page, rien de plus. Les textes, les images, le logo et la marque d'un site appartiennent à son propriétaire : les reprendre pour te faire passer pour lui, ou publier une copie, t'expose à des poursuites.

Source : [github.com/JCodesMore/ai-website-cloner-template](https://github.com/JCodesMore/ai-website-cloner-template)
