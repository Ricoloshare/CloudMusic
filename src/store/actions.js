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
import {getSongDetail,getlyric,getSongUrl} from '../api/index'
export default{
    setFullPlayer({ commit },flag){
        commit(SET_FULL_SCREEN,flag)
    },
    setMiniPlayer({ commit },flag){
        commit(SET_MINi_SCREEN,flag)
    },
    setPlayMode({ commit },flag){
        commit(SET_PLAY_MODE,flag)
    },
    setPlayList({ commit },flag){
        commit(SET_PLAY_LIST,flag)
    },
    setCurrentMode({ commit },flag){
        commit(SET_NOW_MODE,flag)
    },
    async setDetailSong({ commit },ids){
        let result = await getSongDetail(ids.join(','));
        let list = [];
        result.data.songs.forEach((value) => {
            let obj = {};
            obj.name = value.name;
						obj.picUrl = value.al.picUrl;
						obj.id = value.id;
            value.ar.forEach(function(value,index){
                if(index == 0){
                  obj.ar = value.name; 
                }else{
                  obj.ar +='-' + value.name; 
                }
            })
            list.push(obj);
        });;

        commit(GET_DETAIL_SONG,list)
		},
		async setlyric({ commit },id){
			let result = await getlyric(id);
			let list = [];
			if(result.data.lrc){
				list = parseLyric(result.data.lrc.lyric);
			}else{
				list = ['暂无歌词'];
			}
			commit(GET_LYRICS,list)
		},
		async setSongUrl({ commit },id){
			let result = await getSongUrl(id);
			let url = result.data.data[0].url;
			
			commit(GET_SONG_URL,url)
		},
		setSongIndex({ commit },index){
			commit(SET_NOW_INDEX,index)
		},
		setPlayTime({ commit },time){
			commit(	SET_PLAY_TIME,time) 
		},
}

function parseLyric(data) {
	let lyc = data.split('\n');
	let reg = /\[\d*:\d*\.\d*\]/g;
	let reg2 = /\[\d*/i;
	let reg3 = /\:\d*/i;
	let obj = {};
	lyc.forEach(function(data) {
		let timestr = data.match(reg);
		if(!timestr) return   // 一开始没有数据，会导致后面报错
		let lyric = data.split(timestr)[1];
	
		let mins = data.match(reg2)[0].substr(1,2);
		let seds = data.match(reg3)[0].substr(1,2);
		let time = parseInt(mins) * 60 + parseInt(seds);

		obj[time] = lyric;
	});
	return obj
}