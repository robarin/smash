# Utility to help interactors find ActiveRecord instances
# takes a class name, looks in the context for an id value
# then looks up the record and stores it in the context
#
# Example:
#   fetch_record('FooBar')
#   will do: context.foo_bar = FooBar.find(context.foo_bar_id)
#
#   build_record('FooBar')
#   will do: context.foo_bar = FooBar.new(context.foo_bar_attributes || {})
module RecordHelpers
  def fetch_record(klass, &block)
    update_context(klass, finder, &block)
  rescue ActiveRecord::RecordNotFound => e
    context.fail!(error: e)
  end

  def fetch_records(*klasses)
    records = klasses.map { |klass| fetch_record(klass) }
    yield(*records) if block_given?
  end

  def fetch_all(klass)
    collection = klass.all
    context[object_key(klass).to_s.pluralize.to_sym] = collection
    if block_given?
      collection.each do |obj|
        yield obj
      end
    end
    collection
  end

  def build_record(klass, &block)
    update_context(klass, builder, &block)
  end

  private

  def finder
    ->(klass) { klass.find(context.public_send(identifier(klass)) || context.id) }
  end

  def builder
    ->(klass) { klass.new(context.public_send(object_attributes(klass)) || {}) }
  end

  def object_key(klass)
    klass.name.split('::').last.underscore.to_sym
  end

  def identifier(klass)
    "#{object_key(klass)}_id".to_sym
  end

  def object_attributes(klass)
    "#{object_key(klass)}_attributes".to_sym
  end

  def update_context(klass, strategy)
    obj = strategy.call(klass)
    context[object_key(klass)] = obj
    yield obj if block_given?
    obj
  end
end
