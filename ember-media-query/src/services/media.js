import Service from '@ember/service';
import { TrackedObject } from 'tracked-built-ins';
import { tracked } from '@glimmer/tracking';
import { isTesting, macroCondition } from '@embroider/macros';
import { registerDestructor } from '@ember/destroyable';

/**
 * @class Media
 * @extends Service
 */
export default class Media extends Service {
  /**
   * Mocked breakpoints for testing
   * @type {string[]}
   * @private
   */
  @tracked _mockedBreakpoints = ['desktop'];

  /**
   * Event listeners for each breakpoint
   * @type {Record<string, Function>}
   * @private
   */
  #listeners = {};

  /**
   * A hash of matchers by breakpoint name
   * @type {TrackedObject<Record<string, MediaQueryList>>}
   */
  matchers = new TrackedObject({});

  constructor() {
    super(...arguments);
    registerDestructor(this, this.#cleanupListeners.bind(this));
  }

  /**
   *  Add media query matchers
   *
   *  ```javascript
   *    media.match('mobile', '(max-width: 767px)');
   *    media.match('desktop', '(min-width: 768px)');
   *  ```
   *
   *  @param {string} breakpointName - The name of the matcher
   *  @param {string} query - The media query to match against
   */
  match(breakpointName, query) {
    if (macroCondition(isTesting())) {
      this.matchers[breakpointName] = { matches:
          this._mockedBreakpoints.includes(breakpointName) };
      return;
    }

    const matcher = window.matchMedia(query);

    const listener = (matcher) => {
      this.matchers[breakpointName] = matcher;
    };

    if (this.#listeners[breakpointName]) {
      this.matchers[breakpointName].removeEventListener('change', this.#listeners[breakpointName]);
    }

    this.#listeners[breakpointName] = listener;

    matcher.addEventListener('change', listener);

    listener(matcher);
  }

  /**
   * Set multiple breakpoints at once
   * @param {Record<string, string>} breakpoints - An object with breakpoint names as keys and media queries as values
   */
  setBreakpoints(breakpoints) {
    Object.keys(breakpoints).forEach((name) => {
      this.match(name, breakpoints[name]);
    });
  }

  /**
   * Check if matcher(s) are matching, by name
   * @param {string|string[]} breakpointNames - The name(s) of the breakpoint(s) to check
   * @returns {boolean} - True if all specified breakpoints are matching
   */
  is(breakpointNames) {
    if (Array.isArray(breakpointNames)) {
      return breakpointNames.every((name) => this.matchers[name]?.matches);
    }
    return this.matchers[breakpointNames]?.matches;
  }

    /**
   * Returns a list of currently matching matchers
   * @returns {string[]} - An array of matching breakpoint names
   */
  get matches() {
    return Object.keys(this.matchers).filter((breakpointName) => this.matchers[breakpointName].matches);
  }

  /**
   * Throws an error indicating that the method is not implemented
   * @throws {Error} - Not implemented error
   */
  get classNames() {
    throw new Error('Not implemented. Please see the README for ember-media-query');
  }

  /**
   * Cleanup event listeners
   * @private
   */
  #cleanupListeners() {
    Object.entries(this.#listeners).forEach(([breakpointName, listener]) => {
      this.matchers[breakpointName]?.removeEventListener('change', listener);
    });
  }
}
