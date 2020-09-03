import {mode} from './mode-type'

export default{
    isFullScreen: false,
    isMiniPlayer: false,
    isPlayMode:false,  //播放暂停
    isListPlay:false,
    CurrentMode: mode.loop,
    DetailSongs:[],
    CurrentSong:{
        name: '',
        ar: '',
        picUrl: null,
        id: null,
        songUrl:''
    },
    SongIndex:0,
    lyric:{},
    SongUrl:'',
	Currentime:0,

}