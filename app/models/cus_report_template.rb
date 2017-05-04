class CusReportTemplate < ApplicationRecord
    belongs_to :user
    # 从公共报告模板初始化私有报告模板
    def self.init_data_from_public(d_user_id)
        CusReportTemplate.delete_all(user_id: d_user_id)
        rt_arr = ReportTemplate.order("id")
        rt_arr.each do |rt|
            CusReportTemplate.create({
                raw_id: rt.id,
                raw_parent_id: rt.parent_id,
                name: rt.name,
                expression: rt.expression,
                diagnose: rt.diagnose,
                is_symptom: rt.is_symptom,
                rank: rt.rank,
                user_id: d_user_id
            })
        end
        CusReportTemplate.joins("crt join cus_report_templates pcrt on crt.raw_parent_id = pcrt.raw_id and crt.user_id = pcrt.user_id").
        where("crt.user_id = ?",d_user_id).update_all("crt.parent_id = pcrt.id")
    end

    # 初始化原有的医生自定义模板数据
    def self.init_old_doctor_data
        user_arr = User.joins("join roles r on users.role_id = r.id").where("r.code in (?)",['h_admin','g_admin','read_doctor','check_doctor'])
        user_arr.each do |user|
            CusReportTemplate.init_data_from_public(user.id)
        end
        CusReportTemplate.joins("crt join diagnostic_templates dt on crt.name = dt.symptom and crt.is_symptom = 1 join cus_diagnostic_templates cdt on dt.id = cdt.diagnostic_template_id and crt.user_id = cdt.user_id").
        update_all("crt.expression = cdt.expression,crt.diagnose = cdt.diagnose")
    end

    def delete_by_tree
        children_node_arr = fetch_all_children_node()
        children_node_arr.each do |cnode|
            cnode.delete
        end
        self.delete
    end

    def fetch_all_children_node
        node_arr = []
        all_node_arr = CusReportTemplate.where(user_id: self.user_id)
        fetch_children_node(all_node_arr,node_arr,self.id)
        return node_arr
    end

    def fetch_children_node(all_node_arr,node_arr,parent_id)
        all_node_arr.each do |node|
            if node.parent_id == parent_id
                node_arr.push(node)
                fetch_children_node(all_node_arr,node_arr,node.id)
            end
        end
    end

    def get_hash
        return {name: self.name,expression: self.expression,diagnose: self.diagnose,is_symptom: self.is_symptom,id: self.id,parent_id: self.parent_id,is_expand: false}
    end

    def self.get_tree_struct(crt_arr)
        result = []
        rcrt_arr = crt_arr.select {|crt| crt.parent_id.blank? }.sort_by{ |crt| crt.rank }
        rcrt_arr.each do |rcrt|
            h_rcrt = rcrt.get_hash
            CusReportTemplate.add_children(h_rcrt,crt_arr)
            result.push(h_rcrt)
        end
        return result
    end

    def self.add_children(fcrt,crt_arr)
        ccrt_arr = crt_arr.select {|crt| crt.parent_id == fcrt[:id]}.sort_by{ |crt| crt.rank }
        fcrt[:children] = []
        ccrt_arr.each do |ccrt|
            h_ccrt = ccrt.get_hash
            CusReportTemplate.add_children(h_ccrt,crt_arr)
            fcrt[:children].push(h_ccrt)
        end
    end
end
