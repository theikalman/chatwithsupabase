# Chat App with Supabase

This is a chat app to demonstrate how to use Supabase as a Backend. The frontend is using
NextJS with Tailwind.

## Prerequisites

- npm (nodejs)
- Docker/Podman -- For podman, create an alias command to docker: `alias docker=podman`
- Docker compose

Fetch all dependencies: `npm install`

## Run Locally

### Run Supabase Locally

First, we need to run supabase locally, this is done thru docker.

`npx supabase start`

The supabase UI can be accessed at: `http://127.0.0.1:54323`

### Run NextJS Server

```bash
npm run dev
```

### Stop Servers

To stop NextJS server, just press `Ctrl+c` where the command line is attached.

And to stop Supabase server, use command: `npx supabase stop`

