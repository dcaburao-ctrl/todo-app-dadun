# To-Do List App — MongoDB, Express, React Native & Node.js

## IMPORTANT FIX (read this first)

If "Add" wasn't working before, it was almost certainly `BASE_URL` in
`frontend/src/api/todoApi.js` pointing at the wrong address. This version
now shows the REAL error on screen when something fails (instead of a
generic message), so future problems will be much easier to diagnose.

**Set `BASE_URL` based on how you are running the app right now:**

| How you're testing          | BASE_URL should be                              |
|------------------------------|--------------------------------------------------|
| Web browser (`--web`)        | `http://localhost:5000/api/todos`                |
| Phone, Expo Go               | `http://YOUR-LAPTOP-LAN-IP:5000/api/todos`       |
| Android emulator             | `http://10.0.2.2:5000/api/todos`                 |

Find your laptop's LAN IP with `ipconfig` (look for **IPv4 Address**).
Your phone and laptop must be on the **same Wi-Fi network** for the phone
option to work. Switch this line back to `localhost` whenever you go back
to testing on web — that mismatch is the most common cause of things
silently failing.

## Project structure

```
todo-app/
├── backend/
│   ├── config/db.js
│   ├── models/Todo.js
│   ├── controllers/todoController.js
│   ├── routes/todoRoutes.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── src/
    │   ├── api/todoApi.js        # <-- BASE_URL lives here
    │   ├── components/
    │   │   ├── TodoItem.js
    │   │   └── TodoForm.js
    │   └── pages/
    │       └── HomeScreen.js
    ├── App.js
    ├── app.json
    └── package.json
```

## 1. Backend setup

```powershell
cd backend
npm install
copy .env.example .env
```

Open `.env` and set `MONGO_URI` to your MongoDB connection string (Atlas
or local), with NO leading spaces and starting exactly with `MONGO_URI=`:

```
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@yourcluster.mongodb.net/todoapp?retryWrites=true&w=majority
PORT=5000
```

Start it:

```powershell
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB Connected: ...
```

Test it directly in a browser: `http://localhost:5000/api/todos` should
show `[]`.

## 2. Frontend setup

```powershell
cd frontend
npm install
```

Set `BASE_URL` in `src/api/todoApi.js` per the table above, then:

**For web:**
```powershell
npx expo install react-native-web react-dom @expo/metro-runtime
npx expo start --web
```

**For phone (Expo Go):**
```powershell
npx expo start
```
Scan the QR code with Expo Go. If your phone can't reach your laptop
(common on hotspots/public Wi-Fi that isolate devices), use:
```powershell
npx expo start --tunnel
```

## 3. Using the app

- Type a task and tap **Add**.
- Tap the checkbox to mark complete/incomplete.
- Tap **Delete** to remove a to-do.
- Pull down the list to refresh.
- If anything fails now, the on-screen alert will tell you the real
  reason (e.g. "No response from server at http://..." means BASE_URL or
  the backend is the problem; "Server error 400: Title is required"
  means the request reached the server fine).

## Organization

- **Pages** (`src/pages`) — full screens. `HomeScreen` owns state and API calls.
- **Components** (`src/components`) — reusable, presentation-only pieces
  (`TodoItem`, `TodoForm`) that take data/callbacks as props.
