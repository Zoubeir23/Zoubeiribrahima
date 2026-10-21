## Partir des contraintes, pas des modes

Le meilleur framework est celui que tu maîtrises assez pour livrer vite et corriger sans panique. Pour un SaaS qui démarre, la vitesse d'itération compte plus que la performance théorique.

## Les cinq critères

### 2.1 Maîtrise de l'équipe

Une stack connue réduit le temps de livraison de moitié par rapport à une stack à la mode apprise en cours de route.

### 2.2 Écosystème

Authentification, paiements, emails, tâches de fond : plus ils sont fournis par des bibliothèques éprouvées, moins tu réinventes.

### 2.3 Recrutement et maintenance

Tu devras peut-être confier le projet à quelqu'un d'autre. Une technologie répandue facilite la reprise.

### 2.4 Coût d'hébergement

Un monolithe sur un seul serveur coûte une fraction d'une architecture de dix services.

### 2.5 Sécurité par défaut

Protection CSRF, gestion des sessions, validation des entrées : choisis un framework qui les fournit déjà.

## Une combinaison pragmatique

```
Backend  : Django + Django REST Framework
Frontend : React + TypeScript
Base     : PostgreSQL
Tâches   : Celery + Redis
Mobile   : Flutter ou React Native, plus tard
```

Ce choix couvre l'administration, l'API, le web et le mobile sans multiplier les langages. Commence par un monolithe, découpe seulement quand une partie le justifie.

## À retenir

- Maîtrise d'abord, nouveauté ensuite.
- Un monolithe bien rangé suffit longtemps.
- Garde l'API propre pour ajouter le mobile sans tout refaire.
