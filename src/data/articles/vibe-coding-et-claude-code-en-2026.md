## Comprendre le vibe coding

### 1.1 D'où vient le terme ?

Le terme "vibe coding" a été popularisé début 2025 par Andrej Karpathy (cofondateur d'OpenAI, ex-Tesla AI). Il décrivait sa façon de travailler avec des agents IA : au lieu d'écrire chaque ligne de code, il décrivait ce qu'il voulait obtenir, l'agent générait, et lui validait ou corrigeait.

L'idée est séduisante. Et elle fonctionne — dans certaines conditions.

Voici la différence entre deux développeurs qui utilisent Claude Code sur le même projet :

```
DÉVELOPPEUR A (vibe coder passif)
─────────────────────────────────
Prompt : "Crée-moi une app e-commerce complète avec Django"
         ↓
Claude Code génère 40 fichiers
         ↓
Développeur A : "Ça marche, je pousse sur GitHub"
         ↓
3 semaines plus tard :
- Bug en production impossible à localiser
- Faille de sécurité dans le système de paiement
- Impossible d'ajouter une fonctionnalité sans tout casser
- Le développeur ne comprend pas son propre projet


DÉVELOPPEUR B (vibe coder actif)
─────────────────────────────────
Prompt : "Dans views.py, crée une ListView pour Product
          avec pagination de 10 éléments"
         ↓
Claude Code génère 20 lignes
         ↓
Développeur B : lit le diff, comprend, teste, commite
         ↓
3 semaines plus tard :
- Code propre et compréhensible
- Tests qui passent
- Facile à faire évoluer
- Le développeur a appris en validant chaque étape
```

La différence n'est pas l'outil. C'est la méthode.

---

### 1.2 Le spectre du vibe coding

Le vibe coding n'est pas binaire. Il y a un spectre entre deux extrêmes :

```
PASSIF                                                    ACTIF
────────────────────────────────────────────────────────────────
"Fais tout"    "Génère la    "Refactore    "Explique    "Suggère
               structure"    cette         ce bug"      un nom"
                             fonction"
    ↑                                                       ↑
Dangereux                                             Productif
pour débuter                                         à tout niveau
```

Pour un grand débutant, rester dans la moitié droite du spectre est essentiel. Chaque ligne générée doit être lue, comprise, et intégrée dans ta tête avant d'être acceptée.

---

### 1.3 Pourquoi c'est dangereux mal utilisé

Voici trois scénarios réels où le vibe coding passif crée de vrais problèmes :

**Scénario 1 — La faille de sécurité invisible**

```python
# Claude Code génère ce code pour une API Flask
@app.route('/user/<user_id>/data')
def get_user_data(user_id):
    # Récupère les données de l'utilisateur
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM users WHERE id = {user_id}")
    # ↑ INJECTION SQL — si user_id = "1 OR 1=1"
    # → renvoie TOUS les utilisateurs
    data = cursor.fetchone()
    return jsonify(data)
```

Un vibe coder passif voit que ça fonctionne et pousse en production. Un vibe coder actif lit la ligne `cursor.execute(f"...")` et sait que la f-string est une faille.

**Scénario 2 — La dette technique invisible**

```python
# Généré rapidement, ça "marche"
def process_everything(data, user, config, db, cache, logger, email_service):
    # 200 lignes qui font tout en même temps
    # Impossible à tester unitairement
    # Impossible à modifier sans tout casser
    pass
```

**Scénario 3 — Le token hardcodé**

```python
# Claude Code génère un exemple avec une "fausse" clé
API_KEY = "sk-ant-example-key-replace-me"

# Le développeur remplace par sa vraie clé DANS LE FICHIER
API_KEY = "sk-ant-VRAIE_CLE_SECRETE_123"

# Commite sans regarder, pousse sur GitHub public
# → La clé est exposée, le compte compromis
```

---

## Mise en pratique — le vibe coding actif

### 2.1 La règle des prompts délimités

La différence entre un bon et un mauvais prompt d'agent IA, c'est la délimitation.

```
✗ PROMPT TROP LARGE
────────────────────
"Crée une application de gestion de tâches"

→ L'agent invente :
  - le framework (peut-être pas celui que tu voulais)
  - la structure de base de données
  - le système d'authentification
  - le style CSS
  - les règles métier
Tu obtiens quelque chose de fonctionnel mais opaque.


✓ PROMPT DÉLIMITÉ
──────────────────
"Dans models.py (Django), crée un modèle Task avec :
 - title: CharField(max_length=200)
 - description: TextField(blank=True)
 - completed: BooleanField(default=False)
 - created_at: DateTimeField(auto_now_add=True)
 - owner: ForeignKey vers le modèle User existant
 Ajoute la méthode __str__ et la classe Meta avec ordering."

→ Tu obtiens exactement ce que tu as demandé.
  Tu peux lire et comprendre les 20 lignes générées.
  Tu sais exactement ce que tu as dans ton projet.
```

---

### 2.2 Workflow complet : construire une feature avec le vibe coding actif

**Contexte :** tu travailles sur un projet Django. Tu veux ajouter une fonctionnalité de recherche de tâches par titre.

**Étape 1 — Snapshot Git avant tout**
```bash
git add .
git commit -m "chore: snapshot avant ajout feature recherche"
# Si l'agent fait des bêtises, tu peux revenir ici
```

**Étape 2 — Prompt délimité pour le modèle**
```bash
claude "Dans views.py, ajoute une vue basée sur fonction search_tasks(request)
        qui :
        - récupère le paramètre GET 'q' de l'URL
        - filtre les Task par title__icontains=q
        - retourne un JSON avec la liste des tâches correspondantes
        - renvoie une liste vide si q est absent ou vide
        Le modèle Task a les champs : id, title, completed, created_at"
```

**Code généré — tu lis chaque ligne :**
```python
# views.py (ajout généré)
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from .models import Task


@require_GET
def search_tasks(request):
    """
    Recherche des tâches par titre.

    GET /tasks/search/?q=<terme>

    Returns:
        JSON avec la liste des tâches correspondantes
    """
    query = request.GET.get('q', '').strip()

    if not query:
        return JsonResponse({'tasks': [], 'count': 0})

    tasks = Task.objects.filter(
        title__icontains=query
    ).values('id', 'title', 'completed', 'created_at')

    return JsonResponse({
        'tasks': list(tasks),
        'count': tasks.count()
    })
```

**Ce que tu vérifies ligne par ligne :**
```python
query = request.GET.get('q', '').strip()
# ✓ Valeur par défaut '' si 'q' absent
# ✓ strip() enlève les espaces parasites

if not query:
    return JsonResponse({'tasks': [], 'count': 0})
# ✓ Gestion du cas vide — pas de requête inutile en BDD

tasks = Task.objects.filter(title__icontains=query)
# ✓ icontains = insensible à la casse
# ✓ Django paramétrise automatiquement — pas d'injection SQL

.values('id', 'title', 'completed', 'created_at')
# ✓ On ne renvoie pas tous les champs (pas de données sensibles)
# ✓ created_at est un DateTimeField — vérifier la sérialisation JSON
```

**Question à poser à l'agent si tu ne comprends pas quelque chose :**
```bash
claude "Dans le code que tu viens de générer, explique-moi pourquoi
        .values() est préférable à récupérer les objets Task directement
        quand on retourne du JSON"
```

**Étape 3 — Prompt pour l'URL**
```bash
claude "Dans urls.py, ajoute le pattern URL pour la vue search_tasks
        avec le chemin 'tasks/search/'"
```

**Code généré :**
```python
# urls.py (ajout)
from django.urls import path
from . import views

urlpatterns = [
    # ... patterns existants ...
    path('tasks/search/', views.search_tasks, name='search-tasks'),
]
```

**Étape 4 — Prompt pour les tests**
```bash
claude "Génère des tests pytest-django pour la vue search_tasks dans
        tests/test_views.py. Couvre :
        - recherche avec résultats
        - recherche sans résultats
        - paramètre q absent
        - paramètre q vide
        - recherche insensible à la casse
        Utilise pytest fixtures et crée les objets Task nécessaires."
```

**Tests générés — tu lis et valides :**
```python
# tests/test_views.py
import pytest
from django.urls import reverse
from tasks.models import Task


@pytest.fixture
def sample_tasks(db):
    """Crée des tâches de test."""
    Task.objects.create(title="Apprendre Django", completed=False)
    Task.objects.create(title="Apprendre Python", completed=True)
    Task.objects.create(title="Faire les courses", completed=False)


class TestSearchTasksView:

    def test_recherche_avec_resultats(self, client, sample_tasks):
        response = client.get(reverse('search-tasks'), {'q': 'apprendre'})
        assert response.status_code == 200
        data = response.json()
        assert data['count'] == 2
        assert len(data['tasks']) == 2

    def test_recherche_sans_resultats(self, client, sample_tasks):
        response = client.get(reverse('search-tasks'), {'q': 'xyz_inexistant'})
        assert response.status_code == 200
        data = response.json()
        assert data['count'] == 0
        assert data['tasks'] == []

    def test_parametre_q_absent(self, client, sample_tasks):
        response = client.get(reverse('search-tasks'))
        assert response.status_code == 200
        data = response.json()
        assert data['tasks'] == []

    def test_parametre_q_vide(self, client, sample_tasks):
        response = client.get(reverse('search-tasks'), {'q': ''})
        assert response.status_code == 200
        assert response.json()['tasks'] == []

    def test_recherche_insensible_casse(self, client, sample_tasks):
        response = client.get(reverse('search-tasks'), {'q': 'APPRENDRE'})
        assert response.status_code == 200
        assert response.json()['count'] == 2

    def test_methode_post_refusee(self, client):
        response = client.post(reverse('search-tasks'), {'q': 'test'})
        assert response.status_code == 405  # Method Not Allowed
```

**Étape 5 — Lancer les tests**
```bash
pytest tests/test_views.py -v

# Résultat attendu :
# test_recherche_avec_resultats PASSED
# test_recherche_sans_resultats PASSED
# test_parametre_q_absent PASSED
# test_parametre_q_vide PASSED
# test_recherche_insensible_casse PASSED
# test_methode_post_refusee PASSED
# =================== 6 passed in 0.34s ===================
```

**Étape 6 — Commiter proprement**
```bash
git add views.py urls.py tests/test_views.py
git commit -m "feat(tasks): add search endpoint with case-insensitive filtering

- GET /tasks/search/?q=<terme> returns matching tasks as JSON
- Empty or missing query returns empty list
- Tests cover 6 scenarios including edge cases"
```

---

### 2.3 La technique du "comprendre avant d'accepter"

Pour chaque bloc de code généré par un agent, applique cette checklist mentale :

```
CHECKLIST DE VALIDATION DU CODE GÉNÉRÉ
───────────────────────────────────────

□ 1. JE COMPRENDS CE QUE FAIT CHAQUE LIGNE
      Si non → demande à l'agent d'expliquer cette ligne spécifique

□ 2. LA LOGIQUE MÉTIER EST CORRECTE
      L'agent ne connaît pas ton domaine. Vérifie que les règles
      métier sont bien implémentées (calculs, conditions, validations)

□ 3. PAS DE DONNÉES SENSIBLES EXPOSÉES
      - Pas de clés en dur
      - Pas de mots de passe
      - Pas plus de données que nécessaire dans les réponses API

□ 4. LES ENTRÉES UTILISATEUR SONT VALIDÉES
      Tout ce qui vient de l'extérieur (formulaire, URL, API)
      doit être validé et nettoyé

□ 5. LES CAS D'ERREUR SONT GÉRÉS
      Que se passe-t-il si la BDD est down ? Si l'entrée est nulle ?
      Si le fichier n'existe pas ?

□ 6. JE POURRAIS RÉÉCRIRE CE CODE SI NÉCESSAIRE
      C'est le test ultime. Si la réponse est non,
      continue à lire et à poser des questions.
```

---

### 2.4 Utiliser l'agent pour apprendre, pas juste pour générer

Le vibe coding actif peut accélérer ton apprentissage si tu l'utilises comme outil pédagogique.

**Demander des explications :**
```bash
claude "Tu viens de générer ce code Django :
        Task.objects.filter(title__icontains=query).values(...)
        Explique-moi :
        1. Que fait __icontains exactement ?
        2. Pourquoi .values() et pas .all() ?
        3. Quand est-ce que cette requête est envoyée à la BDD ?"
```

**Demander des alternatives :**
```bash
claude "Tu as utilisé une fonction basée sur vue pour search_tasks.
        Montre-moi comment ce serait avec une vue basée sur classe (View).
        Explique les avantages et inconvénients de chaque approche."
```

**Demander une revue de code :**
```bash
claude "Voici une fonction que j'ai écrite moi-même :
        [colle ton code]
        Identifie les problèmes potentiels, les mauvaises pratiques,
        et propose des améliorations en expliquant pourquoi."
```

---

## Erreurs fréquentes et comment les éviter

### Erreur 1 : « ça compile donc c'est bon »

**Situation :**
```bash
claude "Crée une fonction qui calcule le prix après réduction"

# Code généré :
def apply_discount(price, discount):
    return price - (price * discount)

# Test rapide :
apply_discount(100, 0.2)  # → 80.0 ✓

# Déployé en production.
# Deux semaines plus tard :
apply_discount(100, 20)   # → -1900.0 ✗
# L'utilisateur a entré 20 (pour 20%) au lieu de 0.2
```

**Leçon :** compiler et retourner un résultat ne signifie pas que la logique est correcte. Teste toujours les cas limites.

```python
# Version robuste — à demander explicitement
def apply_discount(price: float, discount_percent: float) -> float:
    """
    Applique une réduction à un prix.

    Args:
        price: Prix original (positif)
        discount_percent: Pourcentage de réduction entre 0 et 100

    Returns:
        Prix après réduction

    Raises:
        ValueError: si discount_percent n'est pas entre 0 et 100
        ValueError: si price est négatif
    """
    if not 0 <= discount_percent <= 100:
        raise ValueError(
            f"Le pourcentage doit être entre 0 et 100, reçu : {discount_percent}"
        )
    if price < 0:
        raise ValueError(f"Le prix ne peut pas être négatif, reçu : {price}")

    return price * (1 - discount_percent / 100)


# Tests
assert apply_discount(100, 20) == 80.0    # ✓
assert apply_discount(100, 0) == 100.0    # ✓
assert apply_discount(100, 100) == 0.0   # ✓

try:
    apply_discount(100, 150)              # doit lever ValueError
    assert False, "Aurait dû lever une erreur"
except ValueError:
    pass  # ✓
```

---

### Erreur 2 : accumuler du code non compris

**Symptôme :**
```
Semaine 1 : "Je comprends 90% de mon code"
Semaine 2 : "Je comprends 70% de mon code"
Semaine 4 : "Je comprends 40% de mon code"
Semaine 8 : "Je ne comprends plus mon projet"
```

C'est la dette de compréhension. Chaque session où tu acceptes du code sans le comprendre l'aggrave.

**Solution : la règle des 10 minutes**

Avant d'accepter du code généré, impose-toi 10 minutes de lecture active :

```bash
# 1. Voir exactement ce qui a changé
git diff

# 2. Pour chaque ligne que tu ne comprends pas, demande
claude "Dans le code que tu viens de générer, explique la ligne :
        'tasks = Task.objects.filter(title__icontains=query).values(...)'
        Je suis débutant en Django ORM."

# 3. Essaie de réécrire la partie dans tes propres mots
#    (sur papier ou dans un fichier brouillon)

# 4. Seulement alors → accepte et commite
```

---

### Erreur 3 : utiliser le vibe coding pour éviter d'apprendre les bases

**Situation problématique :**
```
Débutant → utilise Claude Code pour tout
         → ne comprend jamais les bases
         → dépend entièrement de l'agent
         → incapable de débugger sans l'agent
         → incapable de passer un entretien technique
         → incapable de travailler sans connexion internet
```

**Approche saine :**
```
Débutant → apprend les bases (Python, Django, SQL, Git)
         → utilise l'agent pour accélérer les tâches répétitives
         → utilise l'agent pour explorer de nouveaux concepts
         → valide et comprend chaque ligne générée
         → devient autonome avec l'agent comme accélérateur
```

**Règle pratique :** si tu es en train d'apprendre un nouveau concept (ex : les classes en Python, les migrations Django, les requêtes SQL), écris le code toi-même d'abord. Utilise l'agent pour corriger, améliorer, ou expliquer — pas pour générer à ta place.

---

### Erreur 4 : ne pas utiliser Git comme filet de sécurité

```bash
# ✗ Workflow sans filet
claude "Refactore tout le dossier src/"
# → 15 fichiers modifiés
# → Quelque chose casse
# → Impossible de savoir ce qui existait avant


# ✓ Workflow avec filet
git add . && git commit -m "chore: snapshot avant refactoring"
claude "Refactore tout le dossier src/"
git diff                    # voir exactement ce qui a changé
pytest tests/ -v            # vérifier que rien n'est cassé

# Si quelque chose ne va pas :
git checkout src/services.py   # annuler les changements sur un fichier
# ou
git reset --hard HEAD          # annuler TOUT depuis le dernier commit
```

---

## Comparaison des approches de développement

### 4.1 Développement sans agent vs avec agent (actif) vs avec agent (passif)

| Critère | Sans agent | Agent actif | Agent passif |
|---------|-----------|-------------|--------------|
| Vitesse de développement | Lente | Rapide | Très rapide |
| Compréhension du code | Totale | Bonne | Faible |
| Qualité du code | Variable | Bonne | Variable |
| Sécurité | Dépend du dev | Bonne (si relu) | Risquée |
| Apprentissage | Fort | Fort | Faible |
| Maintenabilité | Bonne | Très bonne | Mauvaise |
| Autonomie | Totale | Totale | Dépendance |
| Recommandé pour débuter | Oui (bases) | Oui (après bases) | Non |

---

### 4.2 Quand utiliser l'agent, quand ne pas l'utiliser

```
UTILISE L'AGENT POUR :              N'UTILISE PAS L'AGENT POUR :
────────────────────────────        ─────────────────────────────
✓ Générer du boilerplate répétitif  ✗ Apprendre un concept pour la 1ère fois
✓ Refactorer du code que tu         ✗ Écrire des algorithmes que tu dois
  comprends déjà                      maîtriser (tri, récursion, etc.)
✓ Générer des tests unitaires       ✗ Comprendre une erreur sans essayer
✓ Écrire de la documentation          d'abord toi-même
✓ Suggérer des noms de variables    ✗ Concevoir l'architecture de ton projet
✓ Expliquer du code inconnu         ✗ Valider la logique métier critique
✓ Trouver des bugs dans du code     ✗ Décider des choix techniques importants
  que tu comprends
```

---

## Récapitulatif : les 5 règles du vibe coding actif

```
RÈGLE 1 — Commite avant chaque intervention
  git add . && git commit -m "chore: snapshot"

RÈGLE 2 — Prompts délimités, pas de "fais tout"
  ✗ "Crée mon application"
  ✓ "Dans views.py, ajoute cette fonction précise"

RÈGLE 3 — Lis chaque ligne du git diff
  git diff
  → Si tu ne comprends pas une ligne, demande une explication

RÈGLE 4 — Teste avant de commiter
  pytest tests/ -v
  → Si un test casse, comprends POURQUOI avant de corriger

RÈGLE 5 — Tu dois pouvoir réécrire ce que tu acceptes
  → C'est le test ultime de compréhension
```

---

## Checklist actionnable

- [ ] Sur un projet existant, faire un commit snapshot avant toute intervention d'agent
- [ ] Écrire 3 prompts délimités (une fonctionnalité précise à la fois)
- [ ] Lire entièrement le `git diff` après chaque génération
- [ ] Identifier une ligne dans le code généré que tu ne comprends pas et demander une explication
- [ ] Écrire toi-même un test pour une fonction générée par l'agent
- [ ] Appliquer la checklist de validation sur le prochain code généré
- [ ] Identifier dans ton projet un endroit où l'agent aurait pu générer une faille (entrée utilisateur non validée, requête SQL construite avec f-string, clé en dur)

---

## Conclusion

Le vibe coding n'est pas une tendance à fuir ni une révolution à adopter aveuglément. C'est un spectre. À une extrémité, le développeur passif qui génère sans comprendre et accumule une dette technique et sécuritaire invisible. À l'autre, le développeur actif qui utilise l'agent comme un accélérateur intelligent — pour aller plus vite sur les tâches répétitives, explorer plus rapidement de nouveaux concepts, et maintenir une qualité de code qu'il maîtrise entièrement.

La règle est simple : **l'agent accélère ce que tu comprends déjà. Il ne remplace pas ce que tu n'as pas encore appris.**
