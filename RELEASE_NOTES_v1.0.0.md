# 🎉 BEES Analytics v1.0.0 - Initial Release

**Release Date:** February 6, 2026

Battery Energy Capacity Optimization and Economics Benefit Analysis - A comprehensive tool for analyzing solar + battery storage systems with advanced optimization features.

---

## ✨ Core Features

### 📊 Data Management
- **Universal CSV Import**: Flexible timestamp parsing supporting multiple date formats (ISO, US, EU styles)
  - `YYYY-MM-DD HH:mm` (e.g., 2024-10-01 14:30)
  - `M/D/YYYY H:mm` (e.g., 1/1/2024 0:15)
  - `YYYY.MM.DD. HH:mm` (e.g., 2024.10.01. 14:30)
- **Smart Data Merging**: Automatically aligns solar generation and grid meter data from different sources
- **Demo Data**: Pre-loaded realistic scenarios for testing and learning
- **15-minute Interval Processing**: High-resolution energy flow analysis

### ⚡ Battery Simulation Engine

#### Configurable Parameters
- **Capacity (kWh)**: Total energy storage capacity
  - Typical residential: 5-15 kWh
  - Commercial: 20-100+ kWh
- **Charge/Discharge Efficiency (%)**: Energy losses during charging/discharging
  - Typical values: 90-96% per direction
  - Round-trip efficiency calculated automatically
- **Max Charge/Discharge Power (kW)**: Maximum rate limits
  - Typical C-rates: 0.5C to 1C
- **SOC Limits (Min/Max %)**: Operating range boundaries
  - Typical: 10-20% minimum, 85-95% maximum

#### Inverter Mode Support
- **Asymmetric (Default)**: Modern hybrid inverters with phase-specific power distribution
  - Dynamically distributes production across phases
  - Optimizes for phase-specific consumption
  - Recommended for post-2020 systems
- **Symmetric**: Legacy inverters with equal phase distribution
  - Equal power to all phases
  - For modeling older inverters (pre-2020)

### 📈 Advanced Analytics

#### Battery Optimization Curve
- **Automated capacity analysis** across 11 data points: [0, 1, 2, 5, 10, 15, 20, 40, 50, 100, 200 kWh]
- **Dual metrics**:
  - Grid Import Reduction (%)
  - Grid Export Reduction (%)
- **Interactive Plotly visualizations** with data labels showing % and savings (HUF)
- **CSV export** for further analysis in Excel/Python
- **Real-time progress tracking** (0-100% with status updates)

#### Financial Calculations
- **Progressive Pricing (Tier1/Tier2)**: Hungarian electricity market model
  - Tier1: First 2,523 kWh/year at discounted rate (e.g., 36 HUF/kWh)
  - Tier2: Above limit at market rate (e.g., 70 HUF/kWh)
  - Automatic proportional limit adjustment for partial-year simulations
- **Cost-Benefit Analysis**:
  - Total savings calculation (HUF)
  - Self-consumption improvement percentage
  - Battery efficiency losses tracking
  - Import/Export cost comparisons

### 📊 Visualizations

All charts built with **Plotly.js 2.27.0** featuring:
- **Power Flow Timeline**: kW power over time with battery charging/discharging
- **Energy Comparison Bars**: kWh comparison (baseline vs. with battery)
- **Battery SOC Tracking**: State of charge over simulation period
- **Sankey Energy Flow Diagrams**: Visual energy flow representation
- **Optimization Curves**: Purple spline curves with white-outlined markers
- **Responsive Design**: Dark theme optimized for all screen sizes

### 🌍 Internationalization

- **Dual Language Support**: English & Hungarian
- **LocalStorage Persistence**: Remembers user language preference
- **Context-Aware Help System**: 
  - Getting Started guide
  - Parameter explanations with examples
  - Key concepts (inverter modes, financial terms, technical terms)
  - Troubleshooting tips
  - Browser compatibility information

### ⏱️ Time Range Management

- **Quick Selection Buttons**: 
  - Week (last 7 days, Monday start)
  - Month (last 30 days)
  - Year (last 365 days)
  - Full Range (entire dataset)
- **Navigation Controls**: Arrow buttons (← →) for easy date shifting
- **Custom Range Picker**: Precise start/end date/time selection
- **Smart Week Handling**: Monday as week start for consistency

---

## 🛠️ Technical Specifications

### Architecture
- **Pure JavaScript**: No build process or dependencies required
- **Modular Design**:
  - `csv_handler.js` - CSV parsing with flexible timestamp detection
  - `data_merger.js` - Dataset alignment and interpolation
  - `visualizer.js` - Plotly chart rendering (5 chart types)
  - `simulation.js` - Battery physics and financial calculations
  - `help_modal.js` - UI components and modal management
  - `app.js` - Main orchestration and event handling (900+ lines)

### Performance
- **Dataset capacity**: Handles 1+ year datasets (~35,000 data points)
- **Optimization curve**: ~10-15 seconds for 11 sequential simulations
- **Client-side processing**: No server required, works offline
- **Memory efficient**: Processes 100MB+ CSV files in browser

### Browser Compatibility
| Browser | Support |
|---------|---------|
| Chrome (latest) | ✅ Fully supported |
| Firefox (latest) | ✅ Fully supported |
| Microsoft Edge (latest) | ✅ Fully supported |
| Safari 14+ | ✅ Fully supported |
| Internet Explorer | ❌ Not supported |

**Requirements:**
- JavaScript enabled
- Cookies/LocalStorage enabled (for preferences)
- Modern browser with HTML5 support

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/BEES_Analytics.git

# Navigate to directory
cd BEES_Analytics

# Open index.html in your browser
# No build step required!
```

**Alternative:** Download ZIP and extract, then open `index.html`

---

## 🚀 Quick Start

### Method 1: Demo Data (Recommended for first-time users)
1. Open `index.html` in your browser
2. Click **"📊 Load Demo Scenarios"**
3. Select time range (try "Year" for full analysis)
4. Configure battery parameters (or use defaults)
5. Click **"⚡ Run Battery Simulation"**
6. Explore results and charts

### Method 2: Your Own Data
1. Prepare your CSV files (see format below)
2. Click **"1. Solar Generation Data"** and upload
3. Click **"2. Grid Meter Data"** and upload
4. Set time range using quick buttons or custom picker
5. Configure battery parameters
6. Run simulation and analyze

---

## 📋 CSV Format Requirements

### Solar Generation Data
**Columns:** `Timestamp, Production (kW)`

**Example:**
```csv
Timestamp,Production (kW)
2024-01-01 00:00,0.0
2024-01-01 00:15,0.0
2024-01-01 00:30,0.0
2024-01-01 08:00,2.5
2024-01-01 12:00,8.3
```

### Grid Meter Data
**Columns:** `Timestamp, Import (kWh), Export (kWh)`

**Example:**
```csv
Timestamp,Import (kWh),Export (kWh)
2024-01-01 00:00,0.5,0.0
2024-01-01 00:15,0.6,0.0
2024-01-01 00:30,0.4,0.0
2024-01-01 12:00,0.0,2.1
```

**Important Notes:**
- 15-minute intervals required
- Timestamps don't need to match between files (auto-aligned)
- Multiple date formats supported (see features above)
- Energy values in kWh for grid meter, kW for solar production

---

## 🎯 Use Cases

### Residential Solar Owners
- Determine optimal battery size for your consumption pattern
- Calculate ROI for different battery capacities
- Understand self-consumption improvement potential

### Energy Consultants
- Demonstrate battery value propositions to clients
- Generate optimization curves for proposals
- Export data for detailed financial models

### Researchers
- Energy flow analysis and system behavior studies
- Sensitivity analysis for different parameters
- Validate battery sizing algorithms

### System Designers
- Compare different battery configurations
- Analyze phase-specific energy flows
- Optimize system design for specific load profiles

---

## 💡 Key Features Explained

### Battery Optimization Curve
Automatically runs simulations for 11 different battery capacities and plots:
- **X-axis**: Battery capacity (kWh)
- **Y-axis**: Grid reduction percentage (%)
- **Data labels**: Shows both % reduction and annual savings (HUF)
- **Export**: Download results as CSV for further analysis

**Use this to:** Find the "sweet spot" capacity where adding more battery provides diminishing returns.

### Progressive Pricing (Tier1/Tier2)
Models the Hungarian electricity pricing system:
- **Tier1**: Discounted rate for first 2,523 kWh/year
- **Tier2**: Market rate for consumption above limit
- **Auto-scaling**: Proportionally adjusts for simulation periods <1 year

Example: 30-day simulation uses (30/365) × 2,523 ≈ 207 kWh Tier1 limit

### Inverter Modes
- **Asymmetric**: Simulates modern inverters that optimize power distribution across phases
- **Symmetric**: Simulates older inverters with equal phase distribution
- **Impact**: Can show 10-30% difference in results for unbalanced loads

---

## 📝 Known Limitations

### Current Version (v1.0.0)
- Client-side only (no data persistence between sessions)
- Single location analysis (no multi-site support)
- Static electricity pricing (no time-of-use tariffs)
- No battery degradation modeling
- No seasonal efficiency variations
- Maximum 200 kWh battery capacity in optimization curve

### Data Requirements
- Requires complete 15-minute interval data (no gaps allowed)
- CSV format only (no Excel, JSON, or database support)
- Maximum recommended file size: ~100MB per file

---

## 🔮 Future Roadmap

Ideas for future releases (v1.1.0, v2.0.0):

### High Priority
- [ ] Time-of-use electricity pricing support
- [ ] Battery degradation modeling (capacity fade over years)
- [ ] PDF report generation with charts and summary
- [ ] Data validation and gap-filling tools

### Medium Priority
- [ ] Multi-year trend analysis
- [ ] Seasonal efficiency adjustments
- [ ] Cloud data storage (save/load scenarios)
- [ ] Comparison mode (compare multiple configurations)

### Nice to Have
- [ ] Mobile app version (React Native)
- [ ] REST API for programmatic access
- [ ] Integration with smart meter APIs
- [ ] Real-time monitoring dashboard

**Note:** This is a hobby project, so timeline is flexible. Contributions welcome!

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Reporting Bugs
1. Check existing issues first
2. Provide detailed description with screenshots
3. Include browser version and console errors
4. Attach sample data files (if possible)

### Suggesting Features
1. Open a GitHub issue with "Feature Request" label
2. Describe the use case and expected behavior
3. Consider implementation complexity

### Submitting Pull Requests
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

**Coding Standards:**
- Follow existing code style (JavaScript ES6+)
- Add comments for complex logic
- Update documentation for new features
- Test across multiple browsers

---

## 📄 License

[Choose your license - suggestions:]
- **MIT License**: Most permissive, allows commercial use
- **GPL-3.0**: Requires derivative works to be open source
- **Apache 2.0**: Like MIT but with patent protection

---

## 🙏 Acknowledgments

### Technologies
- **Plotly.js**: Interactive visualization library - https://plotly.com/javascript/
- **VS Code**: Development environment
- **GitHub Copilot**: AI-assisted coding

### Inspiration
- Hungarian solar energy community feedback
- Real-world battery storage optimization challenges
- Open-source energy analysis tools

### Special Thanks
- Early testers and feedback providers
- Hungarian solar forum community
- Energy consultants who validated calculations

---

## 📧 Contact & Support

### Questions or Issues?
- **GitHub Issues**: [Link to repository issues page]
- **Email**: [Your contact email]
- **Discussion**: [Link to GitHub Discussions if enabled]

### Project Status
This is a hobby project created for the solar energy community. While not actively maintained as a commercial product, bug reports and contributions are welcome!

---

## 📊 Version History

### v1.0.0 (February 6, 2026) - Initial Release
- ✅ Core battery simulation engine
- ✅ CSV import with universal timestamp parsing
- ✅ Interactive Plotly visualizations
- ✅ Battery optimization curve analysis
- ✅ Progressive pricing (Tier1/Tier2)
- ✅ Dual language support (EN/HU)
- ✅ Comprehensive help system
- ✅ Dark theme UI

**Full Changelog**: Initial release

---

## 🔗 Additional Resources

### Documentation
- [README.md](README.md) - Project overview
- [docs/implementation_notes_*.md](docs/) - Technical implementation details
- In-app Help (❓ button) - User guide with examples

### Demo Data
Located in `data/` folder:
- `solar_power_15min.csv` - Sample solar generation data
- `grid_meter_energy_15_min.csv` - Sample grid meter data

### Related Projects
- [List similar open-source energy tools]
- [Energy storage calculators]
- [Solar analysis tools]

---

**Made with ☀️ and ⚡ for the solar energy community**
