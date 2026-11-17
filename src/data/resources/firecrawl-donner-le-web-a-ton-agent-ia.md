## À quoi ça sert

Un agent IA qui doit chercher une information en ligne bute vite : pages en JavaScript, publicités, protections, résultats trop longs. Firecrawl se présente comme « l'API de contexte pour les agents IA » : elle cherche sur le web, transforme une page en texte propre (Markdown, JSON structuré, captures d'écran) et peut même interagir avec une page. Le projet est libre (licence AGPL-3.0) et existe aussi en service hébergé sur firecrawl.dev.

Les trois fonctions de base :

| Fonction | Ce qu'elle fait |
|---|---|
| **Search** | Cherche sur le web et renvoie le contenu complet des résultats |
| **Scrape** | Convertit une adresse en Markdown, HTML, capture d'écran ou JSON structuré |
| **Interact** | Lit une page, puis agit dessus avec une consigne en langage normal ou du code |

Et d'autres, pour aller plus loin :

| Fonction | Ce qu'elle fait |
|---|---|
| **Crawl** | Lit toutes les pages d'un site en une seule requête |
| **Map** | Liste instantanément toutes les adresses d'un site |
| **Batch Scrape** | Lit des milliers d'adresses de façon asynchrone |
| **Parse** | Transforme des PDF, des fichiers Word et d'autres documents en Markdown ou en JSON |
| **Agent** | Tu décris ce que tu cherches, l'agent trouve les pages et récupère les données, sans que tu donnes d'adresses |
| **Monitor** | Te prévient quand le contenu d'un site change |

Le projet vante une couverture de 96 % du web et un délai de 3,4 secondes pour 95 % des pages : ce sont ses propres chiffres, à prendre comme tels.

## 1. Obtenir une clé

Crée un compte sur firecrawl.dev pour obtenir une clé d'API (elle commence par `fc-`). Un terrain d'essai en ligne permet de tester sans écrire de code. Garde ta clé dans une variable d'environnement et ne la colle jamais dans un fichier du dépôt de code.

## 2. Premiers essais

**Avec curl**, lire une page :

```bash
curl -X POST 'https://api.firecrawl.dev/v2/scrape' \
  -H "Authorization: Bearer $FIRECRAWL_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{"url": "firecrawl.dev"}'
```

**Avec Python.** Installe le SDK, puis lis une page, cherche, ou parcours un site en limitant le nombre de pages :

```bash
pip install firecrawl
```

```python
from firecrawl import Firecrawl

app = Firecrawl(api_key="fc-TA_CLE")

doc = app.scrape("https://firecrawl.dev", formats=["markdown"])
print(doc.markdown)

results = app.search("outils de données pour l'IA", limit=10)

docs = app.crawl("https://docs.firecrawl.dev", limit=50)
```

Le SDK Node.js s'installe avec `npm install firecrawl`, et le projet fournit aussi des SDK pour Go, Java, Elixir, Rust, Ruby, .NET et PHP. Les SDK attendent eux-mêmes la fin des opérations longues.

**En ligne de commande :**

```bash
firecrawl scrape https://firecrawl.dev
firecrawl search "firecrawl" --limit 5
```

Pour connaître les pages d'un site avant de les lire, la fonction Map renvoie la liste des adresses, et elle peut les classer par pertinence avec un mot-clé (par exemple `pricing`).

## 3. Brancher Firecrawl à ton agent

**Avec le skill.** Une commande installe la ligne de commande et le skill pour ton agent. Redémarre ensuite l'agent. Cela fonctionne avec Claude Code, Antigravity, OpenCode et d'autres :

```bash
npx -y firecrawl-cli@latest init --all --browser
```

Cette commande télécharge et exécute un programme sur ta machine : elle installe ce qui lui est demandé par l'option `--all`. Lis la documentation de la ligne de commande avant de la lancer, comme pour tout outil qui modifie ta configuration.

**Avec MCP.** Pour un client compatible MCP, ajoute ce bloc à sa configuration, avec ta clé :

```json
{
  "mcpServers": {
    "firecrawl-mcp": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "fc-TA_CLE"
      }
    }
  }
}
```

Le dépôt tient aussi un catalogue de skills, qui s'installe avec `npx skills add firecrawl/skills`. Une fois branché, parle à ton agent normalement :

```text
Cherche sur le web les trois articles les plus récents sur le sujet X, lis-les
en entier avec Firecrawl et fais-moi un résumé avec les liens des sources.
```

```text
Liste les pages du site exemple.com avec Firecrawl, garde celles qui parlent
des tarifs et compare leurs offres dans un tableau.
```

## 4. L'héberger chez toi

Tu peux faire tourner Firecrawl toi-même avec Docker Compose. Récupère le code :

```bash
git clone https://github.com/firecrawl/firecrawl.git
```

Puis suis le guide d'auto-hébergement officiel, qui va jusqu'au premier test réussi. Quelques points à connaître avant de commencer :

- **Prends une version précise**, pas la branche principale : les images peuvent changer indépendamment. Relis le fichier Compose de la version choisie.
- **L'API est sans authentification par défaut.** Ne l'ouvre pas sur Internet sans avoir mis en place une authentification complète, du TLS et des règles réseau.
- **Rien n'est conservé par défaut.** Le fichier Compose ne définit pas de volumes persistants pour les files de tâches : prévois sauvegarde et reprise si tu veux garder les données.
- **Les fonctions qui utilisent l'IA demandent un fournisseur de modèle** : OpenAI, une API compatible OpenAI, ou Ollama.
- **Alexandria n'y est pas incluse.** Ce service de plus de 400 sources de données fonctionne avec la version hébergée.
- **Tu portes la responsabilité** de la sécurité, de la disponibilité, des mises à jour et de la conservation des données.

## Précautions

- **Respecte les sites que tu lis.** Le projet l'écrit clairement : c'est la seule responsabilité des utilisateurs de respecter les politiques des sites. Par défaut, Firecrawl respecte le fichier robots.txt. Lis les conditions d'utilisation, et n'extrais pas de données personnelles sans base légale.
- **Fixe toujours une limite** (`limit`) quand tu parcours un site : chaque page lue consomme des crédits sur le service hébergé, et une exploration sans limite peut coûter cher et surcharger le site visé.
- **Interact et Agent agissent à ta place.** Sur un site marchand ou un compte connecté, ne laisse pas l'agent valider un achat ou envoyer un message sans ta confirmation. C'est mon conseil, pas celui du dépôt.
- **Les tarifs évoluent.** Consulte la page de prix sur firecrawl.dev avant de t'engager.
- **Licence.** L'essentiel du projet est sous AGPL-3.0 : tu peux l'héberger et le modifier, mais si tu proposes une version modifiée comme service en ligne, tu dois en publier le code. Les SDK et certains éléments d'interface sont sous licence MIT.

Source : [github.com/firecrawl/firecrawl](https://github.com/firecrawl/firecrawl)
