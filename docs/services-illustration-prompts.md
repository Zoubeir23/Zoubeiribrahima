# Illustrations des services : prompts Nano Banana (Gemini)

Objectif : 5 illustrations dans le style de l'avatar du portfolio (encre noire, aplats pleins, contours nets).

## Mode d'emploi

1. Ouvre Gemini avec Nano Banana et joins l'avatar comme image de référence :
   `public/Gemini_Generated_Image_5omzhk5omzhk5omz-removebg-preview.png`
2. Génère une image à la fois, dans la même conversation (cohérence du personnage). Colle d'abord le bloc STYLE, puis le prompt du service.
3. Nano Banana ne produit pas de vraie transparence : demande un fond blanc pur, puis retire-le avec remove.bg (comme pour ton avatar).
4. Enregistre le PNG détouré sous le nom indiqué, dans `public/services/`. Le site les détecte automatiquement. Tant que le fichier est absent, l'emoji s'affiche à la place.

## Bloc STYLE (à coller à chaque fois)

```
Use the attached image as the character and style reference. Keep the exact same character: young Black man, short curly hair, short mustache and light stubble, black t-shirt with a thin white neckline trim. Same illustration style: high-contrast black and white ink illustration, bold clean black outlines, solid flat black fills with thin white highlight lines, hand-inked comic look, no gradients, no colors, no shading, no text, no watermark. Add a thin off-white halo outline around the whole subject like a sticker. Square 1:1 composition, subject centered with generous margins. Plain pure white (#FFFFFF) background.
```

## Prompts par service

### 1. `public/services/saas.png`

```
The character stands with arms crossed behind a large floating browser window showing a dashboard: bar chart, line chart and a small user-avatar list. A cloud shape floats above the window and a padlock icon sits beside it. Confident, calm expression.
```

### 2. `public/services/web-applications.png`

```
The character stands next to a big browser window displaying an application layout (sidebar, cards, table). Floating around it: code brackets </>, a gear and a small API plug icon connected by thin lines. One hand points at the window.
```

### 3. `public/services/mobile-applications.png`

```
The character holds a large smartphone in one hand, screen facing the viewer, showing an app grid with a notification bubble above it. A second smaller phone floats behind with a simple chat screen. Friendly, confident expression.
```

### 4. `public/services/portfolio-websites.png`

```
The character stands beside a large desktop monitor showing a portfolio website: a hero banner, a grid of project thumbnails and a star rating. A pen-tool cursor and a small picture-frame icon float near the screen. Proud, relaxed pose.
```

### 5. `public/services/remote-it-services.png`

```
The character wears a headset and sits at a laptop, one hand on the keyboard. A wrench and a screwdriver cross above the laptop, with Wi-Fi waves and a small globe showing a remote connection line. Helpful, reassuring expression.
```

## Si le résultat s'éloigne du style

Ajoute à la fin du prompt : `Redraw it exactly in the style of the reference image: thick uniform ink outlines, black fills with white line details, no gray tones.`
