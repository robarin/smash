def parsed_body
  JSON.parse(response.body)
end

def sorted_response_body
  parsed_body.sort_by {|h| h['id']}
end

def send_request(method, url, options)
  headers = (options[:headers] || {}).merge!('content-type': 'application/json')
  params = options[:params].to_json

  case method
  when :post
    reqPost(url, params, headers)
  when :patch
    reqPatch(url, params, headers)
  end
end

def reqPost(url, params, headers)
  post(url, params: params, headers: headers)
end

def reqPatch(url, params, headers)
  patch(url, params: params, headers: headers)
end
