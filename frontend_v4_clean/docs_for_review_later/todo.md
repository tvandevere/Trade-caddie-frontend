# Trade Mentor AI Website Development Checklist

## Phase 1: Initial Setup and Review

- [x] **Task 1: Clarify User Requirements.** (Completed)
- [x] **Task 2: Receive and Acknowledge Business Description.** (Completed)
- [x] **Task 3: Review and Analyze Provided Frontend Code.**
    - [x] Unzip the `trade_mentor_ai_frontend_src_v2.zip` file.
    - [x] Examine the directory structure and identify main components (HTML, CSS, JS files).
    - [x] Note down UI elements, styling, and layout for later reference (especially elements the user liked).
    - [x] Identify any immediate errors, deprecated practices, or compatibility issues with a Next.js/Flask architecture.
    - [x] Document findings from the code review. (Saved to /home/ubuntu/frontend_review_notes.md)
- [x] **Task 4: Set up Fresh Project Environment.**
    - [x] Create a root project directory `trade_mentor_ai`.
    - [x] Initialize a Next.js frontend project within `trade_mentor_ai/frontend`.
    - [x] Initialize a Flask backend project within `trade_mentor_ai/backend`.

## Phase 2: Design and Core Structure Implementation

- [x] **Task 5: Design Overall Website Architecture.**
    - [x] Define API endpoints for Flask backend based on frontend needs. (Covered in website_architecture_design.md)
    - [x] Plan data flow between frontend and backend. (Covered in website_architecture_design.md)
    - [x] Design database schema (if applicable, for user auth, trade logs, etc. - TBD based on LLM integration for ideas). (Initial schema for auth covered in website_architecture_design.md)
- [x] **Task 6: Implement User Authentication (Deferred - Using Mocked System).**
    - [x] Set up registration and login pages in Next.js. (Components created: LoginForm.tsx, RegistrationForm.tsx; Pages created: /auth/login/page.tsx, /auth/register/page.tsx)
    - [x] Implement backend authentication logic in Flask. (Models, services, routes created and main.py updated - *Currently inaccessible publicly*)
    - [x] Integrate AuthContext in Next.js. (AuthContext.tsx created and integrated in RootLayout - *Will be adapted for mocked user*)
    - [x] Create API client for frontend-backend communication. (api.ts created - *Will be adapted for mocked data or local calls if backend remains inaccessible*)
    - [x] Add ThemeProvider to root layout.
    - [x] Ensure dark/light mode works correctly.
    - [x] Fix logo visibility and path.
    - [x] Update tab order in navigation.
    - [x] Modify logo to icon-only.
    - [x] Update app name and tagline in header.
- [x] **Task 7: Implement Main Navigation and Tab Structure (Next.js).**
    - [x] Create the bottom navigation bar. (BottomNavbar.tsx created)
    - [x] Create page components for: Pre-Market, Market (default), Post-Market, Education, Leaderboard, Community. (Placeholder pages created within (tabs) route group with shared layout)

## Phase 3: Core Feature Implementation (with Mocked User System)

- [~] **Task 8: Implement Pre-Market Tab Features (Mocked User).**
    - [x] AI-driven routine interaction placeholder (mocked interaction).
    - [x] Market overview display placeholder (mocked data).
- [~] **Task 9: Implement Market Tab Features (Mocked User).**
    - [x] Integrate TradingView charting library (or alternative if issues arise).
    - [x] Develop UI for AI Trade Ideas (stock/option toggle, security input) (mocked ideas).
    - [x] Implement feed for In-Market AI Thoughts (mocked thoughts).
    - [x] Implement trade logging form and display (mocked storage).
- [~] **Task 10: Implement Post-Market Tab Features (Mocked User).**
    - [x] UI for AI mentor conversation (mocked conversation).
    - [x] UI for displaying personalized recommendations (mocked recommendations).
- [~] **Task 11: Implement Leaderboard Tab Features (Mocked User).**
    - [x] UI for performance tracking (P&L, avg gain/loss) (mocked data).
    - [x] UI for community comparison (placeholder for now).
- [~] **Task 12: Implement Community Tab Features (Mocked User).**
    - [x] Basic placeholder for social/sharing features.
- [~] **Task 13: Implement AI Chat Bot Integration (Mocked User).**
    - [x] Design contextual placement within tab feeds (Initial placement in Pre-Market and Market tabs).
    - [x] Develop proactive interaction logic (initial prompts) (Mocked interactions and persona implemented).
- [ ] **Task 14: Backend - AI Trade Idea Generation (LLM Integration - Deferred until backend accessible).**
    - [ ] Set up LLM interaction (placeholder/simulated initially if direct integration is complex, then real data).
    - [ ] Integrate Polygon API for live market data (API key: zWMFnB3iCq6oN5UoAEVE6XjAL6vfcYzf).
    - [ ] Develop logic to feed market data to LLM and process outputs for trade ideas.
    - [ ] Create API endpoints for frontend to fetch trade ideas.

## Ongoing Tasks (Parallel to Phase 3 & 4)

- [ ] **Task P1: Investigate and Resolve Backend Public Accessibility.**
    - [ ] Continue troubleshooting proxy/network configuration for the Flask/Gunicorn backend.
    - [ ] Explore alternative exposure methods if current approach remains blocked.
- [ ] **Task P2: Frequently Check and Report Live Preview Link Availability.**
    - [ ] Periodically test frontend and backend public URLs.
    - [ ] Notify user of any changes in availability.

## Phase 4: Integration, Testing, Deployment, and Finalization

- [ ] **Task 15: Integrate Full User Authentication (When Backend Accessible).**
    - [ ] Connect Next.js authentication components to live Flask API endpoints.
    - [ ] Ensure real user data flows correctly.
- [ ] **Task 16: Integrate Frontend with Live Backend (When Backend Accessible).**
    - [ ] Replace mocked data/interactions with live API calls for all features.
    - [ ] Ensure data flows correctly for all tabs.
- [ ] **Task 17: Thorough Testing and Error Fixing.**
    - [ ] Test all features with live backend and real authentication.
    - [ ] Validate UI/UX against requirements and user feedback.
    - [ ] Fix bugs and refine implementation.
- [ ] **Task 18: Prepare for Deployment.**
    - [ ] Ensure backend is configured for production (e.g., Gunicorn for Flask).
    - [ ] Ensure frontend is built for production.
- [ ] **Task 19: Deploy Live Web Preview (Full Functionality).**
    - [ ] Deploy the Next.js frontend.
    - [ ] Deploy the Flask backend.
    - [ ] Expose necessary ports and provide user with access URL.
- [ ] **Task 20: Gather User Feedback and Iterate (if necessary).**
- [ ] **Task 21: Final Report and Deliverables.**
    - [ ] Send final code and access instructions to user.

