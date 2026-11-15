# 🍳 Cookommunity
### A Community for Food Lovers, Home Cooks & Recipe Enthusiasts

<p align="center">
  <strong>Cook. Share. Connect.</strong>
</p>

<p align="center">
  A community-oriented cooking platform built with Django and MySQL, designed to bring food lovers together through recipes, cooking experiences, and shared inspiration.
</p>

<p align="center">
  <a href="https://github.com/yasmansh/cookommunity">
    <img src="https://img.shields.io/badge/GitHub-Repository-181717?logo=github" alt="GitHub"/>
  </a>
  <img src="https://img.shields.io/badge/Python-Backend-blue?logo=python" alt="Python"/>
  <img src="https://img.shields.io/badge/Django-4.1.4-092E20?logo=django" alt="Django"/>
  <img src="https://img.shields.io/badge/MySQL-Database-4479A1?logo=mysql" alt="MySQL"/>
</p>

---

## 📖 About The Project

**Cookommunity** is a cooking-focused community project that aims to create a shared space for people passionate about food, recipes, and culinary experiences.

The project is built around the idea of connecting cooking enthusiasts and providing a foundation for a community-driven food platform.

With a Django-powered backend and a MySQL database, Cookommunity provides the foundation for managing application data, user accounts, and community-related functionality.

Whether you're a home cook, a food enthusiast, or someone looking for culinary inspiration, Cookommunity aims to make sharing food experiences more accessible and engaging.

## ✨ Project Structure

The repository contains the following main components:

| Directory / File | Description |
|---|---|
| `cook/` | Main Django application |
| `cookommunity/` | Django project configuration |
| `frontend/` | Frontend resources |
| `media/` | Media assets |
| `recipe_data/` | Recipe-related data |
| `sql_data/` | SQL-related resources |
| `manage.py` | Django management utility |
| `requirements.txt` | Python dependencies |
| `README.md` | |

## 🛠️ Tech Stack

### Backend
- **Python** – Core programming language
- **Django 4.1.4** – Backend web framework
- **Django REST / Web components:** To be documented according to implemented endpoints.

### Database
- **MySQL** – Relational database
- **mysqlclient** – MySQL database connectivity

### Additional Technologies
- **django-cors-headers** – Cross-Origin Resource Sharing (CORS)
- **JavaScript tooling** – Frontend dependency management

## 🚀  Installation & Setup

Follow these instructions to set up the project locally.

### Prerequisites

Make sure you have the following installed:

- Python
- pip
- MySQL Server
- Git

### 1. Clone the repository

```bash
git clone https://github.com/yasmansh/cookommunity.git

cd cookommunity
```

### 2. Create a virtual environment

```bash
python -m venv venv
```

Activate the environment:

**Windows:**

```bash
venv\Scripts\activate
```

**macOS / Linux:**

```bash
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

Create a `.env` file in the project root:

```env
DJANGO_SECRET_KEY=your-secret-key
DEBUG=True

DB_NAME=cookommunity
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_HOST=localhost
DB_PORT=3306
```

Make sure the Django settings are configured to read these variables.

### 5. Create the database

```sql
CREATE DATABASE cookommunity
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

### 6. Run migrations

```bash
python manage.py migrate
```

### 7. Create an administrator account

```bash
python manage.py createsuperuser
```

### 8. Start the development server

```bash
python manage.py runserver
```

Open:

```text
http://127.0.0.1:8000/
```

## 🔐 Security

Security is an important part of any web application.

Before deploying Cookommunity:

- Store Django's `SECRET_KEY` in environment variables.
- Never expose database credentials.
- Set `DEBUG = False` in production.
- Configure `ALLOWED_HOSTS` properly.
- Restrict CORS origins to trusted domains.
- Keep private keys and sensitive files out of Git.
- Use HTTPS in production.


## 📄 License

No license has currently been specified for this repository.

Please contact the repository owner before reusing or redistributing the code.

Project Repository: [Cookommunity](https://github.com/yasmansh/cookommunity)
