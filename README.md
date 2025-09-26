## Setup Instructions

---

```bash
git clone https://github.com/Naridz/movie-management.git
cd movie-management

```bash
cd backend
npm install
cp .env.example .env
npx prisma migrate deploy
npx prisma generate
npm run dev

---

```bash
cd frontend
npm i
npm run dev

---

## Tech Stack

| Frontend         | Backend                | Database  |
|------------------|------------------------|-----------|
| React.js + TS    | Node.js + TS + Express | SQLite    |
| Tailwind Css     | JWT, Bcrypt            | Prisma    |

---