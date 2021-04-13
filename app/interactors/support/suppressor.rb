class Suppressor
  include Interactor

  class << self
    def wrap(klass)
      descendant = Class.new(self)
      descendant.instance_variable_set(:@klass, klass)
      descendant
    end

    def call!(context = {})
      @klass.call!(context)
    rescue Interactor::Failure => error
      error.context.tap do |ctx|
        ctx.instance_variable_set(:@failure, false)
      end
    end
    alias call call!
  end
end
