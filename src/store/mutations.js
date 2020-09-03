import {
    SET_MINi_SCREEN, 
    SET_FULL_SCREEN,
    SET_PLAY_MODE,
    SET_PLAY_LIST,
    SET_NOW_MODE,
    GET_DETAIL_SONG,
    GET_LYRICS,
    GET_SONG_URL,
    SET_NOW_INDEX,
    SET_PLAY_TIME
} from './mutations-type'

export default{
    [SET_FULL_SCREEN](state,flag){
        state.isFullScreen = flag;
        if(state.isFullScreen){
            state.isMiniPlayer = false;
        }
    },
    [SET_MINi_SCREEN](state,flag){
        state.isMiniPlayer = flag;
    },
    [SET_PLAY_MODE](state,flag){
        state.isPlayMode = flag;
    },
    [SET_PLAY_LIST](state,flag){
        state.isListPlay = flag;
    },
    [SET_NOW_MODE](state,flag){
        state.CurrentMode = flag;
    },
    [GET_DETAIL_SONG](state,list){
        state.DetailSongs = list;
        let obj={
            name: '',
            ar: '',
            picUrl: null,
            id: null,
            songUrl:''
        }
        if(state.DetailSongs.length == 0)
        {
            state.CurrentSong = obj
        }else{
            state.CurrentSong = state.DetailSongs[state.SongIndex] //直接返回state.DetailSongs[state.SongIndex]会报错
        }
    },
    [GET_LYRICS](state,list){
        state.lyric = list;
    },
    [GET_SONG_URL](state,url){
        if(url==null){
            url = '';
        }
        state.CurrentSong.songUrl = url;
        state.SongUrl = url;
        console.log(url);
    },
    [SET_NOW_INDEX](state,index){
        state.SongIndex = index;
        state.CurrentSong = state.DetailSongs[state.SongIndex] //直接返回state.DetailSongs[state.SongIndex]会报错
    },
    [SET_PLAY_TIME](state,time){
        state.Currentime = time;
    },
}