# Setup Instructions

---

## Clone Project

```bash
git clone https://github.com/Naridz/movie-management.git
cd movie-management
```

## Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npx prisma migrate deploy
npx prisma generate
npm run dev
```
---

## Backend Setup

```bash
cd frontend
npm i
npm run dev
```
---

## Tech Stack

| Frontend         | Backend                | Database  |
|------------------|------------------------|-----------|
| React.js + TS    | Node.js + TS + Express | SQLite    |
| Tailwind Css     | JWT, Bcrypt            | Prisma    |

---