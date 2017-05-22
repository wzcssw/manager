namespace :task do
  desc "初始化数据"
  task init_data: :environment do
      dc = DiagnoseCenter.where( name: "test", description: "测试", is_open: false, rank: 1).first_or_create

      r1 = DcRole.create(name: '管理员',description: '管理员',code: 'dc_admin',rank:1)
      r2 = DcRole.create(name: '阅片医生',description: '阅片医生',code: 'read_doctor',rank:2)
      r3 = DcRole.create(name: '审核医生',description: '审核医生',code: 'check_doctor',rank:3)
      
      d1 = DcUser.create(diagnose_center_id: dc.id,
                          username: "wzc", 
                          realname: "王志成", 
                          password: "123456",
                          phone: "18648552460", 
                          email: '18648552460@163.com',
                          rank: 1)
      DcUserRole.create(dc_user_id: d1.id, dc_role_id: r1.id)
      #
      d2 = DcUser.create(diagnose_center_id: dc.id,
                          username: "liuyk", 
                          realname: "玉奎", 
                          password: "123456",
                          phone: "18612341234", 
                          email: '18612341234@163.com',
                          rank: 2)
      DcUserRole.create(dc_user_id: d2.id, dc_role_id: r1.id)
      #
      d3 = DcUser.create(diagnose_center_id: dc.id,
                          username: "zhaoyy", 
                          realname: "友源", 
                          password: "123456",
                          phone: "18612341235", 
                          email: '18612341235@163.com',
                          rank: 3)
      DcUserRole.create(dc_user_id: d3.id, dc_role_id: r1.id)
      #
      d4 = DcUser.create(diagnose_center_id: dc.id,
                          username: "zyj", 
                          realname: "友尽", 
                          password: "123456",
                          phone: "15279058466", 
                          email: '15279058466@163.com',
                          rank: 4)
      DcUserRole.create(dc_user_id: d4.id, dc_role_id: r1.id)
      #
      d5 = DcUser.create(diagnose_center_id: dc.id,
                          username: "lyf", 
                          realname: "李易峰", 
                          password: "123456",
                          phone: "18612341238", 
                          email: '18612341238@163.com',
                          rank: 5)
      DcUserRole.create(dc_user_id: d5.id, dc_role_id: r1.id)
  end

end
