import React, { useState, useEffect } from 'react';
import { requestGet } from '../../../utils/request';
import { API_ROUTES } from '../../../utils/constants';

import TagTypesList from '../../../components/Admin/TagTypes';

const TagTypes = () => {
  const [tagTypes, setTagTypes] = useState([]);

  useEffect(() => {
    requestGet(API_ROUTES.admin.tag_types).then((res) => {
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
        <TagTypesList list={tagTypes}/>
      )}
    </div>
  )
}

export default TagTypes
