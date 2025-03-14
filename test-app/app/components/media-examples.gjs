import Component from '@glimmer/component';
import { service } from '@ember/service';
import media from 'ember-media-query/helpers/media';

export default class MediaExamples extends Component {
  @service media;

  <template>
    <h1>Test ember-media-query</h1>
    <p>To test dark mode, set preference for darkmode in your browser or in
      devtools.</p>
    <p>To test, resize the window and ensure the following breakpoints display
      as shown.</p>
    <table>
      <thead>
        <tr>
          <th>Breakpoint</th>
          <th>Media Query</th>
          <th>Active?</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Small</td>
          <td>(max-width: 400px)</td>
          <td data-test-small>{{#if (media "small")}}<strong
              >True</strong>{{else}}False{{/if}}</td>
        </tr>
        <tr>
          <td>Medium</td>
          <td>(max-width: 799px)</td>
          <td data-test-medium>{{#if (media "medium")}}<strong
              >True</strong>{{else}}False{{/if}}</td>
        </tr>
        <tr>
          <td>Desktop</td>
          <td>(min-width: 800px)</td>
          <td data-test-desktop>{{#if (media "desktop")}}<strong
              >True</strong>{{else}}False{{/if}}</td>
        </tr>
        <tr>
          <td>Large</td>
          <td>(min-width: 1400px)</td>
          <td data-test-large>{{#if (media "large")}}<strong
              >True</strong>{{else}}False{{/if}}</td>
        </tr>
        <tr>
          <td>Darkmode</td>
          <td>(prefers-color-scheme: dark)</td>
          <td data-test-darkmode>{{#if (media "darkmode")}}<strong
              >True</strong>{{else}}False{{/if}}</td>
        </tr>
      </tbody>
    </table>

    <h2>Test of list of matches</h2>
    <p data-test-matches>
      List of the current matches:
      <strong>{{this.media.matches}}</strong>
    </p>

    <h2>The following tests the media helper with multiple breakpoints:</h2>
    <p data-test-large-and-small>Is both Large and Desktop?
      {{#if (media "desktop" "large")}}<strong
        >True</strong>{{else}}False{{/if}}</p>
  </template>
}
