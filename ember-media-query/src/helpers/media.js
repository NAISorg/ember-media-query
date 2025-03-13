import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default class Media extends Helper {
  @service media;

  compute([names]) {
    return this.media.is(names);
  }
}
