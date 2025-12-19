# Ghost Fleet Dashboard

A real-time robotics fleet monitoring dashboard that demonstrates telemetry visualization and alert capabilities for Physical AI systems. This MVP showcases core patterns used in robotic fleet management with live WebSocket data streaming.

## 🚀 Features

- **Real-time Robot Tracking**: Live location monitoring with 10Hz update rate
- **Fleet Health Monitoring**: Battery levels and operational status tracking  
- **WebSocket Architecture**: Foxglove protocol for real-time data streaming
- **Modern Tech Stack**: Next.js 15+, TypeScript, Python simulation backend
- **Alert System**: Low battery and error state notifications
- **Responsive Design**: Clean dashboard UI with Tailwind CSS

## 📋 Prerequisites

- **Node.js** 18+ and pnpm
- **Python** 3.8+ 
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

### 3. Frontend Setup (Dashboard)

**In a new terminal:**
```bash
cd frontend

# Install dependencies
pnpm install

# Start the development server
pnpm run dev
```

**Access the Dashboard:**
Open [http://localhost:3003](http://localhost:3003) in your browser

## 🎯 Usage

1. **Start Backend**: Run the robot simulation first (`python run_sim.py`)
2. **Start Frontend**: Launch the dashboard (`pnpm run dev`) 
3. **Monitor**: Watch real-time robot telemetry in your browser
4. **Verify**: Check browser console for incoming data messages

## 🏗️ Architecture

```
ghost-fleet-dashboard/
├── backend/          # Python robotics simulation
│   ├── robot_sim.py  # Core simulation logic
│   ├── run_sim.py    # Simulation runner
│   └── test_sim.py   # Test suite
├── frontend/         # Next.js dashboard application
│   ├── src/
│   │   ├── app/      # Next.js app router pages
│   │   ├── components/ # React components  
│   │   ├── hooks/    # Custom hooks (WebSocket)
│   │   ├── types/    # TypeScript definitions
│   │   └── config/   # Configuration
│   └── package.json
└── mvp-charter.md    # Project requirements
```

## 🔧 Technical Stack

**Backend:**
- Python 3.8+ with foxglove-sdk
- Foxglove WebSocket server (port 8765)
- Real-time telemetry simulation at 10Hz

**Frontend:**
- Next.js 15+ with TypeScript
- React 18+ with custom hooks
- Tailwind CSS for styling
- WebSocket client for Foxglove protocol

## 📊 Data Flow

1. **Backend** publishes robot telemetry via Foxglove WebSocket protocol
2. **Frontend** subscribes to `/location` and `/status` channels
3. **Real-time Updates** displayed in dashboard every 100ms
4. **Alert System** triggers on low battery (≤20%) or error states

## 🧪 Testing

**Backend Testing:**
```bash
cd backend
source venv/bin/activate
python test_sim.py
```

**Frontend Testing:**
```bash
cd frontend
pnpm run build  # Verify build works
pnpm run lint   # Check code quality
```

## 📈 Development Status

### ✅ Sprint 1 - Complete
- [x] Backend robot simulation with Foxglove protocol
- [x] Frontend WebSocket integration
- [x] Real-time dashboard with live data display
- [x] Console logging for data verification

### 🚧 Sprint 2 - In Progress  
- [ ] SVG map visualization with robot position
- [ ] Battery status panels with color coding
- [ ] Responsive two-panel layout

### 📋 Sprint 3 - Planned
- [ ] Alert system for low battery and errors
- [ ] Error state simulation and recovery
- [ ] Performance optimization

## 🔍 Troubleshooting

**Backend Issues:**
- Ensure Python 3.8+ is installed
- Activate virtual environment before running
- Check port 8765 is not in use

**Frontend Issues:**
- Use pnpm instead of npm
- Verify Node.js 18+ is installed
- Check WebSocket connection in browser console

**Connection Issues:**
- Backend must be running before starting frontend
- Verify WebSocket URL: `ws://localhost:8765`
- Check browser developer console for error messages

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
