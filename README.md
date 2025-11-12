# FoodWagen

A modern food ordering website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Search for food items
- Add, edit, and delete food items
- View featured meals in a responsive grid layout
- Delivery/Pickup toggle
- Responsive design for mobile, tablet, and desktop
- Form validation with error messages
- Loading states for async operations
- Smooth animations and transitions

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing

Run tests with:
```bash
npm test
```

## Build

Create a production build:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## API Endpoints

The application uses the following mock API endpoints:
- GET `/Food` - Fetch all foods
- GET `/Food?name=[searchParam]` - Search foods by name
- POST `/Food` - Create a new food item
- PUT `/Food/[id]` - Update a food item
- DELETE `/Food/[id]` - Delete a food item

Base URL: `https://6852821e0594059b23cdd834.mockapi.io`

## Project Structure

```
├── app/                 # Next.js app directory
├── components/          # React components
│   ├── Header/         # Header component
│   ├── Hero/           # Hero section with search
│   ├── FeaturedMeals/  # Featured meals grid
│   ├── Footer/         # Footer component
│   └── Modals/         # Modal components
├── lib/                # API service and utilities
├── types/              # TypeScript type definitions
├── styles/             # Global styles
└── __tests__/          # Test files
```

## Technologies Used

- Next.js 14
- TypeScript
- Tailwind CSS
- Axios
- React Testing Library
- Jest




