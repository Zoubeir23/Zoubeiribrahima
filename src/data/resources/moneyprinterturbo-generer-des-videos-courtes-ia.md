## À quoi ça sert

Tu donnes un sujet ou un mot-clé, et MoneyPrinterTurbo (publié par harry0703, licence MIT) fait le reste : il écrit le script avec une IA, choisit des images et des vidéos libres, ajoute une voix, des sous-titres et une musique, puis assemble une vidéo courte en haute définition. Il exporte en portrait 9:16 (1080 x 1920), en paysage 16:9 (1920 x 1080) ou en carré 1:1.

Ce que tu peux régler :

- **Le script** : généré par un modèle de ton choix (OpenAI, Claude, Gemini, DeepSeek, Ollama en local et d'autres), ou le tien, que tu colles tel quel.
- **Les images** : bibliothèques gratuites Pexels et Pixabay, ou tes propres fichiers.
- **La voix** : Edge TTS est gratuit et ne demande aucune clé. D'autres services de voix existent.
- **Les sous-titres** : générés à partir de la voix, ou par transcription locale avec Whisper, avec police, position et couleur réglables.

Un point d'honnêteté : malgré son nom, l'outil ne promet aucun revenu. Il fabrique des vidéos, rien de plus. Ce que tu en fais, et si ça plaît aux gens, dépend de la qualité de ton sujet.

## Choisis ton installation

| Ta situation | Le chemin le plus simple |
|---|---|
| Tu as Python | Le paquet `mpt` avec pip |
| Tu es sur Windows | Le paquet tout prêt de la page Releases |
| Tu veux isoler l'outil | Docker |
| Tu ne veux rien installer à la main | Un agent IA (voir plus bas, avec précautions) |

Le matériel demandé est modeste : 4 coeurs et 4 Go de mémoire au minimum, 8 Go conseillés. Une carte graphique n'est pas obligatoire, elle accélère seulement la transcription locale et les générations en série. Il faut Python 3.11 ou plus.

## 1. Installer avec pip

Le paquet officiel s'appelle `mpt`. Attention : le paquet nommé `MoneyPrinterTurbo` sur PyPI est maintenu par quelqu'un d'autre, ne l'installe pas.

Dans ton terminal, crée un environnement virtuel (macOS et Linux) :

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Puis installe et lance l'interface :

```bash
python -m pip install mpt
mpt webui
```

L'interface s'ouvre dans ton navigateur. Au premier lancement, l'outil crée un fichier `config.toml` : ajoute-y, depuis les réglages de base de l'interface, les clés des services en ligne que tu veux utiliser (modèle de langage, images, voix). Pour choisir un port sans ouvrir de navigateur, ajoute `--port 8503 --headless`. Pour mettre à jour :

```bash
python -m pip install --upgrade mpt
```

Les vidéos créées se trouvent dans le dossier `storage/tasks` du répertoire de données (sur Mac : `~/Library/Application Support/MoneyPrinterTurbo`).

## 2. Sous Windows

Télécharge l'archive `.7z` dans la section Assets de la dernière version sur la page Releases du dépôt. N'utilise pas les archives « Source code » : elles ne contiennent pas les scripts `start.bat` et `update.bat`. Double-clique d'abord sur `update.bat` pour mettre à jour, puis sur `start.bat`. Si la page s'ouvre vide, utilise Chrome ou Edge.

## 3. Avec Docker

Copie d'abord le fichier de configuration, puis lance l'image toute prête :

```bash
git clone https://github.com/harry0703/MoneyPrinterTurbo.git
cd MoneyPrinterTurbo
cp config.example.toml config.toml
docker compose -f docker-compose.release.yml up
```

L'interface est alors sur `http://127.0.0.1:8501`, et la documentation de l'API sur `http://127.0.0.1:8080/docs`.

## 4. Sans navigateur, en ligne de commande

Depuis le dossier du projet cloné, avec l'outil `uv` :

```bash
uv sync --frozen
uv run python cli.py --video-subject "Comment l'IA change le quotidien"
```

Pour fabriquer plusieurs vidéos d'affilée, écris un fichier JSON avec un sujet par entrée (100 vidéos au maximum) :

```json
[
  { "video_subject": "Comment fonctionnent les panneaux solaires" },
  { "video_subject": "Comment fonctionnent les éoliennes", "video_aspect": "16:9" }
]
```

```bash
uv run python cli.py --batch-file ./tasks.json --stop-at video
```

La commande affiche un résumé à la fin et continue même si une vidéo échoue.

## 5. Le confier à un agent (avec précautions)

Le dépôt fournit un fichier « Skill » pour qu'un agent comme Claude Code installe l'outil et génère la vidéo à ta place. Avant de l'utiliser, sache ce qu'il fait : il demande à l'agent de ne **pas** te demander de confirmation avant d'installer, de lancer des commandes (y compris le script d'installation de `uv` téléchargé sur Internet) et de te réclamer tes clés d'API. Sans consigne contraire, il produit aussi une vidéo en **chinois**.

Fais donc relire le fichier avant de le lancer :

```text
Lis https://raw.githubusercontent.com/harry0703/MoneyPrinterTurbo/main/docs/skill/SKILL.md
et le script mpt_agent.py qui l'accompagne. Liste les commandes qu'ils lancent,
les fichiers qu'ils créent ou modifient, les adresses qu'ils contactent et les
clés qu'ils demandent. Ne lance rien. Dis-moi si quelque chose te paraît risqué.
```

Quand tu es satisfait, précise la langue et le format :

```text
Utilise ce Skill : https://raw.githubusercontent.com/harry0703/MoneyPrinterTurbo/main/docs/skill/SKILL.md
Crée une vidéo en français, format portrait 9:16, sur le sujet "Comment l'IA
change le quotidien". Demande-moi confirmation avant toute installation.
```

Garde tes clés d'API pour toi : donne-les par variable d'environnement, pas dans une conversation partagée.

## Avant de publier une vidéo

- **La musique.** Le projet embarque quelques musiques prises sur YouTube, et son auteur indique de les supprimer en cas de problème de droits. Utilise la tienne ou une musique libre de droits que tu as vérifiée.
- **Les images.** Pexels et Pixabay ont chacune leurs conditions d'utilisation : lis-les, surtout pour un usage commercial.
- **Les plateformes.** L'outil sait publier directement sur TikTok, Instagram et YouTube Shorts. Les règles de ces plateformes sur les contenus produits par IA et sur les publications en masse changent : relis-les avant d'automatiser quoi que ce soit.
- **Relis le script.** Un modèle peut inventer des faits. Une vidéo avec une voix posée et de belles images paraît fiable, même quand elle ne l'est pas.

Source : [github.com/harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo)
