import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Info from './Info';
import Button from './Button';
import ErrorMessage from './ErrorMessage';
import { remote } from 'electron';
import { openVolume } from 'src/lib/veracrypt';
import './VeraCryptButton.scss';

export default class VeraCryptButton extends Component {
  static propTypes = {
    className: PropTypes.string,
    secret: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleVeracrypt() {
    return new Promise((resolve, reject) => {
      remote.dialog.showOpenDialog({
        title: 'Select VeraCrypt volume',
        properties: ['openFile']
      }, (filenames) => {
        const path = filenames[0];
        openVolume(path, this.props.secret)
          .then(() => {
            this.setState({ veraCryptError: false });
            resolve();
          })
          .catch((message) => {
            this.setState({ veraCryptError: message });
            reject(message);
          });
      });
    });
  }

  render() {
    return (
      <div className={`veracrypt flex-column align-center ${this.props.className}`}>
        <ErrorMessage>{this.state.veraCryptError}</ErrorMessage>
        <Button type="xlarge"
          icon="hdd-o"
          onClick={this.handleVeracrypt.bind(this)}>
          <h4>Open Veracrypt Volume</h4>
          <span className="button-subtitle">
            This will open a Veracrypt volume with the secret as the passphrase.
          </span>
        </Button>
        <Info>
          {'If VeraCrypt asks for a password then it has failed to open' +
          ' the volume with the recovered secret.'}
        </Info>
      </div>
    );
  }
}
