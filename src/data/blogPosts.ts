import vibeCodingArticleMarkdown from "@/data/articles/vibe-coding-et-claude-code-en-2026.md?raw";
import apprendreDjangoGuideCompletMarkdown from "@/data/articles/apprendre-django-guide-complet.md?raw";
import dockerComposeArticleMarkdown from "@/data/articles/docker-compose-orchestration-conteneurs.md?raw";

export interface BlogPost {
  slug: string;
  title: string;
  coverImage: string;
  coverAlt: string;
  category: string;
  readingTime: string;
  date: string;
  excerpt: string;
  intro: string;
  contentMarkdown?: string;
  sections: Array<{
    heading: string;
    paragraphs: string[];
    bullets?: string[];
    codeBlocks?: string[];
  }>;
}

const avatarCover = "/logo_profile/Sans_titre-removebg-preview.png";
const avatarAlt = "Photo de profil anime de Zoubeir";

export const blogPosts: BlogPost[] = [
  {
    slug: "apprendre-django-guide-complet-developpeur",
    title: "Apprendre Django : DJANGO Guide Complet du Developpeur",
    coverImage: avatarCover,
    coverAlt: avatarAlt,
    category: "python",
    readingTime: "45 minutes",
    date: "Avril 2026",
    excerpt:
      "Un guide structure de A a Z pour apprendre Django: architecture MTV, ORM, admin, templates, formulaires, authentification, DRF, deploiement, securite et performance.",
    intro:
      "Ce guide complet Django suit un parcours progressif et pratique: des fondations jusqu'a la production, avec les concepts essentiels, les commandes utiles et les patterns professionnels.",
    contentMarkdown: apprendreDjangoGuideCompletMarkdown,
    sections: [],
  },
  {
    slug: "docker-compose-orchestration-conteneurs",
    title: "Docker Compose : DOCKER COMPOSE Architecture et Concepts",
    coverImage: avatarCover,
    coverAlt: avatarAlt,
    category: "devops",
    readingTime: "50 minutes",
    date: "Avril 2026",
    excerpt:
      "Guide technique complet de Docker Compose: architecture, configuration YAML, orchestration multi-services, gestion des reseaux et volumes, bonnes pratiques et deploiement production.",
    intro:
      "Docker Compose revolutionne la gestion d'applications multi-conteneurs. Ce guide couvre tous les aspects: du workflow de base aux cas avances, securite, monitoring et troubleshooting.",
    contentMarkdown: dockerComposeArticleMarkdown,
    sections: [],
  },
  {
    slug: "git-github-workflow-propre-2026",
    title: "Git & GitHub en 2026 : workflow propre pour travailler seul et en équipe",
    coverImage: avatarCover,
    coverAlt: avatarAlt,
    category: "outils",
    readingTime: "35 minutes",
    date: "Avril 2026",
    excerpt:
      "Guide complet pour installer Git, configurer GitHub avec SSH, comprendre les concepts de base, adopter un workflow clair même en solo, et collaborer en équipe via branches et pull requests.",
    intro:
      "Tu as peut-être déjà entendu parler de Git sans vraiment comprendre ce que ça fait concrètement. Ici, on part de zéro et on avance pas à pas jusqu'au workflow propre en solo et en équipe.",
    sections: [
      {
        heading: "1. Les bases qui changent tout",
        paragraphs: [
          "Git enregistre l'historique de ton code et te permet de revenir en arrière à tout moment.",
          "GitHub ajoute la collaboration: branches distantes, pull requests, revue de code et partage d'un dépôt commun.",
        ],
      },
      {
        heading: "2. Installation et configuration",
        paragraphs: [
          "Installe Git, configure ton identité, puis active SSH pour éviter les frictions de connexion.",
        ],
        codeBlocks: [
          `git --version
      git config --global user.name "Ton Nom"
      git config --global user.email "ton.email@example.com"
      ssh-keygen -t ed25519 -C "ton.email@example.com"
      ssh -T git@github.com`,
        ],
      },
      {
        heading: "3. Workflow quotidien",
        paragraphs: [
          "Travaille toujours dans une branche dédiée, pousse, ouvre une PR, relis le diff, puis merge dans main.",
        ],
        codeBlocks: [
          `git switch -c feat/ma-fonctionnalite
      git add .
      git commit -m "feat: ma fonctionnalite"
      git push origin feat/ma-fonctionnalite`,
        ],
      },
    ],
  },
  {
    slug: "python-bonnes-pratiques-code-maintenable-2026",
    title: "Python : bases solides et bonnes pratiques pour un code maintenable",
    coverImage: avatarCover,
    coverAlt: avatarAlt,
    category: "python",
    readingTime: "40 minutes",
    date: "Avril 2026",
    excerpt:
      "Guide complet pour écrire du Python propre dès le départ : venv, structure de projet, typage, tests avec pytest et outils de qualité.",
    intro:
      "Python est simple à démarrer, mais facile à rendre illisible si on ne pose pas une structure claire. Ici, tu poses les fondations pro dès le début.",
    sections: [
      {
        heading: "1. Le problème du script unique",
        paragraphs: [
          "Un seul fichier de centaines de lignes finit vite ingérable.",
          "Le but est de créer un code relisible, testable, et réutilisable.",
        ],
      },
      {
        heading: "2. Fondations de qualité",
        bullets: [
          "Noms explicites",
          "Une fonction = une responsabilité",
          "Types et docstrings",
          "Tests automatisés",
        ],
        paragraphs: [
          "Ces quatre règles éliminent une grande partie des bugs de maintenance.",
        ],
      },
      {
        heading: "3. Setup minimal pro",
        codeBlocks: [
          `python3 -m venv venv
      source venv/bin/activate
      pip install pytest black flake8 mypy
      pytest -v`,
        ],
        paragraphs: [
          "Ensuite, structure le projet avec src/ et tests/ pour séparer clairement logique métier et validation.",
        ],
      },
    ],
  },
  {
    slug: "agents-ia-claude-code-openclaw-tendances-2026",
    title: "Tendances 2026 : Claude Code, OpenClaw et le paysage des agents IA de code",
    coverImage: avatarCover,
    coverAlt: avatarAlt,
    category: "ai",
    readingTime: "30 minutes",
    date: "Avril 2026",
    excerpt:
      "Tour d'horizon complet des agents IA de code en 2026 : fonctionnement, différences concrètes, et intégration intelligente dans ton workflow.",
    intro:
      "En 2026, les agents IA de code sont partout. L'important n'est pas de les idolâtrer, mais de les utiliser avec méthode pour rester le pilote.",
    sections: [
      {
        heading: "1. Ce que résolvent vraiment les agents",
        paragraphs: [
          "Ils réduisent le cycle recherche-copie-debug en proposant du code directement dans le contexte du projet.",
          "Mais ils ne remplacent pas le raisonnement du développeur.",
        ],
      },
      {
        heading: "2. Différences des outils en 2026",
        paragraphs: [
          "Claude Code est fort en compréhension contextuelle et refactoring.",
          "Cursor est excellent en flux IDE quotidien. OpenClaw est puissant pour des workflows multi-agents plus complexes.",
        ],
      },
      {
        heading: "3. Règle d'or",
        paragraphs: [
          "Lis le diff, teste, puis commit. Pas l'inverse.",
          "Tu dois pouvoir expliquer le code généré avant de l'accepter.",
        ],
      },
    ],
  },
  {
    slug: "vibe-coding-et-claude-code-en-2026",
    title: "Vibe coding et Claude Code en 2026 : ce que ça change vraiment pour les devs",
    coverImage: avatarCover,
    coverAlt: avatarAlt,
    category: "ai",
    readingTime: "25 minutes",
    date: "Avril 2026",
    excerpt:
      "Comprendre le vibe coding sans tomber dans ses pièges : ce que c'est vraiment, pourquoi c'est dangereux mal utilisé, et comment transformer cette tendance en levier de productivité sans perdre le contrôle de ton code.",
    intro:
      "En 2026, le vibe coding fait autant parler de lui que le fait de ne pas l'utiliser. Certains développeurs génèrent des apps entières en quelques minutes. D'autres se retrouvent avec un projet de 3000 lignes qu'ils ne comprennent plus. Dans ce guide, tu vas comprendre ce qui se passe vraiment quand tu 'vibes', pourquoi c'est un outil puissant entre de bonnes mains, et dangereux entre de mauvaises.",
    contentMarkdown: vibeCodingArticleMarkdown,
    sections: [],
  },
  {
    slug: "installer-claude-code-guide-2026",
    title: "Installer Claude Code en 2026 : guide complet pas à pas",
    coverImage: avatarCover,
    coverAlt: avatarAlt,
    category: "ai",
    readingTime: "25 minutes",
    date: "Avril 2026",
    excerpt:
      "Guide complet pour installer Claude Code via npm, choisir entre abonnement Claude.ai et clé API, lancer ta première commande et résoudre les erreurs courantes sur macOS, Linux et Windows.",
    intro:
      "Claude Code s'installe en une commande npm. Mais deux choses bloquent souvent : Node.js mal configuré, et la confusion entre clé API payante et abonnement Claude.ai. Les deux options existent. Voici comment choisir et partir sans friction.",
    sections: [
      {
        heading: "1. Ce qu'est Claude Code concrètement",
        paragraphs: [
          "Claude Code est un agent IA de code qui tourne dans ton terminal. Il lit les fichiers du projet, comprend le contexte, propose des modifications ciblées, et te laisse valider ou refuser chaque action.",
          "Contrairement à Copilot qui complète ligne par ligne dans l'IDE, Claude Code travaille sur des tâches entières : refactoring, ajout de fonctionnalité, débogage, génération de tests. Tu gardes le contrôle via le diff.",
          "Il a besoin de deux choses : Node.js pour s'installer, et un accès au modèle Claude (via abonnement ou clé API). C'est ce deuxième point qui est souvent mal expliqué.",
        ],
        codeBlocks: [
          `# Exemple concret d'utilisation
cd mon-projet
claude "Dans views.py, ajoute une vue liste paginée pour Product"
# Claude lit le projet, propose la modification, tu valides`,
        ],
      },
      {
        heading: "2. Deux options d'authentification — laquelle choisir ?",
        paragraphs: [
          "C'est le point le plus mal documenté. Il y a deux façons d'utiliser Claude Code, et tu n'as pas forcément besoin d'une clé API payante.",
          "Option 1 — Abonnement Claude.ai : Si tu as déjà un abonnement Claude Pro ($20/mois), Max x5 ($100/mois) ou Max x20 ($200/mois), tu peux utiliser Claude Code directement inclus dans ton abonnement. Pas de frais supplémentaires. Tu te connectes simplement via OAuth dans le terminal. C'est la route recommandée si tu utilises déjà Claude au quotidien.",
          "Option 2 — Clé API Anthropic : Pour les devs qui veulent un accès programmatique ou une facturation à l'usage (pay-per-token). Tu crées une clé sur console.anthropic.com et tu l'exportes dans ton shell. Utile pour des scripts automatisés ou des projets d'équipe.",
          "Résumé : abonnement Pro ou Max = auth OAuth, aucune clé API nécessaire. Pas d'abonnement = clé API pay-per-use.",
        ],
        bullets: [
          "Claude Pro ($20/mois) — Claude Code inclus, usage modéré",
          "Claude Max x5 ($100/mois) — 5x plus d'usage que Pro, pour usage régulier",
          "Claude Max x20 ($200/mois) — 20x plus d'usage que Pro, pour usage intensif",
          "Clé API Anthropic — pay-per-token, sans abonnement mensuel fixe",
        ],
      },
      {
        heading: "3. Prérequis : Node.js",
        paragraphs: [
          "Claude Code nécessite Node.js 18 minimum. Node 20 LTS est recommandé. Vérifie ta version avant tout.",
        ],
        codeBlocks: [
          `node --version   # doit afficher v18.x.x ou plus
npm --version    # doit afficher 9.x ou plus

# Si Node est absent ou trop ancien :
# macOS    : brew install node
# Linux    : sudo apt install nodejs npm
# Windows  : télécharger sur nodejs.org`,
        ],
      },
      {
        heading: "4. Installation de Claude Code",
        paragraphs: [
          "Une seule commande npm pour installer Claude Code globalement.",
        ],
        codeBlocks: [
          `npm install -g @anthropic/claude-code
claude --version   # vérifie que l'installation a réussi`,
        ],
      },
      {
        heading: "5. Authentification via abonnement Claude.ai (recommandé)",
        paragraphs: [
          "Si tu as un abonnement Claude Pro, Max x5 ou Max x20, lance simplement claude dans un projet. Au premier lancement, Claude Code propose de se connecter via ton compte Claude.ai. Un navigateur s'ouvre, tu te connectes, le token est sauvegardé localement. C'est tout.",
          "Aucune clé API à créer, aucune variable d'environnement à configurer.",
        ],
        codeBlocks: [
          `cd mon-projet
claude
# Premier lancement : Claude Code propose l'auth via Claude.ai
# Un navigateur s'ouvre -> connecte-toi avec ton compte
# Token sauvegardé localement, tu n'as plus à te reconnecter`,
        ],
      },
      {
        heading: "6. Authentification via clé API (alternative sans abonnement)",
        paragraphs: [
          "Si tu n'as pas d'abonnement et préfères un accès pay-per-use, crée une clé sur console.anthropic.com puis configure-la dans ton shell.",
          "Ne colle jamais ta clé directement dans le code ou dans un fichier versionné.",
        ],
        codeBlocks: [
          `# Dans ~/.zshrc ou ~/.bashrc
export ANTHROPIC_API_KEY="sk-ant-api03-..."

# Recharge le shell
source ~/.zshrc

# Vérifie que la variable est chargée
echo $ANTHROPIC_API_KEY`,
        ],
      },
      {
        heading: "7. Premier test complet",
        paragraphs: [
          "Crée un fichier simple et demande une modification précise. Lis toujours le diff avant d'accepter.",
        ],
        codeBlocks: [
          `mkdir test-claude && cd test-claude
echo 'def add(a, b): return a + b' > calc.py

claude "Ajoute les fonctions multiply et divide avec gestion de la division par zéro"

# Claude affiche le diff proposé -> tu valides ou refuses
cat calc.py   # vérifie le résultat`,
        ],
      },
      {
        heading: "8. Erreurs fréquentes et solutions",
        bullets: [
          "command not found: claude — npm global n'est pas dans le PATH. Ajoute $(npm prefix -g)/bin à ton PATH dans ~/.zshrc.",
          "401 Unauthorized — clé API invalide ou ANTHROPIC_API_KEY non chargée. Recharge ton shell avec source ~/.zshrc.",
          "EACCES permission denied — problème de permissions npm global. Utilise nvm ou corrige les droits du dossier npm global.",
          "Unsupported engine — Node.js trop ancien. Met à jour vers Node 20 LTS.",
          "insufficient_quota — crédit API épuisé sur console.anthropic.com. Recharge ou passe à l'abonnement.",
          "Auth OAuth bloquée — vérifie que ton abonnement est actif sur claude.ai et que tu utilises le bon compte.",
        ],
        paragraphs: [
          "Si tu utilises l'abonnement, les erreurs 401 et quota disparaissent. Le PATH npm reste le bug le plus courant sur macOS.",
        ],
      },
      {
        heading: "9. Sécurité",
        paragraphs: [
          "Si tu utilises une clé API : ne la mets jamais dans le code, dans un .env commité, ni dans une PR.",
          "Avant d'accepter chaque modification proposée par Claude : lis le diff, lance les tests, puis commit.",
        ],
        codeBlocks: [
          `# Vérifie que la clé n'est pas dans le code source
grep -r "sk-ant-" src/

# Vérifie que .env est bien ignoré
grep ".env" .gitignore

# Lis toujours le diff avant de commiter
git diff`,
        ],
      },
      {
        heading: "Conclusion",
        paragraphs: [
          "Si tu as déjà Claude Pro ou Max : Node.js + npm install + auth OAuth au premier lancement. C'est tout.",
          "Si tu veux la clé API pay-per-use : Node.js + npm install + ANTHROPIC_API_KEY dans ton shell.",
          "Une fois en place, le rituel est le même : prompt précis, lecture du diff, test, commit.",
        ],
      },
    ],
  },
];
