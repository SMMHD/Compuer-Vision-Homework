# PixelForge - Advanced Image Editor

## Overview
PixelForge is an advanced image editing and enhancement platform that provides professional-grade tools for creative image processing. This React frontend offers a modern, high-tech interface for interacting with the backend image processing tools.

## Features

### 🎨 Image Processing Tools
- Professional image filtering capabilities
- Real-time video processing
- 1000+ advanced filters
- Parameter controls for fine-tuning
- Support for multiple image formats

### 📊 Image Processing
- Professional image filtering
- Performance metrics tracking
- Instant preview of effects
- Batch processing capabilities

## Tech Stack

### Frontend
- **React 18** - Modern component-based architecture
- **Tailwind CSS** - Utility-first styling framework
- **Framer Motion** - Smooth animations and micro-interactions
- **Socket.IO Client** - Real-time communication
- **Axios** - HTTP client for API requests
- **React Router** - Client-side routing
- **React Icons** - Vector icons library

### Backend Integration
- Flask API integration
- Real-time WebSocket communication
- Image processing pipeline

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. The application will be available at `http://localhost:3000`

Note: The backend server must be running at `http://localhost:5000` for full functionality.

## Architecture

### Components Structure
```
src/
├── components/           # Reusable UI components
│   ├── Header.js         # Navigation header
│   └── Toast.js          # Notification system
├── pages/               # Page components
│   ├── Home.js          # Landing page
│   └── ImageEditor.js   # Image filtering tools
├── App.js               # Main application component
├── index.js             # Application entry point
└── App.css              # Global styles
```

### Design System
- **Dark Theme**: Cyberpunk-inspired dark interface
- **Neon Accents**: Electric blue (#00f7ff) and magenta (#ff00c8) highlights
- **Glassmorphism**: Frosted glass effect panels
- **Animations**: Smooth transitions and micro-interactions
- **Responsive**: Works on all device sizes

## API Integration

The frontend communicates with the Flask backend through:
- REST API endpoints for image processing
- WebSocket connections for real-time video filtering
- File upload/download functionality

## Key Features

### 1. Image Editor
- 1000+ professional filters
- Real-time preview
- Parameter controls
- Batch processing

### 2. Batch Image Processing
- Multiple image filtering
- Instant filter application
- Performance monitoring
- Bulk processing

## Design Philosophy

### Visual Style
- **Cyberpunk/Arcade Vibe**: Neon colors, glowing effects, futuristic elements
- **Glassmorphism**: Semi-transparent panels with blur effects
- **Dark Mode**: Reduced eye strain, enhanced focus
- **Tech-Focused**: Clean, precise, professional interface

### User Experience
- **Intuitive Navigation**: Clear pathways between features
- **Immediate Feedback**: Visual cues for all interactions
- **Performance Optimized**: Smooth animations and transitions
- **Accessible**: Proper contrast ratios and semantic HTML

## PixelForge Branding
The platform features the "PixelForge" brand identity throughout the UI:
- Distinctive logo with magic wand icon
- Consistent color scheme
- Professional typography
- Cohesive design language

## Animations
Framer Motion powers all UI animations:
- Page transitions
- Component entrance animations
- Interactive hover effects
- Loading states

## Development

### Environment Variables
No environment variables required for basic operation. The frontend connects to the Flask backend at `http://localhost:5000`.

### Scripts
- `npm start` - Start development server
- `npm run build` - Create production build
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (irreversible)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## About PixelForge

PixelForge provides advanced image filtering and enhancement tools for creative professionals. Our platform combines cutting-edge image processing techniques with an intuitive user interface to deliver professional-grade results.