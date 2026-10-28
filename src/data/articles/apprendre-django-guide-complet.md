**Framework Web Python de Nouvelle Generation**

"Django makes it easier to build web pages using Python."
- Adrian Holovaty, Co-createur de Django

"Chaque expert a un jour ete debutant. Code une ligne, apprends une chose, et repete - c'est ainsi que naissent les developpeurs."

6 juin 2025

## Table des matieres

- Preface
- 1 Introduction a Django
  - 1.1 Qu'est-ce que Django?
  - 1.2 Architecture MTV
  - 1.3 Philosophie "Batteries Incluses"
- 2 Installation et Configuration
  - 2.1 Prerequis
  - 2.2 Environnement virtuel
  - 2.3 Installation de Django
- 3 Structure d'un Projet Django
  - 3.1 Creation du projet
  - 3.2 Structure des fichiers
  - 3.3 Fichier settings.py
  - 3.4 Fichier urls.py
- 4 Applications Django
  - 4.1 Concept d'application
  - 4.2 Creation d'une application
  - 4.3 Enregistrement de l'application
  - 4.4 Premiere vue simple
  - 4.5 Configuration des URLs
- 5 Modeles et Base de Donnees
  - 5.1 Definition des modeles
  - 5.2 Types de champs essentiels
  - 5.3 Relations entre modeles
  - 5.4 Migrations
  - 5.5 Utilisation de l'ORM
- 6 Interface d'Administration
  - 6.1 Activation de l'admin
  - 6.1.1 Creation d'un superutilisateur
  - 6.2 Enregistrement des modeles
  - 6.3 Personnalisation avancee
  - 6.4 Actions personnalisees
- 7 Vues et Templates
  - 7.1 Vues basees sur les fonctions
  - 7.2 Templates Django
  - 7.2.1 Template de base
  - 7.2.2 Template de liste
  - 7.3 Template Language Django
  - 7.3.1 Variables et filtres
  - 7.3.2 Tags de controle
  - 7.4 Vues basees sur les classes
- 8 Formulaires
  - 8.1 ModelForms
  - 8.2 Utilisation dans les vues
  - 8.3 Template de formulaire
  - 8.4 Formulaires personnalises
- 9 Authentification
  - 9.1 Configuration de base
  - 9.2 URLs d'authentification
  - 9.3 Vue d'inscription
  - 9.4 Templates d'authentification
  - 9.5 Protection des vues
  - 9.6 Profil utilisateur etendu
- 10 Fichiers Statiques et Medias
  - 10.1 Configuration
  - 10.2 Structure recommandee
  - 10.3 Utilisation dans les templates
  - 10.4 Upload de fichiers
  - 10.5 Configuration des URLs (developpement)
- 11 Tests Unitaires
  - 11.1 Tests de modeles
  - 11.2 Tests de vues
  - 11.3 Execution des tests
  - 11.4 Coverage (couverture de code)
- 12 Deploiement
  - 12.1 Preparation pour la production
  - 12.1.1 Settings de production
  - 12.2 Deploiement sur Heroku
  - 12.2.1 Fichiers requis
  - 12.2.2 Commandes de deploiement
  - 12.3 Checklist de deploiement
- 13 Django REST Framework
  - 13.1 Introduction aux APIs REST
  - 13.2 Installation et configuration
  - 13.3 Serializers avances
  - 13.4 ViewSets et vues API
  - 13.5 Authentication JWT
  - 13.6 URLs et routage API
  - 13.7 Tests d'API
  - 13.8 Documentation API automatique
- 14 Middleware et Signaux Django
  - 14.1 Middleware personnalise
  - 14.2 Signaux Django
- 15 Cache et Performance
  - 15.1 Configuration du cache
  - 15.2 Cache de vues
  - 15.3 Cache de templates
  - 15.4 Optimisation des requetes
- 16 Taches Asynchrones avec Celery
  - 16.1 Installation et configuration
  - 16.2 Taches asynchrones
  - 16.3 Utilisation des taches
  - 16.4 Lancement de Celery
- 17 Securite Avancee
  - 17.1 Protection contre les attaques
  - 17.2 Rate Limiting
  - 17.3 Validation et assainissement
  - 17.4 Optimisation des requetes
  - 17.5 Cache et performance
  - 17.6 Securite
- 18 Fiche de Revision
  - 18.1 Commandes essentielles
  - 18.2 Workflow de developpement
  - 18.3 Patterns Django
  - 18.4 Ressources pour aller plus loin
  - 18.5 Checklist de projet
- 19 Conclusion
  - 19.1 Recapitulatif
  - 19.2 Prochaines etapes

## Preface

Bienvenue dans ce guide moderne de Django! Ce cours a ete concu pour vous accompagner efficacement dans l'apprentissage du framework web le plus populaire de Python.

### Pourquoi ce guide?

Ce guide privilegie la clarte et la praticite. Chaque concept est illustre par des exemples concis et des explications detaillees. L'objectif est de vous faire maitriser Django rapidement et solidement.

Django, cree en 2003, alimente aujourd'hui des milliers de sites web, d'Instagram a Pinterest. Sa philosophie "batteries incluses" en fait un choix ideal pour les developpeurs soucieux d'efficacite.

Objectifs: Maitriser Django de A a Z, creer des applications web modernes et securisees.

---

## Chapitre 1 - Introduction a Django

### 1.1 Qu'est-ce que Django?

Django est un framework web Python de haut niveau qui encourage un developpement rapide et une conception propre. Il suit le principe DRY (Don't Repeat Yourself) et privilegie les conventions.

#### Les Atouts de Django

- Rapidite: Developpement accelere
- Securite: Protection integree
- Scalabilite: Supporte la montee en charge
- Polyvalence: Tous types d'applications

### 1.2 Architecture MTV

Django utilise le pattern Model-Template-View:

- Model: Gestion des donnees
- Template: Interface utilisateur
- View: Logique metier

### 1.3 Philosophie "Batteries Incluses"

Django fournit tout le necessaire pour developper une application web complete.

#### Composants Integres

ORM puissant, interface d'admin, authentification, formulaires, templates, securite, internationalisation.

---

## Chapitre 2 - Installation et Configuration

### 2.1 Prerequis

Avant de commencer, assurez-vous d'avoir:

- Python 3.8+ installe
- pip (gestionnaire de paquets)
- Un editeur de code moderne

### 2.2 Environnement virtuel

La creation d'un environnement virtuel est essentielle pour isoler vos projets.

```bash
# Creer l'environnement
python -m venv django_env

# Activer (Windows)
django_env\Scripts\activate

# Activer (macOS / Linux)
source django_env/bin/activate
```

### 2.3 Installation de Django

```bash
# Installer Django
pip install django

# Verifier l'installation
django-admin --version
```

> Attention: Toujours travailler dans un environnement virtuel active pour eviter les conflits entre projets.

#### Exercice 1: Installation

1. Creez un environnement virtuel django_project
2. Activez-le et installez Django 4.2
3. Verifiez que tout fonctionne

---

## Chapitre 3 - Structure d'un Projet Django

### 3.1 Creation du projet

```bash
# Creer le projet
django-admin startproject monblog

# Demarrer le serveur
cd monblog
python manage.py runserver
```

Visitez http://127.0.0.1:8000 pour voir la page d'accueil Django.

### 3.2 Structure des fichiers

```text
monblog/
  manage.py                # Utilitaire de gestion
  monblog/
    __init__.py
    settings.py            # Configuration
    urls.py                # Routage principal
    wsgi.py                # Deploiement web
```

### 3.3 Fichier settings.py

Le coeur de la configuration Django:

```python
# Parametres de base
DEBUG = True  # False en production
SECRET_KEY = 'your-secret-key'  # garder secrete
ALLOWED_HOSTS = []

# Applications installees
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    # ...
]

# Base de donnees (SQLite par defaut)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Localisation
LANGUAGE_CODE = 'fr-fr'
TIME_ZONE = 'Africa/Douala'
```

Explication technique:

- DEBUG=True active le detail des erreurs (toujours False en prod)
- SECRET_KEY sert au chiffrement des sessions et tokens CSRF
- INSTALLED_APPS declare les modules disponibles
- SQLite est ideal en dev, PostgreSQL est recommande en prod

### 3.4 Fichier urls.py

Le routage des URLs dans Django:

```python
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
    # Vos routes personnalisees ici
]
```

Explication technique:

- path() mappe URL vers vue
- Le premier parametre est le motif d'URL
- admin.site.urls inclut les routes admin
- urlpatterns est la liste parcourue par Django

#### Exercice 2: Premier projet

1. Creez un projet portfolio
2. Explorez les fichiers generes
3. Modifiez le fuseau horaire
4. Demarrez le serveur et testez

---

## Chapitre 4 - Applications Django

### 4.1 Concept d'application

Projet vs Application:

- Projet: site web complet avec configuration
- Application: module fonctionnel specifique (blog, boutique...)

Un projet contient plusieurs applications reutilisables.

### 4.2 Creation d'une application

```bash
python manage.py startapp blog
```

Structure generee:

```text
blog/
  __init__.py
  admin.py
  apps.py
  models.py
  views.py
  tests.py
  migrations/
```

### 4.3 Enregistrement de l'application

Ajoutez votre application dans settings.py:

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    # ...
    'blog',
]
```

### 4.4 Premiere vue simple

Creons une vue basique dans blog/views.py:

```python
from django.http import HttpResponse

def accueil(request):
    # request contient les infos HTTP
    return HttpResponse("Bienvenue sur mon blog Django!")

def article_detail(request, article_id):
    return HttpResponse(f"Article numero {article_id}")
```

Explication technique:

- Chaque vue recoit un objet request
- HttpResponse renvoie une reponse HTTP simple
- Les parametres URL sont passes automatiquement
- Django gere le routage URL -> vue

### 4.5 Configuration des URLs

Creez blog/urls.py:

```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.accueil, name='accueil'),
    path('article/<int:article_id>/', views.article_detail, name='detail'),
]
```

Incluez dans monblog/urls.py:

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('blog/', include('blog.urls')),
]
```

Test rapide:

- /blog/ -> Page d'accueil
- /blog/article/1/ -> Detail article 1

#### Exercice 3: Premiere application

1. Creez l'application portfolio
2. Enregistrez-la dans settings
3. Creez une vue projets
4. Configurez les URLs
5. Testez dans le navigateur

---

## Chapitre 5 - Modeles et Base de Donnees

### 5.1 Definition des modeles

Les modeles Django representent vos donnees:

```python
from django.db import models
from django.contrib.auth.models import User

class Article(models.Model):
    # CharField pour texte court
    titre = models.CharField(max_length=200)
    # TextField pour texte long
    contenu = models.TextField()
    # Relation Many-to-One vers User
    auteur = models.ForeignKey(User, on_delete=models.CASCADE)
    # Date auto a la creation
    date_creation = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.titre
```

Explication technique:

- models.Model est la classe de base
- on_delete=models.CASCADE supprime les articles si user supprime
- auto_now_add=True remplit la date a la creation
- __str__ sert a l'affichage texte (admin)

### 5.2 Types de champs essentiels

```python
class Produit(models.Model):
    # Champs texte
    nom = models.CharField(max_length=100)
    description = models.TextField()

    # Champs numeriques
    prix = models.DecimalField(max_digits=8, decimal_places=2)  # 999999.99
    stock = models.IntegerField()

    # Champs date / booleen
    date_ajout = models.DateTimeField(auto_now_add=True)
    disponible = models.BooleanField(default=True)
```

Explication technique:

- DecimalField est plus precis que FloatField pour les prix
- default=True fixe une valeur par defaut
- IntegerField stocke des entiers

### 5.3 Relations entre modeles

```python
class Categorie(models.Model):
    nom = models.CharField(max_length=100)

class Tag(models.Model):
    nom = models.CharField(max_length=50)

class Article(models.Model):
    titre = models.CharField(max_length=200)
    categorie = models.ForeignKey(Categorie, on_delete=models.CASCADE)
    tags = models.ManyToManyField('Tag')
```

Explication technique:

- ForeignKey: relation 1-vers-N
- ManyToManyField: relation N-vers-N
- Django cree la table intermediaire automatiquement

### 5.4 Migrations

```bash
# Creer les migrations
python manage.py makemigrations

# Appliquer les migrations
python manage.py migrate

# Voir l'etat des migrations
python manage.py showmigrations
```

### 5.5 Utilisation de l'ORM

```python
# Dans le shell: python manage.py shell
from blog.models import Article

# Creer un objet (INSERT)
article = Article.objects.create(
    titre="Mon premier article",
    contenu="Contenu de test...",
    auteur_id=1,
)

# Recuperer des objets (SELECT)
tous_articles = Article.objects.all()
article_specifique = Article.objects.get(id=1)
articles_recents = Article.objects.filter(
    date_creation__gte='2024-01-01'
).order_by('-date_creation')

# Mettre a jour (UPDATE)
Article.objects.filter(id=1).update(titre="Nouveau titre")

# Compter / supprimer
nombre = Article.objects.count()
Article.objects.filter(id=1).delete()
```

Explication technique:

- objects est le manager par defaut
- create() insere et retourne l'objet
- filter() retourne un QuerySet
- get() retourne un seul objet ou leve une exception
- __gte = greater than or equal

#### Exercice 4: Modeles

1. Creez un modele Projet avec nom, description, date_creation
2. Creez un modele Technologie en Many-to-Many
3. Generez et appliquez les migrations
4. Testez la creation d'objets dans le shell

---

## Chapitre 6 - Interface d'Administration

### 6.1 Activation de l'admin

L'interface admin Django genere une interface web pour gerer les donnees.

#### 6.1.1 Creation d'un superutilisateur

```bash
python manage.py createsuperuser
```

### 6.2 Enregistrement des modeles

Dans blog/admin.py:

```python
from django.contrib import admin
from .models import Article, Categorie

admin.site.register(Article)
admin.site.register(Categorie)
```

### 6.3 Personnalisation avancee

```python
from django.contrib import admin
from .models import Article

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ['titre', 'auteur', 'date_creation']
    list_filter = ['date_creation', 'auteur']
    search_fields = ['titre', 'contenu']
    date_hierarchy = 'date_creation'
    prepopulated_fields = {'slug': ('titre',)}
```

Options utiles:

- list_display: colonnes affichees
- list_filter: filtres lateraux
- search_fields: champs de recherche
- date_hierarchy: navigation par date

### 6.4 Actions personnalisees

```python
@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    actions = ['publier_articles']

    def publier_articles(self, request, queryset):
        updated = queryset.update(status='publie')
        self.message_user(request, f'{updated} articles publies.')

    publier_articles.short_description = "Publier les articles selectionnes"
```

Productivite: l'admin fait gagner des heures de dev.

Acces: http://127.0.0.1:8000/admin/

#### Exercice 5: Administration

1. Creez un superutilisateur
2. Enregistrez vos modeles
3. Personnalisez avec list_display
4. Ajoutez filtres et recherche
5. Testez la creation d'objets

---

## Chapitre 7 - Vues et Templates

### 7.1 Vues basees sur les fonctions

```python
from django.shortcuts import render, get_object_or_404
from .models import Article

def liste_articles(request):
    articles = Article.objects.all().order_by('-date_creation')
    context = {'articles': articles}
    return render(request, 'blog/liste.html', context)

def detail_article(request, pk):
    article = get_object_or_404(Article, pk=pk)
    context = {'article': article}
    return render(request, 'blog/detail.html', context)
```

### 7.2 Templates Django

#### 7.2.1 Template de base

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <title>{% block title %}Mon Blog{% endblock %}</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <nav>
    <a href="{% url 'blog:liste' %}">Accueil</a>
  </nav>

  <main>
    {% block content %}{% endblock %}
  </main>
</body>
</html>
```

#### 7.2.2 Template de liste

```html
{% extends 'base.html' %}

{% block title %}Articles - {{ block.super }}{% endblock %}

{% block content %}
<h1>Articles du Blog</h1>

{% for article in articles %}
  <article>
    <h2><a href="{% url 'blog:detail' article.pk %}">{{ article.titre }}</a></h2>
    <p>Par {{ article.auteur }} le {{ article.date_creation|date:"d/m/Y" }}</p>
    <p>{{ article.contenu|truncatewords:20 }}</p>
  </article>
{% empty %}
  <p>Aucun article disponible.</p>
{% endfor %}
{% endblock %}
```

### 7.3 Template Language Django

#### 7.3.1 Variables et filtres

```django
{{ article.titre|title }}
{{ article.contenu|truncatewords:30 }}
{{ article.date_creation|date:"d/m/Y" }}
{{ article.prix|floatformat:2 }}
```

#### 7.3.2 Tags de controle

```django
{% if user.is_authenticated %}
  <p>Bonjour {{ user.username }}!</p>
{% else %}
  <a href="{% url 'login' %}">Se connecter</a>
{% endif %}

{% for item in liste %}
  <p>{{ forloop.counter }}. {{ item }}</p>
{% endfor %}
```

### 7.4 Vues basees sur les classes

```python
from django.views.generic import ListView, DetailView

class ArticleListView(ListView):
    model = Article
    template_name = 'blog/liste.html'
    context_object_name = 'articles'
    paginate_by = 10

class ArticleDetailView(DetailView):
    model = Article
    template_name = 'blog/detail.html'
    context_object_name = 'article'
```

URLs correspondantes:

```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.ArticleListView.as_view(), name='liste'),
    path('article/<int:pk>/', views.ArticleDetailView.as_view(), name='detail'),
]
```

#### Exercice 6: Vues et Templates

1. Creez des vues pour lister/afficher vos projets
2. Creez les templates correspondants
3. Utilisez l'heritage de templates
4. Ajoutez des filtres de date
5. Testez la navigation

---

## Chapitre 8 - Formulaires

### 8.1 ModelForms

```python
from django import forms
from .models import Article

class ArticleForm(forms.ModelForm):
    class Meta:
        model = Article
        fields = ['titre', 'contenu']
        widgets = {
            'titre': forms.TextInput(attrs={'class': 'form-control'}),
            'contenu': forms.Textarea(attrs={'class': 'form-control', 'rows': 5}),
        }

    def clean_titre(self):
        titre = self.cleaned_data['titre']
        if len(titre) < 5:
            raise forms.ValidationError("Le titre doit contenir au moins 5 caracteres.")
        return titre
```

### 8.2 Utilisation dans les vues

```python
from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import ArticleForm

def creer_article(request):
    if request.method == 'POST':
        form = ArticleForm(request.POST)
        if form.is_valid():
            article = form.save(commit=False)
            article.auteur = request.user
            article.save()
            messages.success(request, 'Article cree avec succes!')
            return redirect('blog:detail', pk=article.pk)
    else:
        form = ArticleForm()

    return render(request, 'blog/creer.html', {'form': form})
```

### 8.3 Template de formulaire

```html
{% extends 'base.html' %}

{% block content %}
<h1>Creer un Article</h1>

<form method="post">
  {% csrf_token %}

  {% if form.errors %}
    <div class="alert alert-danger">
      {{ form.errors }}
    </div>
  {% endif %}

  <div class="form-group">
    {{ form.titre.label_tag }}
    {{ form.titre }}
  </div>

  <div class="form-group">
    {{ form.contenu.label_tag }}
    {{ form.contenu }}
  </div>

  <button type="submit" class="btn btn-primary">Creer</button>
  <a href="{% url 'blog:liste' %}" class="btn btn-secondary">Annuler</a>
</form>
{% endblock %}
```

### 8.4 Formulaires personnalises

```python
class ContactForm(forms.Form):
    nom = forms.CharField(max_length=100)
    email = forms.EmailField()
    message = forms.CharField(widget=forms.Textarea)

    def send_email(self):
        from django.core.mail import send_mail
        send_mail(
            subject=f"Contact de {self.cleaned_data['nom']}",
            message=self.cleaned_data['message'],
            from_email=self.cleaned_data['email'],
            recipient_list=['admin@monsite.com'],
        )
```

CSRF Protection: toujours inclure `{% csrf_token %}`.

#### Exercice 7: Formulaires

1. Creez un formulaire pour ajouter des projets
2. Ajoutez une validation personnalisee
3. Creez le template correspondant
4. Testez creation/validation
5. Ajoutez un formulaire de contact

---

## Chapitre 9 - Authentification

### 9.1 Configuration de base

```python
LOGIN_URL = '/accounts/login/'
LOGIN_REDIRECT_URL = '/'
LOGOUT_REDIRECT_URL = '/'

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        'OPTIONS': {'min_length': 8},
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
]
```

### 9.2 URLs d'authentification

```python
from django.contrib.auth import views as auth_views
from django.urls import path

urlpatterns = [
    path('login/', auth_views.LoginView.as_view(), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('signup/', views.signup, name='signup'),
]
```

### 9.3 Vue d'inscription

```python
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login
from django.shortcuts import render, redirect

def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, 'Compte cree avec succes!')
            return redirect('blog:liste')
    else:
        form = UserCreationForm()

    return render(request, 'registration/signup.html', {'form': form})
```

### 9.4 Templates d'authentification

```html
{% extends 'base.html' %}

{% block content %}
<h2>Connexion</h2>

<form method="post">
  {% csrf_token %}
  {{ form.as_p }}
  <button type="submit">Se connecter</button>
</form>

<p><a href="{% url 'signup' %}">Creer un compte</a></p>
{% endblock %}
```

### 9.5 Protection des vues

```python
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin

@login_required
def creer_article(request):
    pass

class ArticleCreateView(LoginRequiredMixin, CreateView):
    model = Article
```

### 9.6 Profil utilisateur etendu

```python
class ProfilUtilisateur(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(max_length=500, blank=True)
    photo = models.ImageField(upload_to='profils/', blank=True)

    def __str__(self):
        return f"Profil de {self.user.username}"
```

#### Exercice 8: Authentification

1. Configurez l'authentification
2. Creez une vue d'inscription
3. Protegez la creation de projets
4. Ajoutez un modele de profil
5. Testez connexion/deconnexion

---

## Chapitre 10 - Fichiers Statiques et Medias

### 10.1 Configuration

```python
import os

# Fichiers statiques (CSS, JS, images)
STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / 'static']
STATIC_ROOT = BASE_DIR / 'staticfiles'

# Fichiers medias (uploads utilisateurs)
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'
```

### 10.2 Structure recommandee

```text
myproject/
  static/
    css/style.css
    js/main.js
    img/logo.png
  media/
    uploads/
    profils/
```

### 10.3 Utilisation dans les templates

```django
{% load static %}

<link rel="stylesheet" href="{% static 'css/style.css' %}">
<img src="{% static 'img/logo.png' %}" alt="Logo">

{% if user.profil.photo %}
  <img src="{{ user.profil.photo.url }}" alt="Photo">
{% endif %}
```

### 10.4 Upload de fichiers

```python
class Article(models.Model):
    titre = models.CharField(max_length=200)
    image = models.ImageField(upload_to='articles/', blank=True)

    def delete(self, *args, **kwargs):
        if self.image:
            self.image.delete(save=False)
        super().delete(*args, **kwargs)
```

### 10.5 Configuration des URLs (developpement)

```python
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Vos URLs...
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

#### Exercice 9: Fichiers

1. Configurez les fichiers statiques
2. Ajoutez du CSS personnalise
3. Creez un champ image pour les projets
4. Testez upload et affichage
5. Organisez les fichiers proprement

---

## Chapitre 11 - Tests Unitaires

### 11.1 Tests de modeles

```python
from django.test import TestCase
from django.contrib.auth.models import User
from .models import Article

class ArticleModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user('test', 'test@test.com', 'pass')

    def test_creation_article(self):
        article = Article.objects.create(
            titre='Test Article',
            contenu='Contenu de test',
            auteur=self.user,
        )
        self.assertEqual(article.titre, 'Test Article')
        self.assertEqual(str(article), 'Test Article')

    def test_str_representation(self):
        article = Article(titre='Mon Article')
        self.assertEqual(str(article), 'Mon Article')
```

### 11.2 Tests de vues

```python
from django.test import TestCase, Client
from django.urls import reverse

class ArticleViewTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user('test', 'test@test.com', 'pass')

    def test_liste_articles_view(self):
        response = self.client.get(reverse('blog:liste'))
        self.assertEqual(response.status_code, 200)

    def test_creation_requires_login(self):
        response = self.client.get(reverse('blog:creer'))
        self.assertEqual(response.status_code, 302)

        self.client.login(username='test', password='pass')
        response = self.client.get(reverse('blog:creer'))
        self.assertEqual(response.status_code, 200)
```

### 11.3 Execution des tests

```bash
# Tous les tests
python manage.py test

# Tests d'une application
python manage.py test blog

# Test specifique
python manage.py test blog.tests.ArticleModelTest.test_creation_article

# Avec verbosite
python manage.py test --verbosity=2
```

### 11.4 Coverage (couverture de code)

```bash
pip install coverage
coverage run --source='.' manage.py test
coverage report
coverage html
```

Bonnes pratiques:

- Testez chaque modele et vue importante
- Visez 80%+
- Testez les cas d'erreur et validations

#### Exercice 10: Tests

1. Ecrivez des tests pour vos modeles
2. Testez vos vues principales
3. Mesurez la couverture
4. Corrigez les erreurs
5. Ajoutez des tests de formulaires

---

## Chapitre 12 - Deploiement

### 12.1 Preparation pour la production

#### 12.1.1 Settings de production

```python
from .base import *
import os

# Securite
DEBUG = False
ALLOWED_HOSTS = ['votre-domaine.com', 'www.votre-domaine.com']
SECRET_KEY = os.environ.get('SECRET_KEY')

# Base de donnees
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DB_NAME'),
        'USER': os.environ.get('DB_USER'),
        'PASSWORD': os.environ.get('DB_PASSWORD'),
        'HOST': os.environ.get('DB_HOST', 'localhost'),
        'PORT': os.environ.get('DB_PORT', '5432'),
    }
}

# Securite HTTPS
SECURE_SSL_REDIRECT = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
```

### 12.2 Deploiement sur Heroku

#### 12.2.1 Fichiers requis

`requirements.txt`:

```text
Django==4.2.0
gunicorn==21.2.0
psycopg2-binary==2.9.7
whitenoise==6.5.0
python-decouple==3.8
```

`Procfile`:

```text
web: gunicorn myproject.wsgi --log-file -
```

#### 12.2.2 Commandes de deploiement

```bash
# Installation et creation
heroku create mon-blog-django
heroku addons:create heroku-postgresql:hobby-dev

# Variables d'environnement
heroku config:set DEBUG=False
heroku config:set SECRET_KEY="votre-cle-secrete"

# Deploiement
git add .
git commit -m "Deploy to production"
git push heroku main

# Migrations et donnees
heroku run python manage.py migrate
heroku run python manage.py createsuperuser
heroku run python manage.py collectstatic --noinput
```

### 12.3 Checklist de deploiement

- Settings de production configures
- Variables d'environnement definies
- Base de donnees production
- Fichiers statiques collectes
- HTTPS active
- Sauvegarde configuree
- Monitoring en place

Securite production: ne jamais commit de secrets (SECRET_KEY, mots de passe). Utiliser des variables d'environnement.

#### Exercice 11: Deploiement

1. Creez des settings de production
2. Preparez le projet pour Heroku
3. Configurez les variables d'environnement
4. Deployez l'application
5. Testez en production

---

## Chapitre 13 - Django REST Framework

### 13.1 Introduction aux APIs REST

Une API REST permet a des applications de communiquer via HTTP. DRF simplifie fortement la creation d'APIs modernes.

Pourquoi une API?

- Applications mobiles
- Frontend moderne (React, Vue, Angular)
- Integrations tierces
- Microservices

### 13.2 Installation et configuration

```bash
pip install djangorestframework
pip install django-cors-headers
pip install djangorestframework-simplejwt
```

```python
# settings.py
INSTALLED_APPS = [
    # ...
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    # ...
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ]
}

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
```

### 13.3 Serializers avances

```python
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Article, Categorie

class UtilisateurSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name']

class CategorieSerializer(serializers.ModelSerializer):
    articles_count = serializers.SerializerMethodField()

    class Meta:
        model = Categorie
        fields = ['id', 'nom', 'description', 'articles_count']

    def get_articles_count(self, obj):
        return obj.articles.count()

class ArticleSerializer(serializers.ModelSerializer):
    auteur = UtilisateurSerializer(read_only=True)
    categorie = CategorieSerializer(read_only=True)
    categorie_id = serializers.IntegerField(write_only=True, required=False)

    class Meta:
        model = Article
        fields = [
            'id', 'titre', 'contenu', 'auteur', 'categorie',
            'categorie_id', 'date_creation', 'date_modification'
        ]
        read_only_fields = ['auteur', 'date_creation', 'date_modification']

    def validate_titre(self, value):
        if len(value) < 5:
            raise serializers.ValidationError("Le titre doit contenir au moins 5 caracteres.")
        return value

    def create(self, validated_data):
        validated_data['auteur'] = self.context['request'].user
        return super().create(validated_data)

class ArticleCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['titre', 'contenu', 'categorie']
```

### 13.4 ViewSets et vues API

```python
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from .models import Article, Categorie
from .serializers import ArticleSerializer, CategorieSerializer

class CategorieViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Categorie.objects.all()
    serializer_class = CategorieSerializer
    permission_classes = [permissions.AllowAny]

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.select_related('auteur', 'categorie')
    serializer_class = ArticleSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = super().get_queryset()

        categorie = self.request.query_params.get('categorie')
        if categorie:
            queryset = queryset.filter(categorie__nom__icontains=categorie)

        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                Q(titre__icontains=search) | Q(contenu__icontains=search)
            )

        return queryset.order_by('-date_creation')

    def perform_create(self, serializer):
        serializer.save(auteur=self.request.user)

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy']:
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [permissions.IsAuthenticatedOrReadOnly]
        return [permission() for permission in permission_classes]

    @action(detail=False, methods=['get'])
    def mes_articles(self, request):
        if not request.user.is_authenticated:
            return Response(
                {'error': 'Authentication required'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        articles = self.get_queryset().filter(auteur=request.user)
        serializer = self.get_serializer(articles, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def toggle_like(self, request, pk=None):
        article = self.get_object()
        return Response({'status': 'like toggled'})
```

### 13.5 Authentication JWT

```python
from datetime import timedelta

# settings.py
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
}

# urls.py
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
```

### 13.6 URLs et routage API

```python
# api/urls.py
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from blog.api_views import ArticleViewSet, CategorieViewSet

router = DefaultRouter()
router.register(r'articles', ArticleViewSet, basename='article')
router.register(r'categories', CategorieViewSet, basename='categorie')

urlpatterns = [
    path('auth/token/', obtain_auth_token, name='api_token_auth'),
] + router.urls

# urls.py principal
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('api.urls')),
    path('api-auth/', include('rest_framework.urls')),
]
```

### 13.7 Tests d'API

```python
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from django.urls import reverse
from .models import Article

class ArticleAPITest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user('testuser', 'test@test.com', 'pass')
        self.article = Article.objects.create(
            titre='Test Article',
            contenu='Contenu de test',
            auteur=self.user
        )

    def test_get_article_list(self):
        url = reverse('article-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_article_authenticated(self):
        self.client.force_authenticate(user=self.user)
        url = reverse('article-list')
        data = {'titre': 'Nouvel Article', 'contenu': 'Contenu du nouvel article'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_article_unauthenticated(self):
        url = reverse('article-list')
        data = {'titre': 'Test', 'contenu': 'Test'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
```

### 13.8 Documentation API automatique

```bash
pip install drf-yasg
```

```python
# settings.py
INSTALLED_APPS = [
    # ...
    'drf_yasg',
]

# urls.py
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Blog API",
        default_version='v1',
        description="API pour notre blog Django",
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('swagger/', schema_view.with_ui('swagger'), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc'), name='schema-redoc'),
]
```

Documentation interactive: acces sur /swagger/.

#### Exercice 12: API REST

1. Installez DRF et configurez les settings
2. Creez des serializers
3. Implementez ViewSets CRUD
4. Ajoutez auth JWT
5. Testez via browsable API
6. Configurez Swagger

---

## Chapitre 14 - Middleware et Signaux Django

### 14.1 Middleware personnalise

```python
# myproject/middleware.py
import time
from django.utils.deprecation import MiddlewareMixin

class ResponseTimeMiddleware(MiddlewareMixin):
    """Mesurer le temps de reponse"""

    def process_request(self, request):
        request.start_time = time.time()

    def process_response(self, request, response):
        if hasattr(request, 'start_time'):
            duration = time.time() - request.start_time
            response['X-Response-Time'] = f'{duration:.2f}s'
        return response

class UserActivityMiddleware:
    """Tracker activite utilisateur"""

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.user.is_authenticated:
            pass

        response = self.get_response(request)
        return response
```

Configuration:

```python
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'myproject.middleware.ResponseTimeMiddleware',
    'myproject.middleware.UserActivityMiddleware',
    # ...
]
```

### 14.2 Signaux Django

```python
# blog/signals.py
from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver
from django.contrib.auth.models import User
from django.core.mail import send_mail
from .models import Article, ProfilUtilisateur

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        ProfilUtilisateur.objects.create(user=instance)

@receiver(post_save, sender=Article)
def article_published_notification(sender, instance, created, **kwargs):
    if not created and instance.statut == 'publie':
        send_mail(
            subject=f'Nouvel article: {instance.titre}',
            message=f'Un nouvel article "{instance.titre}" a ete publie.',
            from_email='noreply@monblog.com',
            recipient_list=['admin@monblog.com'],
            fail_silently=True,
        )

@receiver(pre_delete, sender=Article)
def backup_article_before_delete(sender, instance, **kwargs):
    print(f"Sauvegarde de l'article: {instance.titre}")
```

Enregistrement des signaux:

```python
from django.apps import AppConfig

class BlogConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'blog'

    def ready(self):
        import blog.signals
```

---

## Chapitre 15 - Cache et Performance

### 15.1 Configuration du cache

```python
# settings.py
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.redis.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/1',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        },
        'KEY_PREFIX': 'monblog',
        'TIMEOUT': 300,
    }
}

# Cache de session
SESSION_ENGINE = 'django.contrib.sessions.backends.cache'
SESSION_CACHE_ALIAS = 'default'
```

### 15.2 Cache de vues

```python
from django.views.decorators.cache import cache_page
from django.core.cache import cache
from django.utils.decorators import method_decorator

@cache_page(60 * 15)
def liste_articles(request):
    articles = Article.objects.all()
    return render(request, 'blog/liste.html', {'articles': articles})

@method_decorator(cache_page(60 * 15), name='dispatch')
class ArticleListView(ListView):
    model = Article

def get_articles_populaires():
    cache_key = 'articles_populaires'
    articles = cache.get(cache_key)

    if articles is None:
        articles = Article.objects.filter(statut='publie').order_by('-vues')[:10]
        cache.set(cache_key, articles, 60 * 30)

    return articles

def invalider_cache_articles():
    cache.delete('articles_populaires')
    cache.delete_many(['article_1', 'article_2'])
```

### 15.3 Cache de templates

```django
{% load cache %}

{% cache 500 sidebar %}
  {% for article in articles_populaires %}
    <div>{{ article.titre }}</div>
  {% endfor %}
{% endcache %}

{% cache 300 article_detail article.id %}
  <h1>{{ article.titre }}</h1>
  <p>{{ article.contenu }}</p>
{% endcache %}
```

### 15.4 Optimisation des requetes

```python
from django.db.models import Prefetch, Count, Q

class ArticleListView(ListView):
    def get_queryset(self):
        return Article.objects.select_related('auteur', 'categorie') \
            .prefetch_related('tags') \
            .annotate(
                nb_commentaires=Count('commentaires'),
                nb_likes=Count('likes')
            ) \
            .only('titre', 'date_creation', 'auteur__username')

articles = Article.objects.prefetch_related(
    Prefetch(
        'commentaires',
        queryset=Commentaire.objects.filter(approuve=True).select_related('auteur')
    )
)

def liste_articles_optimisee(request):
    articles = Article.objects.select_related('auteur').prefetch_related('tags')
    return render(request, 'blog/liste.html', {'articles': articles})
```

---

## Chapitre 16 - Taches Asynchrones avec Celery

### 16.1 Installation et configuration

```bash
pip install celery
pip install redis
```

```python
# myproject/celery.py
import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')

app = Celery('myproject')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

# settings.py
CELERY_BROKER_URL = 'redis://localhost:6379/0'
CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TIMEZONE = 'Africa/Douala'
```

### 16.2 Taches asynchrones

```python
from celery import shared_task
from django.core.mail import send_mail
from django.contrib.auth.models import User
from .models import Article

@shared_task
def send_newsletter(article_id):
    try:
        article = Article.objects.get(id=article_id)
        users = User.objects.filter(profile__newsletter=True)

        for user in users:
            send_mail(
                subject=f'Nouvel article: {article.titre}',
                message=f'Bonjour {user.first_name},\n\n{article.contenu[:200]}...',
                from_email='newsletter@monblog.com',
                recipient_list=[user.email],
                fail_silently=True,
            )

        return f'Newsletter envoyee a {users.count()} utilisateurs'
    except Article.DoesNotExist:
        return 'Article introuvable'

@shared_task
def generate_sitemap():
    return 'Sitemap genere avec succes'

@shared_task
def cleanup_old_sessions():
    from django.core.management import call_command
    call_command('clearsessions')
    return 'Sessions nettoyees'
```

### 16.3 Utilisation des taches

```python
from .tasks import send_newsletter

def publish_article(request, pk):
    article = get_object_or_404(Article, pk=pk)
    article.statut = 'publie'
    article.save()

    send_newsletter.delay(article.id)

    messages.success(request, "Article publie! Newsletter en cours d'envoi.")
    return redirect('blog:detail', pk=pk)

from celery.schedules import crontab

# settings.py
CELERY_BEAT_SCHEDULE = {
    'cleanup-sessions': {
        'task': 'blog.tasks.cleanup_old_sessions',
        'schedule': crontab(hour=2, minute=0),
    },
    'generate-sitemap': {
        'task': 'blog.tasks.generate_sitemap',
        'schedule': crontab(hour=3, minute=0, day_of_week=1),
    },
}
```

### 16.4 Lancement de Celery

```bash
# Worker
celery -A myproject worker --loglevel=info

# Scheduler
celery -A myproject beat --loglevel=info

# Monitoring
pip install flower
celery -A myproject flower
# http://localhost:5555
```

---

## Chapitre 17 - Securite Avancee

### 17.1 Protection contre les attaques

```python
# settings.py production
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
X_FRAME_OPTIONS = 'DENY'
SECURE_SSL_REDIRECT = True

CSRF_COOKIE_SECURE = True
CSRF_COOKIE_HTTPONLY = True
SESSION_COOKIE_SECURE = True
SESSION_COOKIE_HTTPONLY = True

INSTALLED_APPS = [
    # ...
    'django_ratelimit',
]
```

### 17.2 Rate Limiting

```python
from django_ratelimit.decorators import ratelimit
from django.contrib.auth.decorators import login_required

@ratelimit(key='ip', rate='5/m', method='POST')
def contact_view(request):
    if request.method == 'POST':
        pass
    return render(request, 'contact.html')

@ratelimit(key='user', rate='10/h')
@login_required
def api_endpoint(request):
    return JsonResponse({'data': 'some data'})

from django_ratelimit.exceptions import Ratelimited
from django.http import HttpResponseTooManyRequests

def ratelimited_error(request, exception):
    return HttpResponseTooManyRequests('Trop de requetes. Reessayez plus tard.')
```

### 17.3 Validation et assainissement

```python
import bleach
from django.core.exceptions import ValidationError
import re

def clean_html_content(value):
    allowed_tags = ['p', 'b', 'i', 'u', 'em', 'strong', 'a']
    allowed_attributes = {'a': ['href']}

    cleaned = bleach.clean(
        value,
        tags=allowed_tags,
        attributes=allowed_attributes,
        strip=True,
    )
    return cleaned

def validate_secure_filename(value):
    if not re.match(r'^[a-zA-Z0-9._-]+$', value):
        raise ValidationError('Nom de fichier invalide')
    return value
```

#### Bonnes pratiques - Structure de projet

```text
myproject/
  myproject/
    settings/
      __init__.py
      base.py
      development.py
      production.py
  apps/
    blog/
    accounts/
    api/
  static/
  media/
  templates/
  requirements/
    base.txt
    development.txt
    production.txt
```

### 17.4 Optimisation des requetes

```python
# Eviter N+1
articles = Article.objects.select_related('auteur', 'categorie').all()
articles = Article.objects.prefetch_related('tags').all()

# Limiter les champs
articles = Article.objects.only('titre', 'date_creation')

# Annotations
from django.db.models import Count
articles = Article.objects.annotate(nb_commentaires=Count('commentaires'))
```

### 17.5 Cache et performance

```python
from django.core.cache import cache
from django.views.decorators.cache import cache_page

@cache_page(60 * 15)
def liste_articles(request):
    return render(request, 'blog/liste.html')

def get_articles_populaires():
    articles = cache.get('articles_populaires')
    if articles is None:
        articles = Article.objects.order_by('-vues')[:10]
        cache.set('articles_populaires', articles, 60 * 30)
    return articles
```

### 17.6 Securite

```python
# settings.py
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_HSTS_SECONDS = 31536000

# Validation des entrees
from django.core.exceptions import ValidationError

def clean_phone_number(value):
    import re
    if not re.match(r'^\+?[\d\s\-()]+$', value):
        raise ValidationError('Numero invalide')
    return value
```

---

## Chapitre 18 - Fiche de Revision

### 18.1 Commandes essentielles

Commandes Django indispensables:

- django-admin startproject: nouveau projet
- python manage.py startapp: nouvelle application
- python manage.py makemigrations: creer migrations
- python manage.py migrate: appliquer migrations
- python manage.py runserver: lancer serveur
- python manage.py shell: console Django
- python manage.py createsuperuser: admin
- python manage.py test: tests

### 18.2 Workflow de developpement

1. Creer projet et applications
2. Definir modeles et migrations
3. Configurer l'admin
4. Creer vues et templates
5. Configurer URLs et tester
6. Ajouter authentification si besoin
7. Creer formulaires
8. Ecrire tests unitaires
9. Optimiser et securiser
10. Deployer en production

### 18.3 Patterns Django

Principes fondamentaux:

- DRY: Don't Repeat Yourself
- MTV: Model-Template-View
- Convention over Configuration
- Fat Models, Thin Views
- Explicit is better than implicit

### 18.4 Ressources pour aller plus loin

- Documentation officielle: https://docs.djangoproject.com/
- Django REST Framework: APIs modernes
- Django Channels: WebSockets et temps reel
- Celery: taches asynchrones
- Django CMS: gestion de contenu

### 18.5 Checklist de projet

- Environnement virtuel
- Settings configures
- Modeles avec migrations
- Interface admin
- Vues et URLs
- Templates avec heritage
- Formulaires valides
- Authentification
- Fichiers statiques/medias
- Tests unitaires
- Securite appliquee
- Pret pour production

---

## Chapitre 19 - Conclusion

### 19.1 Recapitulatif

Felicitations! Vous avez maintenant une solide base en Django. Ce guide vous a menes a travers:

- Les fondamentaux: installation, configuration, structure
- Les modeles: gestion des donnees avec l'ORM
- Les vues: logique metier et traitement des requetes
- Les templates: interface utilisateur dynamique
- Les formulaires: interaction et validation
- L'authentification: gestion des utilisateurs
- Le deploiement: mise en production

### 19.2 Prochaines etapes

Pour continuer votre progression:

1. Pratiquez: creez vos propres projets
2. Explorez: Django REST Framework, Channels
3. Optimisez: performance, cache, securite
4. Contribuez: open source, communaute

Message final:

Django est un outil puissant qui grandit avec vos besoins. Commencez simple, puis ajoutez la complexite progressivement. La documentation officielle et la communaute sont vos meilleurs allies.

"Every expert was once a beginner. Every pro was once an amateur. Every icon was once an unknown." - Robin Sharma

Bon developpement avec Django!
