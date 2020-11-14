import axios from "axios"

axios.defaults.baseURL = "http://localhost:8181/habit.php"
axios.defaults.timeout = 3000

export default {
    get: function(url,data){
        return new Promise(
            function(resolve,reject){
                axios.get(url, {
                    params: {
                      ID: data
                    }
                  })
                  .then(function (response) {
                    resolve(response);
                  })
                  .catch(function (error) {
                    reject(error);
                  })
            }
        )
    },

    post: function(url,data){
        return new Promise(
            function(resolve,reject){
                axios.get(url, {
                     data
                  })
                  .then(function (response) {
                    resolve(response);
                  })
                  .catch(function (error) {
                    reject(error);
                  })
            }
        ) 
    },

    all: function(list){
      return new Promise( function(resolve,reject){
        axios.all(list)
       .then(axios.spread(function (...response) { 
         resolve(response);
       }))
       .catch(function (error) {
         reject(error);
       })
      })
    }
}