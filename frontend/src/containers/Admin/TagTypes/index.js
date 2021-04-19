import React, {useState, useEffect} from 'react';
import {requestGet} from '../../../utils/request';
import {API_ROUTES} from '../../../utils/constants';
import Modal from '../../../components/Utils/Modal';
import TagTypesList from '../../../components/Admin/TagTypes';

const TagTypes = () => {
  const [tagTypes, setTagTypes] = useState([]);
  const defaultModalParams = {
    open: false,
    title: 'Default',
    tagType: null
  };

  const [modalParams, setModalParams] = useState(defaultModalParams);

  const closeModal = () => {
    setModalParams(defaultModalParams);
  };

  const showEditModal = (id) => {
    const tagType = tagTypes.find((tagType) => tagType.id == id);
    setModalParams({ open: true, title: 'Edit tag type', tagType: tagType });
  };

  useEffect(() => {
    requestGet(API_ROUTES.admin.tagTypes).then((res) => {
      if (res.ok) {
        res.json().then((tagTypes) => {
          setTagTypes(tagTypes.data);
        })
      }
    })
  }, []);

  return(
    <div>
      {tagTypes && (
        <TagTypesList list={tagTypes} handleEdit={showEditModal}/>
      )}
      <>
        <Modal isOpen={modalParams.open} title={modalParams.title} handleClose={closeModal}>
          <div>
            there will be modal children
          </div>
        </Modal>
      </>
    </div>
  )
}

export default TagTypes;
