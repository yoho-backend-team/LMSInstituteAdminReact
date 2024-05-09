import HttpClient from "./httpclinet"; 
import { HTTP_END_POINTS } from "api/urls";

class Client {
    branch = {
       getAll : (params) => HttpClient.get(HTTP_END_POINTS.branch.getAll,params),
    }
    file = {
        upload: (data, options) => {
            return HttpClient.uploadFile(HTTP_END_POINTS.file.upload, data);
        }
    }
    category = {
      update : (data) => {HttpClient.update(HTTP_END_POINTS.category.create+`/${data.id}`,data)}
    }
    course ={
      create : (data,options) => {
        return HttpClient.post(HTTP_END_POINTS.course.add+`${data.category}/courses/`,data,options)
      }
    }
    batch = {
      create : (data,options) => HttpClient.post(HTTP_END_POINTS.batch.create+`${data.branch_id}/courses/${data.course}/batches`,data),
      getAll : (params) => HttpClient.get(HTTP_END_POINTS.batch.getAll+params.branch_id+"/batches/all"),
      getWithId : (params) => HttpClient.get(HTTP_END_POINTS.batch.getWithId+`${params.batch_id}`)
    }
    users = {
      verifyOtp : (data,options) => HttpClient.post(HTTP_END_POINTS.users.valiateOtp,data,options),
      studentRegister : (data,options) => HttpClient.post(HTTP_END_POINTS.users.studentRegister,data,options),
      studentsAll : (params) => HttpClient.get(HTTP_END_POINTS.student.get+`${params.branch_id}/students`,params),
      studentsAll : (params) => HttpClient.get(HTTP_END_POINTS.student.get+params.branch_id+"/students"),
      getStudentWithId : (params) => HttpClient.get(HTTP_END_POINTS.student.getWithId+params.student_id),
      getStudentsWithCourse : (data) => HttpClient.get(HTTP_END_POINTS.student.getWithcourse+`${data.course_id}/students`),
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
