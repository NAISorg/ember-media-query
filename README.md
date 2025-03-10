# ember-media-query

Provides convenience utilities for [`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia). 

Aims to be a successor to [ember-responsive](https://www.npmjs.com/package/ember-responsive).

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


### `media` Service

The `media` service may be injected into your components or routes or other framework classes. 

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

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
