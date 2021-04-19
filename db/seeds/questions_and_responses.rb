basic_question1 = Question.create!(
  question_type: QuestionType.find_by(name: 'Single choice responses or custom answer'),
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
)

basic_question2 = Question.create!(
  question_type: QuestionType.find_by(name: 'Multiple choice responses and custom answer'),
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
)
basic_question2.question_responses.create(response: Response.find_by(name: 'Custom text response'))

onboarding_question1 = Question.create!(
  question_type: QuestionType.find_by(name: 'Yes/No response'),
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
)

onboarding_question2 = Question.create!(
  question_type: QuestionType.find_by(name: 'Single choice responses'),
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
)

