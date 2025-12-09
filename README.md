# Forum - Plateforme de Discussion Moderne

Une plateforme de forum complète construite avec Django REST Framework et Next.js, offrant une expérience utilisateur moderne et réactive.

## 🚀 Fonctionnalités

### Authentification & Profils
- ✅ Inscription et connexion des utilisateurs
- ✅ Authentification par token (Django REST Token)
- ✅ Profils utilisateurs personnalisables
- ✅ Upload et affichage d'avatars
- ✅ Gestion du profil (nom, prénom, bio)

### Discussions & Topics
- ✅ Création de nouveaux topics
- ✅ Réponses aux discussions
- ✅ Affichage des auteurs et dates de publication
- ✅ Modification et suppression de ses propres contenus

### Recherche
- ✅ Recherche globale unifiée
- ✅ Recherche de topics par titre et contenu
- ✅ Recherche d'utilisateurs par nom et bio
- ✅ Résultats en temps réel

### Interface Utilisateur
- ✅ Design moderne avec Tailwind CSS
- ✅ Interface responsive (mobile, tablette, desktop)
- ✅ Navbar adaptative selon l'état de connexion
- ✅ Statistiques du forum en temps réel
- ✅ Page d'accueil attractive

## 📋 Prérequis

- Python 3.8+
- Node.js 18+
- npm ou yarn

## 🛠️ Installation

### 1. Cloner le repository

```bash
git clone <votre-repo>
cd Forum
```

### 2. Configuration du Backend (Django)

```bash
# Naviguer vers le dossier backend
cd backend

# Créer un environnement virtuel
python -m venv env

# Activer l'environnement virtuel
# Windows:
env\Scripts\activate
# macOS/Linux:
source env/bin/activate

# Installer les dépendances
pip install -r requirements.txt

# Créer les migrations
python manage.py makemigrations

# Appliquer les migrations
python manage.py migrate

# Créer un superutilisateur (optionnel)
python manage.py createsuperuser

# Lancer le serveur de développement
python manage.py runserver
```

Le backend sera accessible sur `http://localhost:8000`

### 3. Configuration du Frontend (Next.js)

```bash
# Ouvrir un nouveau terminal et naviguer vers le dossier frontend
cd frontend

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Le frontend sera accessible sur `http://localhost:3000`

## 📁 Structure du Projet

```
Forum/
├── backend/                    # Backend Django
│   ├── authentification/       # App d'authentification
│   │   ├── models.py          # Modèle User personnalisé
│   │   ├── serializers.py     # Sérialiseurs User
│   │   ├── views.py           # Vues d'authentification
│   │   └── urls.py            # Routes d'authentification
│   ├── topics/                # App de gestion des topics
│   │   ├── models.py          # Modèles Topic et Reply
│   │   ├── serializers.py     # Sérialiseurs Topic/Reply
│   │   ├── views.py           # Vues CRUD topics
│   │   └── urls.py            # Routes topics
│   ├── search/                # App de recherche
│   │   ├── views.py           # Recherche globale et stats
│   │   └── urls.py            # Routes de recherche
│   ├── backend/               # Configuration Django
│   │   ├── settings.py        # Configuration principale
│   │   └── urls.py            # Routes principales
│   ├── media/                 # Fichiers uploadés (avatars)
│   └── manage.py              # Script de gestion Django
│
├── frontend/                  # Frontend Next.js
│   ├── app/                   # App Router Next.js 13+
│   │   ├── components/        # Composants réutilisables
│   │   │   └── Navbar.tsx     # Barre de navigation
│   │   ├── auth/              # Pages d'authentification
│   │   │   ├── login/         # Page de connexion
│   │   │   └── register/      # Page d'inscription
│   │   ├── topics/            # Pages de topics
│   │   │   ├── page.tsx       # Liste des topics
│   │   │   ├── new/           # Création de topic
│   │   │   └── [id]/          # Détails d'un topic
│   │   ├── profile/           # Page de profil
│   │   ├── search/            # Page de recherche
│   │   ├── api.ts             # Configuration API Axios
│   │   ├── config.ts          # Configuration de l'app
│   │   ├── page.tsx           # Page d'accueil
│   │   └── layout.tsx         # Layout principal
│   ├── public/                # Fichiers statiques
│   └── package.json           # Dépendances Node.js
│
├── .gitignore                 # Fichiers à ignorer par Git
└── README.md                  # Ce fichier
```

## 🔌 API Endpoints

### Authentification (`/api/authentification/`)
- `POST /register/` - Inscription d'un nouvel utilisateur
- `POST /login/` - Connexion d'un utilisateur
- `GET /me/` - Récupérer l'utilisateur connecté
- `PUT|PATCH /profile/` - Mettre à jour le profil

### Topics (`/api/topics/`)
- `GET /` - Liste des topics
- `POST /` - Créer un nouveau topic
- `GET /:id/` - Détails d'un topic
- `PUT|PATCH /:id/` - Modifier un topic
- `DELETE /:id/` - Supprimer un topic
- `GET /:id/replies/` - Réponses d'un topic
- `POST /:id/replies/` - Ajouter une réponse

### Recherche (`/api/search/`)
- `GET /?q=query` - Recherche globale (topics + utilisateurs)
- `GET /stats/` - Statistiques du forum

## 🎨 Technologies Utilisées

### Backend
- **Django** 5.0+ - Framework web Python
- **Django REST Framework** - API REST
- **Django CORS Headers** - Gestion CORS
- **Pillow** - Traitement d'images (avatars)

### Frontend
- **Next.js** 15+ - Framework React
- **React** 19+ - Bibliothèque UI
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utility-first
- **Axios** - Client HTTP

## 🔧 Configuration

### Variables d'Environnement

#### Backend
Créer un fichier `.env` dans le dossier `backend/` :
```env
SECRET_KEY=votre_secret_key_django
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

#### Frontend
Le fichier `app/config.ts` contient la configuration :
```typescript
export const APP_CONFIG = {
  apiUrl: 'http://localhost:8000/api',
  forumName: 'Forum'
};
```

## 📝 Utilisation

### Créer un compte
1. Accédez à `http://localhost:3000`
2. Cliquez sur "Inscription"
3. Remplissez le formulaire
4. Vous serez automatiquement connecté

### Créer un topic
1. Connectez-vous à votre compte
2. Cliquez sur "+ Nouveau" dans la navbar
3. Remplissez le titre et le contenu
4. Cliquez sur "Créer le topic"

### Modifier votre profil
1. Cliquez sur l'icône utilisateur dans la navbar
2. Sélectionnez "Mon Profil"
3. Cliquez sur "Modifier le profil"
4. Mettez à jour vos informations et avatar
5. Enregistrez les modifications

## 🚧 Développement

### Lancer les serveurs de développement

Backend :
```bash
cd backend
python manage.py runserver
```

Frontend :
```bash
cd frontend
npm run dev
```

### Créer des migrations Django
```bash
cd backend
python manage.py makemigrations
python manage.py migrate
```

### Build de production (Frontend)
```bash
cd frontend
npm run build
npm start
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📄 Licence

Ce projet est sous licence MIT.

## 👤 Auteur

Développé avec ❤️ pour la communauté

## 📞 Support

Pour toute question ou problème, veuillez ouvrir une issue sur GitHub.
