import create from "zustand";

const useStore = create(set => ({
	currentPlaylist: null,
	setCurrentPlaylist: currentPlaylist =>
		set(state => ({ ...state, currentPlaylist })),
}));

export default useStore;
