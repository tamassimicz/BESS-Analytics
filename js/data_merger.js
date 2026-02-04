/**
 * DataMerger Module
 * Responsible for synchronizing Solar and Grid datasets into a continuous timeline.
 */
const DataMerger = {
    mergeDatasets(solarData, gridData) {
        const masterMap = new Map();

        const populateMap = (data, type) => {
            data.forEach(row => {
                const ts = row.timestampMs;
                if (!masterMap.has(ts)) {
                    masterMap.set(ts, { 
                        timestamp: row.timestamp,
                        timestampMs: ts, // Added this field!
                        productionKw: 0, 
                        importKwh: 0, 
                        exportKwh: 0 
                    });
                }
                const entry = masterMap.get(ts);
                if (type === 'solar') entry.productionKw = row.productionKw;
                if (type === 'grid') {
                    entry.importKwh = row.importKwh;
                    entry.exportKwh = row.exportKwh;
                }
            });
        };

        populateMap(solarData, 'solar');
        populateMap(gridData, 'grid');

        // Sorting by numeric timestamp
        return Array.from(masterMap.values()).sort((a, b) => a.timestampMs - b.timestampMs);
    }
};
