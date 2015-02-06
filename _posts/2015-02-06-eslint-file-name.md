---
layout: post
title: Récupérer le nom du fichier JavaScript dans vos règles ESLint
categories: []
tags: ["ESLint", "NodeJS", "JavaScript", "Qualité"]
fullview: true
twittertitle: ESLint - Informations de Context
twitterdescription: Récupérer le nom du fichier JavaScript dans vos règles ESLint
twitterimage: https://pbs.twimg.com/profile_images/422081374422446080/RNoIP-zD.png
---

Si vous avez lu d'autres articles de ce blog, vous vous doutez que j'aime beaucoup l'outil ESLint qui permet de vérifier la qualité de votre code JavaScript. Le gros avantage de cet outil, si nous le comparons à JSHint ou JSLint, c'est le fait de pouvoir créer très facilement de nouvelles règles, liées à votre application, vos technologies, vos équipes, ...

Voici une petite astuce que j'ai découvert la semaine dernière. Si vous voulez exécuter une règle en fonction du fichier en cours, vous allez pouvoir récupérer le nom de ce fichier grâce à l'objet context disponible dans votre module. Pour rappel, une règle ESLint correspond à un module défini dans un fichier. 

Dans l'exemple ci-dessous, le paramètre context sera valorisé automatiquement par ESLint. Il possède une méthode très intéressante : getFilename(); qui, comme son nom l'indique, retournera le nom du fichier. 


{% highlight javascript %}
module.exports = function(context) {
        
    "use strict";

    return {

        "CallExpression": function(node) {
                if(context.getFilename() === "protractor.js"){

                } else {

                }
            
        }
    };

};
{% endhighlight %}

