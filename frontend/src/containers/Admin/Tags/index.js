import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {requestGet, requestPatch, requestDelete, requestPost} from '@utils/request';
import {API_ROUTES} from '@utils/constants';
import Modal from '@components/Utils/Modal';
import Form from './Form'
import TagsList from '@components/Admin/Tags';
import {showFlashMessage} from "@actions/flash";
import {Button} from '@material-ui/core';

const Tags = ({dispatch, showFlashMessage}) => {
  const [tags, setTags] = useState([]);
  const [tagTypes, setTagTypes] = useState([]);
  const defaultModalParams = {
    open: false,
    title: 'Default',
    tag: null
  };
  const [modalParams, setModalParams] = useState(defaultModalParams);

  const showMessage = (type, title, message) => {
    dispatch(showFlashMessage({
      show: true,
      title: title,
      text: message,
      type: type,
    }))
  };

  const closeModal = () => {
    setModalParams(defaultModalParams);
  };

  const showNewModal = () => {
    setModalParams({ open: true, title: 'New tag', tag: null });
  };

  const showEditModal = (id) => {
    const tag = tags.find((tag) => tag.id == id);
    setModalParams({ open: true, title: 'Edit tag', tag: tag });
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm('Delete tag?')

    if (!confirmed) return;

    requestDelete(`${API_ROUTES.admin.tags}/${id}`).then((res) => {
      if (res.ok) {
        const newTagList = tags.filter((tag) => tag.id != id);
        setTags(newTagList);
        showMessage('success', 'Tag', 'Successfully deleted');
      } else {
        res.json().then((response) => {
          showMessage('error', 'Deleting error', response.message);
        });
      }
    })
  }

  const handleUpdate = (id, name, description, tagTypeId) => {
    const body = { name, description, tag_type_id: tagTypeId};

    requestPatch(`${API_ROUTES.admin.tags}/${id}`, body).then((res) => {
      if (res.ok) {
        res.json().then((tag) => {
          const newTags = [...tags];
          const index = newTags.findIndex(tag => tag.id == id);
          newTags.splice(index, 1, tag.data);
          setTags(newTags);
        });
        showMessage('success', 'Tag', 'Successfully updated');
      } else {
        res.json().then((response) => {
          showMessage('error', 'Updating error', response.message);
        });
      }
      closeModal();
    })
  }
  const handleCreate = (name, description, tagTypeId) => {
    const body = { name, description, tag_type_id: tagTypeId };

    requestPost(API_ROUTES.admin.tags, body).then((res) => {
      if (res.ok) {
        res.json().then((tag) => {
          setTags([...tags, tag.data]);
        });
        showMessage('success', 'Tag', 'Successfully created');
      } else {
        res.json().then((response) => {
          showMessage('error', 'Creating error', response.message);
        });
      }
      closeModal();
    })
  }

  const getTagsList = () => {
    requestGet(API_ROUTES.admin.tags).then((res) => {
      if (res.ok) {
        res.json().then((tags) => {
          setTags(tags.data);
        })
      }
    })
  }

  const getTagTypes = () => {
    requestGet(API_ROUTES.admin.tagTypes).then((res) => {
      if (res.ok) {
        res.json().then((types) => {
          setTagTypes(types.data.map(type => type.attributes));
        })
      }
    })
  }

  useEffect(() => {
    getTagsList()
    getTagTypes()
  }, []);

  return(
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl text-blue-700 leading-tight">
          Tags
        </h1>
        <Button color='primary' onClick={showNewModal}>Create tag</Button>
      </div>
      {tags && (
        <TagsList list={tags} handleDelete={handleDelete} handleEdit={showEditModal}/>
      )}
      <>
        <Modal isOpen={modalParams.open} title={modalParams.title} handleClose={closeModal}>
          <Form tagTypes={tagTypes} tag={modalParams.tag} handler={modalParams.tag ? handleUpdate : handleCreate} />
        </Modal>
      </>
    </div>
  )
}
const mapDispatchToProps = dispatch => ({
  showFlashMessage,
  dispatch
})

export default connect(mapDispatchToProps)(Tags);
