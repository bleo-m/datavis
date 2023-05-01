import * as d3 from 'd3';

export const prerender = true;

/**
 * Get data from remote csv file
 */
const getMainTableData = async () => {
    // get data from remote csv file, but only fetch once instead on every page we need it
    const data = await d3.csv('https://gist.githubusercontent.com/bleo-m/9c41a5d7fb245e84aafd2b3ba19c68b9/raw/6f74fd01b37abf8bfcc6866d5f6c8fa6815ebeb5/main_table.csv');
    return data;
}

/**
 * Load data into main page and children pages
 */
export async function load() {
    let csvData = await getMainTableData();
    console.log("hello");
    // if the store is empty, fetch the data from the remote csv file
    return {csv: csvData};
}
