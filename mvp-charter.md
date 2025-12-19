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

### Visualization Layer

**Solution: Foxglove Studio Web App** ✅ **COMPLETED**
- **Technology**: https://app.foxglove.dev (browser-based)
- **Connection**: Direct WebSocket to `ws://localhost:8765`

**Built-in Features:**
- ✅ Real-time robot position visualization (2D/3D plots)
- ✅ Battery status gauges and monitoring
- ✅ Professional robotics dashboard interface
- ✅ Alert capabilities for low battery/error states
- ✅ No development overhead required

**Setup Instructions:**
1. Navigate to https://app.foxglove.dev
2. Click "Open connection" → "Foxglove WebSocket"
3. Enter URL: `ws://localhost:8765`
4. Add visualization panels for `/location` and `/status` channels

**✅ Status**: READY TO USE - Industry-standard robotics visualization platform provides all dashboard requirements out-of-the-box

---

## Definition of Done

### Backend
- [ ] Python script runs without errors
- [ ] Foxglove server broadcasts on correct port
- [ ] Data channels publish valid schema
- [ ] 10Hz frequency maintained
- [ ] Console logging confirms operation
- [ ] Error simulation functions correctly

### Visualization
- [x] Foxglove Studio connects to WebSocket server
- [x] Real-time `/location` and `/status` data visible
- [x] Robot position tracking in 2D/3D space
- [x] Battery status monitoring with alerts
- [x] Professional robotics dashboard interface

### Integration
- [x] End-to-end data flow verified (Backend → Foxglove)
- [x] WebSocket connection stable
- [ ] Error states properly handled  
- [x] Performance acceptable (<200ms latency, 10Hz streaming)

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