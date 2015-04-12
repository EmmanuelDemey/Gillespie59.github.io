---
layout: post
title: Android Maven Plugin!
categories: [maven, android]
tags: [Maven, Android, Google]
fullview: true
---

Depuis quelques mois, Google préconise l'utilisation de Gradle pour tous nouveaux projets Android. Si vous êtes encore de l'ancienne version (Maven), il existe un plugin (<a href="https://code.google.com/p/maven-android-plugin/" target="_blank">Android Maven Plugin</a>), qui vous proposera de nouveaux goals pour gérer le cycle de vie de votre application Android : 

- Packaging
- Obfuscation de votre code
- Tests
- Installer/Désinstaller votre applications sur un Android
- Démarrer un émulateur.
- ...

Pour bénéficier de ce plugin, il suffit de l'ajouter dans le pom.xml de votre projet: 

{% highlight xml %}
<plugin>
  <groupId>com.jayway.maven.plugins.android.generation2</groupId>
  <artifactId>android-maven-plugin</artifactId>
  <version>3.9.0-rc.2</version>
</plugin>
{% endhighlight %}

Pourtant, j'ai trouvé deux limitations dans ce plugin : 

- Nous pouvons, grâce au paramètre device, définir le ou les appareils Android que nous voulons utiliser. Ce paramètre peut avoir les valeurs suivantes : emulator (tous les émulateurs seront utilisés), usb (tout les téléphones/tablettes connectés via USB) ou encore l'identifiant complet d'un appareil. Il est ainsi impossible de mixer ces configurations, pour choisir, par exemple, d'utiliser tous les émulators et 2 téléphones connectés via USB. 
- Impossible de définir des adresses IPs externes correspondant à des téléphones/tablettes/émulateurs que nous souhaitons utiliser lors de nos développements. 


Grâce à deux Pull Requests, ces 2 limitations sont maintenant corrigées :

- <a href="https://github.com/jayway/maven-android-plugin/pull/268" target="_blank">Give the possibility to set a list of device</a>
- <a href="https://github.com/jayway/maven-android-plugin/pull/306" target="_blank">Add Connect and Disconnect mojos</a>


Il est maintent possible de définir une liste de target, ainsi que des adresses IP. Pour pouvoir utiliser ces adresses IP, il sera nécessaire d'exécuter le nouveau goal android:connect avant d'exécuter le goal initial. 


{% highlight xml %}
<plugin>
  <groupId>com.jayway.maven.plugins.android.generation2</groupId>
  <artifactId>android-maven-plugin</artifactId>
  <version>3.9.0-rc.2</version>
  <configuration>
      <devices>
        <device>emulator</device>
        <device>127.0.0.1</device>
        <device>id_of_my_phone</device>
      </devices>
      <ips>
        <ip>127.0.0.1</ip>
      </ips>
  </configuration>
</plugin>
{% endhighlight %}

Ces fonctionnalités sont disponibles dans la dernière version du plugin. 

