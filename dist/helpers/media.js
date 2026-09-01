import Helper from '@ember/component/helper';
import { service } from '@ember/service';
import { g, i } from 'decorator-transforms/runtime';

class Media extends Helper {
  static {
    g(this.prototype, "media", [service]);
  }
  #media = (i(this, "media"), void 0);
  compute(names) {
    return this.media.is(names);
  }
}

export { Media as default };
//# sourceMappingURL=media.js.map
