questions = [
  {
    body: 'How did you hear about us?',
    response_type: 'single_or_text',
    question_responses_attributes: [
      {
        name: 'Sources of information',
        description: 'Social network'
      },
      {
        name: 'Sources of information',
        description: 'University'
      },
      {
        name: 'Sources of information',
        description: 'Colleagues'
      },
      {
        name: 'Sources of information',
        description: 'Advertisement'
      },
      {
        name: 'Custom text response',
        description: 'Please type your variant'
      }
    ]
  },
  {
    body: 'What languages do you know already?',
    response_type: 'multiple',
    question_responses_attributes: [
      {
        name: 'Languages',
        description: 'English'
      },
      {
        name: 'Languages',
        description: 'Russian'
      },
      {
        name: 'Languages',
        description: 'French'
      }
    ]
  },
  {
    body: 'Would you like to be considered for a team leadership position?',
    response_type: 'single',
    question_responses_attributes: [
      {
        name: 'Yes/No',
        description: 'Yes'
      },
      {
        name: 'Yes/No',
        description: 'No'
      }
    ]
  },
  {
    body: 'What is most important to you?',
    response_type: 'single',
    question_responses_attributes: [
      {
        name: 'Priorities on tasks',
        description: 'Your time'
      },
      {
        name: 'Priorities in tasks',
        description: 'How much you make'
      },
      {
        name: 'Priorities in tasks',
        description: 'Freedom'
      },
      {
        name: 'Priorities in tasks',
        description: 'Being Creative'
      }
    ]
  }
]

basic_survey = Survey.find_by(name: 'Basic survey')

questions.each.with_index(1) do |q_attrs, index|
  survey_question = SurveyQuestion.new(
    q_attrs.merge(
      position: index,
      survey: basic_survey
    )
  )

  survey_question.save!
end
