console.log("Hello World");


var App = new Marionette.Application();

App.addRegions({
    firstRegion:"#first-region",
    secondRegion:"#second-region",
    thirdRegion:"#third-region",
    fourthRegion:"#fourth-region"
});

//starting the Marionette app
App.on("start", function() {
    console.log("Marionette Has Started.");
    //got a view "ie thing for other things to look like"
    var firstView = new App.FirstView();
    //now we tie a region to that view so it looks like the template which we tied to the view below
    App.firstRegion.show(firstView);
    var postview = new App.PostView({model:firstPost});
    App.secondRegion.show(postview);

    var placesview = new App.PlacesView({collection:c});
    App.thirdRegion.show(placesview);

    var compositeView = new App.CompositeView({model:person, collection:c});
    App.fourthRegion.show(compositeView);

    //says to the backbone system to pay attention to the routes to maintain the history so the back button works, you NEED THIS LINE
    Backbone.history.start();
});
    
//Eh its views like that crazy shit in Backbone
//So this is how we connect with regions
App.FirstView = Marionette.ItemView.extend({
    template: "#first-template"
});


//Anything Backbone can do Marionette can do better! (SING these words)
App.PostView = Marionette.ItemView.extend({
    template: "#post-template",
    tagName: "tr",
    events: {   
    },
    modelEvents: {
	"change" : function() {this.render()}
    }
	
});


App.PostsView = Marionette.CollectionView.extend({
    childView : App.PostView
});

//Composite View Time
App.CompositeView = Marionette.CompositeView.extend({
    template: "#composite-template",
    childView: App.PlaceView,
    childViewContainer : "tbody",
    events : {
	"click #add" : function() {
	    var name = $("#newPost").val();
	    var stuff = $("#newText").val();
	    if (name.length > 0 && stuff.length > 0){
		this.collection.add(new Comment({name:name,text:stuff}));
		$("#newPost").val("");
		$("newText").val("");
	    }
	    
	}
    }
});

/*When in View you can tell view to listen to model events without having to
  bother with stupid models

  The View itself can say I am watiching the model, and can be super vigilent and stuff, making it easy for you to have two different models on the same page wathc the same model*/

//Basically says what do I do when i go to a certain URL, or it manages the possibilites for what happens for certain urls
var myController = Marionette.Controller.extend ( {
    oneRoute: function () {
	console.log("Route One");
	//you cannot reuse the view hence the new view
	App.firstRegion.show(new App.PlaceView({model:p1}));
	App.secondRegion.show(new App.PlaceView({model:p1}));
    },
    twoRoute: function() {
    },
});


App.controller = new myController();
//Router manages where you go and stuff
App.router = new Marionette.AppRouter({
    //every router needs a controller
    controller: App.controller,
    appRoutes: {
	//need quotes around function name
	"one" : "oneRoute",
	"two" : "twoRoute"
    }
});


//Marionette inspector is awesome install it for marionette using

var Post = Backbone.Model.extend({});

var Posts = Backbone.Collection.extend({
    model:Post
});

var Comment = Backbone.Model.extend({});
var Comments = Backbone.Collection.extend({
    model:Comment
});

var makePost = function(title, topic, desc) {
    comments = new Comments([]);
    var Post = New Post({title:title, topic:topic, desc:desc, comments:comments});
    return Post;
};

var startPost = makePost("Zs Class","N/A", "Attempt to make comments on Soft Dev");


			 
//here be dead code
/*var p1 = new Place({name:"Ferry's",rating:42});
var p2 = new Place({name:"Chipotle",rating:900});
var c = new Places([p1,p2]);*/

//Marionettes basic strengths are the overarching application and the views
//if you are using marionette then you are essentially changong the views but
//keeping backbones models and collections because Z says they work

//Marionette extends backbone item view


/*Item view is good for a few things:
  --Plain Markup and Profile Page

The Collection view has been less useful than Z would like
    The people who invented marionette were nice to Z and made the composite and layout view to satisfy this.
*/






App.start();



