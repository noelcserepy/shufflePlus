import create from "zustand";

const useStore = create(set => ({
	playlists: [],
	setPlaylists: playlists => set(state => ({ ...state, playlists })),

	currentPlaylist: null,
	setCurrentPlaylist: currentPlaylist =>
		set(state => ({ ...state, currentPlaylist })),

	editPlaylist: null,
	setEditPlaylist: editPlaylist => set(state => ({ ...state, editPlaylist })),
}));

export default useStore;
