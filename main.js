// axios global
axios.defaults.headers.common['X-Auth-Token'] = 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

const instance = axios.create();

new Vue({
    el: "#app",
    vuetify: new Vuetify(),
    data: {
      title: "Axios Testing",
    },
    methods: {
      getTodos: function () {
        console.log("get");
        // axios({
        //     methods: 'get',
        //     url:'https://jsonplaceholder.typicode.com/todos',
        //     params: {
        //         _limit : 5
        //     }
        // })
        axios.get('https://jsonplaceholder.typicode.com/todos', {params: {
            _limit : 5
        }})
        .then(res => this.showData(res))
        .catch(err => console.err(err))
      },

      postTodos: function () {
        console.log("post");
        axios.post('https://jsonplaceholder.typicode.com/todos', {
            title: "Go go power ranger",
            completed: true
        })
        .then(res => this.showData(res))
        .catch(err => console.err(err))
      },

      updateTodos: function () {
        console.log("Update Request");
        axios.put('https://jsonplaceholder.typicode.com/todos/1', {
            title: "BTPNS",
            completed: true
        })
        .then(res => {this.showData(res)})
        .catch(err => console.err(err))
      },

      deleteTodos: function () {
        console.log("Delete Request");
        axios.delete('https://jsonplaceholder.typicode.com/todos/1')
        .then(res => {this.showData(res)})
        .catch(err => console.err(err))
      },

      simTodos: function () {
        console.log("Sim Request");
        axios.all([
            axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
            axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5'),
        ])
        .then(res => {
            console.log(res[0]);
            // console.log(res[1])
            this.showData(res[1]);
        })
        // .then(axios.spread((todos, post) =>  this.showData(post)))
        .catch(err => console.err(err))
      },

      headerTodos: function () {
        console.log("Header Request");
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'zydane'
          }
        }
        axios.post('https://jsonplaceholder.typicode.com/todos', {
          title: "Go go power ranger",
          completed: true
      }, config)
      .then(res => this.showData(res))
      .catch(err => console.err(err))
      },

      transformTodos: function () {
        console.log("Transform Request");
        const options = {
          method: 'post',
          url: 'https://jsonplaceholder.typicode.com/todos',
          data: {
            title: 'hai'
          },
          transformResponse: axios.defaults.transformResponse.concat(data => {
            data.title = data.title.toUpperCase()
            return data
          })
        }

        axios(options).then(res => this.showData(res))
      },

      errorTodos: function () {
        console.log("Error Request");
        axios.get('https://jsonplaceholder.typicode.com/todoss', {params: {
            _limit : 5
        }})
        .then(res => this.showData(res))
        .catch(err => {
          if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);

            if (err.response.status === 404) {
              alert('Error: page not found :(')
            }
          } else if (err.request){
            console.log(err.request);
          } else {
            console.log(err.message);
          }
        })
      },

      cancelTodos: function () {
        console.log("Cancel Request");
        const source = axios.CancelToken.source()

        axios.get('https://jsonplaceholder.typicode.com/todos', {
          cancelToken: source.token
        })
        .then(res => this.showData(res))
        .catch(thrown => {
          if (axios.isCancel(thrown)) {
            console.log('Request Canceled', thrown.message);
          }
        })  

        if (true) {
          source.cancel('Request Canceled!')
        }
      },

      showData: function (res) {
        console.log(res);
        document.getElementById('res').classList.remove('d-none')

        // status 
        const status = document.getElementById('status');
        let textStatus = document.createTextNode(res.status);
        status.appendChild(textStatus)

        // header
        const header = document.getElementById('textHeader')
        let textHeader = document.createTextNode(JSON.stringify(res.headers, null, 2));
        header.appendChild(textHeader)

        // data
        const data = document.getElementById('textData')
        let textData = document.createTextNode(JSON.stringify(res.data, null, 2));
        data.appendChild(textData)

        // config
        const config = document.getElementById('textConfig')
        let textConfig = document.createTextNode(JSON.stringify(res.config, null, 2));
        config.appendChild(textConfig)

      }
    },
    // created(){
     
    // }
});


instance.interceptors.request.use(function (config) {
  console.log(`${config.method.toUppercase()} request to ${config.url}`);
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});