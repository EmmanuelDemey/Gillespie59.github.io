---
layout: post
title: How to enabled CSP on App Engine
categories: []
tags: ["Google", "AppEngine", "Security"]
fullview: true
twittertitle: How to enabled CSP on App Engine
twitterdescription: A quick AppEngine configuration for enabling Content-Security-Header HTTP header in order to make your application more secure
twitterimage: http://www.appscale.com/wp-content/uploads/2013/10/google-app-engine-logo.png
---

In this article, we won't talk about the Content Seccurity Policy (CSP). You already have a lot of awesome documentations, blog posts about this W3C recommendation. The one I prefer is [the article](http://www.html5rocks.com/en/tutorials/security/content-security-policy/?redirect_from_locale=fr) written by [Mike West](https://twitter.com/mikewest) on the (also amazing) HTML5Rocks website. 

Just to summarize, CSP is a W3C recommendation, that provides a new standard HTTP header (**Content-Security-Policy**), used to list all resources that browsers is allowed to download on that page. This header is used to prevent cross-site scripting attacks. 

In my simple Google Application, I have added this useful header in order to make my "not-yet" awesome application more secure. As you already had a look to my [previous post](http://gillespie59.github.io/2015/08/06/google-appengine-setup.html), you are already aware of my Angular 2 application. I have to import JavaScript scripts from 
* the same domain (for my application scripts)
* code.angularjs.org (for AngularJS)
* jsmp.io (for SystemJS)
* github.jspm.io (for Traceur-runtime)

In the AppEngine Yaml configuration file, I will add this new HTTP header for the URL matching my index.html file :

{% highlight yaml %}
- url: /
  static_files: static/index.html
  upload: static/index.html
  expiration: "15m"
  http_headers:
    Content-Security-Policy: "script-src 'self' code.angularjs.org jspm.io github.jspm.io;'"
{% endhighlight %}

The **self** placeholder stands for all JavaScript files hosted on the same domain of your application. 
Once you have added this header, your browser will warn you if you try to download a JavaScript file from a different domain. 

In fact, If you launch my Angular2 application with this configuration, it won't work anymore for two reasons. 

* First, in our index.html file, we ask SystemJS to import our app component. But by default all inline JavaScript are disabled by the CSP recommendation. You have to enable it with the **unsafe-inline** placeholder.
* Secondly, I think AngularJS use the JavaScript eval method, also disabled by default, for security reason. You have to enable it thanks to the **unsafe-eval** placeholder. 

At the end, your CSP configuration should look like : 

{% highlight yaml %}
- url: /
  static_files: static/index.html
  upload: static/index.html
  expiration: "15m"
  http_headers:
    Content-Security-Policy: "script-src 'self' 'unsafe-inline' 'unsafe-eval' code.angularjs.org jspm.io github.jspm.io;'"
{% endhighlight %}

For the purpose of this post, I have only configured CSP for JavaScript scripts, but you can of course limit CSS files, images, ... downloaded by the browser. 




