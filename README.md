# Academic Issue Tracking System (AITS)

A web-based platform for managing academic issues. Students can report issues, and academic registrars can review, assign, and resolve them efficiently.

## Project Structure

Academic-Issue-Tracking-System-AITS-/ ├── backend/ Django REST API ├── frontend/ React JS frontend └── README.md


### Clone the Repository

```bash
git clone https://github.com/Chigozieallanie/Academic-Issue-Tracking-System-AITS-.git
cd Academic-Issue-Tracking-System-AITS-

### Backend setup

cd backend
python -m venv env
env\Scripts\activate

pip install -r requirements.txt

python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser

python manage.py runserver
URL: http://localhost:8000

#Frontend Setup
cd ../frontend
npm install
npm start
URL: http://localhost:3000

#API Endpoints
GET /api/issues/ – View all issues

POST /api/issues/ – Submit a new issue

GET /api/users/ – List users

POST /api/assign/ – Assign an issue

#Features

#1.Student issue submission

#2.Registrar review and assignment

#3.RESTful API using Django

#4.Responsive frontend using React

#Tech Stack
#1.Django + Django REST Framework

#2.React + Axios

#3.SQLite (default)

#Contributing 
#1.Fork the repository

#2.Create a branch: git checkout -b feature/your-feature

#3.Commit changes: git commit -m "Add your feature"

#4.Push to GitHub:git push origin feature/your-feature

#5.open a Pull Request