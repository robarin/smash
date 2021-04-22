import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import StepButtons from '@components/Navigation/StepButtons';
import {countriesInfo} from '@actions/countriesInfo';

import PhoneInput from 'react-phone-input-2';

const ContactInfo = ({accountInfo, setAccountInfo, nextStep, previousStep, countriesInfo}) => {
  const [phone, setPhone] = useState('');
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [country, setCountry] = useState(null);
  const [region, setRegion] = useState(null);
  const [province, setProvince] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCountriesInfo().then(result => {
      setCountriesInfo(result);
    });
  }, [])

  const onPhoneChange = (value) => {
    setError(null);
    setPhone(value);
  }

  const getCountriesInfo = async () => {
    try {
      const response = await countriesInfo();
      const {data} = response;
      return data;
    } catch (error) {
      setError({message: error.message || 'Something went wrong'});
    }
  }

  const setCountriesInfo = (countriesData) => {
    const regionsData = countriesData[0].attributes.regions;
    const provincesData = regionsData[0].attributes.provinces;

    setCountry(countriesData[0]);
    setRegion(regionsData[0]);
    setProvince(provincesData[0]);

    setCountries(countriesData);
    setRegions(regionsData);
    setProvinces(provincesData);
  }

  const onRegionChange = (e) => {
    const value = e.target.value;
    const selectedRegion = regions.find(r => r.attributes.name === value);
    const selectedProvinces = selectedRegion.attributes.provinces;

    setRegion(selectedRegion);
    setProvince(selectedProvinces[0]);
    setProvinces(selectedProvinces);
  }

  const onProvinceChange = (e) => {
    const value = e.target.value;
    const selectedProvince = provinces.find(p => p.attributes.name === value);

    setProvince(selectedProvince);
  }

  const validPhone = () => {
    let valid = true;

    if (phone.length < 11) {
      valid = false;
      setError({type: 'phone', message: 'Invalid phone number'})
    }

    return valid;
  }

  const validStep = () => {
    return validPhone();
  }

  const onNextStep = () => {
    if (!validStep()) return;

    setAccountInfo({
      ...accountInfo,
      phone,
      country: country.attributes.name,
      region: region.attributes.name,
      province: province.attributes.name,
    })

    nextStep();
  }

  const isPhoneError = () => {
    return error && error.type === 'phone'
  }

  return (
    <div className="mb-6">
      <div className="m-4">
        <h3 className="text-xl border-b-2 border-gray-100 pb-4">Contact Info</h3>
      </div>
      <div className="m-4 p-6 flex justify-center">
        <dl>
          <div className="grid grid-cols-3 gap-4">
            <dt className="font-medium text-right pt-2">Phone</dt>
            <dd className="col-span-2">
              <div className="text-left">
                <PhoneInput specialLabel="" type="phone"
                            inputClass={`${isPhoneError() ? 'border-red-500' : 'border-gray-200'} p-2 form-input border p-1 outline-none rounded-md focus:border-gray-400`}
                            value={phone} onChange={value => onPhoneChange(value)}/>
                {isPhoneError() && (
                  <div>
                    <span className="text-red-500 text-xs mt-1">{error.message}</span>
                  </div>
                )}
              </div>
            </dd>

            <dt className="font-medium text-right pt-2">Country</dt>
            <dd className="col-span-2">
              <div>
                <label className="block">
                  <select
                    className="form-select border p-2 outline-none rounded-md border-gray-200 outline-none mt-1 block w-full">
                    {countries.map((country, index, self) => (
                      <option key={`country-${index}`}>{country.attributes.name}</option>
                    ))}
                  </select>
                </label>
              </div>
            </dd>

            <dt className="font-medium text-right pt-2">Region</dt>
            <dd className="col-span-2">
              <div>
                <label className="block">
                  <select
                    className="form-select border p-2 outline-none rounded-md border-gray-200 outline-none mt-1 block w-full"
                    onChange={onRegionChange} value={region?.attributes?.name}>
                    {regions.map((region, index, self) => (
                      <option key={`region-${index}`}>{region.attributes.name}</option>
                    ))}
                  </select>
                </label>
              </div>
            </dd>

            <dt className="font-medium text-right pt-2">Province</dt>
            <dd className="col-span-2">
              <div>
                <label className="block">
                  <select
                    className="form-select border p-2 outline-none rounded-md border-gray-200 outline-none mt-1 block w-full"
                    onChange={onProvinceChange} value={province?.attributes?.name}>
                    {provinces.map((province, index, self) => (
                      <option key={`province-${index}`}>{province.attributes.name}</option>
                    ))}
                  </select>
                </label>
              </div>
            </dd>
          </div>
        </dl>
      </div>
      <StepButtons onPrevious={previousStep} onNext={onNextStep}/>
    </div>
  )
}

const mapDispatchToProps = {
  countriesInfo,
}

export default connect(null, mapDispatchToProps)(ContactInfo);
