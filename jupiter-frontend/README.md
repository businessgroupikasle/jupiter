# Jupiter Industries - Frontend Application

A responsive web application for **Jupiter Industries**, built with React, Vite, TypeScript, and a unified master stylesheet.

## Features
- **Design Authenticity**: Exact match with the dark navy, industrial white, and vibrant orange theme.
- **Single CSS Architecture**: Complete responsive styling in `src/style.css`.
- **13 Exact Homepage Sections**: Sticky Navbar, Hero with 3-stat strip, Trusted Brands, Explore by Application, 4-step Process flow, Built for Performance, Arunachala Traders Success Story, Machinery in Action video showcase, Industries We Serve, Service Network across India with interactive silhouette map, FAQ accordion, dynamic Enquiry Form, and 4-column Footer.
- **Dedicated Pages**: `/about`, `/products` (with interactive category filter), `/projects`, and `/contact`.
- **Floating WhatsApp Widget** & modal triggers.
- **API Integration**: Connects to the Express & Prisma backend for submitting machinery enquiries.

## Getting Started

### 1. Install Dependencies
```bash
cd jupiter-frontend
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 4. Build for Production
```bash
npm run build
```
