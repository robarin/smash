basic_survey = Survey.find_by(name: 'Basic survey')

Question.all.each.with_index(1) do |question, index|
  questions = basic_survey.survey_questions
  next if questions.find_by(question: question)

  questions.create!(question: question, position: index)
end
