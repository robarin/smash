question_types_attrs = [
  {
    name: 'Single choice responses',
    description: 'Users can answer by selecting one of the provided answers'
  },
  {
    name: 'Multiple choice responses',
    description: 'Users can answer by selecting one or more of the provided answers'
  },
  {
    name: 'Single choice responses or custom answer',
    description: 'Users can answer by selecting one of the provided answers or can type their own answer'
  },
  {
    name: 'Multiple choice responses and custom answer',
    description: 'Users can answer by selecting one or more of the provided answers and can type their own answer'
  },
  {
    name: 'Custom answer',
    description: 'Users should type their own answer'
  },
  {
    name: 'Yes/No response',
    description: 'Users have to response by selecting yes or no'
  }
]

question_types_attrs.each do |attr|
  QuestionType.create!(attr)
end
