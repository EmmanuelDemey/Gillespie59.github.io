---
layout: post
title: Récupérer la configuration Protractor dans vos tests
categories: []
tags: ["AngularJS", "NodeJS"," Protractor"]
fullview: true
twittertitle: Protractor - Tester vos application AngularJS 
twitterdescription: Récupérer la configuration dans vos tests
twitterimage: http://cronj.com/blog/wp-content/uploads/2014/12/protractor-qa-logo.png
---

Un petit article pour partager une petite astuce que je viens d'utiliser pour l'un de mes projets. 

Comme la plupart d'entre vous ;), j'utilise bien sûr Protractor pour tester mes application AngularJS. Dans l'une de mes applications, j'avais besoins de récupérer la propriété baseUrl définie dans le fichier de configuration Protractor, afin de l'utiliser dans mes tests. 

Rien de plus simple... Comme le fichier de configuration Protractor est un Module (utilisant exports.config), il est dont possible d'importer ce module, et d'aller récupérer le ou les propriétés que vous avez besoin : 

{% highlight javascript %}
(function(){
	'use strict';

	var conf = require('../protractor.conf.js');
	
	console.log(conf.config.baseUrl);

	describe('Home Page ', function() {

		beforeEach(function () {
			browser.get('/#/');
		});
	});
})();
{% endhighlight %}