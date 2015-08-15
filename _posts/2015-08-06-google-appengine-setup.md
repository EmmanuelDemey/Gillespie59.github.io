---
layout: post
title: How to configure App Engine for your Go application
categories: []
tags: ["Google", "AppEngine"]
fullview: true
twittertitle: How to configure App Engine for your Go application
twitterdescription: Quick How-to with the basic App Engine configuration for an applicaiton using REST API and static files
twitterimage: http://www.appscale.com/wp-content/uploads/2013/10/google-app-engine-logo.png
---

A new blog post since a long long… very long time. I promise I will write articles more often than in the past. For this rebirth, I will start with the first article of a serie about Google technologies. 

I have started last week a project in which I will only use Google technologies. It will help myself to learn new stuff. I won't explain what this application will be used for, I will let you discover with these blog posts.

What I have in mind for the moment, is an application using : 

- The **Go** language for the server-side hosted on **App Engine**
- **Angular2** and **Material Design Lite** for the front-end

If you have other ideas for the technical stack, do not hesitate to comment one of my posts, or create issues on the Github repository. I will be very glad to have a look to your ideas, and write some articles about them.

In a daily bases, I am working with front-end technologies (HTML5, AngularJS, jQuery, ...). All articles I will write about server-side components will be maybe too simple for some of you. I am sorry for that. But the main goal of this serie of posts is the discover of Google products. 

Let start with the beginning… with the quick configuration of my **App Engine** instance, defined in a app.yaml file. 

The application will be composed of two parts : an REST API (implemented in **Go**) and an interface (using **Angular2**). The UI part should be available at “/” and the API at “/api/”. In the app.yaml configuration file of **App Engine**, I have to configure differents handlers, in a `handler` block,  based on an URL pattern. 

Here is the basic version of this file, defining the technology of the application hosted on **App Engine**. 


{% highlight yaml %}
application: xxxxxxx
version: 1
runtime: go
api_version: go1

handlers:
#handlers
{% endhighlight %}


Here is the description of these properties : 

- `application` : the ID of the application you have created on App Engine
- `version` : the version of your application
- `runtime` : the App Engine runtime needed for your application
- `app_version` : the version of the runtime

The first handler we will define is for the REST API. We have to define two properties :

- `url` : the pattern of the URL. In this regular expression, you can define capture group (more informations about these groups later). 
- `script` : the name of the script App Engine has to execute for this URL pattern. For **Go** application, you have to use the magic string `_go_app`.

{% highlight yaml %}
handlers:
- url: /api/.*
  script: _go_app
{% endhighlight %}

When your API is implemented, if you launch your application with the **goapp** utility (maybe a specific article about this command line tool ?), your API should be available !

So we have our API, let’s configure our static files (CSS, JS and HTML for the moment). We will define the same kind of configuration described previously. 

For each URL pattern (based on the file extension) , we will define at least three properties : 

- `mime_types` : the mime-type of the corresponding static file
- `static_files` : the path of the files matched by the URL pattern. You can access to capture groups defined in the URL pattern ("\1" refer to the first group, "\2" the second one...).
- `upload` : a regexp corresponding to the path of all files served by this handler

Other configuration properties are available, I let you read [the corresponding documentation](https://cloud.google.com/appengine/docs/python/config/appconfig#Python_app_yaml_Static_file_pattern_handlers).

{% highlight yaml %}
handlers:
- url: /(.*\.css)
  mime_type: text/css
  static_files: static/\1
  upload: static/(.*\.css)

- url: /(.*\.js)
  mime_type: text/javascript
  static_files: static/\1
  upload: static/(.*\.js)

- url: /(.*\.html)
  mime_type: text/html
  static_files: static/\1
  upload: static/(.*\.html)

- url: /
  static_files: static/index.html
  upload: static/index.html
{% endhighlight %}


Of course, this small configuration is not enough. You should add for every static files your App Engine instance has to serve, the corresponding configuration block (XML, font, …). You can have a look to the file I have created for the application [here](https://github.com/Gillespie59/google-project/blob/master/app.yaml).

And this first post is now drawing to a close. You should have now an up-and-running application you can deploy on App Engine. 

See you soon...



