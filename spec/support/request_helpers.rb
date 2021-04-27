def parsed_body
  JSON.parse(response.body)
end

def sorted_response_body
  parsed_body.sort_by {|h| h['id']}
end
