import * as d3 from 'd3';

/**
 * Get csv data from parent file
 */
export async function load({ parent }) {
    const csvData = await d3.csv('https://gist.githubusercontent.com/liur1111/839281540243c52570280e901c0e42f8/raw/6f13e9abbce8fa48b44969c012e94a7b7f3dcc37/rural_migration');
    await parent();
    return {data: csvData};
}
