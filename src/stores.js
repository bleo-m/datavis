import {persisted} from 'svelte-local-storage-store';
import * as d3 from 'd3';

// stores animationDirections
export const animationDetails = persisted('animationDetails', {direction: 'Left'});

// get data from remote csv file, but only fetch once instead on every page we need it
let maintableData = [];
d3.csv('https://gist.githubusercontent.com/bleo-m/9c41a5d7fb245e84aafd2b3ba19c68b9/raw/6f74fd01b37abf8bfcc6866d5f6c8fa6815ebeb5/main_table.csv').then((csv)=>{maintableData = csv;});
export const mainTable = persisted('mainTable', maintableData);

// used for animation purposes
export const oppositeDirections = {
    'Left': 'Right',
    'Right': 'Left',
    'Up': 'Down',
    'Down': 'Up'};