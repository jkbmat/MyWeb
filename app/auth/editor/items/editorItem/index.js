/**
 * Created by Jakub Matuška on 20.03.2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import ReactMarkdown from 'react-markdown';

import PictureMover from '../pictureMover';
import * as Actions from './actions';

import {commonPropsDiffer} from 'utils';

import classNames from 'classnames';

require('./_style.scss');

class EditorItem extends React.Component {
  render() {
    const {item, color, handlers, isChanged, isTemporary} = this.props;

    return (
      <div className={classNames("item-container", {expanded: item.expanded})}>
        <div className="item">
          <div className={classNames("item-header", {temporary: isTemporary})} onClick={handlers.toggle}
               style={{borderTopColor: color}}>
            {item.name}
            <span className="year">({item.year})</span>
          </div>
          {item.expanded &&
          <div className="item-details" style={{display: item.expanded ? 'block' : 'none'}}>
            <div className="item-picture-wrapper">
              {item.picture && (
                <div className="editor-image">
                  <PictureMover posChangeHandler={handlers.change.position} picture={item.picture} x={item.pictureX}
                                y={item.pictureY}/>
                </div>
              )}

            </div>

            <div className="item-details-text">
              <div className="buttons file-buttons">
                <form
                  encType="multipart/form-data"
                  action={"/api/items/" + item.id + "/picture"}
                  ref={(pictureForm) => this.pictureForm = pictureForm}
                >
                  <label>
                    <input type="file" onChange={handlers.addPicture} accept="image/*" name="picture"/>
                    <span className="button">{item.picture ? "Change" : "Add"} image</span>
                  </label>
                </form>

                {item.picture && <span className="button" onClick={() => {handlers.removePicture(this.pictureForm)}}>Remove image</span>}

              </div>
              <div className="item-table">

                <label>
                  <span>Name:</span>
                  <input type="text" value={item.name} onChange={handlers.change.name} required />
                </label>

                <label>
                  <span>Year:</span>
                  <input type="number" value={item.year} onChange={handlers.change.year} required />
                </label>

                <label>
                  <span>Description:</span>
                  <textarea value={item.description} onChange={handlers.change.description}/>
                </label>

                {item.description && (
                <label>
                  <span>Preview:</span>
                  <ReactMarkdown source={item.description}/>
                </label>
                )}

                <label>
                  <span>Link:</span>
                  <input type="text" value={item.link} onChange={handlers.change.link}/>
                </label>
              </div>

              <div className="buttons">
                <span className="button" onClick={handlers.remove}>Remove</span>

                {
                  isTemporary ? <span className="button" onClick={() => {handlers.create(this.pictureForm)}}>Create</span> :
                    <div>
                      {isChanged && <span className="button" onClick={handlers.reset}>Cancel</span>}
                      {isChanged && <span className="button" onClick={() => {handlers.update(this.pictureForm)}}>Submit</span>}
                    </div>
                }
              </div>
            </div>

          </div>
          }
        </div>
      </div>
    );
  }
}


export default connect(
  (state, ownProps) => {
    return {
      color: state.Editor.Categories.find(category => category.id === ownProps.item.category).color,
      isChanged: commonPropsDiffer(ownProps.item, state.Items.find((item) => item.id === ownProps.item.id), ["expanded"]),
      isTemporary: ownProps.item.temporary
    }
  },

  (dispatch, ownProps) => ({
    handlers: {
      change: {
        name: (e) => dispatch(Actions.onChange(ownProps.item.id, "name", e.target.value)),
        year: (e) => dispatch(Actions.onChange(ownProps.item.id, "year", e.target.value)),
        description: (e) => dispatch(Actions.onChange(ownProps.item.id, "description", e.target.value)),
        link: (e) => dispatch(Actions.onChange(ownProps.item.id, "link", e.target.value)),
        position: (x, y) => {
          dispatch(Actions.onChange(ownProps.item.id, "pictureX", x));
          dispatch(Actions.onChange(ownProps.item.id, "pictureY", y));
        }
      },

      addPicture: (e) => {
        if (e.target.files && e.target.files[0]) {
          dispatch(Actions.addTempPicture(ownProps.item.id, URL.createObjectURL(e.target.files[0])));
        }
      },
      removePicture: (pictureForm) => {
        pictureForm.querySelector('input[type=file]').value = null;

        dispatch(Actions.removePicture(ownProps.item.id))
      },

      toggle: () => dispatch(Actions.toggleItem(ownProps.item.id)),
      reset: () => dispatch(Actions.resetItem(ownProps.item.id)),
      remove: () => {
        if (confirm("Are you sure you want to delete this item?"))
          dispatch(Actions.removeItem(ownProps.item))
      },
      create: (pictureForm) => dispatch(Actions.createItem(ownProps.item, pictureForm)),
      update: (pictureForm) => dispatch(Actions.updateItem(ownProps.item, pictureForm)),
    }
  })
)(EditorItem);