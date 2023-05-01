import * as d3 from 'd3';

/**
 * From the svelte documentation: 
 * Often, a page will need to load some data before it can be rendered. For this, we add a +page.js module that exports a load function:
 */

// import data into page.svelte somehow. Svelte has a weird architecture because it has a different coupling between server and client.
export async function load({ params }) {
    const csvData = await d3.csv('https://gist.githubusercontent.com/liur1111/0c6653ebcaccd6046c619af49b19ea5e/raw/06012f1f81facd1db2694a525f81aaeca496512c/honduras_rainfall_anomalies');
    return {csv: csvData};
}
