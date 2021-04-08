Dir['db/seeds/*.rb'].sort.each do |seed|
  begin
    load seed
  rescue ActiveRecord::RecordInvalid, ActiveRecord::RecordNotFound => e
    puts e
    puts "Seed: #{seed}"
  end
end
