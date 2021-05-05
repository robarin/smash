Group.all.each do |group|
  event = FactoryBot.create(:event, name: "#{group.name} event", location: Location.all.sample)
  group.events << event
end

event1 = FactoryBot.create(:event, name: "Event for several groups", location: Location.all.sample)
Group.take(2).each { |group| event1.groups << group }

FactoryBot.create(:event, name: "General event", location: Location.all.sample)
