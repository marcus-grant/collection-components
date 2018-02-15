import React from 'react';
import PropTypes from 'prop-types';
// import TransitionGroup from 'react-addons-transition-group';

// Returns a div container with a different className based on a condition
const DropdownContainer = (props) => {
  if (props.isExpanded) {
    return <div className="dropdown__container--expanded">{props.children}</div>;
  }
  return <div className="dropdown__container">{props.children}</div>;
};

DropdownContainer.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

const DropdownButton = (props) => {
  let classString = 'dropdown__button';
  if (props.isExpanded) {
    classString += '--expanded';
  }
  return (
    <button className={classString} onClick={props.callback}>
      {props.text}
    </button>
  );
};

DropdownButton.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};

// const DropdownItem = props => (
//   <div className="dropdown__item">
//     <p>Item</p>
//   </div>
// );

// TODO: The next thing to do after getting checkbox items done,
// get categories down that seperates control items
/*
 * Dropdown Menu Item Components
 */
// TODO: Should this be a component instead with prop validation?
// Should selection be enabled for the whole menu?
// If no checkbox as indicator of selection, what else could be used?
//   - background coloring?
//   - text?
//   - some fa icon?
const CheckboxControl = props => (
  <div className="dropdown-menu__control-checkbox">
    <p>{props.label}</p>
    <input
      type="checkbox"
      checked={props.isSelected}
      onChange={() => props.callback(props.id)}
    />
  </div>
);

CheckboxControl.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  callback: PropTypes.func.isRequired,
};

// MultiselectControlsList - A component that structures CheckboxControls into a list
// Proves an appropriate containing div className
// Splits a properly structured object array which helps with managing parent states
// Takes the CheckboxControl callbacks into one "onSelection" callback
// TODO: Contain this within a collapsible menu section
const MultiselectControlsList = props => (
  <div className="dropdown-menu__multiselect-list">
    {props.options.map(option => (
      <CheckboxControl
        key={option.id}
        id={option.id}
        label={option.label}
        isSelected={option.isSelected}
        callback={props.onSelection}
      />
    ))}
  </div>
);

MultiselectControlsList.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
  })).isRequired,
  onSelection: PropTypes.func.isRequired,
};

// TODO: Generalize callbacks and states so ocnfiguration of controls can be given
// as a prop object of a certain shape and then all callbacks and states are handled
// TODO: Make single checkbox selection handler usesing
// an id to alter alot of selct states
export default class DropdownControls extends React.Component {
  constructor(props) {
    super(props);
    [
      'toggleMenu',
      'firstToggle',
    ].forEach(fn => this[fn] = this[fn].bind(this));
    this.state = {
      isExpanded: false,
      firstSelected: false,
      secondSelected: false,
      thirdSelected: false,
    };
  }

  toggleMenu() {
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  firstToggle() { this.setState({ firstSelected: !this.state.firstSelected }); }


  render() {
    let dropdownList;
    console.log('DropdownControls.props.options = ', this.props.options);
    if (this.state.isExpanded) {
      dropdownList = (
        <div className="dropdown-controls__menu--expanded">
          {/*
          <CheckboxControl
            text="First Item"
            isSelected={this.state.firstSelected}
            callback={this.firstToggle}
          />
          */}
          <MultiselectControlsList
            options={this.props.options}
            onSelection={this.props.onSelection}
          />
        </div>
      );
    } else {
      dropdownList = <div className="dropdown-controls__menu--collapsed" />;
    }
    return (
      <DropdownContainer isExpanded={this.state.isExpanded}>
        <DropdownButton
          isExpanded={this.state.isExpanded}
          text="Menu"
          callback={this.toggleMenu}
        />
        {dropdownList}
      </DropdownContainer>
    );
  }
}

// export const RegressionControls = (props) => {
//   const { dataOptions, onDataSelect } = props;
//
//   return <DropdownControls options={dataOptions} onSelect={onDataSelect} />;
// };
