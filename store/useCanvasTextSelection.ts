import { create } from 'zustand';
// Transient selection: never serialized into projects or exported artwork.
export const useCanvasTextSelection = create<{key:string|null;select:(key:string|null)=>void}>(set=>({key:null,select:key=>set({key})}));
