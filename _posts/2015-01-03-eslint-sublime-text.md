---
layout: post
title: Utiliser ESLint directement dans Sublime Text 3
categories: []
tags: [ESLint, IDE, JavaScript]
fullview: true
twittertitle: ESLint directement dans Sublime Text 3
twitterdescription: Comment avoir les erreurs/warnings ESLint directement dans Sublime Text 3
twitterimage: https://pbs.twimg.com/profile_images/422081374422446080/RNoIP-zD.png
---

Bonjour à tous. 

J'ai passé quelques heures hier soir sur ce sujet, et c'est donc pour cela que je partage cette petite astuce. 

Si vous êtes, comme moi, un grand fan de ESLint, l'outil pour vérifier la qualité de votre code JavaScript, ce petit article va sûrement vous être très utile. 

Il existe un package dans Sublime Text, SublimeLinter, qui permet de vérifier la qualité de votre code. A ce package s'ajoutent de nombreux plugins que vous devez utilisé en fonction du type d'applications vous êtes en train de développer : JavaScript, CoffeeScript, PHP, ... Pour le JavaScript, je ne peux que conseiller [SublimeLinter-eslint](https://github.com/roadhump/SublimeLinter-eslint) qui permet d'intégrer notre plugin préféré à Sublime Text. 

Afin d'avoir la même configuration ESLint pour tous mes projets, j'étais à la recherche d'un moyen d'utiliser le paramètre '--config' disponible dans ESLint. 

Grâce au plugin SublimeLinter, il est possible d'ajouter des paramètres à la ligne de commande exécutée. Cette configuration doit être définie dans le fichier Settings de SublimeLinter. Il suffit d'utiliser l'option 'args' pour le linter 'eslint'. 

![Sublime Text Menu]({{ site.url }}/assets/media/ST1.png)

![Sublime Text Configuration]({{ site.url }}/assets/media/ST2.png)

