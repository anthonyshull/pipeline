import React, { Component } from 'react';
import { connect } from 'react-redux';

import Pure from './pure';
import initialize from './actions';

class Container extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  componentDidMount() {
    this.props.dispatch(initialize());
  }
  render() {
    return(<Pure ints={this.props.ints} />);
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Container);
