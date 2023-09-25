import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as SettingAction from '../../actions/notification';
import styled from 'styled-components';

const SettingStyles = styled.div`
  .setting__percentVar {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(130%, -50%);
  }
`;

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      webhook_url: '',
      errMsgWebHookUrl : false,
    };
  }

  componentDidMount() {
    const { store_code } = this.props;
    this.props.fetchPublicApiConfig(store_code);
  }

  handleRefreshToken = () => {
    this.setState({ showNewToken: true });
    const { store_code } = this.props;
    this.props.changeToken(store_code);
  };

  handleCopyClick = () => {
    const { publicApiConfig } = this.props;
    const textToCopy = publicApiConfig.token;
    const tempInput = document.createElement('input');
    tempInput.value = textToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    alert('Đã sao chép: ' + textToCopy);
  };

  handleUpdateConfigPublicApiConfig = () => {
    const { store_code } = this.props;
    if(this.state.webhook_url === ''){
      this.setState({ errMsgWebHookUrl: true });
    } else {
      const data = {
        "enable": false,
        "webhook_url": this.state.webhook_url,
        "enable_webhook": false
      };
      this.props.UpdateConfigPublicApiConfig(store_code, data);
    }
  }

  Onchange = (e) => {
    this.setState({ webhook_url: e.target.value})
    this.setState({ errMsgWebHookUrl: false });
  }

  render() {
    const { publicApiConfig } = this.props;
    return (
      <SettingStyles className="">
        <div className="wrap-card">
          <div
            className="wrap-setting"
            style={{
              maxWidth: '730px',
              padding: '10px 0',
              position: 'relative',
              borderBottom: '1px solid grey',
            }}
          >
            <h5>Token</h5>
            <div
              className="wrap-setting"
              style={{
                maxWidth: '730px',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 0',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex' }} onClick={this.handleCopyClick}>
                Mã token: <span>{publicApiConfig.token}</span>{' '}
                <i
                  class="far fa-copy"
                  style={{ cursor: 'pointer', color: '#6868e1', fontSize: '24px', marginLeft: '10px' }}
                ></i>
              </div>

              <div class="custom-control custom-switch">
                <button class="btn btn-primary btn-sm" onClick={this.handleRefreshToken}>
                  Làm mới mã Token
                </button>
              </div>
            </div>
          
          </div>

          <div
            style={{
              maxWidth: '730px',
              justifyContent: 'space-between',
              padding: '10px 0',
              marginTop: '10px',
            }}
          >
            <h5>Webhooks</h5>
            <div>
              webhook_url: <span>{publicApiConfig.webhook_url}</span>
            </div>
          </div>
          <div
            className="wrap-setting"
            style={{
              maxWidth: '730px',
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px 0',
              alignItems: 'center',
            }}
          >
            <div>Thay đổi Webhook url: </div>
            <div>
              <input
                type="text"
                class="form-control"
                name="webhook_url"
                onChange={(e) => this.Onchange(e)}
                style={{ width: '650px' }}
              /> <br />
              {this.state.errMsgWebHookUrl && (<span style={{color: '#f24d4d'}}>Bạn chưa nhập Webhook url</span>)}
            </div>
          </div>
          <div>
            <button class="btn btn-primary btn-sm" onClick={this.handleUpdateConfigPublicApiConfig}>
              <i class="fa fa-save"></i> Lưu thay đổi
            </button>
          </div>
        </div>
      </SettingStyles>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    publicApiConfig: state.notificationReducers.publicApiConfig,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchPublicApiConfig: (store_code) => {
      dispatch(SettingAction.fetchPublicApiConfig(store_code));
    },
    changeToken: (store_code) => {
      dispatch(SettingAction.changeToken(store_code));
    },
    UpdateConfigPublicApiConfig: (store_code, data) => {
      dispatch(SettingAction.UpdateConfigPublicApiConfig(store_code, data));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Setting);
