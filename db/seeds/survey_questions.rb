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
  },
  {
    body: 'How do you respond to feedback?',
    response_type: 'single',
    question_responses_attributes: [
      {
        name: 'Via email',
        description: ''
      },
      {
        name: 'Via mobile',
        description: ''
      },
      {
        name: 'Through platform',
        description: ''
      },
      {
        name: 'In person',
        description: ''
      }
    ]
  },
  {
    body: 'How do you solve a difficult problem?',
    response_type: 'single_or_text',
    question_responses_attributes: [
      {
        name: 'Decomposition of tasks',
        description: ''
      },
      {
        name: 'Solving the whole task at a time',
        description: ''
      },
      {
        name: 'By asking for help',
        description: ''
      },
      {
        name: 'Please type your own variant',
        description: ''
      }
    ]
  },
  {
    body: 'What are the ways you learn best?',
    response_type: 'multiple_or_text',
    question_responses_attributes: [
      {
        name: 'By googling',
        description: ''
      },
      {
        name: 'By watching video materials',
        description: ''
      },
      {
        name: 'By reading',
        description: ''
      },
      {
        name: 'By listening',
        description: ''
      },
      {
        name: 'Please type your own variant',
        description: ''
      }
    ]
  },
  {
    body: 'Why did you join our community?',
    response_type: 'single_or_text',
    question_responses_attributes: [
      {
        name: 'I want to get a job',
        description: ''
      },
      {
        name: 'I want to find new friends',
        description: ''
      },
      {
        name: 'Personal growth',
        description: ''
      },
      {
        name: 'Please type your own variant',
        description: ''
      }
    ]
  },
  {
    body: 'How do you like to study or work?',
    response_type: 'single',
    question_responses_attributes: [
      {
        name: 'In silence',
        description: ''
      },
      {
        name: 'With music',
        description: ''
      },
      {
        name: 'At home',
        description: ''
      },
      {
        name: 'At public place',
        description: ''
      },
      {
        name: 'In the office',
        description: ''
      }
    ]
  },
  {
    body: 'What do you like to do for fun?',
    response_type: 'multiple_or_text',
    question_responses_attributes: [
      {
        name: 'Spend time with friends',
        description: ''
      },
      {
        name: 'Watching movies',
        description: ''
      },
      {
        name: 'Playing video games',
        description: ''
      },
      {
        name: 'Listening to music',
        description: ''
      },
      {
        name: 'Please type your own variant',
        description: ''
      }
    ]
  },
  {
    body: 'Have you ever worked with large data sets?',
    response_type: 'single',
    question_responses_attributes: [
      {
        name: 'Yes',
        description: ''
      },
      {
        name: 'No',
        description: ''
      },
    ]
  },
  {
    body: 'Do you see yourself working for a large or small company?',
    response_type: 'single',
    question_responses_attributes: [
      {
        name: 'Large',
        description: ''
      },
      {
        name: 'Small',
        description: ''
      },
    ]
  },
  {
    body: 'When areas of tech are you most interested in?',
    response_type: 'single',
    question_responses_attributes: [
      {
        name: 'Web development',
        description: ''
      },
      {
        name: 'Mobile development',
        description: ''
      },
      {
        name: 'Data science',
        description: ''
      },
      {
        name: 'AI/Machine learning',
        description: ''
      },
      {
        name: 'Haven\'t decided yet',
        description: ''
      }
    ]
  },
  {
    body: 'What was your favorite subject in high school?',
    response_type: 'multiple',
    question_responses_attributes: [
      {
        name: 'Math',
        description: ''
      },
      {
        name: 'Computer classes',
        description: ''
      },
      {
        name: 'Physics',
        description: ''
      },
      {
        name: 'Chemistry',
        description: ''
      },
      {
        name: 'Biology',
        description: ''
      },
      {
        name: 'Literature',
        description: ''
      }
    ]
  },
  {
    body: 'What coding languages have you used before?',
    response_type: 'multiple',
    question_responses_attributes: [
      {
        name: 'Ruby',
        description: ''
      },
      {
        name: 'JavaScript',
        description: ''
      },
      {
        name: 'Python',
        description: ''
      },
      {
        name: 'Java',
        description: ''
      },
      {
        name: 'None',
        description: ''
      }
    ]
  },
]

basic_survey = Survey.basic

questions.each.with_index(1) do |q_attrs, index|
  survey_question = SurveyQuestion.new(
    q_attrs.merge(
      position: index,
      survey: basic_survey
    )
  )

  survey_question.save!
end
