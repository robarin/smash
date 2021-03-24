require_relative 'record_helpers'
require_relative 'suppressor'

class ApplicationInteractor
  include Interactor
  include RecordHelpers

  class << self
    def uses_via_context(*args)
      needs_context(*args)
      delegate_to_context(*args)
    end

    def needs_context(*args)
      args.each do |key|
        _required_keys << key
      end
      before_hooks.push(ensure_required(_required_keys))
    end

    def delegate_to_context(*args)
      delegate(*args, to: :context)
    end

    def before(*hooks, &block)
      hooks << block if block
      if before_hooks.last == ensure_required(_required_keys)
        hooks.push(before_hooks.pop)
      end
      hooks.each { |hook| before_hooks.push(hook) }
    end

    def ignore_failure
      Suppressor.wrap(self)
    end

    private

    def _required_keys
      @__required_keys ||= []
    end

    def ensure_required(required)
      @_ensure_required ||= lambda do
        missing = (required - context.to_h.keys.map(&:to_sym))
        if missing.any?
          message = "Context is missing #{missing.join(', ')}"
          raise StandardError, message
        end
      end
    end
  end

  def strip_nils(hash)
    hash.reject { |_k, v| v.nil? }
  end

  def package_error(error, status: 500)
    {
      status: status,
      data: error.to_json,
      message: error.message,
      backtrace: error.backtrace
    }
  end
end
