<!--11:05 5 minutes -->
<!--11:16 actually WDI2-->

<!--Hook: So who can tell me what a directive is?  (If no answer, can try to piece it together / fill in the blanks).  Well in this class, we'll be building our own from scratch. -->

# Writing Custom Directives

| Objectives |
| :--- |
| *Students will be able to:* |
| **Explain** why custom directives are valuable |
| **Create** a custom directive |

### Preparation

*Before this lesson, students should already be able to:*

- **Describe** Angular directives

## Custom Directives - Intro

As you've seen by now, directives make up a huge amount of the code you work with in Angular. Angular was designed to be an extension of HTML - a way to have custom-defined interactive tags of your own making.

While we've been leveling up at using the directives that come with Angular, it's time to start making some up ourselves.

One of the most obvious _uses_ of this is when you've got repetitive code to render some information or data. If you're using a bunch of the same component all over the place, you would want to use the DRY principle – Don't Repeat Yourself. Instead of writing that component in several different views, you can extract it to a custom directive! We can just reference that directive whenever we need to use it and not worry about repeating the code to render it.

Examples:
* A "card" with info on it (see more below)
* Loading indicator or [progress bar](https://angular-ui.github.io/bootstrap/#/progressbar)
* [Stars rating mechanism](https://angular-ui.github.io/bootstrap/#/rating)
* [Date picker](https://angular-ui.github.io/bootstrap/#/datepicker)
* [Color picker](http://ruhley.github.io/angular-color-picker/)

<!--11:10 5 minutes -->

#### Real World Example

As an example, we're going to mess around with duplicating something that's becoming a common pattern in interface design – the concept of a card. Applications like Twitter, Pinterest, Facebook, and others are moving towards this design pattern.

<img width="571" alt="Twitter" src="https://cloud.githubusercontent.com/assets/25366/9665317/4f8a5e56-5224-11e5-9b9c-fe62d8a6cdf4.png">

Everyone's favorite CSS framework, Bootstrap, is even on board, where in [version 4+ you're able to create a card](http://v4-alpha.getbootstrap.com/components/card/) with just some CSS classes:

<img width="346" alt="Bootstrap" src="https://cloud.githubusercontent.com/assets/25366/9665376/c2bcac6c-5224-11e5-8e4c-807a19a4432a.png">

Let's see if we can make something similar, wrapped up in our own custom HTML element. We want to take something like this:

```html
<div class='card'>
  <h4 class="card-title">{{card.question}}</h4>
  <h6>Cards Against Assembly</h6>
</div>
```

and end up with a reusable `<wdi-card></wdi-card>` component, maybe something like:

```html
<wdi-card question="{{card.question}}"></wdi-card>
```

We want it to look like:

<img width="965" alt="Cards Against Assembly" src="https://cloud.githubusercontent.com/assets/25366/9666972/05a2f348-522e-11e5-8f6c-7c503032eff4.png">

<!--11:15 10 minutes -->

## Know The Code - Independent

[GET THE STARTER CODE HERE!](https://github.com/den-materials/angular-directives-lab/tree/master/starter-code)

Take five minutes and inspect our starter code. You'll see a pretty normal Angular app, and since we're repeating using those cards, there are a few consistent tags we're repeating every time we render a card.  So we're going to make those cards a custom-defined directive to cut out the repetition.

Since we're going to see how Angular handles templates, we'll need to start a simple static webserver. We could build a quick express app, but we can just use:

```bash
  python -m SimpleHTTPServer
```

``cd starter-code`` and then type ``python -m SimpleHTTPServer``. This will start a simple webserver that 
only serves up static files from the current directory

This will let us serve up our HTML and JS files without running into Cross Origin issues. 

<details>
<summary>Why we do this</summary>
  We need to do this since by default Chrome doesn't let us request another local file as an HTTP request. This prevents someone from fishing for a specifc file on your computer when you're visiting a site.
</details>

<!--11:23 when turning over to students -->

<!--Make sure everyone makes it to a good state (can see all cards on localhost:8000), and stress that we're not changing the outward appearance with the next few steps, we're just cleaning up our code -->

<!--Actually 11:35 -->

<!--11:25 5 minutes -->

### Let's be organized!

Rather than just throw this wherever, let's make a file dedicated just to that function. Clean code, yo.

I called it:
```
cardDirective.js
```

Don't forget to include this JS file in your `index.html` file.

#### Directives are as easy as...

Just like controllers and routing configurations, the first line is a simple extension of `angular`:

```js
angular.module('CardsAgainstAssembly')
  .directive('wdiCard', wdiCard);
```

An important thing to point out: The first argument is the name of the directive and how you'll use it in your HTML. **Angular converts `camelCase` to `snake-case` for us, so if you want to use `<secret-garden></secret-garden>` in your HTML, name your directive** `.directive('secretGarden', myFunctionIHaventMadeYet)`.  

Remember, in the official Angular docs it's called `ngClass` or `ngRepeat`, but in your HTML you use `ng-class` and `ng-repeat`.

<!--Actually 11:40 when devs putting it together-->

<!--11:30 5 minutes -->

#### Let's make a function!

Now, we obviously need a function named `wdiCard`!

```js
function wdiCard(){
  var directive = {};
  return directive;
}
```

Nothing fancy yet - we're just constructing an object and then returning it. We'll put some specifics in there now, but that's simple so far.

<!--Actually 11:46 -->

<!--11:35 10 minutes -->

## Directive Options - Codealong

You've got a couple interesting options when making your own directives. We'll go through them all, quickly, and you can play with them on your own in a bit.

1. `restrict`
2. `replace`
3. `template/templateUrl`
4. `scope`

#### 1. `restrict`

While the name isn't obvious, the `restrict` option lets us decide what _kind_ of directive we want to make. It looks like this:

```js
restrict: 'EACM',
```

- `E` is element. An HTML element, like `<wdi-card></wdi-card>`
- `A` is attribute. Like `<div wdi-card="something"></div>`
- `C` is class. Like `<div class="wdi-card"></div>`
- `M` is comment. Like `<!-- directive: wdi-card -->`

You can choose to have just one, all of the above, or any combination you like. You should steer towards elements & attributes as much as possible, though – classes can get messy with other CSS classes, and comments could just end up weird if there isn't a good reason for it.

For ours, let's play with just an element.

```js
function wdiCard(){
  var directive = {
    restrict: 'E'
  };
  return directive;
}
```

<!--Actually 11:48 -->

<!--11:45 10 minutes -->

#### 2. `replace`

Replace is pretty straightforward. Should this directive replace the HTML? Do you want it to get rid of what's in the template & swap it out with the template we're going to make? Or add to it, and not remove the original. For example, replacing would mean:

```html
<div ng-repeat="card in cardsController.questionsList" >
  <wdi-card></wdi-card>
</div>
```

Would actually render as:

```html
<div ng-repeat="card in cardsController.questionsList" >
  <div class='card'>
    <h4 class="card-title">{{question}}</h4>
    <h6>Cards Against Assembly</h6>
  </div>
</div>
```

See, it's replaced. Let's say we like that for our example:

```js
function wdiCard(){
  var directive = {
    restrict: 'E',
    replace: true
  };
  return directive;
}
```

<!--Actually 11:50 -->

<!--11:55 10 minutes -->

#### 3. `template/templateUrl`

This is where our partial view comes in. Now, if it's a pretty tiny, self-contained directive, you can use `template: <p> "Some javascript " + string + " concatenation"</p>`

But that easily starts getting ugly, so it's often better (even for small directives like this) to make a quick little partial HTML file and reference it with `templateUrl` instead.

Let's extract our existing card tags, and throw them in a partial. Cut out:

```html
<div class='card'>
  <h4 class="card-title">{{card.question}}</h4>
  <h6>Cards Against Assembly</h6>
</div>
```

Quickly `touch templates/cardDirective.html` or some similarly-named template, and paste it back in.

```html
<!-- templates/cardDirective.html -->
<div class='card'>
  <h4 class="card-title">{{card.question}}</h4>
  <h6>Cards Against Assembly</h6>
</div>
```

In `scripts/cardDirective.js`, we can add our option:

```js
function wdiCard(){
  var directive = {
    //'A' == attribute, 'E' == element, 'C' == class
    restrict: 'E',
    replace: true,
    templateUrl:  "templates/cardDirective.html"
  };

  return directive;
}
```

And lastly, in our `index.html`, let's finally use our custom directive. So exciting. This is it. Here we go.

```html
<!-- index.html -->
<div class='col-sm-6 col-md-6 col-lg-4' ng-repeat="card in cardsController.questionsList" >
  <wdi-card></wdi-card>
</div>
```

TRY IT! So awesome! We've now got this much more readable `index.html`, with a _very_ semantic HTML tag describing exactly what we want rendered.

<img width="965" alt="Cards Against Assembly" src="https://cloud.githubusercontent.com/assets/25366/9666972/05a2f348-522e-11e5-8f6c-7c503032eff4.png">

This is awesome. This is a great, reusable component. Except for _one_ thing.

<!---wooah tricky issue, 3 devs had templateURL instead of templateUrl -->

<!--12:05 15 minutes -->

#### 4. `scope`

If you notice, our template uses ``{{card.question}}`` inside it. This obviously works perfectly - we're geniuses. But what if we wanted to render a card somewhere outside of that `ng-repeat`, where `card in cardsCtrl.questionsList` isn't a thing. What if we want to render a one-off card, reusing our awesome new directive elsewhere? Isn't that part of the point?

It sure is. We're lacking a precise scope.

Just like controllers, we want to define what our scope is. We want to be able to say "Render a card, with these details, in whatever context I need to render it in." A card shouldn't rely on a controller's data to know what information to render inside it. The controller should pass that data to our directive, so it's freestanding and not relying on anyone but itself.

That's where `directive.scope` comes in, and this lets us decide what attributes our element should have! For our card example, maybe we want to render a card with just a string somewhere outside of this controller. We want to make our own card with our own hardcoded text.

Try this. In your `index.html`, adjust our `<card>` element to say:

```html
<wdi-card question="{{card.question}}"></wdi-card>
```

In context, you'll see that the `ng-repeat` is giving us the variable `card`, and we're actually just rendering that out as a string. But we've decided we want to have an attribute called `question` to pass data through. We made that up, it's appropriate to our example, but it can be anything.

There are only two other pieces we need to make this reality.

In our `cardDirective.html` partial, let's adjust to:

```html
<div class='card'>
  <h4 class="card-title">{{question}}</h4>
  <h6>Cards Against Assembly</h6>
</div>
```

No longer reliant on a variable named `card`, it's now just reliant on an element having the attribute of `question`.

And finally, in `scripts/cardDirective.js`:

```js
angular.module('CardsAgainstAssembly')
  .directive('wdiCard', wdiCard);

function wdiCard(){
  var directive = {
    //'A' == attribute, 'E' == element, 'C' == class
    restrict: 'E',
    replace: true,
    templateUrl:  "templates/cardDirective.html",
    scope: {
        question: '@'
    }
  };

  return directive;
}
```

In `scope`, we just define an object. The key is whatever the attribute on the element is named. So if we want `<wdi-card bagel=""></wdi-card>`, then we'd need a key named `bagel` in our scope object.

#### The Different Types of Scope for a Directive
The _value_ is one of 3 options.

```js
scope: {
  desiredObject: '=',     // Bind the ngModel to the object given (two-way binding)
  desiredFunc: '&',      // Pass a reference to a method
  desiredString: '@'     // Store the string associated with desired-string attribute
}
```

The corresponding options would look like:

```html
<div scope-example desired-object="to" desired-func="sendMail(email)" desired-string="ari@fullstack.io" />
```

The `=` is a mechanism for binding data that might change; the `&` is for passing a reference to a function you might want to call; and the `@` is simply storing a string & passing it through to the template.

#### Since we've decided to use `@`/strings, let's try it!

Our last test is to see if we can make a card using just a hardcoded string. Then we'll know our card is really reusable.

Somewhere _outside_ the context of the controller, let's say just above the footer in our `index.html`, throw a handmade card in:

```html
<!-- ... -->
</section>
<hr/>
<wdi-card question="Why is Angular so awesome?"></wdi-card>
<footer>
<!-- ... -->
```

<img width="965" alt="Custom Card" src="https://cloud.githubusercontent.com/assets/25366/9668827/a352dbf8-5238-11e5-8d00-80ccf02ca95c.png">

Would you look at that? Our own custom directive - a reusable, semantic HTML component that we designed ourselves.

<!-- Actually 12:31 -->

### Resources

[This cheat sheet from egghead.io](https://d2eip9sf3oo6c2.cloudfront.net/pdf/egghead-io-directive-definition-object-cheat-sheet.pdf) is a great resource for learning more about the specs allowed in the directive definition object.


## Licensing
All content is licensed under a CC­BY­NC­SA 4.0 license.
All software code is licensed under GNU GPLv3. For commercial use or alternative licensing, please contact legal@ga.co.
