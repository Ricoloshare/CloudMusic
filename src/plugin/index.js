import Loading from './Loading.vue'
import Vue from 'vue'

export default{
    install:function(){
        // Vue.components(Loading.name,Loading);
        let LoadingContructor = Vue.extend(Loading);

        let LoadingInstance = new LoadingContructor();

        let oDiv = document.createElement('div');
        document.body.appendChild(oDiv);
        LoadingInstance.$mount(oDiv);

        Vue.iShow = function () {
            LoadingInstance.ishow = true;
        }
        Vue.ihidden = function () {
            LoadingInstance.ishow = false;
        }
    }
}
