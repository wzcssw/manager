# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170630034532) do

  create_table "api_keys", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT" do |t|
    t.string   "access_token", limit: 150,                null: false
    t.string   "login_type",   limit: 150,                null: false
    t.integer  "login_id",                                null: false
    t.datetime "expires_at",                              null: false
    t.boolean  "active",                   default: true, null: false
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
    t.index ["access_token"], name: "index_api_keys_on_access_token", unique: true, using: :btree
    t.index ["login_id"], name: "index_api_keys_on_login_id", using: :btree
    t.index ["login_type"], name: "index_api_keys_on_login_type", using: :btree
  end

  create_table "app_tokens", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT" do |t|
    t.string   "app_name",      limit: 100, null: false
    t.string   "app_key",       limit: 100, null: false
    t.string   "token",         limit: 100, null: false
    t.string   "refresh_token", limit: 100
    t.integer  "expires_in"
    t.datetime "revoked_at"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.index ["app_key"], name: "index_app_tokens_on_app_key", unique: true, using: :btree
    t.index ["app_name"], name: "index_app_tokens_on_app_name", unique: true, using: :btree
    t.index ["refresh_token"], name: "index_app_tokens_on_refresh_token", unique: true, using: :btree
    t.index ["token"], name: "index_app_tokens_on_token", unique: true, using: :btree
  end

  create_table "bodies", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT", comment: "检查部位" do |t|
    t.string   "name",       limit: 50,               comment: "名称"
    t.integer  "rank",                                comment: "排序"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.string   "code",       limit: 191,              comment: "英文代码"
    t.index ["code"], name: "index_bodies_on_code", using: :btree
  end

  create_table "body_group_bodies", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT", comment: "部位\\部位标签关系表" do |t|
    t.integer  "body_group_id"
    t.integer  "body_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["body_group_id"], name: "index_body_group_bodies_on_body_group_id", using: :btree
    t.index ["body_id"], name: "index_body_group_bodies_on_body_id", using: :btree
  end

  create_table "body_groups", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT", comment: "检查部位标签" do |t|
    t.string   "name",       limit: 50,              comment: "名称"
    t.integer  "rank",                               comment: "排序"
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
  end

  create_table "body_teches", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.integer  "body_id",                                  comment: "检查部位ID"
    t.string   "check_technique", limit: 500,              comment: "检查技术"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  create_table "brands", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.string   "name",         limit: 50,                comment: "品牌名称"
    t.string   "logo_url",     limit: 100,               comment: "品牌logo的url"
    t.string   "login_bg_url", limit: 100,               comment: "登录页面背景图片url"
    t.string   "main_color",   limit: 1020,              comment: "主题颜色"
    t.integer  "rank",                                   comment: "排序"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.string   "css_url",      limit: 191,               comment: "皮肤css地址"
  end

  create_table "cus_diagnostic_templates", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.integer  "diagnostic_template_id"
    t.integer  "user_id"
    t.text     "expression",             limit: 65535
    t.string   "diagnose",               limit: 191
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.index ["diagnostic_template_id"], name: "index_cus_diagnostic_templates_on_diagnostic_template_id", using: :btree
    t.index ["user_id"], name: "index_cus_diagnostic_templates_on_user_id", using: :btree
  end

  create_table "cus_report_templates", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.integer  "user_id",                                                  comment: "所属用户ID"
    t.integer  "raw_id",                                                   comment: "原始ID(report_template的id)"
    t.integer  "raw_parent_id",                                            comment: "原始父级ID(report_template的parent_id)"
    t.integer  "parent_id",                                                comment: "上级ID"
    t.string   "name",          limit: 100,                                comment: "名称(病例名称)"
    t.text     "expression",    limit: 65535,                              comment: "影像表现"
    t.string   "diagnose",      limit: 500,                                comment: "影像诊断"
    t.boolean  "is_symptom",                                               comment: "是否诊断结果"
    t.integer  "rank",                                                     comment: "排序"
    t.datetime "created_at",                                  null: false
    t.datetime "updated_at",                                  null: false
    t.integer  "body_id",                                                  comment: "所属部位ID"
    t.integer  "project_id",                                               comment: "所属检查项目ID"
    t.boolean  "is_positive",                 default: false,              comment: "是否阳性"
    t.index ["body_id"], name: "index_cus_report_templates_on_body_id", using: :btree
    t.index ["is_positive"], name: "index_cus_report_templates_on_is_positive", using: :btree
    t.index ["is_symptom"], name: "index_cus_report_templates_on_is_symptom", using: :btree
    t.index ["name"], name: "index_cus_report_templates_on_name", using: :btree
    t.index ["parent_id"], name: "index_cus_report_templates_on_parent_id", using: :btree
    t.index ["project_id"], name: "index_cus_report_templates_on_project_id", using: :btree
    t.index ["raw_id"], name: "index_cus_report_templates_on_raw_id", using: :btree
    t.index ["raw_parent_id"], name: "index_cus_report_templates_on_raw_parent_id", using: :btree
    t.index ["user_id"], name: "index_cus_report_templates_on_user_id", using: :btree
  end

  create_table "dc_clients", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.integer  "diagnose_center_id",                                        comment: "所属诊断中心ID"
    t.string   "code",               limit: 50,                null: false, comment: "唯一编码"
    t.string   "ip",                 limit: 18,                             comment: "IP地址"
    t.string   "port",               limit: 10,                             comment: "端口"
    t.string   "aetitle",            limit: 50,                             comment: "aetitle"
    t.integer  "rank",                                                      comment: "排序"
    t.datetime "created_at",                                   null: false
    t.datetime "updated_at",                                   null: false
    t.string   "protocol_name",      limit: 20,                             comment: "协议名称"
    t.boolean  "in_use",                        default: true,              comment: "是否在使用中"
    t.index ["diagnose_center_id"], name: "index_dc_clients_on_diagnose_center_id", using: :btree
    t.index ["in_use"], name: "index_dc_clients_on_in_use", using: :btree
    t.index ["protocol_name"], name: "index_dc_clients_on_protocol_name", using: :btree
  end

  create_table "dc_cus_report_templates", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.integer  "dc_user_id",                                               comment: "所属用户ID"
    t.integer  "raw_id",                                                   comment: "原始ID(report_template的id)"
    t.integer  "raw_parent_id",                                            comment: "原始父级ID(report_template的parent_id)"
    t.integer  "parent_id",                                                comment: "上级ID"
    t.string   "name",          limit: 100,                                comment: "名称(病例名称)"
    t.text     "expression",    limit: 65535,                              comment: "影像表现"
    t.string   "diagnose",      limit: 500,                                comment: "影像诊断"
    t.boolean  "is_symptom",                                               comment: "是否诊断结果"
    t.integer  "rank",                                                     comment: "排序"
    t.datetime "created_at",                                  null: false
    t.datetime "updated_at",                                  null: false
    t.integer  "project_id",                                               comment: "所属检查项目ID"
    t.boolean  "is_positive",                 default: false,              comment: "是否阳性"
    t.index ["dc_user_id"], name: "index_dc_cus_report_templates_on_dc_user_id", using: :btree
    t.index ["is_positive"], name: "index_dc_cus_report_templates_on_is_positive", using: :btree
    t.index ["is_symptom"], name: "index_dc_cus_report_templates_on_is_symptom", using: :btree
    t.index ["name"], name: "index_dc_cus_report_templates_on_name", using: :btree
    t.index ["parent_id"], name: "index_dc_cus_report_templates_on_parent_id", using: :btree
    t.index ["project_id"], name: "index_dc_cus_report_templates_on_project_id", using: :btree
    t.index ["raw_id"], name: "index_dc_cus_report_templates_on_raw_id", using: :btree
    t.index ["raw_parent_id"], name: "index_dc_cus_report_templates_on_raw_parent_id", using: :btree
  end

  create_table "dc_report_histories", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.integer  "dc_report_id",                                                comment: "所属报告ID"
    t.integer  "diagnose_center_id",                                          comment: "所属诊断中心ID"
    t.integer  "patient_info_id",                                             comment: "病人ID"
    t.string   "patient_name",       limit: 50,                               comment: "病人姓名"
    t.string   "project_name",       limit: 20,                               comment: "检查项目名称"
    t.integer  "project_id",                                                  comment: "检查项目ID"
    t.string   "project_bodies",     limit: 100,                              comment: "检查部位描述"
    t.datetime "examine_at",                                                  comment: "检查时间"
    t.string   "check_technique",    limit: 500,                              comment: "检查技术"
    t.string   "expression",         limit: 500,                              comment: "影像表现"
    t.string   "diagnose",           limit: 500,                              comment: "诊断结果"
    t.boolean  "is_positive",                    default: false,              comment: "是否阳性"
    t.integer  "dc_user_id",                                                  comment: "保存用户ID"
    t.string   "dc_user_name",       limit: 50,                               comment: "保存用户姓名"
    t.datetime "created_at",                                     null: false
    t.datetime "updated_at",                                     null: false
    t.integer  "patient_sex"
    t.integer  "patient_age"
    t.index ["dc_report_id"], name: "index_dc_report_histories_on_dc_report_id", using: :btree
    t.index ["dc_user_id"], name: "index_dc_report_histories_on_dc_user_id", using: :btree
    t.index ["diagnose_center_id"], name: "index_dc_report_histories_on_diagnose_center_id", using: :btree
    t.index ["patient_info_id"], name: "index_dc_report_histories_on_patient_info_id", using: :btree
  end

  create_table "dc_report_states", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.integer  "dc_report_id",                                         comment: "所属报告ID"
    t.integer  "state",        limit: 2,                               comment: "状态0[已提交],1待审核[审核中],2未通过审核,3已通过审核,4已发回"
    t.boolean  "is_last",                 default: false,              comment: "是否最新状态记录"
    t.string   "opt_name",     limit: 50,                              comment: "操作名称"
    t.string   "dc_role_name", limit: 50,                              comment: "操作角色名称"
    t.integer  "dc_user_id",                                           comment: "改变用户ID"
    t.string   "dc_user_name", limit: 20,                              comment: "改变用户姓名"
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
    t.integer  "examine_type",            default: 0
    t.index ["dc_report_id"], name: "index_dc_report_states_on_dc_report_id", using: :btree
    t.index ["dc_user_id"], name: "index_dc_report_states_on_dc_user_id", using: :btree
    t.index ["is_last"], name: "index_dc_report_states_on_is_last", using: :btree
    t.index ["state"], name: "index_dc_report_states_on_state", using: :btree
  end

  create_table "dc_reports", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.integer  "diagnose_center_id",                                          comment: "所属诊断中心ID"
    t.integer  "patient_info_id",                                             comment: "病人ID"
    t.string   "patient_name",       limit: 50,                               comment: "病人姓名"
    t.string   "project_name",       limit: 20,                               comment: "检查项目名称"
    t.integer  "project_id",                                                  comment: "检查项目ID"
    t.string   "project_bodies",     limit: 100,                              comment: "检查部位描述"
    t.datetime "examine_at",                                                  comment: "检查时间"
    t.string   "check_technique",    limit: 500,                              comment: "检查技术"
    t.string   "expression",         limit: 500,                              comment: "影像表现"
    t.string   "diagnose",           limit: 500,                              comment: "诊断结果"
    t.boolean  "is_positive",                    default: false,              comment: "是否阳性"
    t.datetime "commit_at",                                                   comment: "报告提交时间"
    t.integer  "dc_user_id",                                                  comment: "保存用户ID"
    t.string   "dc_user_name",       limit: 50,                               comment: "保存用户姓名"
    t.datetime "created_at",                                     null: false
    t.datetime "updated_at",                                     null: false
    t.integer  "patient_sex"
    t.integer  "patient_age"
    t.index ["dc_user_id"], name: "index_dc_reports_on_dc_user_id", using: :btree
    t.index ["diagnose_center_id"], name: "index_dc_reports_on_diagnose_center_id", using: :btree
    t.index ["patient_info_id"], name: "index_dc_reports_on_patient_info_id", using: :btree
  end

  create_table "dc_roles", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.string   "name",        limit: 50, null: false, comment: "角色名"
    t.string   "description", limit: 50,              comment: "描述"
    t.string   "code",        limit: 20,              comment: "唯一编码"
    t.integer  "rank",                                comment: "排序"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.index ["code"], name: "index_dc_roles_on_code", using: :btree
  end

  create_table "dc_user_roles", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.integer  "dc_user_id",              comment: "用户ID"
    t.integer  "dc_role_id",              comment: "角色ID"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["dc_role_id"], name: "index_dc_user_roles_on_dc_role_id", using: :btree
    t.index ["dc_user_id"], name: "index_dc_user_roles_on_dc_user_id", using: :btree
  end

  create_table "dc_users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.integer  "diagnose_center_id",                          comment: "所属诊断中心ID"
    t.string   "username",           limit: 50,  null: false, comment: "用户名"
    t.string   "realname",           limit: 20,               comment: "真实姓名"
    t.string   "phone",              limit: 20,               comment: "手机号"
    t.string   "email",              limit: 50,               comment: "email"
    t.integer  "rank",                                        comment: "排序"
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.string   "encrypted_password", limit: 128
    t.string   "confirmation_token", limit: 128
    t.string   "remember_token",     limit: 128
    t.index ["diagnose_center_id"], name: "index_dc_users_on_diagnose_center_id", using: :btree
    t.index ["remember_token"], name: "index_dc_users_on_remember_token", using: :btree
    t.index ["username"], name: "index_dc_users_on_username", unique: true, using: :btree
  end

  create_table "diagnose_center_hospitals", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.integer  "diagnose_center_id",              comment: "诊断中心ID"
    t.integer  "hospital_id",                     comment: "医院ID"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.index ["diagnose_center_id"], name: "index_diagnose_center_hospitals_on_diagnose_center_id", using: :btree
    t.index ["hospital_id"], name: "index_diagnose_center_hospitals_on_hospital_id", using: :btree
  end

  create_table "diagnose_centers", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.string   "name",         limit: 50,                 null: false, comment: "诊断中心名称"
    t.string   "description",  limit: 500,                             comment: "诊断中心描述"
    t.boolean  "is_open",                  default: true,              comment: "是否营业"
    t.integer  "rank",                                                 comment: "排序"
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
    t.integer  "examine_type",             default: 0
  end

  create_table "diagnostic_templates", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string  "project_body"
    t.integer "report_type"
    t.string  "symptom"
    t.text    "expression",   limit: 65535
    t.string  "diagnose"
  end

  create_table "doctor_hospitals", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.integer  "user_id",                  comment: "用户ID"
    t.integer  "hospital_id",              comment: "管理医院ID"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["hospital_id"], name: "index_doctor_hospitals_on_hospital_id", using: :btree
    t.index ["user_id"], name: "index_doctor_hospitals_on_user_id", using: :btree
  end

  create_table "hospital_net", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin" do |t|
    t.string  "ae_title", limit: 50,  comment: "ae_title"
    t.string  "code",     limit: 100, comment: "编码"
    t.string  "host",                 comment: "主机地址"
    t.integer "port",                 comment: "端口号"
    t.integer "status",               comment: "连接状态"
    t.string  "name",     limit: 50,  comment: "连接名称"
    t.index ["code"], name: "hospital_net_code", unique: true, using: :btree
  end

  create_table "hospital_orders", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT" do |t|
    t.integer  "patient_type",                                                       comment: "患者类型，0为住院患者，1为门诊患者"
    t.string   "medica_record_num", limit: 100,                                      comment: "病历号"
    t.string   "in_patient_num",    limit: 100,                                      comment: "住院号"
    t.string   "patient_name",      limit: 100,                                      comment: "病人姓名"
    t.integer  "patient_sex",                                                        comment: "病人性别（female male unknow）"
    t.integer  "patient_age",                                                        comment: "病人年龄"
    t.string   "patient_phone",     limit: 50,                                       comment: "病人联系方式"
    t.string   "id_num",            limit: 50,                                       comment: "病人身份证号码"
    t.string   "patient_note",      limit: 500,                                      comment: "病人备注"
    t.string   "check_num",         limit: 100,                                      comment: "病人备注"
    t.datetime "check_time",                                                         comment: "检查时间"
    t.string   "diagnosis_name",    limit: 100,                                      comment: "诊断名称"
    t.string   "diagnosis_code",    limit: 100,                                      comment: "诊断编码"
    t.string   "check_item",                                                         comment: "检查项目"
    t.string   "check_site",                                                         comment: "检查部位"
    t.decimal  "check_fee",                     precision: 9, scale: 2,              comment: "检查费用"
    t.decimal  "material_fee",                  precision: 9, scale: 2,              comment: "核磁材料费用"
    t.datetime "pay_time",                                                           comment: "缴费时间"
    t.string   "recept_num",        limit: 100,                                      comment: "收据单号"
    t.boolean  "is_return",                                                          comment: "是否退费"
    t.string   "doctor_name",       limit: 50,                                       comment: "开单医生名称"
    t.string   "doctor_department", limit: 100,                                      comment: "开单医生科室"
    t.string   "doctor_phone",      limit: 50,                                       comment: "开单医生电话"
    t.integer  "hospital_id",                                                        comment: "所属医院ID"
    t.datetime "created_at",                                            null: false
    t.datetime "updated_at",                                            null: false
    t.boolean  "is_sync",                                                            comment: "是否已经同步"
    t.string   "hospital_code",     limit: 50,                                       comment: "医院唯一编码"
    t.integer  "bryb"
    t.integer  "in_patient_state",                                                   comment: "住院状态(0住院中,1已出院)"
    t.index ["doctor_name"], name: "index_hospital_orders_on_doctor_name", using: :btree
    t.index ["doctor_phone"], name: "index_hospital_orders_on_doctor_phone", using: :btree
    t.index ["hospital_code"], name: "index_hospital_orders_on_hospital_code", using: :btree
    t.index ["hospital_id"], name: "index_hospital_orders_on_hospital_id", using: :btree
    t.index ["id_num"], name: "index_hospital_orders_on_id_num", using: :btree
    t.index ["in_patient_num"], name: "index_hospital_orders_on_in_patient_num", using: :btree
    t.index ["in_patient_state"], name: "index_hospital_orders_on_in_patient_state", using: :btree
    t.index ["medica_record_num"], name: "index_hospital_orders_on_medica_record_num", using: :btree
    t.index ["patient_name"], name: "index_hospital_orders_on_patient_name", using: :btree
    t.index ["patient_phone"], name: "index_hospital_orders_on_patient_phone", using: :btree
    t.index ["patient_type"], name: "index_hospital_orders_on_patient_type", using: :btree
    t.index ["recept_num"], name: "index_hospital_orders_on_recept_num", using: :btree
  end

  create_table "hospital_project_bodies", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT", comment: "医院\\检查项目\\部位关系表" do |t|
    t.integer  "hospital_id"
    t.integer  "project_id"
    t.integer  "body_id"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.integer  "body_group_id",                          comment: "部位分组ID"
    t.integer  "reward_price",  default: 0,              comment: "奖励钱数(因为要反映成快币数所以是整数)"
    t.index ["body_group_id"], name: "index_hospital_project_bodies_on_body_group_id", using: :btree
    t.index ["body_id"], name: "index_hospital_project_bodies_on_body_id", using: :btree
    t.index ["hospital_id"], name: "index_hospital_project_bodies_on_hospital_id", using: :btree
    t.index ["project_id"], name: "index_hospital_project_bodies_on_project_id", using: :btree
  end

  create_table "hospitals", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT", comment: "医院表" do |t|
    t.string   "name",          limit: 50,                               comment: "医院名称"
    t.integer  "city_id",                                                comment: "所在城市ID"
    t.string   "city_name",     limit: 50,                               comment: "所在城市Name"
    t.integer  "user_id",                                                comment: "创建用户ID"
    t.boolean  "in_open",                   default: true,               comment: "是否营业"
    t.datetime "created_at",                                null: false
    t.datetime "updated_at",                                null: false
    t.string   "open_time",     limit: 191
    t.string   "close_time",    limit: 191
    t.string   "hospital_code", limit: 20,                  null: false
    t.integer  "brand_id",                                               comment: "所属品牌ID"
    t.boolean  "is_unimed",                 default: false,              comment: "是否联营点医院（0不是，1是）"
    t.index ["brand_id"], name: "index_hospitals_on_brand_id", using: :btree
    t.index ["city_id"], name: "index_hospitals_on_city_id", using: :btree
    t.index ["is_unimed"], name: "index_hospitals_on_is_unimed", using: :btree
    t.index ["user_id"], name: "index_hospitals_on_user_id", using: :btree
  end

  create_table "inpatient_check_projects", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.integer  "hospital_order_id",                                                  comment: "医院检查记录ID"
    t.string   "project_name",       limit: 50,                                      comment: "项目名称"
    t.bigint   "project_num",                                                        comment: "项目数量"
    t.decimal  "project_price",                 precision: 9, scale: 2,              comment: "项目单价"
    t.integer  "project_insurance",  limit: 2,                                       comment: "项目医保（1医保全额报销,2有自付,3全自付）"
    t.datetime "project_created_at",                                                 comment: "项目创建时间"
    t.datetime "created_at",                                            null: false
    t.datetime "updated_at",                                            null: false
    t.index ["hospital_order_id"], name: "index_inpatient_check_projects_on_hospital_order_id", using: :btree
    t.index ["project_insurance"], name: "index_inpatient_check_projects_on_project_insurance", using: :btree
    t.index ["project_name"], name: "index_inpatient_check_projects_on_project_name", using: :btree
  end

  create_table "managers", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "username"
    t.string   "realname"
    t.string   "phone"
    t.integer  "role"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.boolean  "disable"
    t.string   "password_digest"
    t.index ["phone"], name: "index_managers_on_phone", unique: true, using: :btree
    t.index ["username"], name: "index_managers_on_username", unique: true, using: :btree
  end

  create_table "meetings", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.string   "name",                     limit: 20,                null: false, comment: "会议名称"
    t.string   "code",                     limit: 20,                             comment: "会议编码"
    t.string   "comment",                  limit: 200,                            comment: "会议议题"
    t.integer  "patient_info_id",                                                 comment: "病人编号"
    t.integer  "report_id",                                                       comment: "病人报告编号"
    t.integer  "req_user_id",                                                     comment: "会议发起用户ID(医生)"
    t.integer  "presenter_user_id",                                               comment: "会议主持用户ID(主持人)"
    t.integer  "res_user_id",                                                     comment: "会议响应用户ID(专家)"
    t.datetime "req_start_at",                                                    comment: "请求会议开始时间(医生请求的开始时间)"
    t.datetime "req_end_at",                                                      comment: "请求会议结束时间(医生请求的结束时间)"
    t.datetime "res_start_at",                                                    comment: "响应会议开始时间(专家最终响应的开始时间)"
    t.datetime "res_end_at",                                                      comment: "响应会议结束时间(专家最终响应的结束时间)"
    t.datetime "start_at",                                                        comment: "真实会议开始时间"
    t.datetime "end_at",                                                          comment: "真实会议结束时间"
    t.integer  "state",                    limit: 2,     default: 0, null: false, comment: "会议状态(0默认,1审核中,2审核不通过,3审核通过(联系中),4专家已确认(待召开),5会议召开中,6会议结束)"
    t.string   "req_minutes",              limit: 500,                            comment: "请求医生会议记录"
    t.string   "presenter_minutes",        limit: 500,                            comment: "主持人会议记录"
    t.string   "res_minutes",              limit: 500,                            comment: "专家会议记录"
    t.datetime "created_at",                                         null: false
    t.datetime "updated_at",                                         null: false
    t.string   "teamview_id",              limit: 30,                             comment: "TeamView的MeetingID"
    t.string   "url",                      limit: 100,                            comment: "TeamView会议地址"
    t.integer  "hospital_id",                                                     comment: "请求发出者所在医院ID"
    t.text     "illness_desc",             limit: 65535,                          comment: "病情描述"
    t.text     "diagnose_difficult_point", limit: 65535,                          comment: "疑难点"
    t.index ["code"], name: "index_meetings_on_code", using: :btree
    t.index ["end_at"], name: "index_meetings_on_end_at", using: :btree
    t.index ["hospital_id"], name: "index_meetings_on_hospital_id", using: :btree
    t.index ["name"], name: "index_meetings_on_name", using: :btree
    t.index ["patient_info_id"], name: "index_meetings_on_patient_info_id", using: :btree
    t.index ["presenter_user_id"], name: "index_meetings_on_presenter_user_id", using: :btree
    t.index ["report_id"], name: "index_meetings_on_report_id", using: :btree
    t.index ["req_end_at"], name: "index_meetings_on_req_end_at", using: :btree
    t.index ["req_start_at"], name: "index_meetings_on_req_start_at", using: :btree
    t.index ["req_user_id"], name: "index_meetings_on_req_user_id", using: :btree
    t.index ["res_end_at"], name: "index_meetings_on_res_end_at", using: :btree
    t.index ["res_start_at"], name: "index_meetings_on_res_start_at", using: :btree
    t.index ["res_user_id"], name: "index_meetings_on_res_user_id", using: :btree
    t.index ["start_at"], name: "index_meetings_on_start_at", using: :btree
    t.index ["state"], name: "index_meetings_on_state", using: :btree
  end

  create_table "open_hospital_requests", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.string   "hospital_name",        limit: 50,              comment: "医院名称"
    t.integer  "city_id",                                      comment: "所在城市ID"
    t.string   "city_name",            limit: 25,              comment: "所在城市名称"
    t.integer  "diagnose_center_id",                           comment: "所属诊断中心ID"
    t.string   "diagnose_center_name", limit: 50,              comment: "所属诊断中心名称"
    t.integer  "brand_id",                                     comment: "设备所属厂商ID"
    t.string   "brand_name",           limit: 50,              comment: "设备所属厂商Name"
    t.integer  "equipment_type",                               comment: "设备类型ID"
    t.string   "equipment_type_name",  limit: 50,              comment: "设备类型Name"
    t.string   "equipment_model",      limit: 50,              comment: "设备型号"
    t.string   "equipment_no",         limit: 50,              comment: "设备唯一编码"
    t.string   "admin_name",           limit: 25,              comment: "管理员姓名"
    t.string   "admin_phone",          limit: 25,              comment: "管理员电话"
    t.string   "admin_email",          limit: 50,              comment: "管理员邮箱"
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.index ["admin_phone"], name: "index_open_hospital_requests_on_admin_phone", using: :btree
    t.index ["brand_id"], name: "index_open_hospital_requests_on_brand_id", using: :btree
    t.index ["city_id"], name: "index_open_hospital_requests_on_city_id", using: :btree
    t.index ["diagnose_center_id"], name: "index_open_hospital_requests_on_diagnose_center_id", using: :btree
    t.index ["equipment_type"], name: "index_open_hospital_requests_on_equipment_type", using: :btree
  end

  create_table "orders", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT" do |t|
    t.string   "patient_name",     limit: 50,                                                   comment: "病人姓名"
    t.string   "patient_phone",    limit: 25,                                                   comment: "病人电话"
    t.integer  "patient_age",                                                                   comment: "病人年龄"
    t.integer  "project_id",                                                                    comment: "检查项目ID"
    t.string   "project_name",     limit: 50,                                                   comment: "检查项目名称"
    t.string   "body_description", limit: 500,                                                  comment: "检查部位描述"
    t.string   "diagnose_info",    limit: 500,                                                  comment: "诊断信息"
    t.decimal  "total_fee",                    precision: 9, scale: 2,                          comment: "医疗费用"
    t.datetime "appointment_at",                                                                comment: "预约时间"
    t.string   "order_code",       limit: 50,                                                   comment: "快诊订单编号"
    t.datetime "examine_at",                                                                    comment: "检查时间"
    t.integer  "hospital_id",                                                                   comment: "所属医院ID"
    t.string   "cancel_reason",    limit: 100,                                                  comment: "取消原因"
    t.datetime "created_at",                                                       null: false
    t.datetime "updated_at",                                                       null: false
    t.integer  "state",                                                default: 0
    t.index ["appointment_at"], name: "index_orders_on_appointment_at", using: :btree
    t.index ["examine_at"], name: "index_orders_on_examine_at", using: :btree
    t.index ["hospital_id"], name: "index_orders_on_hospital_id", using: :btree
    t.index ["order_code"], name: "index_orders_on_order_code", using: :btree
    t.index ["patient_name"], name: "index_orders_on_patient_name", using: :btree
    t.index ["patient_phone"], name: "index_orders_on_patient_phone", using: :btree
    t.index ["project_id"], name: "index_orders_on_project_id", using: :btree
    t.index ["project_name"], name: "index_orders_on_project_name", using: :btree
  end

  create_table "patient_info_bodies", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT", comment: "检查信息部位表" do |t|
    t.integer  "patient_info_id",                          comment: "检查信息ID"
    t.integer  "body_mode_id",                             comment: "检查部位ID"
    t.string   "body_mode_name",  limit: 191,              comment: "所属部位名称"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.index ["body_mode_id"], name: "index_patient_info_bodies_on_body_mode_id", using: :btree
    t.index ["patient_info_id"], name: "index_patient_info_bodies_on_patient_info_id", using: :btree
  end

  create_table "patient_info_dicoms", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.string   "hospital_no",     limit: 50,               comment: "检查单号"
    t.string   "film_no",         limit: 50,               comment: "影像号"
    t.string   "patient_name",    limit: 50,               comment: "病人姓名"
    t.string   "patient_phone",   limit: 25,               comment: "病人电话"
    t.integer  "patient_sex",                              comment: "病人性别（female male unknow）"
    t.integer  "patient_age",                              comment: "病人年龄"
    t.string   "project_name",    limit: 50,               comment: "检查项目名称"
    t.string   "project_bodies",  limit: 200,              comment: "检查部位描述"
    t.datetime "study_date",                               comment: "检查时间"
    t.integer  "hospital_id",                              comment: "所属医院ID"
    t.integer  "patient_info_id",                          comment: "患者检查ID"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.string   "study_comment",   limit: 100,              comment: "检查备注"
    t.index ["film_no"], name: "index_patient_info_dicoms_on_film_no", using: :btree
    t.index ["hospital_id"], name: "index_patient_info_dicoms_on_hospital_id", using: :btree
    t.index ["hospital_no"], name: "index_patient_info_dicoms_on_hospital_no", using: :btree
    t.index ["patient_info_id"], name: "index_patient_info_dicoms_on_patient_info_id", using: :btree
  end

  create_table "patient_info_images", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.integer  "patient_info_id",                          comment: "所属病人ID"
    t.string   "img_url",         limit: 100,              comment: "相对路径"
    t.integer  "rank",                                     comment: "排序"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.string   "pi_image",        limit: 191
    t.index ["patient_info_id"], name: "index_patient_info_images_on_patient_info_id", using: :btree
  end

  create_table "patient_infos", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT", comment: "检查信息表" do |t|
    t.string   "hospital_no",            limit: 50,                                                       comment: "检查单号"
    t.string   "patient_name",           limit: 50,                                                       comment: "病人姓名"
    t.string   "patient_phone",          limit: 25,                                                       comment: "病人电话"
    t.integer  "patient_sex",                                                                             comment: "病人性别（female male unknow）"
    t.integer  "patient_age",                                                                             comment: "病人年龄"
    t.integer  "project_id",                                                                              comment: "检查项目ID"
    t.string   "project_name",           limit: 50,                                                       comment: "检查项目名称"
    t.string   "diagnose_info",          limit: 500,                                                      comment: "诊断信息"
    t.integer  "state",                                                                                   comment: "状态（unpay wait_examine examining finish late cancel）"
    t.decimal  "total_fee",                          precision: 9, scale: 2,                              comment: "医疗费用"
    t.decimal  "reduce_pay",                         precision: 9, scale: 2,                              comment: "优惠额度"
    t.decimal  "insurance_pay",                      precision: 9, scale: 2,                              comment: "医保金额"
    t.decimal  "real_pay",                           precision: 9, scale: 2,                              comment: "实际缴费"
    t.datetime "appointment_at",                                                                          comment: "预约时间"
    t.boolean  "is_kz_order",                                                                             comment: "是否匹配快诊订单"
    t.string   "order_code",             limit: 50,                                                       comment: "快诊订单编号"
    t.datetime "examine_at",                                                                              comment: "检查时间"
    t.integer  "hospital_id",                                                                             comment: "所属医院ID"
    t.string   "cancel_reason",          limit: 100,                                                      comment: "取消原因"
    t.datetime "created_at",                                                                 null: false
    t.datetime "updated_at",                                                                 null: false
    t.string   "body_description",       limit: 500
    t.datetime "register_at",                                                                             comment: "登记成功时间"
    t.datetime "call_success_at",                                                                         comment: "呼叫成功时间"
    t.datetime "finished_at",                                                                             comment: "完成时间"
    t.datetime "cancel_at",                                                                               comment: "取消时间"
    t.string   "in_patient_num",         limit: 191,                                                      comment: "住院号"
    t.integer  "in_patient_state",                                                                        comment: "住院状态"
    t.integer  "patient_type",                                               default: 0,                  comment: "患者类型(0门诊患者，1住院患者)"
    t.boolean  "film",                                                                                    comment: "纸质胶片"
    t.boolean  "electronic_film",                                                                         comment: "电子胶片"
    t.string   "film_no",                limit: 12,                                                       comment: "影像号码"
    t.boolean  "is_medical_insurance",                                                                    comment: "是否医保患者"
    t.integer  "medical_insurance_type",                                                                  comment: "医保类型(1是公费\\2是自费\\3是大病统筹\\4是代管\\5是医保\\6是新农合)"
    t.integer  "diagnose_state",                                                                          comment: "诊断装填 0待诊断，1诊断中，2报告处理中（远程已接单），3历史诊断"
    t.boolean  "is_remote_diagnose",                                         default: false,              comment: "是否远程诊断，当diagnose_state为2时改为true"
    t.string   "out_patient_no",         limit: 50,                                                       comment: "门诊号"
    t.string   "bed_no",                 limit: 50,                                                       comment: "床号"
    t.string   "en_bodies",              limit: 100,                                                      comment: "英文部位描述(从DICOM文件中读出)"
    t.datetime "rd_request_at",                                                                           comment: "远程诊断请求时间"
    t.datetime "rd_receviced_at",                                                                         comment: "远程诊断请接收时间"
    t.datetime "rd_finished_at",                                                                          comment: "远程诊断请完成时间"
    t.string   "study_comment",          limit: 100,                                                      comment: "检查备注"
    t.index ["appointment_at"], name: "index_patient_infos_on_appointment_at", using: :btree
    t.index ["diagnose_state"], name: "index_patient_infos_on_diagnose_state", using: :btree
    t.index ["film_no"], name: "index_patient_infos_on_film_no", using: :btree
    t.index ["hospital_id"], name: "index_patient_infos_on_hospital_id", using: :btree
    t.index ["hospital_no"], name: "index_patient_infos_on_hospital_no", using: :btree
    t.index ["is_medical_insurance"], name: "index_patient_infos_on_is_medical_insurance", using: :btree
    t.index ["order_code"], name: "index_patient_infos_on_order_code", using: :btree
    t.index ["patient_name"], name: "index_patient_infos_on_patient_name", using: :btree
    t.index ["patient_phone"], name: "index_patient_infos_on_patient_phone", using: :btree
    t.index ["project_id"], name: "index_patient_infos_on_project_id", using: :btree
  end

  create_table "patient_medical_items", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.integer  "patient_medical_id",                                                 comment: "额外开销批次号"
    t.string   "name",               limit: 50,                         null: false, comment: "项目名称"
    t.integer  "number",                                                             comment: "项目数量"
    t.decimal  "unit_price",                    precision: 9, scale: 2,              comment: "单价"
    t.decimal  "total_price",                   precision: 9, scale: 2,              comment: "总价"
    t.datetime "created_at",                                            null: false
    t.datetime "updated_at",                                            null: false
    t.index ["name"], name: "index_patient_medical_items_on_name", using: :btree
    t.index ["patient_medical_id"], name: "index_patient_medical_items_on_patient_medical_id", using: :btree
  end

  create_table "patient_medicals", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.integer  "patient_info_id",                         comment: "检查号"
    t.string   "medical_no",      limit: 20, null: false, comment: "处方号"
    t.datetime "make_at",                                 comment: "下单时间"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.index ["medical_no"], name: "index_patient_medicals_on_medical_no", using: :btree
    t.index ["patient_info_id"], name: "index_patient_medicals_on_patient_info_id", using: :btree
  end

  create_table "projects", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT", comment: "检查项目" do |t|
    t.string   "name",       limit: 50,               comment: "名称"
    t.integer  "rank",                                comment: "排序"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.string   "code",       limit: 191,              comment: "英文代码"
    t.index ["code"], name: "index_projects_on_code", using: :btree
  end

  create_table "report_histories", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.integer  "report_id",                                comment: "报告ID"
    t.integer  "patient_info_id",                          comment: "所属检查记录ID"
    t.string   "patient_name",    limit: 50,               comment: "病人姓名"
    t.string   "project_name",    limit: 50,               comment: "检查项目名称"
    t.integer  "project_id",                               comment: "检查项目ID"
    t.string   "project_bodies",  limit: 500,              comment: "检查项目名称"
    t.integer  "patient_age",                              comment: "病人年龄"
    t.integer  "patient_sex",                              comment: "病人性别（female male unknow）"
    t.datetime "examine_at",                               comment: "检查时间"
    t.integer  "hospital_id",                              comment: "所属医院ID"
    t.string   "expression",      limit: 500,              comment: "影像表现"
    t.string   "diagnose",        limit: 500,              comment: "影像诊断"
    t.string   "check_technique", limit: 500,              comment: "检查技术"
    t.datetime "report_at",                                comment: "检查时间"
    t.boolean  "is_print",                                 comment: "是否打印"
    t.integer  "save_user_id",                             comment: "保存医生ID"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.string   "save_user_name",  limit: 50,               comment: "保存用户Name"
    t.index ["examine_at"], name: "index_report_histories_on_examine_at", using: :btree
    t.index ["hospital_id"], name: "index_report_histories_on_hospital_id", using: :btree
    t.index ["is_print"], name: "index_report_histories_on_is_print", using: :btree
    t.index ["patient_info_id"], name: "index_report_histories_on_patient_info_id", using: :btree
    t.index ["patient_name"], name: "index_report_histories_on_patient_name", using: :btree
    t.index ["project_id"], name: "index_report_histories_on_project_id", using: :btree
    t.index ["project_name"], name: "index_report_histories_on_project_name", using: :btree
    t.index ["report_at"], name: "index_report_histories_on_report_at", using: :btree
    t.index ["save_user_id"], name: "index_report_histories_on_save_user_id", using: :btree
  end

  create_table "report_states", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.integer  "report_id",                           comment: "报告ID"
    t.integer  "user_id",                             comment: "操作用户ID"
    t.string   "user_name",  limit: 50,               comment: "操作用户Name"
    t.string   "role_name",  limit: 50,               comment: "操作角色名称"
    t.string   "opt_name",   limit: 50,               comment: "操作名称"
    t.string   "mark",       limit: 100,              comment: "备注"
    t.integer  "state",                               comment: "报告状态(0[默认],1待审核[审核中],2未通过审核,3已通过审核)"
    t.boolean  "is_use",                              comment: "是否生效"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "report_templates", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.integer  "parent_id",                                              comment: "上级ID"
    t.string   "name",        limit: 100,                                comment: "名称(病例名称)"
    t.text     "expression",  limit: 65535,                              comment: "影像表现"
    t.string   "diagnose",    limit: 500,                                comment: "影像诊断"
    t.boolean  "is_symptom",                                             comment: "是否诊断结果"
    t.integer  "rank",                                                   comment: "排序"
    t.datetime "created_at",                                null: false
    t.datetime "updated_at",                                null: false
    t.integer  "body_id",                                                comment: "所属部位ID"
    t.integer  "project_id",                                             comment: "所属检查项目ID"
    t.boolean  "is_positive",               default: false,              comment: "是否阳性"
    t.index ["body_id"], name: "index_report_templates_on_body_id", using: :btree
    t.index ["is_positive"], name: "index_report_templates_on_is_positive", using: :btree
    t.index ["is_symptom"], name: "index_report_templates_on_is_symptom", using: :btree
    t.index ["name"], name: "index_report_templates_on_name", using: :btree
    t.index ["parent_id"], name: "index_report_templates_on_parent_id", using: :btree
    t.index ["project_id"], name: "index_report_templates_on_project_id", using: :btree
  end

  create_table "reports", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT" do |t|
    t.integer  "patient_info_id",                                          comment: "所属检查记录ID"
    t.string   "patient_name",    limit: 50,                               comment: "病人姓名"
    t.string   "project_name",    limit: 50,                               comment: "检查项目名称"
    t.integer  "project_id",                                               comment: "检查项目ID"
    t.string   "project_bodies",  limit: 500,                              comment: "检查项目名称"
    t.integer  "patient_age",                                              comment: "病人年龄"
    t.integer  "patient_sex",                                              comment: "病人性别（female male unknow）"
    t.datetime "examine_at",                                               comment: "检查时间"
    t.integer  "hospital_id",                                              comment: "所属医院ID"
    t.string   "expression",      limit: 500,                              comment: "影像表现"
    t.string   "diagnose",        limit: 500,                              comment: "影像诊断"
    t.datetime "report_at",                                                comment: "检查时间"
    t.integer  "user_id",                                                  comment: "报告医生"
    t.datetime "created_at",                                  null: false
    t.datetime "updated_at",                                  null: false
    t.string   "check_technique", limit: 500,                              comment: "检查技术"
    t.integer  "is_print",                    default: 0
    t.integer  "is_first_save",               default: 0
    t.integer  "save_user_id",                                             comment: "最后保存用户ID"
    t.string   "save_user_name",  limit: 50,                               comment: "最后保存用户Name"
    t.boolean  "is_positive",                                              comment: "是否阳性（得病）"
    t.boolean  "can_print",                   default: false,              comment: "能否打印报告"
    t.index ["can_print"], name: "index_reports_on_can_print", using: :btree
    t.index ["examine_at"], name: "index_reports_on_examine_at", using: :btree
    t.index ["hospital_id"], name: "index_reports_on_hospital_id", using: :btree
    t.index ["is_positive"], name: "index_reports_on_is_positive", using: :btree
    t.index ["patient_info_id"], name: "index_reports_on_patient_info_id", using: :btree
    t.index ["patient_name"], name: "index_reports_on_patient_name", using: :btree
    t.index ["project_id"], name: "index_reports_on_project_id", using: :btree
    t.index ["project_name"], name: "index_reports_on_project_name", using: :btree
    t.index ["report_at"], name: "index_reports_on_report_at", using: :btree
    t.index ["save_user_id"], name: "index_reports_on_save_user_id", using: :btree
    t.index ["user_id"], name: "index_reports_on_user_id", using: :btree
  end

  create_table "roles", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT", comment: "角色表" do |t|
    t.string   "name",        limit: 191,              comment: "角色名称"
    t.string   "description", limit: 191,              comment: "角色描述"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.string   "code",        limit: 25,               comment: "角色代码"
    t.index ["code"], name: "index_roles_on_code", using: :btree
  end

  create_table "soft_upgrade", primary_key: "version", id: :string, limit: 11, collation: "utf8_unicode_ci", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.string "download", limit: 500
    t.index ["version"], name: "version_index", unique: true, using: :btree
  end

  create_table "t_data_patient_dicoms", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.string  "base_url"
    t.string  "file_id"
    t.integer "flag"
    t.integer "patient_info_id"
    t.index ["patient_info_id"], name: "FK_e6u1t7neqv8pu4ofsvw6q6ecg", using: :btree
  end

  create_table "t_data_patient_info", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.string  "code"
    t.integer "flag"
    t.string  "hospital_code"
    t.string  "patient_bithday"
    t.string  "patient_id"
    t.string  "patient_name"
    t.string  "patient_sex"
    t.string  "study_date"
  end

  create_table "txmri", id: :string, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin" do |t|
    t.string  "bz"
    t.integer "hzblh"
    t.string  "hzlxfs"
    t.integer "hznl"
    t.string  "hzsfz"
    t.string  "hzsx"
    t.integer "hzxb"
    t.string  "hzxm"
    t.string  "hzzyh"
    t.string  "jcbw"
    t.float   "jcdj",          limit: 53
    t.float   "jcje",          limit: 53
    t.string  "jcmc"
    t.string  "jcrq"
    t.string  "jcsjh"
    t.integer "jcsl"
    t.string  "jctfbz"
    t.string  "kfcfh"
    t.string  "kfsj"
    t.string  "ksxm"
    t.string  "yslxfs"
    t.string  "ysxm"
    t.integer "zdbm"
    t.string  "zdmc"
    t.integer "breb",                     comment: "患者医保情况"
    t.string  "hospital_code", limit: 50
  end

  create_table "txmri_zy", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin" do |t|
    t.string   "ysxm",                      comment: "医生姓名"
    t.string   "ysks",                      comment: "医生科室"
    t.string   "yslsfs",                    comment: "医生联系方式"
    t.datetime "hzrysj",                    comment: "患者入院时间"
    t.integer  "hzdqzt",                    comment: "患者做检查时在院状态 0为住院 1为出院"
    t.integer  "hzyb",                      comment: "患者医保"
    t.string   "hzxm",          limit: 50,  comment: "患者姓名"
    t.integer  "hzxb",                      comment: "患者性别"
    t.integer  "hznl",                      comment: "患者年龄"
    t.string   "hzsfz",                     comment: "患者身份证"
    t.string   "xmmc",                      comment: "项目名称"
    t.integer  "xmsl",                      comment: "项目数量"
    t.float    "xmdj",          limit: 24,  comment: "项目单价"
    t.integer  "xmyb",                      comment: "项目医保"
    t.string   "brblh",                     comment: "病人病历号"
    t.datetime "xmsj"
    t.string   "code",          limit: 50
    t.integer  "flag"
    t.string   "lxfs",          limit: 100
    t.string   "hospital_code", limit: 50
    t.index ["code"], name: "code_UNIQUE", unique: true, using: :btree
  end

  create_table "user_roles", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT" do |t|
    t.integer  "user_id"
    t.integer  "role_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["role_id"], name: "index_user_roles_on_role_id", using: :btree
    t.index ["user_id", "role_id"], name: "index_user_roles_on_user_id_and_role_id", using: :btree
    t.index ["user_id"], name: "index_user_roles_on_user_id", using: :btree
  end

  create_table "users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT", comment: "用户表" do |t|
    t.string   "name",            limit: 20,                  null: false, comment: "用户名"
    t.string   "realname",        limit: 20,                               comment: "真名"
    t.string   "phone",           limit: 25,                  null: false, comment: "电话号码"
    t.string   "email",           limit: 60,                               comment: "email"
    t.string   "password_digest", limit: 128,                 null: false
    t.integer  "hospital_id",                                              comment: "所属医院ID"
    t.boolean  "is_delete",                   default: false, null: false, comment: "是否删除"
    t.integer  "role_id",                                                  comment: "角色ID"
    t.datetime "created_at",                                  null: false
    t.datetime "updated_at",                                  null: false
    t.integer  "add_from"
    t.string   "report_doctor",   limit: 191
    t.index ["email"], name: "index_users_on_email", using: :btree
    t.index ["hospital_id"], name: "index_users_on_hospital_id", using: :btree
    t.index ["name"], name: "index_users_on_name", unique: true, using: :btree
    t.index ["phone"], name: "index_users_on_phone", using: :btree
    t.index ["role_id"], name: "index_users_on_role_id", using: :btree
  end

  create_table "verification_codes", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4" do |t|
    t.string   "code",            limit: 12,                              comment: "纸质胶片"
    t.integer  "patient_info_id",                                         comment: "检查记录ID"
    t.datetime "send_at",                                                 comment: "发送时间"
    t.datetime "expiry",                                                  comment: "过期日期"
    t.boolean  "expired",                    default: false,              comment: "是否过期"
    t.boolean  "used",                       default: false,              comment: "是否已经使用"
    t.datetime "used_at",                                                 comment: "使用时间"
    t.datetime "created_at",                                 null: false
    t.datetime "updated_at",                                 null: false
    t.index ["code"], name: "index_verification_codes_on_code", unique: true, using: :btree
    t.index ["expired"], name: "index_verification_codes_on_expired", using: :btree
    t.index ["expiry"], name: "index_verification_codes_on_expiry", using: :btree
    t.index ["patient_info_id"], name: "index_verification_codes_on_patient_info_id", using: :btree
    t.index ["used"], name: "index_verification_codes_on_used", using: :btree
  end

  add_foreign_key "t_data_patient_dicoms", "t_data_patient_info", column: "patient_info_id", name: "FK_e6u1t7neqv8pu4ofsvw6q6ecg"
end
