# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_04_08_110232) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admins", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "access_token"
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["access_token"], name: "index_admins_on_access_token", unique: true
    t.index ["email"], name: "index_admins_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admins_on_reset_password_token", unique: true
  end

  create_table "delayed_jobs", force: :cascade do |t|
    t.integer "priority", default: 0, null: false
    t.integer "attempts", default: 0, null: false
    t.text "handler", null: false
    t.text "last_error"
    t.datetime "run_at"
    t.datetime "locked_at"
    t.datetime "failed_at"
    t.string "locked_by"
    t.string "queue"
    t.datetime "created_at", precision: 6
    t.datetime "updated_at", precision: 6
    t.index ["priority", "run_at"], name: "delayed_jobs_priority"
  end

  create_table "genders", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.text "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name"], name: "index_genders_on_name"
  end

  create_table "people", force: :cascade do |t|
    t.string "first_name", default: "", null: false
    t.string "last_name", default: "", null: false
    t.string "middle_name", default: "", null: false
    t.datetime "birth_date"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id"
    t.bigint "gender_id"
    t.index ["gender_id"], name: "index_people_on_gender_id"
    t.index ["user_id"], name: "index_people_on_user_id"
  end

  create_table "question_responses", force: :cascade do |t|
    t.bigint "question_id"
    t.bigint "response_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["question_id"], name: "index_question_responses_on_question_id"
    t.index ["response_id"], name: "index_question_responses_on_response_id"
  end

  create_table "question_types", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "questions", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.string "body", default: "", null: false
    t.bigint "question_type_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["question_type_id"], name: "index_questions_on_question_type_id"
  end

  create_table "responses", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "session_surveys", force: :cascade do |t|
    t.bigint "session_id"
    t.bigint "survey_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["session_id"], name: "index_session_surveys_on_session_id"
    t.index ["survey_id"], name: "index_session_surveys_on_survey_id"
  end

  create_table "sessions", force: :cascade do |t|
    t.datetime "begin_date", null: false
    t.datetime "end_time"
    t.bigint "person_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["person_id"], name: "index_sessions_on_person_id"
  end

  create_table "survey_questions", force: :cascade do |t|
    t.bigint "survey_id"
    t.bigint "question_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["question_id"], name: "index_survey_questions_on_question_id"
    t.index ["survey_id"], name: "index_survey_questions_on_survey_id"
  end

  create_table "survey_session_answers", force: :cascade do |t|
    t.bigint "session_survey_id"
    t.bigint "question_response_id"
    t.text "body"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["question_response_id"], name: "index_survey_session_answers_on_question_response_id"
    t.index ["session_survey_id"], name: "index_survey_session_answers_on_session_survey_id"
  end

  create_table "survey_types", force: :cascade do |t|
    t.string "name", null: false
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "surveys", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "access_token"
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "provider"
    t.string "uid"
    t.index ["access_token"], name: "index_users_on_access_token", unique: true
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "people", "genders"
  add_foreign_key "people", "users"
  add_foreign_key "question_responses", "questions"
  add_foreign_key "question_responses", "responses"
  add_foreign_key "questions", "question_types"
  add_foreign_key "session_surveys", "sessions"
  add_foreign_key "session_surveys", "surveys"
  add_foreign_key "sessions", "people"
  add_foreign_key "survey_questions", "questions"
  add_foreign_key "survey_questions", "surveys"
  add_foreign_key "survey_session_answers", "question_responses"
  add_foreign_key "survey_session_answers", "session_surveys"
end
