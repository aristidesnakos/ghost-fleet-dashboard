# Ghost Fleet Dashboard - MVP Charter

## Project Overview
Build a simulated robotics fleet monitoring dashboard to demonstrate real-time telemetry visualization and alert capabilities. This MVP showcases the core patterns used in Physical AI fleet management systems.

## Business Objectives
- Demonstrate real-time robot monitoring capabilities
- Showcase fleet health alerting systems
- Validate WebSocket-based telemetry architecture
- Create foundation for multi-robot fleet expansion

---

## Technical Requirements by Team

### Backend Team (Python/Robotics Simulation)

**Sprint 1: Robot Telemetry Simulation** ✅ **COMPLETED**
- **Technology**: Python with foxglove-sdk
- **Deliverable**: `backend/robot_sim.py`

**Requirements:** ✅ **ALL COMPLETED**
1. ✅ Install foxglove-sdk in Python environment
2. ✅ Create Foxglove WebSocket server (default port 8765)
3. ✅ Define two data channels:
   - `/location`: Vector3 schema (x, y, z coordinates)
   - `/status`: JSON schema with fields: `battery` (int 0-100), `state` (string)
4. ✅ Implement 10Hz data publishing loop (100ms intervals)
5. ✅ Simulate circular robot movement using sin/cos calculations
6. ✅ Battery simulation: Start at 100%, decrement each cycle, reset to 100% when reaching 0%
7. ✅ Add console logging: "Publishing..." to verify operation
8. ✅ **Acceptance Criteria**: Script runs continuously, publishes data every 100ms, visible in Foxglove Studio

**✅ Sprint 1 Status**: COMPLETED - Ready for testing and Frontend integration

**Sprint 2: Error State Simulation**
- Add random "stuck" simulation: Every 20 seconds, 30% chance to enter ERROR state
- During ERROR state: Stop movement (x,y remain static), set state to "ERROR"
- Auto-recovery after 5 seconds back to "OPERATIONAL"
- **Acceptance Criteria**: Observable error states in telemetry stream

### Frontend Team (Next.js/React)

**Sprint 1: Application Scaffold & WebSocket Integration** ✅ **COMPLETED**
- **Technology**: Next.js 15+, TypeScript, Tailwind CSS
- **Deliverable**: `frontend/` directory with Next.js app

**Requirements:** ✅ **ALL COMPLETED**
1. ✅ Create Next.js application with TypeScript
2. ✅ Install WebSocket client library (`ws`, `@types/ws`, `@foxglove/ws-protocol`)
3. ✅ Create WebSocket connection to `ws://localhost:8765`
4. ✅ Implement message parsing for Foxglove protocol
5. ✅ Create React hooks for real-time data state management
6. ✅ **Acceptance Criteria**: Console shows incoming robot data every 100ms

**✅ Sprint 1 Status**: COMPLETED - Dashboard running on http://localhost:3003 with live WebSocket connection

**Sprint 2: Dashboard Visualization**
**Requirements:**
1. Create main dashboard page with two-panel layout
2. **Map Component**:
   - 500x500 SVG viewport
   - Blue circle (10px radius) representing robot
   - Update circle position based on live x,y coordinates
   - Center origin at (250, 250) in SVG space
3. **Status Panel**:
   - Display current battery percentage
   - Show operational state (OPERATIONAL/ERROR)
   - Implement color coding: Green (>20%), Red (≤20% or ERROR)
4. **Layout**: Side-by-side panels using Tailwind CSS Grid
5. **Acceptance Criteria**: Real-time visual updates, responsive design

**Sprint 3: Alert System**
**Requirements:**
1. Low Battery Alert: Red warning when battery ≤ 20%
2. Error State Alert: Flashing red banner when state = "ERROR"
3. Alert persistence: Alerts remain until conditions clear
4. **Acceptance Criteria**: Alerts trigger correctly, visually prominent

---

## Definition of Done

### Backend
- [ ] Python script runs without errors
- [ ] Foxglove server broadcasts on correct port
- [ ] Data channels publish valid schema
- [ ] 10Hz frequency maintained
- [ ] Console logging confirms operation
- [ ] Error simulation functions correctly

### Frontend
- [ ] Next.js app builds and runs locally
- [ ] WebSocket connection established
- [ ] Real-time data parsing works
- [ ] Robot position animates on map
- [ ] Battery status updates live
- [ ] Alerts trigger on correct conditions
- [ ] Responsive layout functions

### Integration
- [ ] End-to-end data flow verified
- [ ] No console errors in browser
- [ ] Error states properly handled
- [ ] Performance acceptable (no lag)

---

## Risk Mitigation

**WebSocket Protocol Compatibility**
- If Foxglove protocol causes issues, add parallel simple JSON WebSocket broadcast
- Fallback: Use HTTP polling with 200ms interval

**Data Format Issues**
- Backend team provides sample message format to Frontend team
- Create shared TypeScript interfaces for data contracts

**Performance Concerns**
- Monitor browser memory usage during extended operation
- Implement data buffer limits if needed

---

## Success Metrics
- Real-time updates with <200ms latency
- Zero data loss during normal operation
- Alert response time <500ms
- Stable operation for 30+ minutes continuous use

This specification provides clear, actionable requirements for specialized development teams while maintaining the technical depth needed for implementation.