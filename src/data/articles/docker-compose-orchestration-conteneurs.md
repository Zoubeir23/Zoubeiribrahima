# DOCKER COMPOSE
## Architecture et Concepts
### Guide Technique Complet

"L'orchestration de conteneurs simplifie le deploiement d'applications complexes"

"Chaque expert a un jour ete debutant. Code une ligne, apprends une chose, et repete - c'est ainsi que naissent les developpeurs."

2 juin 2025

## Table des matieres

- Introduction
  - 1.1 Pourquoi Docker Compose?
  - 1.1.1 L'evolution des architectures logicielles
  - 1.1.2 Les defis avant Docker Compose
  - 1.1.3 La revolution Docker Compose
  - 1.2 Pourquoi maitriser Docker Compose aujourd'hui?
  - 1.2.1 Competence incontournable
  - 1.2.2 Avantages concrets au quotidien
  - 1.3 Ce que vous allez apprendre
- Architecture de Docker Compose
  - 2.1 Relation avec Docker
  - 2.1.1 Docker : Les fondations
  - 2.1.2 Workflow Docker Compose detaille
  - 2.2 Architecture Interne
  - 2.2.1 Composants principaux
  - 2.2.2 Cycle de vie d'un projet
  - 2.3 Comparaison : Docker vs Docker Compose
- Structure du fichier docker-compose.yml
  - 3.1 Syntaxe YAML
  - 3.1.1 Structure de base
  - 3.1.2 Versions supportees
  - 3.2 Section Services
  - 3.2.1 Proprietes essentielles
  - 3.2.2 Proprietes avancees
  - 3.3 Section Networks
  - 3.3.1 Reseau par defaut
  - 3.3.2 Reseaux personnalises
  - 3.3.3 Configuration reseau avancee
  - 3.4 Section Volumes
  - 3.4.1 Types de volumes
- Commandes Docker Compose
  - 4.1 Commandes de cycle de vie
  - 4.1.1 docker-compose up
  - 4.1.2 docker-compose down
  - 4.1.3 Gestion individuelle des services
  - 4.2 Commandes d'information
  - 4.2.1 docker-compose ps
  - 4.2.2 docker-compose logs
  - 4.2.3 docker-compose top
  - 4.3 Commandes d'execution
  - 4.3.1 docker-compose exec
  - 4.3.2 docker-compose run
  - 4.4 Commandes de configuration
  - 4.4.1 docker-compose config
  - 4.4.2 docker-compose build
  - 4.4.3 docker-compose pull
- Installation et Configuration
  - 5.1 Installation sur Ubuntu
  - 5.1.1 Prerequis
  - 5.1.2 Installation Docker
  - 5.1.3 Installation Docker Compose
  - 5.2 Installation sur Windows
  - 5.2.1 Docker Desktop
  - 5.3 Configuration post-installation
- Exercices Pratiques
  - 6.1 Exercice 1 : Hello World
  - 6.2 Exercice 2 : Serveur Web
  - 6.3 Exercice 3 : Application Multi-Services
- Gestion des Reseaux
  - 7.1 Reseaux par defaut
  - 7.2 Reseaux personnalises
  - 7.2.1 Isolation multi-tiers
  - 7.2.2 Configuration avancee
  - 7.3 Reseaux externes
- Gestion des Volumes
  - 8.1 Types de volumes
  - 8.1.1 Volumes nommes
  - 8.1.2 Bind mounts
  - 8.1.3 Volumes temporaires (tmpfs)
  - 8.2 Configuration avancee des volumes
  - 8.2.1 Drivers personnalises
  - 8.2.2 Volumes externes
- Variables d'Environnement
  - 9.1 Methodes de definition
  - 9.1.1 Variables directes
  - 9.1.2 Variables depuis l'hote
  - 9.1.3 Fichier .env
  - 9.2 Fichiers env file
- Outils de Gestion
  - 10.1 Docker Desktop
  - 10.2 Portainer
  - 10.3 Outils en ligne de commande
  - 10.3.1 Lazydocker
  - 10.3.2 Docker Compose V2
- Cas d'Usage Avances
  - 11.1 Multi-environnements
  - 11.1.1 Fichiers overlay
  - 11.2 Profiles
  - 11.3 Application Complete
- Bonnes Pratiques
  - 12.1 Securite
  - 12.1.1 Principes de base
  - 12.1.2 Configuration securisee
  - 12.2 Performance
  - 12.2.1 Optimisation des images
  - 12.2.2 Limites de ressources
  - 12.3 Maintenance
  - 12.3.1 Health checks
  - 12.3.2 Logging
- Debogage et Troubleshooting
  - 13.1 Problemes courants
  - 13.1.1 Port deja utilise
  - 13.1.2 Services qui ne communiquent pas
  - 13.1.3 Volumes qui ne persistent pas
  - 13.2 Commandes de diagnostic
- Exemples Complets
  - 14.1 Stack LAMP
  - 14.2 Stack MEAN
- Conclusion
  - 15.1 Recapitulatif
  - 15.2 Conseils finaux

---

## Chapitre 1 - Introduction

### 1.1 Pourquoi Docker Compose?

#### 1.1.1 L'evolution des architectures logicielles

Dans le paysage technologique moderne, les applications sont devenues de plus en plus complexes. Fini le temps des applications monolithiques simples! Aujourd'hui, nous construisons des systemes distribues composes de multiples services interconnectes : bases de donnees, APIs, interfaces utilisateur, caches, file d'attente de messages, et bien plus encore.

Cette evolution vers les microservices et les architectures distribuees a apporte de nombreux avantages:

- Scalabilite: Chaque composant peut etre dimensionne independamment
- Maintenabilite: Equipes specialisees sur des services specifiques
- Resilience: Panne d'un service n'affecte pas l'ensemble
- Technologie: Liberte de choisir le meilleur outil pour chaque tache

Mais cette complexite architecturale a aussi introduit de nouveaux defis, particulierement en matiere de developpement et de deploiement.

#### 1.1.2 Les defis avant Docker Compose

Avant l'arrivee de Docker Compose, gerer une application multi-services relevait du parcours du combattant:

Le cauchemar de l'environnement local:

- Installation manuelle de chaque dependance (PostgreSQL, Redis, Elasticsearch...)
- Gestion des conflits de versions entre projets
- Configuration complexe des communications inter-services
- "Ca marche sur ma machine" mais pas ailleurs

Exemple typique d'une application web moderne:

```bash
# Demarrage manuel fastidieux d'une stack complete
sudo service postgresql start
sudo service redis-server start
sudo service elasticsearch start
cd frontend && npm start &
cd backend && python manage.py runserver &
cd worker && celery worker -A myapp &
# ... et ainsi de suite
```

Cette approche etait non seulement chronophage, mais aussi source d'erreurs et d'incoherences entre les environnements de developpement, de test et de production.

#### 1.1.3 La revolution Docker Compose

Docker Compose a revolutionne cette approche en introduisant le concept d'Infrastructure as Code pour les applications multi-conteneurs. Avec un simple fichier YAML, nous pouvons:

- Declarer l'architecture complete de notre application
- Orchestrer le demarrage et l'arret de tous les services
- Reproduire exactement le meme environnement partout
- Simplifier le processus de developpement et de deploiement

Transformation magique:

```bash
# Avant : 15 minutes de configuration manuelle
# Apres : une seule commande
docker-compose up
```

### 1.2 Pourquoi maitriser Docker Compose aujourd'hui?

#### 1.2.1 Competence incontournable

Dans le marche du travail actuel, Docker Compose est devenu une competence fondamentale pour:

Developpeurs:

- Environnements de developpement reproductibles
- Tests d'integration facilites
- Collaboration simplifiee en equipe
- Montee en competence sur l'orchestration

DevOps et Administrateurs systeme:

- Deploiements automatises
- Gestion d'infrastructures complexes
- Monitoring et supervision
- Passerelle vers Kubernetes

Architectes et CTO:

- Conception d'architectures modernes
- Strategies de containerisation
- Optimisation des couts d'infrastructure
- Acceleration du time-to-market

#### 1.2.2 Avantages concrets au quotidien

Gain de temps phenomenal:

- Plus besoin d'installer manuellement les dependances
- Onboarding des nouveaux developpeurs en minutes
- Changement de projet sans pollution de l'environnement

Fiabilite accrue:

- Environnements identiques partout
- Fini les "ca marche chez moi"
- Tests reproductibles et fiables

Evolutivite:

- Ajout facile de nouveaux services
- Experimentation sans risque
- Migration vers des solutions plus avancees (Kubernetes)

### 1.3 Ce que vous allez apprendre

Ce guide vous accompagnera dans une maitrise complete de Docker Compose, de l'initiation aux techniques avancees:

Fondamentaux: Architecture, concepts cles, premiers pas

Pratique: Configuration YAML, commandes essentielles, exercices

Avance: Multi-environnements, reseaux complexes, securite

Production: Bonnes pratiques, monitoring, troubleshooting

A la fin de ce parcours, vous serez capable de concevoir, deployer et maintenir des applications modernes avec Docker Compose, competence precieuse dans l'ecosysteme technologique actuel.

---

## Chapitre 2 - Architecture de Docker Compose

### 2.1 Relation avec Docker

#### 2.1.1 Docker: Les fondations

Docker Compose s'appuie entierement sur Docker Engine. Il ne remplace pas Docker, mais l'orchestre de maniere intelligente. Pour bien comprendre cette relation, imaginons Docker comme un chef cuisinier talentueux, et Docker Compose comme le chef executif qui coordonne toute la brigade.

Hierarchie et responsabilites:

VOS APPLICATIONS -> Docker Compose -> Docker Engine -> Systeme d'Exploitation

- Applications: WordPress, E-commerce, API REST, Applications web
- Docker Compose: Orchestration multi-conteneurs, Gestion des dependances
- Docker Engine: Gestion des conteneurs, Images, Volumes, Reseaux
- Systeme d'Exploitation: Linux, Windows, macOS, Ressources materielles

#### 2.1.2 Workflow Docker Compose detaille

Le processus interne de Docker Compose suit un workflow precis et optimise:

```
docker-compose.yml -> Parser YAML -> Traducteur -> Docker API -> Conteneurs
                   Configuration declarative
                   Validation syntaxe
                   Verification schema
                   Conversion en commandes Docker
                   Execution des commandes
                   Services en fonctionnement
```

Details du processus:

1. Lecture et validation (Parser YAML)
   - Verification de la syntaxe YAML
   - Validation de la version du schema Compose
   - Detection des references circulaires
   - Verification de l'existence des Dockerfiles

2. Resolution des dependances (Traducteur)
   - Analyse des depends_on pour determiner l'ordre
   - Creation automatique des reseaux necessaires
   - Configuration des volumes partages
   - Resolution des variables d'environnement

3. Orchestration (Docker API)
   - Telechargement des images manquantes
   - Creation des conteneurs dans l'ordre optimal
   - Configuration des liaisons reseau
   - Surveillance de l'etat des services

### 2.2 Architecture Interne

#### 2.2.1 Composants principaux

Docker Compose se compose de trois elements fondamentaux:

1. Services: Definition des conteneurs
2. Networks: Communication entre conteneurs
3. Volumes: Stockage et persistance des donnees

#### 2.2.2 Cycle de vie d'un projet

1. Definition: Creation du fichier docker-compose.yml
2. Validation: Parsing et verification de la syntaxe
3. Creation: Generation des ressources Docker
4. Demarrage: Lancement des conteneurs dans l'ordre
5. Monitoring: Supervision de l'etat des services
6. Arret: Suppression propre des ressources

### 2.3 Comparaison: Docker vs Docker Compose

| Aspect | Docker | Docker Compose |
|--------|--------|-----------------|
| Portee | Conteneur unique | Multi-conteneurs |
| Configuration | Ligne de commande | Fichier YAML |
| Reseaux | Manuel | Automatique |
| Volumes | Gestion individuelle | Orchestration globale |
| Dependances | Aucune | Gestion automatique |
| Reproductibilite | Limitee | Complete |

---

## Chapitre 3 - Structure du fichier docker-compose.yml

### 3.1 Syntaxe YAML

#### 3.1.1 Structure de base

```yaml
version: '3.8'

services:
  nom_service:
    propriete: valeur

volumes:
  nom_volume:

networks:
  nom_network:
```

#### 3.1.2 Versions supportees

| Version | Docker Engine | Fonctionnalites cles |
|---------|---------------|----------------------|
| 3.8 | 19.03.0+ | Profiles, init, limites ressources |
| 3.7 | 18.06.0+ | Secrets externes |
| 3.6 | 18.02.0+ | Configs externes |
| 3.5 | 17.12.0+ | Secrets et configs |

Information: Utilisez toujours la version 3.8 pour beneficier des dernieres fonctionnalites.

### 3.2 Section Services

#### 3.2.1 Proprietes essentielles

**image** - Specifie l'image Docker a utiliser

```yaml
services:
  web:
    image: nginx:alpine
  database:
    image: postgres:13
  cache:
    image: redis:latest
```

**build** - Construction d'image personnalisee

```yaml
services:
  app:
    build: .
  custom:
    build:
      context: ./app
      dockerfile: Dockerfile.dev
```

**ports** - Exposition des ports

```yaml
services:
  web:
    ports:
      - "80:80"  # host:container
      - "8080:80"  # port different
      - "3306"  # port aleatoire sur l'hote
```

**volumes** - Montage de stockage

```yaml
services:
  db:
    volumes:
      - db_data:/var/lib/mysql  # volume nomme
      - ./config:/etc/mysql/conf.d:ro  # bind mount
      - /tmp  # volume anonyme
```

**environment** - Variables d'environnement

```yaml
services:
  app:
    environment:
      - NODE_ENV=production
      - DEBUG=false
```

**depends_on** - Dependances entre services

```yaml
services:
  web:
    depends_on:
      - db
      - redis
  db:
    image: postgres:13
```

**restart** - Politique de redemarrage

```yaml
services:
  app:
    restart: no  # Jamais (defaut)
    # OU
    restart: always  # Toujours
    # OU
    restart: on-failure  # En cas d'erreur
    # OU
    restart: unless-stopped  # Sauf arret manuel
```

#### 3.2.2 Proprietes avancees

**networks** - Reseaux personnalises

```yaml
services:
  web:
    networks:
      - frontend
      - backend
```

**healthcheck** - Verification de sante

```yaml
services:
  web:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost"]
      interval: 30s
      timeout: 10s
      retries: 3
```

**deploy** - Configuration de deploiement

```yaml
services:
  web:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
```

### 3.3 Section Networks

#### 3.3.1 Reseau par defaut

Docker Compose cree automatiquement un reseau bridge nomme <projet>_default.

```yaml
version: '3.8'
services:
  web:
    image: nginx
  db:
    image: postgres:13
# Reseau: monprojct_default
```

#### 3.3.2 Reseaux personnalises

```yaml
version: '3.8'

services:
  web:
    networks:
      - frontend
  api:
    networks:
      - frontend
      - backend
  db:
    networks:
      - backend

networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
    internal: true  # Pas d'acces internet
```

#### 3.3.3 Configuration reseau avancee

```yaml
networks:
  custom:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16
    driver_opts:
      com.docker.network.bridge.name: br-custom
```

### 3.4 Section Volumes

#### 3.4.1 Types de volumes

Volumes nommes: Geres par Docker

```yaml
services:
  db:
    volumes:
      - db_data:/var/lib/postgresql/data

volumes:
  db_data:
    driver: local
```

Bind mounts: Liaison directe avec l'hote

```yaml
services:
  web:
    volumes:
      - ./html:/usr/share/nginx/html:ro
      - ./logs:/var/log/nginx:rw
```

Volumes externes: Deja existants

```yaml
volumes:
  existing_volume:
    external: true
    name: my-volume
```

---

## Chapitre 4 - Commandes Docker Compose

### 4.1 Commandes de cycle de vie

#### 4.1.1 docker-compose up

Demarre les services definis dans le fichier compose.

```bash
docker-compose up  # Tous services, foreground
docker-compose up -d  # Tous services, background
docker-compose up web db  # Services specifiques
docker-compose up --scale web=3  # 3 instances du service web
```

#### 4.1.2 docker-compose down

Arrete et supprime les conteneurs, reseaux crees par up.

```bash
docker-compose down  # Arret standard
docker-compose down -v  # + suppression volumes
docker-compose down --rmi all  # + suppression images
```

#### 4.1.3 Gestion individuelle des services

```bash
docker-compose start [service]  # Demarrer services existants
docker-compose stop [service]  # Arreter services
docker-compose restart [service]  # Redemarrer services
docker-compose pause [service]  # Mettre en pause
docker-compose unpause [service]  # Reprendre
```

### 4.2 Commandes d'information

#### 4.2.1 docker-compose ps

```bash
docker-compose ps  # Tous les services
docker-compose ps web  # Service specifique
docker-compose ps --services  # Noms des services seulement
```

#### 4.2.2 docker-compose logs

```bash
docker-compose logs  # Tous les logs
docker-compose logs -f web  # Logs du service web en temps reel
docker-compose logs --tail 50 db  # 50 dernieres lignes de db
```

#### 4.2.3 docker-compose top

```bash
docker-compose top  # Tous les services
docker-compose top web  # Service specifique
```

### 4.3 Commandes d'execution

#### 4.3.1 docker-compose exec

Execute une commande dans un conteneur en cours d'execution.

```bash
docker-compose exec web bash  # Shell interactif
docker-compose exec db psql -U user  # Client PostgreSQL
docker-compose exec web ls -la  # Commande simple
```

#### 4.3.2 docker-compose run

Execute une commande dans un nouveau conteneur.

```bash
docker-compose run web echo "test"  # Commande ponctuelle
docker-compose run --rm web bash  # Shell temporaire
docker-compose run --no-deps web cmd  # Sans demarrer dependances
```

### 4.4 Commandes de configuration

#### 4.4.1 docker-compose config

Valide et affiche la configuration Compose.

```bash
docker-compose config  # Configuration complete
docker-compose config --services  # Liste des services
docker-compose config --volumes  # Liste des volumes
```

#### 4.4.2 docker-compose build

Construit les images definies avec build.

```bash
docker-compose build  # Toutes les images
docker-compose build web  # Image specifique
docker-compose build --no-cache  # Sans cache
```

#### 4.4.3 docker-compose pull

Telecharge les images depuis un registry.

```bash
docker-compose pull  # Toutes les images
docker-compose pull web db  # Images specifiques
```

---

## Chapitre 5 - Installation et Configuration

### 5.1 Installation sur Ubuntu

#### 5.1.1 Prerequis

```bash
lsb_release -a  # Version Ubuntu
uname -r  # Version kernel (3.10+ requis)
```

#### 5.1.2 Installation Docker

```bash
# Mise a jour
sudo apt update

# Dependencies
sudo apt install -y apt-transport-https ca-certificates curl gnupg

# Cle GPG
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Repository
echo "deb [signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] \
https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | \
sudo tee /etc/apt/sources.list.d/docker.list

# Installation
sudo apt update && sudo apt install -y docker-ce

# Configuration utilisateur
sudo usermod -aG docker $USER
newgrp docker
```

#### 5.1.3 Installation Docker Compose

```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" \
-o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verification
docker-compose --version
```

### 5.2 Installation sur Windows

#### 5.2.1 Docker Desktop

1. Telecharger depuis https://docker.com
2. Executer l'installateur
3. Redemarrer le systeme
4. Configurer WSL2 (recommande)

Configuration WSL2:

```powershell
# PowerShell Administrateur
wsl --install
wsl --set-default-version 2
```

### 5.3 Configuration post-installation

```bash
# Variables d'environnement recommandees
export COMPOSE_HTTP_TIMEOUT=300
export DOCKER_CLIENT_TIMEOUT=300

# Ajout au profil shell
echo 'export COMPOSE_HTTP_TIMEOUT=300' >> ~/.bashrc
```

---

## Chapitre 6 - Exercices Pratiques

### 6.1 Exercice 1: Hello World

Objectif: Premier contact avec Docker Compose

```bash
mkdir hello-compose && cd hello-compose
```

docker-compose.yml:

```yaml
version: '3.8'
services:
  hello:
    image: hello-world
```

Execution:

```bash
docker-compose up
docker-compose down
```

### 6.2 Exercice 2: Serveur Web

Objectif: Serveur web avec contenu personnalise

Structure:

```bash
mkdir web-demo && cd web-demo
mkdir html
```

html/index.html:

```html
<!DOCTYPE html>
<html>
<head><title>Docker Compose</title></head>
<body>
<h1>Serveur Web Docker Compose</h1>
<p>Fonctionne parfaitement!</p>
</body>
</html>
```

docker-compose.yml:

```yaml
version: '3.8'
services:
  web:
    image: nginx:alpine
    ports:
      - "8080:80"
    volumes:
      - ./html:/usr/share/nginx/html:ro
```

Test:

```bash
docker-compose up -d
curl http://localhost:8080
docker-compose down
```

### 6.3 Exercice 3: Application Multi-Services

Objectif: Web + Base de donnees + Communication

docker-compose.yml:

```yaml
version: '3.8'

services:
  web:
    image: nginx:alpine
    ports:
      - "8080:80"
    depends_on:
      - db

  db:
    image: postgres:13-alpine
    environment:
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: myapp
    volumes:
      - db_data:/var/lib/postgresql/data

volumes:
  db_data:
```

Tests:

```bash
docker-compose up -d
docker-compose ps
docker-compose exec db psql -U postgres -d myapp
docker-compose exec web ping db
docker-compose down -v
```

---

## Chapitre 7 - Gestion des Reseaux

### 7.1 Reseaux par defaut

Docker Compose cree automatiquement un reseau bridge pour chaque projet.

Nom du reseau: <nom_dossier>_default

```yaml
version: '3.8'
services:
  web:
    image: nginx
  api:
    image: node:alpine
  db:
    image: postgres:13
```

Communication automatique:
- web peut contacter api via http://api:port
- api peut contacter db via postgresql://db:5432

### 7.2 Reseaux personnalises

#### 7.2.1 Isolation multi-tiers

```yaml
version: '3.8'

services:
  frontend:
    image: nginx
    networks:
      - public
    ports:
      - "80:80"

  api:
    image: node:alpine
    networks:
      - public
      - private

  database:
    image: postgres:13
    networks:
      - private

networks:
  public:
    driver: bridge
  private:
    driver: bridge
    internal: true  # Pas d'acces internet
```

#### 7.2.2 Configuration avancee

```yaml
networks:
  custom_net:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16
          gateway: 172.20.0.1
    driver_opts:
      com.docker.network.bridge.name: br-custom
```

### 7.3 Reseaux externes

```bash
# Creer reseau externe
docker network create shared-network
```

```yaml
version: '3.8'
services:
  app:
    image: nginx
    networks:
      - shared

networks:
  shared:
    external: true
    name: shared-network
```

---

## Chapitre 8 - Gestion des Volumes

### 8.1 Types de volumes

#### 8.1.1 Volumes nommes

Geres entierement par Docker.

```yaml
version: '3.8'

services:
  database:
    image: postgres:13
    volumes:
      - db_data:/var/lib/postgresql/data

volumes:
  db_data:
    driver: local
```

Avantages:
- Gestion automatique par Docker
- Persistance apres suppression des conteneurs
- Portabilite entre systemes
- Sauvegarde facilitee

#### 8.1.2 Bind mounts

Liaison directe avec le systeme hote.

```yaml
services:
  web:
    image: nginx
    volumes:
      - ./html:/usr/share/nginx/html:ro  # Lecture seule
      - ./logs:/var/log/nginx:rw  # Lecture-ecriture
```

Options de montage:
- :ro - Lecture seule
- :rw - Lecture-ecriture (defaut)
- :z - SELinux partage
- :Z - SELinux prive

#### 8.1.3 Volumes temporaires (tmpfs)

Stockage en memoire RAM.

```yaml
services:
  app:
    image: node:alpine
    tmpfs:
      - /tmp:size=100M
      - /var/cache:uid=1000
```

### 8.2 Configuration avancee des volumes

#### 8.2.1 Drivers personnalises

```yaml
volumes:
  nfs_storage:
    driver: local
    driver_opts:
      type: nfs
      o: addr=192.168.1.100,rw
      device: ":/path/to/share"
```

#### 8.2.2 Volumes externes

```yaml
volumes:
  existing_volume:
    external: true
    name: my-existing-volume
```

---

## Chapitre 9 - Variables d'Environnement

### 9.1 Methodes de definition

#### 9.1.1 Variables directes

```yaml
services:
  app:
    image: node:alpine
    environment:
      - NODE_ENV=production
      - PORT=3000
```

#### 9.1.2 Variables depuis l'hote

```yaml
services:
  app:
    environment:
      - NODE_ENV=${NODE_ENV:-development}  # Valeur par defaut
      - DB_PASSWORD=${DB_PASSWORD}  # Variable obligatoire
```

#### 9.1.3 Fichier .env

Creer un fichier .env dans le meme dossier:

```
NODE_ENV=production
DB_PASSWORD=secret123
API_KEY=abc123
```

```yaml
services:
  app:
    environment:
      - NODE_ENV=${NODE_ENV}
      - DB_PASSWORD=${DB_PASSWORD}
```

### 9.2 Fichiers env file

```yaml
services:
  app:
    env_file:
      - ./config/common.env
      - ./config/app.env
```

Priorite des variables (du plus eleve au plus bas):
1. Variables dans environment
2. Variables shell de l'hote
3. Variables dans env_file
4. Variables dans .env

---

## Chapitre 10 - Outils de Gestion

### 10.1 Docker Desktop

Interface graphique officielle pour Windows et macOS.

Fonctionnalites principales:
- Vue d'ensemble des conteneurs
- Gestion des images et volumes
- Logs en temps reel
- Terminal integre
- Extensions (Portainer, etc.)

### 10.2 Portainer

Interface web pour la gestion de Docker.

Installation rapide:

```yaml
version: '3.8'
services:
  portainer:
    image: portainer/portainer-ce:latest
    ports:
      - "9000:9000"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - portainer_data:/data

volumes:
  portainer_data:
```

### 10.3 Outils en ligne de commande

#### 10.3.1 Lazydocker

Interface TUI interactive pour Docker.

Installation Lazydocker:

```bash
curl https://raw.githubusercontent.com/jesseduffield/lazydocker/master/scripts/install_update_linux.sh | bash

# Utilisation
lazydocker
```

#### 10.3.2 Docker Compose V2

Nouvelle version integree a Docker CLI.

```bash
# Installation (incluse avec Docker Desktop)
sudo apt install docker-compose-plugin

# Utilisation
docker compose up  # Sans tiret
docker compose down
```

---

## Chapitre 11 - Cas d'Usage Avances

### 11.1 Multi-environnements

#### 11.1.1 Fichiers overlay

Structure:

```text
project/
| - docker-compose.yml  # Configuration de base
| - docker-compose.dev.yml  # Override development
| - docker-compose.prod.yml  # Override production
| - .env
```

docker-compose.yml (base):

```yaml
version: '3.8'
services:
  web:
    image: nginx:alpine
    volumes:
      - ./html:/usr/share/nginx/html
  db:
    image: postgres:13
    environment:
      POSTGRES_PASSWORD: ${DB_PASSWORD}
```

docker-compose.dev.yml:

```yaml
version: '3.8'
services:
  web:
    ports:
      - "8080:80"
  db:
    ports:
      - "5432:5432"  # Exposer pour debug
```

docker-compose.prod.yml:

```yaml
version: '3.8'
services:
  web:
    ports:
      - "80:80"
  deploy:
    resources:
      limits:
        memory: 512M
```

Utilisation:

```bash
# Development
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# Production
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### 11.2 Profiles

Controle conditionnel des services (Docker Compose 1.28+).

```yaml
version: '3.8'

services:
  web:
    image: nginx
    # Demarre par defaut

  api:
    image: node:alpine
    profiles: ["api"]

  debug:
    image: alpine
    profiles: ["debug"]
    command: sleep infinity

  monitoring:
    image: prometheus
    profiles: ["monitoring", "full"]
```

Utilisation:

```bash
docker-compose up  # Seulement web
docker-compose --profile api up  # web + api
docker-compose --profile full up  # web + api + monitoring
```

### 11.3 Application Complete

Architecture multi-services:
- Nginx (Reverse Proxy)
- Frontend (React/Vue)
- API (Node.js/Python)
- Base de donnees (PostgreSQL)
- Cache (Redis)

Structure de projet:

```text
webapp/
| - docker-compose.yml
| - nginx/
| | - nginx.conf
| - frontend/
| | - Dockerfile
| - api/
| | - Dockerfile
| - .env
```

docker-compose.yml complet:

```yaml
version: '3.8'

services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - frontend
      - api

  frontend:
    build: ./frontend
    volumes:
      - frontend_dist:/app/dist

  api:
    build: ./api
    environment:
      - DB_HOST=postgres
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:13-alpine
    environment:
      POSTGRES_DB: ${DB_NAME}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
  frontend_dist:

networks:
  default:
    driver: bridge
```

---

## Chapitre 12 - Bonnes Pratiques

### 12.1 Securite

#### 12.1.1 Principes de base

- Utiliser des utilisateurs non-root dans les conteneurs
- Isoler les services avec des reseaux prives
- Limiter l'exposition des ports
- Utiliser des secrets pour les donnees sensibles
- Mettre a jour regulierement les images de base

#### 12.1.2 Configuration securisee

```yaml
services:
  app:
    image: node:alpine
    user: "1001:1001"  # Utilisateur non-root
    read_only: true  # Systeme de fichiers en lecture seule
    tmpfs:
      - /tmp:noexec,nosuid  # tmpfs securise
    cap_drop:
      - ALL  # Supprimer toutes les capabilities
    security_opt:
      - no-new-privileges:true  # Pas de nouveaux privileges
```

### 12.2 Performance

#### 12.2.1 Optimisation des images

```dockerfile
# Dockerfile optimise (multi-stage build)
FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:16-alpine AS runtime
COPY --from=builder /app/node_modules ./node_modules
COPY . .
CMD ["npm", "start"]
```

#### 12.2.2 Limites de ressources

```yaml
services:
  app:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

### 12.3 Maintenance

#### 12.3.1 Health checks

```yaml
services:
  web:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

#### 12.3.2 Logging

```yaml
services:
  app:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

---

## Chapitre 13 - Debogage et Troubleshooting

### 13.1 Problemes courants

#### 13.1.1 Port deja utilise

Erreur: Port 8080 is already in use

Solutions:

```bash
# Identifier le processus
sudo lsof -i :8080
sudo netstat -tulpn | grep :8080

# Changer le port dans docker-compose.yml
ports:
  - "8081:80"  # Utiliser un port different
```

#### 13.1.2 Services qui ne communiquent pas

Diagnostic:

```bash
# Verifier les reseaux
docker network ls
docker network inspect <project>_default

# Tester la connectivite
docker-compose exec web ping api
docker-compose exec web nslookup api
```

#### 13.1.3 Volumes qui ne persistent pas

Verifications:

```bash
# Lister les volumes
docker volume ls

# Inspecter un volume
docker volume inspect <project>_<volume_name>

# Verifier les permissions
docker-compose exec service ls -la /path/to/volume
```

### 13.2 Commandes de diagnostic

```bash
# Etat general
docker-compose ps
docker-compose top

# Logs detailles
docker-compose logs -f
docker-compose logs --tail 100 service_name

# Configuration
docker-compose config
docker-compose config --services

# Ressources systeme
docker stats
docker system df
```

---

## Chapitre 14 - Exemples Complets

### 14.1 Stack LAMP

```yaml
version: '3.8'

services:
  apache:
    image: php:8.1-apache
    ports:
      - "80:80"
    volumes:
      - ./src:/var/www/html
    depends_on:
      - mysql

  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: rootpass
      MYSQL_DATABASE: webapp
      MYSQL_USER: user
      MYSQL_PASSWORD: password
    volumes:
      - mysql_data:/var/lib/mysql

  phpmyadmin:
    image: phpmyadmin:latest
    ports:
      - "8080:80"
    environment:
      PMA_HOST: mysql
      PMA_USER: root
      PMA_PASSWORD: rootpass

volumes:
  mysql_data:
```

### 14.2 Stack MEAN

```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "4200:4200"
    volumes:
      - ./frontend:/app
      - /app/node_modules

  backend:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      - MONGO_URL=mongodb://mongo:27017/meanapp
    depends_on:
      - mongo
    volumes:
      - ./backend:/app
      - /app/node_modules

  mongo:
    image: mongo:5.0
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

---

## Chapitre 15 - Conclusion

### 15.1 Recapitulatif

Ce guide complet a couvert tous les aspects essentiels de Docker Compose. Docker Compose simplifie drastiquement la gestion d'applications multi-conteneurs avec une syntaxe claire et des concepts bien definis.

Points cles abordes:

- Architecture et workflow de Docker Compose
- Configuration YAML complete et exemples pratiques
- Commandes essentielles pour le cycle de vie
- Gestion avancee des reseaux et volumes
- Variables d'environnement et multi-environnements
- Outils de gestion et monitoring
- Bonnes pratiques de securite et performance
- Troubleshooting et resolution de problemes
- Exemples complets d'applications modernes

### 15.2 Conseils finaux

Pour bien commencer:

- Commencez simple avec un service unique
- Experimentez avec les exercices proposes
- Utilisez les exemples comme base pour vos projets
- Montez progressivement en complexite

Pour aller plus loin:

- Explorez Docker Swarm pour l'orchestration en cluster
- Decouvrez Kubernetes pour des besoins plus avances
- Integrez Docker Compose dans vos pipelines CI/CD
- Contribuez a la communaute open source

Docker Compose constitue une base solide pour aborder l'orchestration de conteneurs. Sa maitrise est un atout precieux pour tout developpeur travaillant avec des architectures modernes.

Bonne containerisation!
