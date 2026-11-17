## À quoi ça sert

Demander « fais-moi un logo » à une IA donne souvent un résultat générique. Logo Design Skill (publié par kaankiziltug, licence MIT) lui apprend à travailler comme un designer d'identité : il pose les bonnes questions, cherche les conventions du secteur, propose plusieurs pistes, teste chacune, puis te livre des fichiers prêts à l'emploi. Il fonctionne avec Claude, et aussi avec Gemini CLI, Codex CLI, Cursor, GitHub Copilot et les autres agents qui acceptent les skills.

Il contient trois ensembles :

- **Des principes et un processus** : brief, choix du type de marque, construction géométrique, corrections optiques, couleur, typographie, tests, présentation et livraison.
- **Une bibliothèque d'environ 1 400 logos réels au format SVG**, classés par type, technique, secteur et style. Elle sert à étudier comment les logos sont construits et à éviter les ressemblances, jamais à copier.
- **Des outils Python sans dépendance** : un audit de fichier SVG, des planches de concepts et de tests, des présentations avec maquettes, l'export des PNG, du favicon et des icônes d'application.

## Le déroulement

1. **Le brief.** Le skill te pose des questions, ou énonce ses hypothèses si tu préfères aller vite.
2. **La recherche.** Il regarde les conventions de ton secteur dans la bibliothèque.
3. **Les concepts.** Il écrit 8 à 12 idées en une ligne, puis en construit 3 en SVG.
4. **Les tests et les retouches.** Audit du fichier, test à 16 pixels, version une couleur, version inversée, test en plissant les yeux, effet miroir, mise en situation, comparaison avec les logos des concurrents.
5. **Le point d'arrêt.** Le skill s'arrête. Il te montre les concepts sur une seule image avec une recommandation, et propose le kit complet. Rien d'autre n'est produit tant que tu n'as pas choisi une direction.
6. **Le kit.** Sur ta demande : couleurs, variantes, présentation, icônes, charte graphique.

Ce point d'arrêt est volontaire : le kit représente l'essentiel du travail et n'a de sens que pour une idée que tu as validée.

## 1. Installer

**Claude Code, avec le plugin (recommandé) :**

```text
/plugin marketplace add kaankiziltug/logo-design-skill
/plugin install logo-design@logo-design-skill
```

**Claude Code, à la main**, pour tous tes projets :

```bash
git clone https://github.com/kaankiziltug/logo-design-skill.git
mkdir -p ~/.claude/skills
cp -r logo-design-skill/skills/logo-design ~/.claude/skills/logo-design
```

Pour un seul projet, copie le même dossier dans `.claude/skills/logo-design` à la racine du projet.

**Claude.ai et Claude Desktop :** télécharge `logo-design.zip` sur la page Releases du dépôt, puis ajoute-le dans **Settings, Capabilities, Skills**. Si ton envoi a une limite de taille, utilise `logo-design-lite.zip`, qui contient tout sauf les fichiers SVG de la bibliothèque.

**Gemini CLI, Codex CLI et autres :** le skill est un simple dossier avec un fichier `SKILL.md`. Copie-le dans le dossier de skills de ton agent, par exemple `~/.gemini/skills/logo-design` ou `~/.codex/skills/logo-design`.

Un détail : le skill marche mieux avec un modèle qui sait regarder des images, car il génère ses brouillons en PNG et les vérifie avant de te les montrer.

## 2. Demander un logo

Il se déclenche tout seul quand tu parles de logo, de logotype, de monogramme, d'icône d'application, de favicon ou de refonte. Quelques demandes types :

```text
Dessine un logo pour Harbor, une application d'épargne pour ceux qui épargnent
pour la première fois. Il doit inspirer le calme et la sécurité.
```

```text
Voici notre logo actuel (logo.svg). Fais-en la critique et propose une version
rafraîchie.
```

```text
Donne-moi trois pistes de logotype pour un torréfacteur de café appelé Kiln.
```

```text
Transforme ce symbole en favicon, icône d'application et versions une couleur,
avec un guide d'utilisation d'une page.
```

## 3. Utiliser les outils directement

Les scripts se lancent à la main depuis le dossier du skill. Il faut Python 3.8 ou plus (bibliothèque standard seulement) :

```bash
cd skills/logo-design
python3 scripts/svg_audit.py mon-logo.svg
python3 scripts/render_png.py mon-logo.svg --size 512 -o mon-logo.png
python3 scripts/export_variants.py mon-logo.svg --mono "#0F7C80" --icon-bg "#0F7C80" --web-icons
```

- `svg_audit.py` contrôle le fichier (nombre de points, couleurs, angles presque droits, détails trop petits, centrage) et donne un score de 0 à 100.
- `render_png.py` exporte du SVG en PNG transparent, à la taille exacte voulue.
- `export_variants.py` produit les versions noir, blanc, une couleur, carrée, ainsi que le favicon, l'icône d'application et le jeu d'icônes pour le web.

L'export en PNG utilise le moteur de rendu disponible chez toi : `cairosvg`, `rsvg-convert`, Inkscape, un navigateur basé sur Chromium (Chrome, Edge, Brave) ou, sur Mac, l'aperçu rapide.

## Ce que ça ne fait pas, et mes conseils

- **Il ne garantit pas l'originalité.** Le skill compare avec sa bibliothèque et cherche à éviter les ressemblances, mais cette bibliothèque ne contient pas toutes les marques du monde. Avant d'adopter un logo pour une entreprise, vérifie qu'il n'est pas déjà protégé dans les registres de marques de ton pays et de tes marchés. C'est mon conseil, pas une promesse du dépôt.
- **Les logos de la bibliothèque ne t'appartiennent pas.** Ils sont les marques de leurs propriétaires, inclus pour la référence et l'étude seulement, et ne sont pas couverts par la licence MIT. Le texte, les scripts, les modèles et les données de classement le sont.
- **Les 28 exemples sont fictifs.** Ce sont des marques inventées pour montrer le skill.
- **Fais relire le résultat.** Un logo se juge en situation : sur ton site, ta carte de visite, une petite icône. Teste-le à ces tailles avant de t'engager.

Source : [github.com/kaankiziltug/logo-design-skill](https://github.com/kaankiziltug/logo-design-skill)
