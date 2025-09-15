<!-- # Frontend
Her kan du placere filerne til din frontend -->

npm install react-router-dom
cp .env.example .env


## cd frontend
npm i
npm run dev

## cd backend
npm i
npm run dev
cp .env.example .env
npx prisma migrate dev
npx prisma db seed