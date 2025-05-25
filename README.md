# StockGenius - AI-Powered Stock Analysis Platform

## Overview

StockGenius is a modern, AI-powered stock analysis platform that provides real-time market data, technical analysis, and AI-driven insights to help investors make informed decisions. Built with the MERN stack (MongoDB, Express.js, React, Node.js) and enhanced with advanced features like real-time stock tracking and machine learning-based analysis.

## Features

### User Interface

- 🎨 Modern, responsive design with fluid animations
- 🎨 Multiple theme options with customizable color schemes
- 📱 Mobile-first approach for seamless experience across devices

### Stock Analysis

- 📊 Real-time market data and live stock prices via Finnhub WebSocket
- 📈 Interactive stock charts with multiple timeframes (1min, 5min, 15min, 1D)
- 🔄 Live trade updates and price streaming
- 🤖 AI-powered stock analysis and recommendations
- 🔍 Advanced stock filtering and search capabilities
- ⭐ Personalized watchlists

### Admin Features

- 👥 User management dashboard
- 📊 User analytics and growth metrics
- 🔑 Role-based access control

## Tech Stack

### Frontend

- **React.js** - UI library
- **Redux** - State management
- **Ant Design & Tailwind CSS** - UI components and styling
- **Framer Motion** - Animations
- **Chart.js/TradingView** - Stock charts

### Backend

- **Node.js & Express** - Server framework
- **MongoDB** - Database
- **Redis** - Caching layer
- **JWT** - Authentication
- **Alpha Vantage API** - Stock market data
- **Finnhub WebSocket** - Real-time stock updates

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Redis
- npm or yarn
- Alpha Vantage API key
- Finnhub API key

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/trading-app.git
cd trading-app
```

2. Install dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Environment Setup

Create `.env` files in both backend and frontend directories:

**Backend (.env)**

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
REDIS_URL=your_redis_url
JWT_SECRET=your_jwt_secret
ALPHA_VANTAGE_API_KEY=your_alphavantage_api_key
FINNHUB_API_KEY=your_finnhub_api_key
NODE_ENV=development
```

**Frontend (.env)**

```env
VITE_APP_API_URL=http://localhost:5000/api
VITE_APP_ENVIRONMENT=development
```

4. Start the application

```bash
# Start backend server
cd backend
npm run dev

# Start frontend development server
cd ../frontend
npm run dev
```

## API Endpoints

### Stock Routes

- `GET /api/stocks` - Get all stocks with pagination and filters
- `GET /api/stocks/:symbol/live` - Get live stock data
- `GET /api/stocks/:symbol/candles` - Get candlestick data
- `GET /api/stocks/:symbol/price` - Get current stock price

### Authentication Routes

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Admin Routes

- `GET /api/admin/users` - Get all users (admin only)
- `PUT /api/admin/users/:id/role` - Update user role
- `DELETE /api/admin/users/:id` - Delete user

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Alpha Vantage](https://www.alphavantage.co/) for providing stock market data
- [Finnhub](https://finnhub.io/) for real-time WebSocket data
- [TradingView](https://www.tradingview.com/) for charting libraries
- All open-source libraries used in this project
