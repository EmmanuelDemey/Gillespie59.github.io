---
layout: post
title: How to execute Angular2 code before any rendering
categories: []
tags: ["Google", "Angular2", "JavaScript", "TypeScript"]
fullview: true
twittertitle: How to execute Angular2 code before any rendering
twitterdescription:How to execute Angular2 code before any rendering
twitterimage: http://lauterry.github.io/slides-prez-angular/img/angularjs.png
---

Sometimes, in a single page application, we need to execute some code
before any rendering. For exemple, before the execution of your code, 
you may need to send an HTTP request to fetch some configuration from 
your server. How can we implement this kind of behavior in Angular2... with a provider. 

The framework give you access to the token `APP_INITIALIZER`. This token is 
defined in the `application_init.ts` file (https://github.com/angular/angular/blob/master/modules/@angular/core/src/application_init.ts).

{% highlight typescript %}
export const APP_INITIALIZER: any = new OpaqueToken('Application Initializer');
{% endhighlight %}

In order to know how to use this token, we can have a look to the ApplicationInitStatus
service defined in the same file. 

{% highlight typescript %}
constructor(@Inject(APP_INITIALIZER) @Optional() appInits: (() => any)[]) {
}
{% endhighlight %}

The constructor of this service will inject the APP_INITIALIZER token, and its
value is an array of functions. These functions can execute synchronous or asynchronous
code. For asynchronous task, these functions should return the `Promise` object, in order
to let the framework know when all promises are resolved. 

As an example, I will create a `ConfigService` service, that will be executed during
the initialization of the application, and we will set the result of an HTTP call to a 
`config` property. 

First, the next snippet is the implementation of the `ConfigService` service : 

{% highlight typescript %}
@Injectable()
export class ConfigService {

    private _config: any;

    constructor(private http: Http){}

    load(): Promise<any>{
        return this.http.get('/api/config')
              .map( (response: Response) => response.json())
              .toPromise()
              .then(data => {
                  this._config = data;
                  return data;
               })
    }
    
    get config(): any {
        return this._config;
    }
}
{% endhighlight %}


Next, you need to define a provider for this service, and add the call to the `load` method to the `APP_INITIALIZER` token. Do not 
forget the `multi` parameter. As this token is an array of function, this pararmeter is mandatory for appending a new value to this
array. 

{% highlight typescript %}
@NgModule({
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ConfigService) => function() {return configService.load()},
      deps: [ConfigService],
      multi: true
    }]
})
export class ApplicationModule { }
{% endhighlight %}

