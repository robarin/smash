questions = [
  {
    body: 'How did you hear about us?',
    response_type: 'single_or_text',
    question_responses_attributes: [
      {
        name: 'Social network',
        description: 'Sources of information'
      },
      {
        name: 'University',
        description: 'Sources of information'
      },
      {
        name: 'Colleagues',
        description: 'Sources of information'
      },
      {
        name: 'Advertisement',
        description: 'Sources of information'
      },
      {
        name: 'Please type your variant',
        description: 'Custom text response'
      }
    ]
  },
  {
    body: 'What languages do you know already?',
    response_type: 'multiple',
    question_responses_attributes: [
      {
        name: 'English',
        description: 'Languages'
      },
      {
        name: 'Russian',
        description: 'Languages'
      },
      {
        name: 'French',
        description: 'Languages'
      }
    ]
  },
  {
    body: 'Would you like to be considered for a team leadership position?',
    response_type: 'single',
    question_responses_attributes: [
      {
        name: 'Yes',
        description: 'Yes/No'
      },
      {
        name: 'No',
        description: 'Yes/No'
      }
    ]
  },
  {
    body: 'What is most important to you?',
    response_type: 'single',
    question_responses_attributes: [
      {
        name: 'Your time',
        description: 'Priorities on tasks'
      },
      {
        name: 'How much you make',
        description: 'Priorities on tasks'
      },
      {
        name: 'Freedom',
        description: 'Priorities on tasks'
      },
      {
        name: 'Being Creative',
        description: 'Priorities on tasks'
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
