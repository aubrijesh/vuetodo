new Vue({
  el: '#app',
  mounted: function() {
  	var existingTodoList = localStorage.getItem("todo_list");
  	if(existingTodoList) {
  		this.todo_list = JSON.parse(existingTodoList)
  	}
  },
  data: {
  	todo_name: "",
  	is_error: false,
  	error_message: "",
  	filtered_todo_type: "all",
  	todo_type: "red",
    tags: ["red", "green", "blue"],
    todo_list: []
  },
  methods: {
  	todoTypeChanged: function(type) {
  		this.todo_type = type
  		console.log("todo type changed");
  	},
  	createTodo: function(event) {
  		console.log("create todo is called");
  		if(this.todo_type == "") {
  			this.is_error = true;
  			this.error_message = "please select todo type";
  		}
  		else if(this.todo_name == "") {
  			this.is_error = true;
  			this.error_message = "please enter todo name";
  		}
  		else {
  			var newTodo = {
  				name: this.todo_name,
  				tag: this.todo_type,
  				description: ""
  			};
  			this.todo_list.push(newTodo);
  			this.todo_name = "";
  			localStorage.setItem("todo_list", JSON.stringify(this.todo_list))
  		}
  	},
  	openTodo: function(event) {
  		console.log("open todo is called")
  	},
  	filterTabSelected: function(filterType) {
  		this.filtered_todo_type = filterType;
  	}
  }
  ,
  computed: {
    // a computed getter
    filteredTodoList: function () {
      var todoList = this.todo_list;
      var self = this;
      if(this.filtered_todo_type != "all") {
      	todoList = todoList.filter(function(obj, index) {
      		return obj.tag == self.filtered_todo_type;
      	});
      }
      return todoList;
    }
  }
});

