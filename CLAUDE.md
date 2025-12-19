# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a simulated robotics fleet monitoring dashboard MVP that demonstrates real-time telemetry visualization and alert capabilities. The project showcases core patterns used in Physical AI fleet management systems using Foxglove WebSocket protocol for real-time data streaming.

## Repository Structure

```
ghost-fleet-dashboard/
├── README.md
├── mvp-charter.md    # Detailed MVP requirements and specifications
└── backend/          # Python robotics simulation with foxglove-sdk
```

## Technology Stack

**Backend**: Python with foxglove-sdk
- Foxglove WebSocket server (port 8765)
- Robot simulation with telemetry publishing at 10Hz
- Data channels: `/location` (Vector3) and `/status` (JSON)

**Visualization**: Foxglove Studio Web App
- Professional robotics dashboard at https://app.foxglove.dev
- Direct WebSocket connection to backend simulation
- Built-in visualization panels and alerting capabilities

## Development Commands

### Backend Setup
```bash
cd backend
pip install foxglove-sdk
python run_sim.py
```

### Visualization Setup
1. Navigate to https://app.foxglove.dev
2. Click "Open connection" → "Foxglove WebSocket"
3. Enter URL: `ws://localhost:8765`
4. Add visualization panels for `/location` and `/status` channels

## Core Architecture

- **Real-time Telemetry**: Foxglove WebSocket protocol for 10Hz data streaming
- **Simulation Backend**: Python script simulating robot movement, battery, and error states
- **Professional Visualization**: Foxglove Studio web app with industry-standard robotics tools
- **Data Flow**: Backend publishes to Foxglove server → Foxglove Studio visualizes data

## Key Features

### Backend Simulation
- Circular robot movement using sin/cos calculations
- Battery simulation (100% → 0% → reset cycle)
- Error state simulation (30% chance every 20 seconds, 5-second recovery)
- Console logging for operation verification

### Foxglove Studio Visualization
- Real-time robot position tracking (2D/3D plots)
- Battery status monitoring with gauges
- Professional robotics dashboard interface
- Built-in alerting capabilities for low battery/error states

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
- Connect Foxglove Studio to `ws://localhost:8765` and confirm data reception
- Test error state transitions and battery cycling  
- Validate real-time updates in Foxglove Studio with <200ms latency
- Ensure stable operation for 30+ minutes continuous use

## Development Notes

- Follow MVP charter specifications in `mvp-charter.md`
- Backend focuses on realistic robot telemetry simulation
- Visualization handled by professional Foxglove Studio tools
- Monitor WebSocket connection stability and data streaming performance
- Use Foxglove Studio's built-in panels for visualization instead of custom frontend