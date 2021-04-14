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
].freeze

SEEDS.each do |seed|
  file = "#{SEEDS_PATH}/#{seed}.rb"
  begin
    load file
  rescue ActiveRecord::RecordInvalid, ActiveRecord::RecordNotFound, ActiveRecord::StatementInvalid => e
    puts e
    puts "Seed: #{seed}"
  end
end
