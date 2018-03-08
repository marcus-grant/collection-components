import React from 'react';
import PropTypes from 'prop-types';
import {
  NarrowSpinner,
  Spinner,
  LongSpinner,
  ScalingTopBars,
  BouncingBars,
  ScalingBars,
  PhasingBars,
  ScalingPhasingBars,
} from '../accessories/progress-indicators';

const PTNode = PropTypes.node;
const PTChildren = PropTypes.oneOfType([PropTypes.arrayOf(PTNode), PTNode]);
const DemoCard = props => (
  <div
    style={{
      display: 'flex',
      flex: '1 1 content',
      flexDirection: 'column',
      background: '#fff',
      border: 'solid 1px black',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    }}
  >
    <h6
      style={{ margin: '12px 8px 8px 8px' }}
    >{props.title}
    </h6>
    <div
      className="demo-content-container"
      style={{
        margin: '8px 8px',
      }}
    >
      {props.children}
    </div>
  </div>
);
DemoCard.propTypes = { children: PTChildren.isRequired, title: PropTypes.string.isRequired };

export default class ProgressIndicatorDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indicatorState: [],
    };
  }

  render() {
    return (
      <div className="demo-container">
        <h4>Indicators</h4>
        <div
          style={{
            display: 'flex',
            flex: '1 1 auto',
            padding: '16px',
            justifyContent: 'space-evenly',
            alignItems: 'flex-start',
          }}
        >
          <DemoCard title="<NarrowSpinner>">
            <NarrowSpinner />
          </DemoCard>
          <DemoCard title="<Spinner>">
            <Spinner />
          </DemoCard>
          <DemoCard title="<LongSpinner>">
            <LongSpinner />
          </DemoCard>
          <DemoCard title="<ScalingTopBars>">
            <ScalingTopBars width={24} height={24} />
          </DemoCard>
          <DemoCard title="<BouncingBars>">
            <BouncingBars width={24} height={30} />
          </DemoCard>
          <DemoCard title="<ScalingBars>">
            <ScalingBars width={24} height={30} />
          </DemoCard>
          <DemoCard title="<PhasingBars>">
            <PhasingBars width={24} height={30} />
          </DemoCard>
          <DemoCard title="<ScalingPhasingBars>">
            <ScalingPhasingBars width={24} height={30} />
          </DemoCard>
        </div>
      </div>
    );
  }
}
