import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import Modal from '@components/Admin/Utils/Modal';
import Form from './Form'
import TagsList from '@components/Admin/Tags';
import {fetchTags, updateTag, createTag} from "@actions/tags";
import {Button} from '@material-ui/core';

const Tags = ({tags, fetchTags, updateTag, createTag}) => {
  const defaultModalParams = {
    open: false,
    title: 'Default',
    tag: {
      id: null,
      name: null,
      description: null
    }
  };
  const [modalParams, setModalParams] = useState(defaultModalParams);

  const closeModal = () => {
    setModalParams(defaultModalParams);
  };

  const showNewModal = () => {
    setModalParams({open: true, title: 'New tag', tag: defaultModalParams.tag});
  };

  const showEditModal = (id) => {
    const tag = tags.find((tag) => tag.id == id);
    setModalParams({open: true, title: 'Edit tag', tag: tag});
  };

  const handleUpdate = (attributes) => {
    updateTag(attributes)
    closeModal()
  }

  const handleCreate = (attributes) => {
    createTag(attributes)
    closeModal()
  }

  useEffect(() => {
    fetchTags()
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl text-blue-700 leading-tight">
          Tags
        </h1>
        <Button color='primary' onClick={showNewModal}>Create tag</Button>
      </div>
      {tags && (
        <TagsList list={tags} handleEdit={showEditModal}/>
      )}
      <Modal isOpen={modalParams.open} title={modalParams.title} handleClose={closeModal}>
        <Form tag={modalParams.tag} onSubmit={modalParams.tag.id ? handleUpdate : handleCreate}/>
      </Modal>
    </div>
  )
}

const mapStateToProps = ({tags}) => (
  {tags: tags.data}
)

const mapDispatchToProps = {
  fetchTags,
  updateTag,
  createTag
}

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
