import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import media from 'ember-media-query/helpers/media';
import { setBreakpoint } from 'ember-media-query/test-support/set-breakpoint';

module(
  'Integration | Helper | media / Integration | test-support | setBreakpoint',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.beforeEach(async function () {
      this.media = this.owner.lookup('service:media');
      this.media.setBreakpoints({
        // Initial setup of breakpoints
        small: '(max-width: 640px)',
        medium: '(min-width: 641px)',
        desktop: '(min-width: 1025px)',
      });
      await render(
        <template>
          {{#if (media "small")}}
            Definitely small
          {{/if}}
          {{#if (media "medium")}}
            Definitely medium
          {{/if}}
          {{#if (media "desktop")}}
            Definitely desktop
          {{/if}}
          {{#if (media "small" "medium")}}
            Both small and medium
          {{/if}}
        </template>,
      );
    });

    test('setBreakpoint test helper + media helper reports correct breakpoint(s)', async function (assert) {
      assert
        .dom()
        .hasText(
          'Definitely desktop',
          'Defaults to "desktop" when setBreakpoint is not used',
        );

      await setBreakpoint('medium');
      assert
        .dom()
        .hasText('Definitely medium', 'Correctly reports "medium" breakpoint');

      await setBreakpoint('small');
      assert
        .dom()
        .hasText('Definitely small', 'Correctly reports "small" breakpoint');

      await setBreakpoint(['small', 'medium']);
      assert
        .dom()
        .hasText(
          'Definitely small Definitely medium',
          'Correctly reports multiple breakpoints',
        );

      assert
        .dom()
        .hasText(
          'Both small and medium',
          'Correctly reports multiple breakpoints via the helper',
        );
    });

    test('Defaults to "desktop" when setBreakpoint is not used', async function (assert) {
      assert
        .dom()
        .hasText(
          'Definitely desktop',
          'Defaults to "desktop" when setBreakpoint is not used',
        );
    });
  },
);
