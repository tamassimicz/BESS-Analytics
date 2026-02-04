/**
 * CSVHandler Module
 * Designed to handle any date format and specific column ordering.
 */
const CSVHandler = {
    /**
     * Attempts to parse various date formats into a valid Date object.
     * Handles: 2024.10.01, 10/01/2024, 01-10-2024, etc.
     */
    parseUniversalDate(dateString) {
        if (!dateString) return null;

        // Clean Hungarian or dotted formats: 2024.10.01. -> 2024-10-01
        let cleaned = dateString.trim().replace(/\s+/g, ' ');
        if (cleaned.includes('.')) {
            cleaned = cleaned.replace(/\./g, '-').replace(/-$/, '').replace(/-\s/, ' ');
        }

        const dateObj = new Date(cleaned);
        
        // Validation
        if (isNaN(dateObj.getTime())) {
            console.error(`Failed to parse date: ${dateString}`);
            return null;
        }
        return dateObj;
    },

    /**
     * Processes data based on column index rather than header names.
     * Solar: Index 0 = Time, Index 1 = Production
     * Grid:  Index 0 = Time, Index 1 = Import, Index 2 = Export
     */
    processDataset(text, type) {
        const delimiter = this.detectDelimiter(text.slice(0, 1000));
        const lines = text.split(/\r?\n/).filter(line => line.trim() !== "");
        
        if (lines.length < 2) return []; // Header + at least one data row

        return lines.slice(1).map(line => {
            const values = line.split(delimiter).map(v => v.trim());
            const timestamp = this.parseUniversalDate(values[0]);

            let entry = {
                timestamp: timestamp,
                timestampMs: timestamp ? timestamp.getTime() : 0
            };

            if (type === 'solar') {
                // Solar: Column 2 (Index 1) is Production
                entry.productionKw = parseFloat(values[1]?.replace(',', '.') || 0);
            } else if (type === 'grid') {
                // Grid: Column 2 (Index 1) is Import, Column 3 (Index 2) is Export
                entry.importKwh = parseFloat(values[1]?.replace(',', '.') || 0);
                entry.exportKwh = parseFloat(values[2]?.replace(',', '.') || 0);
            }

            return entry;
        }).filter(row => row.timestamp !== null);
    },

    detectDelimiter(text) {
        const commaCount = (text.match(/,/g) || []).length;
        const semiColonCount = (text.match(/;/g) || []).length;
        return semiColonCount > commaCount ? ';' : ',';
    }
};
