# Ressources de lead magnet

Chaque ressource offerte dans un lead magnet LinkedIn a sa propre page : `https://<domaine>/lead-magnet/<identifiant>`.

## Ce qu'il faut savoir

- **Accessible par lien seulement** : la page n'est dans aucun menu, ni dans le sitemap, ni dans `llms.txt`.
- **Jamais indexée** : balise `noindex` dans la page, et en-tête `X-Robots-Tag: noindex, nofollow` sur tout `/lead-magnet/` (pages et fichiers PDF ou zip).
- **Fichiers externes non couverts** : un fichier sur Google Drive, GitHub ou ailleurs suit les règles de ce service, pas celles du site. Partage-le en « accès par lien » (jamais « public sur le web »), et n'y mets rien que tu ne veux pas voir indexé.
- **Sans e-mail** : toute personne qui a le lien voit la ressource. N'y mets donc rien de confidentiel.

## Publier une ressource en 4 étapes

1. **Le texte** : écris-le en Markdown dans `src/data/lead-magnets/<identifiant>.md`. Un titre `##` devient une partie de la page.
2. **Les fichiers** :
   - moins de 10 Mo (PDF, petit zip) : dépose-les dans `public/lead-magnet/<identifiant>/` ;
   - plus lourds : mets-les sur Google Drive ou dans une publication GitHub et garde le lien `https://`.
3. **L'entrée** : ajoute la ressource dans `src/data/leadMagnetResources.ts`.

   ```ts
   import monGuideMarkdown from "@/data/lead-magnets/mon-guide.md?raw";

   export const leadMagnetResources: readonly LeadMagnetResource[] = [
     {
       slug: "mon-guide",
       title: "Mon guide",
       summary: "Une phrase qui dit ce que la personne va trouver.",
       publishedIsoDate: "2026-11-04",
       contentMarkdown: monGuideMarkdown,
       downloads: [
         { label: "Le guide en PDF", kind: "pdf", href: "/lead-magnet/mon-guide/guide.pdf", sizeLabel: "1,2 Mo" },
         { label: "Le dossier complet", kind: "zip", href: "https://drive.google.com/..." },
       ],
       links: [
         { label: "Mon agent", kind: "agent", href: "https://...", description: "Ce que fait l'agent." },
         { label: "Ma skill", kind: "skill", href: "https://github.com/..." },
         { label: "Mon serveur MCP", kind: "mcp", href: "https://github.com/..." },
       ],
     },
   ];
   ```

   Types de fichier : `pdf`, `zip`, `other`. Types de lien : `agent`, `skill`, `mcp`, `repository`, `other`.
4. **Le partage** : après le déploiement, envoie `https://<domaine>/lead-magnet/mon-guide` aux personnes qui ont commenté.

Les tests vérifient que l'identifiant est en minuscules et tirets, que chaque fichier local existe et pèse moins de 10 Mo, que les liens externes sont en `https`, et que rien n'apparaît dans le sitemap.
