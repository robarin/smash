require 'rails_helper'

describe SurveyQuestions::Update::SetPositions do
  let!(:survey) { create(:survey) }
  let!(:questions_count) { 6 }
  let!(:questions) { create_list(:survey_question, questions_count, survey: survey) }
  let(:question_params) {
    {
      body: Faker::Lorem.word,
      response_type: SurveyQuestion.response_types.keys.sample,
      question_responses: []
    }
  }
  let(:question) { survey.survey_questions[2] }
  let(:new_question_position) { (1..questions_count).to_a.sample }
  let(:position_top)    { 1 }
  let(:position_middle) { 5 }
  let(:position_bottom) { questions_count }

  before do
    question_bodies = %w[A B C D E F]
    survey.survey_questions.order(:id).each.with_index do |question, index|
      question.update(body: question_bodies[index], position: index + 1)
    end
    survey.reload

    check_old_positions
  end

  describe 'call with position_top' do
    subject(:context) {
      SurveyQuestions::Update::SetPositions.call(
        survey_question: question,
        params: question_params.merge(position: position_top)
      )
    }

    it 'shifts positions of all upper questions to 1' do
      expect(context).to be_a_success

      new_positions = [["A", 2], ["B", 3], ["C", 3], ["D", 4], ["E", 5], ["F", 6]]
      expect(context.params).to eq question_params.merge(position: position_top)
      expect(context.survey_question.survey.survey_questions.pluck(:body, :position)).to eq new_positions
    end
  end

  describe 'call with position_middle' do
    subject(:context) {
      SurveyQuestions::Update::SetPositions.call(
        survey_question: question,
        params: question_params.merge(position: position_middle)
      )
    }

    it 'shifts positions of all questions between below up to 1' do
      expect(context).to be_a_success

      new_positions = [["A", 1], ["B", 2], ["C", 3], ["D", 3], ["E", 4], ["F", 6]]
      expect(context.params).to eq question_params.merge(position: position_middle)
      expect(context.survey_question.survey.survey_questions.pluck(:body, :position)).to eq new_positions
    end
  end

  describe 'call for survey with questions & position_bottom' do
    subject(:context) {
      SurveyQuestions::Update::SetPositions.call(
        survey_question: question,
        params: question_params.merge(position: position_bottom)
      )
    }

    it 'shifts positions of all questions below up to 1' do
      expect(context).to be_a_success

      new_positions = [["A", 1], ["B", 2], ["C", 3], ["D", 3], ["E", 4], ["F", 5]]
      expect(context.params).to eq question_params.merge(position: position_bottom)
      expect(context.survey_question.survey.survey_questions.pluck(:body, :position)).to eq new_positions
    end
  end

  describe 'call for survey with questions & too large number of position' do
    subject(:context) {
      SurveyQuestions::Update::SetPositions.call(
        survey_question: question,
        params: question_params.merge(position: 9999)
      )
    }

    it 'adds position which equal to questions_count to params' do
      expect(context).to be_a_success

      new_positions = [["A", 1], ["B", 2], ["C", 3], ["D", 3], ["E", 4], ["F", 5]]
      expect(context.params).to eq question_params.merge(position: questions_count)
      expect(context.survey_question.survey.survey_questions.pluck(:body, :position)).to eq new_positions
    end
  end

  def check_old_positions
    old_positions = [["A", 1], ["B", 2], ["C", 3], ["D", 4], ["E", 5], ["F", 6]]
    expect(survey.survey_questions.pluck(:body, :position)).to eq old_positions
  end
end
