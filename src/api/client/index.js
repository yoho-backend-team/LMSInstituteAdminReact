import HttpClient from "./httpclinet"; 
import { HTTP_END_POINTS } from "api/client/http_end_points";

class Client {
 
    admin = {
      me : (data) => HttpClient.get(HTTP_END_POINTS.admin.me,data),
      change_password : (data) => HttpClient.post(HTTP_END_POINTS.admin.change_password,data),
      forget_password:(data)=> HttpClient.post(HTTP_END_POINTS.admin.forget_password,data),
      verfiy_otp : (data) => HttpClient.post(HTTP_END_POINTS.admin.verfiy_otp,data),
      reset_password : (data) => HttpClient.post(HTTP_END_POINTS.admin.reset_password,data),
    }
    permission = {
      getAll : (params) => HttpClient.get(HTTP_END_POINTS.permission.getAll),
      update : (data) => HttpClient.update(HTTP_END_POINTS.permission.update,data)
    }
    group = {
      create : (data) => HttpClient.post(HTTP_END_POINTS.group.create,data),
      getAll : (data) => HttpClient.get(HTTP_END_POINTS.group.getAll+data.institute_id),
      permissionWithRole : (data) => HttpClient.get(HTTP_END_POINTS.group.permissions,data),
      updateStatus : (data) => HttpClient.update(HTTP_END_POINTS.group.update_status,data),
      delete : (data) => HttpClient.delete(HTTP_END_POINTS.group.delete+data?.id)
    }
    user = {
      add : (data) => HttpClient.post(HTTP_END_POINTS.user.add,data),
      getAll : (data) => HttpClient.get(HTTP_END_POINTS.user.all,data),
      getWithId : (data) => HttpClient.get(HTTP_END_POINTS.user.getWihtId+data.id),
      getWithRoleName : (data) => HttpClient.get(HTTP_END_POINTS.user.getWithRoleName,data),
      update : (data) => HttpClient.update(HTTP_END_POINTS.user.update+data?.userId,data),
      delete : (data) => HttpClient.delete(HTTP_END_POINTS.user.delete+data?.userId)
    }
    branch = {
       getAll : (params) => HttpClient.get(HTTP_END_POINTS.branch.getAll,params),
       create : (params) => HttpClient.post(HTTP_END_POINTS.branch.create,params)
    }
    file = {
        upload: (data, options) => {
            return HttpClient.uploadFile(HTTP_END_POINTS.file.upload, data);
        }
    }
    faq = {
      create : (data) => HttpClient.post(HTTP_END_POINTS.faq.create,data),
      getAll : (params) => HttpClient.get(HTTP_END_POINTS.faq.getAll,params),
      delete : (data) => HttpClient.delete(HTTP_END_POINTS.faq.delete.replace(':uuid', data.uuid) ,data),
      update: (uuid, data) => HttpClient.update(HTTP_END_POINTS.faq.update.replace(':uuid', uuid), data)
    }
    faq_category = {
      create : (data) => HttpClient.post(HTTP_END_POINTS.faq_category.create,data),
      getAll : (params) => HttpClient.get(HTTP_END_POINTS.faq_category.getAll,params),
      delete : (data) => HttpClient.delete(HTTP_END_POINTS.faq_category.delete.replace(':uuid', data.uuid) ,data),
      update: (uuid, data) => HttpClient.update(HTTP_END_POINTS.faq_category.update.replace(':uuid', uuid), data)
    }

    category = {
      get : (data) => HttpClient.get(HTTP_END_POINTS.category.getAll,data),
      create : (data) => HttpClient.post(HTTP_END_POINTS.category.create,data),
      update : (data) =>  HttpClient.update(HTTP_END_POINTS.category.create+`/${data.id}`,data),
      delete : (data) => HttpClient.delete(HTTP_END_POINTS.category.create+`/${data.id}`)
    }
    course_module ={
      getAll : (params) => HttpClient.get(HTTP_END_POINTS.course_module.get,params),
      create : (data) => HttpClient.post(HTTP_END_POINTS.course_module.get,data),
      update : (data) => HttpClient.update(HTTP_END_POINTS.course_module.update+data.uuid,data),
      update_status : (data) => HttpClient.update(HTTP_END_POINTS.course_module.update_status+data.module_id,data),
      delete : (data) => HttpClient.delete(HTTP_END_POINTS.course_module.get+data.id)
    }
    study_material = {
      getAll : (params) => HttpClient.get(HTTP_END_POINTS.study_material.get,params),
      create : (data) => HttpClient.post(HTTP_END_POINTS.study_material.get,data),
      update : (data) => HttpClient.update(HTTP_END_POINTS.study_material.get+data.uuid,data),
      delete : (data) => HttpClient.delete(HTTP_END_POINTS.study_material.get+data.id),
      update_status : (data) => HttpClient.update(HTTP_END_POINTS.study_material.update_status+data.id,data)
    }
    notes = {
      get : (params) => HttpClient.get(HTTP_END_POINTS.notes.index,params),
      create : (data) => HttpClient.post(HTTP_END_POINTS.notes.index,data),
      update : (data) => HttpClient.update(HTTP_END_POINTS.notes.index+`/update/${data.uuid}`,data),
      update_status : (data) => HttpClient.update(HTTP_END_POINTS.notes.update_status+data.id,data),
      delete : (data) => HttpClient.delete(HTTP_END_POINTS.notes.index+"/"+data.id)
    }
    course ={
      create : (data,options) => {
        return HttpClient.post(HTTP_END_POINTS.course.add+`${data.category}/courses/`,data,options)
      },
      getWithBranch : (data) => HttpClient.get(HTTP_END_POINTS.course.withBranch+data.branch_id+"/courses") ,
      update : (data) => HttpClient.update(HTTP_END_POINTS.course.add+`${data.category}/courses/${data.course}`,data),
      delete : (data) => HttpClient.delete(HTTP_END_POINTS.course.add+`${data.category}/courses/${data.id}`),
      add_template : (data) => HttpClient.post(HTTP_END_POINTS.course.template,data)
    }
    batch = {
      create : (data,options) => HttpClient.post(HTTP_END_POINTS.batch.create+`${data.branch_id}/courses/${data.course}/batches`,data),
      getAll : (params) => HttpClient.get(HTTP_END_POINTS.batch.getAll+params.branch_id+"/batches/all",params),
      getWithId : (params) => HttpClient.get(HTTP_END_POINTS.batch.getWithId+`${params.batch_id}`),
      update : (params) => HttpClient.update(HTTP_END_POINTS.batch.update+params?.uuid,params),
      delete : (data) => HttpClient.delete(HTTP_END_POINTS.batch.delete+data?.uuid)
    }
    online_class = {
      getAll : (params) => HttpClient.get(HTTP_END_POINTS.online_class.getAll,params),
      getWithId : (data) => HttpClient.get(HTTP_END_POINTS.online_class.getWithId+data.class_id),
      create : (data) => HttpClient.post(HTTP_END_POINTS.online_class.create,data),
      update : (data) => HttpClient.update(HTTP_END_POINTS.online_class.update+data?.uuid,data),
      delete : (data) => HttpClient.delete(HTTP_END_POINTS.online_class.create+"/"+data.id)
    }
    offline_class = {
      create : (data) => HttpClient.post(HTTP_END_POINTS.offline_class.create,data),
      getAll : (params) => HttpClient.get(HTTP_END_POINTS.offline_class.getAll,params),
      getWithId : (params) => HttpClient.get(HTTP_END_POINTS.offline_class.getWithId+params?.id),
      update : (data) => HttpClient.update(HTTP_END_POINTS.offline_class.update+data.uuid,data),
      delete : (data) => HttpClient.delete(HTTP_END_POINTS.offline_class.delete+data.uuid)
    }
    users = {
      verifyOtp : (data,options) => HttpClient.post(HTTP_END_POINTS.users.valiateOtp,data,options),
      studentRegister : (data,options) => HttpClient.post(HTTP_END_POINTS.users.studentRegister,data,options),
      studentsAll : (params) => HttpClient.get(HTTP_END_POINTS.student.get+`${params.branch_id}/students`,params),
      getStudentWithId : (params) => HttpClient.get(HTTP_END_POINTS.student.getWithId+params.student_id),
      getnonstaffWithId : (params) => HttpClient.get(HTTP_END_POINTS.nonstaff.getWithId+params.nonstaff_id),
      getstaffWithId : (params) => HttpClient.get(HTTP_END_POINTS.staff.getWithid+params.staff_id),
      getStudentsWithCourse : (data) => HttpClient.get(HTTP_END_POINTS.student.getWithcourse+`${data.course_id}/students`),
      getStudentsWithBatch : (data) => HttpClient.get(HTTP_END_POINTS.student.getWithBatch+data.branch_id+"/batches/batch-students",data),
      getStudentsWithCourse : (data) => HttpClient.get(HTTP_END_POINTS.student.getWithCourse+`${data.branch_id}/${data.course_id}/students`),
      logout : (data) => HttpClient.post(HTTP_END_POINTS.users.logout,data)
    }
    payment = {
      student_fee : {
       create : (data) => HttpClient.post(HTTP_END_POINTS.payment.fee.create,data)
      }
    }
    nonTeachingStaff = {
      get : (data) => HttpClient.get(HTTP_END_POINTS.student.get+data.branch_id+"/non-teaching-staff")
    }
    TeachingStaff = {
      get : (data) => HttpClient.get(HTTP_END_POINTS.student.get+data.branch_id+"/teaching-staff"),
      getWithBranch : (data) => HttpClient.get(HTTP_END_POINTS.staff.getWithBranch+data.branch+"/teaching-staff/"),
      getActivtiy : (params) => HttpClient.get(HTTP_END_POINTS.staff.getActivtiy+params?.staff,params),
      getClasses : (params) => HttpClient.get(HTTP_END_POINTS.staff.getClasses+params?.staff,params),
      update_staff : (data) => HttpClient.update(HTTP_END_POINTS.staff.update+data?.staff,data)
    }
    staff = {
      get : (query) => HttpClient.get(HTTP_END_POINTS.staff.getWithName,query)
    }
    student = {
      activity : (data) => HttpClient.get(HTTP_END_POINTS.student.activity+data.id),
      class : (data) => HttpClient.get(HTTP_END_POINTS.student.classess+data.uuid,data),
      update : (data) => HttpClient.update(HTTP_END_POINTS.student.update+data?.uuid,data),
      delete : (data) => HttpClient.delete(HTTP_END_POINTS.student.delete+data.uuid)
    }
    community ={
      getAll : (data) => HttpClient.get(HTTP_END_POINTS.community.all+data.branchid+'/all-community/'),
      getCommunityMessage : (data) => HttpClient.get(HTTP_END_POINTS.community.messages+data.chatId),
      getMessages : (data) => HttpClient.get(HTTP_END_POINTS.community.get_all_messages + data.community)
    }
    ticket = {
      student_tickets : (data) => HttpClient.get(HTTP_END_POINTS.ticket.student_ticket,data),
      update_student_status_ticket : (params) => HttpClient.update(HTTP_END_POINTS.ticket.update_student_status_ticket+params?.id),
      update_student_ticket : (data) => HttpClient.update(HTTP_END_POINTS.ticket.update+data?.uuid,data),
      student_ticket_with_id : (params) => HttpClient.get(HTTP_END_POINTS.ticket.student_ticket_with_id+params?.id),
      staff_ticket : (data) => HttpClient.get(HTTP_END_POINTS.ticket.staff_ticket,data),
      staff_ticket_with_id : (params) => HttpClient.get(HTTP_END_POINTS.ticket.staff_ticket_with_id+params?.id),
      staff_ticket_update : (params) => HttpClient.update(HTTP_END_POINTS.ticket.update_staff_ticket+params?.id),
      admin : {
        create_ticket : (data) => HttpClient.post(HTTP_END_POINTS.ticket.admin.create_ticket,data),
        get_all : (params) => HttpClient.get(HTTP_END_POINTS.ticket.admin.get_all,params),
        get_with_id : (params) => HttpClient.get(HTTP_END_POINTS.ticket.admin.get_with_id + params?.id, params),
        update_ticket : (params,data) => HttpClient.update(HTTP_END_POINTS.ticket.admin.update+params?.id,data)
      }
    }
    attedence = {
      get_all_student_attedence : (data) => HttpClient.get(HTTP_END_POINTS.attedence.student_all,data),
      get_with_id : (data) => HttpClient.get(HTTP_END_POINTS.attedence.get_with_id+data?.id),
      mark_attedence : (data) => HttpClient.post(HTTP_END_POINTS.attedence.student_mark,data),
      mark_staff_attedence : (data) => HttpClient.post(HTTP_END_POINTS.attedence.staff_mark,data) ,
      mark_non_staff_attedence : (data) => HttpClient.post(HTTP_END_POINTS.attedence.non_staff_mark,data),
      get_all_staff_attedence : (params) => HttpClient.get(HTTP_END_POINTS.attedence.staff_all,params),
      get_all_non_staff_attedence : (params) => HttpClient.get(HTTP_END_POINTS.attedence.non_teaching_all,params),
      get_staff_attedence_with_id : (params) => HttpClient.get(HTTP_END_POINTS.attedence.get_staff_attedence_with_id+params?.id,params),
      get_non_staff_with_id : (params) => HttpClient.get(HTTP_END_POINTS.attedence.get_non_staff_with_id+params?.id)
    }
    notification = {
      student:{
        add_student_notification : (data) => HttpClient.post(HTTP_END_POINTS.notification.student_notification_get,data),
        get_student_notification : (query) => HttpClient.get(HTTP_END_POINTS.notification.student_notification,query),
      },
      staff : {
        add_staff_notification : (data) => HttpClient.post(HTTP_END_POINTS.notification.create_staff_notification,data),
        get_staff_notification : (query) => HttpClient.get(HTTP_END_POINTS.notification.staff_notification,query)
      },
      institute : {
       add_institute_notification : (data) => HttpClient.post(HTTP_END_POINTS.notification.institute_notification,data),
       get_institute_notification : (query) => HttpClient.get(HTTP_END_POINTS.notification.institute_notification,query)
      }
    }
    institute_notification = {
      get_institute_notification : (data,query) => HttpClient.get(HTTP_END_POINTS.institute_notification.get_all+data.institute_id+"/all",query),
      update_institute_notification : (data,body) => HttpClient.update(HTTP_END_POINTS.institute_notification.update+data.id,body)
    }
    id_cards = {
      student : {
        get_all : (data) => HttpClient.get(HTTP_END_POINTS.id_cards.student.all,data)
      }
    }
    subscription = {
      get_all_plans : () => HttpClient.get(HTTP_END_POINTS.subscription.all_plans),
      get_subscription : (params) => HttpClient.get(HTTP_END_POINTS.subscription.institute_subscription+params?.institute),
      get_subscription_status : (params) => HttpClient.get(HTTP_END_POINTS.subscription.status_check+params.institute) ,
      upgrade_request : (params) => HttpClient.update(HTTP_END_POINTS.subscription.upgrade_request+params.institute+"/request")
    }
    activity = {
      get : (query) => HttpClient.get(HTTP_END_POINTS.activity.get,query)
    }
    reports = {
      get : (query) => HttpClient.get(HTTP_END_POINTS.reports.get+query?.branch,query)
    }
  }
export default new Client();
