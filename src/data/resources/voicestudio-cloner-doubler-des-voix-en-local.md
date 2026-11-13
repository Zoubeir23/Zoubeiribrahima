## À quoi ça sert

VoiceStudio, publié par debpalash (licence AGPL-3.0), est un studio vocal qui tourne sur ton propre ordinateur, sans compte. Il se présente comme une alternative libre et locale à ElevenLabs, et couvre 646 langues.

Ce que tu peux faire :

- **Cloner une voix** : à partir d'un enregistrement de référence propre, il génère du texte lu dans une voix proche.
- **Créer une voix** : tu la décris avec des mots (genre, âge, hauteur, style, accent) et il la génère.
- **Doubler une vidéo** : traduction et voix calée sur la durée de l'original, y compris avec plusieurs intervenants.
- **Dicter et transcrire** : un petit widget de dictée flottant et une transcription locale.
- **Narrer** : histoires, livres audio et files de travaux en série.

Tout tourne sur ton propre matériel, sans compte. L'application te demande avant de télécharger un modèle, et tu choisis les moteurs dont tu as besoin dans le gestionnaire de modèles (le moteur par défaut est OmniVoice, de k2-fsa).

## 1. Installer

Choisis selon ton système.

**Mac** (macOS 13.3 ou plus, puce Apple Silicon), avec Homebrew :

```bash
brew tap debpalash/tap
brew trust --cask debpalash/tap/voicestudio
brew install --cask debpalash/tap/voicestudio
```

**Windows** (10 ou 11, 64 bits) : télécharge l'installateur sur la page Releases du dépôt.

**Linux** (64 bits) : un paquet `.deb`, un AppImage, un Snap ou un paquet AUR (`yay -S voicestudio-bin`) existent. Sur Ubuntu ou Debian, par exemple, après avoir téléchargé le `.deb` :

```bash
sudo apt install ./VoiceStudio-*-linux-x64.deb
```

Le projet propose aussi une installation en une commande, qui télécharge un script et l'exécute. Lis ce script avant de le lancer : exécuter ce qu'on télécharge sans le lire est un risque, même quand l'éditeur est sérieux. Tu peux l'ouvrir à l'adresse `https://voicestudio.sh/install`, ou dans le dépôt (`scripts/install.sh`).

Si macOS affiche « VoiceStudio est endommagé et ne peut pas être ouvert », c'est Gatekeeper qui bloque l'application, pas un téléchargement cassé. Le guide d'installation du dépôt explique comment le débloquer.

## 2. Premier essai

Ouvre **Voice cloning**, choisis une voix ou ajoute un enregistrement de référence propre, écris ton texte et lance la génération. Pour un bon clonage, la référence doit être propre, sans bruit de fond.

## 3. Brancher Claude à ton studio

VoiceStudio embarque un serveur MCP, monté sur le serveur local de l'application. Il n'y a rien à lancer en plus quand l'application est ouverte. Déclare-le dans Claude Code :

```bash
claude mcp add --scope user --transport http voicestudio http://localhost:3900/mcp/
```

Garde la barre oblique finale de l'adresse. L'application peut aussi exporter une configuration toute prête pour Claude Code, Cursor ou Codex, dans sa rubrique **Integrations**.

Les outils proposés à ton agent : `generate_speech` (texte vers voix), `clone_voice`, `design_voice`, `describe_voice`, `transcribe` (audio vers texte), ainsi que `list_voices`, `list_languages` et `check_health`. Tu peux alors lui dire :

```text
Liste mes voix VoiceStudio, puis génère une narration de 30 secondes pour ma
vidéo de présentation avec celle que je choisis, et donne-moi le chemin du
fichier audio.
```

Deux réglages utiles, côté serveur de l'application :

- `OMNIVOICE_MCP_OUTPUT_MODE=files` fait écrire les fichiers audio sur disque au lieu de les renvoyer dans la conversation. C'est plus léger pour ton agent, qui reçoit un chemin plutôt qu'un gros bloc de données.
- `OMNIVOICE_MCP_BASE_PATH` définit un dossier : c'est la frontière de sécurité pour tout ce qui touche à des fichiers. L'agent ne peut lire et écrire qu'à l'intérieur. Sans lui, les arguments de chemin sont refusés.

Au premier appel de `generate_speech`, le modèle par défaut se télécharge (environ 2,3 Go). Installe-le d'abord depuis l'application pour éviter un délai dépassé.

Le dépôt propose aussi des skills pour agents : `npx skills add debpalash/VoiceStudio`. Il fournit même un prompt pour laisser un agent installer l'application, mais relis la page d'installation qu'il suit avant de l'utiliser, car l'agent lance des commandes sur ta machine.

## Voix, droits et responsabilité

- **Clone une voix uniquement avec l'accord de son propriétaire.** Le projet le dit lui-même. Imiter quelqu'un sans son consentement peut être illégal et causer du tort.
- **Les modèles ont leurs propres licences.** La licence AGPL-3.0 couvre l'application, y compris l'usage commercial selon ses conditions. Les poids des modèles, les voix et les sons générés ont chacun leur licence, que le gestionnaire de modèles affiche pour chaque modèle.
- **Pro et Cloud sont facultatifs.** VoiceStudio Pro est une version payante, fermée, pour le travail commercial sur plusieurs machines. VoiceStudio Cloud, une API hébergée, est annoncé mais n'est pas encore disponible. L'application libre reste gratuite et locale.
- **Le projet évolue vite.** Relis la page d'installation du dépôt avant de mettre à jour, et si tu viens d'une version 0.5.3 ou plus ancienne (l'ancienne application), installe la nouvelle séparément.

Source : [github.com/debpalash/VoiceStudio](https://github.com/debpalash/VoiceStudio)
