import * as d3 from 'd3';

/**
 * From the svelte documentation: 
 * Often, a page will need to load some data before it can be rendered. For this, we add a +page.js module that exports a load function:
 */

// import data into page.svelte somehow. Svelte has a weird architecture because it has a different coupling between server and client.
export async function load({ params }) {
    const csvData = await d3.csv('https://gist.githubusercontent.com/bleo-m/9c41a5d7fb245e84aafd2b3ba19c68b9/raw/6f74fd01b37abf8bfcc6866d5f6c8fa6815ebeb5/main_table.csv');
    return {csv: csvData};
}
