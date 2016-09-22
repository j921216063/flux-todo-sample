import React from 'react';
import TodoActions from '../actions/TodoActions';
import TodoTextInput from './TodoTextInput';
import classNames from 'classnames';


class TodoItem extends React.Component {

  static propTypes = {
   todo: React.PropTypes.object.isRequired
  };
  constructor(props) {
      super(props)
      this.state = {
           isEditing: false
      };
  }

  /**
   * @return {object}
   */
  render() {
    var todo = this.props.todo;

    var input;
    if (this.state.isEditing) {
      input =
        <TodoTextInput
          className="edit"
          onSave={this._onSave}
          value={todo.text}
        />;
    }

    // List items should get the class 'editing' when editing
    // and 'completed' when marked as completed.
    // Note that 'completed' is a classification while 'complete' is a state.
    // This differentiation between classification and state becomes important
    // in the naming of view actions toggleComplete() vs. destroyCompleted().
    return (
      <li
        className={classNames({
          'completed': todo.complete,
          'editing': this.state.isEditing
        })}
        key={todo.id}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.complete}
            onChange={this._onToggleComplete}
          />
          <label onDoubleClick={this._onDoubleClick}>
            {todo.text}
          </label>
          <button className="destroy" onClick={this._onDestroyClick} />
        </div>
        {input}
      </li>
    );
  }

  _onToggleComplete = () => {
    TodoActions.toggleComplete(this.props.todo);
  };

  _onDoubleClick= () => {
    this.setState({isEditing: true});
  }

  /**
   * Event handler called within TodoTextInput.
   * Defining this here allows TodoTextInput to be used in multiple places
   * in different ways.
   * @param  {string} text
   */
  _onSave = (text) => {
    TodoActions.updateText(this.props.todo.id, text);
    this.setState({isEditing: false});
  };

  _onDestroyClick = () => {
    TodoActions.destroy(this.props.todo.id);
  };

}

module.exports = TodoItem;
