---
layout: post
title: Concaténer vos css avec le plugin usemin
categories: []
tags: [Grunt, NodeJS, JavaScript]
fullview: true
---

Voici un petit article pour expliquer l'usage du plugin grunt-usemin afin de concaténer vos fichiers statiques avant de mettre votre application en production. 


Pour pouvoir utiliser ce plugin, il faut d'abord exécuter npm install grunt-usemin --save-dev. Une fois intallé, vous avez à disposition deux nouvelles tâches Grunt : 

- useminprepare : cette tâche va parser les fichiers html (voir ci-dessous) afin de surcharger la configuration des plugins grunt-contrib-concat, grunt-contrib-cssmin et grunt-contrib-uglify. 
- usemin : cette tâche va regénérer les fichiers HTML, afin de remplacer les ressources statiques par celles optimisées. 

Il faut donc inclure également les plugins suivant dans votre projet : grunt-contrib-concat, grunt-contrib-cssmin et grunt-contrib-uglify. La tâche useminprepare doit etre exécutée en premier, et usemin en dernier. 

La configuration du plugin est très simple. Voici un exemple pour des feuilles de style, mais c'est identique pour des fichiers javascript. 

Dans le fichier HTML que nous voulons optimiser, nous devons ajouter un commentaire indiquant le type de ressources nous manipulons, et également le nom du fichier qui sera créé. 

{% highlight xml %}
<html>
  <head>
    <!-- build:css  style/styles.css-->
          <link href="style/style.css" rel="stylesheet" type="text/css" />
          <link href="style/emoji.min.css" rel="stylesheet" type="text/css" />
      <!-- endbuild -->
  </head>
</html>
{% endhighlight %}


Ensuite, dans votre fichier Gruntfile.js, il suffit de charger le plugin, grâce à la méthode loadNpmTasks, et de configurer les deux tâches décrites précédemment. 
Il est préférable de ne pas faire ces traitements directement dans votre application. Dans mon projet, je fais d'abord une copie du projet dans autre répertoire 'prod', sur lequel nous allons exécuter toutes les tâches d'optimisation définies dans Grunt. 

{% highlight xml %}
grunt.initConfig({
    useminPrepare: {
        html: 'prod/index.html',
        options: {
            dest: 'prod'
        }
    },
    
    usemin: {
        html: 'prod/index.html'
    }
});
grunt.loadNpmTasks('grunt-usemin');
{% endhighlight %}
        
Une fois les tâches exécutées, le fichier html importera le nouveau fichier CSS créé par le plugin :

{% highlight xml %}
<html>
  <head>
    
      <link href="style/styles.css" rel="stylesheet" type="text/css" />  
      
  </head>
</html>
{% endhighlight %}
