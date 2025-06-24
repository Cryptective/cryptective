# Installation Guide

## Prerequisites

- Node.js 18+ 
- npm or yarn package manager

## Step-by-Step Installation

### 1. Download and Extract
Download the cryptective-ai-website folder and extract it to your desired location.

### 2. Install Dependencies
```bash
cd cryptective-ai-website
npm install
```

### 3. Start Development Server
```bash
npx tsx server/index.ts
```

The server will start on port 5000. Open `http://localhost:5000` in your browser.

## Production Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables
No environment variables are required for basic functionality. The website uses in-memory storage for development.

### Deployment Platforms

**Replit**: Upload the folder and run `npx tsx server/index.ts`
**Vercel**: Connect your repository and deploy
**Netlify**: Upload the dist folder after building
**Any Node.js host**: Upload files and run the server

## Troubleshooting

**Port 5000 in use**: The server will automatically find an available port
**Module not found**: Run `npm install` to install dependencies
**TypeScript errors**: Ensure you have TypeScript installed: `npm install -g typescript`

## File Structure

- `client/` - React frontend application
- `server/` - Express.js backend API
- `shared/` - Shared TypeScript types
- `attached_assets/` - Images and logos
- Configuration files for TypeScript, Tailwind, etc.

## Development

The development server includes:
- Hot reloading for frontend changes
- Auto-restart for backend changes
- TypeScript compilation
- Tailwind CSS processing

For any issues, refer to the contact information in the website or check the project documentation.