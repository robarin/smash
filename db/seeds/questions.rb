questions = [
  {
    name: 'Hearing about us',
    body: 'How did you hear about us?',
    response_type: 'single_or_text',
    question_responses_attributes: [
      {
        response_attributes: {
          name: 'Sources of information',
          description: 'Social network'
        }
      },
      {
        response_attributes: {
          name: 'Sources of information',
          description: 'University'
        }
      },
      {
        response_attributes: {
          name: 'Sources of information',
          description: 'Colleagues'
        }
      },
      {
        response_attributes: {
          name: 'Sources of information',
          description: 'Advertisement'
        }
      },
      {
        response_attributes: {
          name: 'Custom text response',
          description: 'Please type your variant'
        }
      }
    ]
  },
  {
    name: 'Language knowledge',
    body: 'What languages do you know already?',
    response_type: 'multiple_or_text',
    question_responses_attributes: [
      {
        response_attributes: {
          name: 'Languages',
          description: 'English'
        }
      },
      {
        response_attributes: {
          name: 'Languages',
          description: 'Russian'
        }
      },
      {
        response_attributes: {
          name: 'Languages',
          description: 'French'
        }
      }
    ]
  },
  {
    name: 'Leadership',
    body: 'Would you like to be considered for a team leadership position?',
    response_type: 'single',
    question_responses_attributes: [
      {
        response_attributes: {
          name: 'Yes/No',
          description: 'Yes'
        }
      },
      {
        response_attributes: {
          name: 'Yes/No',
          description: 'No'
        }
      }
    ]
  },
  {
    name: 'Priorities in tasks',
    body: 'What is most important to you?',
    response_type: 'single',
    question_responses_attributes: [
      {
        response_attributes: {
          name: 'Priorities on tasks',
          description: 'Your time'
        }
      },
      {
        response_attributes: {
          name: 'Priorities in tasks',
          description: 'How much you make'
        }
      },
      {
        response_attributes: {
          name: 'Priorities in tasks',
          description: 'Freedom'
        }
      },
      {
        response_attributes: {
          name: 'Priorities in tasks',
          description: 'Being Creative'
        }
      }
    ]
  }
]

questions.each do |q_attrs|
  question = Question.find_by(name: q_attrs[:name], body: q_attrs[:body])
  next if question

  Question.create!(q_attrs)
end


