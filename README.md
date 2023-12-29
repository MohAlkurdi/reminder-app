## Getting Started

clone the project:

```bash
git clone https://github.com/MohAlkurdi/reminder-app.git
```

add your clerk credentials:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

install project dependencies:

```bash
pnpm i
```

migrate the database

```bash
npx prisma db migrate dev
```

run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

### Some screenshots of the app:

<details>
    <summary>Home Screen Dark Mode</summary>
    <img src="https://github.com/MohAlkurdi/reminder-app/assets/64875290/b94f9cee-797a-431a-b240-22d2e124e833"/>
    </details>
    <details><summary>Home Screen Light Mode</summary>
    <img src="https://github.com/MohAlkurdi/reminder-app/assets/64875290/f24f3418-2747-46b6-9c5e-9af85b637b8e"/>
    </details>
    <details><summary>Create a new collection</summary>
    <img src="https://github.com/MohAlkurdi/reminder-app/assets/64875290/282cb183-df50-429b-bba1-074fc126f80a"/>
    </details>
    <details><summary>Edit a task</summary>
    <img src="https://github.com/MohAlkurdi/reminder-app/assets/64875290/fdde4b3f-d62b-4db9-a5e8-713cd2a2e7a7"/>
</details>
