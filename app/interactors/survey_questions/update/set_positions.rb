class SurveyQuestions::Update::SetPositions < ApplicationInteractor
  uses_via_context :survey_question, :params

  def call
    update_positions
    params.merge!(position: new_position)
  end

  private

  def survey
    survey_question.survey
  end

  def survey_questions
    @survey_questions ||= survey.survey_questions
  end

  def position_last
    @position_last ||= survey_questions.count
  end

  def new_position
    @new_position = params[:position] > position_last ? position_last : params[:position]
  end

  def update_positions
    old_position = survey_question.position
    questions_range = new_position < old_position ? (new_position-1..old_position-2) : (old_position..new_position-1)
    shift_number = new_position < old_position ? 1 : (-1)

    survey_questions[questions_range].each do |question|
      question.update!(position: question.position + shift_number)
    end
  end
end
