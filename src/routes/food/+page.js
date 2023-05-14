import * as d3 from 'd3';

/**
 * Get csv data from parent file
 */
export async function load({ parent }) {
    await parent();
    return;
}
