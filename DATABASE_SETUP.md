# Database Setup Guide

This project uses Supabase as the database provider and Prisma as the ORM. Follow these steps to set up your development environment:

## 1. Environment Variables

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Get your Supabase connection details:
   - Go to your Supabase project dashboard
   - Click on "Settings" in the sidebar
   - Click on "Database"
   - Find your connection string under "Connection string" > "URI"
   - Copy the connection string and replace the placeholders with your actual values

3. Update your `.env` file with the correct values:
   - Replace `[YOUR-PASSWORD]` with your database password
   - Replace `[YOUR-PROJECT-REF]` with your Supabase project reference
   - Add your Supabase anon key from the API settings

## 2. Database Setup

1. Generate Prisma Client:
```bash
pnpm prisma generate
```

2. Push the schema to your database:
```bash
pnpm prisma db push
```

## 3. Migrations

The migrations are stored in `supabase/migrations/` and will be automatically applied when you deploy to Supabase.

To create a new migration locally:

1. Make changes to your `schema.prisma` file
2. Generate the migration:
```bash
pnpm prisma migrate dev --name your_migration_name
```

## 4. Type Generation

After making changes to your database schema:

1. Update Prisma client:
```bash
pnpm prisma generate
```

2. Update Supabase types:
```bash
pnpm supabase gen types typescript --project-id your-project-id > lib/database.types.ts
```

## Troubleshooting

If you encounter any issues:

1. Verify your connection string in `.env`
2. Ensure Supabase CLI is installed and configured
3. Check if all required dependencies are installed
4. Make sure your Supabase project is running

For more help, refer to:
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Supabase Documentation](https://supabase.com/docs)
