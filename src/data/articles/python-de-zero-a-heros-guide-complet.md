# PYTHON
## Guide Complet du Developpeur
### De Zero a Heros

> "Le code est comme la poesie : chaque mot compte, chaque ligne raconte une histoire."
> - Guido van Rossum, Createur de Python

## Table des matieres

**Preface**  
**1. Introduction a Python**  
**2. Installation et configuration**  
**3. Bases du langage**  
**4. Structures de controle**  
**5. Structures de donnees natives**  
**6. Fonctions**  
**7. Gestion des erreurs et exceptions**  
**8. Fichiers et entrees/sorties**  
**9. Programmation orientee objet**  
**10. Modules et packages**  
**11. La bibliotheque standard**  
**12. Environnements virtuels**  
**13. Tests unitaires**  
**14. Debogage et profiling**  
**15. Fonctions avancees**  
**16. Programmation fonctionnelle**  
**17. Concurrence**  
**18. Travailler avec des APIs**  
**19. Bases de donnees**  
**20. Web scraping**  
**21. Packaging et distribution**  
**22. Bonnes pratiques**  
**23. Fiche de revision**  
**24. Conclusion**

---

## Preface

Bienvenue dans **Python de Zero a Heros**.

Ce guide a ete concu pour vous emmener pas a pas, du premier script jusqu'a la maitrise des concepts avances.
Python est un langage simple, lisible, et extremement puissant.

Notre approche : **pratique, progressive, avec des exercices a chaque chapitre**.

> Un expert a un jour ete debutant. Chaque ligne que vous ecrivez vous rapproche du heros.

---

## 1. Introduction a Python

### 1.1 Pourquoi Python ?

- Simplicite : syntaxe proche de l'anglais
- Polyvalence : web, donnees, IA, automatisation, jeux
- Communaute immense : des milliers de bibliotheques
- Interprete : pas de compilation, test immediat

### 1.2 Histoire et philosophie

Cree par **Guido van Rossum** en 1991.

- Lisible et explicite
- Batteries included (bibliotheque standard riche)
- Un seul moyen evident de faire les choses

### 1.3 Domaines d'application

- Developpement web (Django, Flask)
- Data science (Pandas, NumPy)
- Intelligence artificielle (TensorFlow, PyTorch)
- Automatisation et scripts
- Cybersecurite
- Jeux (Pygame)

---

## 2. Installation et configuration

### 2.1 Installer Python

Rendez-vous sur [python.org](https://python.org) puis telechargez Python 3.12+.

```bash
python --version
# ou
python3 --version
```

### 2.2 Editeurs et environnements

- VS Code (recommande)
- PyCharm
- IDLE

### 2.3 Premier script

Creez `hello.py` :

```python
print("Bonjour, monde !")
```

Executez :

```bash
python hello.py
```

**Exercice 1** : Ecrivez un script qui affiche votre nom et votre age.

---

## 3. Bases du langage

### 3.1 Variables et types simples

```python
age = 25
prix = 19.99
nom = "Alice"
est_majeur = True

x = 10
x = "texte"
```

### 3.2 Entrees / sorties

```python
nom = input("Quel est ton nom ? ")
print("Bonjour", nom)
print(f"Tu t'appelles {nom}")
```

### 3.3 Operateurs

- Arithmetiques : `+`, `-`, `*`, `/`, `//`, `%`, `**`
- Comparaisons : `==`, `!=`, `<`, `>`, `<=`, `>=`
- Logiques : `and`, `or`, `not`

### 3.4 Commentaires

```python
# Ceci est un commentaire

"""
Commentaire
multi-lignes
"""
```

**Exercice 2** : Ecrivez un programme qui demande deux nombres et affiche leur somme.

---

## 4. Structures de controle

### 4.1 Conditionnelles

```python
age = int(input("Age : "))

if age < 18:
    print("Mineur")
elif age < 65:
    print("Adulte")
else:
    print("Senior")
```

### 4.2 Boucle for

```python
fruits = ["pomme", "banane", "orange"]
for fruit in fruits:
    print(fruit)

for i in range(5):
    print(i)
```

### 4.3 Boucle while

```python
i = 0
while i < 5:
    print(i)
    i += 1
```

### 4.4 break, continue, else

```python
for i in range(10):
    if i == 3:
        continue
    if i == 7:
        break
    print(i)
else:
    print("Boucle terminee sans break")
```

**Exercice 3** : Affichez les nombres pairs de 1 a 20.

---

## 5. Structures de donnees natives

### 5.1 Listes

```python
ma_liste = [1, 2, 3, "quatre"]
print(ma_liste[0])
ma_liste.append(5)
ma_liste.remove(2)
sous_liste = ma_liste[1:3]
```

### 5.2 Tuples

```python
point = (10, 20)
x, y = point
```

### 5.3 Dictionnaires

```python
personne = {
    "nom": "Alice",
    "age": 30
}
print(personne["nom"])
personne["ville"] = "Paris"
```

### 5.4 Ensembles (set)

```python
couleurs = {"rouge", "vert", "bleu"}
couleurs.add("rouge")
```

### 5.5 Comprehensions

```python
carres = [x**2 for x in range(10)]
carres_dict = {x: x**2 for x in range(5)}
```

**Exercice 4** : Creez une liste de 10 entiers, puis affichez la somme, le max et le min.

---

## 6. Fonctions

### 6.1 Definir et appeler

```python
def dire_bonjour(nom):
    """Affiche un bonjour personnalise"""
    print(f"Bonjour {nom}")

dire_bonjour("Alice")
```

### 6.2 Parametres et arguments

```python
def saluer(nom, message="Bonjour"):
    print(f"{message}, {nom}")

saluer("Bob")
saluer("Bob", message="Salut")
```

### 6.3 Valeur de retour

```python
def addition(a, b):
    return a + b

resultat = addition(3, 5)
```

### 6.4 Portee des variables

- Variable globale : definie hors fonction
- Variable locale : definie a l'interieur
- `global` pour modifier une globale (a eviter si possible)

### 6.5 Fonctions lambda

```python
carre = lambda x: x**2
print(carre(5))
```

**Exercice 5** : Ecrivez une fonction `est_pair(n)` qui retourne `True` si `n` est pair.

---

## 7. Gestion des erreurs et exceptions

### 7.1 Try / except

```python
try:
    nombre = int(input("Entrez un entier : "))
    print(10 / nombre)
except ValueError:
    print("Ce n'est pas un entier valide.")
except ZeroDivisionError:
    print("Division par zero impossible.")
```

### 7.2 Finally et else

```python
try:
    fichier = open("data.txt")
except FileNotFoundError:
    print("Fichier manquant")
else:
    print("Fichier ouvert avec succes")
finally:
    print("Ce bloc s'execute toujours")
```

### 7.3 Lever des exceptions

```python
def set_age(age):
    if age < 0:
        raise ValueError("L'age ne peut pas etre negatif")
    return age
```

**Exercice 6** : Demandez deux nombres et gerez la division par zero.

---

## 8. Fichiers et entrees/sorties

### 8.1 Lecture et ecriture

```python
with open("test.txt", "w") as f:
    f.write("Ligne 1\nLigne 2")

with open("test.txt", "r") as f:
    contenu = f.read()
    print(contenu)

with open("test.txt") as f:
    for ligne in f:
        print(ligne.strip())
```

### 8.2 Gestionnaire de contexte with

Garantit la fermeture automatique du fichier.

### 8.3 JSON, CSV

```python
import json, csv

data = {"nom": "Alice", "age": 30}
with open("data.json", "w") as f:
    json.dump(data, f)

with open("data.json") as f:
    data2 = json.load(f)

with open("data.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["nom", "age"])
    writer.writerow(["Alice", 30])
```

**Exercice 7** : Lisez un fichier CSV de notes et calculez la moyenne.

---

## 9. Programmation orientee objet

### 9.1 Classes et objets

```python
class Personne:
    def __init__(self, nom, age):
        self.nom = nom
        self.age = age

    def se_presenter(self):
        print(f"Je suis {self.nom}, j'ai {self.age} ans.")

p = Personne("Alice", 30)
p.se_presenter()
```

### 9.2 Attributs et methodes

- `self` = reference a l'instance courante
- Attributs d'instance : propres a chaque objet
- Attributs de classe : partages

### 9.3 Heritage et polymorphisme

```python
class Etudiant(Personne):
    def __init__(self, nom, age, ecole):
        super().__init__(nom, age)
        self.ecole = ecole

    def se_presenter(self):
        super().se_presenter()
        print(f"J'etudie a {self.ecole}")
```

### 9.4 Methodes speciales

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"({self.x}, {self.y})"

    def __add__(self, other):
        return Point(self.x + other.x, self.y + other.y)
```

### 9.5 Proprietes et encapsulation

```python
class Cercle:
    def __init__(self, rayon):
        self._rayon = rayon

    @property
    def rayon(self):
        return self._rayon

    @rayon.setter
    def rayon(self, valeur):
        if valeur < 0:
            raise ValueError("Rayon positif")
        self._rayon = valeur
```

**Exercice 8** : Creez une classe `CompteBancaire` avec solde, depot, retrait et affichage.

---

## 10. Modules et packages

### 10.1 Importer des modules

```python
import math
print(math.sqrt(16))

from datetime import datetime
print(datetime.now())

import os as system_os
```

### 10.2 Creer un module

Creez `mon_module.py` :

```python
def dire_bonjour():
    print("Bonjour depuis mon module")
```

Utilisation :

```python
import mon_module
mon_module.dire_bonjour()
```

### 10.3 Packages et __init__.py

```text
mon_package/
    __init__.py
    module_a.py
    module_b.py
```

### 10.4 if __name__ == "__main__"

Permet d'executer du code seulement si le fichier est lance directement.

**Exercice 9** : Creez un package `calculs` contenant `addition` et `multiplication`.

---

## 11. La bibliotheque standard

### 11.1 os, sys, shutil

```python
import os
print(os.getcwd())
os.mkdir("nouveau_dossier")

import sys
print(sys.argv)
```

### 11.2 datetime, time

```python
from datetime import datetime, timedelta
maintenant = datetime.now()
demain = maintenant + timedelta(days=1)

import time
time.sleep(2)
```

### 11.3 random, math, statistics

```python
import random
print(random.randint(1, 10))

import math
print(math.pi, math.factorial(5))

import statistics
notes = [12, 15, 18, 10]
print(statistics.mean(notes))
```

### 11.4 re (expressions regulieres)

```python
import re
if re.search(r"\d+", "Il a 25 ans"):
    print("Nombre trouve")
```

### 11.5 collections, itertools

```python
from collections import Counter
compteur = Counter("abracadabra")
print(compteur)

from itertools import permutations
print(list(permutations([1, 2, 3])))
```

**Exercice 10** : Ecrivez un script qui genere un mot de passe aleatoire de 12 caracteres.

---

## 12. Environnements virtuels

### 12.1 venv

```bash
python -m venv monenv
source monenv/bin/activate
# Windows : monenv\Scripts\activate
```

### 12.2 pip et requirements.txt

```bash
pip install requests pandas
pip freeze > requirements.txt
pip install -r requirements.txt
```

**Exercice 11** : Creez un environnement virtuel, installez `requests`, puis ecrivez un script HTTP simple.

---

## 13. Tests unitaires

### 13.1 unittest

```python
import unittest

def addition(a, b):
    return a + b

class TestCalculs(unittest.TestCase):
    def test_addition(self):
        self.assertEqual(addition(2, 3), 5)
        self.assertEqual(addition(-1, 1), 0)

if __name__ == "__main__":
    unittest.main()
```

```bash
python -m unittest test_calculs.py
```

### 13.2 pytest

```bash
pip install pytest
```

```python
def test_addition():
    assert 2 + 2 == 4
```

### 13.3 Couverture de code

```bash
pip install coverage
coverage run -m pytest
coverage report
```

**Exercice 12** : Testez une fonction `factorielle(n)` avec `unittest`.

---

## 14. Debogage et profiling

### 14.1 pdb

```python
import pdb

def buggy(x):
    pdb.set_trace()
    return x / 0
```

Commandes : `n`, `c`, `q`, `p variable`.

### 14.2 logging

```python
import logging
logging.basicConfig(level=logging.INFO)
logging.info("Demarrage du programme")
logging.error("Une erreur est survenue")
```

### 14.3 cProfile

```bash
python -m cProfile mon_script.py
```

---

## 15. Fonctions avancees

### 15.1 Decorateurs

```python
def chronometre(func):
    import time
    def wrapper(*args, **kwargs):
        debut = time.time()
        resultat = func(*args, **kwargs)
        fin = time.time()
        print(f"{func.__name__} a pris {fin - debut:.2f}s")
        return resultat
    return wrapper

@chronometre
def longue_fonction():
    sum(range(1000000))
```

### 15.2 Generateurs (yield)

```python
def compte_a_rebours(n):
    while n > 0:
        yield n
        n -= 1

for x in compte_a_rebours(5):
    print(x)
```

### 15.3 Gestionnaire de contexte personnalise

```python
from contextlib import contextmanager

@contextmanager
def ouvrir_fichier(nom, mode):
    f = open(nom, mode)
    yield f
    f.close()
```

**Exercice 13** : Ecrivez un decorateur qui repete une fonction 3 fois.

---

## 16. Programmation fonctionnelle

### 16.1 map, filter, reduce

```python
nombres = [1, 2, 3, 4, 5]

carres = list(map(lambda x: x**2, nombres))
pairs = list(filter(lambda x: x % 2 == 0, nombres))

from functools import reduce
somme = reduce(lambda a, b: a + b, nombres)
```

### 16.2 Comprehensions avancees

```python
matrice = [[1, 2], [3, 4]]
aplatie = [x for ligne in matrice for x in ligne]
```

---

## 17. Concurrence

### 17.1 Threading

```python
import threading
import time

def afficher_message(msg):
    time.sleep(1)
    print(msg)

t = threading.Thread(target=afficher_message, args=("Hello",))
t.start()
t.join()
```

### 17.2 Asyncio

```python
import asyncio

async def dire_bonjour():
    await asyncio.sleep(1)
    print("Bonjour")

async def main():
    await asyncio.gather(dire_bonjour(), dire_bonjour())

asyncio.run(main())
```

### 17.3 concurrent.futures

```python
from concurrent.futures import ThreadPoolExecutor

def carre(x):
    return x * x

with ThreadPoolExecutor() as executor:
    resultats = executor.map(carre, range(10))
```

**Exercice 14** : Telechargez 5 URLs en parallele avec `ThreadPoolExecutor`.

---

## 18. Travailler avec des APIs

### 18.1 requests

```bash
pip install requests
```

```python
import requests

response = requests.get("https://api.github.com/users/octocat")
if response.status_code == 200:
    data = response.json()
    print(data["login"])
```

### 18.2 JSON et authentification

```python
payload = {"title": "foo", "body": "bar"}
response = requests.post("https://jsonplaceholder.typicode.com/posts", json=payload)
```

### 18.3 Exemple complet

```python
import requests

API_KEY = "votre_cle"
url = f"https://api.openweathermap.org/data/2.5/weather?q=Paris&appid={API_KEY}"
r = requests.get(url)
print(r.json()["main"]["temp"])
```

**Exercice 15** : Affichez le prix actuel du Bitcoin via une API publique.

---

## 19. Bases de donnees

### 19.1 sqlite3

```python
import sqlite3

conn = sqlite3.connect("exemple.db")
c = conn.cursor()

c.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, nom TEXT)")
c.execute("INSERT INTO users (nom) VALUES (?)", ("Alice",))
conn.commit()

c.execute("SELECT * FROM users")
print(c.fetchall())

conn.close()
```

### 19.2 ORM avec SQLAlchemy (introduction)

```python
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String)

engine = create_engine("sqlite:///exemple.db")
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)
session = Session()

session.add(User(name="Bob"))
session.commit()
```

**Exercice 16** : Creez `notes.db` avec table `etudiants` (id, nom, note), ajoutez 3 etudiants, puis affichez la moyenne.

---

## 20. Web scraping

### 20.1 BeautifulSoup

```bash
pip install beautifulsoup4 requests
```

### 20.2 requests et parsing

```python
import requests
from bs4 import BeautifulSoup

url = "https://example.com"
response = requests.get(url)
soup = BeautifulSoup(response.text, "html.parser")

titres = soup.find_all("h2")
for titre in titres:
    print(titre.text.strip())
```

**Exercice 17** : Extrayez tous les liens d'une page web.

---

## 21. Packaging et distribution

### 21.1 setuptools

Creez `setup.py` :

```python
from setuptools import setup, find_packages

setup(
    name="mon_paquet",
    version="0.1",
    packages=find_packages(),
    install_requires=["requests"],
    entry_points={
        "console_scripts": [
            "mon-commande = mon_module.main:main",
        ],
    },
)
```

Installation locale :

```bash
pip install .
```

### 21.2 PyPI

```bash
pip install twine
python setup.py sdist
twine upload dist/*
```

---

## 22. Bonnes pratiques

### 22.1 PEP 8

- 4 espaces par niveau
- Maximum 79 caracteres par ligne
- `snake_case` pour variables/fonctions, `CamelCase` pour classes

### 22.2 Docstrings

```python
def multiplier(a, b):
    """Retourne le produit de a et b.

    Args:
        a (int): premier nombre
        b (int): deuxieme nombre

    Returns:
        int: produit
    """
    return a * b
```

### 22.3 Typage (Type Hints)

```python
def addition(a: int, b: int) -> int:
    return a + b
```

```bash
pip install mypy
mypy mon_script.py
```

---

## 23. Fiche de revision

### 23.1 Commandes essentielles

| Commande | Utilite |
|----------|---------|
| `python script.py` | Executer un script |
| `python -m venv env` | Creer un environnement virtuel |
| `pip install paquet` | Installer un paquet |
| `pip freeze > requirements.txt` | Exporter les dependances |
| `python -m unittest` | Lancer les tests |
| `pytest` | Lancer pytest |
| `coverage run -m pytest` | Mesurer la couverture |

### 23.2 Snippets frequents

**Lire un fichier**

```python
with open("fichier.txt") as f:
    contenu = f.read()
```

**Parcourir un dictionnaire**

```python
for cle, valeur in mon_dict.items():
    print(cle, valeur)
```

**Comprehension de liste**

```python
pairs = [x for x in range(20) if x % 2 == 0]
```

**Lever une exception**

```python
raise ValueError("Message d'erreur")
```

### 23.3 Workflow type

1. Creer un dossier et un environnement virtuel
2. Ecrire le code dans des modules / packages
3. Ajouter des tests unitaires
4. Utiliser `logging` plutot que `print`
5. Taper le code avec `mypy`
6. Gerer les dependances avec `requirements.txt`
7. Versionner avec Git

---

## 24. Conclusion

### 24.1 Recapitulatif

Felicitations. Vous avez parcouru :

- Les bases : variables, conditions, boucles
- Les structures de donnees : listes, dicts, sets
- Les fonctions, POO, modules
- Les entrees/sorties fichiers et JSON
- Les tests, debogage, performance
- La concurrence, les APIs, bases de donnees
- Le packaging et les bonnes pratiques

### 24.2 Prochaines etapes

- Projets concrets : un jeu, un scraper, un bot Discord, une API Flask
- Specialisations : data science, web, IA
- Contribuer a l'open source
- Explorer la documentation officielle : [docs.python.org](https://docs.python.org)

> Un heros n'est pas ne, il est construit, une ligne de code a la fois.
