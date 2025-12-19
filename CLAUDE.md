# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a simulated robotics fleet monitoring dashboard MVP that demonstrates real-time telemetry visualization and alert capabilities. The project showcases core patterns used in Physical AI fleet management systems using Foxglove WebSocket protocol for real-time data streaming.

## Repository Structure

```
ghost-fleet-dashboard/
├── README.md
├── mvp-charter.md    # Detailed MVP requirements and specifications
├── backend/          # Python robotics simulation with foxglove-sdk
└── frontend/         # Next.js dashboard application
```

## Technology Stack

**Backend**: Python with foxglove-sdk
- Foxglove WebSocket server (port 8765)
- Robot simulation with telemetry publishing at 10Hz
- Data channels: `/location` (Vector3) and `/status` (JSON)

**Frontend**: Next.js 14+ with TypeScript and Tailwind CSS
- WebSocket client connecting to Foxglove protocol
- Real-time dashboard with map visualization and status panels

## Development Commands

### Backend Setup
```bash
cd backend
pip install foxglove-sdk
python robot_sim.py
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Core Architecture

- **Real-time Telemetry**: Foxglove WebSocket protocol for 10Hz data streaming
- **Simulation Backend**: Python script simulating robot movement, battery, and error states
- **Dashboard Frontend**: Next.js app with live map visualization and alert system
- **Data Flow**: Backend publishes to Foxglove server → Frontend subscribes via WebSocket

## Key Features

### Backend Simulation
- Circular robot movement using sin/cos calculations
- Battery simulation (100% → 0% → reset cycle)
- Error state simulation (30% chance every 20 seconds, 5-second recovery)
- Console logging for operation verification

### Frontend Dashboard
- 500x500 SVG map with animated robot position
- Real-time status panel (battery %, operational state)
- Alert system: Low battery (≤20%) and error state warnings
- Color-coded status indicators

## Data Schemas

**Location Channel** (`/location`): Vector3 schema
```typescript
{ x: number, y: number, z: number }
```

**Status Channel** (`/status`): JSON schema
```typescript
{ battery: number, state: "OPERATIONAL" | "ERROR" }
```

## Testing & Validation

- Run backend simulation and verify 10Hz publishing in console
- Connect to `ws://localhost:8765` and confirm data reception
- Test error state transitions and battery cycling
- Validate real-time updates in dashboard with <200ms latency
- Ensure stable operation for 30+ minutes continuous use

## Development Notes

- Follow MVP charter specifications in `mvp-charter.md`
- Backend team focuses on Python simulation accuracy
- Frontend team focuses on React/WebSocket integration
- Use shared TypeScript interfaces for data contracts
- Monitor WebSocket connection stability and browser performance