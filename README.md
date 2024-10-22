# clubhub

# Backend setup and commands
- Install [pipenv](https://pipenv.pypa.io/en/latest/index.html) to manage dependencies.

- Install NodeJS/npm (should already have this from frontend) for Supabase, what we're using for database and authentication.

Commands to run (all should be run in backend directory!):
```
# Run app
pipenv run flask run -port 3000

# Start supabase containers (DB/Auth)
npx supabase start -x vector

# Get supabase API keys, links, etc.
npx supabase status

# Reset DB (for new seed data, schema, etc.)
npx supabase db
```

# Backend architecture
- `app.py`: This is where application initialization code goes, and where you will call your routes functions to register routes/functionality (see `routes/`).
- `routes/`: This is where individual route handlers will be made, and where the bulk of logic and db actions will be done. Each file in this directory has a `XXXRoutes(app: Flask, supabase: Client)` function, and this function contains multiple routes for a single 'concern' (clubs, students, links, etc.).
- `supabase/`: This is where supabase configuration lives. You should be aware of 2 flies:
    - `migrations/20240910200423_initialize.sql`: This is where schema/table definitions are defined.
    - `seed.sql`: This is where seed data is defined.
    