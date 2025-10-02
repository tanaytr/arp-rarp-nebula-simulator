# ARP & RARP Nebula Simulator

An interactive, educational web application that simulates ARP (Address Resolution Protocol) and RARP (Reverse Address Resolution Protocol) workflows in a futuristic sci-fi environment.

## Features

### 🚀 Interactive Protocol Simulation
- **ARP Protocol**: IP to MAC address resolution with animated packet transfers
- **RARP Protocol**: MAC to IP address assignment simulation
- **Step-by-step guidance** with educational explanations
- **Visual packet animations** showing network communication

### 🎮 Gamified Learning Experience
- **Futuristic cyberpunk UI** with neon effects and holographic elements
- **Animated network topology** with interactive device pods
- **Particle effects** and sci-fi sound design
- **Progress tracking** and completion statistics

### 🛠️ Advanced Features
- **Simulated database** with device management
- **Random network generation** for replayability
- **Full demo mode** showing complete protocol workflows
- **Responsive design** for desktop and mobile
- **Accessibility features** with ARIA labels and keyboard navigation

### 🎨 Visual Design
- **Neon glow effects** and cyberpunk styling
- **Holographic UI elements** with glass morphism
- **Animated particle systems** in the background
- **Smooth transitions** powered by Framer Motion
- **Dark theme** optimized for extended use

## Technology Stack

- **React 18** with TypeScript for type safety
- **Framer Motion** for smooth animations and transitions
- **Tailwind CSS** for responsive styling and theming
- **Local Storage** for data persistence
- **CSS3** with custom animations and effects

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd arp-rarp-nebula-simulator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

This builds the app for production to the `build` folder.

## Deployment

### Vercel Deployment

1. **Install Vercel CLI** (if not already installed):
```bash
npm i -g vercel
```

2. **Deploy to Vercel**:
```bash
vercel --prod
```

3. **Alternative: GitHub Integration**
   - Push your code to a GitHub repository
   - Connect your repository to Vercel
   - Vercel will automatically deploy on every push

### Manual Deployment

The app is configured as a static site and can be deployed to any static hosting service:

- **Netlify**: Drag and drop the `build` folder
- **GitHub Pages**: Use GitHub Actions or manual upload
- **AWS S3**: Upload the `build` folder contents
- **Any static hosting service**

## Usage Guide

### Starting the Simulation

1. **Launch the App**: Open the application in your browser
2. **Title Screen**: Click "Begin Simulation" to enter the main interface
3. **Select Protocol**: Choose between ARP or RARP mode
4. **Select Device**: Click on a device pod to select it
5. **Start Simulation**: Click "Begin [Protocol] Simulation"
6. **Follow Guidance**: Use the guidance messages to progress through steps

### ARP Workflow

1. **Select Sender**: Choose the device that will send the ARP request
2. **Send Request**: Broadcast ARP request to find target device's MAC
3. **Receive Reply**: Target device responds with its MAC address
4. **Update Cache**: ARP cache is updated with new IP-MAC mapping

### RARP Workflow

1. **Select Device**: Choose a diskless device needing an IP address
2. **Send Request**: Request IP address from RARP server
3. **Receive Reply**: Server assigns IP address to the device
4. **Update Device**: Device configuration is updated with new IP

### Database Management

- **Access Database**: Click "Access Nebula Database" to manage devices
- **Edit Devices**: Modify IP addresses, MAC addresses, and device names
- **Add/Remove**: Add new devices or remove existing ones
- **Random Generation**: Create random network topologies

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── DevicePod.tsx    # Network device visualization
│   ├── PacketAnimation.tsx # Animated packet transfers
│   ├── GuidanceBox.tsx  # Educational guidance messages
│   ├── NetworkTopology.tsx # Network layout and connections
│   ├── ControlPanel.tsx # Simulation controls
│   ├── DatabaseModal.tsx # Device database management
│   └── ParticleSystem.tsx # Background particle effects
├── screens/             # Main application screens
│   ├── TitleScreen.tsx  # Landing page with title
│   └── SimulationScreen.tsx # Main simulation interface
├── types/               # TypeScript type definitions
│   └── index.ts         # Application data types
├── utils/               # Utility functions
│   ├── database.ts      # Device data management
│   └── animations.ts    # Animation configurations
├── App.tsx              # Main application component
├── App.css              # Global styles and animations
├── index.tsx            # Application entry point
└── index.css            # Base CSS styles
```

## Customization

### Adding New Protocols

1. **Define Types**: Add new protocol types in `src/types/index.ts`
2. **Create Workflow**: Implement step-by-step process
3. **Add Animations**: Create packet animations for new protocol
4. **Update UI**: Add new mode selection in ControlPanel

### Styling Customization

- **Colors**: Modify color scheme in `tailwind.config.js`
- **Animations**: Adjust animation parameters in `src/utils/animations.ts`
- **Effects**: Customize particle effects and neon glows in CSS

### Adding New Features

- **Sound Effects**: Integrate Web Audio API for sci-fi sounds
- **Multiplayer**: Add real-time collaboration features
- **Advanced Scenarios**: Implement error handling and edge cases
- **Export/Import**: Add network configuration sharing

## Browser Compatibility

- **Chrome** 90+ (recommended)
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## Performance Optimization

- **Lazy Loading**: Components load on demand
- **Animation Optimization**: 60fps smooth animations
- **Memory Management**: Efficient particle system cleanup
- **Responsive Images**: Optimized for different screen sizes

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- **Framer Motion** for smooth animations
- **Tailwind CSS** for responsive design system
- **React** for component-based architecture
- **TypeScript** for type safety and developer experience

## Support

For support, email support@arp-rarp-simulator.com or create an issue in the repository.

---

**Built with ❤️ for network protocol education**
