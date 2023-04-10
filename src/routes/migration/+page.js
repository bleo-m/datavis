import * as d3 from 'd3';

export async function load({ params }) {
    const csvData = await d3.csv('http://127.0.0.1:8080/src/routes/migration/main_table.csv');
    return {csv: csvData};
}