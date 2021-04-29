class SurveyQuestions::New::SetPositions < ApplicationInteractor
  uses_via_context :survey, :params

  def call
    return params.merge!(position: 1) if position_last.zero?

    update_positions
    params.merge!(position: new_position)
  end

  private

  def survey_questions
    @survey_questions ||= survey.survey_questions
  end

  def position_last
    @position_last ||= survey_questions.count
  end

  def new_position
    @new_position = params[:position] > position_last + 1 ? position_last + 1 : params[:position]
  end

  def update_positions
    survey_questions[new_position - 1..position_last - 1].each do |question|
      question.update!(position: question.position + 1)
    end
  end
end
