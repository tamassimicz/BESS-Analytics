/**
 * Main Application Logic
 * Coordinates data loading, merging, and UI updates.
 */
const App = {
    solarData: [],
    gridData: [],
    mergedData: [],

    /**
     * Initializes the application by attaching event listeners.
     */
    init() {
        console.log("App initializing...");
        
        // Listen for Solar file selection
        const solarInput = document.getElementById('solarInput');
        if (solarInput) {
            solarInput.addEventListener('change', (e) => this.loadFile(e.target.files[0], 'solar'));
        }

        // Listen for Grid file selection
        const gridInput = document.getElementById('gridInput');
        if (gridInput) {
            gridInput.addEventListener('change', (e) => this.loadFile(e.target.files[0], 'grid'));
        }

        // Listen for the Update button click
        const updateBtn = document.getElementById('runSimulation');
        if (updateBtn) {
            updateBtn.addEventListener('click', () => {
                console.log("Update button clicked");
                this.filterAndRender();
            });
        }
    },

    /**
     * Reads the file content and triggers processing.
     */
    loadFile(file, type) {
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target.result;
            // Using processDataset from CSVHandler
            const processed = CSVHandler.processDataset(content, type);
            
            if (type === 'solar') this.solarData = processed;
            if (type === 'grid') this.gridData = processed;

            document.getElementById('output').textContent = 
                `Last action: Loaded ${type} data (${processed.length} rows)`;

            this.handleDataProcessing();
        };
        reader.readAsText(file);
    },

    /**
     * Orchestrates the merging and subsequent UI steps.
     */
    handleDataProcessing() {
        // We proceed if at least one dataset is available
        if (this.solarData.length > 0 || this.gridData.length > 0) {
            this.mergedData = DataMerger.mergeDatasets(this.solarData, this.gridData);
            this.updateDateRangeUI();
            
            // Initial render with the full range detected
            this.filterAndRender();
            console.log("Data merged and visualized.");
        }
    },

    /**
     * Filters mergedData based on UI date inputs and updates the chart.
     */
    filterAndRender() {
        if (!this.mergedData || this.mergedData.length === 0) {
            console.warn("No data available to filter.");
            return;
        }

        const startInput = document.getElementById('startDate').value;
        const endInput = document.getElementById('endDate').value;

        if (!startInput || !endInput) {
            Visualizer.renderChart(this.mergedData);
            return;
        }

        const startTimestamp = new Date(startInput).getTime();
        const endTimestamp = new Date(endInput).getTime();

        // Debugging logs to verify data integrity
        console.log("Selection Start (ms):", startTimestamp);
        console.log("First Data Point (ms):", this.mergedData[0].timestampMs);

        const filtered = this.mergedData.filter(row => {
            // Now row.timestampMs is guaranteed by the fixed data_merger.js
            return row.timestampMs >= startTimestamp && row.timestampMs <= endTimestamp;
        });

        console.log(`Filtered results: ${filtered.length} points.`);

        if (filtered.length > 0) {
            Visualizer.renderChart(filtered);
            document.getElementById('output').textContent = `Showing ${filtered.length} data points.`;
        } else {
            console.error("Zero points found in range.");
            document.getElementById('output').textContent = "Warning: No data in this range.";
        }
    },

    /**
     * Updates the date input fields based on the full range of merged data.
     */
    updateDateRangeUI() {
        if (this.mergedData.length === 0) return;

        const firstEntry = this.mergedData[0].timestamp;
        const lastEntry = this.mergedData[this.mergedData.length - 1].timestamp;

        const formatForInput = (date) => {
            if (!date) return "";
            // Adjust for local timezone to match datetime-local format
            const tzOffset = date.getTimezoneOffset() * 60000; 
            return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
        };

        document.getElementById('startDate').value = formatForInput(firstEntry);
        document.getElementById('endDate').value = formatForInput(lastEntry);
        document.getElementById('datePickerSection').style.display = 'block';
    }
};

// CRITICAL: Start the app
App.init();