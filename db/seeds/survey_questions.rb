basic_survey = Survey.find_by(name: 'Basic survey')

Question.all.each.with_index(1) do |question, index|
  basic_survey.survey_questions.create!(question: question, position: index)
end
