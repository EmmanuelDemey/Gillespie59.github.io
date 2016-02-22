---
layout: post
title: How to avoid hosting issue with AngularJS et TypeScript
categories: []
tags: ["Google", "Angular2", "AngularJS", "JavaScript", "TypeScript"]
fullview: true
twittertitle: How to avoid hosting issue with AngularJS et TypeScript
twitterdescription: A very small article about how I solve a hoisting issue with my AngularJS-TypeScript application
twitterimage: http://lauterry.github.io/slides-prez-angular/img/angularjs.png
---

This a very quick article about an issue I had fews days ago. I gave some trainings about how to prepare your AngularJS application to Angular2. 
This training is based on three steps : 
  - Use AngularJS coding rules
  - Use TypeScript
  - And finally migrate the TypeScript application to Angular2. 

But with TypeScript, I had a simple issue and I spent fews minutes to find the solution. Here is the code : 

{% highlight typescript %}
angular.module('myModule').controller('MyController', MyController)
class MyController {

}
{% endhighlight %}


What is your first impression of this code ? It should work. I think... but in fact if you copy/past this snippet in 
your TypeScript application, you will have a small JavaScript exception. 

The magic come from the **hoisting** behavior. With this behavior, all variable definition are moved, at runtime, at the top of the execution stack. For example, 
the definition of the *hoist* variabe is moved at the very beginning of the *foo* function. 

{% highlight javascript %}
//In your code
function foo(){
  if(true){
    var hoist = true;
  }
}

//At runtime
function foo(){
  var hoist;
  if(true){
    hoist = true;
  }
}
{% endhighlight %}


And this is exactly the same behavior I have with my TypeScript code. If you copy/paste my code into the online TypeScript compiler, you will get this result 

{% highlight javascript %}
angular.module('myModule').controller('MyControlller', MyControlller);
var MyController = (function () {
    function MyController() {
    }
    return MyControlller;
}());
{% endhighlight %}

And if you follow the same process as the one explained previously, at runtime, the previous code is replaced by the following one : 

{% highlight javascript %}
var MyController;
angular.module('myModule').controller('MyControlller', MyControlller);
MyController = (function () {
    function MyControlller() {
    }
    return MyControlller;
}());
{% endhighlight %}

So at runtime, we add our controller to the AngularJS configuration, but the myController variable is in fact undefined, and not the function returned by the IIFE function. 

To solve this issue, you just have to move the register of the component at the very end of your file : 

{% highlight typescript %}
class MyController {

}
angular.module('myModule').controller('MyController', MyController)
{% endhighlight %}
