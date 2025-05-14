# Trade Mentor AI - Website Architecture Design

Date: May 07 2025

## 1. Overview

This document outlines the architecture for the Trade Mentor AI platform, a web application designed to assist retail traders. It will feature a Next.js frontend and a Flask backend, focusing on scalability, reliability, and a user experience inspired by platforms like Webull and Robinhood, and the user's previously provided frontend.

## 2. Frontend (Next.js)

Located in `/home/ubuntu/trade_mentor_ai/frontend`.

### 2.1. Project Structure (Key Directories & Files):

*   `src/app/`: Main application routes and page components.
    *   `(tabs)/`: Route group for main navigational tabs to share layout.
        *   `layout.tsx`: Shared layout for tabs, including the BottomNavbar.
        *   `pre-market/page.tsx`: Pre-Market tab content.
        *   `market/page.tsx`: Market tab content (default view).
        *   `post-market/page.tsx`: Post-Market tab content.
        *   `education/page.tsx`: Education tab content.
        *   `leaderboard/page.tsx`: Leaderboard tab content.
        *   `community/page.tsx`: Community tab content.
    *   `auth/`: Authentication-related pages.
        *   `login/page.tsx`: Login page.
        *   `register/page.tsx`: Registration page.
    *   `layout.tsx`: Root layout for the entire application.
    *   `globals.css`: Global styles (Tailwind CSS base).
*   `src/components/`: Reusable UI components.
    *   `layout/`: Layout-specific components.
        *   `BottomNavbar.tsx`: The main navigation component (app-like, at the bottom).
        *   `Header.tsx`: Optional header (if needed for certain views).
    *   `ui/`: Core UI elements (leveraging shadcn/ui, adapted from previous frontend where liked).
    *   `ai/`: AI-specific components.
        *   `AiChatFeed.tsx`: A generic component for displaying AI-driven chat/feed content within tabs.
        *   `TradeIdeaCard.tsx`: Component to display individual AI-generated trade ideas.
    *   `auth/`: Authentication forms (LoginForm, RegistrationForm).
    *   `charts/`: Charting components (e.g., TradingView wrapper).
    *   `features/`: Components for specific features (e.g., TradeLogger, PerformanceTracker).
*   `src/contexts/`: React Context API for global state.
    *   `AuthContext.tsx`: Manages user authentication state.
    *   `AppContext.tsx`: General application state (e.g., selected security, theme).
*   `src/hooks/`: Custom React hooks.
*   `src/lib/`: Utility functions, API client.
    *   `api.ts`: Fetches data from the Flask backend.
    *   `utils.ts`: General utility functions.
*   `public/`: Static assets (images, fonts).
*   `tailwind.config.ts`, `postcss.config.mjs`: Tailwind CSS configuration.
*   `next.config.ts`: Next.js configuration.

### 2.2. Key UI/UX Features:

*   **Bottom Navigation:** As per user preference, implemented in `BottomNavbar.tsx`.
    *   Order: Market (default), Pre-Market, Post-Market, Education, Leaderboard, Community.
*   **Styling:** Tailwind CSS with shadcn/ui, aiming for a visual style similar to the user's previous frontend and inspired by Webull/Robinhood.
*   **AI Chat Integration:** Contextual AI chat feeds within Pre-Market, Market, and Post-Market tabs using `AiChatFeed.tsx`.
*   **Charting:** TradingView library integration for the Market tab.

## 3. Backend (Flask)

Located in `/home/ubuntu/trade_mentor_ai/backend`.

### 3.1. Project Structure (Key Directories & Files):

*   `src/`: Main application code.
    *   `main.py`: Flask application entry point, app configuration, blueprint registration.
    *   `models/`: SQLAlchemy database models.
        *   `user.py`: User model (for authentication).
        *   `trade_log.py`: Model for logged trades.
        *   `security_interest.py`: Model for user's interested securities (optional, for personalization).
    *   `routes/`: API blueprints (endpoints).
        *   `auth.py`: Authentication routes (/register, /login, /logout).
        *   `market_data.py`: Routes for fetching market data, AI trade ideas (interacts with Polygon and LLM).
        *   `trade_logging.py`: Routes for CRUD operations on trade logs.
        *   `user_profile.py`: Routes for user-specific data (e.g., preferences, leaderboard stats).
        *   `ai_mentor.py`: Routes for AI mentor interactions (post-market review, recommendations).
    *   `services/`: Business logic layer.
        *   `llm_service.py`: Handles interaction with the Large Language Model for trade ideas, insights, and mentor conversations.
        *   `market_data_service.py`: Fetches and processes data from Polygon.io.
        *   `auth_service.py`: Handles user authentication logic.
    *   `config.py`: Application configuration (database URI, API keys, etc.).
*   `venv/`: Python virtual environment.
*   `requirements.txt`: Python dependencies.

### 3.2. Database (MySQL - as per Flask template):

*   **User Table:** Stores user credentials, preferences.
*   **TradeLog Table:** Stores details of trades logged by users (symbol, entry/exit price, quantity, P&L, etc.).
*   **Other potential tables:** User Watchlist, AI Recommendations, Community Posts (for future expansion).

### 3.3. API Endpoints (Illustrative):

*   **Auth:**
    *   `POST /auth/register`
    *   `POST /auth/login`
    *   `POST /auth/logout`
    *   `GET /auth/me` (get current user)
*   **Market Tab & AI Ideas:**
    *   `GET /api/market/overview` (general market summary for pre-market)
    *   `GET /api/market/chart-data?symbol=<XYZ>&timespan=<1D>` (for TradingView)
    *   `GET /api/market/trade-ideas?security_type=<stock|option>&symbol=<XYZ>` (LLM-generated, uses Polygon data)
    *   `GET /api/market/ai-thoughts` (stream or polling for in-market AI commentary)
*   **Trade Logging:**
    *   `POST /api/trades` (log a new trade)
    *   `GET /api/trades` (get user's trades)
    *   `PUT /api/trades/<trade_id>`
    *   `DELETE /api/trades/<trade_id>`
*   **Post-Market & AI Mentor:**
    *   `POST /api/mentor/review` (send trades for review, initiate conversation)
    *   `GET /api/mentor/recommendations` (fetch personalized educational content)
*   **Leaderboard:**
    *   `GET /api/leaderboard/my-stats`
    *   `GET /api/leaderboard/community`
*   **Pre-Market:**
    *   `GET /api/premarket/routine?security=<XYZ>`

### 3.4. AI Integration:

*   **LLM Interaction:** `llm_service.py` will abstract calls to an LLM. This service will be responsible for:
    *   Generating trade ideas based on live market data (from `market_data_service.py` using Polygon API key `zWMFnB3iCq6oN5UoAEVE6XjAL6vfcYzf`).
    *   Providing in-market commentary and psychological insights.
    *   Conducting post-market trade reviews.
    *   Generating personalized educational recommendations.
*   **Data Flow for Trade Ideas:** Polygon.io -> `market_data_service.py` -> `llm_service.py` -> API endpoint -> Frontend.

## 4. Data Flow Example (Market Tab - AI Trade Idea):

1.  User navigates to Market tab in Next.js frontend.
2.  Frontend component (e.g., `MarketAiChat.tsx` or a dedicated trade idea component) calls an API endpoint like `GET /api/market/trade-ideas?security_type=stock&symbol=QQQ` via `src/lib/api.ts`.
3.  Flask backend (`market_data.py` route) receives the request.
4.  The route calls `market_data_service.py` to fetch relevant live data for QQQ from Polygon.io.
5.  The route then calls `llm_service.py`, passing the live market data and user query parameters.
6.  `llm_service.py` constructs a prompt for the LLM, sends the request, and receives the generated trade idea.
7.  The Flask route formats the LLM response and sends it back to the Next.js frontend.
8.  Frontend displays the trade idea using `TradeIdeaCard.tsx`.

## 5. User Authentication Flow:

1.  User enters credentials in `LoginForm.tsx` on the frontend.
2.  Frontend sends credentials to `POST /auth/login` on the Flask backend.
3.  Flask backend (`auth_service.py`) validates credentials against the User table in the database.
4.  If valid, a session/token (e.g., JWT) is created and returned to the frontend.
5.  Frontend stores the token (e.g., in localStorage or httpOnly cookie) and updates `AuthContext.tsx`.
6.  Subsequent authenticated API calls from frontend include this token.

## 6. Scalability and Reliability:

*   **Next.js Frontend:** Can be deployed as static assets or on serverless platforms (like Vercel or Cloudflare Pages, as suggested by the `wrangler.toml` in the original code) for high scalability.
*   **Flask Backend:** Can be containerized (Docker) and deployed using scalable solutions like Kubernetes, or on PaaS platforms. Gunicorn will be used as the WSGI server for production.
*   **Database:** Managed MySQL services (e.g., AWS RDS, Google Cloud SQL) offer scalability and reliability.
*   **LLM:** Choice of LLM provider and their API scalability will be a factor.

## 7. Future Considerations:

*   **Native Mobile App:** The API-first approach with a separate Flask backend facilitates future development of native mobile apps that can consume the same APIs.
*   **WebSockets:** For real-time AI thoughts or notifications, WebSockets could be integrated into the Flask backend and Next.js frontend.

This design provides a foundation for building the Trade Mentor AI platform. Specific implementation details will be refined during development.
