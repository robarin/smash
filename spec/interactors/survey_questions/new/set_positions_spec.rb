require 'rails_helper'

describe SurveyQuestions::New::SetPositions do
  let!(:survey1)   { create(:survey) }
  let!(:survey2)   { create(:survey) }
  let!(:questions_count) { 6 }
  let!(:questions) { create_list(:survey_question, questions_count, survey: survey1) }
  let(:question_params) {
    {
      body: Faker::Lorem.word,
      response_type: SurveyQuestion.response_types.keys.sample,
      question_responses: []
    }
  }
  let(:new_question_position) { (1..questions_count).to_a.sample }
  let(:position_top)    { 1 }
  let(:position_middle) { 4 }
  let(:position_bottom) { questions_count + 1 }

  before do
    question_bodies = %w[A B C D E F]
    survey1.survey_questions.order(:id).each.with_index do |question, index|
      question.update(body: question_bodies[index], position: index + 1)
    end
    survey1.reload

    check_old_positions
  end

  describe 'call for survey with questions & position_top' do
    subject(:context) {
      SurveyQuestions::New::SetPositions.call(
        survey: survey1,
        params: question_params.merge(position: position_top)
      )
    }

    it 'shifts positions of all questions below to 1' do
      expect(context).to be_a_success

      new_positions = [["A", 2], ["B", 3], ["C", 4], ["D", 5], ["E", 6], ["F", 7]]
      expect(context.params).to eq question_params.merge(position: position_top)
      expect(context.survey.survey_questions.pluck(:body, :position)).to eq new_positions
    end
  end

  describe 'call for survey with questions & position_middle' do
    subject(:context) {
      SurveyQuestions::New::SetPositions.call(
        survey: survey1,
        params: question_params.merge(position: position_middle)
      )
    }

    it 'shifts positions of all questions below to 1' do
      expect(context).to be_a_success

      new_positions = [["A", 1], ["B", 2], ["C", 3], ["D", 5], ["E", 6], ["F", 7]]
      expect(context.params).to eq question_params.merge(position: position_middle)
      expect(context.survey.survey_questions.pluck(:body, :position)).to eq new_positions
    end
  end

  describe 'call for survey with questions & position_bottom' do
    subject(:context) {
      SurveyQuestions::New::SetPositions.call(
        survey: survey1,
        params: question_params.merge(position: position_bottom)
      )
    }

    it 'lefts positions of all questions the same' do
      expect(context).to be_a_success

      new_positions = [["A", 1], ["B", 2], ["C", 3], ["D", 4], ["E", 5], ["F", 6]]
      expect(context.params).to eq question_params.merge(position: position_bottom)
      expect(context.survey.survey_questions.pluck(:body, :position)).to eq new_positions
    end
  end

  describe 'call for survey with questions & too large number of position' do
    subject(:context) {
      SurveyQuestions::New::SetPositions.call(
        survey: survey1,
        params: question_params.merge(position: 9999)
      )
    }

    it 'adds position which equal to questions_count + 1 to params' do
      expect(context).to be_a_success

      new_positions = [["A", 1], ["B", 2], ["C", 3], ["D", 4], ["E", 5], ["F", 6]]
      expect(context.params).to eq question_params.merge(position: questions_count + 1)
      expect(context.survey.survey_questions.pluck(:body, :position)).to eq new_positions
    end
  end

  describe 'call for survey with questions & any position' do
    subject(:context) {
      SurveyQuestions::New::SetPositions.call(
        survey: survey1,
        params: question_params.merge(position: new_question_position)
      )
    }

    it 'shifts positions of all questions below new position to 1' do
      question_attrs_before = survey1.survey_questions[new_question_position - 1..questions_count - 1].pluck(:id, :position)

      expect(context).to be_a_success

      expect(context.params).to eq question_params.merge(position: new_question_position)

      survey1.reload.survey_questions[new_question_position - 1..questions_count - 1].each.with_index do |question, index|
        question_attr_before = question_attrs_before[index]
        expect(question.id).to eq question_attr_before.first
        expect(question.position).to eq question_attr_before.last + 1
      end
    end
  end

  describe 'call for survey without questions' do
    subject(:context) {
      SurveyQuestions::New::SetPositions.call(
        survey: survey2,
        params: question_params.merge(position: new_question_position)
      )
    }

    it 'adds position equal to 1 to params' do
      expect(context).to be_a_success

      expect(context.params).to eq question_params.merge(position: 1)
    end
  end

  def check_old_positions
    old_positions = [["A", 1], ["B", 2], ["C", 3], ["D", 4], ["E", 5], ["F", 6]]
    expect(survey1.survey_questions.pluck(:body, :position)).to eq old_positions
  end
end
