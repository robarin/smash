def parsed_body
  body = JSON.parse(response.body)

  if body.is_a? Array
    body.sort_by { |e| e['id'] }
        .map(&:deep_symbolize_keys)
  else
    body
  end
end

def send_request(method, url, options)
  headers = (options[:headers] || {}).merge!('content-type': 'application/json')
  params = options[:params].to_json

  case method
  when :post
    req_post(url, params, headers)
  when :patch
    req_patch(url, params, headers)
  end
end

def req_post(url, params, headers)
  post(url, params: params, headers: headers)
end

def req_patch(url, params, headers)
  patch(url, params: params, headers: headers)
end
