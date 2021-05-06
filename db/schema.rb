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

ActiveRecord::Schema.define(version: 2021_05_06_090855) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "achievements", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

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

  create_table "countries", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.string "abbrev"
    t.text "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
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

  create_table "event_groups", force: :cascade do |t|
    t.bigint "event_id"
    t.bigint "group_id"
    t.index ["event_id"], name: "index_event_groups_on_event_id"
    t.index ["group_id"], name: "index_event_groups_on_group_id"
  end

  create_table "event_notes", force: :cascade do |t|
    t.datetime "date"
    t.text "body"
    t.bigint "person_event_id", null: false
    t.bigint "rating_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["person_event_id"], name: "index_event_notes_on_person_event_id"
    t.index ["rating_id"], name: "index_event_notes_on_rating_id"
  end

  create_table "event_types", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "events", force: :cascade do |t|
    t.string "name"
    t.datetime "date"
    t.bigint "location_id", null: false
    t.text "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "event_type_id"
    t.index ["event_type_id"], name: "index_events_on_event_type_id"
    t.index ["location_id"], name: "index_events_on_location_id"
  end

  create_table "genders", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.text "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name"], name: "index_genders_on_name"
  end

  create_table "groups", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.text "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "location_types", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "locations", force: :cascade do |t|
    t.bigint "province_id"
    t.string "city", null: false
    t.string "street_number"
    t.string "zip"
    t.string "name"
    t.text "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "location_type_id"
    t.index ["location_type_id"], name: "index_locations_on_location_type_id"
    t.index ["province_id"], name: "index_locations_on_province_id"
  end

  create_table "people", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "middle_name"
    t.string "phone"
    t.string "avatar"
    t.integer "role", default: 0
    t.datetime "birth_date"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id"
    t.bigint "gender_id"
    t.bigint "province_id"
    t.index ["gender_id"], name: "index_people_on_gender_id"
    t.index ["phone"], name: "index_people_on_phone"
    t.index ["province_id"], name: "index_people_on_province_id"
    t.index ["user_id"], name: "index_people_on_user_id"
  end

  create_table "person_event_achievements", force: :cascade do |t|
    t.bigint "person_event_id", null: false
    t.bigint "achievement_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["achievement_id"], name: "index_person_event_achievements_on_achievement_id"
    t.index ["person_event_id"], name: "index_person_event_achievements_on_person_event_id"
  end

  create_table "person_events", force: :cascade do |t|
    t.bigint "event_id", null: false
    t.bigint "person_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["event_id"], name: "index_person_events_on_event_id"
    t.index ["person_id"], name: "index_person_events_on_person_id"
  end

  create_table "person_groups", force: :cascade do |t|
    t.bigint "person_id"
    t.bigint "group_id"
    t.datetime "begin_date"
    t.datetime "end_date"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["group_id"], name: "index_person_groups_on_group_id"
    t.index ["person_id"], name: "index_person_groups_on_person_id"
  end

  create_table "provinces", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.string "abbrev"
    t.bigint "region_id"
    t.text "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["region_id"], name: "index_provinces_on_region_id"
  end

  create_table "question_responses", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.text "description"
    t.bigint "survey_question_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["survey_question_id"], name: "index_question_responses_on_survey_question_id"
  end

  create_table "ratings", force: :cascade do |t|
    t.string "name"
    t.decimal "numeric"
    t.text "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "regions", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.bigint "country_id"
    t.text "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["country_id"], name: "index_regions_on_country_id"
  end

  create_table "session_surveys", force: :cascade do |t|
    t.datetime "begin_date", null: false
    t.datetime "end_time"
    t.bigint "person_id"
    t.bigint "survey_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["person_id"], name: "index_session_surveys_on_person_id"
    t.index ["survey_id"], name: "index_session_surveys_on_survey_id"
  end

  create_table "survey_questions", force: :cascade do |t|
    t.string "body", default: "", null: false
    t.bigint "survey_id"
    t.integer "response_type", default: 0
    t.integer "position"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["response_type"], name: "index_survey_questions_on_response_type"
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
    t.string "name", default: "", null: false
    t.text "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "surveys", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.text "description"
    t.bigint "survey_type_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["survey_type_id"], name: "index_surveys_on_survey_type_id"
  end

  create_table "tag_types", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "tags", force: :cascade do |t|
    t.string "name"
    t.text "description"
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
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.index ["access_token"], name: "index_users_on_access_token", unique: true
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "event_groups", "events"
  add_foreign_key "event_groups", "groups"
  add_foreign_key "event_notes", "person_events"
  add_foreign_key "event_notes", "ratings"
  add_foreign_key "events", "event_types"
  add_foreign_key "events", "locations"
  add_foreign_key "locations", "location_types"
  add_foreign_key "locations", "provinces"
  add_foreign_key "people", "genders"
  add_foreign_key "people", "users"
  add_foreign_key "person_event_achievements", "achievements"
  add_foreign_key "person_event_achievements", "person_events"
  add_foreign_key "person_events", "events"
  add_foreign_key "person_events", "people"
  add_foreign_key "question_responses", "survey_questions"
  add_foreign_key "session_surveys", "people"
  add_foreign_key "session_surveys", "surveys"
  add_foreign_key "survey_questions", "surveys"
  add_foreign_key "survey_session_answers", "question_responses"
  add_foreign_key "survey_session_answers", "session_surveys"
  add_foreign_key "surveys", "survey_types"
end
