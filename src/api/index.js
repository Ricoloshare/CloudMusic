import Netword from './netword'

export const getBanner = () => Netword.get("banner?type=2");
export const getPersonalized = () => Netword.get("personalized?limit=6");
export const getNewalbum = () => Netword.get("album/newest"); 
export const getNewMusic = () => Netword.get("personalized/newsong"); 
export const getPlaylistdetail = (data) => Netword.get(`playlist/detail?id=${data}`); 
export const getAlbum = (data) => Netword.get(`album?id=${data}`); 
export const getlyric = (data) => Netword.get(`lyric?id=${data}`); 
export const getSongUrl = (data) => Netword.get(`song/url?id=${data}`); 
export const getSongDetail = (data) => Netword.get(`song/detail?ids=${data}`); 
export const getSuggestSearch = (data) => Netword.get(`search/suggest?keywords= ${data}&type=mobile`); 
// export const getHotSinger = () => Netword.get('/top/artists?offset=0&limit=3'); 
export const getHotSinger = () =>{
    return new Promise(function(resolve, reject){
        Netword.get('top/artists?offset=0&limit=3')
            .then(function(res){
                resolve(res.data.artists);
            })
            .catch(function(err){
                reject(err);
            })
    })
}

export const getABZSinger = (abc) =>{
    let list = [];
    return new Promise(function(resolve, reject){
        Netword.all([
            Netword.get(`artist/list?offset=0&limit=3&type=1&area=-1&initial=${abc}`),
            Netword.get(`artist/list?offset=0&limit=3&type=2&area=-1&initial=${abc}`),
        ])
            .then(function(res){
                res.forEach((result) => {
                    list.push(...result.data.artists);
                });
                resolve(list);
            })
            .catch(function(err){ 
                reject(err);
            })
    })
}
export const getAllSinger = (abc) =>{
    return new Promise(function(resolve, reject){
        let keys = ['热']
        let list=[];
        let obj = {};
        list.push(getHotSinger()) ;
        for(let i = 65; i < 91;i++){
            let char = String.fromCharCode(i);
            keys.push(char);
            list.push(getABZSinger(char)) ;
        }
        Netword.all(list)
            .then(function(res){
                obj.key = keys;
                obj.lists = res;
                resolve(obj);
            })
            .catch(function(err){ 
                reject(err);
            })
    })
}

export const getSearch = (keyword) => Netword.get(`search?type=1&limit=20&keywords= ${keyword}`); 
export const getRecomvideo = () => Netword.get('personalized/mv'); 
export const getVideoUrl = (id) => Netword.get(`mv/url?id=${id}&r=1080 `); 
// export const getSearch = (keyword) =>{
//     return new Promise(function(resolve, reject){
//         Netword.all(
//             Netword.get(`search?type=1&limit=6&keywords= ${keyword}`),
//             Netword.get(`search?type=1&limit=6&keywords= ${keyword}`),
//         )
//             .then(function(res){
//                 resolve(res);
//             })
//             .catch(function(err){ 
//                 reject(err);
//             })
//     })
// }

