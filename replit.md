# Project Documentation

## Overview

Cryptective AI is a modern crypto and financial services website built with React and Node.js. The platform offers secure crypto asset recovery, smart investment opportunities, and advanced wallet-linking tools. Features a dark theme with blue accents, shield-style icons, and a sleek, secure interface with real-time crypto data widgets.

## System Architecture

**Frontend**: React 19 with TypeScript, Vite build system, Tailwind CSS for styling
**Backend**: Express.js server with TypeScript
**State Management**: TanStack Query for data fetching and caching
**Routing**: Wouter for client-side routing
**Forms**: React Hook Form with Zod validation
**Storage**: In-memory storage (MemStorage) for development
**Theme**: Dark mode with blue accent colors (#00D4FF primary)

## Key Components

**Pages**:
- HomePage: Landing page with hero, features, stats, and crypto widgets
- CryptoRecovery: Asset recovery case submission form
- InvestmentSolutions: Curated investment opportunities display
- WalletLinking: Secure wallet connection interface
- RecoveryReports: Case status tracking and detailed reports
- TradingDashboard: Portfolio monitoring and trading performance
- ContactPage: Support contact form and information
- NotFound: 404 error page with helpful navigation

**Core Components**:
- Navigation: Responsive navbar with logo, menu, and theme toggle
- Footer: Company info, service links, and contact details

## Data Flow

**Client-Server**: REST API with JSON communication
**Data Management**: TanStack Query for caching and synchronization
**Form Handling**: React Hook Form with Zod schema validation
**Real-time Updates**: 30-second intervals for crypto data refresh
**State Persistence**: Theme preferences in localStorage

## External Dependencies

**Production Dependencies**:
- React ecosystem (react, react-dom, @types/react)
- Backend (express, drizzle-orm, drizzle-zod, zod)
- UI/Styling (tailwindcss, lucide-react, react-icons)
- Forms (@hookform/resolvers, react-hook-form)
- Routing (wouter)
- Data fetching (@tanstack/react-query)
- Utilities (clsx, tailwind-merge, nanoid)

**Development Dependencies**:
- Build tools (vite, typescript, @vitejs/plugin-react)
- CSS processing (autoprefixer, postcss)
- Development server (tsx)

## Deployment Strategy

**Development**: Vite dev server with Express backend
**Build Process**: Separate client and server builds
**Hosting**: Configured for Replit deployment
**Environment**: Development and production configurations

## Changelog

```
Changelog:
- June 24, 2025: Complete Cryptective AI website implementation
  ✓ Full-stack React/Express application
  ✓ 7 main pages with responsive design
  ✓ Dark theme with crypto-focused styling
  ✓ Real-time crypto data integration
  ✓ Form handling and validation
  ✓ In-memory data storage
  ✓ Asset recovery case management
  ✓ Investment opportunities display
  ✓ Wallet linking functionality
  ✓ Trading dashboard with portfolio views
  ✓ Contact system with support info
```

## User Preferences

```
Preferred communication style: Simple, everyday language
Project focus: Professional crypto services website
Design preference: Dark theme with blue accents, secure appearance
Contact info: support@cryptective.xyz, +1 (305) 239-4673
```

## Recent Changes

- Implemented complete website structure with all requested pages
- Added real-time crypto data widgets and market information
- Created comprehensive form systems for recovery cases and contact
- Built responsive navigation and footer components
- Integrated dark theme with crypto-focused color scheme
- Set up TypeScript configuration and build system
- Configured development server with hot reloading