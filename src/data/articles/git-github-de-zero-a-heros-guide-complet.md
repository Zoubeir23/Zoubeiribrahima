# GIT & GITHUB
## Guide Complet du Developpeur
### De Zero a Heros

> Git n'est pas seulement un outil, c'est une memoire pour votre code et une aile pour votre equipe.
> - Linus Torvalds, createur de Git

**Patrice Neussi** (inspire des guides precedents)
*Developpeur Full-Stack - Universite de Yaounde I*

---

## Table des matieres

**Preface**
**1. Introduction au controle de version**
**2. Installation et configuration**
**3. Premiers pas avec Git**
**4. Explorer l'historique**
**5. Annuler et corriger**
**6. Travailler avec les branches**
**7. Les depots distants (GitHub)**
**8. Collaboration avec GitHub**
**9. Workflows collaboratifs**
**10. Gerer les conflits avances**
**11. Git avance**
**12. Bonnes pratiques et messages de commit**
**13. Securite et cles SSH**
**14. Git en equipe - commandes utiles**
**15. Fiche de revision**
**16. Conclusion**

---

## Preface

Bienvenue dans **Git & GitHub - De Zero a Heros**.

Que vous soyez debutant ou deja un peu familier, ce guide vous donnera les cles pour utiliser Git en toute confiance, seul ou en equipe. Git est aujourd'hui **indispensable** et present sur presque tous les projets professionnels.

Chaque chapitre contient :
- des explications simples,
- des commandes pretes a etre tapees,
- des exercices pratiques,
- des astuces pour eviter les pieges.

> N'ayez pas peur de casser : avec Git, tout peut etre repare.

---

## 1. Introduction au controle de version

### 1.1 Pourquoi Git ?

- **Historique** : conserver toutes les versions de vos fichiers.
- **Collaboration** : plusieurs personnes peuvent travailler ensemble sans s'ecraser.
- **Sauvegarde** : le code est en securite (local + distant).
- **Experimentation** : creer des branches pour tester des idees sans risque.

### 1.2 Centralise vs distribue

- **Centralise** (ex: Subversion) : un serveur central unique.
- **Distribue** (Git) : chaque developpeur possede une copie complete de l'historique.

### 1.3 Git et GitHub : differences

- **Git** : l'outil de versioning.
- **GitHub** : la plateforme d'hebergement de depots Git (PR, issues, CI/CD, etc.).

---

**Exercice 1** : Expliquez en une phrase a un collegue pourquoi Git est utile.

---

## 2. Installation et configuration

### 2.1 Installer Git

- **Windows** : [git-scm.com](https://git-scm.com), puis Git Bash.
- **macOS** : `brew install git` ou installateur officiel.
- **Linux** : `sudo apt install git` (Ubuntu/Debian) ou `sudo dnf install git` (Fedora).

```bash
git --version
```

### 2.2 Configurer nom et email

```bash
git config --global user.name "Votre Nom"
git config --global user.email "votre@email.com"
git config --list
```

### 2.3 Creer un compte GitHub

Allez sur [github.com](https://github.com), creez un compte, puis validez votre email.

---

**Exercice 2** : Installez Git, configurez votre identite et creez un compte GitHub.

---

## 3. Premiers pas avec Git

### 3.1 Initialiser un depot

```bash
mkdir mon-projet
cd mon-projet
git init
```

### 3.2 Premier commit

```bash
echo "# Mon Projet" > README.md
git add README.md
git commit -m "Ajout du README"
```

### 3.3 Cycle de vie des fichiers

- **Untracked**
- **Modified**
- **Staged**
- **Committed**

### 3.4 Commandes de base

```bash
git status
git add <fichier>
git add .
git commit -m "message"
```

---

**Exercice 3** : Initialisez un depot, ajoutez deux fichiers, committez, modifiez un fichier puis verifiez `git status`.

---

## 4. Explorer l'historique

### 4.1 git log

```bash
git log
git log --oneline
git log --graph --oneline
```

### 4.2 git diff

```bash
git diff
git diff --staged
```

### 4.3 git show

```bash
git show <hash-du-commit>
```

---

**Exercice 4** : Faites trois commits, listez-les avec `git log --oneline`, puis inspectez-en un avec `git show`.

---

## 5. Annuler et corriger

### 5.1 Annuler les modifications locales

```bash
git restore <fichier>
```

### 5.2 Desindexer un fichier

```bash
git restore --staged <fichier>
```

### 5.3 git reset

```bash
git reset --soft HEAD~1
git reset --mixed HEAD~1
git reset --hard HEAD~1
```

### 5.4 git revert

```bash
git revert <hash-du-commit>
```

### 5.5 Modifier le dernier commit

```bash
git commit --amend -m "Nouveau message"

git add fichier_oublie
git commit --amend --no-edit
```

---

**Exercice 5** : Modifiez un message de commit avec `--amend`, puis annulez un commit avec `revert`.

---

## 6. Travailler avec les branches

### 6.1 Pourquoi des branches ?

Une branche est une ligne de developpement independante.

### 6.2 Creer, lister, changer

```bash
git branch ma-branche
git branch
git switch ma-branche
git switch -c nouvelle
```

### 6.3 Fusion

```bash
git switch main
git merge ma-branche
```

### 6.4 Conflits

```text
<<<<<<< HEAD
code de la branche courante
=======
code de l'autre branche
>>>>>>> ma-branche
```

Resoudre puis `git add` et `git commit`.

---

**Exercice 6** : Creez une branche, ajoutez un fichier, fusionnez dans `main`, provoquez un conflit et resolvez-le.

---

## 7. Les depots distants (GitHub)

### 7.1 Cloner

```bash
git clone https://github.com/utilisateur/projet.git
```

### 7.2 Ajouter un remote

```bash
git remote add origin https://github.com/votre-compte/mon-projet.git
git remote -v
```

### 7.3 Push

```bash
git push -u origin main
```

### 7.4 Pull et fetch

```bash
git fetch
git pull origin main
```

---

**Exercice 7** : Creez un depot GitHub vide, liez votre depot local, puis poussez votre code.

---

## 8. Collaboration avec GitHub

### 8.1 Forks et pull requests

Workflow : fork -> clone -> branche -> commit -> push -> pull request.

### 8.2 Issues et projets

Les issues servent a suivre bugs et evolutions. Les projects servent au suivi type Kanban.

### 8.3 Review de code

Commentaires ligne par ligne, demandes de changement, approbation.

### 8.4 GitHub Actions (intro)

Workflows YAML dans `.github/workflows/` pour tests/deploiement.

---

**Exercice 8** : Forkez un depot public, modifiez le README et ouvrez une PR.

---

## 9. Workflows collaboratifs

### 9.1 Workflow centralise

Tout le monde pousse sur `main`.

### 9.2 Feature branch workflow

Chaque fonctionnalite sur sa branche, fusion via PR.

### 9.3 Gitflow

Branches `main`, `develop`, `feature/*`, `release/*`, `hotfix/*`.

### 9.4 GitHub Flow

`main` toujours deployable, petite branche, PR, merge.

---

**Exercice 9** : Mettez en place un workflow feature branch sur votre projet.

---

## 10. Gerer les conflits avances

### 10.1 Outils de resolution

- `git mergetool`
- Interface VS Code (Accept Current / Incoming / Both)

### 10.2 Strategies de fusion

```bash
git merge --no-ff ma-branche
git merge --squash ma-branche
```

### 10.3 Rebase vs merge

```bash
git switch feature
git rebase main
```

Ne pas rebase des commits deja publies sur une branche partagee.

---

**Exercice 10** : Simulez un conflit et resolvez-le, puis testez un `rebase`.

---

## 11. Git avance

### 11.1 Stash

```bash
git stash
git stash list
git stash pop
git stash apply
```

### 11.2 Cherry-pick

```bash
git cherry-pick <hash-du-commit>
```

### 11.3 Tags

```bash
git tag v1.0.0
git tag -a v1.0.0 -m "Version 1.0.0"
git push --tags
```

### 11.4 Submodules

```bash
git submodule add https://github.com/.../lib.git
git submodule update --init --recursive
```

---

**Exercice 11** : Utilisez `stash`, puis creez un tag et poussez-le.

---

## 12. Bonnes pratiques et messages de commit

### 12.1 Conventional Commits

Format : `<type>(scope): description`

Exemples :

```bash
git commit -m "feat(auth): ajout de la connexion oauth"
git commit -m "fix(api): correction de la validation email"
```

### 12.2 .gitignore

Exemple :

```text
node_modules/
.env
*.log
__pycache__/
```

### 12.3 Git hooks (intro)

Scripts auto (`pre-commit`, `pre-push`) pour lint/test/format.

---

**Exercice 12** : Creez un `.gitignore` pour un projet Python et verifiez `git status`.

---

## 13. Securite et cles SSH

### 13.1 Generer une cle SSH

```bash
ssh-keygen -t ed25519 -C "votre@email.com"
```

### 13.2 Ajouter la cle a GitHub

```bash
cat ~/.ssh/id_ed25519.pub
```

Puis Settings -> SSH and GPG keys -> New SSH key.

### 13.3 Utiliser SSH au lieu de HTTPS

```bash
git remote set-url origin git@github.com:utilisateur/projet.git
```

---

**Exercice 13** : Generez une cle SSH, ajoutez-la a GitHub, clonez un depot en SSH.

---

## 14. Git en equipe - commandes utiles

### 14.1 git blame

```bash
git blame index.html
```

### 14.2 git bisect

```bash
git bisect start
git bisect bad
git bisect good <hash-connu-bon>
# tester puis marquer good/bad
git bisect reset
```

### 14.3 git reflog

```bash
git reflog
git checkout <hash>
```

---

**Exercice 14** : Simulez un `reset --hard` puis recuperez un commit perdu avec `reflog`.

---

## 15. Fiche de revision

### 15.1 Commandes essentielles

| Commande | Explication |
|----------|-------------|
| `git init` | Creer un depot |
| `git clone <url>` | Copier un depot distant |
| `git status` | Voir l'etat |
| `git add <fichier>` | Indexer |
| `git commit -m "msg"` | Valider |
| `git push` | Envoyer vers distant |
| `git pull` | Recuperer et fusionner |
| `git branch` | Lister les branches |
| `git switch <branche>` | Changer de branche |
| `git merge <branche>` | Fusionner |
| `git log --oneline --graph` | Historique graphique |
| `git stash` | Mettre de cote |
| `git reset --hard` | Annuler des commits (local) |
| `git revert <hash>` | Annuler proprement |
| `git rebase <branche>` | Rebaser |

### 15.2 Workflow type (feature branch)

```bash
git switch -c feature/nouvelle-fonction
# travailler + commits
git push -u origin feature/nouvelle-fonction
# ouvrir une PR
git switch main
git pull
git branch -d feature/nouvelle-fonction
```

### 15.3 Erreurs frequentes

- `detached HEAD` : `git switch -c ma-branche`
- `refusing to merge unrelated histories` : `git pull origin main --allow-unrelated-histories`
- `failed to push some refs` : `git pull --rebase` puis `git push`

---

## 16. Conclusion

### 16.1 Recapitulatif

Vous avez appris :
- depot, commit, branche, remote,
- add/commit/push/pull/merge,
- forks/PR/issues,
- conflits et workflows,
- stash/rebase/cherry-pick/reflog.

### 16.2 Projets pour s'entrainer

1. **Journal de bord** : un commit par jour.
2. **Mini-projet en equipe** : branches, PR, review.
3. **Open source** : corriger une issue `good first issue`.
4. **Automatisation** : ajouter un hook `pre-commit`.

> Un bon developpeur ecrit du code. Un grand developpeur ecrit du code et le versionne correctement.

---

## Connexion SSH entre Git et GitHub - Explication complete

SSH (Secure Shell) permet d'authentifier votre machine aupres de GitHub sans retaper vos identifiants a chaque `push`.

### Pourquoi SSH plutot que HTTPS ?

| HTTPS | SSH |
|-------|-----|
| Token souvent requis | Configuration unique |
| Plus simple au debut | Plus pratique au quotidien |
| Peut demander des prompts frequents | Cle privee locale + cle publique GitHub |

### Etapes rapides

1. Verifier si une cle existe deja :

```bash
ls ~/.ssh/id_ed25519.pub
```

2. Generer une cle :

```bash
ssh-keygen -t ed25519 -C "votre@email.com"
```

3. Lancer l'agent et ajouter la cle :

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

4. Copier la cle publique :

```bash
cat ~/.ssh/id_ed25519.pub
```

5. Ajouter la cle dans GitHub -> Settings -> SSH and GPG keys.

6. Tester :

```bash
ssh -T git@github.com
```

### Utiliser SSH sur un depot existant

```bash
git remote set-url origin git@github.com:utilisateur/mon-projet.git
git remote -v
```

### Depannage

- `Permission denied (publickey)` : verifier cle ajoutee + `ssh-add -l`
- Agent non demarre : `eval "$(ssh-agent -s)"`
- Firewall restrictif : fallback HTTPS

---

**Guide realise par Patrice Neussi (inspiration du style Django)**
*PROPENTATECH - 2025*
📧 propentatech@gmail.com
🌐 www.propentatech.com
