const { React, Contact } = require('mailspring-exports');

class ReplyToButton extends React.Component {
  static displayName = 'ReplyToButton';
  static containerRequired = false;

  constructor(props) {
    super(props);
    const draft = props.draft;
    const current =
      draft && draft.replyTo && draft.replyTo.length > 0
        ? draft.replyTo.map(c => c.email).join(', ')
        : '';

    this.state = {
      open: false,
      value: current,
    };
  }

  _toggle = () => {
    this.setState({ open: true });
  };

  _onChange = e => {
    this.setState({ value: e.target.value });
  };

  _onKeyDown = e => {
    if (e.key === 'Enter') {
      this._save();
    }
    if (e.key === 'Escape') {
      this.setState({ open: false, value: this._getCurrentValue() });
    }
  };

  _getCurrentValue = () => {
    const draft = this.props.draft;
    return draft && draft.replyTo && draft.replyTo.length > 0
      ? draft.replyTo.map(c => c.email).join(', ')
      : '';
  };

  _save = () => {
    const { session } = this.props;
    if (!session) return;

    const raw = this.state.value.trim();

    const replyTo = raw.length > 0
      ? raw.split(',').map(addr => {
          const email = addr.trim();
          return new Contact({ email, name: email });
        })
      : [];

    session.changes.add({ replyTo });

    this.setState({ open: false });
  };

  render() {
    const { open, value } = this.state;
    const currentValue = this._getCurrentValue();
    const isSet = currentValue.trim().length > 0;
    const displayValue = isSet ? `↩ ${currentValue}` : '↩ Reply-To';

    return React.createElement(
      'div',
      { style: styles.wrap },

      // === INPUT MODE (button is hidden) ===
      open &&
        React.createElement(
          'div',
          { style: styles.headerReplyToWrap },   // Parent div

          React.createElement('input', {
            autoFocus: true,
            type: 'text',
            placeholder: 'reply-to@example.com',
            value: value,
            onChange: this._onChange,
            onKeyDown: this._onKeyDown,
            style: {
              ...styles.headerInput,
              flex: 1,              // makes input take available space
              minWidth: 0,
            },
          }),

          React.createElement(
            'button',
            {
              onClick: this._save,
              style: {
                background: 'lightblue',
                border: 'none',
                borderRadius: '4px',
                padding: '4px 8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
            },
            '→'
          )
        ),

      // === BUTTON MODE (input is hidden) ===
      !open &&
        React.createElement(
          'button',
          {
            tabIndex: -1,
            title: isSet ? currentValue : 'Set Reply-To address',
            className: 'btn btn-toolbar',
            style: isSet ? styles.btnActive : styles.btn,
            onClick: this._toggle,
          },
          React.createElement('span', { style: styles.label }, displayValue)
        )
    );
  }
}

const styles = {
  wrap: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
  },

  headerReplyToWrap: {
    display: 'flex',
    alignItems: 'center',
    padding: '6px 0',
    borderBottom: '1px solid var(--border-color, #ddd)',
    background: 'var(--background-primary, #fff)',
    width: '200px',
    height: '30px',
  },

  headerLabel: {
    fontSize: '12px',
    marginRight: '8px',
    fontWeight: 'bold',
    opacity: 0.7,
    whiteSpace: 'nowrap',
  },

headerInput: {
    fontSize: '13px',
    padding: '6px 10px',
    border: '1px solid var(--border-color, #ccc)',
    borderRadius: '4px',
    outline: 'none',
    background: 'var(--background-primary, #fff)',
    color: 'var(--text-color, #333)',
    width: '200px',
  },

  btn: {
    fontSize: '12px',
    padding: '0 8px',
    opacity: 0.7,
  },

  btnActive: {
    fontSize: '12px',
    padding: '0 8px',
    opacity: 1,
    fontWeight: 'bold',
  },

  label: {
    whiteSpace: 'nowrap',
    maxWidth: '180px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'inline-block',
  },
};

module.exports = ReplyToButton;