## À quoi ça sert

La plupart des outils vidéo IA te rendent un seul clip à partir d'une phrase. OpenMontage (licence AGPL-3.0) fait autre chose : il donne à ton assistant IA (Claude Code, Cursor, Copilot, Windsurf, Codex) le processus complet d'une équipe de production. Tu décris la vidéo en langage normal, et l'agent enchaîne la recherche sur le web, le script, le plan des scènes, la génération des images, la voix, le montage et le rendu.

Deux choses le distinguent :

- **Il peut monter de vraies images.** À côté des vidéos faites d'images animées, il sait construire une vidéo à partir de séquences filmées gratuites (Pexels, Archive.org, NASA, Wikimedia Commons), classées par sens, puis coupées sur une ligne de montage.
- **Tu gardes la main.** La proposition de concept, le script, le plan des scènes, les visuels générés et la publication s'arrêtent tant que tu n'as pas validé. Le coût est estimé avant chaque dépense.

## Les types de vidéos

Chaque type est un « pipeline » complet, de l'idée au fichier final :

| Pipeline | Ce qu'il produit |
|---|---|
| Animated Explainer | Une vidéo explicative avec recherche, voix, visuels et musique |
| Animation | Du motion design, du texte animé |
| Avatar Spokesperson | Un présentateur à base d'avatar |
| Cinematic | Bandes-annonces, teasers, montages d'ambiance |
| Clip Factory | Une série de courts extraits classés, tirés d'une longue source |
| Documentary Montage | Un montage thématique de séquences filmées libres |
| Hybrid | Tes images plus des visuels générés en soutien |
| Localization & Dub | Sous-titrer, doubler et traduire une vidéo existante |
| Podcast Repurpose | Des extraits de podcast mis en vidéo |
| Screen Demo | Des démonstrations de logiciel propres |
| Talking Head | Des vidéos centrées sur une personne qui parle |

## 1. Installer

Il te faut :

- Python 3.10 ou plus.
- FFmpeg (par exemple `brew install ffmpeg` sur Mac).
- Node.js dans une version corrigée : 22.23.4 ou plus, 24.22.1 ou plus, ou 26.12.1 ou plus.
- Un assistant IA de code, comme Claude Code.

Puis dans ton terminal :

```bash
git clone https://github.com/OpenMontageInc/OpenMontage.git
cd OpenMontage
make setup
```

Ouvre le dossier dans ton assistant, et demande ce que tu veux.

## 2. Ta première vidéo, sans clé d'API

Après `make setup`, tu disposes déjà d'outils gratuits : une voix hors ligne (Piper TTS), des archives de séquences libres, le rendu avec Remotion ou HyperFrames, FFmpeg pour l'encodage et des sous-titres mot par mot. Essaie :

```text
Fais une vidéo explicative de 45 secondes sur la raison pour laquelle le ciel est
bleu, avec une voix off et des sous-titres.
```

Pour le chemin « vraies images » sans payer de génération :

```text
Fais un montage documentaire de 90 secondes sur l'ambiance d'une ville à 4 heures
du matin. Utilise uniquement de vraies séquences filmées, sans voix off, avec un
ton élégiaque et de la musique.
```

## 3. Partir d'une vidéo que tu aimes

Colle l'adresse d'une vidéo YouTube, d'un Short, d'un Reel ou d'un TikTok, ou donne un fichier local. L'agent analyse la transcription, le rythme, les scènes et le style, puis te propose deux ou trois concepts différents, le chemin d'outils réaliste, le coût estimé et un échantillon avant la production complète.

```text
Voici un Short YouTube que j'aime. Fais-moi quelque chose dans le même esprit
(rythme et accroche), mais sur la cryptographie, pour des lycéens.
```

Le but est de t'inspirer de la structure, pas de recopier le travail de quelqu'un d'autre : change le sujet, le traitement et le texte.

## 4. Ajouter des clés pour aller plus loin

Plus tu ajoutes de services, plus l'agent a d'outils. Chaque clé est facultative : mets celles que tu as dans le fichier `.env` du projet, créé à partir de `.env.example`.

```bash
PEXELS_API_KEY=ta-cle        # séquences et images libres
ELEVENLABS_API_KEY=ta-cle    # voix de qualité, musique, effets
FAL_KEY=ta-cle               # images et génération de vidéo
```

Ne publie jamais ce fichier : il contient tes clés. Si tu as une carte graphique, `make install-gpu` active la génération vidéo locale.

## 5. Suivre et contrôler la production

OpenMontage inclut Backlot, un tableau local qui se remplit pendant la production : les étapes, le script, les scènes en cours de génération, les choix de services et les dépenses. Il sert aussi de point de validation : la génération des visuels s'arrête sur une planche scène par scène, pour que tu approuves avant le rendu.

```bash
python -m backlot open
```

Côté budget, trois modes existent : `observe` (suivre seulement), `warn` (avertir) et `cap` (limite stricte). Par défaut, l'agent demande confirmation au-dessus de 0,50 dollar par action, avec un plafond total de 10 dollars, réglable. Pour référence, l'auteur indique des vidéos à 1,33 dollar et à environ 4 dollars avec des modèles de génération payants.

Avant de te montrer une vidéo, l'outil la contrôle (lecture des fichiers, images extraites, niveaux audio, sous-titres) et refuse de la présenter si le contrôle échoue.

## À savoir avant de t'en servir

- **Les droits des séquences.** Pexels, Archive.org, NASA et Wikimedia ont chacun leurs conditions. Vérifie celles de ce que tu publies, surtout pour un usage commercial.
- **Les coûts sont réels.** Les modèles de génération payants facturent chaque appel. Mets le mode `cap` avant de laisser tourner l'agent seul.
- **Licence AGPL-3.0.** Tu peux l'utiliser et le modifier. Si tu proposes une version modifiée comme service en ligne, tu dois en publier le code.
- **Il tourne avec ton assistant.** Il n'y a pas de logiciel qui pilote à ta place : c'est ton agent qui lit les instructions du dépôt. Relis ce qu'il propose avant de valider une étape.

Source : [github.com/OpenMontageInc/OpenMontage](https://github.com/OpenMontageInc/OpenMontage)
