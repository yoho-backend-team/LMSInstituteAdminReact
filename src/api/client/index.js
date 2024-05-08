import HttpClient from "./httpclinet"; 
import { HTTP_END_POINTS } from "api/urls";

class Client {
    file = {
        upload: (data, options) => {
            return HttpClient.uploadFile(HTTP_END_POINTS.file.upload, data);
        }
    }
    course ={
      create : (data,options) => {
        return HttpClient.post(HTTP_END_POINTS.course.add+`${data.category}/courses/`,data,options)
      }
    }
    batch = {
      create : (data,options) => HttpClient.post(HTTP_END_POINTS.batch.create+`${data.branch_id}/courses/${data.course}/batches`,data),
      getAll : (params) => HttpClient.get(HTTP_END_POINTS.batch.getAll,params),
      getWithId : (params) => HttpClient.get(HTTP_END_POINTS.batch.getWithId+`${params.batch_id}`)
    }
    users = {
      verifyOtp : (data,options) => HttpClient.post(HTTP_END_POINTS.users.valiateOtp,data,options),
      studentRegister : (data,options) => HttpClient.post(HTTP_END_POINTS.users.studentRegister,data,options),
      studentsAll : (params) => HttpClient.get(HTTP_END_POINTS.student.get+params.branch_id+"/students"),
      getStudentWithId : (params) => HttpClient.get(HTTP_END_POINTS.student.getWithId+params.student_id),
      getStudentsWithCourse : (data) => HttpClient.get(HTTP_END_POINTS.student.getWithcourse+`${data.course_id}/students`),
      logout : (data) => HttpClient.post(HTTP_END_POINTS.users.logout,data)
    }
    community ={
     getAll : (data) => HttpClient.get(HTTP_END_POINTS.community.all+data.branch_id+'/all-community/')
    }
}
console.log(HTTP_END_POINTS.users,"verifyOtp")
export default new Client();
