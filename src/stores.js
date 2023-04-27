import {persisted} from 'svelte-local-storage-store';
export const animationDetails = persisted('animationDetails', {direction: 'Left'});

// used for animation purposes
export const oppositeDirections = {
    'Left': 'Right',
    'Right': 'Left',
    'Up': 'Down',
    'Down': 'Up'};