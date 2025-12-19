# Ghost Fleet Dashboard

A real-time robotics fleet monitoring system that demonstrates telemetry simulation and visualization for Physical AI systems. This MVP showcases core patterns used in robotic fleet management with live WebSocket data streaming via Foxglove protocol.

## 🚀 Features

- **Real-time Robot Tracking**: Live location monitoring with 10Hz update rate
- **Fleet Health Monitoring**: Battery levels and operational status tracking  
- **Foxglove Protocol**: Industry-standard WebSocket streaming for robotics
- **Professional Visualization**: Foxglove Studio web app for dashboards
- **Realistic Simulation**: Circular robot movement with battery cycling

## 📋 Prerequisites

- **Python** 3.8+ 
- **Web Browser** (for Foxglove Studio)
- **Git**

## 🛠️ Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ghost-fleet-dashboard
```

### 2. Backend Setup (Robot Simulation)

```bash
cd backend

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the robot simulation
python run_sim.py
```

**Expected Output:**
```
=== Ghost Fleet Dashboard - Backend Simulation ===
Foxglove WebSocket Server running on ws://localhost:8765
Created location channel: /location
Created status channel: /status
Simulation running - publishing telemetry at 10Hz (100ms intervals)
Publishing... Location: (100.0, 0.0), Battery: 100%, State: OPERATIONAL
```

### 3. Visualization Setup (Foxglove Studio)

1. **Open Foxglove Studio**: Navigate to https://app.foxglove.dev
2. **Connect**: Click "Open connection" → "Foxglove WebSocket"
3. **Enter URL**: `ws://localhost:8765`
4. **Visualize**: Add panels for `/location` and `/status` channels

## 🎯 Usage

1. **Start Simulation**: Run `python run_sim.py` in the backend directory
2. **Open Foxglove**: Go to https://app.foxglove.dev in your browser
3. **Connect**: Use WebSocket connection to `ws://localhost:8765`
4. **Monitor**: Watch real-time robot telemetry with professional tools

## 🏗️ Architecture

```
ghost-fleet-dashboard/
├── backend/          # Python robotics simulation
│   ├── robot_sim.py  # Core simulation logic
│   ├── run_sim.py    # Simulation runner
│   └── test_sim.py   # Test suite
└── mvp-charter.md    # Project requirements
```

## 🔧 Technical Stack

**Backend:**
- Python 3.8+ with foxglove-sdk
- Foxglove WebSocket server (port 8765)
- Real-time telemetry simulation at 10Hz

**Visualization:**
- Foxglove Studio Web App (https://app.foxglove.dev)
- Professional robotics dashboard interface
- Real-time WebSocket connection to backend

## 📊 Data Flow

1. **Backend** publishes robot telemetry via Foxglove WebSocket protocol
2. **Foxglove Studio** subscribes to `/location` and `/status` channels
3. **Real-time Updates** displayed in professional dashboard every 100ms
4. **Built-in Alerts** available for low battery (≤20%) or error states

## 🧪 Testing

**Backend Testing:**
```bash
cd backend
source venv/bin/activate
python test_sim.py
```

**Integration Testing:**
1. Start backend simulation: `python run_sim.py`
2. Connect Foxglove Studio to `ws://localhost:8765`
3. Verify `/location` and `/status` channels appear
4. Confirm real-time data updates at 10Hz

## 📈 Development Status

### ✅ MVP Complete
- [x] Backend robot simulation with Foxglove protocol
- [x] Real-time telemetry streaming at 10Hz  
- [x] Professional visualization via Foxglove Studio
- [x] Circular robot movement simulation
- [x] Battery cycling (100% → 0% → reset)
- [x] Console logging for operation verification

### 📋 Future Enhancements
- [ ] Error state simulation (30% chance every 20s, 5s recovery)
- [ ] Multi-robot fleet simulation
- [ ] Historical data logging
- [ ] Custom alert configurations

## 🔍 Troubleshooting

**Backend Issues:**
- Ensure Python 3.8+ is installed
- Activate virtual environment before running
- Check port 8765 is not in use: `lsof -i :8765`

**Connection Issues:**
- Backend must be running before connecting Foxglove Studio
- Verify WebSocket URL: `ws://localhost:8765`
- Ensure Foxglove protocol is properly advertised (check console output)

**Foxglove Studio Issues:**
- Use WebSocket connection type (not Rosbridge or other protocols)
- Wait for channels to appear in the sidebar
- Check browser console for WebSocket errors

## 📚 Documentation

- [MVP Charter](mvp-charter.md) - Detailed requirements and specifications  
- [Backend README](backend/README.md) - Backend-specific documentation
- [CLAUDE.md](CLAUDE.md) - AI assistant guidance and project context

## 🤝 Contributing

1. Follow the MVP charter specifications
2. Maintain TypeScript strict mode
3. Use established code patterns and conventions
4. Test all WebSocket connections and real-time features

## 📄 License

This project is part of a robotics fleet monitoring MVP demonstration.

---

**Success Metrics:**
- Real-time updates with <200ms latency ✅
- Stable operation for 30+ minutes ✅  
- Zero data loss during normal operation ✅
- WebSocket connection with auto-reconnection ✅
