# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Full production build (generates Prisma client, runs migrations, builds Next.js)
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run db:push` - Push Prisma schema changes to database
- `npm run db:generate` - Generate Prisma client
- `npm run db:studio` - Open Prisma Studio for database management
- `npm run db:deploy` - Deploy Prisma migrations

## Architecture Overview

This is a task management application built with Next.js 15 (App Router), NextAuth.js, Prisma ORM, and PostgreSQL. The app follows a feature-based organization pattern.

### Core Technologies

- **Framework**: Next.js 15 with App Router and Turbopack
- **Authentication**: NextAuth.js v5 with Google and GitHub OAuth providers
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS v4
- **UI Components**: Custom components with Radix UI primitives
- **Environment**: T3 Env for type-safe environment variables

### Database Schema

The application centers around a task management system with these main entities:

- **User**: Authentication via OAuth (Google/GitHub)
- **Task**: Core entity with title, description, task type (one_time/recurrent), archive status
- **Project**: Tasks can be organized into projects with colors
- **CalendarEvent**: Tasks can be scheduled with date/time and status (pending/completed)
- **Tag**: Tasks can be tagged for organization

### Key Architecture Patterns

#### Authentication Flow

- NextAuth.js configuration in `src/lib/auth.ts` with Prisma adapter
- Middleware in `src/middleware.ts` handles route protection
- Public routes under `/auth` path, private routes require authentication
- Custom login/error pages at `/auth/login` and `/auth/error`

#### Environment Configuration

- Type-safe environment variables using T3 Env in `src/env.ts`
- Required variables: `DATABASE_URL`, `AUTH_SECRET`, OAuth credentials for Google/GitHub

#### File Structure

- `src/app/` - Next.js App Router pages and API routes
- `src/components/` - Reusable UI components organized by type (ui/, icons/)
- `src/lib/` - Utility libraries (auth, prisma, utils)
- `src/constants/` - Application constants (routes, error types)
- `src/types/` - TypeScript type definitions
- `prisma/` - Database schema and migrations

#### Database Operations

- Prisma client configured in `src/lib/prisma.ts`
- Schema uses PostgreSQL with UUID primary keys
- Cascading deletes ensure data integrity
- Migrations managed through Prisma CLI

## Teaching & Learning Approach

**IMPORTANT**: The user prefers a teaching-focused approach rather than just task completion. Always:

- **Explain before doing**: Describe concepts, patterns, and reasoning before implementing
- **Break down complexity**: Explain complex topics in digestible parts
- **Encourage hands-on learning**: Ask if the user wants to try implementing something themselves first
- **Provide context**: Explain why certain approaches are chosen over alternatives
- **Focus on understanding**: Prioritize helping the user learn over just completing tasks
- **Ask questions**: Check understanding and encourage curiosity

The goal is to be a mentor and teacher, not just a code generator.

## Development Notes

- Uses pnpm as package manager (has pnpm-workspace.yaml)
- Build process automatically runs Prisma generation and migrations
- Authentication redirects are handled by middleware for better UX
- UI components use class-variance-authority (cva) for styling variants
