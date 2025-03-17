import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'test-app/tests/helpers';
import { setBreakpoint } from 'ember-media-query/test-support/set-breakpoint';

module('Acceptance | set breakpoint', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function (assert) {
    setBreakpoint('small');
    await visit('/');

    assert.strictEqual(currentURL(), '/');
    assert.dom('[data-test-small]').hasText('True');
    assert.dom('[data-test-matches]').hasText('small');
  });
});
