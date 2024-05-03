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
    users = {
      verifyOtp : (data,options) => HttpClient.post(HTTP_END_POINTS.users.verifyOtp,data,options),
      studentRegister : (data,options) => HttpClient.post(HTTP_END_POINTS.users.studentRegister,data,options),
      studentsAll : (params) => HttpClient.get(HTTP_END_POINTS.student.get,params),
      getStudentWithId : (params) => HttpClient.get(HTTP_END_POINTS.student.getWithId+params.student_id)
    }
}

export default new Client();
