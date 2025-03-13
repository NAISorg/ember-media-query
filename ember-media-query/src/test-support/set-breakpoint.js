import { getContext, settled } from '@ember/test-helpers';

export function setBreakpoint(breakpoint) {
  const { owner } = getContext();
  const media = owner.lookup('service:media');
  const breakpointArray = Array.isArray(breakpoint) ? breakpoint : [breakpoint];
  media._mockedBreakpoints = breakpointArray;
  const knownBreakpoints = Object.keys(media.matchers);

  breakpointArray.forEach((breakpointName) => {
    if (!knownBreakpoints.includes(breakpointName)) {
      throw new Error(
        `Breakpoint "${breakpointName}" not defined on the media service`
      );
    }
  });

  knownBreakpoints.forEach((breakpointName) => {
    media.match(breakpointName, 'mocked');
  });

  return settled();
}
