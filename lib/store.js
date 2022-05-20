import create from "zustand";

const useStore = create(set => ({
	playlists: [],
	setPlaylists: playlists => set(state => ({ ...state, playlists })),

	currentTracks: [],
	setCurrentTracks: currentTracks =>
		set(state => ({ ...state, currentTracks })),

	currentPlaylist: null,
	setCurrentPlaylist: currentPlaylist =>
		set(state => ({ ...state, currentPlaylist })),

	currentColors: [],
	setCurrentColors: currentColors =>
		set(state => ({ ...state, currentColors })),

	currentEdited: false,
	setCurrentEdited: currentEdited =>
		set(state => ({ ...state, currentEdited })),
}));

export default useStore;
