export default{
    getisFullScreen:state => {
        return state.isFullScreen
    },
    getisMiniPlayer:state => {
        return state.isMiniPlayer
    },
    getisPlayMode:state => {
        return state.isPlayMode
    },
    getisListPlay:state => {
        return state.isListPlay
    },
    getCurrentMode:state => {
        return state.CurrentMode
    },
    getDetailSong:state => {
        return state.DetailSongs
    },
    // 因为异步，所以第一次拿不到数据，会报错，所以再写了一个调用数据的
    getsong:state => {
        return state.CurrentSong
    },
    getlyric:state => {
        return state.lyric
    },
    getSongUrl:state => {
        return state.SongUrl
    },
    getCurrentIndex:state => {
        return state.SongIndex
    },
    getCurrentime:state => {
        return state.Currentime
    },
}