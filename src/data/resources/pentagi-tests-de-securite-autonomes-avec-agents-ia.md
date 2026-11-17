## À quoi ça sert

PentAGI, publié par VXControl (licence MIT), est une plateforme libre, à héberger chez toi, pour faire des tests d'intrusion avec des agents IA. Tu décris une cible et un objectif en langage normal. Une équipe d'agents spécialisés planifie le travail, lance plus de 20 outils professionnels (nmap, Metasploit, sqlmap et d'autres) dans un bac à sable Docker isolé, garde en mémoire ce qu'elle a appris, et te remet un rapport.

Ce qui le distingue : tu choisis le modèle d'IA. Il fonctionne avec plus de dix fournisseurs (OpenAI, Anthropic, Gemini, AWS Bedrock, DeepSeek, Mistral, xAI et d'autres), avec n'importe quelle passerelle compatible OpenAI, ou avec des modèles locaux (Ollama, vLLM). Les commandes et les résultats sont conservés dans une base PostgreSQL, et il existe des API REST et GraphQL pour l'automatiser.

## La règle d'abord : seulement ce qui t'appartient

PentAGI est fait pour les tests de sécurité **autorisés**. Teste uniquement des systèmes qui t'appartiennent, ou pour lesquels tu as une autorisation explicite, de préférence écrite, avec un périmètre précis. Le projet le répète dans ses conditions d'utilisation. Un scan ou une attaque sur un système qui n'est pas le tien est illégal presque partout, même « pour voir ».

Pour un freelance, les cas d'usage corrects sont par exemple : tester l'application que tu viens de développer, sur un environnement de test, avant la mise en production, ou auditer le site d'un client qui t'y autorise par écrit.

## Ce qu'il te faut

- Docker et Docker Compose (Podman fonctionne aussi).
- Au minimum 2 vCPU, 4 Go de mémoire et 20 Go d'espace disque.
- Une clé d'au moins un fournisseur de modèle (OpenAI, Anthropic, Gemini, AWS Bedrock), ou Ollama pour un modèle local sans coût d'appel.
- Les clés de moteurs de recherche (Tavily, Perplexity, DuckDuckGo, SearXNG et d'autres) sont facultatives mais conseillées pour de meilleurs résultats.

## 1. Installer

La voie recommandée est l'installateur interactif, disponible pour Linux, macOS et Windows. Il vérifie le système, crée le fichier `.env`, configure les fournisseurs et génère des identifiants sécurisés. Exemple sous Linux 64 bits :

```bash
mkdir -p pentagi && cd pentagi
wget -O installer.zip https://pentagi.com/downloads/linux/amd64/installer-latest.zip
unzip installer.zip
sudo ./installer
```

Télécharge l'installateur uniquement depuis les liens officiels du dépôt, et choisis l'archive qui correspond à ton processeur. Sur Mac, le système peut signaler le fichier : le projet explique de ne le poursuivre qu'après avoir vérifié la source. Lancer un programme téléchargé avec `sudo` est un acte de confiance : lis la documentation du dépôt avant.

L'installateur a besoin d'accéder à l'API Docker. Le projet recommande de le lancer en root pour la production. Ajouter ton utilisateur au groupe `docker` revient à lui donner des droits équivalents à root : à réserver aux environnements de développement contrôlés.

**Installation manuelle.** Récupère le fichier d'exemple de configuration et le fichier Compose :

```bash
curl -o .env https://raw.githubusercontent.com/vxcontrol/pentagi/master/.env.example
curl -O https://raw.githubusercontent.com/vxcontrol/pentagi/master/docker-compose.yml
```

Mets ensuite dans `.env` au moins une clé de fournisseur de modèle. **Ce n'est pas suffisant seul.** PentAGI utilise aussi des *embeddings* (des représentations numériques du texte) pour sa mémoire et sa recherche, et ils se règlent à part. Le fournisseur par défaut est OpenAI : si tu n'utilises pas OpenAI, ajoute aussi `EMBEDDING_PROVIDER` (au choix : `openai`, `ollama`, `mistral`, `jina`, `huggingface`, `googleai` ou `voyageai`), `EMBEDDING_MODEL`, et si besoin `EMBEDDING_URL` et `EMBEDDING_KEY`. Puis lance la pile :

```bash
docker compose up -d
```

La documentation du dépôt détaille d'autres fichiers à préparer avant ce lancement : suis son guide d'installation pour une mise en route complète.

## 2. Premier démarrage : change le mot de passe

L'interface est sur `https://localhost:8443`. Une installation neuve crée un compte administrateur par défaut : `admin@pentagi.com` avec le mot de passe `admin`. **Change ce mot de passe dès la première connexion**, et n'expose jamais l'application sur Internet avant. Remplace aussi `COOKIE_SIGNING_SALT` par une valeur aléatoire, et définis `PUBLIC_URL` si tu y accèdes par une adresse publique.

## 3. Lancer un premier test

1. Ouvre **Flows**, puis **New Flow**.
2. Choisis le mode : **Automation** (l'agent mène le test de bout en bout) ou **Assistant** (tu guides pas à pas).
3. Choisis le fournisseur de modèle.
4. Décris la cible et l'objectif.

Un bon premier prompt donne la cible, le type d'évaluation, le périmètre à ne pas dépasser et le résultat attendu :

```text
Évalue https://staging.exemple.com, mon environnement de test, pour les
vulnérabilités web courantes. Concentre-toi sur l'authentification, la gestion
des fichiers et les injections. Reste strictement sur cette cible et résume
seulement les failles confirmées, avec les étapes pour les reproduire.
```

Pendant l'exécution, tu suis les messages, les tâches et la sortie du terminal. Le menu **Report** permet d'ouvrir le rapport dans l'interface, de le copier, ou de le télécharger en Markdown ou en PDF. La vue **Assistant** sert à rediriger un test en cours : vérifier l'état, arrêter la tâche, ajouter une consigne.

## 4. Sécuriser l'installation

- **Isole les exécutions.** Pour la production, le projet recommande une architecture à deux machines : les conteneurs de travail tournent sur un serveur séparé, pour que du code non fiable ne s'exécute pas sur ta machine principale.
- **Ne donne pas le socket Docker de ta machine à l'agent.** Le projet le déconseille : l'agent pourrait lancer un conteneur privilégié, monter le disque de la machine et la compromettre, PentAGI compris. Il propose à la place un démon Docker durci, joint en TLS.
- **Protège les jetons d'API.** Ne les mets jamais dans le dépôt de code, renouvelle-les et révoque ceux dont tu ne te sers plus.

## Limites et précautions

- **Un agent autonome se trompe.** Il peut rater une faille, en signaler une qui n'existe pas, ou enchaîner des actions inutiles. Vérifie chaque faille à la main avant de l'inscrire dans un rapport.
- **Ne le lance pas sur la production sans prévenir.** Des scans et des tentatives d'exploitation peuvent ralentir ou casser un service. Préfère un environnement de test identique à la production.
- **Tes données peuvent quitter ta machine.** Avec un modèle en ligne, ce que l'agent lit et produit est traité par le fournisseur. Choisir un modèle local (Ollama, vLLM) pour la conversation ne suffit pas à tout garder chez toi : les embeddings utilisent OpenAI par défaut, et les moteurs de recherche activés reçoivent des requêtes depuis Internet. Pour une cible sensible, configure aussi des embeddings locaux (par exemple avec Ollama), n'active que les moteurs de recherche dont tu as besoin, et restreins la sortie réseau des conteneurs, comme le recommande le projet.
- **Ce n'est pas un simulateur d'attaques scriptées.** Le projet précise lui-même que PentAGI n'est pas une plateforme de simulation d'adversaire avec des campagnes prédéfinies.
- **Une offre payante existe.** PentAGI Enterprise ajoute des profils d'agents, des plugins, des rapports pour clients et une vue de la chaîne d'attaque. La version libre décrite ici reste gratuite.

Source : [github.com/vxcontrol/pentagi](https://github.com/vxcontrol/pentagi)
