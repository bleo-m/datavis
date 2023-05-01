import * as d3 from 'd3';
/**
 * From the svelte documentation: 
 * Often, a page will need to load some data before it can be rendered. For this, we add a +page.js module that exports a load function:
 */


/**
 * Get csv data from parent file
 */
export async function load({ parent }) {
    const csvData = [];
    const {csv} = await parent();
    return {data: csvData};
}
