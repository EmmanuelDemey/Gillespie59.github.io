---
layout: post
title: The ESLint plugin for AngularJS is ready for Angular2
categories: []
tags: ["ESLint", "Google", "JavaScript", "Qualité", "AngularJS", "Angular2"]
fullview: true
twittertitle: The ESLint plugin for AngularJS is ready for Angular2
twitterdescription: How to create new rules specifically for Angular2
twitterimage: https://pbs.twimg.com/profile_images/422081374422446080/RNoIP-zD.png
---

Angular2 is the next version of the amazing JavaScript framework we use sinc few year. As this version is quiet different from the first version, the `eslint-plugin-angular', available on NPM, should give the possilibility to create rules for the first or second version. And, in fact, it is very easy to do, and it is actually already usable. 

We just need to add a new property in the global ESLint `settings` object we can define in the configuration file of this tool. For the `eslint-plugin-angular`, I have decided to create an... `angular` property, that can have two values : 1 (for Angular 1) or 2 (for Angular 2)


{% highlight yaml %}
plugins:
  - angular

rules:
    angular/ng_controller_name:
      - 2
      - '/[A-Z].*Controller$/'

globals:
    angular: true

settings:
    angular: 2
{% endhighlight %}

Once this value defined, we can have access to this property in our rule. We just need to read the value of the `context` object, defined as a parameter of the module, in which the the rule is defined : 

{% highlight javascript %}
module.exports = function(context) {

  'use strict';

  //We disabled this rule for Angular2-based application
  if(context.settings.angular === 2){
    return {};
  }

  return {

    'CallExpression': function(node) {
    }
  }
}
{% endhighlight %}
