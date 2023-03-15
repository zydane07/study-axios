new Vue({
    el: "#app",
    vuetify: new Vuetify(),

    methods: {
      getTodos: function () {
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
            title: "Go go power ranger",
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
        // .then(res => {
        //     console.log(res[0]);
        //     console.log(res[1])
        //     this.showData(res[1]);
        // })
        .then(axios.spread((todos, post) => this.showData(post)))
        .catch(err => console.err(err))
      },

      headerTodos: function () {
        console.log("Header Request");
      },

      transformTodos: function () {
        console.log("Transform Request");
      },

      errorTodos: function () {
        console.log("Error Request");
      },

      cancelTodos: function () {
        console.log("Cancel Request");
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
});