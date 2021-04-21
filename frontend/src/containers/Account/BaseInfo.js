import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import StepButtons from "./StepButtons";
import { userRoles } from "@actions/userRoles";

const BaseInfo = ({accountInfo, setAccountInfo, nextStep, userRoles}) => {
  const [roles, setRoles] = useState([]);
  const [gender, setGender] = useState(null);
  const [role, setRole] = useState(null);
  const [error, setError] = useState(null);

  const setUserRoles = async () => {
    try {
      const response = await userRoles();
      setRoles(response.data);
    } catch(error) {
      setError({ message: error.message || 'Something went wrong' });
    }
  }

  useEffect(() => {
    setUserRoles();
  }, [])

  const updateAccountInfo = () => {
    const currentRole = role || roles[0].attributes.name;
    setAccountInfo({
      ...accountInfo,
      gender,
      role: currentRole
    });
  }

  const onStepChange = () => {
    if (!gender) {
      setError({ type: 'gender', message: 'Choose your gender' });
      return;
    }

    updateAccountInfo();
    nextStep();
  }

  const onGenderChange = (e) => {
    setError(null);
    setGender(e.target.value);
  }

  const onRoleChange = (e) => {
    setRole(e.target.value);
  }

  return (
    <div className="mb-6">
      <div className="m-4">
        <h3 className="text-xl border-b-2 border-gray-100 pb-4">General Info</h3>
      </div>
      <div className="m-4 p-6 flex justify-center">
        <dl>
          <div className="grid grid-cols-3 gap-4">
            <dt className="font-medium text-right">Gender</dt>
            <dd className="col-span-2">
              <div>
                <label className="inline-flex items-center">
                  <input type="radio" className="form-radio" name="accountType" value="male" onChange={onGenderChange} />
                  <span className="ml-2">Male</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input type="radio" className="form-radio" name="accountType" value="female" onChange={onGenderChange} />
                  <span className="ml-2">Female</span>
                </label>
                {error && (
                  <div>
                    <span className="text-red-500 text-xs mt-1">{error.message}</span>
                  </div>
                )}
              </div>
            </dd>

            <dt className="font-medium text-right">Role</dt>
            <dd className="col-span-2">
              <div>
                <label className="block">
                  <select className="form-select outline-none mt-1 block w-full" onChange={onRoleChange}>
                    {roles.map((role, index, self) => (
                      <option key={`role-${index}`}>{role.attributes.name}</option>
                    ))}
                  </select>
                </label>
              </div>
            </dd>
          </div>
        </dl>
      </div>
      <StepButtons onNext={onStepChange}/>
    </div>
  )
}

const mapDispatchToProps = {
  userRoles,
}

export default connect(null, mapDispatchToProps)(BaseInfo);
