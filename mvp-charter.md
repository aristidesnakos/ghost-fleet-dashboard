# Ghost Fleet Dashboard - MVP Charter

## Project Overview
Build a simulated **Predictive Maintenance Dashboard** for embedded robotics systems to demonstrate advanced telemetry, health monitoring, and failure prediction capabilities. This MVP showcases the core patterns used in industrial IoT and Physical AI fleet management systems with focus on operational excellence and downtime prevention.

## Business Objectives
- Demonstrate predictive maintenance value proposition ($12B+ market)
- Showcase multi-modal sensor fusion and health analytics
- Validate real-time anomaly detection and failure prediction
- Create foundation for industrial maintenance optimization
- Prove ROI through simulated maintenance cost reduction

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

**Sprint 2: Multi-Modal Sensor Simulation** 🎯 **NEW FOCUS**
- Add motor diagnostics: current draw, temperature, torque feedback
- Implement vibration analysis: FFT patterns for bearing health
- Create environmental sensors: ambient temperature, humidity
- Add IMU simulation: accelerometer, gyroscope data
- Simulate gradual component degradation over time
- **Acceptance Criteria**: 8+ sensor channels publishing realistic embedded systems data

**Sprint 3: Health Analytics Engine**
- Develop composite health scoring algorithm (0-100%)
- Implement trend analysis for predictive insights
- Create failure prediction models using sensor fusion
- Add remaining useful life (RUL) calculations
- Design anomaly detection algorithms
- **Acceptance Criteria**: Real-time health scores with failure predictions

**Sprint 4: Intelligent Alerting System**
- Implement threshold-based reactive alerts
- Add machine learning-based anomaly detection
- Create maintenance recommendation engine
- Design escalation workflows for critical issues
- Add simulated work order generation
- **Acceptance Criteria**: Proactive maintenance alerts 2-4 weeks before failure

### Visualization Layer

**Solution: Foxglove Studio Web App** ✅ **COMPLETED**
- **Technology**: https://app.foxglove.dev (browser-based)
- **Connection**: Direct WebSocket to `ws://localhost:8765`

**Built-in Features:**
- ✅ Real-time robot position visualization (2D/3D plots)
- ✅ Battery status gauges and monitoring
- 🎯 Multi-modal sensor dashboards (motor, vibration, IMU)
- 🎯 Health scoring trend analysis panels
- 🎯 Predictive maintenance alert widgets
- 🎯 Time-series analysis for failure prediction
- ✅ Professional robotics dashboard interface
- ✅ No custom frontend development overhead

**Setup Instructions:**
1. Navigate to https://app.foxglove.dev
2. Click "Open connection" → "Foxglove WebSocket"
3. Enter URL: `ws://localhost:8765`
4. Add visualization panels for:
   - `/location` and `/status` (existing)
   - `/motor/diagnostics` (current, temp, torque)
   - `/vibration/analysis` (FFT frequency data)
   - `/health/scores` (composite health metrics)
   - `/maintenance/alerts` (predictive warnings)

**✅ Status**: READY TO USE - Industry-standard robotics visualization platform provides all dashboard requirements out-of-the-box

---

## Definition of Done

### Backend
- [ ] Python script runs without errors
- [ ] Foxglove server broadcasts on correct port
- [ ] Data channels publish valid schema (8+ channels)
- [ ] 10Hz frequency maintained across all sensors
- [ ] Console logging confirms operation
- [ ] Multi-modal sensor simulation realistic
- [ ] Health analytics engine operational
- [ ] Predictive algorithms generating alerts

### Visualization
- [x] Foxglove Studio connects to WebSocket server
- [x] Real-time `/location` and `/status` data visible
- [ ] Motor diagnostics visualization (current, temp, torque)
- [ ] Vibration analysis frequency plots
- [ ] Health scoring trend dashboards
- [ ] Predictive maintenance alert panels
- [ ] Time-series analysis for failure prediction
- [x] Professional robotics dashboard interface

### Integration
- [x] End-to-end data flow verified (Backend → Foxglove)
- [x] WebSocket connection stable
- [ ] Health analytics pipeline operational
- [ ] Predictive alerts triggered correctly
- [ ] Multi-sensor data fusion working
- [ ] Performance maintained with 8+ channels (<200ms latency)

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
- Real-time updates with <200ms latency across 8+ sensor channels
- Health score accuracy >90% correlation with simulated degradation
- Predictive alerts 2-4 weeks before simulated component failure
- Zero data loss during continuous operation
- Alert response time <500ms for critical maintenance warnings
- Stable operation for 30+ minutes with full sensor suite
- Demonstrable ROI calculation through maintenance cost optimization

---

## Portfolio Value Proposition

This MVP demonstrates **enterprise-grade embedded systems observability** skills:

### **Technical Depth Showcased**
- **Multi-modal sensor fusion**: IMU, motor diagnostics, vibration analysis
- **Predictive analytics**: Machine learning-based failure prediction
- **Real-time streaming**: High-frequency telemetry with sub-200ms latency
- **Professional tooling**: Industry-standard Foxglove observability platform

### **Business Impact**
- **Predictive maintenance market**: $12B+ industry with 25-30% CAGR
- **ROI demonstration**: Simulated cost savings through proactive maintenance
- **Industrial relevance**: Directly applicable to manufacturing, logistics, autonomous systems

### **Career Positioning**
Perfect for roles in: Physical AI, Industrial IoT, Autonomous Systems, Embedded Systems Engineering, Robotics Operations, Fleet Management

This specification provides a focused yet comprehensive demonstration of embedded systems expertise with direct industry applicability.