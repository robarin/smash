SEEDS_PATH = 'db/seeds'.freeze
SEEDS = %w[
  admin
  genders
  roles
  countries
  regions
  provinces
  users
  survey_types
  surveys
  survey_questions
].freeze

SEEDS.each do |seed|
  file = "#{SEEDS_PATH}/#{seed}.rb"
  begin
    puts "Seeding file: #{file}"
    load file
  rescue ActiveRecord::RecordInvalid, ActiveRecord::RecordNotFound, ActiveRecord::StatementInvalid, TypeError => e
    puts e
    puts "Seed: #{seed}"
  end
end
