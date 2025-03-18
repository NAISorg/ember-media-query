import { getContext, settled } from '@ember/test-helpers';

function setBreakpoint(breakpoint) {
  const {
    owner
  } = getContext();
  const media = owner.lookup('service:media');
  const breakpointArray = Array.isArray(breakpoint) ? breakpoint : [breakpoint];
  media._mockedBreakpoints = breakpointArray;
  const knownBreakpoints = Object.keys(media.matchers);
  const uniqueBreakpoints = [...new Set([...knownBreakpoints, ...breakpointArray])];
  uniqueBreakpoints.forEach(breakpointName => {
    media.match(breakpointName, 'mocked');
  });
  return settled();
}

export { setBreakpoint };
//# sourceMappingURL=set-breakpoint.js.map
