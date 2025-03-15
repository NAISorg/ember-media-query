# ember-media-query

Provides convenience utilities for [`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia). 

Aims to be a successor to [ember-responsive](https://www.npmjs.com/package/ember-responsive).
See [Migrating from ember-responsive](#migrating-from-ember-responsive) for more details.

If starting fresh to design UI based on available space, you may want to consider [ember-container-query](https://github.com/ijlee2/ember-container-query).

## Compatibility

- Ember.js v4.12 or above
- Embroider or ember-auto-import v2

## Installation

```
ember install ember-media-query
```

## Usage

### Define Breakpoints

Specify your breakpoints in an object. You can store this in `app/breakpoints.js`:

```javascript
export default {
  mobile:  '(max-width: 767px)',
  tablet:  '(min-width: 768px) and (max-width: 991px)',
  desktop: '(min-width: 992px) and (max-width: 1200px)',
  jumbo:   '(min-width: 1201px)'
};
```

Any [media query string](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) 
can be specified here, not just those based on size. 

Set your breakpoints in `app/routes/application.js`:

```javascript
import Route from '@ember/routing/route';
import { service } from '@ember/service';
import breakpoints from '../breakpoints';

export default class ApplicationRoute extends Route {
  @service media;

  beforeModel() {
    this.media.setBreakpoints(breakpoints);
  }
}
```

### `media` Service

The `media` service may be injected into your components or routes or other framework classes. 

#### Checking Active Breakpoints

You can check if specific breakpoints are active using the `is` method:

```javascript
import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class MyComponent extends Component {
  @service media;

  get isMobile() {
    return this.media.is('mobile');
  }
}
```

`ember-responsive` exposed various `isMobile`, `isTablet`, etc. properties based
on the defined breakpoints. This addon does not provide these properties.

#### Getting Active Breakpoints

You can get an array of active breakpoint names using the `matches` property:

```javascript
this.media.matches; // returns an array of active breakpoint names
```

#### Add a breakpoint

```javascript
this.media.match('small', '(max-width: 767px)');
```

Breakpoints can be added in bulk by passing an object to `setBreakpoints`

#### Access the [MediaQueryList](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList) object for a breakpoint

```javascript
  this.media.matches['small']; // returns the MediaQueryList object for the 'small' breakpoint
```

### `media` template helper

The `media` helper returns true when the breakpoint (name from the key in the 
breakpoints object) passed is active.  

```gjs
import { media } from 'ember-media-query';
<template>
  {{#if (media 'mobile')}}
    <p>Mobile</p>
  {{else if (media 'tablet')}}
    <p>Tablet</p>
  {{else if (media 'desktop')}}
    <p>Desktop</p>
  {{else if (media 'jumbo')}}
    <p>Jumbo</p>
  {{else}}
    <p>Unknown</p>
  {{/if}}
</template>
```

`ember-responsive` took `isMobile`, `isTablet`, etc. as arguments to the media
helper. This is currently supported but deprecated. 

### Testing

The `setBreakpoint` test helper can be used to simulate breakpoints in tests:

```js
import { setBreakpoint } from 'ember-media-query/test-support';

...

test('example test', async function(assert) {
  setBreakpoint('mobile');
  await visit('/');

  assert.dom('p').hasText('Mobile');
});

```

You can also set multiple breakpoints, useful to test when breakpoints overlap:

```js
import { setBreakpoint } from 'ember-media-query/test-support';

test('it renders', async function(assert) {
  setBreakpoint(['tablet', 'desktop']);

  await render(hbs`<YourComponent />`);
  
});
```

The `setBreakpoint` helper completely mocks the breakpoints. It does not use `window.matchMedia` to check the breakpoints.
It is only useful for testing the JavaScript or template logic that is based on 
active breakpoints, not for testing stylesheets.

## Migrating from ember-responsive

### Breakpoints are no longer automatically looked up via `app/breakpoints.js`

See the documentation for [Defining Breakpoints](#define-breakpoints) for how to define breakpoints.

### `media` service no longer has `isMobile`, `isTablet`, etc. properties

`ember-responsive` provided properties like `isMobile`, `isTablet`, etc. based on the
defined breakpoints. This addon does not provide these properties. You can use the `is` method
on the `media` service to check if a breakpoint is active.

To migrate, replace references to `this.media.isMobile` with `this.media.is('mobile')`, etc.
You can find your existing breakpoints in `app/breakpoints.js`.

### `media` helper no longer takes `isMobile`, `isTablet`, etc. as arguments

`ember-responsive` provided a `media` helper that took `isMobile`, `isTablet`, etc. as arguments.
This is currently supported but deprecated. 

Find and replace all instances of `{{media 'isMobile'}}` with `{{media 'mobile'}}`, etc.

### `media` service no longer provides `classNames`

The `media` service does not provide `classNames`. You can recreate it by:

```javascript
  import Component from '@glimmer/component';
  import { service } from '@ember/service';
  import { dasherize } from '@ember/string';
  export default class MyComponent extends Component {
    @service media;

    get classNames() {
      return this.media.matches.map((match) => `media-${dasherize(match)}`).join(' ');
    }
  }
```

### [`MediaQueryList`](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList) objects are no longer exposed via breakpoint names

In `ember-responsive`, you could access the `MediaQueryList` object for a breakpoint by
`this.media.mobile`. This is not supported. You can get the `MediaQueryList` object for a breakpoint
by `this.media.matches['mobile']`.

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
