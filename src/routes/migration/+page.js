import * as d3 from 'd3';
import { get } from 'svelte/store';
import { mainTable } from '../../stores.js';
/**
 * From the svelte documentation: 
 * Often, a page will need to load some data before it can be rendered. For this, we add a +page.js module that exports a load function:
 */


// get csv data from the store
export async function load({ params }) {
    let csvData = get(mainTable);  // get the maintable data from the store
    return {csv: csvData};
}
