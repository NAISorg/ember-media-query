import Route from '@ember/routing/route';
import { service } from '@ember/service';
import breakpoints from '../breakpoints';

export default class ApplicationRoute extends Route {
  @service media;

  beforeModel() {
    this.media.setBreakpoints(breakpoints);
  }
}
