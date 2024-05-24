import HttpClient from "./httpclinet"; 
import { HTTP_END_POINTS } from "api/client/http_end_points";

class Client {
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
      update : (data) => HttpClient.update(HTTP_END_POINTS.user.update+data?.userId,data),
      delete : (data) => HttpClient.delete(HTTP_END_POINTS.user.delete+data?.userId)
    }
    branch = {
       getAll : (params) => HttpClient.get(HTTP_END_POINTS.branch.getAll,params),
    }
    file = {
        upload: (data, options) => {
            return HttpClient.uploadFile(HTTP_END_POINTS.file.upload, data);
        }
    }
    category = {
      get    : (params) => HttpClient.get(HTTP_END_POINTS.category.getAll,params),
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
      delete : (data) => HttpClient.delete(HTTP_END_POINTS.course.add+`${data.category}/courses/${data.id}`)
    }
    batch = {
      create : (data,options) => HttpClient.post(HTTP_END_POINTS.batch.create+`${data.branch_id}/courses/${data.course}/batches`,data),
      getAll : (params) => HttpClient.get(HTTP_END_POINTS.batch.getAll+params.branch_id+"/batches/all",params),
      getWithId : (params) => HttpClient.get(HTTP_END_POINTS.batch.getWithId+`${params.batch_id}`)
    }
    online_class = {
      getAll : (params) => HttpClient.get(HTTP_END_POINTS.online_class.getAll,params),
      getWithId : (data) => HttpClient.get(HTTP_END_POINTS.online_class.getWithId+data.class_id)
    }
    offline_class = {
      getAll : (params) => HttpClient.get(HTTP_END_POINTS.offline_class.getAll,params)
    }
    users = {
      verifyOtp : (data,options) => HttpClient.post(HTTP_END_POINTS.users.valiateOtp,data,options),
      studentRegister : (data,options) => HttpClient.post(HTTP_END_POINTS.users.studentRegister,data,options),
      studentsAll : (params) => HttpClient.get(HTTP_END_POINTS.student.get+`${params.branch_id}/students`,params),
      studentsAll : (params) => HttpClient.get(HTTP_END_POINTS.student.get+params.branch_id+"/students"),
      getStudentWithId : (params) => HttpClient.get(HTTP_END_POINTS.student.getWithId+params.student_id),
      getStudentsWithCourse : (data) => HttpClient.get(HTTP_END_POINTS.student.getWithcourse+`${data.course_id}/students`),
      getStudentsWithBatch : (data) => HttpClient.get(HTTP_END_POINTS.student.getWithBatch+data.branch_id+"/batches/batch-students",data),
      getStudentsWithCourse : (data) => HttpClient.get(HTTP_END_POINTS.student.getWithCourse+`${data.branch_id}/${data.course_id}/students`),
      logout : (data) => HttpClient.post(HTTP_END_POINTS.users.logout,data)
    }
    nonTeachingStaff = {
      get : (data) => HttpClient.get(HTTP_END_POINTS.student.get+data.branch_id+"/non-teaching-staff")
    }
    TeachingStaff = {
      get : (data) => HttpClient.get(HTTP_END_POINTS.student.get+data.branch_id+"/teaching-staff")
    }
    community ={
      getAll : (data) => HttpClient.get(HTTP_END_POINTS.community.all+data.branchid+'/all-community/'),
      getCommunityMessage : (data) => HttpClient.get(HTTP_END_POINTS.community.messages+data.chatId)
     }
  }
export default new Client();
