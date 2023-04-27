import * as d3 from 'd3';

/**
 * From the svelte documentation: 
 * Often, a page will need to load some data before it can be rendered. For this, we add a +page.js module that exports a load function:
 */

// import data into page.svelte somehow. Svelte has a weird architecture because it has a different coupling between server and client.
export async function load({ params }) {
    const csvData = await d3.csv('http://127.0.0.1:8080/src/routes/migration/main_table.csv');
    return {csv: csvData};
}
