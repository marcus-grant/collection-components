import React from 'react';
import PropTypes from 'prop-types';

const Defaults = {
  ClassNames: {
    Spinners: {
      SHORT: 'spinner--short',
      DEFAULT: 'spinner',
      LONG: 'spinner--long',
    },
    SVG: 'svg-indicator',
  },
  Dimensions: {
    UNITS: 'px',
    WIDTH: 20,
    HEIGHT: 20,
    VIEWBOX_WIDTH: 50,
    VIEWBOX_HEIGHT: 50,
    X_OFF: 0,
    Y_OFF: 0,
  },
  DURATION: 0.6,
};

// Taken from https://codepen.io/aurer/pen/jEGbA?q=svg%20loading&order=popularity&depth=everything&show_forks=false
// TODO: Make this its own module?
export const SVGIndicator = (props) => {
  const {
    children, className, units, xOff, yOff, width, height,
    viewBoxWidth, viewBoxHeight, disableBackground, backgroundHeight, backgroundWidth,
  } = props;
  function formatUnitString(attribute, unit) {
    return `${attribute}${unit}`;
  }
  const backgroundString = (
    backgroundWidth && backgroundHeight ?
      `new 0 0 ${backgroundWidth} ${backgroundHeight}` :
      `new 0 0 ${viewBoxWidth} ${viewBoxHeight}`
  );
  return (
    <svg
      className={className}
      x={formatUnitString(xOff, units)}
      y={formatUnitString(yOff, units)}
      width={formatUnitString(width, units)}
      height={formatUnitString(height, units)}
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      enableBackground={!disableBackground && backgroundString}
      xmlSpace="preserve"
    >
      {children}
    </svg>
  );
};
SVGIndicator.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  units: PropTypes.oneOf(['px', 'em', 'rem']),
  width: PropTypes.number,
  height: PropTypes.number,
  viewBoxWidth: PropTypes.number,
  viewBoxHeight: PropTypes.number,
  xOff: PropTypes.number,
  yOff: PropTypes.number,
  disableBackground: PropTypes.bool,
  backgroundWidth: PropTypes.number,
  backgroundHeight: PropTypes.number,
};
SVGIndicator.defaultProps = {
  className: Defaults.ClassNames.SVG,
  units: Defaults.Dimensions.UNITS,
  width: Defaults.Dimensions.WIDTH,
  height: Defaults.Dimensions.HEIGHT,
  viewBoxWidth: Defaults.Dimensions.VIEWBOX_WIDTH,
  viewBoxHeight: Defaults.Dimensions.VIEWBOX_HEIGHT,
  xOff: Defaults.Dimensions.X_OFF,
  yOff: Defaults.Dimensions.Y_OFF,
  disableBackground: false,
  backgroundWidth: undefined,
  backgroundHeight: undefined,
};

// TODO: Include dimensions specifiers whether in SASS or as props
export const NarrowSpinner = (props) => {
  const { duration, opacity, ...passedProps } = props;
  const spinnnerTrackPath1 =
    'M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946';
  const spinnerTrackPath2 =
    's14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634';
  const spinnerInteriorPath =
    'c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z';
  const spinnerTrackPath =
    `${spinnnerTrackPath1}${spinnerTrackPath2}${spinnerInteriorPath}`;
  const spinnerMovingPath =
    'M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0C22.32,8.481,24.301,9.057,26.013,10.047z';
  return (
    <SVGIndicator viewBoxHeight={40} viewBoxWidth={40} {...passedProps}>
      <path
        opacity={opacity}
        d={spinnerTrackPath}
      />
      <path d={spinnerMovingPath}>
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="0 20 20"
          to="360 20 20"
          dur={`${duration}s`}
          repeatCount="indefinite"
        />
      </path>
    </SVGIndicator>
  );
};
NarrowSpinner.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  duration: PropTypes.number,
  opacity: PropTypes.number,
};
NarrowSpinner.defaultProps = {
  width: Defaults.Dimensions.WIDTH,
  height: Defaults.Dimensions.HEIGHT,
  duration: Defaults.DURATION,
  opacity: 0.2,
};

export const Spinner = (props) => {
  const { duration, opacity, ...passedProps } = props;
  const spinnerPath =
    'M25.251,6.461c-10.318,0-18.683,8.365-18.683,' +
    '18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z';
  return (
    <SVGIndicator viewBoxHeight={50} viewBoxWidth={50} {...passedProps}>
      <path d={spinnerPath}>
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur={`${duration}s`}
          repeatCount="indefinite"
        />
      </path>
    </SVGIndicator>
  );
};
Spinner.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  duration: PropTypes.number,
  opacity: PropTypes.number,
};
Spinner.defaultProps = {
  width: Defaults.Dimensions.WIDTH,
  height: Defaults.Dimensions.HEIGHT,
  duration: Defaults.DURATION,
  opacity: 0.2,
};

export const LongSpinner = (props) => {
  const { duration, opacity, ...passedProps } = props;
  const spinnerPath =
    'M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,' +
    '0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,' +
    '0,14.615,6.543,14.615,14.615H43.935z';
  return (
    <SVGIndicator viewBoxHeight={50} viewBoxWidth={50} {...passedProps}>
      <path d={spinnerPath}>
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur={`${duration}s`}
          repeatCount="indefinite"
        />
      </path>
    </SVGIndicator>
  );
};
LongSpinner.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  duration: PropTypes.number,
  opacity: PropTypes.number,
};
LongSpinner.defaultProps = {
  width: Defaults.Dimensions.WIDTH,
  height: Defaults.Dimensions.HEIGHT,
  duration: Defaults.DURATION,
  opacity: 0.2,
};

export const ScalingTopBars = (props) => {
  const { duration, opacity, ...passedProps } = props;
  const firstRect = (
    <rect x="0" y="0" width="4" height="7">
      <animateTransform
        attributeType="xml"
        attributeName="transform"
        type="scale"
        values="1,1; 1,3; 1,1"
        begin="0s"
        dur={`${duration}s`}
        repeatCount="indefinite"
      />
    </rect>);
  const secondRect = (
    <rect x="10" y="0" width="4" height="7">
      <animateTransform
        attributeType="xml"
        attributeName="transform"
        type="scale"
        values="1,1; 1,3; 1,1"
        begin={`${(duration / 3)}s`}
        dur={`${duration}s`}
        repeatCount="indefinite"
      />
    </rect>);
  const thirdRect = (
    <rect x="20" y="0" width="4" height="7">
      <animateTransform
        attributeType="xml"
        attributeName="transform"
        type="scale"
        values="1,1; 1,3; 1,1"
        begin={`${duration - (duration / 3)}s`}
        dur={`${duration}s`}
        repeatCount="indefinite"
      />
    </rect>);
  return (
    <SVGIndicator viewBoxHeight={24} viewBoxWidth={24} {...passedProps}>
      {firstRect}{secondRect}{thirdRect}
    </SVGIndicator>
  );
};
ScalingTopBars.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  duration: PropTypes.number,
  opacity: PropTypes.number,
};
ScalingTopBars.defaultProps = {
  width: Defaults.Dimensions.WIDTH,
  height: Defaults.Dimensions.HEIGHT,
  duration: Defaults.DURATION,
  opacity: 0.2,
};

export const BouncingBars = (props) => {
  const { duration, opacity, ...passedProps } = props;
  const firstRect = (
    <rect x="0" y="0" width="4" height="13">
      <animateTransform
        attributeType="xml"
        attributeName="transform"
        type="translate"
        values="0 0; 0 20; 0 0"
        begin="0s"
        dur={`${duration}s`}
        repeatCount="indefinite"
      />
    </rect>);
  const secondRect = (
    <rect x="10" y="0" width="4" height="13">
      <animateTransform
        attributeType="xml"
        attributeName="transform"
        type="translate"
        values="0 0; 0 20; 0 0"
        begin={`${duration / 3}s`}
        dur={`${duration}s`}
        repeatCount="indefinite"
      />
    </rect>);
  const thirdRect = (
    <rect x="20" y="0" width="4" height="13">
      <animateTransform
        attributeType="xml"
        attributeName="transform"
        type="translate"
        values="0 0; 0 20; 0 0"
        begin={`${duration - (duration / 3)}s`}
        dur={`${duration}s`}
        repeatCount="indefinite"
      />
    </rect>);
  return (
    <SVGIndicator
      viewBoxWidth={24}
      viewBoxHeight={30}
      backgroundWidth={50}
      backgroundHeight={50}
      {...passedProps}
    >
      {firstRect}{secondRect}{thirdRect}
    </SVGIndicator>
  );
};
BouncingBars.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  duration: PropTypes.number,
  opacity: PropTypes.number,
};
BouncingBars.defaultProps = {
  width: Defaults.Dimensions.WIDTH,
  height: Defaults.Dimensions.HEIGHT,
  duration: Defaults.DURATION,
  opacity: 0.2,
};

export const ScalingBars = (props) => {
  const { duration, opacity, ...passedProps } = props;
  const firstRect = (
    <rect x="0" y="13" width="4" height="5">
      <animate
        attributeName="height"
        attributeType="XML"
        values="5;21;5"
        begin="0s"
        dur={`${duration}s`}
        repeatCount="indefinite"
      />
      <animate
        attributeName="y"
        attributeType="XML"
        values="13; 5; 13"
        begin="0s"
        dur={`${duration}s`}
        repeatCount="indefinite"
      />
    </rect>);
  const secondRect = (
    <rect x="10" y="13" width="4" height="5">
      <animate
        attributeName="height"
        attributeType="XML"
        values="5;21;5"
        begin={`${duration / 4}s`}
        dur={`${duration}s`}
        repeatCount="indefinite"
      />
      <animate
        attributeName="y"
        attributeType="XML"
        values="13; 5; 13"
        begin={`${duration / 4}s`}
        dur={`${duration}s`}
        repeatCount="indefinite"
      />
    </rect>);
  const thirdRect = (
    <rect x="20" y="13" width="4" height="5">
      <animate
        attributeName="height"
        attributeType="XML"
        values="5;21;5"
        begin={`${duration / 2}`}
        dur={`${duration}`}
        repeatCount="indefinite"
      />
      <animate
        attributeName="y"
        attributeType="XML"
        values="13; 5; 13"
        begin={`${duration / 2}`}
        dur={`${duration}`}
        repeatCount="indefinite"
      />
    </rect>);
  return (
    <SVGIndicator
      viewBoxWidth={24}
      viewBoxHeight={30}
      backgroundWidth={50}
      backgroundHeight={50}
      {...passedProps}
    >
      {firstRect}{secondRect}{thirdRect}
    </SVGIndicator>
  );
};
ScalingBars.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  duration: PropTypes.number,
  opacity: PropTypes.number,
};
ScalingBars.defaultProps = {
  width: Defaults.Dimensions.WIDTH,
  height: Defaults.Dimensions.HEIGHT,
  duration: Defaults.DURATION,
  opacity: 0.2,
};

export const PhasingBars = (props) => {
  const { duration, opacity, ...passedProps } = props;
  const firstRect = (
    <rect x="0" y="0" width="4" height="20">
      <animate
        attributeName="opacity"
        attributeType="XML"
        values="1; .2; 1"
        begin="0s"
        dur={`${duration}s`}
        repeatCount="indefinite"
      />
    </rect>);
  const secondRect = (
    <rect x="7" y="0" width="4" height="20">
      <animate
        attributeName="opacity"
        attributeType="XML"
        values="1; .2; 1"
        begin={`${duration / 3}s`}
        dur={`${duration}s`}
        repeatCount="indefinite"
      />
    </rect>);
  const thirdRect = (
    <rect x="14" y="0" width="4" height="20">
      <animate
        attributeName="opacity"
        attributeType="XML"
        values="1; .2; 1"
        begin={`${duration - (duration / 3)}`}
        dur={`${duration}`}
        repeatCount="indefinite"
      />
    </rect>);
  return (
    <SVGIndicator
      viewBoxWidth={24}
      viewBoxHeight={30}
      backgroundWidth={50}
      backgroundHeight={50}
      {...passedProps}
    >
      {firstRect}{secondRect}{thirdRect}
    </SVGIndicator>
  );
};
PhasingBars.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  duration: PropTypes.number,
  opacity: PropTypes.number,
};
PhasingBars.defaultProps = {
  width: Defaults.Dimensions.WIDTH,
  height: Defaults.Dimensions.HEIGHT,
  duration: Defaults.DURATION,
  opacity: 0.2,
};

export const ScalingPhasingBars = (props) => {
  const { duration, opacity, ...passedProps } = props;
  const firstRect = (
    <rect x="0" y="10" width="4" height="10">
      <animate
        attributeName="opacity"
        attributeType="XML"
        values="0.2; 1; .2"
        begin="0s"
        dur={`${duration}s`}
        repeatCount="indefinite"
      />
      <animate
        attributeName="height"
        attributeType="XML"
        values="10; 20; 10"
        begin="0s"
        dur={`${duration}s`}
        repeatCount="indefinite"
      />
      <animate
        attributeName="y"
        attributeType="XML"
        values="10; 5; 10"
        begin="0s"
        dur={`${duration}s`}
        repeatCount="indefinite"
      />
    </rect>);
  const secondRect = (
    <rect x="8" y="10" width="4" height="10">
      <animate
        attributeName="opacity"
        attributeType="XML"
        values="0.2; 1; .2"
        begin={`${duration / 4}s`}
        dur={`${duration}s`}
        repeatCount="indefinite"
      />
      <animate
        attributeName="height"
        attributeType="XML"
        values="10; 20; 10"
        begin={`${duration / 4}s`}
        dur={`${duration}s`}
        repeatCount="indefinite"
      />
      <animate
        attributeName="y"
        attributeType="XML"
        values="10; 5; 10"
        begin={`${duration / 4}s`}
        dur={`${duration}s`}
        repeatCount="indefinite"
      />
    </rect>);
  const thirdRect = (
    <rect x="16" y="10" width="4" height="10">
      <animate
        attributeName="opacity"
        attributeType="XML"
        values="0.2; 1; .2"
        begin={`${duration / 2}s`}
        dur={`${duration}s`}
        repeatCount="indefinite"
      />
      <animate
        attributeName="height"
        attributeType="XML"
        values="10; 20; 10"
        begin={`${duration / 2}s`}
        dur={`${duration}s`}
        repeatCount="indefinite"
      />
      <animate
        attributeName="y"
        attributeType="XML"
        values="10; 5; 10"
        begin={`${duration / 2}s`}
        dur={`${duration}s`}
        repeatCount="indefinite"
      />
    </rect>);
  return (
    <SVGIndicator
      viewBoxWidth={24}
      viewBoxHeight={30}
      backgroundWidth={50}
      backgroundHeight={50}
      {...passedProps}
    >
      {firstRect}{secondRect}{thirdRect}
    </SVGIndicator>
  );
};
ScalingPhasingBars.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  duration: PropTypes.number,
  opacity: PropTypes.number,
};
ScalingPhasingBars.defaultProps = {
  width: Defaults.Dimensions.WIDTH,
  height: Defaults.Dimensions.HEIGHT,
  duration: Defaults.DURATION,
  opacity: 0.2,
};

