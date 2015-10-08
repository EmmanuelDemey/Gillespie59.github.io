---
layout: post
title: How to use the Angular2 @Attribute decorator
categories: []
tags: ["Google", "Angular2", "AngularJS", "JavaScript"]
fullview: true
twittertitle: How to use the Angular2 @Attribute decorator
twitterdescription: A simple example of the @Attribute decorator, for managing javascript polyfills
twitterimage: http://lauterry.github.io/slides-prez-angular/img/angularjs.png
---

A quick article in order to explain one simple Angular2 **decorator**. If you don't know anything about decorators, you should read [the article](http://blog.thoughtram.io/angular/2015/05/03/the-difference-between-annotations-and-decorators.html) written by [Pascal Precht](https://twitter.com/PascalPrecht) on this topic (and you should read all articles of this blog in fact ;)). 

The decorator I would like to present is **@Attribute()**. The decorator has to be used with a parameter of a component's  or Directive's constructor. 

{% highlight javascript %}
import {Directive, Attribute} from 'angular2/angular2'

@Directive({selector: 'input'})
class Component {
   constructor(@Attribute('attributeName') public param:String){
   		
   }
}
{% endhighlight %}

Thanks to this decorator, you are able to retrieve the constant value of an attribute available in the host element of this component. One use case I had in mind when writing this article, is the support of the new HTML5 input types. For browsers that do not support this new input types, and only for these browsers, I would like to use polyfills, like jQuery datepicker for date input.

The name of the annotated parameter should be named exactely the name of the attribute you want to retrieve. 

{% highlight javascript %}
import {Directive, Attribute} from 'angular2/angular2'

@Directive({selector: 'input'})
class DateDirective {
   constructor(@Attribute('type') private type:String, private element:ElementRef){
		if(type === 'date' && myBrowserDoesNotSupportDateInput()) {
		   //Call datepicker jQuery widget on the element.nativeElement attribute
		}   		
   }
}
{% endhighlight %}

Of course, this sample is in fact not the best implementation. Because thanks to the @Directive's selector property, we can directly
select date input with this value : input[type='date']
