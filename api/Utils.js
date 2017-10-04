/**
 * Created by pajakoo on 2/24/17.
 */

var api = {

  baseUrl: 'http://10.10.0.119:8080',
  //baseUrl: 'http://87.126.166.28:8080',

  getData:function () {
    //return fetch("http://omdbapi.com/?s=star&y&r=json").then((res) => res);
    //return fetch("https://79.100.190.102:8080/get/all").then((res) => res.json());
    //return fetch("http://" + Servers.API_SERVER + ":" + process.env.PORT + "/users/get/all").then((res) => res.json());
    return fetch("http://87.126.166.28:8080/get/all").then((res) => res.json());

  }
}
module.exports = api;
